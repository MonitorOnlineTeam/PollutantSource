/**
 * 功  能：传输有效率
 * 创建人：吴建伟
 * 创建时间：2018.12.07
 */

import { Model } from '../dvapack';
import { getMonthsTransmissionEfficiency } from '../services/TransmissionEfficiencyApi';
import moment from 'moment';

export default Model.extend({
    namespace: 'TransmissionEfficiency',
    state: {
        pageSize: 20,
        pageIndex: 1,
        tableDatas: [],
        beginTime: moment().format('YYYY-MM-01 HH:mm:ss'),
        endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        transmissionEffectiveRate: 'ascend'
    },
    subscriptions: {
    },
    effects: {
        * getData({payload}, { call, put, update, select }) {
            const {beginTime, endTime, pageSize, transmissionEffectiveRate} = yield select(state => state.TransmissionEfficiency);
            let body = {
                // 'DGIMNs': ['sgjt001003', 'sgjt001004'],
                // 'beginTime': '2018-11-01 00:00:00',
                // 'endTime': '2018-11-30 00:00:00'
                'beginTime': beginTime,
                'endTime': endTime,
                pageSize: pageSize,
                TERSort: transmissionEffectiveRate,
                pageIndex: payload.pageIndex,
            };
            const response = yield call(getMonthsTransmissionEfficiency, body);
            yield update({
                tableDatas: response.data,
                total: response.total,
                pageIndex: payload.pageIndex || 1,
            });
            const tableDatasNew = yield select(state => state.TransmissionEfficiency.tableDatas);
            console.log('new', tableDatasNew);
        },
    },
});
