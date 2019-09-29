/**
 * 功  能：污染物月度排放量统计
 * 创建人：吴建伟
 * 创建时间：2018.12.10
 */

import { Model } from '../dvapack';
import {
    getAllMonthPollutantEmissions, getSingleMonthAllPointEmissions, getSinglePointDaysEmissions,
    GetAllEntMonthPollutantEmissions,
    GetEntMonthAllPointEmissions
} from '../services/PollutantEmissionsApi';
import moment from 'moment';
// import { message } from 'antd';

export default Model.extend({
    namespace: 'pollutantemissions',
    state: {
        pageSize: 10,
        pageIndex: 1,
        tableDatas: [],
        pointDaysDatas: [],
        enterpriseCodes: [],
        pollutantCodes: ['02'],
        selectedDate: moment().format('YYYY-MM-01 00:00:00'),
        clickDate: moment().format('YYYY-MM-01 00:00:00'),
        beginTime: moment().format('YYYY-01-01 00:00:00'),
        endTime: moment().add(1, 'years').format('YYYY-01-01 00:00:00'),
        monthTime: moment().format('YYYY-MM-01 00:00:00'),
        emissionsSort: '',
        xAxisData: [],
        seriesData: [],
        queryDGIMNs: '',
        enttableDatas: [],
        entxAxisData: [],
        entseriesData: [],
        // queryDate: moment().format('YYYY-MM-01 00:00:00')
    },
    subscriptions: {
    },
    effects: {
        * getChartData({ payload }, { call, put, update, select }) {
            const { beginTime, endTime, pageSize, pollutantCodes } = yield select(state => state.pollutantemissions);
            let body = {
                enterpriseCodes: (payload.entcode != "null" && payload.entcode != "0" && payload.entcode) ? [payload.entcode] : null,
                beginTime: beginTime,
                endTime: endTime,
                pageSize: pageSize,
                pollutantCodes: pollutantCodes,
            };
            const response = yield call(getAllMonthPollutantEmissions, body);
            if (response.data) {
                let XAxisData = [];
                let SeriesData = [];
                response.data.map((ele) => {
                    XAxisData.push(ele.DataDate.split('-')[1] + '月');
                    SeriesData.push(ele.Emissions.toFixed(4));
                });
                yield update({
                    total: response.total,
                    xAxisData: XAxisData,
                    seriesData: SeriesData
                });
            }
        },
        * getEntChartData({ payload }, { call, put, update, select }) {
            const { beginTime, endTime, pageSize, pollutantCodes } = yield select(state => state.pollutantemissions);
            let body = {
                beginTime: beginTime,
                endTime: endTime,
                pageSize: pageSize,
                pollutantCodes: pollutantCodes,
            };
            //const response = yield call(GetAllEntMonthPollutantEmissions, body);
            const response = {
                "requstresult": "1", "reason": "操作成功", "operation": "Post", "data": [
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "01", "PollutantName": "烟尘", "DataDate": "2019-01", "Emissions": 0.02258 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "01", "PollutantName": "烟尘", "DataDate": "2019-02", "Emissions": 0.01258 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "01", "PollutantName": "烟尘", "DataDate": "2019-03", "Emissions": 0.02765325186 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "01", "PollutantName": "烟尘", "DataDate": "2019-04", "Emissions": 0.02034016893 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "01", "PollutantName": "烟尘", "DataDate": "2019-05", "Emissions": 0.01344294051 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "01", "PollutantName": "烟尘", "DataDate": "2019-06", "Emissions": 0.03718346245 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "01", "PollutantName": "烟尘", "DataDate": "2019-07", "Emissions": 0.02696224386 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "01", "PollutantName": "烟尘", "DataDate": "2019-08", "Emissions": 0.00515862269 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "01", "PollutantName": "烟尘", "DataDate": "2019-09", "Emissions": 0.00834898025 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "01", "PollutantName": "烟尘", "DataDate": "2019-10", "Emissions": 0.00295285454 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "01", "PollutantName": "烟尘", "DataDate": "2019-11", "Emissions": 0.0 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "01", "PollutantName": "烟尘", "DataDate": "2019-12", "Emissions": 0.0 },


                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "02", "PollutantName": "二氧化硫", "DataDate": "2019-01", "Emissions": 0.1258 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "02", "PollutantName": "二氧化硫", "DataDate": "2019-02", "Emissions": 0.02258 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "02", "PollutantName": "二氧化硫", "DataDate": "2019-03", "Emissions": 0.06903846146 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "02", "PollutantName": "二氧化硫", "DataDate": "2019-04", "Emissions": 0.0071424193 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "02", "PollutantName": "二氧化硫", "DataDate": "2019-05", "Emissions": 0.12064971815 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "02", "PollutantName": "二氧化硫", "DataDate": "2019-06", "Emissions": 0.14183764174 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "02", "PollutantName": "二氧化硫", "DataDate": "2019-07", "Emissions": 0.07295053931 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "02", "PollutantName": "二氧化硫", "DataDate": "2019-08", "Emissions": 0.01938097443 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "02", "PollutantName": "二氧化硫", "DataDate": "2019-09", "Emissions": 0.01682355733 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "02", "PollutantName": "二氧化硫", "DataDate": "2019-10", "Emissions": 0.010245823 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "02", "PollutantName": "二氧化硫", "DataDate": "2019-11", "Emissions": 0.0 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "02", "PollutantName": "二氧化硫", "DataDate": "2019-12", "Emissions": 0.0 },


                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "03", "PollutantName": "氮氧化物", "DataDate": "2019-01", "Emissions": 0.02258 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "03", "PollutantName": "氮氧化物", "DataDate": "2019-02", "Emissions": 0.01258 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "03", "PollutantName": "氮氧化物", "DataDate": "2019-03", "Emissions": 0.02331319814 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "03", "PollutantName": "氮氧化物", "DataDate": "2019-04", "Emissions": 0.01258 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "03", "PollutantName": "氮氧化物", "DataDate": "2019-05", "Emissions": 0.01258 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "03", "PollutantName": "氮氧化物", "DataDate": "2019-06", "Emissions": 0.03994288212 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "03", "PollutantName": "氮氧化物", "DataDate": "2019-07", "Emissions": 0.08827348183 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "03", "PollutantName": "氮氧化物", "DataDate": "2019-08", "Emissions": 0.04526106512 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "03", "PollutantName": "氮氧化物", "DataDate": "2019-09", "Emissions": 0.07387501582 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "03", "PollutantName": "氮氧化物", "DataDate": "2019-10", "Emissions": 0.03554584546 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "03", "PollutantName": "氮氧化物", "DataDate": "2019-11", "Emissions": 0.0 },
                    { "EnterpriseCode": null, "EnterpriseName": null, "PollutantCode": "03", "PollutantName": "氮氧化物", "DataDate": "2019-12", "Emissions": 0.0 }


                ], "total": 12
            };
            if (response.data) {
                let XAxisData = [];
                let SeriesData = [];
                response.data.filter(m => m.PollutantCode === pollutantCodes[0]).map((ele) => {
                    XAxisData.push(ele.DataDate.split('-')[1] + '月');
                    SeriesData.push(ele.Emissions.toFixed(4));
                });
                yield update({
                    total: response.total,
                    entxAxisData: XAxisData,
                    entseriesData: SeriesData
                });
            }
        },


        * getPointsData({ payload }, { call, put, update, select }) {
            const { clickDate, pageIndex, pageSize, pollutantCodes, emissionsSort } = yield select(state => state.pollutantemissions);
            let body = {
                enterpriseCodes: (payload.entcode != "null" && payload.entcode != "0" && payload.entcode) ? [payload.entcode] : null,
                monthTime: clickDate,
                pageIndex: pageIndex,
                pageSize: pageSize,
                emissionsSort: emissionsSort,
                pollutantCodes: pollutantCodes,
            };
            const response = yield call(getSingleMonthAllPointEmissions, body);
            if (response.data) {
                yield update({
                    tableDatas: response.data,
                    total: response.total,
                });
            }
            // const tableDatasNew = yield select(state => state.pollutantemissions.tableDatas);
            // console.log('new', tableDatasNew);
        },
        * getEntsData({ payload }, { call, put, update, select }) {
            const { clickDate, pageIndex, pageSize, pollutantCodes, emissionsSort } = yield select(state => state.pollutantemissions);
            let body = {
                monthTime: clickDate,
                pageIndex: pageIndex,
                pageSize: pageSize,
                emissionsSort: emissionsSort,
                pollutantCodes: pollutantCodes,
            };
            //const response = yield call(GetEntMonthAllPointEmissions, body);

            let response = {
                "requstresult": "1", "reason": "操作成功", "operation": "Post", "data": [
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc1",
                        "EnterpriseName": "首钢京唐钢铁联合有限责任公司",
                        "PollutantCode": "01",
                        "PollutantName": "烟尘",
                        "DataDate": null, "Emissions": 22557.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc2",
                        "EnterpriseName": "广东瑞明电力股份有限公司",
                        "PollutantCode": "01",
                        "PollutantName": "烟尘",
                        "DataDate": null, "Emissions": 123557.33
                    }, {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc3",
                        "EnterpriseName": "广西农垦集团天成纸业有限公司",
                        "PollutantCode": "01",
                        "PollutantName": "烟尘",
                        "DataDate": null, "Emissions": 23357.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc4",
                        "EnterpriseName": "武汉钢铁集团鄂州钢铁有限公司",
                        "PollutantCode": "01",
                        "PollutantName": "烟尘",
                        "DataDate": null, "Emissions": 133557.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc5",
                        "EnterpriseName": "金川集团有限公司",
                        "PollutantCode": "01",
                        "PollutantName": "烟尘",
                        "DataDate": null, "Emissions": 23257.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "新疆巴州塔什店华能电厂",
                        "PollutantCode": "01",
                        "PollutantName": "烟尘",
                        "DataDate": null, "Emissions": 1457.33
                    }
                    ,
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc7",
                        "EnterpriseName": "金昌水泥集团有限责任公司",
                        "PollutantCode": "01",
                        "PollutantName": "烟尘",
                        "DataDate": null, "Emissions": 1182252.33
                    },


                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc1",
                        "EnterpriseName": "首钢京唐钢铁联合有限责任公司",
                        "PollutantCode": "02",
                        "PollutantName": "二氧化硫",
                        "DataDate": null, "Emissions": 543332.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc2",
                        "EnterpriseName": "广东瑞明电力股份有限公司",
                        "PollutantCode": "02",
                        "PollutantName": "二氧化硫",
                        "DataDate": null, "Emissions": 322213.33
                    }, {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc3",
                        "EnterpriseName": "广西农垦集团天成纸业有限公司",
                        "PollutantCode": "02",
                        "PollutantName": "二氧化硫",
                        "DataDate": null, "Emissions": 82356.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc4",
                        "EnterpriseName": "武汉钢铁集团鄂州钢铁有限公司",
                        "PollutantCode": "02",
                        "PollutantName": "二氧化硫",
                        "DataDate": null, "Emissions": 18552.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc5",
                        "EnterpriseName": "金川集团有限公司",
                        "PollutantCode": "02",
                        "PollutantName": "二氧化硫",
                        "DataDate": null, "Emissions": 22656.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "新疆巴州塔什店华能电厂",
                        "PollutantCode": "02",
                        "PollutantName": "二氧化硫",
                        "DataDate": null, "Emissions": 4658.33
                    }
                    ,
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc7",
                        "EnterpriseName": "金昌水泥集团有限责任公司",
                        "PollutantCode": "02",
                        "PollutantName": "二氧化硫",
                        "DataDate": null, "Emissions": 1082152.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc7",
                        "EnterpriseName": "屯留县华诚焦化有限责任公司",
                        "PollutantCode": "02",
                        "PollutantName": "二氧化硫",
                        "DataDate": null, "Emissions": 8823552.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc7",
                        "EnterpriseName": "潞城市卓越水泥有限公司",
                        "PollutantCode": "02",
                        "PollutantName": "二氧化硫",
                        "DataDate": null, "Emissions": 12823552.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc7",
                        "EnterpriseName": "长治市晋鑫煤焦有限责任公司",
                        "PollutantCode": "02",
                        "PollutantName": "二氧化硫",
                        "DataDate": null, "Emissions": 11823552.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc7",
                        "EnterpriseName": "山西沁新煤焦股份有限公司焦化厂",
                        "PollutantCode": "02",
                        "PollutantName": "二氧化硫",
                        "DataDate": null, "Emissions": 11823552.33
                    },


                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc1",
                        "EnterpriseName": "首钢京唐钢铁联合有限责任公司",
                        "PollutantCode": "03",
                        "PollutantName": "氮氧化物",
                        "DataDate": null, "Emissions": 23557.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc2",
                        "EnterpriseName": "广东瑞明电力股份有限公司",
                        "PollutantCode": "03",
                        "PollutantName": "氮氧化物",
                        "DataDate": null, "Emissions": 123557.33
                    }, {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc3",
                        "EnterpriseName": "广西农垦集团天成纸业有限公司",
                        "PollutantCode": "03",
                        "PollutantName": "氮氧化物",
                        "DataDate": null, "Emissions": 82357.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc4",
                        "EnterpriseName": "武汉钢铁集团鄂州钢铁有限公司",
                        "PollutantCode": "03",
                        "PollutantName": "氮氧化物",
                        "DataDate": null, "Emissions": 18557.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc5",
                        "EnterpriseName": "金川集团有限公司",
                        "PollutantCode": "03",
                        "PollutantName": "氮氧化物",
                        "DataDate": null, "Emissions": 22657.33
                    },
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc6",
                        "EnterpriseName": "新疆巴州塔什店华能电厂",
                        "PollutantCode": "03",
                        "PollutantName": "氮氧化物",
                        "DataDate": null, "Emissions": 4657.33
                    }
                    ,
                    {
                        "DGIMNs": null,
                        "PointCode": null,
                        "PointName": null,
                        "EnterpriseCode": "51216eae-8f11-4578-ad63-5127f78f6cc7",
                        "EnterpriseName": "金昌水泥集团有限责任公司",
                        "PollutantCode": "03",
                        "PollutantName": "氮氧化物",
                        "DataDate": null, "Emissions": 11823557.33
                    }
                ],
                "total": 1
            };
            let data = response.data;
            if (response.data) {
                yield update({
                    enttableDatas: data.filter(m => m.PollutantCode === pollutantCodes[0]),
                    total: response.total,
                });
            }
            // const tableDatasNew = yield select(state => state.pollutantemissions.tableDatas);
            // console.log('new', tableDatasNew);
        },
        * getPointDaysData({ payload }, { call, put, update, select }) {
            const { clickDate, pageIndex, pageSize, pollutantCodes, emissionsSort, queryDGIMNs } = yield select(state => state.pollutantemissions);
            let body = {
                enterpriseCodes: (payload.entcode != "null" && payload.entcode != "0" && payload.entcode) ? [payload.entcode] : null,
                monthTime: clickDate,
                pageIndex: pageIndex,
                pageSize: pageSize,
                DGIMNs: queryDGIMNs,
                emissionsSort: emissionsSort,
                pollutantCodes: pollutantCodes,
            };
            const response = yield call(getSinglePointDaysEmissions, body);

            if (response.data) {
                yield update({
                    pointDaysDatas: response.data,
                    total: response.total,
                });
            }
            // const pointDaysDatas = yield select(state => state.pollutantemissions.pointDaysDatas);
            // console.log('new', pointDaysDatas);
        },
    },
});
