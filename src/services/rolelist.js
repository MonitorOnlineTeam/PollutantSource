
import { async } from 'q';
import request from '../utils/request';
import {
    post
}
    from '../dvapack/request';
import {pageUrl} from '../utils/common';

// 获取角色详细信息及层级关系
export async function getroleinfobytree(params) {
    const result = post('/api/rest/PollutantSourceApi/AuthorApi/GetRoleInfoByTree', params, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取单个角色信息
export async function getroleinfobyid(params) {
    const body = {
        Roles_ID: params.Roles_ID
    };
    const result = post('/api/rest/PollutantSourceApi/AuthorApi/GetRoleInfoByID', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 新增角色信息
export async function insertroleinfo(params) {
    const body = {
        Roles_ID: params.Roles_ID,
        ParentId: params.ParentId,
        Roles_Name: params.Roles_Name,
        Roles_Remark: params.Roles_Remark,
    };
    const result = post('/api/rest/PollutantSourceApi/AuthorApi/InsertRoleInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 删除角色信息
export async function delroleinfo(params) {
    const body = {
        Roles_ID: params.Roles_ID,
    };
    const result = post('/api/rest/PollutantSourceApi/AuthorApi/DelRoleInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 修改角色信息
export async function updroleinfo(params) {
    const body = {
        Roles_ID: params.Roles_ID,
        ParentId: params.ParentId,
        Roles_Name: params.Roles_Name,
        Roles_Remark: params.Roles_Remark,
    };
    const result = post('/api/rest/PollutantSourceApi/AuthorApi/UpdRoleInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}