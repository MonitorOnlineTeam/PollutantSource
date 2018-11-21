import {
    Model
} from '../dvapack';
import {
    getList, deleteuser, enableduser, isexistenceuser, adduser, getuser, edituser, userDgimnDataFilter
} from '../services/userlist';
export default Model.extend({
    namespace: 'userinfo',

    state: {
        editUser: null,
        requstresult: null,
        list: [],
        edituser: null,
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
        * fetchuserlist({
            payload: {
                pageIndex,
                pageSize,
                UserAccount,
                DeleteMark
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getList, {pageIndex: pageIndex, pageSize: pageSize, UserAccount: UserAccount, DeleteMark: DeleteMark});

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
        * deleteuser({
            payload: {
                UserId,
                pageIndex,
                pageSize,
                UserAccount,
                DeleteMark
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(deleteuser, {
                UserId: UserId,
            });
            yield update({
                requstresult: result.requstresult,
            });
            yield put({
                type: 'fetchuserlist',
                payload: {
                    pageIndex,
                    pageSize,
                    UserAccount,
                    DeleteMark
                },
            });
        },
        * enableduser({
            payload: {
                UserId,
                Enalbe,
                pageIndex,
                pageSize,
                UserAccount,
                DeleteMark
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(enableduser, {
                UserId: UserId,
                Enalbe: Enalbe,
            });
            yield update({
                requstresult: result.requstresult,
            });
            yield put({
                type: 'fetchuserlist',
                payload: {
                    pageIndex,
                    pageSize,
                    UserAccount,
                    DeleteMark
                },
            });
        },
        * isexistenceuser({
            payload: {
                UserAccount,
                callback,
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(isexistenceuser, {
                UserAccount: UserAccount,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            callback();
        },
        * adduser({
            payload: {
                UserAccount,
                UserName,
                UserSex,
                Email,
                Phone,
                Title,
                UserOrderby,
                SendPush,
                AlarmType,
                AlarmTime,
                UserRemark,
                DeleteMark,
                RolesId,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(adduser, {
                UserAccount: UserAccount,
                UserName: UserName,
                UserSex: UserSex,
                Email: Email,
                Phone: Phone,
                Title: Title,
                UserOrderby: UserOrderby,
                SendPush: SendPush,
                AlarmType: AlarmType,
                AlarmTime: AlarmTime,
                UserRemark: UserRemark,
                DeleteMark: DeleteMark,
                RolesId: RolesId
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            callback();
        },
        * getuser({
            payload: {
                UserId,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(getuser, {
                UserId: UserId
            });
            yield update({
                requstresult: result.requstresult,
                editUser: result.data[0]
            });
            callback();
        },
        * edituser({
            payload: {
                UserId,
                UserAccount,
                UserName,
                UserSex,
                Email,
                Phone,
                Title,
                UserOrderby,
                SendPush,
                AlarmType,
                AlarmTime,
                UserRemark,
                DeleteMark,
                RolesId,
                callback
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(edituser, {
                UserId: UserId,
                UserAccount: UserAccount,
                UserName: UserName,
                UserSex: UserSex,
                Email: Email,
                Phone: Phone,
                Title: Title,
                UserOrderby: UserOrderby,
                SendPush: SendPush,
                AlarmType: AlarmType,
                AlarmTime: AlarmTime,
                UserRemark: UserRemark,
                DeleteMark: DeleteMark,
                RolesId: RolesId
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            callback();
        },
        * userDgimnDataFilter({
            payload: {
                UserId,
                TestKey,
                pageIndex,
                pageSize,
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
