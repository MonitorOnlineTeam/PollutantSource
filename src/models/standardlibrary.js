import {
    Model
} from '../dvapack';
import {
    getlist, getpollutantListlist, enableordisable, deletestandardlibrarybyid
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
        * getpollutantListlist({
            payload: {
                StandardLibraryID
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getpollutantListlist, {
                StandardLibraryID: StandardLibraryID,
            });

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    pollutantList: result.data,
                    total: result.total,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    pollutantList: [],
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
