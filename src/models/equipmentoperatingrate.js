/**
 * 功  能：设备运转率
 * 创建人：吴建伟
 * 创建时间：2018.12.10
 */

import { Model } from '../dvapack';
import { getEquipmentOperatingRateForPoints } from '../services/EquipmentOperatingRateApi';
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
        //   avgstoptime:0,
        //   avgnormaltime:0,
        //   avgworktime:0
    },
    subscriptions: {
    },
    effects: {
        * getData({payload}, { call, put, update, select }) {
            const {beginTime, endTime, pageSize, EORSort} = yield select(state => state.equipmentoperatingrate);
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
            const response = yield call(getEquipmentOperatingRateForPoints, body);
            // let avgstoptime=0;
            // let avgnormaltime=0;
            // let avgworktime=0;
            // if(response && response.data && response.total)
            // {
             
            //     response.data.map(item=>{
            //         avgworktime+= item.ProducesTime;
            //         avgnormaltime+=item.NormalRunTime;
            //         avgstoptime+=item.StopProductionTime;
            //     })
            //     avgstoptime=avgstoptime/response.total;
            //     avgnormaltime=avgnormaltime/response.total;
            //     avgstoptime=avgstoptime/response.total
            // }

            if(response && response.data && response.requstresult==="1")
            {
                yield update({
                    // avgstoptime,
                    // avgnormaltime,
                    // avgworktime,
                    tableDatas: response.data,
                    total: response.total,
                    pageIndex: payload.pageIndex || 1,
                });
                const tableDatasNew = yield select(state => state.equipmentoperatingrate.tableDatas);
                console.log('new', tableDatasNew);
            }
          
        },
    },
});
