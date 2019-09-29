/**
 * 功  能：报警及时响应统计
 * 创建人：吴建伟
 * 创建时间：2018.12.10
 */

import { Model } from '../dvapack';
import { getAlarmResponseAllMonthStatistics, getSingleMonthAllPointAlarmResponseStatistics, getSinglePointDaysAlarmResponseStatistics,
    getSingleMonthAllEntAlarmResponseStatistics } from '../services/AlarmResponseApi';
import moment from 'moment';

export default Model.extend({
    namespace: 'alarmresponse',
    state: {
        pageSize: 20,
        pageIndex: 1,
        beginTime: moment().format('YYYY-01-01 HH:mm:ss'),
        endTime: moment().add(1, 'years').format('YYYY-01-01 00:00:00'),
        selectedDate: moment().format('YYYY-MM-01 HH:mm:ss'),
        clickDate: moment().format('YYYY-MM-01 HH:mm:ss'),
        xAxisData: [],
        seriesData2: [],
        seriesData8: [],
        pointsTableData: [],
        entTableData:[],
        pointDaysTableData: [],
        sort2: '',
        sort8: '',
        queryDGIMNs: ''
    },
    subscriptions: {
    },
    effects: {
        * getChartData({ payload }, { call, put, update, select }) {
            const { beginTime, endTime } = yield select(state => state.alarmresponse);
            let body = {
                beginTime: beginTime,
                endTime: endTime,
                enterpriseCodes:(payload.entcode && payload.entcode!="null" && payload.entcode!="0")?[payload.entcode]:null,
            };
            //const response = yield call(getAlarmResponseAllMonthStatistics, body);
            const response={"requstresult":"1","reason":"操作成功","operation":"Post","data":[
                {"AlarmResponseTime":"2019-01","DGIMNs":null,"PointName":null,"LessThan2Hour":3,"GreaterThan8Hour":2,"OtherTime":0,"EntCode":null,"EntName":null},
                {"AlarmResponseTime":"2019-02","DGIMNs":null,"PointName":null,"LessThan2Hour":4,"GreaterThan8Hour":1,"OtherTime":0,"EntCode":null,"EntName":null},
                {"AlarmResponseTime":"2019-03","DGIMNs":null,"PointName":null,"LessThan2Hour":14,"GreaterThan8Hour":4,"OtherTime":0,"EntCode":null,"EntName":null},
                {"AlarmResponseTime":"2019-04","DGIMNs":null,"PointName":null,"LessThan2Hour":7,"GreaterThan8Hour":1,"OtherTime":0,"EntCode":null,"EntName":null},
                {"AlarmResponseTime":"2019-05","DGIMNs":null,"PointName":null,"LessThan2Hour":9,"GreaterThan8Hour":2,"OtherTime":0,"EntCode":null,"EntName":null},
                {"AlarmResponseTime":"2019-06","DGIMNs":null,"PointName":null,"LessThan2Hour":2,"GreaterThan8Hour":3,"OtherTime":0,"EntCode":null,"EntName":null},
                {"AlarmResponseTime":"2019-07","DGIMNs":null,"PointName":null,"LessThan2Hour":11,"GreaterThan8Hour":1,"OtherTime":0,"EntCode":null,"EntName":null},
                {"AlarmResponseTime":"2019-08","DGIMNs":null,"PointName":null,"LessThan2Hour":4,"GreaterThan8Hour":2,"OtherTime":0,"EntCode":null,"EntName":null},
                {"AlarmResponseTime":"2019-09","DGIMNs":null,"PointName":null,"LessThan2Hour":5,"GreaterThan8Hour":0,"OtherTime":0,"EntCode":null,"EntName":null},
                {"AlarmResponseTime":"2019-10","DGIMNs":null,"PointName":null,"LessThan2Hour":3,"GreaterThan8Hour":2,"OtherTime":0,"EntCode":null,"EntName":null},
                {"AlarmResponseTime":"2019-11","DGIMNs":null,"PointName":null,"LessThan2Hour":0,"GreaterThan8Hour":0,"OtherTime":0,"EntCode":null,"EntName":null},
                {"AlarmResponseTime":"2019-12","DGIMNs":null,"PointName":null,"LessThan2Hour":0,"GreaterThan8Hour":0,"OtherTime":0,"EntCode":null,"EntName":null}
            ],"total":12};
            
            if (response.data) {
                let XAxisData = [];
                let SeriesData2 = [];
                let SeriesData8 = [];
                response.data.map((ele) => {
                    XAxisData.push(ele.AlarmResponseTime.split('-')[1] + '月');
                    SeriesData2.push(ele.LessThan2Hour);
                    SeriesData8.push(ele.GreaterThan8Hour);
                });
                yield update({
                    total: response.total,
                    xAxisData: XAxisData,
                    seriesData2: SeriesData2,
                    seriesData8: SeriesData8
                });
            }
        },
        * getPointsData({ payload }, { call, put, update, select }) {
            const { clickDate, pageIndex, pageSize, sort2, sort8 } = yield select(state => state.alarmresponse);
            let body = {
                monthTime: clickDate,
                pageIndex: pageIndex,
                pageSize: pageSize,
                enterpriseCodes:(payload.entcode && payload.entcode!="null" && payload.entcode!="0")?[payload.entcode]:null,
                sort2: sort2,
                sort8: sort8
            };
            const response = yield call(getSingleMonthAllPointAlarmResponseStatistics, body);

            if (response.data) {
                yield update({
                    pointsTableData: response.data,
                    total: response.total,
                });
            }
            const pointsTableData = yield select(state => state.alarmresponse.pointsTableData);
            console.log('new', pointsTableData);
        },
        * getEntsData({ payload }, { call, put, update, select }) {
            const { clickDate, pageIndex, pageSize, sort2, sort8 } = yield select(state => state.alarmresponse);
            let body = {
                monthTime: clickDate,
                pageIndex: pageIndex,
                pageSize: pageSize,
                sort2: sort2,
                sort8: sort8
            };
            //const response = yield call(getSingleMonthAllEntAlarmResponseStatistics, body);
            const response={"requstresult":"1","reason":"操作成功","operation":"Post","data":[
                {"AlarmResponseTime":null,"DGIMNs":null,"PointName":null,"LessThan2Hour":0,"GreaterThan8Hour":0,"OtherTime":0,"EntCode":"51216eae-8f11-4578-ad63-5127f78f6cca","EntName":"首钢京唐钢铁联合有限责任公司"},
                {"AlarmResponseTime":null,"DGIMNs":null,"PointName":null,"LessThan2Hour":3,"GreaterThan8Hour":2,"OtherTime":0,"EntCode":"51216eae-8f11-4578-ad63-5127f78f6cc1","EntName":"金川集团有限公司"},
            {"AlarmResponseTime":null,"DGIMNs":null,"PointName":null,"LessThan2Hour":0,"GreaterThan8Hour":0,"OtherTime":0,"EntCode":"51216eae-8f11-4578-ad63-5127f78f6cc2","EntName":"武汉钢铁集团鄂州钢铁有限公司"},
            {"AlarmResponseTime":null,"DGIMNs":null,"PointName":null,"LessThan2Hour":0,"GreaterThan8Hour":0,"OtherTime":0,"EntCode":"51216eae-8f11-4578-ad63-5127f78f6cc3","EntName":"酒泉钢铁(集团)炼铁厂"},
            {"AlarmResponseTime":null,"DGIMNs":null,"PointName":null,"LessThan2Hour":0,"GreaterThan8Hour":0,"OtherTime":0,"EntCode":"51216eae-8f11-4578-ad63-5127f78f6cc4","EntName":"新疆巴州塔什店华能电厂"},
            {"AlarmResponseTime":null,"DGIMNs":null,"PointName":null,"LessThan2Hour":0,"GreaterThan8Hour":0,"OtherTime":0,"EntCode":"51216eae-8f11-4578-ad63-5127f78f6cc5","EntName":"广东瑞明电力股份有限公司"}
        ],"total":6};

            if (response.data) {
                yield update({
                    entTableData: response.data,
                    total: response.total,
                });
            }
        },
        * getPointDaysData({ payload }, { call, put, update, select }) {
            const { clickDate, pageIndex, pageSize, sort2, sort8, queryDGIMNs } = yield select(state => state.alarmresponse);
            let body = {
                monthTime: clickDate,
                pageIndex: pageIndex,
                pageSize: pageSize,
                DGIMNs: queryDGIMNs,
                sort2: sort2,
                sort8: sort8,
                enterpriseCodes:(payload.entcode && payload.entcode!="null" && payload.entcode!="0")?[payload.entcode]:null,
            };
            const response = yield call(getSinglePointDaysAlarmResponseStatistics, body);

            if (response.data) {
                yield update({
                    pointDaysTableData: response.data,
                    total: response.total,
                });
            }
            const pointDaysTableData = yield select(state => state.alarmresponse.pointDaysTableData);
        },
    },
});
