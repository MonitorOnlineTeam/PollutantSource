/**
 * 功  能：污染物月度排放量统计
 * 创建人：吴建伟
 * 创建时间：2018.12.10
 */

import { Model } from '../dvapack';
import { getAllMonthPollutantEmissions, getSingleMonthAllPointEmissions, getSinglePointDaysEmissions } from '../services/PollutantEmissionsApi';
import moment from 'moment';
// import { message } from 'antd';

export default Model.extend({
    namespace: 'PollutantEmissionsModel',
    state: {
        pageSize: 20,
        pageIndex: 1,
        tableDatas: [],
        pointDaysDatas: [],
        enterpriseCodes: [],
        pollutantCodes: ['02'],
        selectedDate: moment().format('YYYY-MM-01 00:00:00'),
        clickDate: moment().format('YYYY-MM-01 00:00:00'),
        beginTime: moment().format('YYYY-01-01 00:00:00'),
        endTime: moment().add(1,'years').format('YYYY-01-01 00:00:00'),
        monthTime: moment().format('YYYY-MM-01 00:00:00'),
        emissionsSort: 'descend',
        xAxisData: [],
        seriesData: [],
        EORSort: 'ascend',
        queryDGIMNs: '',
        // queryDate: moment().format('YYYY-MM-01 00:00:00')
    },
    subscriptions: {
    },
    effects: {
        * getChartData({payload}, { call, put, update, select }) {
            const {beginTime, endTime, pageSize, pollutantCodes} = yield select(state => state.PollutantEmissionsModel);
            // debugger
            let body = {
                beginTime: beginTime,
                endTime: endTime,
                pageSize: pageSize,
                pollutantCodes: pollutantCodes,
            };
            const response = yield call(getAllMonthPollutantEmissions, body);

            if (response.data)
            {
                let XAxisData = [];
                let SeriesData = [];
                response.data.map((ele) => {
                    XAxisData.push(ele.DataDate.split('-')[1] + '月');
                    SeriesData.push(ele.Emissions.toFixed(2));
                });
                yield update({
                    total: response.total,
                    xAxisData: XAxisData,
                    seriesData: SeriesData
                });
            }
            const tableDatasNew = yield select(state => state.PollutantEmissionsModel.tableDatas);
            console.log('new', tableDatasNew);
        },
        * getPointsData({payload}, { call, put, update, select }) {
            const {clickDate, pageIndex, pageSize, pollutantCodes, emissionsSort} = yield select(state => state.PollutantEmissionsModel);
            // debugger
            let body = {
                monthTime: clickDate,
                pageIndex: pageIndex,
                pageSize: pageSize,
                emissionsSort: emissionsSort,
                pollutantCodes: pollutantCodes,
            };
            const response = yield call(getSingleMonthAllPointEmissions, body);

            if (response.data)
            {
                yield update({
                    tableDatas: response.data,
                    total: response.total,
                });
            }
            const tableDatasNew = yield select(state => state.PollutantEmissionsModel.tableDatas);
            console.log('new', tableDatasNew);
        },
        * getPointDaysData({payload}, { call, put, update, select }) {
            const {clickDate, pageIndex, pageSize, pollutantCodes, emissionsSort,queryDGIMNs} = yield select(state => state.PollutantEmissionsModel);
            // debugger
            let body = {
                monthTime: clickDate,
                pageIndex: pageIndex,
                pageSize: pageSize,
                DGIMNs: queryDGIMNs,
                emissionsSort: emissionsSort,
                pollutantCodes: pollutantCodes,
            };
            const response = yield call(getSinglePointDaysEmissions, body);

            if (response.data)
            {
                yield update({
                    pointDaysDatas: response.data,
                    total: response.total,
                });
            }
            const pointDaysDatas = yield select(state => state.PollutantEmissionsModel.pointDaysDatas);
            console.log('new', pointDaysDatas);
        },
    },
});
