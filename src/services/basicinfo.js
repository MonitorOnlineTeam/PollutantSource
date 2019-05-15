import {
    async
} from 'q';
import request from '../utils/request';
import {
    post
}
    from '../dvapack/request';
import {
    pageUrl
} from '../utils/common';

/**
 * 基本管理-企业管理列表
 * @params {"pageIndex": 1,"pageSize": 10,"RegionCode": ["01","02","03"],"EntName":"雪迪龙"}
 */
export async function GetEnterpriseManageList(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        code: params.RegionCode,
        name:params.EntName,
    };
    const result = post('/api/rest/PollutantSourceApi/PEnt/GetEntList', body, null);
    return result === null ? {
        data: null
    } : result;
}
/**
 * 基本管理-删除项目
 * @params {"ID": 1}
 */
export async function deleteEnterprise(params) {
    const body = {
        parentIDs: params.ID,
    };
    debugger
    const result = post('/api/rest/PollutantSourceApi/PPointAndData/DelEnterprise', body, null);
    return result === null ? {
        data: null
    } : result;
}
/**
 * 基本管理-企业实体
 * @params {
   "EntCode": 1
 }
 */
export async function GetEnterpriseModel(params) {
    const body = {
        parentIDs: params.EntCode,
    };
    const result = post('/api/rest/PollutantSourceApi/PPointAndData/GetEnterpriseModel', body, null);
    return result === null ? {
        data: null
    } : result;
}
/**
 * 基本管理-添加企业
 * @params {企业实体
 }
 */
export async function AddEnterpriseManage(params) {
    const body = {
        EntName: params.EntName,
        CorporationCode: params.CorporationCode,
        CorporationName: params.CorporationName,
        RegionCode:params.RegionCode,
        EntAddress: params.EntAddress,
        AttentionCode: params.AttentionCode,
        RegistTypeCode: params.RegistTypeCode,
        UnitTypeCode: params.UnitTypeCode,
        PSScaleCode: params.PSScaleCode,
        SubjectionRelationCode: params.SubjectionRelationCode,
        PSEnvironmentDept:params.PSEnvironmentDept,
        EnvironmentPrincipal: params.EnvironmentPrincipal,
        EnvironmentMans: params.EnvironmentMans,
        RunDate: params.RunDate,
        OfficePhone: params.OfficePhone,
        Fax: params.Fax,
        MobilePhone: params.MobilePhone,
        AreaCode: params.AreaCode,
        PSClassCode: params.PSClassCode,
        Linkman: params.Linkman,
        TotalArea:params.TotalArea,
        Comment: params.Comment,
        Longitude: params.Longitude,
        Latitude: params.Latitude,
        CoordinateSet: params.CoordinateSet,
        Photo:params.Photo,
    };
    const result = post('/api/rest/PollutantSourceApi/PPointAndData/AddEnterprise', body, null);
    return result === null ? {
        data: null
    } : result;
}
/**
 * 基本管理-修改企业
 * @params {企业实体
 }
 */
export async function UpdateEnterpriseManage(params) {
    const body = {
        EntCode: params.EntCode,
        EntName: params.EntName,
        CorporationCode: params.CorporationCode,
        CorporationName: params.CorporationName,
        RegionCode:params.RegionCode,
        EntAddress: params.EntAddress,
        AttentionCode: params.AttentionCode,
        RegistTypeCode: params.RegistTypeCode,
        UnitTypeCode: params.UnitTypeCode,
        PSScaleCode: params.PSScaleCode,
        SubjectionRelationCode: params.SubjectionRelationCode,
        PSEnvironmentDept:params.PSEnvironmentDept,
        EnvironmentPrincipal: params.EnvironmentPrincipal,
        EnvironmentMans: params.EnvironmentMans,
        RunDate: params.RunDate,
        OfficePhone: params.OfficePhone,
        Fax: params.Fax,
        MobilePhone: params.MobilePhone,
        AreaCode: params.AreaCode,
        PSClassCode: params.PSClassCode,
        Linkman: params.Linkman,
        TotalArea:params.TotalArea,
        Comment: params.Comment,
        Longitude: params.Longitude,
        Latitude: params.Latitude,
        CoordinateSet: params.CoordinateSet,
    };
    debugger
    const result = post('/api/rest/PollutantSourceApi/PPointAndData/UpdateEnterprise', body, null);
    return result === null ? {
        data: null
    } : result;
}

