import moment from 'moment';
import { post, get } from '../dvapack/request';

/**获取企业信息
 *  {
        parentIDs:'51216eae-8f11-4578-ad63-5127f78f6cca',
    }
 */
export async function querypolluntantentinfolist(params) {
   
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/GetTargetList', params, null);
    return result === null ? { data: null } : result.data;
}

/**
 * 行政区
 * 
 *  */ 
export async function queryregionlist(params) {
    const body = {
        parentCode: 0,
        recursionNum: params.recursionNum
    };
    const result = await post('/api/rest/PollutantSourceApi/PRegion/GetRegions', body, null);
    return result === null ? { data: null } : result.data;
}

/**行业
 * 
 */
export async function queryindustrytypelist() {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/IndustryTypeList', body, null);
    return result === null ? { data: null } : result.data;
}

/**关注程度
 * 
 *  */ 
export async function queryattentiondegreelist() {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/AttentionDegreeList', body, null);
    return result === null ? { data: null } : result.data;
}

/**单位类型
 * 
 */
export async function queryunittypelist() {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/UnitTypeList', body, null);
    return result === null ? { data: null } : result.data;
}

/**污染规模
 *  */ 
export async function queryPSScalelist() {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/PSScaleList', body, null);
    return result === null ? { data: null } : result.data;
}

/**注册类型码表
 *  */ 
export async function queryregisttypelist() {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/RegistTypeList', body, null);
    return result === null ? { data: null } : result.data;
}

/**隶属关系码表
 *  */ 
export async function querysubjectionrelationlist() {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/SubjectionRelationList', body, null);
    return result === null ? { data: null } : result.data;
}

/**编辑企业信息 
 * */ 
export async function queryentedit(params) {
    const body = {
        name: params.entallname,
        code: params.parentID,
        longitude: params.latlon && params.latlon.split ? params.latlon.split(',')[0] : '',
        latitude: params.latlon && params.latlon.split ? params.latlon.split(',')[1] : '',
        pSScaleCode: params.pollutionsources,
        abbreviation: params.enteasyname,
        address: params.address,
        attentionCode: params.concern,
        corporationCode: params.personnum,
        corporationName: params.personname,
        environmentPrincipal: params.chargeman,
        industryTypeCode: params.industry,
        officePhone: params.phone,
        regionCode: params.area,
        registTypeCode: params.registration,
        subjectionRelationCode: params.subjection,
        unitTypeCode: params.unit,
        polygon: params.polygon
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/EditEnt', body, null);
    return result === null ? { data: null } : result.requstresult;
}

/** 上传图片
 * */ 
export async function queryupload(params) {
    const body = {
        fileName: params.fileName,
        fileType: params.fileType,
        img: params.img,
        attachID: params.attachId,
        IsUploadSuccess: params.IsUploadSuccess,
        IsPc: params.IsPc,
        uuid: params.uuid,
    };

    const result = await post('/api/rest/PollutantSourceApi/PUploadImage/UploadImage', body, null);
    return result === null ? { data: null } : result.requstresult;
}

/** 删除图片*/
export async function querydeleteimg(params) {
    const body = {
        attachID: params.attachId,
    };
    const result = await post('/api/rest/PollutantSourceApi/PUploadImage/DeleteImage', body, null);
    return result === null ? { data: null } : result.requstresult;
}