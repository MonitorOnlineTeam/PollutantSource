import { post,authorpost } from '../dvapack/request';
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
