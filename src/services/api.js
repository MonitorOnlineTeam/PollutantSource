import moment from 'moment';
import { post, get } from '../dvapack/request';
// import userlist from '../mockdata/User/userinfo.json';

// const users = userlist;
export async function fakeAccountLogin(params) {
    const body = {
        User_Account: params.User_Account,
        USer_Pwd: params.User_Pwd,
    };
    //let userArray = Array.from(users).filter(t => t.User_Account === params.User_Account && t.User_Pwd === params.User_Pwd);
    let result = {'requstresult': '0', 'reason': '验证失败', 'operation': 'Post', 'data': {}, 'total': 0};
    // = await post('/api/rest/AtmosphereApi/Author/IsLogins/', body, null, 'notooken');
    //if (userArray.length > 0) {
    result = {'requstresult': '1', 'reason': '验证成功', 'operation': 'Post', 'data': {...userArray[0]}, 'total': 1};
    //}
    return result === null ? { data: null } : result;
}
export async function loadPollutantType() {
    // const result = await post('/api/rest/AtmosphereApi/Cod/GetPollutantTypesByUserId/', {}, null);
    const result = {'requstresult': '1', 'reason': '验证成功', 'operation': 'Post', 'data': {'PollutantTypeCode': '2', 'PollutantTypeName': '废气'}, 'total': 1};
    return result === null ? { data: null } : result;
}
export async function loadLastdata(params) {
    const body = {
        dgimn: params.dgimn,
    };
    const result = await get('/api/rest/AtmosphereApi/OutputAsPointApi/GetPointNewRealTimeData/', body, null);
    return result === null ? { data: null } : result;
}

export async function maploadMonitorDatalist(params) {
    let result = [];
    for (let i = 0; i < params.mnlist.length; i++) {
        const body = {
            DGIMNs: params.mnlist[i],
            BeginTime: params.BeginTime,
            EndTime: params.EndTime,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize,
            pointType: params.pointType,
        };
        if (params.PollutantCode) {
            body.PollutantCode = params.PollutantCode;
        }
        let url = '';
        if (params.dataType === 'realtime') {
            url = '/api/rest/PollutantSourceApi/PRealTime/GetRealTimeData';
        } else if (params.dataType === 'minute') {
            url = '/api/rest/PollutantSourceApi/PMinute/GetMinuteData';
        } else if (params.dataType === 'hour') {
            url = '/api/rest/PollutantSourceApi/PHour/GetHourData';
        } else if (params.dataType === 'day') {
            url = '/api/rest/PollutantSourceApi/PDay/GetDayData';
        }
        const resultdata = await post(url, body, null);
        result = result.concat(resultdata.data);
    }
    return result;
}

export async function loadMonitorDatalist(params) {
    const body = {
        DGIMNs: params.DGIMN,
        BeginTime: params.BeginTime,
        EndTime: params.EndTime,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        pollutantCodes: params.PollutantCode
    };
    let url = '';
    if (params.dataType === 'realtime') {
        url = '/api/rest/PollutantSourceApi/PRealTime/GetRealTimeData';
    } else if (params.dataType === 'minute') {
        url = '/api/rest/PollutantSourceApi/PMinute/GetMinuteData';
    } else if (params.dataType === 'hour') {
        url = '/api/rest/PollutantSourceApi/PHour/GetHourData';
    } else if (params.dataType === 'day') {
        url = '/api/rest/PollutantSourceApi/PDay/GetDayData';
    }
    const result = await post(url, body, null);
    return result;
}

export async function loadCountryMonitorDatalist(params) {
    const body = {
        MNlist: params.DGIMN,
        BeginTime: params.BeginTime,
        EndTime: params.EndTime,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        pointType: params.pointType,
        New: ''
    };
    if (params.PollutantCode) {
        body.PollutantCode = params.PollutantCode;
    }
    let url = '';
    if (params.dataType === 'hour') {
        url = '/api/rest/Hour/GetHourSinglePollutantData/';
    } else if (params.dataType === 'day') {
        url = '/api/rest/Day/GetDaySinglePollutantData/';
    }

    const result = await get(url, body, null);
    return result;
}

