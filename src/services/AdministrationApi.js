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
        PartType:params.parttype=="0"?null:params.parttype,
        Code:params.code,
        PartName:params.partName,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize  
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetSparePartList', body, null);
    return result === null ? {
        data: null
    } : result;
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
        PartType:params.parttype,
        IsUsed:1,
        Code:params.code,
        PartName:params.partName,
        ID:params.id
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/AddOrUpdateSpareParts', body, null);
    return result === null ? {
        data: null
    } : result;
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
    } : result;
}

/// 标气


/**
 *  获取标气列表信息
 */
export async function GetStandardGasList(params) {
    const body = {
        GasName:params.gasName,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize  
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetStandardGasList', body, null);
    return result === null ? {
        data: null
    } : result;
}

/**
 *  获取单个标气信息
 */
export async function GetOneStandardGas(params) {
    const body = {
        ID:params.id
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetOneStandardGas', body, null);
    return result === null ? {
        data: null
    } : result;
}

/**
 *  添加或修改标气信息
 */
export async function AddOrUpdateStandardGas(params) {
    const body = {
        IsUsed:1,
        Manufacturer:params.manufacturer,
        StandardGasName:params.gasName,
        ID:params.id
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/AddOrUpdateStandardGas', body, null);
    return result === null ? {
        data: null
    } : result;
}

/**
 *  删除标气信息
 */
export async function DelStandardGas(params) {
    const body = {
        ID:params.id
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/DelStandardGas', body, null);
    return result === null ? {
        data: null
    } : result;
}



/// 手持设备管理


/**
 *  获取手持设备列表信息
 */
export async function GetCbFfTestEquipmentList(params) {
    const body = {
        TestItemName:params.testItemName,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        Code:params.code,
        TestMethod:params.testMethod,
        Manufacturer:params.manufacturer
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetCbFfTestEquipmentList', body, null);
    return result === null ? {
        data: null
    } : result;
}

/**
 *  获取单个手持设备信息
 */
export async function GetOneCbFfTestEquipment(params) {
    const body = {
        ID:params.id
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/GetOneCbFfTestEquipment', body, null);
    return result === null ? {
        data: null
    } : result;
}

/**
 *  添加或修改手持设备信息
 */
export async function AddOrUpdateCbFfTestEquipment(params) {
    const body = {
        IsUsed:1,
        TestItemName:params.testItemName,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        Code:params.code,
        TestMethod:params.testMethod,
        Manufacturer:params.manufacturer,
        ID:params.id
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/AddOrUpdateCbFfTestEquipment', body, null);
    return result === null ? {
        data: null
    } : result;
}

/**
 *  删除手持设备信息
 */
export async function DelCbFfTestEquipment(params) {
    const body = {
        ID:params.id
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/DelCbFfTestEquipment', body, null);
    return result === null ? {
        data: null
    } : result;
}