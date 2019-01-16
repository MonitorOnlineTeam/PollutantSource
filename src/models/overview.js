import {
    querypollutanttypecode, querydatalist, querylastestdatalist,
    queryhistorydatalist, querypollutantlist, addtaskinfo, queryurge, getPollutantTypeList
} from '../services/api';
import React from 'react';
import { Model } from '../dvapack';
import moment from 'moment';
import { message } from 'antd';

import { mainpollutantInfo } from '../../src/config';
import {
    Popover,
    Badge,
    Icon,
    Divider
} from 'antd';
export default Model.extend({
    namespace: 'overview',
    state: {
        columns: [],
        data: [],
        dataTemp: [],
        lastestdata: [],
        mainpcol: [],
        detailpcol: [],
        detaildata: [],
        chartdata: [],
        existdata: false,
        gwidth: 0,
        gheight: 0,
        selectdata: [],
        pollutantName: [],
        detailtime: null,
        addtaskstatus: false,
        pollutantTypelist: null,

    },
    effects: {
        * querypollutanttypecode({
            payload,
        }, { call, update, put, take }) {
            let gwidth = 300 + 140 + 70;
            const data = yield call(querypollutanttypecode, payload);
            yield put({
                type: 'querydatalist',
                payload: payload,
            });
            yield take('querydatalist/@@end');
            if (data) {
                gwidth = gwidth + 200 * data.length;
            }
            yield update({ columns: data, gwidth });
        },
        * querydatalist({
            payload,
        }, { call, update, put, take }) {
            const data = yield call(querydatalist, payload);
            if (payload.map && data) {
                data.map((item) => {
                    item.position = {
                        'longitude': item.longitude,
                        'latitude': item.latitude
                    };
                    item.key = item.DGIMN;
                });
            }

            //手工上传
            if (payload.manualUpload) {
                if (data && data[0]) {
                    if(payload.DGIMN==='[object Object]')
                    {
                        localStorage.setItem('DGIMN', data[0].DGIMN);
                    }
                    yield put({
                        type: 'manualupload/GetManualSupplementList',
                        payload: {
                            ...payload,
                            DGIMN: payload.DGIMN === '[object Object]' ? data[0].DGIMN : payload.DGIMN,
                            pointName: data[0].pointName
                        }
                    });
                }
                else {
                    //知道有问题但是手机端调用这个接口是不传参数返回所有的值，
                    //所以，在这里将MN号码给了一个不可能查询到的值，让返回列表为空，因为点表为空
                    yield put({
                        type: 'manualupload/GetManualSupplementList',
                        payload: {
                            DGIMN: "1"
                        }
                    });
                }
            }
            //菜单-维修
            if (payload.RepairHistoryRecords) {
                if (data && data[0]) {
                    if(payload.DGIMN==='[object Object]')
                    {
                        localStorage.setItem('DGIMN', data[0].DGIMN);
                    }
                    yield put({
                        type: 'task/GetHistoryRepairDetail',
                        payload: {
                            ...payload,
                            DGIMN: payload.DGIMN === '[object Object]' ? data[0].DGIMN : payload.DGIMN,
                            data: data
                        }
                    });
                }
                else {
                    yield put({
                        type: 'task/GetHistoryRepairDetail',
                        payload: {
                            ...payload,
                            DGIMN: null
                        }
                    });
                }
            }
            //菜单-停机
            if (payload.StopCemsListHistoryRecords) {
                if (data && data[0]) {
                    if(payload.DGIMN==='[object Object]')
                    {
                        localStorage.setItem('DGIMN', data[0].DGIMN);
                    }
                    yield put({
                        type: 'task/GetHistoryStopCemsList',
                        payload: {
                            ...payload,
                            DGIMN: payload.DGIMN === '[object Object]' ? data[0].DGIMN : payload.DGIMN,
                            data: data
                        }
                    });
                }
                else {
                    yield put({
                        type: 'task/GetHistoryStopCemsList',
                        payload: {
                            ...payload,
                            DGIMN: null
                        }
                    });
                }
            }
            //菜单-易耗品
            if (payload.CounterControlCommandHistoryRecords) {
                if (data && data[0]) {
                    if(payload.DGIMN==='[object Object]')
                    {
                        localStorage.setItem('DGIMN', data[0].DGIMN);
                    }
                    yield put({
                        type: 'task/GetHistoryConsumablesReplaceRecord',
                        payload: {
                            ...payload,
                            DGIMN: payload.DGIMN === '[object Object]' ? data[0].DGIMN : payload.DGIMN,
                            data: data
                        }
                    });
                }
                else {
                    yield put({
                        type: 'task/GetHistoryConsumablesReplaceRecord',
                        payload: {
                            ...payload,
                            DGIMN: null
                        }
                    });
                }
            }
            //菜单-标气
            if (payload.StandardGasHistoryRecords) {
                if (data && data[0]) {
                    if(payload.DGIMN==='[object Object]')
                    {
                        localStorage.setItem('DGIMN', data[0].DGIMN);
                    }
                    yield put({
                        type: 'task/GetHistoryStandardGasRepalceRecordList',
                        payload: {
                            ...payload,
                            DGIMN: payload.DGIMN === '[object Object]' ? data[0].DGIMN : payload.DGIMN,
                            data: data
                        }
                    });
                }
                else {
                    yield put({
                        type: 'task/GetHistoryStandardGasRepalceRecordList',
                        payload: {
                            ...payload,
                            DGIMN: null
                        }
                    });
                }
            }

            //菜单-巡检记录
            if (payload.InspectionHistoryRecords) {
                if (data && data[0]) {
                    if(payload.DGIMN==='[object Object]')
                    {
                        localStorage.setItem('DGIMN', data[0].DGIMN);
                    }
                    yield put({
                        type: 'task/GetHistoryInspectionHistoryRecords',
                        payload: {
                            ...payload,
                            DGIMN: payload.DGIMN === '[object Object]' ? data[0].DGIMN : payload.DGIMN,
                            data: data
                        }
                    });
                }
                else {
                    yield put({
                        type: 'task/GetHistoryInspectionHistoryRecords',
                        payload: {
                            ...payload,
                            DGIMN: null
                        }
                    });
                }
            }
            //菜单-校准记录
            if (payload.JzHistoryRecords) {
                if (data && data[0]) {
                    if(payload.DGIMN==='[object Object]')
                    {
                        localStorage.setItem('DGIMN', data[0].DGIMN);
                    }
                    yield put({
                        type: 'task/GetJzHistoryRecord',
                        payload: {
                            ...payload,
                            DGIMN: payload.DGIMN === '[object Object]' ? data[0].DGIMN : payload.DGIMN,
                            data: data
                        }
                    });
                }
                else {
                    yield put({
                        type: 'task/GetJzHistoryRecord',
                        payload: {
                            ...payload,
                            DGIMN: null
                        }
                    });
                }
            }
            //菜单-检验测试记录
            if (payload.BdHistoryInfoHistoryRecords) {
                if (data && data[0]) {
                    if(payload.DGIMN==='[object Object]')
                    {
                        localStorage.setItem('DGIMN', data[0].DGIMN);
                    }
                    yield put({
                        type: 'task/GetBdHistoryInfoList',
                        payload: {
                            ...payload,
                            DGIMN: payload.DGIMN === '[object Object]' ? data[0].DGIMN : payload.DGIMN,
                            data: data
                        }
                    });
                }
                else {
                    yield put({
                        type: 'task/GetBdHistoryInfoList',
                        payload: {
                            ...payload,
                            DGIMN: null
                        }
                    });
                }
            }

            //菜单-异常记录
            if (payload.DeviceExceptionListHistoryRecords) {
                if (data && data[0]) {
                    if(payload.DGIMN==='[object Object]')
                    {
                        localStorage.setItem('DGIMN', data[0].DGIMN);
                    }
                    yield put({
                        type: 'task/GetDeviceExceptionList',
                        payload: {
                            ...payload,
                            DGIMN: payload.DGIMN === '[object Object]' ? data[0].DGIMN : payload.DGIMN,
                            data: data
                        }
                    });
                }
                else {
                    yield put({
                        type: 'task/GetDeviceExceptionList',
                        payload: {
                            ...payload,
                            DGIMN: null
                        }
                    });
                }
            }

            //菜单-运维大事记
            if (payload.Ywdsjlist) {
                if (data && data[0]) {
                    if(payload.DGIMN==='[object Object]')
                    {
                        localStorage.setItem('DGIMN', data[0].DGIMN);
                    }
                    yield put({
                        type: 'task/GetYwdsj',
                        payload: {
                            ...payload,
                            DGIMNs: payload.DGIMN === '[object Object]' ? data[0].DGIMN : payload.DGIMN,
                            data: data
                        }
                    });
                }
                else {
                    yield put({
                        type: 'task/GetYwdsj',
                        payload: {
                            ...payload,
                            DGIMNs: null
                        }
                    });
                }
            }

            //菜单-工艺流程图
            if (payload.ProcessFlowDiagram) {
                if (data && data[0]) {
                    if(payload.DGIMN==='[object Object]')
                    {
                        localStorage.setItem('DGIMN', data[0].DGIMN);
                    }
                    yield put({
                        type: 'points/queryprocesschart',
                        payload: {
                            dgimn: payload.DGIMN === '[object Object]' ? data[0].DGIMN : payload.DGIMN,
                        }
                    });
                }
                else {
                    yield put({
                        type: 'points/queryprocesschart',
                        payload: {
                            dgimn: null
                        }
                    });
                }
            }

            //菜单-运维日历
            if (payload.OperationCalendar) {
                debugger
                if (data && data[0]) {
                    if(payload.DGIMN==='[object Object]')
                    {
                        localStorage.setItem('DGIMN', data[0].DGIMN);
                    }
                    yield put({
                        type: 'workbenchmodel/getOperationCalendarData',
                        payload: {
                            IsQueryAllUser: true,
                            DGIMNs: payload.DGIMN === '[object Object]' ? data[0].DGIMN : payload.DGIMN,
                            beginTime: payload.beginTime,
                            endTime: payload.endTime,
                        }
                    });
                }
                else {
                    debugger
                    yield put({
                        type: 'workbenchmodel/getOperationCalendarData',
                        payload: {
                            DGIMNs:'1',
                            IsQueryAllUser: true,
                        }
                    });
                }
            }
            yield update({ data });
            yield update({ dataTemp: data });
            if (payload.callback === undefined) {
            }
            else {
                payload.callback(data);
            }
        },
        * querylastestdatalist({
            payload,
        }, { call, update }) {
            const res = yield call(querylastestdatalist, payload);
            if (res.data) {
                yield update({ lastestdata: res.data });
            } else {
                yield update({ lastestdata: [] });
            }
        },
        // 主要污染物
        * querymainpollutantlist({
            payload,
        }, { call, update }) {
            let col = [{
                title: '排口',
                dataIndex: 'pointName',
                key: 'pointName',
                width: 110,
                align: 'center'
            }];
            mainpollutantInfo.map((item, key) => {
                col = col.concat({
                    title: item.pollutantName +
                        '(' + item.unit + ')',
                    dataIndex: item.pollutantCode,
                    key: item.pollutantCode,
                    align: 'center',
                    render: (value, record, index) => {
                        const additional = record[item.field + '_params'];
                        if (additional) {
                            const additionalInfo = additional.split('§');
                            if (additionalInfo[0] === 'IsOver') {
                                const content = (<div>
                                    <div style={{ marginBottom: 10 }}>
                                        <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="warning" />
                                        <span style={{ fontWeight: 'Bold', fontSize: 16 }}>数据超标</span>
                                    </div>
                                    <li style={{ listStyle: 'none', marginBottom: 10 }}>
                                        <Badge status="success" text={`标准值：${additionalInfo[2]}`} />
                                    </li>
                                    <li style={{ listStyle: 'none', marginBottom: 10 }}>
                                        <Badge status="error" text={`超标倍数：${additionalInfo[3]}`} />
                                    </li>
                                </div>);
                                return (<Popover content={content}><span style={{ color: '#ff0000', cursor: 'pointer' }}>{value || (value === 0 ? 0 : '-')}</span></Popover>);
                            }
                            const content = (<div>
                                <div style={{ marginBottom: 10 }}>
                                    <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="close-circle" />
                                    <span style={{ fontWeight: 'Bold', fontSize: 16 }}>数据异常</span>
                                </div>
                                <li style={{ listStyle: 'none', marginBottom: 10 }}>
                                    <Badge status="warning" text={`异常原因：${additionalInfo[2]}`} />
                                </li>
                            </div>);
                            return (<Popover content={content}><span style={{ color: '#F3AC00', cursor: 'pointer' }}>{value || (value === 0 ? 0 : '-')}</span></Popover>);
                        }
                        return value || (value === 0 ? 0 : '-');
                    }
                });
            });
            yield update({ mainpcol: col });
        },
        * querydetailpollutant({
            payload,
        }, { call, update }) {
            // 地图详细表格列头
            const detailpcol = [{
                title: '因子',
                dataIndex: 'pollutantName',
                key: 'pollutantName',
                align: 'center',
            }, {
                title: '实测(mg/m³)',
                dataIndex: 'pollutantCode',
                key: 'pollutantCode',
                align: 'center'
            }, {
                title: '折算(mg/m³)',
                dataIndex: 'zspollutantCode',
                key: 'zspollutantCode',
                align: 'center'
            }];
            let detaildata = [];
            let detailtime = null;
            const res = yield call(querylastestdatalist, payload);

            if (res.data && res.data[0]) {
                detailtime = res.data[0].MonitorTime;
                detaildata = [
                    {
                        pollutantName: '烟尘',
                        pollutantCode: res.data[0]['01'] ? res.data[0]['01'] : '-',
                        zspollutantCode: res.data[0]['zs01'] ? res.data[0]['zs01'] : '-',
                        dgimn: payload.dgimn,
                        pcode: '01',
                    },
                    {
                        pollutantName: '二氧化硫',
                        pollutantCode: res.data[0]['02'] ? res.data[0]['02'] : '-',
                        zspollutantCode: res.data[0]['zs02'] ? res.data[0]['zs02'] : '-',
                        dgimn: payload.dgimn,
                        pcode: '02',
                    },
                    {
                        pollutantName: '氮氧化物',
                        pollutantCode: res.data[0]['03'] ? res.data[0]['03'] : '-',
                        zspollutantCode: res.data[0]['zs03'] ? res.data[0]['zs03'] : '-',
                        dgimn: payload.dgimn,
                        pcode: '03',
                    }
                ];
            }
            const selectdata = res.data ? res.data[0] : '';
            yield update({
                detailtime,
                detaildata,
                detailpcol,
                selectdata
            });
        },
        * queryoptionData({ payload }, {
            call, update
        }) {
            const resultlist = yield call(queryhistorydatalist, { ...payload });
            const pollutantlist = yield call(querypollutantlist, { ...payload });
            let seriesdata = [];
            let zsseriesdata = [];
            let xData = [];
            if (resultlist && resultlist.data) {
                resultlist.data.map(item => {
                    const time = moment(item.MonitorTime).hour();
                    xData = xData.concat(time);
                    seriesdata = seriesdata.concat(item[payload.pollutantCodes]);
                    zsseriesdata = zsseriesdata.concat(item['zs' + payload.pollutantCodes]);
                });
            }
            let polluntinfo;
            let markLine = {};
            if (pollutantlist) {
                polluntinfo = pollutantlist.find((value, index, arr) => {
                    return value.pollutantCode === payload.pollutantCodes;
                });
            }
            if (polluntinfo && polluntinfo.standardValue) {
                markLine = {
                    symbol: 'none', // 去掉警戒线最后面的箭头
                    data: [{
                        lineStyle: {
                            type: 'dash',
                            color: '#ff0000',
                        },
                        yAxis: polluntinfo.standardValue
                    }]
                };
            }
            let existdata = true;
            if (!seriesdata[0] && !zsseriesdata[0]) {
                existdata = false;
            }
            const option = {
                legend: {
                    data: [
                        payload.pollutantName,
                        '折算' + payload.pollutantName,
                    ]
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    name: '时间',
                    boundaryGap: false,
                    data: xData
                },
                yAxis: {
                    type: 'value',
                    name: '浓度(' + 'mg/m³' + ')',
                    axisLabel: {
                        formatter: '{value}'
                    },
                },
                series: [{
                    type: 'line',
                    name: payload.pollutantName,
                    data: seriesdata,
                    markLine: markLine,
                    itemStyle: {
                        normal: {
                            color: '#54A8FF',
                            lineStyle: {
                                color: '#54A8FF'
                            }
                        }
                    },
                },
                {
                    type: 'line',
                    name: '折算' + payload.pollutantName,
                    data: zsseriesdata,
                    itemStyle: {
                        normal: {
                            color: '#FF00FF',
                            lineStyle: {
                                color: '#FF00FF'
                            }
                        }
                    },
                }
                ]
            };

            yield update({
                chartdata: option,
                existdata,
                pollutantName: payload.pollutantName,
            });
        },
        * queryoptionDataOnClick({ payload }, {
            call, update
        }) {
            const resultlist = yield call(queryhistorydatalist, { ...payload });
            const pollutantlist = yield call(querypollutantlist, { ...payload });
            let seriesdata = [];
            let zsseriesdata = [];
            let xData = [];
            if (resultlist && resultlist.data) {
                resultlist.data.map(item => {
                    const time = moment(item.MonitorTime).hour();
                    xData = xData.concat(time);
                    seriesdata = seriesdata.concat(item[payload.pollutantCodes]);
                    zsseriesdata = zsseriesdata.concat(item['zs' + payload.pollutantCodes]);
                });
            }
            let polluntinfo;
            let markLine = {};
            if (pollutantlist) {
                polluntinfo = pollutantlist.find((value, index, arr) => {
                    return value.pollutantCode === payload.pollutantCodes;
                });
            }
            if (polluntinfo && polluntinfo.standardValue) {
                markLine = {
                    symbol: 'none', // 去掉警戒线最后面的箭头
                    data: [{
                        lineStyle: {
                            type: 'dash',
                            color: '#ff0000',
                        },
                        yAxis: polluntinfo.standardValue
                    }]
                };
            }
            let existdata = true;
            if (!seriesdata[0] && !zsseriesdata[0]) {
                existdata = false;
            }
            const option = {
                legend: {
                    data: [
                        payload.pollutantName,
                        '折算' + payload.pollutantName,
                    ]
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    name: '时间',
                    boundaryGap: false,
                    data: xData
                },
                yAxis: {
                    type: 'value',
                    name: '浓度(' + 'mg/m³' + ')',
                    axisLabel: {
                        formatter: '{value}'
                    },
                },
                series: [{
                    type: 'line',
                    name: payload.pollutantName,
                    data: seriesdata,
                    markLine: markLine,
                    itemStyle: {
                        normal: {
                            color: '#54A8FF',
                            lineStyle: {
                                color: '#54A8FF'
                            }
                        }
                    },
                },
                {
                    type: 'line',
                    name: '折算' + payload.pollutantName,
                    data: zsseriesdata,
                    itemStyle: {
                        normal: {
                            color: '#FF00FF',
                            lineStyle: {
                                color: '#FF00FF'
                            }
                        }
                    },
                }
                ]
            };

            yield update({
                chartdata: option,
                existdata,
                pollutantName: payload.pollutantName,
            });
        },
        //紧急派单
        * addtaskinfo({
            payload,
        }, { call, update }) {
            const res = yield call(addtaskinfo, payload);
            if (res == 1) {
                message.success('派单成功!');
            } else {
                message.error('派单失败!');
            }
        },
        //催办
        * queryurge({
            payload
        }, { call, update }) {
            const res = yield call(queryurge, payload);
            if (res == 1) {
                message.success('催办成功!');
            } else {
                message.error('催办失败!');
            }
        },
        //获取系统污染物类型
        * getPollutantTypeList({
            payload
        }, { call, update }) {
            const res = yield call(getPollutantTypeList, payload);
            if (res) {
                yield update({
                    pollutantTypelist: res
                });
            }
            else {
                yield update({
                    pollutantTypelist: null
                });
            }
        },
    }
});
