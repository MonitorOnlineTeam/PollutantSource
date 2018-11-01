import Cookie from 'js-cookie';
import { Model } from '../dvapack';
import { query as queryUsers, changepwd, getMenuData } from '../services/user';
import { message } from 'antd';
import { isUrl } from '../utils/utils';

function formatter(data, parentPath = '') {
    if (data && data.length > 0) {
        return data.map((item) => {
            let { path } = item;
            if (!isUrl(path)) {
                path = parentPath + item.path;
            }
            const result = {
                ...item,
                path,
            };
            if (item.children) {
                result.children = formatter(item.children, `${parentPath}${item.path}/`);
            }
            return result;
        });
    }
    return [];
}
export default Model.extend({
    namespace: 'user',

    state: {
        list: [],
        loading: false,
        currentUser: {},
        changepwdRes: '',
        currentMenu: []
    },
    subscriptions: {
        // setup({ dispatch, history }) {
        //     // debugger;
        //     history.listen((location) => {
        //         // debugger;
        //         if (location.pathname === '/overview') {
        //             // 初始化testId的值为10
        //             dispatch({
        //                 type: 'getCurrentMenu',
        //                 payload: {menuId: '06cd7c3a-2d2e-4625-94db-35d95647153d', userId: 'eb85dbe8-49fd-4918-9ba1-34f7c337bd44'},
        //             });
        //         }
        //     });
        // },
    },
    effects: {
        * fetch(_, { call, put }) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });
            const response = yield call(queryUsers);
            yield put({
                type: 'save',
                payload: response,
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });
        },
        * fetchCurrent(_, { put, call }) {
            const response = Cookie.get('token');
            if (response) {
                const user = JSON.parse(response);
                const responseMenu = yield call(getMenuData, {menuId: '99dbc722-033f-481a-932a-3c6436e17245', userId: user.User_ID});
                debugger;
                if (responseMenu.requstresult === '1') {
                    const _currentMenu = yield call(formatter, responseMenu.data);
                    debugger;
                    yield put({
                        type: 'saveCurrentUser',
                        payload: {
                            currentUser: user,
                            currentMenu: _currentMenu
                        },
                    });
                } else {
                    message.info('菜单获取失败，请联系系统管理员！');
                    yield put({
                        type: 'login/logout',
                    });
                }
            }
        },
        * changepwd({ payload }, { call, put, update, select }) {
            const response = Cookie.get('token');
            if (response) {
                // const user = JSON.parse(response);
                const res = yield call(changepwd, payload);
                yield put({
                    type: 'saveChangePwdRes',
                    payload: res.data,
                });
                const changepwdResStr = yield select(state => state.user.changepwdRes);
                if (changepwdResStr.includes('成功')) {
                    message.info('密码修改成功,请重新登录！');
                    yield put({
                        type: 'login/logout',
                    });
                } else if (changepwdResStr.includes('原始密码') || changepwdResStr.includes('旧密码') || changepwdResStr.includes('老密码')) {
                    message.info('旧密码输入错误！');
                } else {
                    message.info('密码修改失败,请稍后重试！');
                }
            }
        },
        * getCurrentMenu({ payload }, { call, put, update, select }) {
            const response = Cookie.get('token');
            // debugger;
            if (response) {
                // debugger;
                // const user = JSON.parse(response);
                const responseMenu = yield call(getMenuData, payload);
                // debugger;
                if (responseMenu.requstresult === '1') {
                    yield update({ currentMenu: responseMenu.data });
                    // const dddd = yield select(state => state.user.currentMenu);
                    // console.log(dddd);
                } else {
                    message.info('菜单获取失败，请联系系统管理员！');
                    yield put({
                        type: 'login/logout',
                    });
                }
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
            // debugger;
            return {
                ...state,
                currentMenu: action.payload,
            };
        },

    },
});
