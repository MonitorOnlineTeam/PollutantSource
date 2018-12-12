/**
 * 功  能：月度排放量统计
 * 创建人：吴建伟
 * 创建时间：2018.12.10
 */

import {post} from '../dvapack/request';

/**
 * 【排放量】根据企业和因子获取所有月份的排放总量(企业可不传)
 * @params {"enterpriseCodes":["3cbfa1f4-3e0a-473b-aab0-5a9a168010ee"] ,"pollutantCodes":["02"],"beginTime":"2018-11-01 00:00:00","endTime":"2018-11-30 00:00:00"}
 */
export async function getAllMonthPollutantEmissions(params) {
    const body = {
        pollutantCodes: params.pollutantCodes,
        beginTime: params.beginTime,
        endTime: params.endTime,
        pageIndex: params.pageIndex || 1,
        pageSize: params.pageSize || 20
    };
    const result = post('/api/rest/PollutantSourceApi/DataStatistics/GetAllMonthPollutantEmissions', body, null);

    return result === null ? {
        data: null
    } : result;
}

/**
 * 【排放量】根据企业、因子、月份获取所有排口的排放总量(企业可不传)
 * @params {"enterpriseCodes":["3cbfa1f4-3e0a-473b-aab0-5a9a168010ee"] ,"pollutantCodes":["02"],"monthTime":"2018-11-01 00:00:00"}
 */
export async function getSingleMonthAllPointEmissions(params) {
    const body = {
        pollutantCodes: params.pollutantCodes,
        monthTime: params.monthTime,
        emissionsSort: params.emissionsSort,
        pageIndex: params.pageIndex || 1,
        pageSize: params.pageSize || 20
    };
    const result = post('/api/rest/PollutantSourceApi/DataStatistics/GetSingleMonthAllPointEmissions', body, null);

    return result === null ? {
        data: null
    } : result;
}

/**
 * 【排放量】根据企业、因子、月份获取单个排口每一天的排放总量(企业可不传)
 * @params {"enterpriseCodes":["3cbfa1f4-3e0a-473b-aab0-5a9a168010ee"] ,"pollutantCodes":["02"],"DGIMNs":"sgjt001003","monthTime":"2018-11-01 00:00:00"}
 */
export async function getSinglePointDaysEmissions(params) {
    const body = {
        pollutantCodes: params.pollutantCodes,
        DGIMNs: params.DGIMNs,
        monthTime: params.monthTime,
        emissionsSort: params.emissionsSort,
        pageIndex: params.pageIndex || 1,
        pageSize: params.pageSize || 20
    };
    const result = post('/api/rest/PollutantSourceApi/DataStatistics/GetSinglePointDaysEmissions', body, null);

    return result === null ? {
        data: null
    } : result;
}