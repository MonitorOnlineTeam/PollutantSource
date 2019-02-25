/**
 * 功  能：企业管理【微信小程序】
 * 创建人：吴建伟
 * 创建时间：2019.02.20
 */

import { Model } from '../dvapack';
import {
    getEnterprisePageList,
    getEnterprise,
    addEnterprise,
    editEnterprise,
    deleteEnterprise,
    getAllPointQRCoderZip
} from '../services/EnterpriseManagerApi';
import { queryattentiondegreelist,queryregionlist } from '../services/api';
import { enterpriceid } from '../config';

export default Model.extend({
    namespace: 'enterprisemanagermodel',
    state: {
        enterpriseName:'',
        pageIndex:1,
        pageSize: 10,
        total:0,
        enterpriseList: [],
        entCode:'',
        enterprise:{},
        isSuccess:false,
        attentionOptions:[],
        regionList:[],
        zipUrl:''
    },
    subscriptions: {
    },
    effects: {
        /**
         * 获取企业列表
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getEnterprisePageList({ payload }, { call, put, update, select }) {
            const { enterpriseList,enterpriseName } = yield select(state => state.enterprisemanagermodel);
            let body = {
                pageSize: enterpriseList.pageSize||10,
                pageIndex: enterpriseList.pageIndex||1,
                EnterpriseName: enterpriseName
            };
            const response = yield call(getEnterprisePageList, body);
            yield update({
                enterpriseList: response.Data,
                total:response.Total
            });
        },
        /**
         * 获取单个企业
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getEnterprise({ payload }, { call, put, update, select }) {
            const { entCode } = yield select(state => state.enterprisemanagermodel);
            let body = {
                entCode: entCode,
            };
            const response = yield call(getEnterprise, body);
            yield update({
                enterprise: response.Data
            });
            // const tableDatasNew = yield select(state => state.workbenchmodel.exceptionAlarm);
            // console.log('new', tableDatasNew);
        },
        /**
         * 添加企业
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * addEnterprise({ payload }, { call, put, update, select }) {
            //debugger;
            const response = yield call(addEnterprise, {...payload});
            yield update({
                isSuccess: response.IsSuccess
            });
            payload.callback();
        },
        /**
         * 编辑企业
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * editEnterprise({ payload }, { call, put, update, select }) {
            const response = yield call(editEnterprise, {...payload});
            yield update({
                isSuccess: response.IsSuccess
            });
            payload.callback();
        },
        /**
         * 删除单个企业
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * deleteEnterprise({ payload }, { call, put, update, select }) {
            const response = yield call(deleteEnterprise, {...payload});
            yield update({
                isSuccess: response.IsSuccess
            });
            payload.callback();
        },
        /**
         * 根据企业ID，获取所有排口二维码并压缩
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getAllPointQRCoderZip({ payload }, { call, put, update, select }) {
            const response = yield call(getAllPointQRCoderZip, {...payload});
            yield update({
                isSuccess: response.IsSuccess,
                zipUrl:response.Data
            });
            payload.callback(response);
        },
        /**
         * 获取企业关注度
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getAttentionOptions({ payload }, { call, put, update, select }) {
            const response = yield call(queryattentiondegreelist);
            yield update({
                attentionOptions: response
            });
        },
        /**
         * 获取行政区
         * @param {传递参数} 传递参数
         * @param {操作} 操作项
         */
        * getRegionList({ payload }, { call, put, update, select }) {
            const response = yield call(queryregionlist, {recursionNum: 3});
            yield update({
                regionList: response
            });
        }
    },
    reducers: {
    }
});
