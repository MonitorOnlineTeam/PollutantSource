/**
 * 功  能：首页
 * 创建人：薛朋宇
 * 创建时间：2019.01.22
 */

import {
    post
} from '../dvapack/request';

/**
 * 统计企业 传输有效率 实施联网率  设备运转率 （月初到今天）
 */
export async function GetRateStatisticsByEnt(params) {
    const body = {
        beginTime: params.beginTime,
        endTime: params.endTime,
        entCode:params.entCode
    };
    const result = post('/api/rest/PollutantSourceApi/PHomePage/GetRateStatisticsByEnt', body, null);
    return result === null ? {
        data: null
    } : result;
}
/**
 * 智能预警接口--本月数据
 */
export async function GetExceptionProcessing(params) {
    const body = {
        beginTime: params.beginTime,
        endTime:params.endTime,
        entCode:params.entCode
    };
    const result = post('/api/rest/PollutantSourceApi/PHomePage/GetExceptionProcessing', body, null);
    return result === null ? {
        data: null
    } : result;
}
/**
 * 智能运维接口--本月数据
 */
export async function GetTaskCount(params) {
    const body = {
        beginTime: params.beginTime,
        endTime: params.endTime,
    };
    const result = post('/api/rest/PollutantSourceApi/PHomePage/GetTaskCount', body, null);
    return result === null ? {
        data: null
    } : result;
}
/**
 * 异常报警及响应情况--本月数据
 */
export async function GetAlarmAnalysis(params) {
    const body = {
        beginTime: params.beginTime,
        endTime: params.endTime,
        entCode:params.entCode
    };
    const result = post('/api/rest/PollutantSourceApi/PHomePage/GetAlarmAnalysis', body, null);
    return result === null ? {
        data: null
    } : result;
}
/**
 * 排污许可证--本年数据
 */
export async function GetAllMonthEmissionsByPollutant(params) {
    const body = {
        beginTime: params.beginTime,
        endTime: params.endTime,
        pollutantCode: params.pollutantCode,
        entCode:params.entCode
    };
    const result = post('/api/rest/PollutantSourceApi/PHomePage/GetAllMonthEmissionsByPollutant', body, null);
    return result === null ? {
        data: null
    } : result;
}