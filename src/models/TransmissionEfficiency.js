/**
 * 功  能：传输有效率
 * 创建人：吴建伟
 * 创建时间：2018.12.07
 */

import { Model } from '../dvapack';
import { getMonthsTransmissionEfficiency } from '../services/TransmissionEfficiency';

export default Model.extend({
    namespace: 'TransmissionEfficiency',
    state: {
        tableDatas: []
    },
    subscriptions: {
    },
    effects: {
        * getData(_, { call, put, update, select }) {
            const tableDatasOld = yield select(state => state.TransmissionEfficiency.tableDatas);
            console.log('old', tableDatasOld);
            let body = {
                'DGIMNs': ['sgjt001003', 'sgjt001004'],
                'beginTime': '2018-11-01 00:00:00',
                'endTime': '2018-11-30 00:00:00'
            };
            const response = yield call(getMonthsTransmissionEfficiency, body);
            yield update({
                tableDatas: response.data
            });
            const tableDatasNew = yield select(state => state.TransmissionEfficiency.tableDatas);
            console.log('new', tableDatasNew);
        },
    },
});