export async function loadMonitoroverView(params) {
    const body = {
        pollutantTypes: params.pollutantType,
        GroupId: '',
        regionCodes: params.regionCode,
        pointName: params.keyWords,
    };
    let url;
    if (params.monitortype === 'realtime') {
        body.dataType = 'RealTimeData';
    } else if (params.monitortype === 'minute') {
        body.dataType = 'MinuteData';
    } else if (params.monitortype === 'hour') {
        body.dataType = 'HourData';
    } else if (params.monitortype === 'day') {
        body.dataType = 'DayData';
    }
    url = '/api/rest/AtmosphereApi/PointAndData/GetPointAllList';
    const result = await post(url, body, null);
    return result;
}
export async function loadPollutant(params) {
    const body = {
        pollutantTypes: params.pollutantType,
    };
    const result = await post('/api/rest/AtmosphereApi/Cod/GetPollutants', body, null);
    return result;
}
export async function loadMonitorPoint(params) {
    const body = {
        pollutantType: params.pollutantType,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
    };
    const result = await get('/api/rest/OutputAsPointApi/GetPointsByPollutantType/', body, null);
    return result;
}
export async function loadPointDetail(params) {
    const body = {
        DGIMNs: params.dgimn,
        dataType: params.monitortype
    };
    const result = await post('/api/rest/AtmosphereApi/PointAndData/GetOnePoint', body, null);
    return result.data;
}
export async function loadCountryPointView(params) {
    let groupstr = '';
    params.GroupID.map(item => {
        groupstr += `${item },`;
    });
    const body = {
        GroupIDs: groupstr,
        pollutantTypes: '23,24,25',
    };
    let url;
    if (params.monitortype === 'minute') {
        body.dataType = 'MinuteData';
        url = '/api/rest/AtmosphereApi/PointAndData/GetPointAllList';
    } else if (params.monitortype === 'hour') {
        body.dataType = 'HourData';
        url = '/api/rest/AtmosphereApi/PointAndData/GetPointAllList';
    } else if (params.monitortype === 'day') {
        body.dataType = 'DayData';
        url = '/api/rest/AtmosphereApi/PointAndData/GetPointAllList';
    } else {
        return null;
    }
    const result = await post(url, body, null);
    return result.data;
}

export async function GetAlarmNotices(params) {
    const body = {
        beginTime: params.beginTime,
        endTime: params.endTime
    };
    const result = await get('/api/rest/PollutantSourceApi/PAlarmData/GetAlarmNotices', body, null);
    return result === null ? { data: null } : result;
}

export async function getAllExceptionInfo(params) {
    const body = {
        dgimn: params.dgimn,
        starttime: params.starttime,
        endtime: params.endtime,
        pageindex: params.pageindex,
        pagesize: params.pagesize,
    };
    const result = await get('/api/rest/AlarmDealInfoApi/GetAllExceptionInfo', body, null);
    return result === null ? { data: null } : result;
}

export async function queryLxSearchInfo(params) {
    const body = {
        keyWords: params.searchName,
        area: ''
    };
    const result = await post('/api/rest/AtmosphereApi/Search/AssociativeWordSearch', body, null);
    return result === null ? { data: null } : result.data;
}

export async function queryfullfulltext(params) {
    const body = {
        keyWords: params.searchName,
        pageIndex: params.pageindex,
        pageSize: params.pagesize
    };
    const result = await post('/api/rest/AtmosphereApi/Search/FullTextSearch', body, null);
    return result === null ? { data: null } : result;
}

export async function querycountrycombox(params) {
    const body = {
        pollutantTypes: '23'
    };
    const result = await post('/api/rest/AtmosphereApi/PointAndData/GetPointList', body, null);
    return result === null ? { data: null } : result;
}
export async function queryentpointlist(params) {
    const body = {
        parentIDs: params.parentID
    };
    const result = await post('/api/rest/AtmosphereApi/PointAndData/GetPointParentList', body, null);
    return result === null ? { data: null } : result;
}
export async function queryentinfolist(params) {
    const body = {
        parentIDs: params.parentID
    };
    const result = await post('/api/rest/AtmosphereApi/PointAndData/GetTargetList', body, null);
    return result === null ? { data: null } : result;
}

