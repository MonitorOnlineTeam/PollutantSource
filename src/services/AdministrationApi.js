/**
 * 功  能：能：运维消耗品管理
 * 创建人：张洪宾
 * 创建时间：2018.12.27
 */

import { post, upload } from '../dvapack/request';

/**
 *  获取备品备件列表信息
 */
export async function GetSparePartList(params) {
    const body = {
        PartType: params.parttype == "0" ? null : params.parttype,
        Code: params.code,
        PartName: params.partName,
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
        ID: params.id
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
        PartType: params.parttype,
        IsUsed: 1,
        Code: params.code,
        PartName: params.partName,
        ID: params.id
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
        ID: params.id
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
        GasName: params.gasName,
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
        ID: params.id
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
        IsUsed: 1,
        Manufacturer: params.manufacturer,
        StandardGasName: params.gasName,
        ID: params.id
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
        ID: params.id
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
        TestItemName: params.testItemName,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        Code: params.code,
        TestMethod: params.testMethod,
        Manufacturer: params.manufacturer
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
        ID: params.id
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
        IsUsed: 1,
        TestItemName: params.testItemName,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        Code: params.code,
        TestMethod: params.testMethod,
        Manufacturer: params.manufacturer,
        ID: params.id
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
        ID: params.id
    };
    const result = post('/api/rest/PollutantSourceApi/PTaskForm/DelCbFfTestEquipment', body, null);
    return result === null ? {
        data: null
    } : result;
}

/**
 *  知识库管理显示页面
 */
export async function GetKBMList(params) {
    const body = {
        Name: params.Name,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize
    };
    const result = post('/api/rest/PollutantSourceApi/KBM/GetKBMListbyTime', body, null);
    return result === null ? {
        data: null
    } : result;
}

/**
 *  知识库类别
 */
export async function GetKBMType(params) {
    const body = {
    };
    const result = post('/api/rest/PollutantSourceApi/KBM/GetKBMType', body, null);
    return result === null ? {
        data: null
    } : result;
}

/**
 *  文件类别
 */
export async function GetFileType(params) {
    const body = {
    };
    const result = post('/api/rest/PollutantSourceApi/KBM/GetFileType', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 上传附件
export async function uploadfiles(params) {
    const body = {
        file: params.file,
        fileName: params.fileName,
    };
    const result = upload('/api/rest/PollutantSourceApi/KBM/UploadFilse', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 添加知识库
export async function AddKBM(params) {
    const body = {
        Name: params.Name,
        RepositoryType: params.RepositoryType,
        DirectoryType: params.DirectoryType,
        Attachment: params.Attachment,
    };
    const result = upload('/api/rest/PollutantSourceApi/KBM/AddKBM', body, null);
    return result === null ? {
        data: null
    } : result;
}

// 删除知识库
export async function DeleteKBM(params) {
    const body = {
        ID: params.ID
    };
    const result = upload('/api/rest/PollutantSourceApi/KBM/DeleteKBM', body, null);
    return result === null ? {
        data: null
    } : result;
}

//根据编号获取知识库详情信息
export async function GetKBMDetailByID(params) {
    const body = {
        ID: params.ID
    };
    const result = upload('/api/rest/PollutantSourceApi/KBM/GetKBMDetailByID', body, null);
    return result === null ? {
        data: null
    } : result;
}

//删除附件
export async function DeleteFilse(params) {
    const body = {
        GUID: params.GUID
    };
    const result = upload('/api/rest/PollutantSourceApi/PUploadImage/DeleteFilse', body, null);
    return result === null ? {
        data: null
    } : result;
}

//修改附件
export async function EditKBM(params) {
    const body = {
        ID:params.ID,
        Name: params.Name,
        RepositoryType: params.RepositoryType,
        DirectoryType: params.DirectoryType,
        Files: params.Files,
    };
    const result = upload('/api/rest/PollutantSourceApi/KBM/EditKBM', body, null);
    return result === null ? {
        data: null
    } : result;
}

//判断附件是否存在
export async function IfExists(params) {
    const body = {
        uid: params.uid
    };
    const result = upload('/api/rest/PollutantSourceApi/KBM/IfExists', body, null);
    return result === null ? {
        data: null
    } : result;
}