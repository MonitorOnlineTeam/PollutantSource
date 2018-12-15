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
        beginTime: params.beginTime,
        endTime: params.endTime,
        StopHours: params.StopHours,
        RecordUserName: params.RecordUserName,
        DGIMN: params.DGIMN,
    };
    const result = post('/api/rest/PollutantSourceApi/POutputStop/GetOutputStopList', body, null);
    return result === null ? {
        data: null
    } : result;
}
