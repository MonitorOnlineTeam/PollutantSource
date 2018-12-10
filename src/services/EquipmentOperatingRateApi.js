/**
 * 功  能：设备运转率接口
 * 创建人：吴建伟
 * 创建时间：2018.12.10
 */

import {post} from '../dvapack/request';

/**
 * 【设备运转率】获取一个或多个设备运转率（不传MN则查询所有设备）
 * @params {"DGIMNs": ["sgjt001003","sgjt001004"],"beginTime":"2018-11-01 00:00:00","endTime":"2018-11-30 00:00:00"}
 */
export async function getEquipmentOperatingRateForPoints(params) {
    const body = {
        DGIMNs: params.DGIMNs,
        beginTime: params.beginTime,
        endTime: params.endTime,
        EORSort: params.EORSort,
        pageIndex: params.pageIndex || 1,
        pageSize: params.pageSize || 15
    };

    const result = post('/api/rest/PollutantSourceApi/DataStatistics/GetEquipmentOperatingRateForPoints', body, null);

    return result === null ? {
        data: null
    } : result;
}
