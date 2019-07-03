
import { async } from 'q';
import request from '../utils/request';
import {
    post
}
    from '../dvapack/request';
import {pageUrl} from '../utils/common';
// 用户列表
export async function getList(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        User_Account: params.UserAccount,
        DeleteMark: params.DeleteMark,
    };

    const result = post('/api/rest/PollutantSourceApi/PUserInfo/GetAllUserInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 删除用户
export async function deleteuser(params) {
    const body = {
        UserId: params.UserId
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/DeleteUserInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 用户 启用禁用
export async function enableduser(params) {
    const body = {
        UserId: params.UserId,
        Enalbe: params.Enalbe
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/EnableOrDisableUser', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 验证用户是否存在
export async function isexistenceuser(params) {
    const body = {
        User_Account: params.UserAccount,
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/IsExistenceUser', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 增加用户
export async function adduser(params) {
    const body = {
        User_Account: params.UserAccount,
        User_Name: params.UserName,
        User_Sex: params.UserSex,
        Email: params.Email,
        Phone: params.Phone,
        Title: params.Title,
        User_Orderby: params.UserOrderby,
        SendPush: params.SendPush,
        AlarmType: params.AlarmType,
        AlarmTime: params.AlarmTime,
        User_Remark: params.UserRemark,
        DeleteMark: params.DeleteMark,
        Roles_Id: params.RolesId
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/AddUserInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 根据id获取用户实体
export async function getuser(params) {
    const body = {
        UserId: params.UserId
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/GetUserInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取部门树
export async function getdeparttree(params) {
    const result = post('/api/rest/PollutantSourceApi/AuthorApi/GetDepartmentTree', params, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取角色树
export async function getrolestree(params) {
    const result = post('/api/rest/PollutantSourceApi/AuthorApi/GetRolesTree', params, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取当前用户的角色
export async function getrolebyuserid(params) {
    const body={
        User_ID: params.User_ID,
        Role:null,
        Depart:null
    }
    const result = post('/api/rest/PollutantSourceApi/AuthorApi/GetRoleByUserID', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取当前用户的部门
export async function getdepbyuserid(params) {
    const body={
        User_ID: params.User_ID,
        Role:null,
        Depart:null
    }
    const result = post('/api/rest/PollutantSourceApi/AuthorApi/GetDepByUserID', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 添加用户的角色和部门
export async function insertroledep(params) {
    console.log(params);
    const body = {
        User_ID: params.User_ID,
        Role:params.Roles_ID,
        Depart:params.UserGroup_ID
    };
    const result = post('/api/rest/PollutantSourceApi/AuthorApi/InsertRoleDepForUser', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 重置密码
export async function resetpwd(params) {
    const body = {
        User_ID: params.User_ID,
    };
    const result = post('/api/rest/PollutantSourceApi/AuthorApi/ResetPwd', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 编辑用户
export async function edituser(params) {
    const body = {
        User_ID: params.UserId,
        User_Account: params.UserAccount,
        User_Name: params.UserName,
        User_Sex: params.UserSex,
        Email: params.Email,
        Phone: params.Phone,
        Title: params.Title,
        User_Orderby: params.UserOrderby,
        SendPush: params.SendPush,
        AlarmType: params.AlarmType,
        AlarmTime: params.AlarmTime,
        User_Remark: params.UserRemark,
        DeleteMark: params.DeleteMark,
        Roles_Id: params.RolesId
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/EditUserInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 编辑用户
export async function deluserandroledep(params) {
    const body = {
        User_ID: params.User_ID,
    };
    const result = post('/api/rest/PollutantSourceApi/AuthorApi/DelUserAndRoleDep', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取数据过滤排口列表
export async function userDgimnDataFilter(params) {
    const body = {
        UserId: params.UserId,
        TestKey: params.TestKey,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/GetUserDgimnDataFilter', body, null);
    return result === null ? {
        data: null
    } : result;
}
//  个人设置编辑用户
export async function editpersonaluser(params) {
    const body = {
        User_ID: params.UserId,
        User_Name: params.UserName,
        User_Sex: params.UserSex,
        Email: params.Email,
        Phone: params.Phone,
        SendPush: params.SendPush,
        AlarmType: params.AlarmType,
        AlarmTime: params.AlarmTime,
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/EditUser', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取我的派单
export async function getmypielist(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        beginTime: params.beginTime,
        endTime: params.endTime
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/GetMyPieList', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取我的通知
export async function mymessagelist(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        beginTime: params.beginTime,
        endTime: params.endTime
    };
    if(params.isView !== undefined)
        //保存是否已读
        body.isAsc=params.isView;
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/GetMyMessageList', body, null);
    return result === null ? {
        data: null
    } : result;
}
/**
 * 【用户管理】设置用户企业权限（支持批量用户同时赋权限）
 * @params [
 * {"UserId":"766f911d-5e41-4bbf-b705-add427a16e77",
 * "EnterpriseIds":["51216eae-8f11-4578-ad63-5127f78f6cca","3cbfa1f4-3e0a-473b-aab0-5a9a168010ee"]
 * },
 * {"UserId":"eb85dbe8-49fd-4918-9ba1-34f7c337bd44",
 * "EnterpriseIds":["51216eae-8f11-4578-ad63-5127f78f6cca","3cbfa1f4-3e0a-473b-aab0-5a9a168010ee"]
 * },
 */
export async function setEnterpriseDataRole(params){
    const result = post(pageUrl.UserManager.setEnterpriseDataRole, params, null);
    return result === null ? {
        data: null
    } : result;
}

/**
 * 【用户管理】获取已授权的企业
 * @params {"UserId":"766f911d-5e41-4bbf-b705-add427a16e77"}
 */
export async function getEnterpriseDataRoles(params){
    const result = post(pageUrl.UserManager.getEnterpriseDataRoles, params, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取二维码ip
export async function getip() {
    const body = {
        pageIndex: 1,
        pageSize: 1,
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/GetMyPieList', body, null);
    return result === null ? {
        data: null
    } : result;
}