// import { queryNotices } from '../services/mockservice';
import { Model } from '../dvapack';
import { getTimeDistance } from '../utils/utils';
import { loadPollutantType, getAllPointAlarmInfo } from '../services/api';
import * as service from '../dvapack/websocket/mywebsocket';
import { debug } from 'util';

export default Model.extend({
    namespace: 'global',
    state: {
        collapsed: false,
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
            let today = getTimeDistance('today');

            payload.time = today;
            const res = yield call(getAllPointAlarmInfo, payload);

            let data = [];
            let count = 0;
            if (res) {
                if (res.data) {
                    res.data.map(elem => {
                        data.push({
                            id: elem.DGIMN,
                            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
                            title: elem.PointName + '报警' + elem.Count + '次',
                            parentname: elem.ParentName,
                            pointname: elem.PointName,
                            datetime: elem.DateNow,
                            alarmTime: elem.AlarmTime,
                            DGIMN: elem.DGIMN,
                            datenow: elem.DateNow,
                            type: '报警'
                        });
                        count += elem.Count;
                    });
                }
            }

            yield put({
                type: 'saveNotices',
                payload: data,
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
        * saveFeed({payload}, {put, call, select}) {
            const {data} = payload;
            console.log('data152:' + JSON.stringify(data));
            yield put({type: 'fetchNotices',
                payload: {
                    data
                }});
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
                            type: 'user/fetchCurrent',
                            payload: obj.Message
                        });
                        break;
                    case 'MinuteData':
                        dispatch({
                            type: 'welcome'
                        });
                        break;
                    case 'HourData':
                        dispatch({
                            type: 'welcome'
                        });
                        break;
                    case 'DynamicControlParam':
                        break;
                    case 'DynamicControlState':
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
