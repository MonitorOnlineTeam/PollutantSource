import {
    GetTaskDetails, GetYwdsj, GetJzRecord,
    GetRecordType, GetJzHistoryRecord, GetConsumablesReplaceRecordList,
    GetStandardGasRepalceRecordList, GetPatrolRecordListPC,
    GetHistoryConsumablesReplaceRecord, GetHistoryStandardGasRepalceRecordList,
    GetHistoryInspectionHistoryRecords, GetStopCemsDetail, GetRepairDetail,
    GetHistoryRepairDetail, GetHistoryStopCemsList, GetDeviceExceptionList,
    GetBdHistoryInfoList, GetDeviceExceptionDetail, GetBdTestRecord
} from '../services/taskapi';
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
        List: [],
        PatrolRecordListPC: [],
        RecordCount: null,
        pageIndex: 1,
        pageSize: 10,
        total: null,
        StopCems: null,
        Repair: null,
        ConsumablesReplaceRecordList: [],
        StandardGasRepalceRecordList: [],
        HistoryConsumablesReplaceRecordList: [],
        HistoryStandardGasRepalceRecordList: [],
        HistoryInspectionHistoryRecordList: [],
        HistoryStopCemsList: [],
        loading: false,
        ExceptionDetail: [],
        BdRecord: [],
        DGIMN: null,
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
            debugger
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
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data !== null) {
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
                    yield update({ JzHistoryRecord: DataInfo.data, RecordCount: DataInfo.total,DGIMN:payload.DGIMN });
                }
            }
            else
            {
                yield update({ 
                    JzHistoryRecord: null, 
                    RecordCount: 0,
                    DGIMN:payload.DGIMN 
                });  
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
            update,
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
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(GetHistoryConsumablesReplaceRecord, payload);
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    HistoryConsumablesReplaceRecordList: result.data,
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    DGIMN: payload.DGIMN,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    HistoryConsumablesReplaceRecordList: [],
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    DGIMN: payload.DGIMN,
                });
            }
        },
        // 根据任务id和类型id获取标气列表
        * StandardGasRepalceRecordList({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(GetStandardGasRepalceRecordList, payload);

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
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(GetHistoryStandardGasRepalceRecordList, payload);

            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    HistoryStandardGasRepalceRecordList: result.data,
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    DGIMN: payload.DGIMN,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    HistoryStandardGasRepalceRecordList: [],
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    DGIMN: payload.DGIMN,
                });
            }
        },
        // 根据任务id和类型id获取巡检记录表(PC单独接口与手机端不一致)
        * GetPatrolRecordListPC({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(GetPatrolRecordListPC, payload);
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
        // 获取完全抽取法CEMS日常巡检记录表（历史记录表）
        * GetHistoryInspectionHistoryRecords({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(GetHistoryInspectionHistoryRecords, payload);
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    HistoryInspectionHistoryRecordList: result.data,
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    HistoryInspectionHistoryRecordList: [],
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize
                });
            }
        },
        //获取停机记录表单明细
        * GetStopCemsDetail({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetStopCemsDetail, payload);
            if (DataInfo !== null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data !== null) {
                    yield update({ StopCems: DataInfo.data });
                }
            }
        },
        //获取停机记录历史
        * GetHistoryStopCemsList({
            payload,
        }, {
            call,
            update,
        }) {
            const result = yield call(GetHistoryStopCemsList, payload);
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    HistoryStopCemsList: result.data,
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    DGIMN: payload.DGIMN,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    HistoryStopCemsList: [],
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    DGIMN: payload.DGIMN,
                });
            }
        },
        //获取维修记录表单明细
        * GetRepairDetail({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetRepairDetail, payload);
            if (DataInfo !== null && DataInfo.requstresult === '1') {
                if (DataInfo.data !== null) {
                    yield update({ Repair: DataInfo.data });
                }
            }
        },
        //获取维修记录历史
        * GetHistoryRepairDetail({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(GetHistoryRepairDetail, payload);
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    List: result.data,
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    DGIMN: payload.DGIMN,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    List: [],
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    DGIMN: payload.DGIMN,
                });
            }  
        },
        //获取异常记录表单明细
        * GetDeviceExceptionDetail({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetDeviceExceptionDetail, payload);
            if (DataInfo !== null && DataInfo.requstresult === '1') {
                if (DataInfo.data !== null) {
                    yield update({ ExceptionDetail: DataInfo.data });
                }
            }
        },
        //异常记录历史
        * GetDeviceExceptionList({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(GetDeviceExceptionList, payload);
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    List: result.data,
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    DGIMN:payload.DGIMN,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    List: [],
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    DGIMN:payload.DGIMN,
                });
            }
        },
        //校验测试记录历史
        * GetBdHistoryInfoList({
            payload
        }, {
            call,
            update,
        }) {
            const result = yield call(GetBdHistoryInfoList, payload);
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    List: result.data,
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    DGIMN:payload.DGIMN,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    List: [],
                    total: result.total,
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    DGIMN:payload.DGIMN,
                });
            }
        },
        // 运维校准记录
        * GetBdTestRecord({
            payload,
        }, { call, update }) {
            const DataInfo = yield call(GetBdTestRecord, payload);
            if (DataInfo != null && DataInfo.requstresult == EnumRequstResult.Success) {
                if (DataInfo.data != null) {
                    yield update({ BdRecord: DataInfo.data });
                }
            }
        }
    },

});
