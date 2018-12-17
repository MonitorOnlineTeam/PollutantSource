import {
    Model
} from '../dvapack';
import {
    getlist, getlistbyid, deletebyid, addoutputstop,
} from '../services/stopmanagement';
export default Model.extend({
    namespace: 'stopmanagement',

    state: {
        requstresult: null,
        list: [],
        total: 0,
        loading: false,
        pageSize: 10,
        pageIndex: 1,
        reason: null,
    },
    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen((location) => {
                // if (location.pathname === '/monitor/sysmanage/userinfo') {
                //     // 初始化testId的值为10
                //     dispatch({
                //         type: 'fetchuserlist',
                //         payload: {

                //         },
                //     });
                // }
            });
        },
    },
    effects: {
        * getlist({
            payload: {
                pageIndex,
                pageSize,
                StopHours,
                RecordUserName,
                DGIMN,
                Data,
                datatype
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getlist, {
                pageIndex: pageIndex,
                pageSize: pageSize,
                StopHours: StopHours,
                RecordUserName: RecordUserName,
                DGIMN: DGIMN,
                Data: Data,
                datatype: datatype,
            });

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    list: result.data,
                    total: result.total,
                    pageIndex: pageIndex,
                    pageSize: pageSize
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    list: [],
                    total: 0,
                    pageIndex: null,
                    pageSize: null
                });
            }
        },
        * addoutputstop({
            payload: {
                DGIMN,
                BeginTime,
                EndTime,
                StopDescription,
                Files,
                callback,
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(addoutputstop, {
                DGIMN: DGIMN,
                BeginTime: BeginTime,
                EndTime: EndTime,
                StopDescription: StopDescription,
                Files: Files,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            callback();
        },
        * getlistbyid({
            payload: {
                OutputStopID
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getlistbyid, {
                OutputStopID: OutputStopID
            });

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    editlsit: result.data[0],
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    editlsit: null,
                    reason: result.reason,
                });
            }
        },
        * deletebyid({
            payload: {
                OutputStopID,
                pageIndex,
                pageSize,
                StopHours,
                RecordUserName,
                DGIMN,
                Data,
                datatype,
            }
        }, {
            call,
            put,
            update,
            select,
            callback
        }) {
            const result = yield call(deletebyid, {
                OutputStopID: OutputStopID
            });

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    reason: result.reason,
                });
                yield put({
                    type: 'getpollutantbydgimn',
                    payload: {
                        pageIndex: pageIndex,
                        pageSize: pageSize,
                        StopHours: StopHours,
                        RecordUserName: RecordUserName,
                        DGIMN: DGIMN,
                        Data: Data,
                        datatype: datatype,
                    },
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    reason: result.reason,
                });
            }
            callback();
        },
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
                // currentUser: action.payload,
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
            // ;
            return {
                ...state,
                currentMenu: action.payload,
            };
        },

    },
});
