/**
 * 功  能：传输有效率相关接口
 * 创建人：吴建伟
 * 创建时间：2018.12.07
 */

import {post} from '../dvapack/request';

/**
 * 【传输有效率】获取一个或多个排口传输有效率等等
 * @params {"DGIMNs": ["sgjt001003","sgjt001004"],"beginTime":"2018-11-01 00:00:00","endTime":"2018-11-30 00:00:00"}
 */
export async function getMonthsTransmissionEfficiency(params) {
    const body = {
        DGIMNs: params.DGIMNs,
        beginTime: params.beginTime,
        endTime: params.endTime,
        TERSort: params.TERSort,
        pageIndex: params.pageIndex || 1,
        pageSize: params.pageSize || 15
    };

    const result = post('/api/rest/PollutantSourceApi/DataStatistics/GetTransmissionEfficiencyForPoints', body, null);

    return result === null ? {
        data: null
    } : result;
}
