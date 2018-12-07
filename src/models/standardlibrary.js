import {
    Model
} from '../dvapack';
import {
    getlist, enableordisable, deletestandardlibrarybyid, addstandardlibrary, addstandardlibrarypollutant, uploadfiles, getStandardlibrarybyid, deletefiles
    , editstandardlibrary, getpollutantlist, getstandardlibrarypollutantlist, deletestandardlibrarypollutantbyid, editStandardlibrarypollutant, getStandardlibrarypollutantbyid
} from '../services/standardlibrary';
export default Model.extend({
    namespace: 'standardlibrary',

    state: {
        requstresult: null,
        list: [],
        pollutantList: [],
        total: 0,
        loading: false,
        pageSize: 10,
        pageIndex: 1,
        reason: null,
        editstandardlibrary: null,
        StandardLibraryID: null,
        PollutantList: [],
        editstandardlibrarypollutant: null,
        standardlibrarypollutant: [],
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
                Name,
                Type
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
                Name: Name,
                Type: Type
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
        * getstandardlibrarypollutantlist({
            payload: {
                StandardLibraryID
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getstandardlibrarypollutantlist, {
                StandardLibraryID: StandardLibraryID,
            });

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    standardlibrarypollutant: result.data,
                    total: result.total,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    standardlibrarypollutant: [],
                });
            }
        },
        * enableordisable({
            payload: {
                StandardLibraryID,
                Enalbe,
                pageIndex,
                pageSize,
                Name,
                Type
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(enableordisable, {
                StandardLibraryID: StandardLibraryID,
                Enalbe: Enalbe
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            yield put({
                type: 'getlist',
                payload: {
                    pageIndex,
                    pageSize,
                    Name,
                    Type
                },
            });
        },
        * deletestandardlibrarybyid({
            payload: {
                StandardLibraryID,
                pageIndex,
                pageSize,
                Name,
                Type,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(deletestandardlibrarybyid, {
                StandardLibraryID: StandardLibraryID,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            yield put({
                type: 'getlist',
                payload: {
                    pageIndex,
                    pageSize,
                    Name,
                    Type
                },
            });
            callback();
        },
        * deletestandardlibrarypollutantbyid({
            payload: {
                StandardLibraryID,
                Id,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(deletestandardlibrarypollutantbyid, {
                Id: Id,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            yield put({
                type: 'getstandardlibrarypollutantlist',
                payload: {
                    StandardLibraryID,
                },
            });
            callback();
        },
        * addstandardlibrary({
            payload: {
                Name,
                Type,
                IsUsed,
                Files,
                callback,
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(addstandardlibrary, {
                Name: Name,
                Type: Type,
                IsUsed: IsUsed,
                Files: Files,
            });
            yield update({
                StandardLibraryID: result.data,
                requstresult: result.requstresult,
                reason: result.reason
            });
            callback();
        },
        * addstandardlibrarypollutant({
            payload: {
                StandardLibraryID,
                PollutantCode,
                AlarmType,
                UpperLimit,
                LowerLimit,
                callback,
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(addstandardlibrarypollutant, {
                StandardLibraryID: StandardLibraryID,
                PollutantCode: PollutantCode,
                AlarmType: AlarmType,
                UpperLimit: UpperLimit,
                LowerLimit: LowerLimit,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            callback();
        },
        * editstandardlibrary({
            payload: {
                StandardLibraryID,
                Name,
                Type,
                IsUsed,
                Files,
                callback,
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(editstandardlibrary, {
                StandardLibraryID: StandardLibraryID,
                Name: Name,
                Type: Type,
                IsUsed: IsUsed,
                Files: Files,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
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
        * getStandardlibrarybyid({
            payload: {
                StandardLibraryID,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getStandardlibrarybyid, {
                StandardLibraryID: StandardLibraryID,
            });
            yield update({
                editstandardlibrary: result.data[0],
                requstresult: result.requstresult,
                reason: result.reason
            });
            callback();
        },
        * getStandardlibrarypollutantbyid({
            payload: {
                Guid,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getStandardlibrarypollutantbyid, {
                Guid: Guid,
            });
            yield update({
                editstandardlibrarypollutant: result.data[0],
                requstresult: result.requstresult,
                reason: result.reason
            });
            callback();
        },
        * getpollutantlist({
            payload: {
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getpollutantlist, {
            });
            yield update({
                PollutantList: result.data,
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
