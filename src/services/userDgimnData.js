import request from '../utils/request';
import {
    post
}
    from '../dvapack/request';
// 获取数据过滤排口列表
export async function userDgimnDataFilter(params) {
    const body = {
        UserId: params.UserId,
        TestKey: params.TestKey,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/GetUserDgimnDataFilter', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 添加数据权限
export async function adduserDgimnDataFilter(params) {
    const body = {
        UserId: params.UserId,
        DGIMNS: params.DGIMNS,
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/AddUserDgimnDataFilter', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 添加数据权限
export async function addDgimnDataFilter(params) {
    const body = {
        UserId: params.UserId,
        DGIMNS: params.DGIMNS,
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/AddDgimnDataFilter', body, null);
    return result === null ? {
        data: null
    } : result;
}
