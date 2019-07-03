
import { async } from 'q';
import request from '../utils/request';
import {pageUrl} from '../utils/common';
import { postNew, getNew } from '../dvapack/request';

// 获取部门详细信息及层级关系
export async function getdepartinfobytree(params) {
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/GetDepInfoByTree', params);
    return result === null ? {
        data: null
    } : result;
}
// 获取单个部门信息
export async function getdepartinfobyid(params) {
    const body = {
        UserGroup_ID: params.UserGroup_ID
    };
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/GetDepartInfoByID', body);
    return result === null ? {
        data: null
    } : result;
}
// 新增部门信息
export async function insertdepartinfo(params) {
    const body = {
        ParentId: params.ParentId,
        UserGroup_Name: params.UserGroup_Name,
        UserGroup_Remark: params.UserGroup_Remark,
    };
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/InsertDepartInfo', body);
    return result === null ? {
        data: null
    } : result;
}
// 删除部门信息
export async function deldepartinfo(params) {
    const body = {
        UserGroup_ID: params.UserGroup_ID,
    };
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/DelDepartInfo', body);
    return result === null ? {
        data: null
    } : result;
}
// 修改部门信息
export async function upddepartinfo(params) {
    const body = {
        UserGroup_ID: params.UserGroup_ID,
        ParentId: params.ParentId,
        UserGroup_Name: params.UserGroup_Name,
        UserGroup_Remark: params.UserGroup_Remark,
    };
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/UpdDepartInfo', body);
    return result === null ? {
        data: null
    } : result;
}
// 获取部门树(带根节点)
export async function getdeparttreeandobj(params) {
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/GetDepartTreeAndObj', params, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取所有用户
export async function getalluser(params) {
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/GetAllUser', params, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取当前部门的用户
export async function getuserbydepid(params) {
    const body={
        UserGroup_ID:params.UserGroup_ID
    }
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/GetUserByDepID', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 给部门添加用户（可批量）
export async function insertdepartbyuser(params) {
    const body={
        UserGroup_ID:params.UserGroup_ID,
        User_ID:params.User_ID
    }
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/InsertDepartByUser', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 给部门添加行政区（可批量）
export async function insertregionbyuser(params) {
    const body={
        UserGroup_ID:params.UserGroup_ID,
        RegionCode:params.RegionCode
    }
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/InsertRegionByUser', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取当前部门的行政区
export async function getregionbydepid(params) {
    const body={
        UserGroup_ID:params.UserGroup_ID
    }
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/GetRegionByDepID', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取行政区详细信息及层级关系
export async function getregioninfobytree(params) {
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/GetRegionInfoByTree', params);
    return result === null ? {
        data: null
    } : result;
}
// 获取企业+排口
export async function getentandpoint(params) {
    const body={
        PollutantType:params.PollutantType,
        RegionCode:params.RegionCode
    }
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/GetEntAndPoint', body);
    return result === null ? {
        data: null
    } : result;
}
// 获取当前部门的排口
export async function getpointbydepid(params) {
    const body={
        UserGroup_ID:params.UserGroup_ID
    }
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/GetPointByDepID', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 给当前部门添加排口权限(可批量)
export async function insertpointfilterbydepid(params) {
    const body={
        UserGroup_ID:params.UserGroup_ID,
        DGIMN:params.DGIMN,
        Type:params.Type
    }
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/InsertPointFilterByDepID', body, null);
    return result === null ? {
        data: null
    } : result;
}