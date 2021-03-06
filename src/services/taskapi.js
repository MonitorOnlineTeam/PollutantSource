import { post,authorpost } from '../dvapack/request';
import { EnumRejectFlag } from '../utils/enum';
// 污染源运维的相关接口
export async function GetTaskRecord(params) {
    const body = {
        TaskID: params.TaskID
    };

    const result = await post('/api/rest/PollutantSourceApi/PTaskProcessing/GetTaskDetails', body, null);
    return result === null ? { data: null } : result;
}

// 获取运维大事记信息
export async function GetYwdsj(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        taskType: params.taskType,
        DGIMNs: params.DGIMN,
        IsAlarmTimeout: params.IsAlarmTimeout,
        beginTime: params.beginTime,
        endTime: params.endTime
    };
    const result = await post('/api/rest/PollutantSourceApi/PTaskProcessing/GetOperationPageList', body, null);
    return result === null ? { data: null } : result;
}

// 获取校准记录
export async function GetJzRecord(params) {
    const body = {
        TaskID: params.TaskID
    };
    const result = await authorpost('/api/rest/PollutantSourceApi/PTaskForm/GetJzRecord?authorCode=48f3889c-af8d-401f-ada2-c383031af92d', body, null);
    return result === null ? { data: null } : result;
}

// 获取校准记录
export async function GetRecordType(params) {
    const body = {
        DGIMN: params.DGIMN
    };
    const result = await authorpost('/api/rest/PollutantSourceApi/PTaskForm/GetRecordType?authorCode=48f3889c-af8d-401f-ada2-c383031af92d', body, null);
    return result === null ? { data: null } : result;
}

// 获取校准历史记录
export async function GetJzHistoryList(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        DGIMN: params.DGIMN,
        BeginTime: params.beginTime,
        EndTime: params.endTime
    };
    const result = await post('/api/rest/PollutantSourceApi/PTaskForm/GetJzHistoryInfo', body, null);
    return result === null ? { data: null } : result;
}
// 根据任务id和类型id获取易耗品列表
export async function GetConsumablesReplaceRecord(params) {
    const body = {
        TaskID: params.TaskID,
        TypeID: params.TypeIDs
    };
    const result =await authorpost('/api/rest/PollutantSourceApi/PTaskForm/GetConsumablesReplaceRecordList?authorCode=48f3889c-af8d-401f-ada2-c383031af92d', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取易耗品历史记录列表
export async function GetConsumablesReplaceHistoryList(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        TypeID: params.TypeID,
        DGIMN: params.DGIMN,
        BeginTime: params.beginTime,
        EndTime: params.endTime,
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetFormHistoryList', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 根据任务id和类型id获取标气列表
export async function GetStandardGasReplaceRecord(params) {
    const body = {
        TaskID: params.TaskID
    };
    const result = await authorpost('/api/rest/PollutantSourceApi/PTaskForm/GetStandardGasRepalceRecordList?authorCode=48f3889c-af8d-401f-ada2-c383031af92d', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取标气历史记录列表
export async function GetStandardGasRepalceHistoryList(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        TypeID: params.TypeID,
        DGIMN: params.DGIMN,
        BeginTime: params.beginTime,
        EndTime: params.endTime,
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetStandardGasRepalceRecordHistoryList', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 根据任务id和类型id获取巡检记录表（不通于手机端PC单独做接口)
export async function GetPatrolRecord(params) {
    const body = {
        TaskID: params.TaskID
    };
    const result = authorpost('/api/rest/PollutantSourceApi/PTaskForm/GetPatrolRecordListPC?authorCode=48f3889c-af8d-401f-ada2-c383031af92d', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取CEMS日常巡检记录表（历史记录表）
export async function GetInspectionHistoryList(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        TypeID: params.TypeID,
        DGIMN: params.DGIMN,
        BeginTime: params.beginTime,
        EndTime: params.endTime,
    };

    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetPatrolRecordHistoryList', body, null);
    return result === null ? {
        data: null
    } : result;
}


// 获取停机记录内容
export async function GetStopCemsRecord(params) {
    const body = {
        TaskID: params.TaskID,
        TypeID: params.TypeID
    };
    const result = await authorpost('/api/rest/PollutantSourceApi/PTaskForm/PostStopCemsDetail?authorCode=48f3889c-af8d-401f-ada2-c383031af92d', body, null);
    return result === null ? { data: null } : result;
}
// 获取停机记录列表（历史记录表）
export async function GetStopCemsHistoryList(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        TypeID: params.TypeID,
        DGIMN: params.DGIMN,
        BeginTime: params.beginTime,
        EndTime: params.endTime,
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/PostStopCemsList', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取维修记录内容
export async function GetRepairRecord(params) {
    const body = {
        TaskID: params.TaskID,
        TypeID: params.TypeID
    };
    const result = await authorpost('/api/rest/PollutantSourceApi/PTaskForm/RepairRecordDetail?authorCode=48f3889c-af8d-401f-ada2-c383031af92d', body, null);
    if (result === null || result === undefined) {
        return { data: null };
    }

    return result;

    // return result === null ? { data: null } : result === undefined ? { data: null } : result;
}
// 获取维修记录列表（历史记录表）
export async function GetRepairHistoryList(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        DGIMN: params.DGIMN,
        BeginTime: params.beginTime,
        EndTime: params.endTime,
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/RepairRecordList', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取异常记录列表（历史记录表）
export async function GetDeviceExceptionHistoryList(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        TypeID: params.TypeID,
        DGIMN: params.DGIMN,
        BeginTime: params.beginTime,
        EndTime: params.endTime,
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/DeviceExceptionList', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取异常记录内容
export async function GetDeviceExceptionRecord(params) {
    const body = {
        TaskID: params.TaskID,
        TypeID: params.TypeID
    };
    const result = await authorpost('/api/rest/PollutantSourceApi/PTaskForm/DeviceExceptionDetail?authorCode=48f3889c-af8d-401f-ada2-c383031af92d', body, null);
    return result === null ? { data: null } : result;
}
// 校验测试历史记录列表（历史记录表）
export async function GetBdTestHistoryList(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        TypeID: params.TypeID,
        DGIMN: params.DGIMN,
        BeginTime: params.beginTime,
        EndTime: params.endTime,
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetBdHistoryInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}

// 获取比对监测记录
export async function GetBdTestRecord(params) {
    const body = {
        TaskID: params.TaskID
    };
    const result = await authorpost('/api/rest/PollutantSourceApi/PTaskForm/GetBdRecord?authorCode=48f3889c-af8d-401f-ada2-c383031af92d', body, null);
    return result === null ? { data: null } : result;
}
// 打回
export async function RevokeTask(params) {
    const body = {
        taskID: params.taskID,
        revokeReason: params.revokeReason,
        rejectFlag: EnumRejectFlag.Repulse,
        revokeUserId: params.userID
    };
    const result = await post('/api/rest/PollutantSourceApi/PTaskProcessing/PostRevokeTask', body, null);
    return result === null ? { data: null } : result;
}

// 根据任务id判断出巡检记录表详情
export async function GetPatrolType(params) {
    const body = {
        TaskID: params.TaskID
    };
    const result = await post('/api/rest/PollutantSourceApi/PTaskForm/GetPatrolTypeIdbyTaskId', body, null);
    return result;
}
