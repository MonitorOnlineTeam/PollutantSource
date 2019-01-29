
import request from '../utils/request';
import {
    post
}
    from '../dvapack/request';
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
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/GetMyMessageList', body, null);
    return result === null ? {
        data: null
    } : result;
}