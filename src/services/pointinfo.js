import request from '../utils/request';
import {
    post
}
    from '../dvapack/request';
// 排口列表
export async function getList(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        User_Account: params.UserAccount,
        DeleteMark: params.DeleteMark,
    };

    const result = post('/api/rest/PollutantSourceApi/PUserInfo/GetAllUserInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}
