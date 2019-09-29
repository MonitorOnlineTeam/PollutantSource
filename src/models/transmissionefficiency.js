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
                        "EffectiveRate": 0.9466,
                        "TransmissionEffectiveRate": 0.90532,
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
                        "TransmissionRate": 1,
                        "EffectiveRate": 1,
                        "TransmissionEffectiveRate": 1,
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
                        "TransmissionRate": 0.9658,
                        "EffectiveRate": 0.9599,
                        "TransmissionEffectiveRate": 0.9270,
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
                        "TransmissionRate": 0.9864,
                        "EffectiveRate": 0.91568,
                        "TransmissionEffectiveRate": 0.90322,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }


                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f26",
                        "EnterpriseName": "临泽宏鑫矿产实业有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9564,
                        "EffectiveRate": 0.94561,
                        "TransmissionEffectiveRate": 0.9564 * 0.94561,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-ad",
                        "EnterpriseName": "酒泉钢铁（集团）炼钢厂",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9664,
                        "EffectiveRate": 0.92518,
                        "TransmissionEffectiveRate": 0.9664 * 0.92518,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-1-5127f78f6cc6",
                        "EnterpriseName": "四川雅安西南水泥",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9564,
                        "EffectiveRate": 0.90518,
                        "TransmissionEffectiveRate": 0.9564 * 0.90518,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-2-ad63-5127f78f6cc6",
                        "EnterpriseName": "中国石油玉门油田水电厂",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9322,
                        "EffectiveRate": 0.91368,
                        "TransmissionEffectiveRate": 0.9322 * 0.91368,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-3-5127f78f6cc6",
                        "EnterpriseName": "巴中垃圾焚烧电厂",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9364,
                        "EffectiveRate": 0.93318,
                        "TransmissionEffectiveRate": 0.9364 * 0.93318,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-4-5127f78f6cc6",
                        "EnterpriseName": "张掖市山丹铁骑水泥有限责任公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9864,
                        "EffectiveRate": 0.90328,
                        "TransmissionEffectiveRate": 0.9864 * 0.90328,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-5-5127f78f6cc6",
                        "EnterpriseName": "甘肃电投金昌发电有限责任公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9321,
                        "EffectiveRate": 0.8965,
                        "TransmissionEffectiveRate": 0.9321 * 0.8965,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-6-5127f78f6cc6",
                        "EnterpriseName": "甘肃锦世化工有限责任公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9814,
                        "EffectiveRate": 0.90218,
                        "TransmissionEffectiveRate": 0.9814 * 0.90218,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-1-5127f78f6cc6",
                        "EnterpriseName": "国电电力酒泉发电公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9564,
                        "EffectiveRate": 0.91218,
                        "TransmissionEffectiveRate": 0.9564 * 0.91218,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-d-5127f78f6cc6",
                        "EnterpriseName": "揖斐电电子（北京）有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.8564,
                        "EffectiveRate": 0.80168,
                        "TransmissionEffectiveRate": 0.8564 * 0.80168,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-d-a-5127f78f6cc6",
                        "EnterpriseName": "山西潞安焦化有限公司二分厂",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.7564,
                        "EffectiveRate": 0.70198,
                        "TransmissionEffectiveRate": 0.7564 * 0.70198,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-sdf-ad63-5127f78f6cc6",
                        "EnterpriseName": "长治市南村煤化有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.8524,
                        "EffectiveRate": 0.83248,
                        "TransmissionEffectiveRate": 0.8524 * 0.83248,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-adf-5127f78f6cc6",
                        "EnterpriseName": "潞城市卓越水泥有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9524,
                        "EffectiveRate": 0.94518,
                        "TransmissionEffectiveRate": 0.86619,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-adfasdfa-5127f78f6cc6",
                        "EnterpriseName": "山西潞安矿业有限责任公司五阳热电厂",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9314,
                        "EffectiveRate": 0.911238,
                        "TransmissionEffectiveRate": 0.86619,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "adf-8f11-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "山西省屯留县华诚洗煤焦化厂",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9531,
                        "EffectiveRate": 0.9052,
                        "TransmissionEffectiveRate": 0.86619,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eadfae-8f11-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "山西青春玻璃有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9314,
                        "EffectiveRate": 0.90338,
                        "TransmissionEffectiveRate": 0.86619,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-adfas-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "襄垣潞安环能五阳弘峰焦化有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9133,
                        "EffectiveRate": 0.90128,
                        "TransmissionEffectiveRate": 0.86619,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-asdf-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "长治县富鑫供热有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9224,
                        "EffectiveRate": 0.90338,
                        "TransmissionEffectiveRate": 0.9224 * 0.90338,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-asdfsf-ad63-5127f78f6cc6",
                        "EnterpriseName": "山西常平集团实业有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.91264,
                        "EffectiveRate": 0.90568,
                        "TransmissionEffectiveRate": 0.91264 * 0.90568,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "aaa-8f11-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "晋能长治热电有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.9564,
                        "EffectiveRate": 0.90518,
                        "TransmissionEffectiveRate": 0.9564 * 0.90518,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "51216eae-ddd-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "首钢长治钢铁有限公司",
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
                    ,
                    {
                        "EnterpriseCode": "sss-8f11-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "武乡西山发电有限责任公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.8622,
                        "EffectiveRate": 0.80168,
                        "TransmissionEffectiveRate": 0.8622 * 0.80168,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "sa-8f11-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "河北康正药业有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.8724,
                        "EffectiveRate": 0.8612,
                        "TransmissionEffectiveRate": 0.8724 * 0.8612,
                        "AvgShouldNumber": 0.0,
                        "AvgTransmissionNumber": 0.0,
                        "AvgEffectiveNumber": 0.0,
                        "AvgTransmissionRate": 0.0,
                        "AvgEffectiveRate": 0.0
                    }
                    ,
                    {
                        "EnterpriseCode": "afd-8f11-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "邢台金丰能源科技有限公司",
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
                    ,
                    {
                        "EnterpriseCode": "51216eae-e-sdfsaf-ad63-5127f78f6cc6",
                        "EnterpriseName": "建华建材(河北)有限公司",
                        "PointCode": null, "PointName": null, "DGIMN": null, "DataDate": null,
                        "ShouldNumber": 54912.0,
                        "TransmissionNumber": 22495.0,
                        "EffectiveNumber": 16074.0,
                        "TransmissionRate": 0.8524,
                        "EffectiveRate": 0.8233,
                        "TransmissionEffectiveRate": 0.8524 * 0.8233,
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
