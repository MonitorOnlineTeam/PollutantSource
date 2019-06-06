import request from '../utils/request';
import { pageUrl } from '../utils/common';
import { post, authorpost } from '../dvapack/request';

export async function query() {
    return request('/api/users');
}

export async function queryCurrent() {
    return request('/api/currentUser');
}

export async function changepwd(params) {
    const body = {
        UserPwdOld: params.oldpassword,
        UserPwdNew: params.password,
        UserPwdTwo: params.confirm,
    };
    const result = post('/api/rest/PollutantSourceApi/PAuthor/ResetPwd', body, null);
    return result === null ? { data: null } : result;
}
/**
 * 用户账户登录
 */
export async function fakeAccountLogin(params) {
    // ;
    const body = {
        User_Account: params.userName,
        USer_Pwd: params.password,
        UserPhone: params.mobile,
        MsgId: params.MsgId,
        Code: params.captcha
    };
    const result = await post(params.type === 'mobile' ? pageUrl.PhoneLogin : pageUrl.Login, body, null, 'notooken');

    // ;
    // let userArray = Array.from(users).filter(t => t.User_Account === params.User_Account && t.User_Pwd === params.User_Pwd);
    // let result = {'requstresult': '0', 'reason': '验证失败', 'operation': 'Post', 'data': {}, 'total': 0};
    // // = await post('/api/rest/AtmosphereApi/Author/IsLogins/', body, null, 'notooken');
    // if (userArray.length > 0) {
    //     result = {'requstresult': '1', 'reason': '验证成功', 'operation': 'Post', 'data': {...userArray[0]}, 'total': 1};
    // }
    return result === null ? { data: null } : result;
}

/**
 * 发送验证码
 */
export async function sendCaptcha(params) {
    const body = {
        UserPhone: params.mobile
    };
    const result = await post(pageUrl.SendCaptcha, body, null, 'notooken');
    // ;
    return result === null ? { data: null } : result;
}

/**
 * 获取权限菜单
 */
export async function getMenuData(params) {
    // ;
    const body = {
        menu_id: params.menuId || '06cd7c3a-2d2e-4625-94db-35d95647153d',
        user_id: params.userId || 'eb85dbe8-49fd-4918-9ba1-34f7c337bd44'
    };
    const result = await post(pageUrl.Menu, body, null, body.user_id);
    // ;
    return result === null ? { data: null } : result;
}
// 获取二维码ip
export async function getip() {
    const body = {
    };
    const result = authorpost('/api/rest/PollutantSourceApi/PUserLogin/GetNetIPAndPort?authorCode=48f3889c-af8d-401f-ada2-c383031af92d', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取登陆配置信息
export async function getLoginInfo() {
    const body = {
    };
    const result = authorpost('/api/rest/PollutantSourceApi/SystemSettingApi/getLoginInfo?authorCode=48f3889c-af8d-401f-ada2-c383031af92d', body, null);
    return result === null ? {
        data: null
    } : result;
}

// 获取所有污染物类型
export async function getPollutantTypes() {
    const body = {
    };
    const result = authorpost('/api/rest/PollutantSourceApi/SystemSettingApi/GetAllPollutantTypes?authorCode=48f3889c-af8d-401f-ada2-c383031af92d', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 修改登陆配置信息
export async function editLoginInfo(params) {
    const body = {
        favicon: params.favicon,
        LoginLogo: params.LoginLogo,
        LoginMainTitle: params.LoginMainTitle,
        LoginSubtitle: params.LoginSubtitle,
        LoginFooterMessages: params.LoginFooterMessages,
        PollutantTypes: params.PollutantTypes
    };
    const result = authorpost('/api/rest/PollutantSourceApi/SystemSettingApi/editLoginInfo?authorCode=48f3889c-af8d-401f-ada2-c383031af92d', body, null);
    return result === null ? {
        data: null
    } : result;
}