export async function querypolluntantentinfolist(params) {
    const body = {
        parentIDs: params.parentID,

    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/GetTargetList', body, null);
    return result === null ? { data: null } : result.data;
}
// 行政区
export async function queryregionlist(params) {
    const body = {
        parentCode: 0,
        recursionNum: params.recursionNum
    };
    const result = await post('/api/rest/PollutantSourceApi/PRegion/GetRegions', body, null);
    return result === null ? { data: null } : result.data;
}
// 行业
export async function queryindustrytypelist() {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/IndustryTypeList', body, null);
    return result === null ? { data: null } : result.data;
}
// 关注程度
export async function queryattentiondegreelist() {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/AttentionDegreeList', body, null);
    return result === null ? { data: null } : result.data;
}
// 单位类型
export async function queryunittypelist() {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/UnitTypeList', body, null);
    return result === null ? { data: null } : result.data;
}
// 污染规模
export async function queryPSScalelist() {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/PSScaleList', body, null);
    return result === null ? { data: null } : result.data;
}
// 注册类型码表
export async function queryregisttypelist() {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/RegistTypeList', body, null);
    return result === null ? { data: null } : result.data;
}
// 隶属关系码表
export async function querysubjectionrelationlist() {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/SubjectionRelationList', body, null);
    return result === null ? { data: null } : result.data;
}
// 编辑企业信息
export async function queryentedit(params) {
    console.log(params.latlon);
    const body = {
        name: params.entallname,
        code: params.parentID,
        longitude: params.latlon && params.latlon.split?params.latlon.split(',')[0]:'',
        latitude: params.latlon && params.latlon.split? params.latlon.split(',')[1]:'',
        // photo:
        pSScaleCode: params.pollutionsources,
        abbreviation: params.enteasyname,
        address: params.address,
        attentionCode: params.concern,
        corporationCode: params.personnum,
        corporationName: params.personname,
        environmentPrincipal: params.chargeman,
        industryTypeCode: params.industry,
        officePhone: params.phone,
        regionCode: params.area,
        registTypeCode: params.registration,
        subjectionRelationCode: params.subjection,
        unitTypeCode: params.unit,
        polygon:params.polygon
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/EditEnt', body, null);
    return result === null ? { data: null } : result.requstresult;
}
// 上传图片
export async function queryupload(params) {
    const body = {
        fileName: params.fileName,
        fileType: params.fileType,
        img: params.img,
        attachID: params.attachId,
        IsUploadSuccess: params.IsUploadSuccess,
        IsPc: params.IsPc,
        uuid: params.uuid,
    };

    const result = await post('/api/rest/PollutantSourceApi/PUploadImage/UploadImage', body, null);
    return result === null ? { data: null } : result.requstresult;
}
// 删除图片
export async function querydeleteimg(params) {
    const body = {
        attachID: params.attachId,
    };
    const result = await post('/api/rest/PollutantSourceApi/PUploadImage/DeleteImage', body, null);
    return result === null ? { data: null } : result.requstresult;
}
// 获取排污许可证
export async function queryeeplist() {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/PEmissionPermits/GetPDPermitList', body, null);
    return result === null ? { data: null } : result;
}
// 添加排污许可证
export async function addPDPermit(params) {
    let Btime = moment(params.Data).format("YYYY-01-01");
    let Etime = moment(params.Data).format("YYYY-12-31");
    const body = {
        epnum: params.EPNum,
        begintime: Btime,
        endtime: Etime,
        epname: params.EPName,
        NOx: params.NOx,
        YC: params.YC,
        SO2: params.SO2,
        file: params.Files,
    };
    const result = post('/api/rest/PollutantSourceApi/PEmissionPermits/AddPDPermit', body, null);
    debugger;
    return result === null ? {
        data: null
    } : result;
}
// 编辑排污许可证
export async function editPDPermit(params) {
    let Btime = moment(params.Data).format("YYYY-01-01");
    let Etime = moment(params.Data).format("YYYY-12-31");
    const body = {
        code: params.code,
        epnum: params.EPNum,
        begintime: Btime,
        endtime: Etime,
        epname: params.EPName,
        NOx: params.NOx,
        YC: params.YC,
        SO2: params.SO2,
        file: params.Files,
    };
    const result = await post('/api/rest/PollutantSourceApi/PEmissionPermits/EidtPDPermit', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 删除排污许可证
export async function querydelep(params) {
    const body = {
        code: params.code
    };
    const result = await post('/api/rest/PollutantSourceApi/PEmissionPermits/DeletePDPermit', body, null);
    return result === null ? { data: null } : result.requstresult;
}
// 获取排污许可证实体
export async function getPDPermitById(params) {
    const body = {
        code: params.code
    };
    const result = post('/api/rest/PollutantSourceApi/PEmissionPermits/GetPDPermitById', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 获取排口下的污染物
export async function querypollutantlist(params) {
    const body = {
        DGIMNs: params.dgimn
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/GetPollutantListByDgimn', body, null);
    return result === null ? { data: null } : result.data;
}
// 获取历史数据
export async function queryhistorydatalist(params) {
    const body = {
        DGIMNs: params.dgimn,
        // pollutantCodes: params.pollutantCode,
        datatype: params.datatype,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize,
        beginTime: params.beginTime,
        endTime: params.endTime
    };
    const result = await post('/api/rest/PollutantSourceApi/DataList/GetAllTypeDataList', body, null);
    return result === null ? { data: null } : result;
}
// 获取单排口超标数据
export async function queryoverdatalist(params) {
    console.log(params);
    const body = {
        DGIMN: params.dgimn,
        pollutantCode: params.pollutantCode,
        beginTime: params.beginTime,
        endTime: params.endTime,
        pageIndex: params.pageIndex,
        pageSize: params.pageSize
    };
    const result = await post('/api/rest/PollutantSourceApi/OverData/GetOnePointOverDataList', body, null);
    return result === null ? { data: null } : result;
}
// 获取工艺流程图信息
export async function queryprocesschart(params) {
    const body = {
        DGIMN: params.dgimn,
    };
    const result = await post('/api/rest/PollutantSourceApi/DataList/GetRealTimeAndParams', body, null);
    return result === null ? { data: null } : result.data;
}
// 获取数据一览表头
export async function querypollutanttypecode(params) {
    const body = {
        pollutantTypes: params.pollutantCode,
    };
    const result = await post('/api/rest/PollutantSourceApi/DataList/GetPollutantTypeCode', body, null);
    return result === null ? { data: null } : result.data;
}
// 获取数据一览数据
export async function querydatalist(params) {
    let body = {
        time: params.time,
        pointType:params.pointType,
        pollutantTypes:params.pollutantTypes,
        pointName:params.pointName,
        status:params.status,
        operationStatus:params.operationStatus,
        terate:params.terate,
        warning:params.warning,
        RunState:params.RunState,
    };
    if(params.dgimn)
        body.DGIMNs=params.dgimn;
    const result = await post('/api/rest/PollutantSourceApi/DataList/AllTypeSummaryList', body, null);
    return result === null ? { data: null } : result.data;
}
// 获取最新一条数据
export async function querylastestdatalist(params) {
    const body = {
        dataType: params.dataType,
        DGIMNs: params.dgimn,
        isLastest:true
    };
    const result = await post('/api/rest/PollutantSourceApi/DataList/AllTypeSummaryList', body, null);
    return result === null ? { data: null } : result;
}
// 获得单点数据信息
export async function querysinglepointinfo(params) {
    const body = {
        DGIMNs: params.dgimn
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/GetPoint', body, null);
    return result === null ? {data: null} : result.data;
}
// 获取企业超标排口汇总数据
export async function queryalloverdatalist(params) {
    const body = {
        DGIMNs: params.dgimn,
        beginTime:params.beginTime,
        endTime:params.endTime,
        pollutantCodeList: params.summaryPolluntantCode
    };
    const result = await post('/api/rest/PollutantSourceApi/OverData/GetAllPointOverDataList', body, null);
    return result === null ? {data: null} : result.data;
}
//专工派单
export async function addtaskinfo(params) {
    const body = {
        DGIMNs: params.dgimn,
        taskType:2,
        taskFrom: 3,
        operationsUserId:params.personId,
        remark:params.remark
    };
    const result = await post('/api/rest/PollutantSourceApi/PTaskProcessing/AddTask', body, null);
    return result === null ? {data: null} : result.requstresult;
}
//催办
export async function queryurge(params) {
    const body = {
        NoticeTitle:'通知',
        ToUserId:params.personId,
        //1是督办
        NoticeType:1,
        DGIMN:params.DGIMN
    };
    const result = await post('/api/rest/PollutantSourceApi/PTaskProcessing/PostTaskSupervise', body, null);
    return result === null ? {data: null} : result.requstresult;
}
//获取监测报告列表
export async function queryreportlist(params) {
    const body = {
        beginTime:params.beginTime,
        endTime:params.endTime,
    };
    const result = await post('/api/rest/PollutantSourceApi/DataList/GetYearDataList', body, null);
    return result === null ? {data: null} : result.data;
}


//获取系统污染物类型
export async function getPollutantTypeList(params) {
    const body = {
    };
    const result = await post('/api/rest/PollutantSourceApi/DataList/GetPollutantTypeList', body, null);
    return result === null ? {data: null} : result.data;
}

// 获取工艺流程图信息
export async function queryrealparam(params) {
    const body = {
        DGIMN: params.dgimn,
    };
    const result = await post('/api/rest/PollutantSourceApi/DataList/GetProcessFlowChartStatus', body, null);
    return result === null ? { data: null } : result.data;
}
// 获取单排口运维信息
export async function queryoperationInfo(params) {
    const body = {
        DGIMNs: params.dgimn,
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/GetOperationByDgimn', body, null);
    return result === null ? { data: null } : result;
}

// 获取单排口下是否有任务
export async function queryoperationTaskInfo(params) {
    const body = {
        DGIMNs: params.dgimn,
    };
    const result = await post('/api/rest/PollutantSourceApi/PPointAndData/GetOperationTaskByDgimn', body, null);
    return result === null ? { data: null } : result;
}


