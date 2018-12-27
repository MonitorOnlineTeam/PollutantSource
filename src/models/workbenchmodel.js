/**
 * 功  能：工作台
 * 创建人：吴建伟
 * 创建时间：2018.12.26
 */

import { Model } from '../dvapack';
import { getOperationHistoryRecordPageList } from '../services/workbenchapi';
import moment from 'moment';

export default Model.extend({
    namespace: 'workbenchmodel',
    state: {
        pageSize: 20,
        pageIndex: 1,
        beginTime: '2018-12-01 00:00:00',//moment().format('YYYY-MM-DD HH:mm:ss'),
        endTime: '2019-01-01 00:00:00',//moment().format('YYYY-MM-DD HH:mm:ss'),
        operation:{
            beginTime: moment().add(-3,'months').format("YYYY-MM-01 00:00:00"),//'2018-12-01 00:00:00',//moment().format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),//'2019-01-01 00:00:00',//moment().format('YYYY-MM-DD HH:mm:ss'),
            // renderCalendarBeginTime:moment().add(-3,'month').format("YYYY-01-01 00:00:00"),
            // renderCalendarEndinTime:moment().format('YYYY-MM-DD HH:mm:ss'),
            tableDatas:[],
            pageIndex: 1,
            pageSize: 6,
            total:0,
        }
    },
    subscriptions: {
    },
    effects: {
        * getOperationData({payload}, { call, put, update, select }) {
            const {operation} = yield select(state => state.workbenchmodel);
            // debugger;
            let body = {
                beginTime: operation.beginTime,
                endTime: operation.endTime,
                pageSize: operation.pageSize,
                pageIndex: operation.pageIndex,
                IsQueryAllUser:true,
                IsPaging:false
                //operationUserId:'766f911d-5e41-4bbf-b705-add427a16e77'
            };
            const response = yield call(getOperationHistoryRecordPageList, body);
            yield update({
                operation:{
                    ...operation,
                    ...{
                        tableDatas:response.data,
                        pageIndex:payload.pageIndex || 1,
                        total:response.total
                    }
                }
            });
            const tableDatasNew = yield select(state => state.workbenchmodel.operation);
            console.log('new', tableDatasNew);
        },
    },
});
