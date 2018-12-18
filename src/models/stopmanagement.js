import {
    Model
} from '../dvapack';
import {
    getlist, getlistbyid, deletebyid, addoutputstop, uploadfiles, deletefiles, outputstoptimechecked, getoutputstopfiles
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
        fileslist: [],
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
                Data,
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
                Data: Data,
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
        * uploadfiles({
            payload: {
                file,
                fileName,
                callback,
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(uploadfiles, {
                file: file,
                fileName: fileName,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            callback();
        },
        * deletefiles({
            payload: {
                guid,
                callback,
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(deletefiles, {
                guid: guid,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            callback();
        },
        * outputstoptimechecked({
            payload: {
                DGIMN,
                Data,
                callback,
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(outputstoptimechecked, {
                DGIMN: DGIMN,
                Data: Data,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            callback();
        },
        * getoutputstopfiles({
            payload: {
                OutputStopID,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getoutputstopfiles, {
                OutputStopID: OutputStopID
            });
            yield update({
                fileslist: result.data,
                requstresult: result.requstresult,
                reason: result.reason
            });
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
