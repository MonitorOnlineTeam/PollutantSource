import { querypollutanttypecode, querydatalist, querylastestdatalist, queryhistorydatalist, querypollutantlist } from '../services/api';
import React from 'react';
import {routerRedux} from 'dva/router';
import { Model } from '../dvapack';
import moment from 'moment';
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
        pollutantName: []
    },
    effects: {
        * querypollutanttypecode({
            payload,
        }, { call, update, put }) {
            let columns = [{
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width: 70,
                fixed: 'left',
                render: (value, record, index) => {
                    if (value === 0) {
                        return <img src="../../../gisunline.png" />;
                    } else if (value === 1) {
                        return <img src="../../../gisnormal.png" />;
                    } else if (value === 2) {
                        return <img src="../../../gisover.png" />;
                    } else {
                        return <img src="../../../gisexception.png" />;
                    }
                },
            }, {
                title: '排口',
                dataIndex: 'pointName',
                key: 'pointName',
                width: 150,
                fixed: 'left',
                render: (value, record, index) => {
                    const content = (<div>
                        <li style={{listStyle: 'none', marginBottom: 5}}>
                            <Button size="large"><Icon type="book" style={{color: '#3C9FDA', marginRight: 5}} theme="filled" />进入站房</Button>
                        </li>
                        <li style={{listStyle: 'none'}}>
                            <Button size="large"><Icon type="phone" style={{color: '#3C9FDA', marginRight: 5}} theme="filled" />紧急派单</Button>
                        </li></div>);
                    if (record.scene === 1) {
                        return <Popover trigger="click" content={content}><span style={{ cursor: 'pointer' }}><Icon type="user" style={{color: '#3B91FF'}} />{value}</span></Popover>;
                    } else {
                        return (<Popover trigger="click" content={content}><span style={{ cursor: 'pointer' }}>{value}</span></Popover>);
                    }
                },
            },
            {
                title: '传输有效率',
                dataIndex: 'transmissionEffectiveRate',
                key: 'transmissionEffectiveRate',
                width: 140,
                render: (value, record, index) => {
                    if (value && value.split('%')[0] < 90) {
                        return <span style={{background: '#F40000'}}>{value}</span>;
                    } else {
                        return value;
                    }
                }
            }
            ];
            let gwidth = 150 + 140 + 70;
            const data = yield call(querypollutanttypecode, payload);
            if (data) {
                data.map((item, key) => {
                    gwidth += 170;
                    columns = columns.concat({
                        title: item.title,
                        dataIndex: item.field,
                        key: item.field,
                        align: 'center',
                        width: 170,
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
                                    return (<Popover content={content}><span style={{ color: '#ff0000', cursor: 'pointer' }}>{value}</span></Popover>);
                                } else {
                                    const content = (<div>
                                        <li style={{listStyle: 'none', marginBottom: 10}}>
                                            <Badge status="warning" text={`异常原因：${additionalInfo[1]}`} />
                                        </li>
                                        <li style={{borderBottom: '1px solid #e8e8e8', listStyle: 'none', marginBottom: 5}} />
                                    </div>);
                                    return (<Popover content={content}><span style={{ color: '#F3AC00', cursor: 'pointer' }}>{value}</span></Popover>);
                                }
                            } else {
                                return value;
                            }
                        }
                    });
                });
            }
            yield put({
                type: 'querydatalist',
                payload: payload,
            });
            yield update({ columns, gwidth });
        },
        * querydatalist({
            payload,
        }, { call, update, put }) {
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
        }, { call, update, put }) {
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
        }, { call, update, put }) {
            let col = [{
                title: '排口',
                dataIndex: 'pointName',
                key: 'pointName',
                width: 110,
                align: 'center'
            }];
            mainpollutantInfo.map((item, key) => {
                col = col.concat({
                    title: item.pollutantName
                    + '(' + item.unit + ')',
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
                                return (<Popover content={content}><span style={{ color: '#ff0000', cursor: 'pointer' }}>{value}</span></Popover>);
                            } else {
                                const content = (<div>
                                    <li style={{listStyle: 'none', marginBottom: 10}}>
                                        <Badge status="warning" text={`异常原因：${additionalInfo[1]}`} />
                                    </li>
                                    <li style={{borderBottom: '1px solid #e8e8e8', listStyle: 'none', marginBottom: 5}} />
                                </div>);
                                return (<Popover content={content}><span style={{ color: '#F3AC00', cursor: 'pointer' }}>{value}</span></Popover>);
                            }
                        } else {
                            return value;
                        }
                    }
                });
            });
            yield update({ mainpcol: col });
        },
        * querydetailpollutant({
            payload,
        }, { call, update, put }) {
            // 地图详细表格列头
            const detailpcol = [{
                title: '因子',
                dataIndex: 'pollutantName',
                key: 'pollutantName',
                align: 'center'
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
            const res = yield call(querylastestdatalist, payload);

            if (res.data && res.data[0]) {
                detaildata = [
                    {
                        pollutantName: '烟尘',
                        pollutantCode: res.data[0]['01'],
                        zspollutantCode: res.data[0]['zs01'],
                        dgimn: payload.dgimn,
                        pcode: '01'
                    },
                    {
                        pollutantName: '二氧化硫',
                        pollutantCode: res.data[0]['02'],
                        zspollutantCode: res.data[0]['zs03'],
                        dgimn: payload.dgimn,
                        pcode: '02'
                    },
                    {
                        pollutantName: '氮氧化物',
                        pollutantCode: res.data[0]['03'],
                        zspollutantCode: res.data[0]['zs03'],
                        dgimn: payload.dgimn,
                        pcode: '03'
                    }
                ];
            }
            const selectdata = res.data ? res.data[0] : '';
            yield update({
                detaildata,
                detailpcol,
                selectdata
            });
        },
        * queryoptionData({payload}, {
            call, update, put
        }) {
            console.log(payload);
            const resultlist = yield call(queryhistorydatalist, {...payload});
            const pollutantlist = yield call(querypollutantlist, {...payload});
            console.log(pollutantlist);
            let seriesdata = [];
            let xData = [];
            if (resultlist && resultlist.data) {
                resultlist.data.map(item => {
                    const time = moment(item.MonitorTime).hour();
                    xData = xData.concat(time);
                    seriesdata = seriesdata.concat(item[payload.pollutantCodes]);
                });
            }
            let polluntinfo;
            let markLine = {};
            polluntinfo = pollutantlist.find((value, index, arr) => {
                return value.pollutantCode === payload.pollutantCodes;
            });
            console.log(polluntinfo);
            if (polluntinfo.standardValue) {
                markLine = {
                    symbol: 'none', // 去掉警戒线最后面的箭头
                    data: [{
                        lineStyle: {
                            type: 'dash',
                            color: polluntinfo.color,
                        },
                        yAxis: polluntinfo.standardValue
                    }]
                };
            }
            let existdata = true;
            if (!seriesdata[0]) { existdata = false; };
            const option = {
                // title: {
                //     text: <span style={{alignContent: 'center'}}> {polluntinfo.pollutantName} + '24小时趋势图' </span>
                // },
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
                    name: polluntinfo.pollutantName,
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
                }]
            };

            yield update({
                chartdata: option,
                existdata,
                pollutantName: polluntinfo.pollutantName
            });
        }
    }
});
