/**
 * 功  能：传输有效率
 * 创建人：吴建伟
 * 创建时间：2018.12.07
 */

import { Model } from '../dvapack';
import { getMonthsTransmissionEfficiency,getEntMonthsTransmissionEfficiency } from '../services/TransmissionEfficiencyApi';
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
        enttableDatas:[]
    },
    subscriptions: {
    },
    effects: {
        * getData({payload}, { call, put, update, select }) {
            const {beginTime, endTime, pageSize, transmissionEffectiveRate} = yield select(state => state.transmissionefficiency);
            let body = {
                enterpriseCodes:(payload.entcode && payload.entcode!="null" && payload.entcode!="0")?[payload.entcode]:null,
                beginTime: beginTime,
                endTime: endTime,
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
        },
        * getEntData({payload}, { call, put, update, select }) {
            const {beginTime, endTime, pageSize, transmissionEffectiveRate} = yield select(state => state.transmissionefficiency);
            let body = {
                beginTime: beginTime,
                endTime: endTime,
                pageSize: pageSize,
                TERSort: transmissionEffectiveRate,
                pageIndex: payload.pageIndex,
            };
            const response = yield call(getEntMonthsTransmissionEfficiency, body);
            yield update({
                enttableDatas: response.data,
                total: response.total,
                pageIndex: payload.pageIndex || 1,
            });
        },

    },
});
