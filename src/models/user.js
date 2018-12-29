import Cookie from 'js-cookie';
import { message } from 'antd';
import { query as queryUsers, changepwd, getMenuData } from '../services/user';
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

export default {
    namespace: 'user',

    state: {
        list: [],
        loading: false,
        currentUser: {},
        changepwdRes: '',
        currentMenu: []
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(queryUsers);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *fetchCurrent(_, { call, put }) {
            const response = Cookie.get('token');
            if (response) {
                const user = JSON.parse(response);
                const responseMenu = yield call(getMenuData, {menuId: '99dbc722-033f-481a-932a-3c6436e17245', userId: user.User_ID});
                if (responseMenu.requstresult === '1') {
                    const cMenu = yield call(formatter, responseMenu.data);
                    yield put({
                        type: 'saveCurrentUser',
                        payload: {
                            currentUser: user,
                            currentMenu: cMenu
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
        * changepwd({ payload }, { call, put, select }) {
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
};
