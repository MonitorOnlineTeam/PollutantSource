/**
 * 功  能：设备运转率
 * 创建人：吴建伟
 * 创建时间：2018.12.10
 */

import { Model } from '../dvapack';
import { getEquipmentOperatingRateForPoints, getEntEquipmentOperatingRateForPoints } from '../services/EquipmentOperatingRateApi';
import moment from 'moment';

export default Model.extend({
    namespace: 'equipmentoperatingrate',
    state: {
        pageSize: 20,
        pageIndex: 1,
        tableDatas: [],
        beginTime: moment().format('YYYY-MM-01 HH:mm:ss'),
        endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        EORSort: 'ascend',
        enttableDatas: [],
        entcode: null,
        entname: null,
        entCode: null,
    },
    subscriptions: {
    },
    effects: {
        * getData({ payload }, { call, put, update, select }) {
            const { beginTime, endTime, pageSize, EORSort } = yield select(state => state.equipmentoperatingrate);
            const { entCode } = yield select(state => state.equipmentoperatingrate);
            let body = {
                enterpriseCodes: (payload.entcode && payload.entcode != "null" && payload.entcode != "0") ? [payload.entcode] : null,
                beginTime: beginTime,
                endTime: endTime,
                pageSize: pageSize,
                EORSort: EORSort,
                pageIndex: payload.pageIndex,
                entCode: entCode
            };
            const response = yield call(getEquipmentOperatingRateForPoints, body);
            if (response && response.data && response.requstresult === "1") {
                yield update({
                    tableDatas: response.data,
                    total: response.total,
                    pageIndex: payload.pageIndex || 1,
                });
            }
        },
        * getEntData({ payload }, { call, put, update, select }) {
            const { beginTime, endTime, pageSize, EORSort } = yield select(state => state.equipmentoperatingrate);
            let body = {
                beginTime: beginTime,
                endTime: endTime,
                pageSize: pageSize,
                EORSort: EORSort,
                pageIndex: payload.pageIndex,
            };
            //const response = yield call(getEntEquipmentOperatingRateForPoints, body);

            const response = {
                "requstresult": "1", "reason": "操作成功", "operation": "Post", "data": [
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "首钢京唐钢铁联合有限责任公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 1,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "广东瑞明电力股份有限公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.94387,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "广西农垦集团天成纸业有限公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.90481,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "武汉钢铁集团鄂州钢铁有限公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.81925,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "金川集团有限公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.77618,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "新疆巴州塔什店华能电厂",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.72511,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "金昌水泥集团有限责任公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.86619,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    }
                ], "total": 1
            }

            if (response && response.data && response.requstresult === "1") {
                yield update({
                    enttableDatas: response.data,
                    total: response.total,
                    pageIndex: payload.pageIndex || 1,
                });
            }
        },
    },
});
