//行政区划/部門
import { message } from 'antd';
import { Children } from 'react';
import { GetRegions,
    GetXuRegions, GetDepartmentTree, GetEntRegion
} from '../services/regionapi';
import { Model } from '../dvapack';
import { EnumRequstResult } from '../utils/enum';

export default Model.extend({
    namespace: 'region',
    state: {
        RegionList: null, //行政区划
        dptList:[], //部门
        RegionArr:[],
        // defaultValue:[],
        enterpriseList: [], // 企业列表
    },

    effects: {
        // 行政区划
        * GetXuRegions({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetXuRegions, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({ RegionList: DataInfo.data });
            } else {
                yield update({ RegionList: [] });
            }
        },
        // 行政区划
        * GetRegions({
            payload,
        }, {
            call,
            update
        }) {
            const DataInfo = yield call(GetRegions, payload);
            if (DataInfo !== null && DataInfo.requstresult === '1') {
                yield update({
                    RegionArr: DataInfo.data
                });
            } else {
                yield update({
                    RegionArr: []
                });
            }
        },
        // 部门
        * GetDepartmentTree({
            payload,
        }, { call, update, select }) {
            const DataInfo = yield call(GetDepartmentTree, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({ dptList: DataInfo.data });
            }
        },

        // 企业
        * GetEntRegion({
            payload,
        }, { call, update, select }) {
            const DataInfo = yield call(GetEntRegion, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                yield update({ enterpriseList: DataInfo.data });
            }
        },
    },
});
