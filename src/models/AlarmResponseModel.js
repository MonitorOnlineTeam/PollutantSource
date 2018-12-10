/**
 * 功  能：报警及时响应统计
 * 创建人：吴建伟
 * 创建时间：2018.12.10
 */

import { Model } from '../dvapack';
import { getAlarmResponseAllMonthStatistics } from '../services/AlarmResponseApi';
import moment from 'moment';

export default Model.extend({
    namespace: 'AlarmResponseModel',
    state: {
        pageSize: 10,
        pageIndex: 1,
        tableDatas: [],
        beginTime: moment().format('YYYY-MM-01 HH:mm:ss'),
        endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        EORSort: 'ascend'
    },
    subscriptions: {
    },
    effects: {
        * getData({payload}, { call, put, update, select }) {
            const {beginTime, endTime, pageSize, EORSort} = yield select(state => state.AlarmResponseModel);
            let body = {
                // 'DGIMNs': ['sgjt001003', 'sgjt001004'],
                // 'beginTime': '2018-11-01 00:00:00',
                // 'endTime': '2018-11-30 00:00:00'
                beginTime: beginTime,
                endTime: endTime,
                pageSize: pageSize,
                EORSort: EORSort,
                pageIndex: payload.pageIndex,
            };
            const response = yield call(getAlarmResponseAllMonthStatistics, body);
            yield update({
                tableDatas: response.data,
                total: response.total,
                pageIndex: payload.pageIndex || 1,
            });
            const tableDatasNew = yield select(state => state.AlarmResponseModel.tableDatas);
            console.log('new', tableDatasNew);
        },
    },
});
