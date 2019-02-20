import {getTimeDistance} from '../utils/utils';
import { Model } from '../dvapack';
import { loadPollutantType, GetAlarmNotices } from '../services/api';
import {mymessagelist} from '../services/userlist';
import * as service from '../dvapack/websocket/mywebsocket';
import {EnumPropellingAlarmSourceType} from '../utils/enum';

export default Model.extend({
    namespace: 'global',
    state: {
        collapsed: false,
        //报警和预警信息和通知信息
        notices: [],
        currentUserNoticeCnt: {
            notifyCount: 0,
            unreadCount: 0,
        },
        fetchingNotices: false,
        pollutanttype: [],
    },
    effects: {
        * fetchPolluantType(_, { call, put, update }) {
            const pollutanttyperesult = yield call(loadPollutantType);
            const pollutanttype = pollutanttyperesult.data;
            yield update({ pollutanttype });
        },
        * fetchNotices({payload}, { call, put }) {
            yield put({
                type: 'changeNoticeLoading',
                payload: true,
            });

            //报警消息
            let today = getTimeDistance("today");
            const res = yield call(GetAlarmNotices, {beginTime:today[0].format("YYYY-MM-DD HH:mm:ss"),endTime:today[1].format("YYYY-MM-DD HH:mm:ss")});
            let notices = [];
            let count = 0;
            if (res) {
                const resdata=JSON.parse(res.data);
                if (resdata) {
                    let dataovers=resdata.overs;
                    let datawarns=resdata.warns;
                    let dataexceptions=resdata.exceptions;
                    notices=notices.concat(dataovers.map((item,index)=>{
                        count+=item.AlarmCount;
                        return {
                            id:`over_${item.DGIMNs}`,
                            pointname: item.PointName,
                            DGIMN:`${item.DGIMNs}`,
                            pollutantnames:item.PollutantNames,
                            firsttime:item.FirstTime,
                            lasttime:item.LastTime,
                            alarmcount:item.AlarmCount,
                            sontype:"over",
                            //组件里根据这个分组
                            type: 'alarm',
                            //排序从0到2999
                            orderby:1000+index,
                            key:`over_${item.DGIMNs}`,
                            title:`${item.PointName}报警${item.AlarmCount}次`,
                            description:`${item.PollutantNames}从${item.FirstTime}发生了${item.AlarmCount}次超标报警`,
                        };
                    }));
                    notices=notices.concat(datawarns.map((item,index)=>{
                        let discription="";
                        discription=discription.concat(item.OverWarnings.map((sonitem)=>`${sonitem.PollutantName}${sonitem.AlarmOverTime}发生预警，建议浓度降到${sonitem.SuggestValue}以下;`));
                        count+=1;
                        return {
                            id:`warn_${item.DGIMNs}`,
                            pointname: item.PointName,
                            DGIMN:`${item.DGIMNs}`,
                            discription:discription,
                            overwarnings:item.OverWarnings,
                            sontype:"warn",
                            //组件里根据这个分组
                            type: 'alarm',
                            //排序从3000到4999
                            orderby:4000+index,
                            key:`warn_${item.DGIMNs}`,
                            title:`${item.PointName}发生了预警`,
                            description:`${discription}`,
                        };
                    }));
                    notices=notices.concat(dataexceptions.map((item,index)=>{
                        count+=item.AlarmCount;
                        return {
                            id:`exception_${item.DGIMNs}`,
                            pointname: item.PointName,
                            DGIMN:`${item.DGIMNs}`,
                            exceptiontypes:item.ExceptionTypes,
                            firsttime:item.FirstAlarmTime,
                            lasttime:item.LastAlarmTime,
                            alarmcount:item.AlarmCount,
                            sontype:"exception",
                            //组件里根据这个分组
                            type: 'alarm',
                            //排序从5000到9999
                            orderby:6000+index,
                            key:`exception_${item.DGIMNs}`,
                            title:`${item.PointName}报警${item.AlarmCount}次`,
                            description:`从${item.FirstAlarmTime}至${item.LastAlarmTime}发生了${item.AlarmCount}次异常报警`,
                            descriptionbak:`从${item.FirstAlarmTime}至${item.LastAlarmTime}发生了${item.AlarmCount}次异常报警`,
                        };
                    }));
                }
            }
            //通知消息,未读消息
            const res2 = yield call(mymessagelist,{isView:false});
            if(res2&&res2.data!==null){
                let advises=res2.data.map((item,index)=>({
                    id:`advise_${item.DGIMN}`,
                    pointname:`${item.PointName}`,
                    DGIMN:`${item.DGIMN}`,
                    msgtitle: item.MsgTitle,
                    msg:item.Msg,
                    isview:item.IsView,
                    sontype:`advise_${item.PushType}`,
                    params:item.Col1,
                    //组件里根据这个分组
                    type: 'advise',
                    //排序从10000到19999
                    orderby:11000+index,
                    key:`advise_${item.DGIMN}_${item.ID}`,
                    title:`${item.MsgTitle}`,
                    description:`${item.Msg}`,
                }));
                count+=advises.length;
                notices=notices.concat(advises);
            }
            yield put({
                type: 'saveNotices',
                payload: {
                    notices:notices,
                    notifyCount: count,
                    unreadCount: count
                }
            });
        },
        * clearNotices({ payload }, { put, select }) {
            yield put({
                type: 'saveClearedNotices',
                payload,
            });
            const count = yield select(state => state.global.notices.length);
            yield put({
                type: 'user/changeNotifyCount',
                payload: count,
            });
        },
    },

    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload,
            };
        },
        saveNotices(state, { payload }) {
            return {
                ...state,
                notices: payload.notices,
                currentUserNoticeCnt:{
                    notifyCount: payload.notifyCount,
                    unreadCount: payload.unreadCount,
                },
                fetchingNotices: false,
            };
        },
        saveClearedNotices(state, { payload }) {
            return {
                ...state,
                notices: state.notices.filter(item => item.type !== payload),
            };
        },
        changeNoticeLoading(state, { payload }) {
            return {
                ...state,
                fetchingNotices: payload,
            };
        },
        changeNotices(state,{payload}) {
            const {message} = payload;
            const {Message:data}=message;
            const {notices} = state;
            let count = state.currentUserNoticeCnt.unreadCount;
            let {key,newnotices}={key:"",newnotices:[]};
            data.AlarmType=parseInt(data.AlarmType);
            if(!notices.find(t=>t.id.includes(`over_${data.DGIMN}`))&&data.AlarmType===EnumPropellingAlarmSourceType.DataOver) {
                newnotices=notices;
                let minOrderby = Math.min(...notices.filter(t=>t.sontype==="over").map((o) => o.orderby));
                newnotices.push({
                    id:`over_${data.DGIMN}`,
                    pointname: data.PointName,
                    pollutantnames:data.PollutantName,
                    firsttime:data.FirstOverTime,
                    lasttime:data.AlarmTime,
                    alarmcount:data.AlarmCount,
                    sontype:"over",
                    //组件里根据这个分组
                    type: 'alarm',
                    //排序从0到2999
                    orderby:minOrderby-1,
                    key:`over_${data.DGIMN}`,
                    title:`${data.PointName}报警${data.AlarmCount}次`,
                    description:`${data.PollutantName}从${data.FirstOverTime}发生了${data.AlarmCount}次超标报警`,
                });
            }else if(!notices.find(t=>t.id.includes(`warn_${data.DGIMN}`))&&data.AlarmType===EnumPropellingAlarmSourceType.DataOverWarning) {
                newnotices=notices;
                let minOrderby = Math.min(...notices.filter(t=>t.sontype==="warn").map((o) => o.orderby));
                newnotices.push({
                    id:`warn_${data.DGIMN}`,
                    pointname: data.PointName,
                    discription:"",
                    overwarnings:"",
                    sontype:"warn",
                    //组件里根据这个分组
                    type: 'alarm',
                    //排序从3000到4999
                    orderby:minOrderby-1,
                    key:`warn_${data.DGIMN}`,
                    title:`${data.PointName}发生了预警`,
                    description:``,
                });
            }else if(!notices.find(t=>t.id.includes(`exception_${data.DGIMN}`))&&(data.AlarmType===EnumPropellingAlarmSourceType.DataException||
                data.AlarmType===EnumPropellingAlarmSourceType.DYPARAMETER||
                data.AlarmType===EnumPropellingAlarmSourceType.DataLogicErr||
                data.AlarmType===EnumPropellingAlarmSourceType.DYSTATEALARM)) {
                newnotices=notices;
                let minOrderby = Math.min(...notices.filter(t=>t.sontype==="exception").map((o) => o.orderby));
                newnotices.push({
                    id:`exception_${data.DGIMN}`,
                    pointname: data.PointName,
                    pollutantnames:data.PollutantName,
                    firsttime:data.FirstOverTime,
                    lasttime:data.AlarmTime,
                    alarmcount:data.AlarmCount,
                    sontype:"exception",
                    //组件里根据这个分组
                    type: 'alarm',
                    //排序从5000到9999
                    orderby:minOrderby-1,
                    key:`exception_${data.DGIMN}`,
                    title:`${data.PointName}报警${data.AlarmCount}次`,
                    description:`从${data.FirstOverTime}至${data.AlarmTime}发生了${data.AlarmCount}次异常报警`,
                });
            }else {
                newnotices=notices.map(notice=>{
                    let newnotice={...notice};
                    if(data.AlarmType===EnumPropellingAlarmSourceType.DataOver){
                        key=`over_${data.DGIMN}`;
                        if (newnotice.id===key) {
                            newnotice.lasttime=data.AlarmTime;
                            newnotice.alarmcount+=1;
                            count+=1;
                        }
                    } else if (data.AlarmType===EnumPropellingAlarmSourceType.DataOverWarning){
                        key=`warn_${data.DGIMN}`;
                        if (newnotice.id===key) {
                            newnotice.OverWarnings=[];
                            newnotice.OverWarnings.push(
                                {
                                    PollutantName : data.PollutantName,
                                    PollutantCode : data.PollutantCode,
                                    AlarmOverTime : data.FirstOverTime,
                                    AlarmValue : data.AlarmValue,
                                    SuggestValue : data.SuggestValue
                                }
                            );
                            let discription="";
                            discription=discription.concat(newnotice.OverWarnings.map((sonitem)=>`${sonitem.PollutantName}${sonitem.AlarmOverTime}发生预警，建议浓度降到${sonitem.SuggestValue}以下;`));
                            newnotice.discription=discription;
                            count+=1;
                        }
                    }else if(data.AlarmType===EnumPropellingAlarmSourceType.DataException||
                        data.AlarmType===EnumPropellingAlarmSourceType.DYPARAMETER||
                        data.AlarmType===EnumPropellingAlarmSourceType.DataLogicErr||
                        data.AlarmType===EnumPropellingAlarmSourceType.DYSTATEALARM) {
                        key=`exception_${data.DGIMN}`;
                        if (newnotice.id===key) {
                            newnotice.lasttime=data.AlarmTime;
                            newnotice.alarmcount+=1;
                            count+=1;
                        }

                    }
                    return newnotice;
                });
            }
            return {
                ...state,
                notices: newnotices,
                currentUserNoticeCnt:{
                    notifyCount:count,
                    unreadCount:count
                }
            };
        },
        changeAdvises(state,{payload}) {
            const {message} = payload;
            const {Message:item}=message;
            const {notices} = state;
            let count = state.currentUserNoticeCnt.unreadCount;
            let newnotices=notices;
            let minOrderby = Math.min(...notices.filter(t=>t.type==="advise").map((o) => o.orderby));
            newnotices.push({
                id:`advise_${item.DGIMN}`,
                pointname:`${item.PointName}`,
                DGIMN:`${item.DGIMN}`,
                msgtitle: item.Title,
                msg:item.Message,
                isview:item.IsView,
                sontype:`advise_${item.NoticeType}`,
                params:item.Col1,
                //组件里根据这个分组
                type: 'advise',
                //排序从10000到19999
                orderby:minOrderby-1,
                key:`advise_${item.DGIMN}_${item.PushID}`,
                title:`${item.Title}`,
                description:`${item.Message}`,
            });
            return {
                ...state,
                notices: newnotices,
                currentUserNoticeCnt:{
                    notifyCount:count,
                    unreadCount:count
                }
            };
        },
    },
    subscriptions: {
        socket({dispatch}) { // socket相关
            return service.listen(data => {
                // 实时数据："{"MessageType":"RealTimeData","Message":[{"DGIMN":"201809071401","PollutantCode":"s01","MonitorTime":"2018-11-21 01:22:41","MonitorValue":36.630,"MinStrength":null,"MaxStrength":null,"CouStrength":null,"IsOver":-1,"IsException":0,"Flag":"","ExceptionType":"","AlarmLevel":"身份验证失败","AlarmType":"无报警","Upperpollutant":"0","Lowerpollutant":"0","PollutantResult":"","AlarmTypeCode":0,"StandardColor":"red","StandardValue":"-","OverStandValue":"","DecimalReserved":3}]}"
                let obj = JSON.parse(data);
                switch (obj.MessageType) {
                    case 'RealTimeData':
                        // 跳转到对应的effect，把实体带过去更新state达到页面刷新的目的
                        dispatch({
                            type: 'points/updateRealTimeData',
                            payload: {
                                array:obj.Message
                            },
                        });
                        dispatch({
                            type: 'workbenchmodel/updateRealTimeData',
                            payload: {
                                array:obj.Message
                            },
                        });

                        dispatch({
                            type: 'videolist/changeRealTimeData',
                            payload: {
                                array:obj.Message
                            },
                        });

                        break;
                    case 'MinuteData':
                        // dispatch({
                        //     type: 'welcome'
                        // });
                        break;
                    case 'HourData':
                        // dispatch({
                        //     type: 'welcome'
                        // });
                        break;
                    case 'DynamicControlParam':
                    // console.log(obj);
                        dispatch({
                            type: 'points/updateDynamicControlParam',
                            payload: {
                                array:obj.Message
                            },
                        });
                        break;
                    case 'DynamicControlState':
                        dispatch({
                            type: 'points/updateDynamicControlState',
                            payload: {
                                array:obj.Message
                            },
                        });
                        break;
                    case 'Alarm':
                        dispatch({
                            type: 'changeNotices',
                            payload: {message:obj.Message},
                        });
                        break;
                    case 'Notice':
                        dispatch({
                            type: 'changeAdvises',
                            payload: {message:obj.Message},
                        });
                        break;
                    default:
                        break;
                }
            });
        },
        setup({ dispatch, history }) {
            // Subscribe history(url) change, trigger `load` action if pathname is `/`
            return history.listen(({ pathname, search }) => {
                if (typeof window.ga !== 'undefined') {
                    window.ga('send', 'pageview', pathname + search);
                }
                // if (pathname === '/list') {
                //   dispatch({ type: 'fetchPollutantType',
                //     payload: {},
                //   });
                // }
            });
        },
    },
});
