import request from '../utils/request';
import {
    post,
}
    from '../dvapack/request';

// 上传附件
export async function uploadfiles(params) {
    const body = {
        file: params.file,
        fileName: params.fileName,
        DGIMN: params.DGIMN,
    };
    const result = post('/api/rest/PollutantSourceApi/ManualSupplement/UploadFiles', body, null);
    return result === null ? {
        data: null
    } : result;
}

// 获取下拉列表
export async function GetPollutantByPoint(params) {
    const body = {
        DGIMN: params.DGIMN,
    };
    const result = post('/api/rest/PollutantSourceApi/ManualSupplement/GetPollutantByDGIMN', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取下拉列表(添加页面，不用同一个方法，否则会导致数据为空的问题)
export async function addGetPollutantByPoint(params) {
    const body = {
        DGIMN: params.DGIMN,
    };
    const result = post('/api/rest/PollutantSourceApi/ManualSupplement/GetPollutantByDGIMNAdd', body, null);
    return result === null ? {
        data: null
    } : result;
}

// 获取列表数据
export async function GetManualSupplementList(params) {
    const body = {
        DGIMN: params.DGIMN,
        pollutantCode: params.pollutantCode,
        beginTime: params.BeginTime,
        endTime: params.EndTime,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
    };
    const result = post('/api/rest/PollutantSourceApi/ManualSupplement/GetManualSupplementList', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取模板地址
export async function getUploadTemplate(params) {
    const body = {
        PollutantType:params.PollutantType
    };
    const result = post('/api/rest/PollutantSourceApi/ManualSupplement/UploadTemplate', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取污染物类型列表
export async function GetAllPollutantTypes(params) {
    const body = {
        DGIMN:params.DGIMN
    };
    const result = post('/api/rest/PollutantSourceApi/ManualSupplement/GetAllPollutantTypes', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 添加手工数据
export async function AddUploadFiles(params) {
    const body = {
        pollutantCode: params.pollutantCode,
        monitorTime: params.monitorTime,
        avgValue: params.avgValue,
        DGIMN: params.DGIMN,
    };
    const result = post('/api/rest/PollutantSourceApi/ManualSupplement/AddUploadFiles', body, null);
    return result === null ? {
        data: null
    } : result;
}

// 获取污染物单位
export async function GetUnitByPollutant(params) {
    const body = {
        pollutantCode:params.pollutantCode
    };
    const result = post('/api/rest/PollutantSourceApi/ManualSupplement/GetUnitByPollutant', body, null);
    return result === null ? {
        data: null
    } : result;
}

//删除数据
export async function DeleteUploadFiles(params) {
    const body = {
        DGIMN:params.DGIMN,
        pollutantCode:params.pollutantCode,
        monitorTime:params.monitorTime,
    };
    const result = post('/api/rest/PollutantSourceApi/ManualSupplement/DeleteUploadFiles', body, null);
    return result === null ? {
        data: null
    } : result;
}

//修改数据
export async function UpdateManualSupplementData(params) {
    const body = {
        DGIMN:params.DGIMN,
        pollutantCode:params.pollutantCode,
        monitorTime:params.monitorTime,
        avgValue: params.avgValue,
    };
    const result = post('/api/rest/PollutantSourceApi/ManualSupplement/UpdateHourData', body, null);
    return result === null ? {
        data: null
    } : result;
}
