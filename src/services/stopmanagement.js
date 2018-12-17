import request from '../utils/request';
import {
    post
}
    from '../dvapack/request';
// 获取当前排口下的停产列表
export async function getlist(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        StopHours: params.StopHours,
        RecordUserName: params.RecordUserName,
        DGIMN: params.DGIMN,
        Data: params.Data,
        datatype: params.datatype,
    };
    const result = post('/api/rest/PollutantSourceApi/POutputStop/GetOutputStopList', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取当前数据实体
export async function getlistbyid(params) {
    const body = {
        OutputStopID: params.OutputStopID,
    };
    const result = post('/api/rest/PollutantSourceApi/POutputStop/GetOutputStopById', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 删除当前数据
export async function deletebyid(params) {
    const body = {
        OutputStopID: params.OutputStopID,
    };
    const result = post('/api/rest/PollutantSourceApi/POutputStop/DeleteOutputStopById', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 添加停产
export async function addoutputstop(params) {
    const body = {
        BeginTime: params.BeginTime,
        EndTime: params.EndTime,
        DGIMN: params.DGIMN,
        StopDescription: params.StopDescription,
    };
    const result = post('/api/rest/PollutantSourceApi/POutputStop/AddOutputStop', body, null);
    return result === null ? {
        data: null
    } : result;
}
