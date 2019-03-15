import moment from 'moment';
import { post, get } from '../dvapack/request';

/** 获取单排口超标数据
 * {
        DGIMN: "51052216080301",
        pollutantCode: "zs01",
        beginTime: "2019-3-1",
        endTime: "2019-3-2",
        pageIndex: 1,
        pageSize: 10
    }
 *  */ 
export async function queryoverdatalist(params) {
    // const body = {
    //     DGIMN: params.dgimn,
    //     pollutantCode: params.pollutantCode,
    //     beginTime: params.beginTime.format("YYYY-MM-DD HH:mm:ss"),
    //     endTime: params.endTime.format("YYYY-MM-DD HH:mm:ss"),
    //     pageIndex: params.pageIndex,
    //     pageSize: params.pageSize
    // };
    const result = await post('/api/rest/PollutantSourceApi/OverData/GetOnePointOverDataList', params, null);
    return result === null ? { data: null } : result;
}

/**获得单点数据信息
 * {DGIMNs:"51052216080301"}
 *  */ 
export async function querysinglepointinfo(params) {
   
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/GetPoint', params, null);
    return result === null ? { data: null } : result.data;
}

/** 获取工艺流程图信息
 * 
 *  {
        DGIMN: params.dgimn,
    }
 * */ 
export async function queryrealparam(params) {
    const result = await post('/api/rest/PollutantSourceApi/DataList/GetProcessFlowChartStatus', params, null);
    return result === null ? { data: null } : result.data;
}