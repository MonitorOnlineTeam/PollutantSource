import Enterprise_AllJson from './Enterprise_All.json';
import Point_AllJson from './Point_All.json';
import Point_FactoryJson from './Point_Factory.json';
import Point_ComplexJson from './Point_Complex.json';
import Point_OperationJson from './Point_Operation.json';
import relationJson from './Point_MonitorPointBase.json';
import Cookie from 'js-cookie';
import regions from '../Regions/region.json';
import industrys from './Code/T_Cod_IndustryType.json';
import attentions from './Code/T_Cod_AttentionDegree.json';
import PollutantDatas from './Code/T_Cod_Pollutant.json';
import moment from 'moment';
const enterpriseArray = Enterprise_AllJson;
const allpointArray = Point_AllJson;
const complexpointArray = Point_ComplexJson;
const factorypointArray = Point_FactoryJson;
const operationpointArray = Point_OperationJson;
const relationArray = relationJson;
const enterpriseArraySon = getEnterpriseSon();

function getEnterpriseSon() {
    let result = [];
    for (const e of enterpriseArray) {
        if (e.Child) {
            if (result.find((n) => n.EntCode === e.EntCode) === undefined) {
                result.push(e);
            }
            for (const ee of e.Child) {
                if (result.find((n) => n.EntCode === ee.EntCode) === undefined) {
                    result.push(ee);
                }
            }
        } else {
            if (result.find((n) => n.EntCode === e.EntCode) === undefined) {
                result.push(e);
            }
        }
    }
    return result;
}

// 登陆用户可查看的企业
export function getEnterprise() {
    const user = JSON.parse(Cookie.get('token'));
    let result = [];
    // 管理员
    if (user.User_Account === 'system') {
        result = enterpriseArraySon;
    } else if (user.User_Account === 'wangnailin') { // 集团人员
        for (const p of complexpointArray) {
            for (const r of relationArray) {
                for (const e of enterpriseArraySon) {
                    if (r.BaseCode === e.EntCode && r.DGIMN === p.DGIMN) {
                        if (result.find((n) => n.EntCode === e.EntCode) === undefined) {
                            result.push(e);
                            break;
                        }
                    }
                }
            }
        }
    } else if (user.User_Account === 'lisonggui') { // 分厂人员
        for (const p of factorypointArray) {
            for (const r of relationArray) {
                for (const e of enterpriseArraySon) {
                    if (r.BaseCode === e.EntCode && r.DGIMN === p.DGIMN) {
                        if (result.find((n) => n.EntCode === e.EntCode) === undefined) {
                            result.push(e);
                            break;
                        }
                    }
                }
            }
        }
    } else if (user.User_Account === 'chengyun') { // 运维人员
        for (const p of operationpointArray) {
            for (const r of relationArray) {
                for (const e of enterpriseArraySon) {
                    if (r.BaseCode === e.EntCode && r.DGIMN === p.DGIMN) {
                        if (result.find((n) => n.EntCode === e.EntCode) === undefined) {
                            result.push(e);
                            break;
                        }
                    }
                }
            }
        }
    }
    return result;
}

// 登陆用户可查看的点位（附带企业）
export function getPointEnterprise() {
    const user = JSON.parse(Cookie.get('token'));
    let result = [];

    let points;
    // 管理员
    if (user.User_Account === 'system') {
        points = allpointArray;
    } else if (user.User_Account === 'wangnailin') { // 集团人员
        points = complexpointArray;
    } else if (user.User_Account === 'lisonggui') { // 分厂人员
        points = factorypointArray;
    } else if (user.User_Account === 'chengyun') { // 运维人员
        points = operationpointArray;
    }
    for (const p of points) {
        let relation = relationArray.find((r) => r.DGIMN === p.DGIMN);
        let enterprise = enterpriseArraySon.find((e) => e.EntCode === relation.BaseCode);
        if (enterprise) {
            // debugger;
            const region = regions.find(t => t.RegionCode === p.RegionCode);
            const industry = industrys.find(t => t.IndustryTypeCode === enterprise.IndustryTypeCode);
            const attention = attentions.find(t => t.AttentionCode === enterprise.AttentionCode);
            const rr = { ...enterprise,
                ...p,
                RegionName: region.RegionName,
                IndustryTypeName: industry.IndustryTypeName,
                AttentionName: attention.AttentionName };
            result.push(rr);
        }
    }
    return result;
}

// ********************************获取管控状态、参数****************************

