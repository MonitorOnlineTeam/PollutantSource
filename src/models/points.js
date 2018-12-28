import moment from 'moment';
import React from 'react';
import { loadMonitorPoint, loadLastdata, queryentpointlist, loadMonitorDatalist
    , maploadMonitorDatalist, loadPointDetail, queryentinfolist, querypollutantlist,
    queryhistorydatalist, queryoverdatalist, queryprocesschart, querysinglepointinfo } from '../services/api';
import { Model } from '../dvapack';

import {
    Icon, Popover, Badge, Divider
} from 'antd';
export default Model.extend({
    namespace: 'points',
    state: {
        entpointlist: [],
        selectent: null,
        pointlist: [],
        lastdata: [],
        pollutant: {},
        hourtendency: [],
        selectpoint: [],
        isfinished: false,
        selpoint: null,
        data: [],
        size: 30,
        current: 1,
        querydate: [],
        monitortype: 'realtime',
        selpollutant: null,
        dateformat: 'YYYY-MM-DD HH:mm:ss',
        Tablewidth: 280,
        countryArray: [],
        countryid: [],
        pointName: '',
        levels: [],
        selent: [],
        pollutantlist: [],
        datalist: [],
        chartdata: null,
        columns: [],
        datatable: [],
        total: 0,
        overdata: [],
        overtotal: 0,
        processchart: {},
        tablewidth:0
    },
    effects: {
        * querypointdetail({
            payload,
        }, { call, update, put, select }) {
            let { countryid } = yield select(_ => _.points);
            let { countryArray } = yield select(_ => _.points);
            let { columns } = yield select(_ => _.points);
            let { Tablewidth } = yield select(_ => _.points);
            Tablewidth = 280;
            columns = [{
                title: '监控时间',
                dataIndex: 'MonitorTime',
                key: 'MonitorTime',
                width: 180,
                fixed: 'left',
                align: 'center'
            }, {
                title: '浓度',
                dataIndex: 'MonitorValue',
                key: 'MonitorValue',
                width: 100,

                render: (text, record) => (
                    <div style={{ color: record.color }}>{text}</div>
                ),
            }];
            countryid = [];
            countryArray = [];
            if (payload.pointType == 'monitorData') {
                payload.monitortype = 'RealTime';
            } else {
                payload.monitortype = 'HourData';
            }
            const data = yield call(loadPointDetail, { dgimn: payload.DGIMN, monitortype: payload.monitortype });
            yield put({
                type: 'querypointdata',
                payload: {
                    dgimn: payload.DGIMN,
                    pollutant: data[0].pollutantList[0].pollutantCode,
                    querydate: payload.pointType == 'monitorData' ? [moment().add(-30, 'm'), moment()] : [moment().add(-24, 'h'), moment()],
                    monitortype: payload.pointType == 'monitorData' ? 'realtime' : 'hour',
                    pointType: payload.pointType,
                    current: 1,
                    dateformat: 'YYYY-MM-DD HH:mm:ss' },
            });
            yield update({ selpoint: data[0], Tablewidth, columns, pointName: data[0].pointName, countryid, countryArray });
        // 获取报警级别
        // let levels=data.MonitorPointPollutant[0].Levels;
        // yield update({ levels });
        },
        // 国控对比数据
        * querychartpointdata({
            payload,
        }, { call, update, put, select }) {
            yield update({isfinished: true});
            const { size } = yield select(_ => _.points);
            let { chartdata } = yield select(_ => _.points);
            let { data } = yield select(_ => _.points);
            let { columns } = yield select(_ => _.points);
            let { Tablewidth } = yield select(_ => _.points);
            let { countryArray } = yield select(_ => _.points);
            let { countryid } = yield select(_ => _.points);
            let mnlist = [];
            if (payload.isclear) {
                countryid = [];
                countryArray = [];
                columns = [{
                    title: '监控时间',
                    dataIndex: 'MonitorTime',
                    key: 'MonitorTime',
                    width: 180,
                    fixed: 'left',
                    align: 'center'
                }, {
                    title: '浓度',
                    dataIndex: 'MonitorValue',
                    key: 'MonitorValue',
                    width: 100,
                    render: (text, record) => (
                        <div style={{ color: record.color}}>{text}</div>
                    ),
                }];

                let allcountrydata = [];
                payload.countrydgimn.map((item, key) => {
                    countryArray.push(item);
                    countryid.push(item.key);
                    columns.push({
                        title: item.label,
                        dataIndex: item.key,
                        key: item.key,
                    });
                    mnlist.push(item.key);
                });

                const result = yield call(maploadMonitorDatalist, {
                    PollutantCode: payload.pollutant,
                    BeginTime: payload.querydate[0].format(payload.dateformat),
                    EndTime: payload.querydate[1].format(payload.dateformat),
                    pageIndex: payload.current,
                    pageSize: size,
                    dataType: payload.monitortype,
                    pointType: payload.pointType,
                    mnlist: mnlist
                });
                if (result != null) {
                    allcountrydata = allcountrydata.concat(result);
                }
                allcountrydata.map((item, key) => {
                    const existdata = chartdata.find((value, index, arr) => {
                        return value.MonitorTime == item.MonitorTime && value.DataGatherCode == item.DataGatherCode;
                    });
                    if (!existdata) {
                        chartdata.push(item);
                    }
                });
                yield update({ columns });
                yield update({ Tablewidth });
                yield update({ countryid });
            } else {
                let dgimn = '';
                let existdata = '';
                let exist = '';
                if (payload.countrydgimn.length < countryArray.length) {
                    countryid = [];
                    countryArray = [];
                    columns = [{
                        title: '监控时间',
                        dataIndex: 'MonitorTime',
                        key: 'MonitorTime',
                        width: 180,
                        fixed: 'left',
                        align: 'center'
                    }, {
                        title: '浓度',
                        dataIndex: 'MonitorValue',
                        key: 'MonitorValue',
                        width: 100,

                        render: (text, record) => (
                            <div style={{ color: record.color}}>{text}</div>
                        ),
                    }];
                    payload.countrydgimn.map((item, key) => {
                        countryArray.push(item);
                        countryid.push(item.key);
                        columns.push({
                            title: item.label,
                            dataIndex: item.key,
                            key: item.key,
                        });
                    });
                } else {
                    payload.countrydgimn.map((item, key) => {
                        existdata = countryid.indexOf(item.key);
                        if (existdata == '-1') {
                            exist = item;
                            dgimn = exist.key;
                        }
                    });
                    if (existdata == '-1') {
                        countryArray.push(exist);
                        countryid.push(exist.key);
                        columns.push({
                            title: exist.label,
                            dataIndex: exist.key,
                            key: exist.key,
                        });
                    }
                }

                Tablewidth = 280 + countryid.length * 100;
                yield update({ countryid, countryArray, Tablewidth, columns});
                if (!dgimn) {
                    yield update({ isfinished: false });
                    return;
                }

                const result = yield call(loadMonitorDatalist, {
                    PollutantCode: payload.pollutant,
                    DGIMN: dgimn,
                    BeginTime: payload.querydate[0].format(payload.dateformat),
                    EndTime: payload.querydate[1].format(payload.dateformat),
                    pageIndex: payload.current,
                    pageSize: size,
                    dataType: payload.monitortype,
                    pointType: payload.pointType,
                });

                if (!payload.isclear) {
                    const resultdata = yield call(loadMonitorDatalist, {
                        PollutantCode: payload.pollutant,
                        DGIMN: payload.dgimn,
                        BeginTime: payload.querydate[0].format(payload.dateformat),
                        EndTime: payload.querydate[1].format(payload.dateformat),
                        pageIndex: payload.current,
                        pageSize: size,
                        dataType: payload.monitortype,
                        pointType: payload.pointType,
                    });
                    const resultda = [];
                    if (resultdata.data != null) {
                        resultdata.data.map((item, key) => {
                            if (payload.monitortype === 'realtime') {
                                resultda.push(item);
                                item.MonitorValue = item[payload.pollutant];
                            } else if (payload.monitortype === 'minute') {
                                item.MonitorValue = item[payload.pollutant];
                                resultda.push(item);
                            } else if (payload.monitortype === 'hour') {
                                item.MonitorValue = item[payload.pollutant];
                                item.MonitorTime = moment(item.MonitorTime).format('YYYY-MM-DD HH');
                                resultda.push(item);
                            } else if (payload.monitortype === 'day') {
                                item.MonitorValue = item[payload.pollutant];
                                item.MonitorTime = moment(item.MonitorTime).format('YYYY-MM-DD');
                                resultda.push(item);
                            }
                        });
                        data = resultda;
                    }
                }
                if (result.data != null) {
                    if (payload.current != 1) {
                        chartdata = result.data.concat(chartdata);
                    } else {
                        chartdata = result.data.concat(chartdata);
                    }
                }
            }
            data.map((item, key) => {
                chartdata.map((citem, ckey) => {
                    if (payload.monitortype == 'hour') {
                        if (item.MonitorTime == moment(citem.MonitorTime).format('YYYY-MM-DD HH')) {
                            item[citem.DataGatherCode] = citem[payload.pollutant];
                        }
                    } else {
                        if (item.MonitorTime == moment(citem.MonitorTime).format('YYYY-MM-DD')) {
                            item[citem.DataGatherCode] = citem[payload.pollutant];
                        }
                    }
                });
            });
            yield update({ data, chartdata, isfinished: false });
        },
        * querypointdata({
            payload,
        }, { call, update, put, select }) {
            const { size } = yield select(_ => _.points);
            const pointType = payload.pointType;
            const PollutantCode = payload.pollutant;

            const result = yield call(loadMonitorDatalist, {
                PollutantCode: payload.pollutant,
                DGIMN: payload.dgimn,
                BeginTime: payload.querydate[0].format(payload.dateformat),
                EndTime: payload.querydate[1].format(payload.dateformat),
                pageIndex: payload.current,
                pageSize: size,
                dataType: payload.monitortype,
                pointType: payload.pointType,
            });
            let resultdata = [];
            const resultda = [];
            if (result.data !== null) {
                result.data.map((item, key) => {
                    if (payload.monitortype === 'realtime') {
                        item.MonitorValue = item[PollutantCode];
                        resultda.push(item);
                    } else if (payload.monitortype === 'minute') {
                        item.MonitorValue = item[PollutantCode];
                        resultda.push(item);
                    } else if (payload.monitortype === 'hour') {
                        item.MonitorValue = item[PollutantCode];
                        item.MonitorTime = moment(item.MonitorTime).format('YYYY-MM-DD HH');
                        resultda.push(item);
                    } else if (payload.monitortype === 'day') {
                        item.MonitorValue = item[PollutantCode];
                        item.MonitorTime = moment(item.MonitorTime).format('YYYY-MM-DD');
                        resultda.push(item);
                    }
                });
            }
            if (payload.current != 1) {
                const { data } = yield select(_ => _.points);
                resultdata = data.concat(resultda);
            } else {
                resultdata = resultda;
            }
            yield update({ data: resultdata, total: result.total, current: payload.current, querydate: payload.querydate, monitortype: payload.monitortype, selpollutant: payload.pollutant, dateformat: payload.dateformat });
            if (payload.countrydgimn) {
                yield put({
                    type: 'querychartpointdata',
                    payload: { ...payload, isclear: true },
                });
            }
        },
        * querypointlastdata({
            payload,
        }, { call, update, put }) {
            const { data: { RealtimeData: lastdata } } = yield call(loadLastdata, { dgimn: payload.itemdata.dgimn });
            yield update({
                selectpoint: payload.itemdata,
                lastdata,
            });
            if (lastdata[0]) {
                yield put({ type: 'queryhourtendency', payload: { pollutant: { PollutantCode: lastdata[0].PollutantCode, PollutantName: lastdata[0].PollutantName, Unit: lastdata[0].Unit } } });
            }
        },
        * queryhourtendency({
            payload,
        }, { call, select, update }) {
            const { selectpoint } = yield select(_ => _.points);
            const result = yield call(loadMonitorDatalist, { PollutantCode: payload.pollutant.PollutantCode,
                DGIMN: selectpoint.dgimn,
                BeginTime: moment().add(-12, 'hours').format('YYYY-MM-DD HH:00:00'),
                EndTime: moment().add(1, 'hours').format('YYYY-MM-DD HH:00:00'),
                pageIndex: 1,
                pageSize: 1000,
                dataType: 'hour',
            });
            const hourtendency = [];
            if (result.data) {
                result.data.map((item, key) => {
                    hourtendency.push({
                        x: moment(item.MonitorTime).format('YYYY-MM-DD HH:00:00'),
                        y: item.AvgValue,
                    });
                });
            }
            yield update({
                hourtendency,
                pollutant: payload.pollutant,
            });
        },
        * querymonitorpoint({
            payload,
        }, { call, select, update }) {
            const { pollutanttype } = yield select(_ => _.global);
            if (payload.pollutantType == null) {
                payload.pollutantType = pollutanttype[0].PollutantTypeCode;
            }
            const result = yield call(loadMonitorPoint, payload);

            const pointlist = result.data;
            yield update({ pointlist });
        },
        * queryentpointdate({
            payload
        }, {call, update}) {
            const result = yield call(queryentpointlist, payload);
            const resultent = yield call(queryentinfolist, payload);
            yield update({ entpointlist: result.data, selectent: resultent.data[0] });
        },
        * querypollutantlist({ payload
        }, { select, call, put, update, take }) {
            const result = yield call(querypollutantlist, payload);
            if (result && result[0]) {
                yield update({ pollutantlist: result });
                const params = {
                    pollutantCode: result[0].pollutantCode,
                    datatype: 'realtime',
                    dgimn: payload.dgimn,
                    pollutantName: result[0].pollutantName,
                    pollutantInfo: result[0]
                };
                
                 //如果请求的是超标数据
                 if(payload.overdata)
                 {
                    yield put({
                        type: 'queryoverdatalist',
                        payload: payload
                    });
                    yield take('queryoverdatalist/@@end');
                 }
                 else
                 {
                    yield put({
                        type: 'queryhistorydatalist',
                        payload: params
                    });
                    yield take('queryhistorydatalist/@@end');
                 }

            } else {
                yield update({ pollutantlist: [],datalist: null, chartdata: null, columns: null, datatable: null, total: 0 });
            }
        },
        * queryhistorydatalist({ payload
        }, {select, call, update}) {
            const { pollutantlist } = yield select(_ => _.points);

            if(!pollutantlist[0])
            {
                yield update({ datalist: null, chartdata: null, columns: null, datatable: null, total: 0 });
                return;
            }
            const resultlist = yield call(queryhistorydatalist, {...payload});
            const result = resultlist.data;
            if (!result) {
                yield update({ datalist: null, chartdata: null, columns: null, datatable: null, total: 0 });
                return;
            }
            let xAxis = [];
            let seriesdata = [];
            let markLine = {};

            result.map((item, key) => {
                xAxis = xAxis.concat(item.MonitorTime);
                seriesdata = seriesdata.concat(item[payload.pollutantCode]);
            });
            let polluntinfo;
            if (payload.pollutantInfo) {
                polluntinfo = payload.pollutantInfo;
            }
            polluntinfo = pollutantlist.find((value, index, arr) => {
                return value.pollutantCode === payload.pollutantCode;
            });
            let pollutantcols = [];
            let tablewidth=0;
            let width= (window.screen.availWidth - 200 - 120)/pollutantlist.length;
            if(width<200)
            {
                width=200;
            }
               

             tablewidth=  width*pollutantlist.length+200;
        
            pollutantlist.map((item, key) => {
                pollutantcols = pollutantcols.concat({
                    title: item.pollutantName + '(' + item.unit + ')',
                    dataIndex: item.pollutantCode,
                    key: item.pollutantCode,
                    align:'center',
                    width: width,
                    render: (value, record, index) => {
                        const additional = record[item.pollutantCode + '_params'];
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
                                </div>);
                                return (<Popover content={content}><span style={{ color: '#ff0000', cursor: 'pointer' }}>{ value || (value === 0 ? 0 : '-') }</span></Popover>);
                            }
                            const content = (<div>
                                <div style={{marginBottom: 10}}>
                                    <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="close-circle" />
                                    <span style={{fontWeight: 'Bold', fontSize: 16}}>数据异常</span>
                                </div>
                                <li style={{listStyle: 'none', marginBottom: 10}}>
                                    <Badge status="warning" text={`异常原因：${additionalInfo[2]}`} />
                                </li>
                            </div>);
                            return (<Popover content={content}><span style={{ color: '#F3AC00', cursor: 'pointer' }}>{value || (value === 0 ? 0 : '-')}</span></Popover>);
                        }
                        return value || (value === 0 ? 0 : '-');
                    }
                });
            });
            let columns = [{
                title: '时间',
                dataIndex: 'MonitorTime',
                key: 'MonitorTime',
                width:200,
                fixed:'left',
                align:'center'
            }];
            columns = columns.concat(pollutantcols);
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
            let option = null;
            if (seriesdata && seriesdata.length > 0) {
                option = {
                    title: {
                        // text: '2018-05-17~2018-05-18'
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
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value',
                        name: '浓度(' + `${payload.pollutantName}` + `${polluntinfo.unit}` + ')',
                        axisLabel: {
                            formatter: '{value}'
                        },
                    },
                     grid:{
                              x:60,
                              y:45,
                              x2:45,
                              y2:20,
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
                    }]
                };
            }

            yield update({ tablewidth,datalist: result, chartdata: option, columns, datatable: result, total: resultlist.total });
        },
        * queryoverdatalist({
            payload
        }, {call, update}) {
            const res = yield call(queryoverdatalist, {...payload});
            if (res.data) {
                let reslist = [];
                res.data.map((item, key) => {
                    reslist = reslist.concat({
                        ...item,
                        overValue: item.value + '(' + item.unit + ')',
                        key: key
                    });
                });
                yield update({ overdata: reslist, overtotal: res.total });
            } else {
                yield update({ overdata: [], overtotal: 0 });
            }
        },
        * queryprocesschart({
            payload
        }, {call, update}) {
            const res = yield call(queryprocesschart, {...payload});
            yield update({ processchart: res });
        },
        * querysinglepointinfo({
            payload
        }, {call, update}) {
            const res = yield call(querysinglepointinfo, {...payload});

            if(res)
            {
                yield update({ selectpoint: res[0] });
            }
            else
            {
                yield update({ selectpoint: null });
            }
        
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, payload }) => {
                if (pathname === '/monitor/map') {
                    const {
                        pollutantType = null,
                        pageIndex = 1,
                        pageSize = 10000,
                    } = payload || {};
                    if (!payload) {
                        dispatch({
                            type: 'querymonitorpoint',
                            payload: {
                                pollutantType,
                                pageIndex,
                                pageSize,
                            },
                        });
                    }
                }
            });
        },
    },
});
