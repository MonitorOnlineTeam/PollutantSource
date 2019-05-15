import { post,authorpost } from '../dvapack/request';

// // 行政区划
// export async function GetXuRegions(params) {
//     const body = {
//         RegionCode: params.RegionCode
//     };

//     const result =await post('/api/rest/PollutantSourceApi/PRegion/GetXuRegions', body, null);
//     return result === null ? { data: null } : result;
// }
// 行政区划
export async function GetRegions(params) {
    const body = {
        parentCode: params.RegionCode
    };

    const result = await post('/api/rest/PollutantSourceApi/PRegion/GetRegion', body, null);
    return result === null ? {
        data: null
    } : result;
}
// // 部门信息
// export async function GetDepartmentTree(params) {
//     const body = {
//     };
//     const result =await post('/api/rest/PollutantSourceApi/PRegion/GetDepartmentTree', body, null);
//     return result === null ? { data: null } : result;
// }

// // 获取企业列表
// export async function GetEntRegion(params) {
//     const body = {
//     };
//     const result =await post('/api/rest/PollutantSourceApi/PRegion/GetEntRegion', body, null);
//     return result === null ? { data: null } : result;
// }