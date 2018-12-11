import { GetTaskDetails, GetYwdsj, GetJzRecord, GetRecordType, GetJzHistoryRecord, GetConsumablesReplaceRecordList, GetStandardGasRepalceRecordList, GetPatrolRecordListPC, GetHistoryConsumablesReplaceRecord, GetHistoryStandardGasRepalceRecordList, GetStopCemsDetail, GetRepairDetail } from '../services/taskapi';
import { Model } from '../dvapack';
import { EnumRequstResult } from '../utils/enum';

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
        PatrolRecordListPC: [],
        RecordCount: null,
        HistoryConsumablesReplaceRecord: [],
        HistoryConsumablesReplaceRecordCount: null,
        pageIndex: 1,
        pageSize: 10,
        HistoryStandardGasRepalceRecordList: [],
        HistoryStandardGasRepalceRecordListCount: null,
        StopCems: null,
        Repair: null,
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
                    yield update({ JzHistoryRecord: DataInfo.data, RecordCount: DataInfo.total });
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
            const result = yield call(GetConsumablesReplaceRecordList, { TaskIds: TaskIds, TypeIDs: TypeIDs });
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
        // 获取易耗品历史记录方法
        * GetHistoryConsumablesReplaceRecord({
            payload: {
                pageIndex,
                pageSize,
                TypeID,
                DGIMN,
                BeginTime,
                EndTime,
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            debugger
            const result = yield call(GetHistoryConsumablesReplaceRecord, { pageIndex: pageIndex, pageSize: pageSize, TypeID: TypeID, DGIMN: DGIMN, BeginTime: BeginTime, EndTime: EndTime });

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    HistoryConsumablesReplaceRecord: result.data,
                    HistoryConsumablesReplaceRecordCount: result.total,
                    pageIndex: pageIndex,
                    pageSize: pageSize
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    HistoryConsumablesReplaceRecord: [],
                    HistoryConsumablesReplaceRecordCount: result.total,
                    pageIndex: pageIndex,
                    pageSize: pageSize
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
            const result = yield call(GetStandardGasRepalceRecordList, { TaskIds: TaskIds, TypeIDs: TypeIDs });

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
        // 获取标气历史记录方法
        * GetHistoryStandardGasRepalceRecordList({
            payload: {
                pageIndex,
                pageSize,
                TypeID,
                DGIMN,
                BeginTime,
                EndTime,
            }
        }, {
            call,
            put,
            update,
            select
        }) {
            const result = yield call(GetHistoryStandardGasRepalceRecordList, { pageIndex: pageIndex, pageSize: pageSize, TypeID: TypeID, DGIMN: DGIMN, BeginTime: BeginTime, EndTime: EndTime });

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    HistoryStandardGasRepalceRecordList: result.data,
                    HistoryStandardGasRepalceRecordListCount: result.total,
                    pageIndex: pageIndex,
                    pageSize: pageSize
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    HistoryStandardGasRepalceRecordList: [],
                    HistoryStandardGasRepalceRecordListCount: result.total,
                    pageIndex: pageIndex,
                    pageSize: pageSize
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
            const result = yield call(GetPatrolRecordListPC, { TaskIds: TaskIds, TypeIDs: TypeIDs });

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
        //获取停机记录表单明细
        *GetStopCemsDetail({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetStopCemsDetail, payload);
            if (DataInfo != null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data != null) {
                    yield update({ StopCems: DataInfo.data });
                }
            }
        },
        //获取维修记录表单明细
        *GetRepairDetail({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetRepairDetail, payload);
            if (DataInfo != null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data != null) {
                    yield update({ Repair: DataInfo.data });

                }
            }
        },
    }
});
