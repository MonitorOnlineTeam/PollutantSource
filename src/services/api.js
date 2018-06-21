import { post, get } from '../dvapack/request';
import userlist from '../mockdata/User/userinfo.json';

const users = userlist;
export async function fakeAccountLogin(params) {
    const body = {
        User_Account: params.User_Account,
        USer_Pwd: params.User_Pwd,
    };
    let userArray = Array.from(users).filter(t => t.User_Account === params.User_Account && t.User_Pwd === params.User_Pwd);
    let result = {'requstresult': '0', 'reason': '验证失败', 'operation': 'Post', 'data': {}, 'total': 0};
    // = await post('/api/rest/AtmosphereApi/Author/IsLogins/', body, null, 'notooken');
    if (userArray.length > 0) {
        result = {'requstresult': '1', 'reason': '验证成功', 'operation': 'Post', 'data': {...userArray[0]}, 'total': 1};
    }
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
            url = '/api/rest/AtmosphereApi/RealTime/GetRealTimeData';
        } else if (params.dataType === 'minute') {
            url = '/api/rest/AtmosphereApi/Minute/GetMinuteData';
        } else if (params.dataType === 'hour') {
            url = '/api/rest/AtmosphereApi/Hour/GetHourData';
        } else if (params.dataType === 'day') {
            url = '/api/rest/AtmosphereApi/Day/GetDayData';
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
        url = '/api/rest/AtmosphereApi/RealTime/GetRealTimeData';
    } else if (params.dataType === 'minute') {
        url = '/api/rest/AtmosphereApi/Minute/GetMinuteData';
    } else if (params.dataType === 'hour') {
        url = '/api/rest/AtmosphereApi/Hour/GetHourData';
    } else if (params.dataType === 'day') {
        url = '/api/rest/AtmosphereApi/Day/GetDayData';
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
        groupstr += item + ',';
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

export async function getAllPointAlarmInfo(params) {
    const body = {
        time: params.time,
    };
    // const result = await get('/api/rest/AlarmDealInfoApi/GetAllPointExceptionInfo', body, null);
    const result = await get('/api/rest/AtmosphereApi/AlarmData/GetAlarmToVerifyList', body, null);

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
