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
        editlsit: null,
    },
    subscriptions: {
        setup({
            dispatch,
            history
        }) {
            history.listen((location) => {
            });
        },
    },
    effects: {
        /**获取停产列表 */
        * getlist({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getlist, {
                ...payload
            });

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    list: result.data,
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize
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
        /**添加停产信息 */
        * addoutputstop({
            payload
        }, {
            call,
            put,
            update,
        }) {
            const result = yield call(addoutputstop, {
                ...payload
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            yield put({
                type: 'getlist',
                payload: {
                    ...payload
                },
            });
            callback();
        },
        * getlistbyid({
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
            callback();
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
                callback
            }
        }, {
            call,
            put,
            update,
            select,
        }) {
            const result = yield call(deletebyid, {
                OutputStopID: OutputStopID
            });

            yield update({
                requstresult: result.requstresult,
                reason: result.reason,
            });
            yield put({
                type: 'getlist',
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
            callback();
            yield update({
                requstresult: result.requstresult,
                reason: result.reason,
            });
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
