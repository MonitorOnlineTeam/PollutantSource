
import {
    Model
} from '../dvapack';
import {
    GetEnterpriseManageList,
    GetEnterpriseModel,
    GetOtherModel,
    AddEnterpriseManage,
    UpdateEnterpriseManage,
    deleteEnterprise,
} from '../services/basicinfo';
import {
    queryindustrytypelist,
    queryattentiondegreelist,
    queryunittypelist,
    queryPSScalelist,
    queryregisttypelist,
    querysubjectionrelationlist,
    querypsClasslist,
} from '../services/entApi';
/**
 * 功  能：基本信息管理
 * 创建人：xpy
 * 创建时间：2019.04.11
 */
export default Model.extend({
    namespace: 'basicinfo',

    state: {
        loading: false,
        EnterpriseManageList: {
            Data: [],
            requstresult: null,
            reason: null,
            pageSize: 10,
            pageIndex: 1,
            total: 0,
            RegionCode: null,
            EntName: null,
        },
        EnterpriseModel: [],
        industryTypelist: [],
        attentionDegreelist: [],
        unitTypelist: [],
        pSScalelist: [],
        registTypelist: [],
        subjectionRelationlist: [],
        psClasslist: [],
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
        /**
         * 基本信息-企业管理列表
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * GetEnterpriseManageList({
            payload
        }, {
            call,
            update,
            select,
        }) {
            // const { EnterpriseManageList } = yield select(state => state.basicinfo);
            const { EnterpriseManageList } = yield select(a => a.basicinfo);
debugger
            let body = {
                pageIndex: EnterpriseManageList.pageIndex,
                pageSize: EnterpriseManageList.pageSize,
                regionCode: EnterpriseManageList.RegionCode,
                name: EnterpriseManageList.EntName,
            }
            const result = yield call(GetEnterpriseManageList, body);
            yield update({
                EnterpriseManageList: {
                    ...EnterpriseManageList,
                    ...{
                        Data: result.data,
                        requstresult: result.requstresult,
                        reason: result.reason,
                        total: result.total,
                    }
                }
            });
        },
        /**
      * 基本信息-删除项目
      * @param {传递参数} 传递参数
      * @param {操作} 操作项
      */
        * deleteEnterprise({
            payload
        }, {
            call,
            put,
        }) {
            const result = yield call(deleteEnterprise, {
                ID: payload.ID,
            });
            if (result.requstresult === '1') {
                //?
                yield put({
                    type: 'GetProjectManageList',
                    payload: {
                        pageIndex: payload.pageIndex,
                        pageSize: payload.pageSize,
                        ItemNumber: payload.ItemNumber,
                    }
                });
            }
            payload.callback(result);
        },
        /**
         * 基本信息-企业实体
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * GetEnterpriseModel({
            payload,
        }, {
            call,
            update
        }) {
            const body = {
                EntCode: payload.EntCode
            };
            debugger
            const result = yield call(GetEnterpriseModel, body);
            yield update({
                EnterpriseModel: result.data,
                loading: true,
            });
            if (payload.flag) {
                payload.callback(result.requstresult);
            }

        },
        /**
          * 基本信息-企业管理（其他参数）
          * @param {传递参数} 传递参数
          * @param {操作} 操作项
          */
        * GetOtherModel({
            payload,
        }, {
            call,
            update
        }) {
            const industryTypelist = yield call(queryindustrytypelist);
            const attentionDegreelist = yield call(queryattentiondegreelist);
            const unitTypelist = yield call(queryunittypelist);
            const pSScalelist = yield call(queryPSScalelist);
            const registTypelist = yield call(queryregisttypelist);
            const subjectionRelationlist = yield call(querysubjectionrelationlist);
            const psClasslist = yield call(querypsClasslist);
            yield update({
                industryTypelist,
                attentionDegreelist,
                unitTypelist,
                pSScalelist,
                registTypelist,
                subjectionRelationlist,
                psClasslist,
            });
        },
        /**
          * 基本信息-添加企业
          * @param {传递参数} 传递参数
          * @param {操作} 操作项
          */
        * AddEnterpriseManage({
            payload
        }, {
            call,
        }) {
            debugger
            const result = yield call(AddEnterpriseManage, {
                ...payload
            });
            payload.callback(result);
        },
        /**
         * 基本信息-修改企业
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * UpdateEnterpriseManage({
            payload
        }, {
            call,
        }) {
            const result = yield call(UpdateEnterpriseManage, {
                ...payload
            });
            payload.callback(result);
        },
    },
});
