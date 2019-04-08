import {
    Model
} from '../dvapack';
import {
    getpointlist, addpoint, getoperationsuserList, getspecialworkeruserList, getpoint, editpoint, deletepoint, getanalyzersys, addalyzersys, getanalyzersysmnmodel, editalyzersys, deletealyzersys
    , getcomponent, addalyzerchild, getanalyzerchild, getanalyzerchildmodel, deletealyzerchild, editalyzerchild, getpollutanttypelist, getgasoutputtypelist,getmaininstrumentName,getchildcems
    , getanalyzersysmn,getanalyzerbymn
} from '../services/pointinfo';
import { EnumRequstResult } from '../utils/enum';
/*
监测点管理相关接口
add by xpy
modify by
*/
export default Model.extend({
    namespace: 'pointinfo',

    state: {
        requstresult: null,
        list: [],
        userlist: [],
        swuserlist: [],
        editpoint: null,
        total: 0,
        loading: false,
        pageSize: 10,
        pageIndex: 1,
        reason: null,
        AnalyzerSys: [],
        editAnalyzerSys:null,
        getanalyzersys_requstresult:null,
        addalyzersys_requstresult:null,
        getanalyzersysmnmodel_requstresult:null,
        editalyzersys_requstresult:null,
        deletealyzersys_requstresult:null,
        component:[],
        getcomponent_requstresult:null,
        addalyzerchild_requstresult:null,
        analyzerchild:[],
        getanalyzerchild_requstresult:null,
        editalyzersyschild:null,
        getanalyzerchildmodel_requstresult:null,
        deletealyzerchild_requstresult:null,
        gasoutputtypelist:[],
        pollutanttypelist:[],
        gasoutputtypelist_requstresult: null,
        pollutanttypelist_requstresult:null,
        MainInstrumentName:[], //主要仪器名称
        ChildCems:[], //CEMS监测子系统
        Analyzers:[] //监测仪器信息
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
        * getpointlist({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getpointlist, {
                ...payload
            });
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
        /*添加监测点**/
        * addpoint({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(addpoint, {
                ...payload
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason,
            });
            payload.callback();
        },
        /*获取运维人**/
        * getoperationsuserList({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getoperationsuserList, {
            });
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    userlist: result.data,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    userlist: [],
                });
            }
            payload.callback();
        },
        /*获取环保专工**/
        * getspecialworkeruserList({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getspecialworkeruserList, {});
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    swuserlist: result.data,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    swuserlist: [],
                });
            }
            payload.callback();
        },
        /*获取污染物类型**/
        * getpollutanttypelist({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getpollutanttypelist, {
            });
            if (result.requstresult === '1') {
                yield update({
                    pollutanttypelist_requstresult: result.requstresult,
                    pollutanttypelist: result.data,
                });
            } else {
                yield update({
                    pollutanttypelist_requstresult: result.requstresult,
                    pollutanttypelist: [],
                });
            }
            payload.callback();
        },
        /**获取气监测点类型 */
        * getgasoutputtypelist({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getgasoutputtypelist, {
            });
            if (result.requstresult === '1') {
                yield update({
                    gasoutputtypelist_requstresult: result.requstresult,
                    gasoutputtypelist: result.data,
                });
            } else {
                yield update({
                    gasoutputtypelist_requstresult: result.requstresult,
                    gasoutputtypelist: [],
                });
            }
            payload.callback();
        },
        /**获取单个监测点实体 */
        * getpoint({
            payload
        }, {
            call,
            update,
        }) {

            const result = yield call(getpoint, {
                ...payload
            });
            yield update({
                requstresult: result.requstresult,
                editpoint: result.data[0]
            });
            payload.callback();
        },
        /**编辑监测点 */
        * editpoint({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(editpoint, {
                ...payload
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason,
            });
            payload.callback();
        },
        /**删除监测点 */
        * deletepoint({
            payload
        }, {
            call,
            put,
            update,
        }) {
            const result = yield call(deletepoint, {
                DGIMN: payload.DGIMN
            });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason,
            });
            yield put({
                type: 'getpointlist',
                payload: {
                    ...payload
                },
            });
            payload.callback();
        },
        /* 获取监测点CEMS监测子系统主表**/
        * getanalyzersys({
            payload
        }, {
            call,
            update,
        }) {

            const DataInfo = yield call(getanalyzersys, {
                ...payload
            });
            if (DataInfo !== null&& DataInfo.requstresult ==="1") {
                if (DataInfo.data !== null) {
                    yield update({
                        AnalyzerSys: DataInfo.data
                    });
                }
            }else{
                yield update({
                    AnalyzerSys: null
                });
            }

        },
        /**添加监测点CEMS监测子系统主表*/
        * addalyzersys({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(addalyzersys, {
                ...payload
            });
            yield update({
                addalyzersys_requstresult: result.requstresult,
                reason: result.reason,
            });
            payload.callback();
        },
        /**获取监测点CEMS监测子系统实体*/
        * getanalyzersysmnmodel({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getanalyzersysmnmodel, {
                ...payload
            });
            yield update({
                getanalyzersysmnmodel_requstresult: result.requstresult,
                editAnalyzerSys: result.data[0],
            });
            payload.callback();
        },
        /**编辑监测点CEMS监测子系统主表*/
        * editalyzersys({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(editalyzersys, {
                ...payload
            });
            yield update({
                editalyzersys_requstresult: result.requstresult,
                reason: result.reason,
            });
            payload.callback();
        },
        /**删除监测点CEMS监测子系统主表*/
        * deletealyzersys({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(deletealyzersys, {
                ...payload
            });
            yield update({
                deletealyzersys_requstresult: result.requstresult,
                reason: result.reason,
            });
            payload.callback();
        },
        /**获取测试项目 */
        * getcomponent({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getcomponent, {
            });
            yield update({

                getcomponent_requstresult: result.requstresult,
                reason: result.reason,
                component: result.data,
            });
            payload.callback();
        },
        /**添加监测点CEMS监测子系统子表*/
        * addalyzerchild({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(addalyzerchild, {
                ...payload
            });
            yield update({
                addalyzerchild_requstresult: result.requstresult,
                reason: result.reason,
            });
            payload.callback();
        },
        /**获取监测点CEMS监测子系统主表下所有子表的数据*/
        * getanalyzerchild({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getanalyzerchild, {
                ...payload
            });
            yield update({

                getanalyzerchild_requstresult: result.requstresult,
                reason: result.reason,
                analyzerchild: result.data,
            });
            payload.callback();
        },
        /**获取监测点CEMS监测子系统子表实体*/
        * getanalyzerchildmodel({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(getanalyzerchildmodel, {
                ...payload
            });
            yield update({
                getanalyzerchildmodel_requstresult: result.requstresult,
                reason: result.reason,
                editalyzersyschild: result.data[0],
            });
            payload.callback();
        },
        /**删除监测点CEMS监测子系统子表*/
        * deletealyzerchild({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(deletealyzerchild,payload);
            yield update({
                deletealyzerchild_requstresult: result.requstresult,
                reason: result.reason,
            });
            payload.callback();
        },
        /**编辑监测点CEMS监测子系统子表*/
        * editalyzerchild({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(editalyzerchild, {
                ...payload
            });
            yield update({
                editalyzerchild_requstresult: result.requstresult,
                reason: result.reason,
            });
            payload.callback();
        },
        * getmaininstrumentName({
            payload: {
                callback
            }
        },{
            call,
            update
        }) {
            const DataInfo = yield call(getmaininstrumentName, {});
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data !== null) {
                    yield update({ MainInstrumentName: DataInfo.data });
                    callback();
                }
            }
        },
        * getchildcems({
            payload,
        },{
            call,
            update
        }) {
            const DataInfo = yield call(getchildcems, payload);
            if (DataInfo !== null&& DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data !== null) {
                    yield update({ ChildCems: DataInfo.data });
                }
            }
        },
        * getanalyzerbymn({
            payload,
        },{
            call,
            update
        }) {
            const DataInfo = yield call(getanalyzerbymn, payload);
            if (DataInfo !== null&& DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data !== null) {
                    yield update({ Analyzers: DataInfo.data });
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
});
