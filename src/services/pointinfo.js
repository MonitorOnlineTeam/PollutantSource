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
        DGIMNs: params.DGIMN
    };
    const result = post('/api/rest/PollutantSourceApi/PPointAndData/DeletePoint', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取排口分析仪
export async function getanalyzersys(params) {
  const body = {
    DGIMN: params.DGIMN
  };
  const result = post('/api/rest/PollutantSourceApi/Analyzer/GetAnalyzerSysMN', body, null);
  return result === null ? {
    data: null
  } : result;
}
// 添加分析仪
export async function addalyzersys(params) {
  const body = {
    DGIMN: params.DGIMN,
    Manufacturer: params.Manufacturer,
    ManufacturerCode: params.ManufacturerCode,
    Type: params.Type,
  };
  const result = post('/api/rest/PollutantSourceApi/Analyzer/AddAnalyzerSysMN', body, null);
  return result === null ? {
    data: null
  } : result;
}
// 获取分析仪实体
export async function getanalyzersysmnmodel(params) {
  const body = {
    ID: params.ID,
  };
  const result = post('/api/rest/PollutantSourceApi/Analyzer/GetAnalyzerSysMNModel', body, null);
  return result === null ? {
    data: null
  } : result;
}
// 编辑分析仪实体
export async function editalyzersys(params) {
  const body = {
    ID: params.ID,
    Manufacturer: params.Manufacturer,
    ManufacturerCode: params.ManufacturerCode,
  };
  const result = post('/api/rest/PollutantSourceApi/Analyzer/EditAnalyzerSysMN', body, null);
  return result === null ? {
    data: null
  } : result;
}
// 删除分析仪
export async function deletealyzersys(params) {
  const body = {
    ID: params.ID,
  };
  const result = post('/api/rest/PollutantSourceApi/Analyzer/DeleteAnalyzerSysMN', body, null);
  return result === null ? {
    data: null
  } : result;
}
// 获取测试项目
export async function getcomponent(params) {
  const body = {
  };
  const result = post('/api/rest/PollutantSourceApi/Analyzer/GetComponent', body, null);
  return result === null ? {
    data: null
  } : result;
}
// 添加设备分析仪
export async function addalyzerchild(params) {
  const body = {
        DGIMN: params.DGIMN,
        Name: params.Name,
        DeviceModel: params.DeviceModel,
        Manufacturer: params.Manufacturer,
        ManufacturerAbbreviation: params.ManufacturerAbbreviation,
        TestComponent: params.TestComponent,
        AnalyzerPrinciple: params.AnalyzerPrinciple,
        AnalyzerRangeMin: params.AnalyzerRangeMin,
        MeasurementUnit: params.MeasurementUnit,
        Slope: params.Slope,
        Intercept: params.Intercept,
        AnalyzerSys_Id: params.AnalyzerSys_Id,
        AnalyzerRangeMax: params.AnalyzerRangeMax,
  };
  const result = post('/api/rest/PollutantSourceApi/Analyzer/AddAlyzerChild', body, null);
  return result === null ? {
    data: null
  } : result;
}
// 获取设备下的子集
export async function getanalyzerchild(params) {
  const body = {
      ID:params.ID,
  };
  const result = post('/api/rest/PollutantSourceApi/Analyzer/GetAnalyzer', body, null);
  return result === null ? {
    data: null
  } : result;
}
// 获取分析仪实体
export async function getanalyzerchildmodel(params) {
  const body = {
    ID: params.ID,
  };
  const result = post('/api/rest/PollutantSourceApi/Analyzer/GetAnalyzerChildModel', body, null);
  return result === null ? {
    data: null
  } : result;
}
// 删除分析仪
export async function deletealyzerchild(params) {
  const body = {
    ID: params.ID,
  };
  const result = post('/api/rest/PollutantSourceApi/Analyzer/DeleteAnalyzerChild', body, null);
  return result === null ? {
    data: null
  } : result;
}
// 编辑分析仪
export async function editalyzerchild(params) {
  const body = {
    ID:params.ID,
    Name: params.Name,
    DeviceModel: params.DeviceModel,
    Manufacturer: params.Manufacturer,
    ManufacturerAbbreviation: params.ManufacturerAbbreviation,
    TestComponent: params.TestComponent,
    AnalyzerPrinciple: params.AnalyzerPrinciple,
    AnalyzerRangeMin: params.AnalyzerRangeMin,
    MeasurementUnit: params.MeasurementUnit,
    Slope: params.Slope,
    Intercept: params.Intercept,
    AnalyzerRangeMax: params.AnalyzerRangeMax,
  };
  const result = post('/api/rest/PollutantSourceApi/Analyzer/EditAlyzerChild', body, null);
  return result === null ? {
    data: null
  } : result;
}