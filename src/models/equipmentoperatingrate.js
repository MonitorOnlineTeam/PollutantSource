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
                        "RunningRate": 1,
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
                        "RunningRate": 0.91545,
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
                        "RunningRate": 0.92511,
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
                        "RunningRate": 0.96219,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    }

                    ,
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "临泽宏鑫矿产实业有限公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.91619,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "酒泉钢铁（集团）炼钢厂",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.905919,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "四川雅安西南水泥",
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
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "中国石油玉门油田水电厂",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.89319,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "张掖市山丹铁骑水泥有限责任公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.89119,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "甘肃电投金昌发电有限责任公司",
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
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "甘肃锦世化工有限责任公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.80219,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "国电电力酒泉发电公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.79439,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "酒钢（集团）宏达建材有限责任公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.81819,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "内蒙古蒙联石油化工有限公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.88119,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "揖斐电电子（北京）有限公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.895819,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "永乐店镇污水处理厂",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.83919,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "山西潞安焦化有限公司二分厂",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.72419,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "长治市南村煤化有限公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.79119,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "山西潞安祥瑞焦化有限公司",
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
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "屯留县华诚焦化有限责任公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.82319,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "潞城市卓越水泥有限公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.812129,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "长治市晋鑫煤焦有限责任公司",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.831219,
                        "AvgNormalRunTime": 0.0,
                        "AvgProducesTime": 0.0,
                        "AvgStopProductionTime": 0.0
                    },
                    {
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cca",
                        "EnterpriseName": "山西沁新煤焦股份有限公司焦化厂",
                        "PointCode": null,
                        "PointName": null,
                        "DGIMN": null,
                        "DataDate": null,
                        "NormalRunTime": 2723.0,
                        "ProducesTime": 4488.0,
                        "StopProductionTime": 0.0,
                        "RunningRate": 0.76619,
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
