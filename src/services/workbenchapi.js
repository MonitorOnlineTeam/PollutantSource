/**
 * 功  能：工作台相关服务
 * 创建人：吴建伟
 * 创建时间：2018.12.26
 */

import {post} from '../dvapack/request';
import {pageUrl} from '../utils/common';

/**
 * 运维历史记录
 * @params {"pageIndex": 1,"pageSize": 10,"beginTime": "2018-12-01 00:00:00","endTime": "2019-01-01 00:00:00"}
 */
export async function getOperationHistoryRecordPageList(params) {

    const result = post(pageUrl.workbench.operationHistoryRecord, params, null);

    return result === null ? {
        data: null
    } : result;
}

/**
 * 获取异常报警列表
 * @params {"pageIndex": 1,"pageSize": 10,"beginTime": "2018-12-01 00:00:00","endTime": "2018-12-30 00:00:00"}
 */
export async function getDataExceptionAlarmPageList(params) {
    // const body = {
    //     beginTime: params.beginTime,
    //     endTime: params.endTime,
    //     pageIndex: params.pageIndex || 1,
    //     pageSize: params.pageSize || 15
    // };

    const result = post(pageUrl.workbench.dataExceptionAlarm, params, null);

    return result === null ? {
        data: null
    } : result;
}