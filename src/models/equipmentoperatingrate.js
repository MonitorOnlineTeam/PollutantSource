/**
 * 功  能：设备运转率
 * 创建人：吴建伟
 * 创建时间：2018.12.10
 */

import { Model } from '../dvapack';
import { getEquipmentOperatingRateForPoints,getEntEquipmentOperatingRateForPoints } from '../services/EquipmentOperatingRateApi';
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
        enttableDatas:[],
        entcode:null,
        entname:null,
        entCode: null,
    },
    subscriptions: {
    },
    effects: {
        * getData({payload}, { call, put, update, select }) {
            const {beginTime, endTime, pageSize, EORSort} = yield select(state => state.equipmentoperatingrate);
            const { entCode } = yield select(state => state.equipmentoperatingrate);
            let body = {
                enterpriseCodes:(payload.entcode && payload.entcode!="null" && payload.entcode!="0")?[payload.entcode]:null,
                beginTime: beginTime,
                endTime: endTime,
                pageSize: pageSize,
                EORSort: EORSort,
                pageIndex: payload.pageIndex,
                entCode: entCode
            };
            const response = yield call(getEquipmentOperatingRateForPoints, body);
            if(response && response.data && response.requstresult==="1")
            {
                yield update({
                    tableDatas: response.data,
                    total: response.total,
                    pageIndex: payload.pageIndex || 1,
                });
            }
        },
        * getEntData({payload}, { call, put, update, select }) {
            const {beginTime, endTime, pageSize, EORSort} = yield select(state => state.equipmentoperatingrate);
            let body = {
                beginTime: beginTime,
                endTime: endTime,
                pageSize: pageSize,
                EORSort: EORSort,
                pageIndex: payload.pageIndex,
            };
            const response = yield call(getEntEquipmentOperatingRateForPoints, body);
            if(response && response.data && response.requstresult==="1")
            {
                yield update({
                    enttableDatas: response.data,
                    total: response.total,
                    pageIndex: payload.pageIndex || 1,
                });
            }
        },
    },
});
