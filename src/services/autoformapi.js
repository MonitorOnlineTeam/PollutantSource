/* eslint-disable import/prefer-default-export */
/**
 * 功  能：AutoForm基本服务
 * 创建人：吴建伟
 * 创建时间：2019.04.29
 */

import Cookie from 'js-cookie';
import {postNew,getNew} from '../dvapack/request';

/**
 * 【AutoForm】系统登录
 * @params {"UserAccount": "system","UserPwd": "system","RememberMe": true}
 */
export async function systemLogin() {
    const params = {
        UserAccount: "system",
        UserPwd: "system",
    };
    const defaults = {
        RememberMe: true
    };
    const body=Object.assign(defaults,params);
    const result = await postNew('/api/rest/PollutantSourceApi/LoginApi/Login', body);
    if(result.IsSuccess&&result.Datas) {
        Cookie.set('ssoToken',result.Datas.Ticket);
    }else {
        Cookie.set('ssoToken',"");
    }
    return result;
}

/**
 * 【AutoForm】获取页面高级查询表单
 * @params {"configId": "TestCommonPoint"}
 */
export async function getConditions() {
    const params = {
        configId: "TestCommonPoint"
    };
    const defaults = {};
    const body=Object.assign(defaults,params);
    const result = await getNew('/api/rest/PollutantSourceApi/AutoFormDataApi/GetConditions',body);
    // debugger;
    return result;
}

/**
 * 【AutoForm】获取页面高级查询表单
 * @params {"configId": "TestCommonPoint"}
 */
export async function getListPager() {
    const params = {
        configId: "TestCommonPoint"
    };
    const defaults = {
        PageIndex:1,
        PageSize:200
    };
    const body=Object.assign(defaults,params);
    const result = await getNew('/api/rest/PollutantSourceApi/AutoFormDataApi/GetListPager',body, null);
    return result;
}

/**
 * 【AutoForm】获取添加页面表单元素
 * @params {"configId": "TestCommonPoint"}
 */
export async function getAutoFromAddView() {
    const params = {
        configId: "TestCommonPoint"
    };
    const defaults = {};
    const body=Object.assign(defaults,params);
    const result = await getNew('/api/rest/PollutantSourceApi/AutoFormDataApi/GetAutoFromAddView',body, null);
    return result;
}

/**
 * 【AutoForm】获取修改页面表单元素
 * @params {"configId": "TestCommonPoint"}
 */
export async function getAutoFromUpdateView() {
    const params = {
        configId: "TestCommonPoint"
    };
    const defaults = {};
    const body=Object.assign(defaults,params);
    const result = await getNew('/api/rest/PollutantSourceApi/AutoFormDataApi/GetAutoFromUpdateView',body, null);
    return result;
}

/**
 * 【AutoForm】获取编辑或添加页面表单元素的值
 * @params {"configId": "TestCommonPoint"}
 */
export async function getFormData() {
    const params = {
        configId: "TestCommonPoint"
    };
    const defaults = {};
    const body=Object.assign(defaults,params);
    const result = await getNew('/api/rest/PollutantSourceApi/AutoFormDataApi/GetFormData',body, null);
    return result;
}

/**
 * 【AutoForm】数据删除（支持批量）
 * @params {"configId": "TestCommonPoint"}
 */
export async function postAutoFromDataDelete() {
    const params = {
        configId: "TestCommonPoint",
        FormData:JSON.stringify({
            "dbo.T_Bas_CommonPoint.PointCode":"54AC5E32-EBF5-457A-B9C1-9CD019F9EBD8,58F72760-E01E-461F-9EC4-6396DCAFDD9D",
        })
    };
    const defaults = {};
    const body=Object.assign(defaults,params);
    const result = await postNew('/api/rest/PollutantSourceApi/AutoFormDataApi/PostAutoFromDataDelete',body, null);
    return result;
}