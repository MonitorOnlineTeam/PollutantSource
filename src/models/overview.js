import { querypollutanttypecode, querydatalist, querylastestdatalist, queryhistorydatalist, querypollutantlist } from '../services/api';
import React from 'react';
import { Model } from '../dvapack';
import moment from 'moment';
import styles from '../routes/OverView/datalist.less';

import { mainpollutantInfo, zspollutantInfo } from '../../src/config';
import {
    Popover,
    Badge,
    Icon,
    Divider
} from 'antd';
import { Button } from 'antd/lib/radio';
export default Model.extend({
    namespace: 'overview',
    state: {
        columns: [],
        data: [],
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
        detailtime: null
    },
    effects: {
        * querypollutanttypecode({
            payload,
        }, { call, update, put, take }) {
            let gwidth = 150 + 140 + 70;
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
        }, { call, update }) {
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
            yield update({ data });
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
                                    <div style={{marginBottom: 10}}>
                                        <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="warning" />
                                        <span style={{fontWeight: 'Bold', fontSize: 16}}>数据超标</span>
                                    </div>
                                    <li style={{listStyle: 'none', marginBottom: 10}}>
                                        <Badge status="success" text={`标准值：${additionalInfo[2]}`} />
                                    </li>
                                    <li style={{listStyle: 'none', marginBottom: 10}}>
                                        <Badge status="error" text={`超标倍数：${additionalInfo[3]}`} />
                                    </li>
                                    <li style={{borderBottom: '1px solid #e8e8e8', listStyle: 'none', marginBottom: 5}} />

                                    <li style={{listStyle: 'none'}}>
                                        <Icon type="laptop" style={{ fontSize: 14, color: '#08c' }} />
                                        <Divider type="vertical" />
                                        <a style={{fontSize: 12, cursor: 'pointer', color: '#575757'}} onClick={() => this._openModal(true, 2)}>查看仪器状态参数</a>
                                    </li>
                                    <li style={{listStyle: 'none'}}>
                                        <Icon type="table" style={{ fontSize: 14, color: '#08c' }} />
                                        <Divider type="vertical" />
                                        <a style={{fontSize: 12, cursor: 'pointer', color: '#575757'}} onClick={() => this._openModal(true, 1)}>查看各参数数据</a>
                                    </li>
                                </div>);
                                return (<Popover content={content}><span style={{ color: '#ff0000', cursor: 'pointer' }}>{value || (value === 0 ? 0 : '-')}</span></Popover>);
                            }
                            const content = (<div>
                                <div style={{marginBottom: 10}}>
                                    <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="close-circle" />
                                    <span style={{fontWeight: 'Bold', fontSize: 16}}>数据异常</span>
                                </div>
                                <li style={{listStyle: 'none', marginBottom: 10}}>
                                    <Badge status="warning" text={`异常原因：${additionalInfo[2]}`} />
                                </li>
                                <li style={{borderBottom: '1px solid #e8e8e8', listStyle: 'none', marginBottom: 5}} />
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
            } ];
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
        * queryoptionData({payload}, {
            call, update
        }) {
            const resultlist = yield call(queryhistorydatalist, {...payload});
            const pollutantlist = yield call(querypollutantlist, {...payload});
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
                }
                ]
            };

            yield update({
                chartdata: option,
                existdata,
                pollutantName: payload.pollutantName,
            });
        },
        * queryoptionDataOnClick({payload}, {
            call, update
        }) {
            const resultlist = yield call(queryhistorydatalist, {...payload});
            const pollutantlist = yield call(querypollutantlist, {...payload});
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
                }
                ]
            };

            yield update({
                chartdata: option,
                existdata,
                pollutantName: payload.pollutantName,
            });
        }
    }
});
