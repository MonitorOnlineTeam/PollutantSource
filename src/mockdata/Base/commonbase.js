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

// *********************************获取浓度数据*********************************
// 默认污染物
export const defaultConcentration = [
    {Value: '01', Name: '实测烟尘', Unit: 'mg/m3', Min: 1, Max: 35, Standard: 25},
    {Value: '02', Name: '实测二氧化硫', Unit: 'mg/m3', Min: 20, Max: 300, Standard: 25},
    {Value: '03', Name: '实测氮氧化物', Unit: 'mg/m3', Min: 10, Max: 150, Standard: 25},
    {Value: 'b02', Name: '流量', Unit: 'm3/h', Min: 30, Max: 70, Standard: 25},
    {Value: 's01', Name: '氧含量', Unit: '%', Min: 3, Max: 10, Standard: 25},
    {Value: 's02', Name: '流速', Unit: 'm/s', Min: 3, Max: 10, Standard: 25},
    {Value: 's03', Name: '烟气温度', Unit: '℃', Min: 3, Max: 20, Standard: 25}, // 22
    {Value: 's05', Name: '烟气湿度', Unit: '%', Min: 3, Max: 20, Standard: 25},
    {Value: 's08', Name: '烟气静压', Unit: 'MPa', Min: -100, Max: -500, Standard: 25}, // -0.120  - 0.200
    {Value: 'zs01', Name: '烟尘', Unit: 'mg/m3', Min: 1, Max: 50, Standard: 25},
    {Value: 'zs02', Name: '二氧化硫', Unit: 'mg/m3', Min: 10, Max: 300, Standard: 25},
    {Value: 'zs03', Name: '氮氧化物', Unit: 'mg/m3', Min: 15, Max: 150, Standard: 25}
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
    return defaultConcentration;
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
     concentration?:污染物 eg:['s1','01']
     interval?:时间间隔  eg: interval:30 //实时：秒/条  分钟：分钟/条
     point?:监测点 eg:['123','456']
 }
*/
export function getAllConcentration(obj) {
    let $this = obj || {};
    let startTime = $this.startTime || moment().subtract(24, 'hours').format('YYYY-MM-DD HH:mm:ss');
    let endTime = $this.endTime || moment().format('YYYY-MM-DD HH:mm:ss');
    let dataType = $this.dataType || 'day';
    let returnDatas = [];
    let concentration = [];
    let point = [];
    let defaultPoint = getPointEnterprise();
    let i = 1;
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
    // console.log(defaultPoint);
    if ($this.point && $this.point.length > 0) {
        $this.point.map((k) => {
            defaultPoint.map((m) => {
                if (k.DGIMN === m.DGIMN) {
                    point.push(m);
                }
            });
        });
    } else {
        point = defaultPoint;
    }

    if ($this.concentration && $this.concentration.length > 0) {
        $this.concentration.map((k) => {
            defaultConcentration.map((m) => {
                if (k === m.Value) {
                    concentration.push(m);
                }
            });
        });
    } else {
        concentration = defaultConcentration;
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
    point.map((p) => {
        let pointData = p;
        pointData.PollutantData = [];

        concentration.map((item) => {
            var data = {
                'PollutantCode': item.Value,
                'PollutantName': item.Name,
                'Unit': item.Unit,
                'Datas': []
            };
            let sTime = dateForms.startTime;
            let eTime = dateForms.endTime;
            while (sTime <= eTime) {
                data.Datas.push({
                    'Key': i++,
                    'MonitoringTime': moment(eTime).format(dateForms.format),
                    'Concentration': (Math.random() * (item.Max - item.Min + 1) + item.Min).toFixed(3),
                    'Standard': item.Standard,
                    'Overproof': '0.00',
                    'Unit': item.Unit
                });

                eTime = moment(eTime).subtract(dateForms.value, dateForms.type).format(dateForms.format);
                // console.log('sTime:', sTime);
                // console.log('eTime:', eTime);
            }
            pointData.PollutantData.push(data);
        });
        returnDatas.push(pointData);
    });
    console.log(returnDatas);
    return returnDatas;
}
// *********************************获取浓度数据*********************************
