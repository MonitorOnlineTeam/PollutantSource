import request from '../utils/request';
import {
    post
}
    from '../dvapack/request';
// 排口列表
export async function getpointlist(params) {
    const body = {
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        DGIMNs: params.DGIMNs
    };
    const result = post('/api/rest/PollutantSourceApi/PPointAndData/GetPointList', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 添加排口
export async function addpoint(params) {
    const body = {
        DGIMN: params.DGIMN,
        PointName: params.PointName,
        PointType: params.PointType,
        PollutantType: params.PollutantType,
        IsSj: params.IsSj,
        Coordinate: params.Coordinate,
        OutPutWhitherCode: params.OutPutWhitherCode,
        Linkman: params.Linkman,
        MobilePhone: params.MobilePhone,
        GasOutputTypeCode: params.GasOutputTypeCode,
        OutputDiameter: params.OutputDiameter,
        OutputHigh: params.OutputHigh,
        Sort: params.Sort,
        Address: params.Address,
        OutputType: params.OutputType,
        OperationerId: params.OperationerId
    };

    const result = post('/api/rest/PollutantSourceApi/PPointAndData/AddPoint', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取运维人
export async function getoperationsuserList(params) {
    const body = {
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/GetOperationsUserList', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取单个排口
export async function getpoint(params) {
    const body = {
        DGIMNs: params.DGIMN
    };
    const result = post('/api/rest/PollutantSourceApi/PPointAndData/GetPoint', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 编辑单个排口
export async function editpoint(params) {
    const body = {
        DGIMN: params.DGIMN,
        PointName: params.PointName,
        PointType: params.PointType,
        PollutantType: params.PollutantType,
        IsSj: params.IsSj,
        Coordinate: params.Coordinate,
        OutPutWhitherCode: params.OutPutWhitherCode,
        Linkman: params.Linkman,
        MobilePhone: params.MobilePhone,
        GasOutputTypeCode: params.GasOutputTypeCode,
        OutputDiameter: params.OutputDiameter,
        OutputHigh: params.OutputHigh,
        Sort: params.Sort,
        Address: params.Address,
        OutputType: params.OutputType,
        OperationerId: params.OperationerId
    };
    const result = post('/api/rest/PollutantSourceApi/PPointAndData/EditPoint', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 删除排口
export async function deletepoint(params) {
    const body = {
        DGIMNs: params.DGIMN.join(',')
    };
    const result = post('/api/rest/PollutantSourceApi/PPointAndData/DeletePoint', body, null);
    return result === null ? {
        data: null
    } : result;
}
