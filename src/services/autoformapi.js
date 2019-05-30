/* eslint-disable import/prefer-default-export */
/**
 * 功  能：AutoForm基本服务
 * 创建人：吴建伟
 * 创建时间：2019.04.29
 */

import Cookie from 'js-cookie';
import {postNew,getNew} from '../dvapack/request';
import { async } from 'q';

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
 * 【AutoForm】获取页面配置信息
 * @params {"configId": "TestCommonPoint"}
 */
export async function getPageConfigInfo(params) {
    let param ={
        configId: "TestCommonPoint",
        ...params
    };
    const defaults = {
        PageIndex:1,
        PageSize:200
    };
    const body=Object.assign(defaults,param);
    const result = await getNew('/api/rest/PollutantSourceApi/AutoFormDataApi/GetPageConfigInfo',body, null);
    return result;
}

/**
 * 【AutoForm】获取页面高级查询表单
 * @params {"configId": "TestCommonPoint"}
 */
export async function getListPager(params) {
    const postData = {
        configId: "TestCommonPoint",
        ...params,
        // ConditionWhere: JSON.stringify(params.ConditionWhere),
    };
    // const defaults = {
    //     PageIndex:1,
    //     PageSize:200
    // };
    // const body=Object.assign(param,params);
    // console.log('params=',body)
    const result = await getNew('/api/rest/PollutantSourceApi/AutoFormDataApi/GetListPager',postData, null);
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
export async function getFormData(params) {
    const defaults = {
        configId: "TestCommonPoint"
    };
    const body={
        ...params,
        ...defaults
    };
    const result = await getNew('/api/rest/PollutantSourceApi/AutoFormDataApi/GetFormData',params, null);
    return result;
}

/**
 * 【AutoForm】数据删除（支持批量）
 * @params {"configId": "TestCommonPoint"}
 */
export async function postAutoFromDataDelete(params) {
    const postData = {
        configId: "TestCommonPoint",
        ...params
    };
    // const defaults = {};
    // const body=Object.assign(defaults,params);

    const result = await postNew('/api/rest/PollutantSourceApi/AutoFormDataApi/PostAutoFromDataDelete',postData, null);
    return result;
}
/**
 * 【AutoForm】数据添加
 * @params {"configId": "TestCommonPoint",FormData:'{name:1,code:"123"}'}
 */
export async function postAutoFromDataAdd(params){
    const result = await postNew('/api/rest/PollutantSourceApi/AutoFormDataApi/PostAutoFromDataAdd',params, null);
    return result;
}

/**
 * 【AutoForm】修改
 * @params {"configId": "TestCommonPoint",FormData:'{name:1,code:"123"}'}
 */
export async function postAutoFromDataUpdate(params){
    const result = await postNew('/api/rest/PollutantSourceApi/AutoFormDataApi/PostAutoFromDataUpdate',params, null);
    return result;
}