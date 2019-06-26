import {
    Model
} from '../dvapack';
import {
    getroleinfobytree, getroleinfobyid, insertroleinfo, delroleinfo, updroleinfo, getrolestreeandobj, getalluser, getuserbyroleid, insertrolebyuser
} from '../services/rolelist';
import { message } from 'antd';
/*
用户管理相关接口
add by lzp
modify by
*/
export default Model.extend({
    namespace: 'roleinfo',

    state: {
        RoleInfoTree: [],
        RoleInfoOne: [],
        RolesTree: [],
        AllUser: [],
        UserByRoleID: []
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
        /*获取角色详细信息及层级关系**/
        * getroleinfobytree({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getroleinfobytree, { ...payload });
            if (result.IsSuccess) {
                yield update({
                    RoleInfoTree: result.Datas
                });
            }
        },
        /*获取单个角色信息**/
        * getroleinfobyid({
            payload
        }, {
            call,
            put,
            update,
        }) {
            const result = yield call(getroleinfobyid, {
                ...payload
            });
            if (result.IsSuccess) {
                debugger
                yield update({
                    RoleInfoOne: result.Datas
                });
            }
        },
        /*新增角色信息**/
        * insertroleinfo({
            payload
        }, {
            call,
            put,
            update,
        }) {
            const result = yield call(insertroleinfo, {
                ...payload
            });
            payload.callback(result);
        },
        /*删除角色信息**/
        * delroleinfo({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(delroleinfo, {
                Roles_ID: payload.Roles_ID,
            });
            // if (result.IsSuccess) {
            //     message.success("删除成功");
            //     yield put({
            //         type: "roleinfo/getroleinfobytree",
            //         payload: {
            //         }
            //     })
            // }
            payload.callback(result);
        },
        /*修改角色信息**/
        * updroleinfo({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(updroleinfo, {
                ...payload
            });
            // if (result.IsSuccess) {
            //     message.success("修改成功");
            //     yield put({
            //         type: "roleinfo/getroleinfobytree",
            //         payload: {
            //         }
            //     })
            // }
            payload.callback(result);
        },
        /*获取角色树(带根结点)**/
        * getrolestreeandobj({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getrolestreeandobj, {
                ...payload
            });
            if (result.IsSuccess) {
                yield update({
                    RolesTree: result.Datas
                });
            }

        },
        /*获取所有用户**/
        * getalluser({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getalluser, {
                ...payload
            });
            if (result.IsSuccess) {
                yield update({
                    AllUser: result.Datas
                });
            }

        },
        /*获取当前角色的用户**/
        * getuserbyroleid({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getuserbyroleid, {
                ...payload
            });
            if (result.IsSuccess) {
                yield update({
                    UserByRoleID: result.Datas
                });
            }

        },
        /*给角色添加用户（可批量）**/
        * insertrolebyuser({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(insertrolebyuser, {
                ...payload
            });
        },
    },
    reducers: {
    },
});
