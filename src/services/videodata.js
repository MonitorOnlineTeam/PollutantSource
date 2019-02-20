
import request from '../utils/request';
import { post} from '../dvapack/request';
// 视频列表
export async function getList(params) {
    const body = {
        DGIMN: params.DGIMN
    };
    const result = post('/api/rest/PollutantSourceApi/Video/GetVideoInfoByDgimn', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 删除视频信息
export async function deleteVideoInfo(params) {
    const body = {
        VedioCamera_ID: params.VedioCamera_ID,
        VedioDevice_ID: params.VedioDevice_ID,
        CameraMonitorID: params.CameraMonitorID
    };
    const result = post('/api/rest/PollutantSourceApi/Video/DeleteVideoInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 根据排口增加视频信息
export async function addVideoInfo(params) {
    const body = {
        VedioDevice_Name: params.VedioDevice_Name,
        VedioDevice_No: params.VedioDevice_No,
        VedioDevice_Position: params.VedioDevice_Position,
        IP: params.IP,
        User_Name: params.User_Name,
        User_Pwd: params.User_Pwd,
        Device_Port: params.Device_Port,
        VedioCamera_Name: params.VedioCamera_Name,
        VedioCamera_No: params.VedioCamera_No,
        VedioCamera_Position: params.VedioCamera_Position,
        ProduceDate: params.ProduceDate,
        VedioCamera_Version: params.VedioCamera_Version,
        Longitude: params.Longitude,
        Latitude: params.Latitude,
        DGIMN: params.DGIMN,
    };
    const result = post('/api/rest/PollutantSourceApi/Video/AddVideoInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 编辑视频信息
export async function updateVideoInfos(params) {
    const body = {
        VedioDevice_Name: params.VedioDevice_Name,
        VedioDevice_No: params.VedioDevice_No,
        VedioDevice_Position: params.VedioDevice_Position,
        IP: params.IP,
        User_Name: params.User_Name,
        User_Pwd: params.User_Pwd,
        Device_Port: params.Device_Port,
        VedioCamera_Name: params.VedioCamera_Name,
        VedioCamera_No: params.VedioCamera_No,
        VedioCamera_Position: params.VedioCamera_Position,
        ProduceDate: params.ProduceDate,
        VedioCamera_Version: params.VedioCamera_Version,
        Longitude: params.Longitude,
        Latitude: params.Latitude,
        VedioDevice_ID: params.VedioDevice_ID,
        CameraMonitorID: params.CameraMonitorID,
        VedioCamera_ID: params.VedioCamera_ID,
    };
    const result = post('/api/rest/PollutantSourceApi/Video/UpdateVideoInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 查看历史实时视频信息
export async function gethistoryVideoList(params) {
    const body = {
        DGIMN: params.DGIMN,
        MonitorTime: params.MonitorTime,
    };
    const result = post('/api/rest/PollutantSourceApi/Video/GetLastestDataByPoint', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 查看报警历史信息
export async function getAlarmHistory(params) {
    const body = {
        DGIMN: params.DGIMN,
        beginDate: params.beginDate,
        endDate: params.endDate,
    };
    const result = post('/api/rest/PollutantSourceApi/Video/GetAlarmListbyTime', body, null);
    return result === null ? {
        data: null
    } : result;
}
// 查看报警历史信息
export async function updateAlarmHistory(params) {
    const body = {
        DGIMN: params.DGIMN,
        beginDate: params.beginDate,
        endDate: params.endDate,
    };
    const result = post('/api/rest/PollutantSourceApi/Video/UpdateAlarmListbyTime', body, null);
    return result === null ? {
        data: null
    } : result;
}
