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
            const response = yield call(getAlarmResponseAllMonthStatistics, body);

            
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
            const response = yield call(getSingleMonthAllEntAlarmResponseStatistics, body);

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
