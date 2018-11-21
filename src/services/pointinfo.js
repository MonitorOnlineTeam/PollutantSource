import request from '../utils/request';
import {
    post
}
    from '../dvapack/request';
// 排口列表
export async function getpointlist(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        DGIMNs: params.DGIMNs
    };

    const result = post('/api/rest/PollutantSourceApi/PPointAndData/GetPointList', body, null);
    return result === null ? {
        data: null
    } : result;
}
