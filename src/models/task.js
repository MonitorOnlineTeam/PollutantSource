import { GetTaskDetails, GetYwdsj, GetJzRecord, GetRecordType, GetJzHistoryRecord, GetConsumablesReplaceRecordList, GetStandardGasRepalceRecordList, GetPatrolRecordListPC } from '../services/taskapi';
import { Model } from '../dvapack';
import {EnumRequstResult} from '../utils/enum';

export default Model.extend({
    namespace: 'task',
    state: {
        TaskInfo: null,
        OperationInfo: [],
        IsOver: false,
        JzRecord: null,
        RecordTypes: [],
        JzHistoryRecord: [],
        ConsumablesReplaceRecordList: [],
        StandardGasRepalceRecordList: [],
        PatrolRecordListPC: []
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
        },
        // 获取运维表单类型
        * GetRecordType({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetRecordType, payload);
            if (DataInfo != null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data != null) {
                    yield update({ RecordTypes: DataInfo.data });
                }
            }
        },
        // 获取校准历史记录
        * GetJzHistoryRecord({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetJzHistoryRecord, payload);
            if (DataInfo != null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data != null) {
                    yield update({ RecordTypes: DataInfo.data });
                }
            }
        },
        // 根据任务id和类型id获取易耗品列表
        * fetchuserlist({
            payload: {
                TaskIds,
                TypeIDs
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(GetConsumablesReplaceRecordList, {TaskIds: TaskIds, TypeIDs: TypeIDs});
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    ConsumablesReplaceRecordList: result.data,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    ConsumablesReplaceRecordList: [],
                });
            }
        },
        // 根据任务id和类型id获取标气列表
        * StandardGasRepalceRecordList({
            payload: {
                TaskIds,
                TypeIDs
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(GetStandardGasRepalceRecordList, {TaskIds: TaskIds, TypeIDs: TypeIDs});

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    StandardGasRepalceRecordList: result.data,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    StandardGasRepalceRecordList: [],
                });
            }
        },
        // 根据任务id和类型id获取巡检记录表(PC单独接口与手机端不一致)
        * GetPatrolRecordListPC({
            payload: {
                TaskIds,
                TypeIDs
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(GetPatrolRecordListPC, {TaskIds: TaskIds, TypeIDs: TypeIDs});

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    PatrolRecordListPC: result.data,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    PatrolRecordListPC: [],
                });
            }
        },
    }
});
