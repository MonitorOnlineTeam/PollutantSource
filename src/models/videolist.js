import { Model } from '../dvapack';
import { getList, deleteVideoInfo, gethistoryVideoList, updateVideoInfos, addVideoInfo, getAlarmHistory, updateAlarmHistory } from '../services/videodata';
import { queryprocesschart } from '../services/api';

export default Model.extend({
    namespace: 'videolist',
    state: {
        editUser: null,
        requstresult: null,
        list: [],
        historyVideolist: [],
        AlarmInfoList: [],
        edituser: null,
        total: 0,
        loading: false,
        pageSize: 10,
        pageIndex: 1,
        reason: null,
        realdata: []
    },
    effects: {
        * fetchuserlist({ payload }, { call, update }) {
            const result = yield call(getList, { DGIMN: payload.DGIMN });
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    list: result.data
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    list: []
                });
            }
        },
        * updateVideoInfos({ payload }, { call, put, update }) {
            const result = yield call(updateVideoInfos, { ...payload });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            yield put({
                type: 'fetchuserlist',
                payload: payload.DGIMN,
            });
        },
        * addVideoInfos({ payload }, { call, put, update }) {
            const result = yield call(addVideoInfo, { ...payload });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            yield put({
                type: 'fetchuserlist',
                payload: payload.DGIMN,
            });
        },
        * deleteVideoInfo({ payload }, { call, put, update }) {
            const result = yield call(deleteVideoInfo, { ...payload });
            yield update({
                requstresult: result.requstresult,
                editUser: result.data[0]
            });
            yield put({
                type: 'fetchuserlist',
                payload: payload.DGIMN,
            });
        },
        * gethistoryVideoList({ payload }, { call, update }) {
            const result = yield call(gethistoryVideoList, { ...payload });
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    historyVideolist: result.data
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    historyVideolist: []
                });
            }
        },
        * getAlarmHistory({
            payload }, { call, update }) {
            const result = yield call(getAlarmHistory, { ...payload });
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    AlarmInfoList: result.data,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    AlarmInfoList: [],
                });
            }
        },
        * updateAlarmHistory({ payload }, { call, put, update }) {
            const result = yield call(updateAlarmHistory, {
                ...payload
            });
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    AlarmInfoList: result.data,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    AlarmInfoList: [],
                });
            }
            yield put({
                type: 'getAlarmHistory',
                payload: { ...payload },
            });
        },
        * queryprocesschart({ payload }, { call, update }) {
            debugger;
            const res = yield call(queryprocesschart, { ...payload });
            yield update({ realdata: res });
        }
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                list: action.payload,
            };
        },
        changeLoading(state, action) {
            return {
                ...state,
                loading: action.payload,
            };
        },
        saveCurrentUser(state, action) {
            return {
                ...state,
                ...action.payload
            };
        },
        changeNotifyCount(state, action) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload,
                },
            };
        },
        saveChangePwdRes(state, action) {
            return {
                ...state,
                changepwdRes: action.payload,
            };
        },
        setCurrentMenu(state, action) {
            return {
                ...state,
                currentMenu: action.payload,
            };
        },
    },
});
