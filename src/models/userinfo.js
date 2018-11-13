import {
    Model
} from '../dvapack';
import {
    getList
} from '../services/userlist';
export default Model.extend({
    namespace: 'userinfo',

    state: {
        list: [],
        edituser: null,
        total: 0,
        loading: false,
        pageSize: 0,
        pageIndex: 0,

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
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const pageSize = 1;
            const result = yield call(getList, {pageIndex: pageIndex, pageSize: pageSize});
            yield update({
                list: result.data,
                total: result.total,
                pageIndex: pageIndex,
                pageSize: pageSize
            });
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
