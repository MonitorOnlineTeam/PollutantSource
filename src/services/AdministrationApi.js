/**
 * 功  能：能：运维消耗品管理
 * 创建人：张洪宾
 * 创建时间：2018.12.27
 */

import {post} from '../dvapack/request';

/**
 *  获取备品备件列表信息
 */
export async function GetSparePartList(params) {
    const body = {
        PartType:param.parttype,
        IsUsed:param.isused,
        Code:params.code,
        PartName:params.partName,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize  
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetSparePartList', body, null);
    return result === null ? {
        data: null
    } : result.data;
}

/**
 *  获取单个备品备件列表信息
 */
export async function GetOneSparePart(params) {
    const body = {
        ID:params.id
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetOneSparePart', body, null);
    return result === null ? {
        data: null
    } : result.data;
}

/**
 *  添加或修改备品备件列表信息
 */
export async function AddOrUpdateSpareParts(params) {
    const body = {
        PartType:param.parttype,
        IsUsed:param.isused,
        Code:params.code,
        PartName:params.partName,
        ID:params.id
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/AddOrUpdateSpareParts', body, null);
    return result === null ? {
        data: null
    } : result.requstresult;
}

/**
 *  删除备品备件列表信息
 */
export async function DeleteSparePartsRecord(params) {
    const body = {
        ID:params.id
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/DeleteSparePartsRecord', body, null);
    return result === null ? {
        data: null
    } : result.requstresult;
}