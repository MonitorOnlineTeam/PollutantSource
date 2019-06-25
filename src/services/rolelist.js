
import { async } from 'q';
import request from '../utils/request';
import {pageUrl} from '../utils/common';
import { postNew, getNew } from '../dvapack/request';

// 获取角色详细信息及层级关系
export async function getroleinfobytree(params) {
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/GetRoleInfoByTree', params);
    return result === null ? {
        data: null
    } : result;
}
// 获取单个角色信息
export async function getroleinfobyid(params) {
    const body = {
        Roles_ID: params.Roles_ID
    };
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/GetRoleInfoByID', body);
    return result === null ? {
        data: null
    } : result;
}
// 新增角色信息
export async function insertroleinfo(params) {
    const body = {
        ParentId: params.ParentId,
        Roles_Name: params.Roles_Name,
        Roles_Remark: params.Roles_Remark,
    };
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/InsertRoleInfo', body);
    return result === null ? {
        data: null
    } : result;
}
// 删除角色信息
export async function delroleinfo(params) {
    const body = {
        Roles_ID: params.Roles_ID,
    };
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/DelRoleInfo', body);
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
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/UpdRoleInfo', body);
    return result === null ? {
        data: null
    } : result;
}
// 获取角色树(带根节点)
export async function getrolestreeandobj(params) {
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/GetRolesTreeAndObj', params, null);
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
// 获取当前角色的用户
export async function getuserbyroleid(params) {
    const body={
        Roles_ID:params.Roles_ID
    }
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/GetUserByRoleId', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 给角色添加用户（可批量）
export async function insertrolebyuser(params) {
    const body={
        Roles_ID:params.Roles_ID,
        User_ID:params.User_ID
    }
    const result = postNew('/api/rest/PollutantSourceApi/AuthorApi/InsertRoleByUser', body, null);
    return result === null ? {
        data: null
    } : result;
}
