import {
    Model
} from '../dvapack';
import {
    getList, deleteuser, enableduser, isexistenceuser, adduser, getuser, edituser, editpersonaluser, getmypielist,mymessagelist,
    setEnterpriseDataRole,getEnterpriseDataRoles
} from '../services/userlist';
/*
用户管理相关接口
add by xpy
modify by
*/
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
        mypielist:[],
        mymessagelist:[],
        UserAccount:'',
        DeleteMark:'',
        EnterpriseDataRoles:[]
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
        /*获取用户列表**/
        * fetchuserlist({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getList, {...payload});
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
        /*删除用户**/
        * deleteuser({
            payload
        }, {
            call,
            put,
            update,
        }) {
            const result = yield call(deleteuser, {
                UserId: payload.UserId,
            });
            yield update({
                requstresult: result.requstresult,
            });
            yield put({
                type: 'fetchuserlist',
                payload:{
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    UserAccount: payload.UserAccount,
                    DeleteMark: payload.DeleteMark,
                }
            });
            payload.callback();
        },
        /*开启或禁用用户**/
        * enableduser({
            payload
        }, {
            call,
            put,
            update,
        }) {
            const result = yield call(enableduser, {
                UserId: payload.UserId,
                Enalbe: payload.Enalbe,
            });
            yield update({
                requstresult: result.requstresult,
            });
            yield put({
                type: 'fetchuserlist',
                payload: {
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    UserAccount: payload.UserAccount,
                    DeleteMark: payload.DeleteMark
                },
            });
        },
        /*验证用户名是否存在**/
        * isexistenceuser({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(isexistenceuser, {
                UserAccount: payload.UserAccount,
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            payload.callback();
        },
        /*添加用户**/
        * adduser({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(adduser, {
                ...payload
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            payload.callback();
        },
        /*获取单个用户实体**/
        * getuser({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getuser, {
                ...payload
            });
            yield update({
                requstresult: result.requstresult,
                editUser: result.data[0]
            });
            payload.callback();
        },
        /*编辑用户**/
        * edituser({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(edituser, {
                ...payload
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            payload.callback();
        },
        /*个人设置编辑信息**/
        * editpersonaluser({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(editpersonaluser, {
                ...payload
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            payload.callback();
        },
        /*个人设置我的派单列表**/
        * getmypielist({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getmypielist, {
                ...payload
            });

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    mypielist: result.data,
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    mypielist: [],
                    total: 0,
                    pageIndex: null,
                    pageSize: null
                });
            }
        },
        /*个人设置我的消息列表**/
        * mymessagelist({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(mymessagelist, {
                ...payload
            });

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    mymessagelist: result.data,
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    mymessagelist: [],
                    total: 0,
                    pageIndex: null,
                    pageSize: null
                });
            }
        },
        /**
         * 获取已授权的企业
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getEnterpriseDataRoles({ payload }, { call, put, update, select }) {
            const response = yield call(getEnterpriseDataRoles, {...payload});
            yield update({
                isSuccess: response.IsSuccess,
                EnterpriseDataRoles:response.Data
            });
            //payload.callback(response);
        },
        /**
         * 设置授权企业
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * setEnterpriseDataRole({ payload }, { call, put, update, select }) {
            const response = yield call(setEnterpriseDataRole, {...payload});
            yield update({
                isSuccess: response.IsSuccess
            });
            payload.callback(response);
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
