import { post} from '../dvapack/request';
// 污染源运维的相关接口
export async function GetTaskDetails(params) {
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
        DGIMNs: params.DGIMNs,
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
        TaskID: params.TaskID,
        TypeID: params.TypeID
    };
    const result = await post('/api/rest/PollutantSourceApi/PTaskForm/GetJzRecord', body, null);
    return result === null ? { data: null } : result;
}

// 获取校准记录
export async function GetRecordType(params) {
    const body = {

    };
    const result = await post('/api/rest/PollutantSourceApi/PTaskForm/GetRecordType', body, null);
    return result === null ? { data: null } : result;
}

// 获取校准历史记录
export async function GetJzHistoryRecord(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        TypeID: params.TypeID,
        DGIMN: params.DGIMN,
        BeginTime: params.BeginTime,
        EndTime: params.EndTime
    };
    const result = await post('/api/rest/PollutantSourceApi/PTaskForm/GetJzRecord', body, null);
    return result === null ? { data: null } : result;
}
// 根据任务id和类型id获取易耗品列表
export async function GetConsumablesReplaceRecordList(params) {
    const body = {
        TaskID: params.TaskIds,
        TypeID: params.TypeIDs
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetConsumablesReplaceRecordList', body, null);
    return result === null ? {
        data: null
    } : result;
}

// 根据任务id和类型id获取标气列表
export async function GetStandardGasRepalceRecordList(params) {
    const body = {
        TaskID: params.TaskIds,
        TypeID: params.TypeIDs
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetStandardGasRepalceRecordList', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 根据任务id和类型id获取巡检记录表（不通于手机端PC单独做接口)
export async function GetPatrolRecordListPC(params) {
    const body = {
        TaskID: params.TaskIds,
        TypeID: params.TypeIDs
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetPatrolRecordListPC', body, null);
    return result === null ? {
        data: null
    } : result;
}
