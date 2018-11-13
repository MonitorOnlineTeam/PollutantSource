
import request from '../utils/request';
import {
    post
}
from '../dvapack/request';
export async function getList(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/GetAllUserInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}