// 根据时间、污染物获取管控参数以及状态
export function getDynamicControlData(obj) {
    // debugger
    let thisObj = obj || {};
    let returnDatas = {
        statusDatas: [],
        paramDatas: []
    };
    let statusDatas = [];
    let paramDatas = [];
    let i = 1;
    let statusEnum = ['运行', '故障', '校准', '维护'];
    let paramEnum = ['正常', '零点校准', '量程校准'];

    defaultPollutantCodes.map((item) => {
        if (item.Value === thisObj.PollutantCode) {
            let statusRandom = parseInt(Math.random() * 3);
            let paramRandom = parseInt(Math.random() * 2);

            let statusData = {};
            statusData.id = i;
            statusData.MonitoringTime = thisObj.MonitoringTime;
            statusData.PollutantCode = thisObj.PollutantCode;
            statusData.Params = [];
            statusData.Params.push({Code: 'RunStatus', Name: '设备运行状态', Value: statusRandom, Status: statusEnum[statusRandom]});// 设备运行状态
            statusData.Params.push({Code: 'InstrumentStatus', Name: '分析仪状态', Value: paramRandom, Status: paramEnum[paramRandom]});// 设备运行状态

            statusDatas.push(statusData);

            let paramData = {};
            paramData.id = i;
            paramData.MonitoringTime = thisObj.MonitoringTime;
            paramData.PollutantCode = thisObj.PollutantCode;
            paramData.Params = [];

            paramData.Params.push({Code: 'Flow', Name: '流量', Value: 0, Status: '正常'});// 流量
            paramData.Params.push({Code: 'Oxygen', Name: '含氧量', Value: 0, Status: '正常'});// 含氧量 Code: 'Speed', Name: '流速', Value: 0
            paramData.Params.push({Code: 'Speed', Name: '流速', Value: 0, Status: '正常'});// 流速
            paramData.Params.push({Code: 'Temperature', Name: '温度', Value: 0, Status: '正常'});// 温度
            paramData.Params.push({Code: 'Humidity', Name: '湿度', Value: 0, Status: '正常'});// 湿度
            paramData.Params.push({Code: 'SectionalArea', Name: '截面积', Value: 0, Status: '正常'});// 截面积
            paramData.Params.push({Code: 'Intercept', Name: '截距', Value: 0, Status: '正常'});// 截距
            paramData.Params.push({Code: 'Pressure', Name: '压力', Value: 0, Status: '正常'});// 压力

            paramDatas.push(paramData);
            returnDatas.statusDatas = statusDatas;
            returnDatas.paramDatas = paramDatas;
        }
        i++;
    });
    return returnDatas;
};

// ********************************获取管控状态、参数****************************

// *********************************获取浓度数据*********************************
// 默认污染物
export const defaultPollutantCodes = [
    {Value: '01', Name: '实测烟尘', Unit: 'mg/m3', Min: 1, Max: 35, Standard: 25, IsExceed: 0, ExceedValue: 0, IsException: 0, ExceptionText: ''},
    {Value: '02', Name: '实测二氧化硫', Unit: 'mg/m3', Min: 20, Max: 300, Standard: 25, IsExceed: 0, ExceedValue: 0, IsException: 0, ExceptionText: ''},
    {Value: '03', Name: '实测氮氧化物', Unit: 'mg/m3', Min: 10, Max: 150, Standard: 25, IsExceed: 0, ExceedValue: 0, IsException: 0, ExceptionText: ''},
    {Value: 'b02', Name: '流量', Unit: 'm3/h', Min: 30, Max: 70, Standard: 25, IsExceed: 0, ExceedValue: 0, IsException: 0, ExceptionText: ''},
    {Value: 's01', Name: '氧含量', Unit: '%', Min: 3, Max: 10, Standard: 25, IsExceed: 0, ExceedValue: 0, IsException: 0, ExceptionText: ''},
    {Value: 's02', Name: '流速', Unit: 'm/s', Min: 3, Max: 10, Standard: 25, IsExceed: 0, ExceedValue: 0, IsException: 0, ExceptionText: ''},
    {Value: 's03', Name: '烟气温度', Unit: '℃', Min: 3, Max: 20, Standard: 25, IsExceed: 0, ExceedValue: 0, IsException: 0, ExceptionText: ''},
    {Value: 's05', Name: '烟气湿度', Unit: '%', Min: 3, Max: 20, Standard: 25, IsExceed: 0, ExceedValue: 0, IsException: 0, ExceptionText: ''},
    {Value: 's08', Name: '烟气静压', Unit: 'MPa', Min: -100, Max: -500, Standard: 25, IsExceed: 0, ExceedValue: 0, IsException: 0, ExceptionText: ''},
    {Value: 'zs01', Name: '烟尘', Unit: 'mg/m3', Min: 1, Max: 50, Standard: 25, IsExceed: 0, ExceedValue: 0, IsException: 0, ExceptionText: ''},
    {Value: 'zs02', Name: '二氧化硫', Unit: 'mg/m3', Min: 10, Max: 300, Standard: 25, IsExceed: 0, ExceedValue: 0, IsException: 0, ExceptionText: ''},
    {Value: 'zs03', Name: '氮氧化物', Unit: 'mg/m3', Min: 15, Max: 150, Standard: 25, IsExceed: 0, ExceedValue: 0, IsException: 0, ExceptionText: ''}
];

