import request from '../utils/request';
import {
    post
}
    from '../dvapack/request';
// 排口列表
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
