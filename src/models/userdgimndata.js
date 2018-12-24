import {
    Model
} from '../dvapack';
import {
    userDgimnDataFilter, addAllDgimnDataFilter, addDgimnDataFilter
} from '@/services/userDgimnData';
export default Model.extend({
    namespace: 'userdgimndata',
    state: {
        requstresult: null,
        list: [],
        total: 0,
        loading: false,
        pageSize: 10,
        pageIndex: 1,
        reason: null,
        ischecked: [],
        alldgimn: [],
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
        * userDgimnDataFilter({
            payload: {
                UserId,
                TestKey,
                pageIndex,
                pageSize,
                callback,
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(userDgimnDataFilter, {
                UserId: UserId,
                TestKey: TestKey,
                pageIndex: pageIndex,
                pageSize: pageSize,
            });
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    list: result.data,
                    total: result.total,
                    pageIndex: pageIndex === undefined ? 1 : pageIndex,
                    pageSize: pageSize === undefined ? 10 : pageSize,
                    ischecked: result.data[0].IsCheck.split(','),
                    alldgimn: result.data[0].AllDgimn.split(','),
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
            callback();
        },
        * addAllDgimnDataFilter({
            payload: {
                UserId,
                DGIMNS,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(addAllDgimnDataFilter, {
                UserId: UserId,
                DGIMNS: DGIMNS,
            });
            yield update({
                requstresult: result.requstresult,
            });
            callback();
        },
        * addDgimnDataFilter({
            payload: {
                UserId,
                DGIMNS,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(addDgimnDataFilter, {
                UserId: UserId,
                DGIMNS: DGIMNS,
            });
            yield update({
                requstresult: result.requstresult,
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
