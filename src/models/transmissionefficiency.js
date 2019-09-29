/**
 * 功  能：传输有效率
 * 创建人：吴建伟
 * 创建时间：2018.12.07
 */

import { Model } from '../dvapack';
import { getMonthsTransmissionEfficiency, getEntMonthsTransmissionEfficiency } from '../services/TransmissionEfficiencyApi';
import moment from 'moment';

export default Model.extend({
    namespace: 'transmissionefficiency',
    state: {
        pageSize: 20,
        pageIndex: 1,
        tableDatas: [],
        beginTime: moment().format('YYYY-MM-01 HH:mm:ss'),
        endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        transmissionEffectiveRate: 'ascend',
        enttableDatas: [],
        entCode: null,
    },
    subscriptions: {
    },
    effects: {
        * getData({ payload }, { call, put, update, select }) {
            const { beginTime, endTime, pageSize, transmissionEffectiveRate } = yield select(state => state.transmissionefficiency);
            const { entCode } = yield select(state => state.equipmentoperatingrate);
            let body = {
                enterpriseCodes: (payload.entcode && payload.entcode != "null" && payload.entcode != "0") ? [payload.entcode] : null,
                beginTime: beginTime,
                endTime: endTime,
                pageSize: pageSize,
                TERSort: transmissionEffectiveRate,
                pageIndex: payload.pageIndex,
                entCode: entCode
            };
            const response = yield call(getMonthsTransmissionEfficiency, body);
            yield update({
                tableDatas: response.data,
                total: response.total,
                pageIndex: payload.pageIndex || 1,
            });
        },
        * getEntData({ payload }, { call, put, update, select }) {
            const { beginTime, endTime, pageSize, transmissionEffectiveRate } = yield select(state => state.transmissionefficiency);
            let body = {
                beginTime: beginTime,
                endTime: endTime,
                pageSize: pageSize,
                TERSort: transmissionEffectiveRate,
                pageIndex: payload.pageIndex,
            };
            //const response = yield call(getEntMonthsTransmissionEfficiency, body);
            const response = {
                "requstresult": "1", "reason": "操作成功", "operation": "Post", "data": [
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "首钢京唐钢铁联合有限责任公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 1,
                        "EffectiveRate": 1,
                        "TransmissionEffectiveRate": 100,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc2",
                        "EnterpriseName": "广东瑞明电力股份有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9897,
                        "EffectiveRate": 0.9537,
                        "TransmissionEffectiveRate": 0.94387,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc3",
                        "EnterpriseName": "广西农垦集团天成纸业有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9988,
                        "EffectiveRate": 0.9059,
                        "TransmissionEffectiveRate": 0.90481,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc4",
                        "EnterpriseName": "武汉钢铁集团鄂州钢铁有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9564,
                        "EffectiveRate": 0.8566,
                        "TransmissionEffectiveRate": 0.81925,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc5",
                        "EnterpriseName": "金川集团有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9058,
                        "EffectiveRate": 0.8569,
                        "TransmissionEffectiveRate": 0.77618,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "新疆巴州塔什店华能电厂",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.8566,
                        "EffectiveRate": 0.8465,
                        "TransmissionEffectiveRate": 0.72511,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "金昌水泥集团有限责任公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9564,
                        "EffectiveRate": 0.90568,
                        "TransmissionEffectiveRate": 0.86619,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                ], "total": 1
            };
            yield update({
                enttableDatas: response.data,
                total: response.total,
                pageIndex: payload.pageIndex || 1,
            });
        },

    },
});