// 获取污染物
export function getPollutantDatas() {
    // var data = [];
    // PollutantDatas.map((item) => {
    //     if (item.PollutantTypeCode === '2' && item.IsUsed === '1') {
    //         data.push({
    //             'Value': item.PollutantCode,
    //             'Name': item.PollutantName,
    //             'Unit': item.Unit
    //         });
    //     }
    // });
    // // console.log(data);
    // return data;
    return defaultPollutantCodes;
};
// (Math.random()*(10-1+1)+1).toFixed(3);
// moment().add(7,'years'); // 加7年
// moment().add(7,'month');// 加7个月
// moment().add(7,'days'); // 加7天
// moment().add(7,'hours'); // 加7小时
// moment().add(7,'minutes');// 加7分钟
// moment().add(7,'seconds');// 加7秒钟

// moment().subtract(7,'years'); // 减7年
// moment().subtract(7,'month');// 减7个月
// moment().subtract(7,'days'); // 减7天
// moment().subtract(7,'hours'); // 减7小时
// moment().subtract(7,'minutes');// 减7分钟
// moment().subtract(7,'seconds');// 减7秒钟

/**
 * 获取监测点数据
 *@param
 ={
     startTime?:开始时间 eg: '2018-06-23 15:30'
     endTime?:结束时间 eg: '2018-06-24 15:30'
     dataType?:数据类型 eg:dataType:'realtime' //'minutes', 'hour', 'day'
     pollutantCodes?:污染物 eg:['s1','01']
     interval?:时间间隔  eg: interval:30 //实时：秒/条  分钟：分钟/条
     point?:监测点 eg:['123','456']
     sort:'desc'  // 默认降序  asc 按时间升序    desc  降序
 }
*/
export function getAllConcentration(obj) {
    let $this = obj || {};
    let startTime = $this.startTime || moment().subtract(24, 'hours').format('YYYY-MM-DD HH:mm:ss');
    let endTime = $this.endTime || moment().format('YYYY-MM-DD HH:mm:ss');
    let dataType = $this.dataType || 'day';
    let sort = $this.sort || 'desc';
    let returnDatas = [];
    let pollutantCodes = [];
    let point = [];
    let defaultPoint = getPointEnterprise();
    // let i = 1;
    let dateForms = {
        format: '',
        value: 1,
        type: '',
        startTime: startTime,
        endTime: endTime
    };
    const dateTypeFormat = {
        realtime: 'YYYY-MM-DD HH:mm:ss',
        minutes: 'YYYY-MM-DD HH:mm:00',
        hour: 'YYYY-MM-DD HH:00:00',
        day: 'YYYY-MM-DD 00:00:00'
    };
    // console.log($this.point);
    // point = defaultPoint;
    if ($this.point && $this.point.length > 0) {
        $this.point.map((k) => {
            defaultPoint.map((m) => {
                if (k === m.DGIMN) {
                    point.push(m);
                }
            });
        });
    } else {
        point = defaultPoint;
    }

    if ($this.pollutantCodes && $this.pollutantCodes.length > 0) {
        $this.pollutantCodes.map((k) => {
            defaultPollutantCodes.map((m) => {
                if (k === m.Value) {
                    pollutantCodes.push(m);
                }
            });
        });
    } else {
        pollutantCodes = defaultPollutantCodes;
    }
    switch (dataType) {
        case 'realtime':
            dateForms.format = dateTypeFormat.realtime;
            dateForms.type = 'seconds';
            dateForms.value = $this.interval || 30;
            if (!$this.startTime || !$this.endTime) {
                dateForms.endTime = moment().subtract(1, 'minutes').format(dateTypeFormat.realtime);
                dateForms.startTime = moment().subtract(16, 'minutes').format(dateTypeFormat.realtime);
            } else {
                dateForms.endTime = moment(dateForms.endTime).format(dateTypeFormat.realtime);
                dateForms.startTime = moment(dateForms.startTime).format(dateTypeFormat.realtime);
            }
            break;
        case 'minutes':
            dateForms.format = dateTypeFormat.minutes;
            dateForms.type = 'minutes';
            dateForms.value = $this.interval || 10;
            if (!$this.startTime || !$this.endTime) {
                dateForms.endTime = moment().format(dateTypeFormat.minutes);
                dateForms.startTime = moment().subtract(5, 'hours').format(dateTypeFormat.minutes);
            } else {
                dateForms.endTime = moment(dateForms.endTime).format(dateTypeFormat.minutes);
                dateForms.startTime = moment(dateForms.startTime).format(dateTypeFormat.minutes);
            }

            break;
        case 'hour':
            dateForms.format = dateTypeFormat.hour;
            dateForms.type = 'hours';
            dateForms.value = $this.interval || 1;
            if (!$this.startTime || !$this.endTime) {
                dateForms.endTime = moment().subtract(1, 'hours').format(dateTypeFormat.hour);
                dateForms.startTime = moment().subtract(25, 'hours').format(dateTypeFormat.hour);
            } else {
                dateForms.endTime = moment(dateForms.endTime).format(dateTypeFormat.hour);
                dateForms.startTime = moment(dateForms.startTime).format(dateTypeFormat.hour);
            }
            break;
        case 'day':
            dateForms.format = dateTypeFormat.day;
            dateForms.type = 'days';
            dateForms.value = $this.interval || 1;

            if (!$this.startTime || !$this.endTime) {
                dateForms.endTime = moment().subtract(1, 'day').format(dateTypeFormat.day);
                dateForms.startTime = moment().subtract(25, 'day').format(dateTypeFormat.day);
            } else {
                dateForms.endTime = moment(dateForms.endTime).format(dateTypeFormat.day);
                dateForms.startTime = moment(dateForms.startTime).format(dateTypeFormat.day);
            }
            break;
    };

    // console.log(dateForms);
    // console.log(point);
    point.map((p) => {
        // debugger;
        let pointData = p;
        pointData.MonitoringDatas = [];
        let m = 1;
        let sTime = dateForms.startTime;
        let eTime = dateForms.endTime;
        while (sTime <= eTime) {
            let monitoringTime = {};
            monitoringTime.id = m;
            monitoringTime.MonitoringTime = moment(eTime).format(dateForms.format);
            monitoringTime.PollutantDatas = [];
            // let tempIsExceedFlag = false;
            // let tempIsExceptionFlag = false;
            let dotRandom = parseInt(Math.random() * 10);
            pollutantCodes.map((item, Key) => {
                let PollutantData = {};
                PollutantData.PollutantCode = item.Value;
                PollutantData.PollutantName = item.Name;
                PollutantData.Max = item.Max;
                PollutantData.Min = item.Min;
                PollutantData.Unit = item.Unit;
                PollutantData.Concentration = (Math.random() * (item.Max - item.Min + 1) + item.Min).toFixed(3);
                PollutantData.IsExceed = 0;
                PollutantData.ExceedValue = 0;
                PollutantData.IsException = 0;
                PollutantData.ExceptionText = '';
                PollutantData.Standard = item.Standard;
                // 指定排口
                if (
                    pointData.DGIMN === 'bjldgn01'
                    || pointData.DGIMN === 'dtgjhh11102'
                    || pointData.DGIMN === 'dtgrjx110'
                    || pointData.DGIMN === 'dtgrjx103'
                    || pointData.DGIMN === 'lywjfd03') {
                    if (m === 1) { // 第一条数据超标
                        if (dotRandom === Key) {
                            PollutantData.IsExceed = 1;
                            PollutantData.Concentration = ((PollutantData.Standard / 2) + (+PollutantData.Concentration)).toFixed(3);
                            console.log(Key + ':' + PollutantData.Concentration);
                            PollutantData.ExceedValue = ((PollutantData.Concentration - PollutantData.Standard) / PollutantData.Standard).toFixed(2);
                        }
                    } else if (m === 2) { // 第二条数据异常
                        PollutantData.Concentration = 0;
                        PollutantData.IsException = 1;
                        PollutantData.ExceptionText = '0值异常';
                    } else {
                        // console.log(dotRandom + '-' + Key);
                        // console.log(dotRandom === Key);
                        if (dotRandom === Key) {
                            PollutantData.IsExceed = 1;
                            PollutantData.Concentration = ((PollutantData.Standard / 2) + (+PollutantData.Concentration)).toFixed(3);
                            PollutantData.ExceedValue = ((PollutantData.Concentration - PollutantData.Standard) / PollutantData.Standard).toFixed(2);
                        }
                    }
                } else {
                    if (dotRandom === Key) {
                        PollutantData.IsExceed = 1;
                        PollutantData.Concentration = ((PollutantData.Standard / 2) + (+PollutantData.Concentration)).toFixed(3);
                        PollutantData.ExceedValue = ((PollutantData.Concentration - PollutantData.Standard) / PollutantData.Standard).toFixed(2);
                    }
                }

                monitoringTime.PollutantDatas.push(PollutantData);
            });
            eTime = moment(eTime).subtract(dateForms.value, dateForms.type).format(dateForms.format);
            pointData.MonitoringDatas.push(monitoringTime);
            m++;
        };
        if (sort === 'asc') {
            pointData.MonitoringDatas = pointData.MonitoringDatas.reverse();
        }
        returnDatas.push(pointData);
    });
    return returnDatas;
}
// *********************************获取浓度数据*********************************
