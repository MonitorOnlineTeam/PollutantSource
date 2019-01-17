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
            let count=0;
            if (res) {
                const resdata=JSON.parse(res.data);
                if (resdata) {
                    let dataovers=resdata.overs;
                    let datawarns=resdata.warns;
                    let dataexceptions=resdata.exceptions;
                    notices=notices.concat(dataovers.map((item,key)=>{
                        count+=item.AlarmCount;
                        return {
                            id:`over_${item.DGIMNs}`,
                            pointname: item.PointName,
                            pollutantnames:item.PollutantNames,
                            firsttime:item.FirstTime,
                            lasttime:item.LastTime,
                            alarmcount:item.AlarmCount,
                            sontype:"over",
                            //组件里根据这个分组
                            type: 'alarm',
                            key:`over_${item.DGIMNs}`,
                            title:`${item.PointName}报警${item.AlarmCount}次`,
                            description:`${item.PollutantNames}从${item.FirstTime}发生了${item.AlarmCount}次超标报警`,
                        };
                    }));
                    notices=notices.concat(datawarns.map((item,key)=>{
                        let discription="";
                        discription=discription.concat(item.OverWarnings.map((sonitem)=>`${sonitem.PollutantName}${sonitem.AlarmOverTime}发生预警，建议浓度降到${sonitem.SuggestValue}以下;`));
                        count+=1;
                        return {
                            id:`warn_${item.DGIMNs}`,
                            pointname: item.PointName,
                            discription:discription,
                            overwarnings:item.OverWarnings,
                            sontype:"warn",
                            //组件里根据这个分组
                            type: 'alarm',
                            key:`warn_${item.DGIMNs}`,
                            title:`${item.PointName}发生了预警`,
                            description:`${discription}`,
                        };
                    }));
                    notices=notices.concat(dataexceptions.map((item,key)=>{
                        count+=item.AlarmCount;
                        return {
                            id:`exception_${item.DGIMNs}`,
                            pointname: item.PointName,
                            exceptiontypes:item.ExceptionTypes,
                            firsttime:item.FirstAlarmTime,
                            lasttime:item.LastAlarmTime,
                            alarmcount:item.AlarmCount,
                            sontype:"exception",
                            //组件里根据这个分组
                            type: 'alarm',
                            key:`exception_${item.DGIMNs}`,
                            title:`${item.PointName}报警${item.AlarmCount}次`,
                            description:`从${item.FirstAlarmTime}至${item.LastAlarmTime}发生了${item.AlarmCount}次异常报警`,
                        };
                    }));
                }
            }
            //预警消息
            const res2 = yield call(mymessagelist,{});
            let advises=res2.data.map((item,key)=>({
                id:`advise_${item.DGIMN}`,
                msgtitle: item.MsgTitle,
                msg:item.Msg,
                pushtime:item.PushTime,
                pushusername:item.PushUserName,
                isview:item.IsView,
                sontype:item.PushType,
                //组件里根据这个分组
                type: 'advise',
                key:`advise_${item.DGIMN}_${item.ID}`,
                title:`${item.MsgTitle}`,
                description:`${item.Msg}`,
            }));
            count+=advises.length;
            notices=notices.concat(advises);
            yield put({
                type: 'saveNotices',
                payload: notices,
            });
            yield put({
                type: 'user/changeNotifyCount',
                payload: count,
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
        * changeNotices({payload}, {put, call, select}) {
            const {message} = payload;
            const {Message:data}=JSON.parse(message);
            let { notices = [] } = yield select(t => t.notices);
            let key="";
            if(data.AlarmType===EnumPropellingAlarmSourceType.DataException||
                data.AlarmType===EnumPropellingAlarmSourceType.DYPARAMETER||
                data.AlarmType===EnumPropellingAlarmSourceType.DataLogicErr||
                data.AlarmType===EnumPropellingAlarmSourceType.DYSTATEALARM) {
                key="exception_";
                key+=data.DGIMN;
                let newnotice=notices.find(n => n.id===key);
                if(newnotice){
                    newnotice.lasttime=data.AlarmTime;
                    newnotice.alarmcount+=1;
                }
            } else if(data.AlarmType===EnumPropellingAlarmSourceType.DataOver){
                key="over_";
                key+=data.DGIMN;
                let newnotice=notices.find(n => n.id===key);
                if(newnotice){
                    newnotice.lasttime=data.AlarmTime;
                    newnotice.alarmcount+=1;
                }
            } else if (data.AlarmType===EnumPropellingAlarmSourceType.Data){
                key="warn_";
                key+=data.DGIMN;
                let newnotice=notices.find(n => n.id===key);
                if(newnotice){
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
                }
            }
        },
        * changeAdvises({payload}, {put, call, select}) {
            const {message} = payload;
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
                notices: payload,
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
                    // debugger;
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
                    // case 'Alarm':
                    //     dispatch({
                    //         type: 'changeNotices',
                    //         payload: {message:obj.Message},
                    //     });
                    //     break;
                    // case 'Notice':
                    //     dispatch({
                    //         type: 'changeAdvises',
                    //         payload: {message:obj.Message},
                    //     });
                    //     break;
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
