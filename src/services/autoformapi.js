/**
 * 功  能：AutoForm基本服务
 * 创建人：吴建伟
 * 创建时间：2019.04.29
 */

import {post} from '../dvapack/request';
import {pageUrl} from '../utils/common';

/**
 * 【AutoForm】运维历史记录
 * @params {"pageIndex": 1,"pageSize": 10,"beginTime": "2018-12-01 00:00:00","endTime": "2019-01-01 00:00:00"}
 */
export async function getOperationHistoryRecordPageList(params) {
    const result = post(pageUrl.workbench.operationHistoryRecord, params, null);
    return result === null ? {
        data: null
    } : result;
}