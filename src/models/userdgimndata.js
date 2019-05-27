import {
    Model
} from '../dvapack';
import {
    userDgimnDataFilter, addAllDgimnDataFilter, addDgimnDataFilter,addalarmlinkmandgimncode
} from '../services/userDgimnData';

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
        yichangDgimn: [],
        chaobiaoDgimn:[],
        yujingDgimn:[],
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
        /*获取当前登陆人的监测点列表**/
        * userDgimnDataFilter({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(userDgimnDataFilter, {
                ...payload
            });
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    list: result.data,
                    total: result.total,
                    pageIndex: payload.pageIndex === undefined ? 1 : payload.pageIndex,
                    pageSize: payload.pageSize === undefined ? 10 : payload.pageSize,
                    ischecked: result.data[0].IsCheck.split(','),
                    alldgimn: result.data[0].AllDgimn.split(','),
                    yichangDgimn: result.data[0].yCheck.split(','),
                    chaobiaoDgimn: result.data[0].bCheck.split(','),
                    yujingDgimn: result.data[0].jCheck.split(','),
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
            payload.callback();
        },
        /*把当前所有监测点权限 添加/移除 当前登陆人**/
        * addAllDgimnDataFilter({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(addAllDgimnDataFilter, {
                ...payload
            });
            yield update({
                requstresult: result.requstresult,
            });
            payload.callback();
        },
        /*把当前监测点权限 添加/移除 当前登陆人**/
        * addDgimnDataFilter({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(addDgimnDataFilter, {
                ...payload
            });
            yield update({
                requstresult: result.requstresult,
            });
            payload.callback();
        },
        /*添加通知权限**/
        * addalarmlinkmandgimncode({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(addalarmlinkmandgimncode, {
                ...payload
            });
            yield update({
                requstresult: result.requstresult,
            });
            payload.callback();
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
