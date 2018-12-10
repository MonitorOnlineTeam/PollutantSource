/**
 * 功  能：报警及时响应统计
 * 创建人：吴建伟
 * 创建时间：2018.12.10
 */

import {post} from '../dvapack/request';

/**
 * 【报警及时响应】获取报警及时响应所有月统计数据
 * @params {"beginTime":"2018-11-01 00:00:00","endTime":"2018-11-30 00:00:00"}
 */
export async function getAlarmResponseAllMonthStatistics(params) {
    const body = {
        beginTime: params.beginTime,
        endTime: params.endTime,
        // EORSort: params.EORSort,
        pageIndex: params.pageIndex || 1,
        pageSize: params.pageSize || 15
    };

    const result = post('/api/rest/PollutantSourceApi/DataStatistics/GetAlarmResponseAllMonthStatistics', body, null);

    return result === null ? {
        data: null
    } : result;
}
