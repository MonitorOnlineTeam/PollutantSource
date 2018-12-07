import { GetTaskDetails, GetYwdsj, GetJzRecord } from '../services/taskapi';
import { Model } from '../dvapack';
import {EnumRequstResult} from '../utils/enum';

export default Model.extend({
    namespace: 'task',
    state: {
        TaskInfo: null,
        OperationInfo: [],
        IsOver: false,
        JzRecord: null
    },

    effects: {
        // 获取任务的详细信息
        * GetTaskDetailInfo({
            payload,
        }, { call, update }) {
            const taskInfo = yield call(GetTaskDetails, payload);
            if (taskInfo != null) {
                yield update({
                    TaskInfo: taskInfo
                });
            }
        },
        // 运维大事记
        * GetYwdsj({
            payload,
        }, { call, update, select }) {
            const DataInfo = yield call(GetYwdsj, payload);
            if (DataInfo != null && DataInfo.requstresult == EnumRequstResult.Success) {
                const isLoadMoreOpt = payload.isLoadMoreOpt; // 是否是加载更多操作
                let { OperationInfo } = yield select(_ => _.task);
                if (isLoadMoreOpt) {
                    if (DataInfo.data.length > 0) {
                        DataInfo.data.map((item) => {
                            OperationInfo.push(item);
                        });
                        yield update({ OperationInfo: OperationInfo });
                    }

                    if (OperationInfo.length === DataInfo.total) {
                        yield update({ IsOver: true });
                    }
                } else {
                    yield update({ OperationInfo: DataInfo.data });
                    if (DataInfo.data.length === DataInfo.total) {
                        yield update({ IsOver: true });
                    } else {
                        yield update({ IsOver: false });
                    }
                }
            }
        },
        // 运维校准记录
        * GetJzRecord({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetJzRecord, payload);
            if (DataInfo != null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data != null) {
                    yield update({ JzRecord: DataInfo.data });
                }
            }
        }
    }
});
