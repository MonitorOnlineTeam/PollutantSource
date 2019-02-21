/**
 * 功  能：企业管理【微信小程序】
 * 创建人：吴建伟
 * 创建时间：2019.02.20
 */
import {post} from '../dvapack/request';
import {pageUrl} from '../utils/common';

/**
 * 【企业管理】企业列表
 * @params {"pageIndex": 1,"pageSize": 10,"EnterpriseName": "北京雪迪龙"}
 */
export async function getEnterprisePageList(params) {
    const result = post(pageUrl.EnterpriseManager.getEnterprisePageList, params, null);
    return result === null ? {
        data: null
    } : result;
}

/**
 * 【企业管理】企业详情
 * @params {"EntCode": "51216eae-8f11-4578-ad63-5127f78f6cca"}
 */
export async function getEnterprise(params) {
    const result = post(pageUrl.EnterpriseManager.getEnterprise, params, null);
    return result === null ? {
        data: null
    } : result;
}

/**
 * 【企业管理】添加企业
 * @params {
 * "EntName": "企业名称",
 * "AttentionCode": 关注度【省、市、国、非重点污染源】,
 * "RegionCode": "行政区",
 * "EntAddress": "地址",
 * "Longitude": "经度",
 * "Latitude": "维度",
 * "CorporationCode": "法人编码",
 * "CorporationName": "法人名称",
 * "EnvironmentPrincipal": "环保负责人",
 * "OfficePhone": "办公电话"
 * }
 */
export async function addEnterprise(params) {
    const result = post(pageUrl.EnterpriseManager.addEnterprise, params, null);
    return result === null ? {
        data: null
    } : result;
}

/**
 * 【企业管理】编辑企业
 * @params {
 * "EntCode": "企业编码",
 * "EntName": "企业名称",
 * "AttentionCode": 关注度【省、市、国、非重点污染源】,
 * "RegionCode": "行政区",
 * "EntAddress": "地址",
 * "Longitude": "经度",
 * "Latitude": "维度",
 * "CorporationCode": "法人编码",
 * "CorporationName": "法人名称",
 * "EnvironmentPrincipal": "环保负责人",
 * "OfficePhone": "办公电话"
 * }
 */
export async function editEnterprise(params) {
    const result = post(pageUrl.EnterpriseManager.editEnterprise, params, null);
    return result === null ? {
        data: null
    } : result;
}
/**
 * 【企业管理】删除单个企业
 * @params {
 * "EntCode": "企业编码"
 * }
 */
export async function deleteEnterprise(params) {
    const result = post(pageUrl.EnterpriseManager.deleteEnterprise, params, null);
    return result === null ? {
        data: null
    } : result;
}