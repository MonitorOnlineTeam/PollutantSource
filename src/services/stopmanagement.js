import request from '../utils/request';
import {
    post, upload
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
        DGIMN: params.DGIMN,
        Data: params.Data,
        Files: params.Files,
        StopDescription: params.StopDescription,
    };
    const result = post('/api/rest/PollutantSourceApi/POutputStop/AddOutputStop', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 上传附件
export async function uploadfiles(params) {
    const body = {
        file: params.file,
        fileName: params.fileName,
    };
    const result = upload('/api/rest/PollutantSourceApi/KBM/UploadFilse', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 删除附件
export async function deletefiles(params) {
    const body = {
        guid: params.guid,
    };
    const result = upload('/api/rest/PollutantSourceApi/PUploadImage/DeleteFilse', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 验证时间是否冲突
export async function outputstoptimechecked(params) {
    const body = {
        DGIMN: params.DGIMN,
        Data: params.Data,
    };
    const result = upload('/api/rest/PollutantSourceApi/POutputStop/OutputStopTimeChecked', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 档案列表
export async function getoutputstopfiles(params) {
    const body = {
        OutputStopID: params.OutputStopID,
    };
    const result = upload('/api/rest/PollutantSourceApi/POutputStop/GetOutputStopFiles', body, null);
    return result === null ? {
        data: null
    } : result;
}
