import request from '../utils/request';
import {
    post,
    upload
}
    from '../dvapack/request';
// 标准库列表
export async function getlist(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        Name: params.Name,
        Type: params.Type,
    };
    const result = post('/api/rest/PollutantSourceApi/StandardLibrary/GetStandardLibraryList', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 标准库污染物列表
export async function getstandardlibrarypollutantlist(params) {
    const body = {
        StandardLibraryID: params.StandardLibraryID,
    };
    const result = post('/api/rest/PollutantSourceApi/StandardLibrary/GetStandardLibraryPollutantList', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 启用禁用标准
export async function enableordisable(params) {
    const body = {
        StandardLibraryID: params.StandardLibraryID,
        Enalbe: params.Enalbe
    };
    const result = post('/api/rest/PollutantSourceApi/StandardLibrary/EnableOrDisable', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 删除标准库主表
export async function deletestandardlibrarybyid(params) {
    const body = {
        StandardLibraryID: params.StandardLibraryID
    };
    const result = post('/api/rest/PollutantSourceApi/StandardLibrary/DeleteStandardLibrary', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 删除标准库子表
export async function deletestandardlibrarypollutantbyid(params) {
    const body = {
        Guid: params.Id
    };
    const result = post('/api/rest/PollutantSourceApi/StandardLibrary/DeleteStandardLibraryPollutant', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 添加标准库主表
export async function addstandardlibrary(params) {
    const body = {
        Name: params.Name,
        Type: params.Type,
        IsUsed: params.IsUsed,
        Files: params.Files,
    };
    const result = post('/api/rest/PollutantSourceApi/StandardLibrary/AddStandardLibrary', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 添加标准库子表
export async function addstandardlibrarypollutant(params) {
    const body = {
        StandardLibraryID: params.StandardLibraryID,
        PollutantCode: params.PollutantCode,
        AlarmType: params.AlarmType,
        UpperLimit: params.UpperLimit,
        LowerLimit: params.LowerLimit,
        Type: 2,
    };
    const result = post('/api/rest/PollutantSourceApi/StandardLibrary/AddStandardLibraryPollutant', body, null);
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
    const result = upload('/api/rest/PollutantSourceApi/PUploadImage/UploadFilse', body, null);
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
// 获取标准库主表实体
export async function getStandardlibrarybyid(params) {
    const body = {
        StandardLibraryID: params.StandardLibraryID,
    };
    const result = upload('/api/rest/PollutantSourceApi/StandardLibrary/GetStandardLibraryById', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取标准库子表实体
export async function getStandardlibrarypollutantbyid(params) {
    const body = {
        Guid: params.Guid,
    };
    const result = upload('/api/rest/PollutantSourceApi/StandardLibrary/GetStandardLibraryPollutantById', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 编辑标准库主表
export async function editstandardlibrary(params) {
    const body = {
        StandardLibraryID: params.StandardLibraryID,
        Name: params.Name,
        Type: params.Type,
        IsUsed: params.IsUsed,
        Files: params.Files,
    };
    const result = post('/api/rest/PollutantSourceApi/StandardLibrary/EditStandardLibrary', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取所有污染物
export async function getpollutantlist(params) {
    const body = {
    };
    const result = post('/api/rest/PollutantSourceApi/StandardLibrary/GetPollutantList', body, null);
    return result === null ? {
        data: null
    } : result;
}
