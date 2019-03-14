import React from 'react';
import moment from 'moment';
// import { message } from 'antd';
import {
    Popover,
    Badge,
    Icon,
    Divider,
    message
} from 'antd';
import { mainpollutantInfo, mainpoll, enterpriceid } from "../config";
import {
    querypolluntantentinfolist
} from '../services/api';
import {
    querypollutanttypecode,getPollutantTypeList,
    querydatalist,querylastestdatalist,queryhistorydatalist,
    querypollutantlist
} from '../services/overviewApi';
import { Model } from '../dvapack';
 

export default Model.extend({
    namespace: 'overview',
    state: {
       
        
        dataTemp: [],
        lastestdata: [],
        mainpcol: [],
        detailpcol: [],
        detaildata: [],
        chartdata: [],
        existdata: false,
        gwidth: 0,
        gheight: 0,
        pollutantName: [],
        detailtime: null,
        addtaskstatus: false,
        pollutantTypelist: null,
        entbaseinfo: [],
        selectpoint: null,
        onlypollutantList: [],
        searchName: null,
        selectpollutantTypeCode: 2,
        //数据一览表头
        columns: [],
        data: [],
        //数据一览的参数
        dataOverview:{
            selectStatus:null,
            time: moment(new Date()).add(-1, 'hour'),
            terate:null,
            pointName:null
        },
        mapdetailParams:{
            dataType: 'HourData',
            datatype: 'hour',
            isAsc:true,
            endTime: moment(new Date()).format('YYYY-MM-DD HH:00:00'),
            beginTime: moment(new Date()).add('hour', -23).format('YYYY-MM-DD HH:00:00'),
            pollutantCode:null,
            pollutantName:null
        }

    },
    effects: {
        * querypollutanttypecode({
            payload,
        }, { call, update, put, take,select }) {
            let gwidth = 300 + 140 + 70;
            const {dataOverview,selectpollutantTypeCode}=yield select(a=>a.overview);
            const body = {
                pollutantTypes: selectpollutantTypeCode,
            };
            const data = yield call(querypollutanttypecode, body);
            yield put({
                type: 'getPollutantTypeList',
                payload: {
                },
            });
            yield take('getPollutantTypeList/@@end');
            if (data) {
                gwidth += 200 * data.length;
            }
            yield update({ columns: data, gwidth });
        },
        * querydatalist({
            payload,
        }, { call, update, put, select }) {
            const {dataOverview,selectpollutantTypeCode}=yield select(a=>a.overview); 
            const body={
                time: dataOverview.time,
                pollutantTypes:selectpollutantTypeCode,
                pointName: dataOverview.pointName,
                status: dataOverview.selectStatus,
                terate: dataOverview.terate,
            }
            const data = yield call(querydatalist, body);
            if (payload.map && data) {
                data.map((item) => {
                    item.position = {
                        'longitude': item.longitude,
                        'latitude': item.latitude
                    };
                    item.key = item.DGIMN;
                });
            }
            let { selectpoint } = yield select(_ => _.overview);
            if (selectpoint) {
                const newpoint = data.find(value => value.DGIMN == selectpoint.DGIMN);
                yield update({
                    selectpoint: newpoint
                });
            }


            //手工上传
            if (payload.manualUpload) {
                if (data && data[0]) {
                    if (!payload.search) {
                        let dgimns = '';
                        if (!payload.DGIMN || payload.DGIMN==='[object Object]') {
                            localStorage.setItem('DGIMN', data[0].DGIMN);
                            dgimns = data[0].DGIMN;
                        } else if (payload.change) {
                            localStorage.setItem('DGIMN', data[0].DGIMN);
                            dgimns = data[0].DGIMN;
                        } else {
                            dgimns = payload.DGIMN;
                        }
                        yield put({
                            type: 'manualupload/GetManualSupplementList',
                            payload: {
                                ...payload,
                                DGIMN: dgimns,
                                pointName: data[0].pointName
                            }
                        });
                        //获取绑定下拉污染物
                        yield put({
                            type: 'manualupload/GetPollutantByPoint',
                            payload: {
                                DGIMN: dgimns,
                                PollutantType: payload.pollutantTypeCode
                            }
                        });
                    }
                } else {
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
            if (payload.RepairHistoryList) {
                if (data && data[0]) {
                    if (!payload.search) {
                        if (!payload.DGIMN) {
                            localStorage.setItem('DGIMN', data[0].DGIMN);
                        }
                        yield put({
                            type: 'maintenancelist/GetRepairHistoryList',
                            payload: {
                                ...payload,
                                DGIMN: payload.DGIMN === null ? data[0].DGIMN : payload.DGIMN,
                                data: data
                            }
                        });
                    }

                } else {
                    yield put({
                        type: 'maintenancelist/GetRepairHistoryList',
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
                    if (!payload.search) {
                        if (!payload.DGIMN) {
                            localStorage.setItem('DGIMN', data[0].DGIMN);
                        }
                        yield put({
                            type: 'maintenancelist/GetStopCemsHistoryList',
                            payload: {
                                ...payload,
                                DGIMN: payload.DGIMN === null ? data[0].DGIMN : payload.DGIMN,
                                data: data
                            }
                        });
                    }

                } else {
                    yield put({
                        type: 'maintenancelist/GetStopCemsHistoryList',
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
                    if (!payload.search) {
                        if (!payload.DGIMN) {
                            localStorage.setItem('DGIMN', data[0].DGIMN);
                        }
                        yield put({
                            type: 'maintenancelist/GetConsumablesReplaceHistoryList',
                            payload: {
                                ...payload,
                                DGIMN: payload.DGIMN === null ? data[0].DGIMN : payload.DGIMN,
                                data: data
                            }
                        });
                    }

                } else {
                    yield put({
                        type: 'maintenancelist/GetConsumablesReplaceHistoryList',
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
                    if (!payload.search) {
                        if (!payload.DGIMN) {
                            localStorage.setItem('DGIMN', data[0].DGIMN);
                        }
                        yield put({
                            type: 'maintenancelist/GetStandardGasRepalceHistoryList',
                            payload: {
                                ...payload,
                                DGIMN: payload.DGIMN === null ? data[0].DGIMN : payload.DGIMN,
                                data: data
                            }
                        });
                    }

                } else {
                    yield put({
                        type: 'maintenancelist/GetStandardGasRepalceHistoryList',
                        payload: {
                            ...payload,
                            DGIMN: null
                        }
                    });
                }
            }

            //菜单-巡检记录
            if (payload.InspectionHistoryRecord) {
                if (data && data[0]) {
                    if (!payload.search) {
                        if (!payload.DGIMN) {
                            localStorage.setItem('DGIMN', data[0].DGIMN);
                        }
                        yield put({
                            type: 'maintenancelist/GetInspectionHistoryList',
                            payload: {
                                ...payload,
                                DGIMN: payload.DGIMN === null ? data[0].DGIMN : payload.DGIMN,
                                data: data
                            }
                        });
                    }

                } else {
                    yield put({
                        type: 'maintenancelist/GetInspectionHistoryList',
                        payload: {
                            ...payload,
                            DGIMN: null
                        }
                    });
                }
            }
            //菜单-校准记录
            if (payload.JzHistoryRecord) {
                if (data && data[0]) {
                    if (!payload.search) {
                        if (!payload.DGIMN) {
                            localStorage.setItem('DGIMN', data[0].DGIMN);
                        }
                        yield put({
                            type: 'maintenancelist/GetJzHistoryList',
                            payload: {
                                ...payload,
                                DGIMN: payload.DGIMN === null ? data[0].DGIMN : payload.DGIMN,
                                data: data
                            }
                        });
                    }

                } else {
                    yield put({
                        type: 'maintenancelist/GetJzHistoryList',
                        payload: {
                            ...payload,
                            DGIMN: null
                        }
                    });
                }
            }
            //菜单-检验测试记录
            if (payload.BdHistoryInfoHistoryRecord) {
                if (data && data[0]) {
                    if (!payload.search) {
                        if (!payload.DGIMN) {
                            localStorage.setItem('DGIMN', data[0].DGIMN);
                        }
                        yield put({
                            type: 'maintenancelist/GetBdTestHistoryList',
                            payload: {
                                ...payload,
                                DGIMN: payload.DGIMN === null ? data[0].DGIMN : payload.DGIMN,
                                data: data
                            }
                        });
                    }

                } else {
                    yield put({
                        type: 'maintenancelist/GetBdTestHistoryList',
                        payload: {
                            ...payload,
                            DGIMN: null
                        }
                    });
                }
            }

            //菜单-异常记录
            if (payload.DeviceExceptionListHistoryRecord) {
                if (data && data[0]) {
                    if (!payload.search) {
                        if (!payload.DGIMN) {
                            localStorage.setItem('DGIMN', data[0].DGIMN);
                        }
                        yield put({
                            type: 'maintenancelist/GetDeviceExceptionHistoryList',
                            payload: {
                                ...payload,
                                DGIMN: payload.DGIMN === null ? data[0].DGIMN : payload.DGIMN,
                                data: data
                            }
                        });
                    }

                } else {
                    yield put({
                        type: 'maintenancelist/GetDeviceExceptionHistoryList',
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
                    if (!payload.search) {
                        if (!payload.DGIMN) {
                            localStorage.setItem('DGIMN', data[0].DGIMN);
                        }
                        yield put({
                            type: 'tasklist/GetYwdsj',
                            payload: {
                                ...payload,
                                DGIMN: payload.DGIMN === null ? data[0].DGIMN : payload.DGIMN,
                                data: data
                            }
                        });
                    }
                } else {
                    yield put({
                        type: 'tasklist/GetYwdsj',
                        payload: {
                            ...payload,
                            DGIMN: null
                        }
                    });
                }
            }

            //菜单-工艺流程图
            if (payload.ProcessFlowDiagram) {
                if (data && data[0]) {
                    if (!payload.search) {
                        if (!payload.DGIMN) {
                            localStorage.setItem('DGIMN', data[0].DGIMN);
                        }
                        yield put({
                            type: 'points/queryrealparam',
                            payload: {
                                dgimn: payload.DGIMN === null ? data[0].DGIMN : payload.DGIMN,
                            }
                        });
                    }

                } else {
                    yield put({
                        type: 'points/queryrealparam',
                        payload: {
                            dgimn: null
                        }
                    });
                }
            }

            //菜单-运维日历
            if (payload.OperationCalendar) {
                if (data && data[0]) {
                    if (!payload.search) {
                        if (!payload.DGIMN) {
                            localStorage.setItem('DGIMN', data[0].DGIMN);
                        }
                        yield put({
                            type: 'workbenchmodel/getOperationCalendarData',
                            payload: {
                                IsQueryAllUser: true,
                                DGIMNs: payload.DGIMN === null ? data[0].DGIMN : payload.DGIMN,
                                beginTime: payload.beginTime,
                                endTime: payload.endTime,
                            }
                        });
                    }

                } else {
                    yield put({
                        type: 'workbenchmodel/getOperationCalendarData',
                        payload: {
                            DGIMNs: '1',
                            IsQueryAllUser: true,
                        }
                    });
                }
            }
            yield update({ data });
            yield update({ dataTemp: data });
            if (payload.callback === undefined) {
            } else {
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
                    title: `${item.pollutantName
                    }(${item.unit})`,
                    dataIndex: item.pollutantCode,
                    key: item.pollutantCode,
                    align: 'center',
                    render: (value, record, index) => {
                        const additional = record[`${item.field}_params`];
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
        }, { call, update, put, take,select }) {

            const {selectpoint,selectpollutantTypeCode,mapdetailParams}=yield select(a=>a.overview);
            const pollutantInfoList = mainpoll.find(value => value.pollutantCode == selectpollutantTypeCode);
            // 地图详细表格列头
            let detailpcol = [{
                title: '因子',
                dataIndex: 'pollutantName',
                key: 'pollutantName',
                align: 'center',
            }, {
                title: `浓度(${pollutantInfoList.unit})`,
                dataIndex: 'pollutantCode',
                key: 'pollutantCode',
                align: 'center',
                render: (value, record, index) => {
                    if(selectpoint.stop)
                    {
                        return "停产"
                    }
                    const additional = record.pollutantCodeParam;
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
            }
            ];
            if (pollutantInfoList.zspollutant) {
                detailpcol = detailpcol.concat({
                    title: `折算(${pollutantInfoList.unit})`,
                    dataIndex: 'zspollutantCode',
                    key: 'zspollutantCode',
                    align: 'center',
                    render: (value, record, index) => {
                        if(selectpoint.stop)
                        {
                            return "停产"
                        }
                        const additional = record.zspollutantCodeParam;
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
            }

            let detaildata = [];
            let detailtime = null;
            const body = {
                dataType: mapdetailParams.dataType,
                DGIMNs: selectpoint.DGIMN,
                isLastest: true
            };
            const res = yield call(querylastestdatalist, body);
            if (res.data && res.data[0]) {
                detailtime = res.data[0].MonitorTime;
                pollutantInfoList.pollutantInfo.map(item => {
                    detaildata.push(
                        {
                            pollutantName: item.pollutantName,
                            pollutantCode: res.data[0][item.pollutantCode] ? res.data[0][item.pollutantCode] : '-',
                            pollutantCodeParam: res.data[0][`${item.pollutantCode}_params`],
                            zspollutantCode: pollutantInfoList.zspollutant ? res.data[0][item.zspollutantCode] === 0 || res.data[0][item.zspollutantCode] ?
                                res.data[0][item.zspollutantCode] : '-' : '-',
                            zspollutantCodeParam: res.data[0][`${item.zspollutantCode}_params`],
                            dgimn: payload.dgimn,
                            pcode: item.pollutantCode,
                        },
                    );
                });
            }
            yield update({
                detailtime,
                detaildata,
                detailpcol,
            });
            yield put({
                type: 'queryoptionDataOnClick',
                payload: {
                    ...payload,
                    isAsc:true
                }
            });
            yield take('queryoptionDataOnClick/@@end');
        },
        * queryoptionDataOnClick({ payload }, {
            call, update,select
        }) {
            const {mapdetailParams,selectpoint,selectpollutantTypeCode}=yield select(a=>a.overview);
            const body = {
                DGIMNs: selectpoint.DGIMN,
                datatype: mapdetailParams.datatype,
                beginTime: mapdetailParams.beginTime,
                endTime: mapdetailParams.endTime,
                isAsc:mapdetailParams.isAsc
            };
            const pollutantparams = {
                DGIMNs: selectpoint.DGIMN
            };
            const resultlist = yield call(queryhistorydatalist, body);
            const pollutantlist = yield call(querypollutantlist,pollutantparams);
            let seriesdata = [];
            let zsseriesdata = [];
            let xData = [];
            if (resultlist && resultlist.data) {
                resultlist.data.map(item => {
                    const time = moment(item.MonitorTime).hour();
                    xData = xData.concat(time);
                    seriesdata = seriesdata.concat(item[mapdetailParams.pollutantCode]);
                    zsseriesdata = zsseriesdata.concat(item[`zs${mapdetailParams.pollutantCode}`]);
                });
            }
            //污染物标准线的组织;
            let polluntinfo;
            let zspolluntinfo;
            let markLine = {};
            let zsmarkLine = {};
            if (pollutantlist) {
                polluntinfo = pollutantlist.find((value, index, arr) => value.pollutantCode === mapdetailParams.pollutantCode);
                zspolluntinfo = pollutantlist.find((value, index, arr) => value.pollutantCode === `zs${mapdetailParams.pollutantCode}`);
            }
            if (polluntinfo && polluntinfo.standardValue) {
                markLine = {
                    symbol: 'none', // 去掉警戒线最后面的箭头
                    data: [{
                        lineStyle: {
                            type: 'dash',
                            color: '#54A8FF',
                        },
                        yAxis: polluntinfo.standardValue
                    }]
                };
            }
            if (zspolluntinfo && zspolluntinfo.standardValue) {
                zsmarkLine = {
                    symbol: 'none', // 去掉警戒线最后面的箭头
                    data: [{
                        lineStyle: {
                            type: 'dash',
                            color: '#FF00FF',
                        },
                        yAxis: zspolluntinfo.standardValue
                    }]
                };
            }
            let existdata = true;
            if ((!seriesdata[0] && seriesdata[0]!=0) && (!zsseriesdata[0] && zsseriesdata[0]!=0)) {
                existdata = false;
            }
            const pollutantInfoList = mainpoll.find(value => value.pollutantCode == selectpollutantTypeCode);
            let legend = [mapdetailParams.pollutantName];
            if (pollutantInfoList.zspollutant) {
                legend.push(`折算${mapdetailParams.pollutantName}`);
            }
            const option = {
                legend: {
                    data: legend
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function(params, ticket, callback) {
                        console.log(params);
                        let res = `${params[0].axisValue}时<br/>`;
                        params.map(item => {
                            res += `${item.seriesName}:${item.value}<br />`;
                        });
                        return res;
                    }
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
                    name: mapdetailParams.pollutantName,
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
                    name: `折算${mapdetailParams.pollutantName}`,
                    data: zsseriesdata,
                    markLine: zsmarkLine,
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
                pollutantName: mapdetailParams.pollutantName,
            });
        },
     
       
        //获取系统污染物类型
        * getPollutantTypeList({
            payload
        }, { call, update, put, take }) {
            const res = yield call(getPollutantTypeList, payload);
            if (res) {
                yield update({
                    pollutantTypelist: res
                });
                yield put({
                    type: 'querydatalist',
                    payload: {
                        ...payload,
                    },
                });
                yield take('querydatalist/@@end');
            } else {
                yield update({
                    pollutantTypelist: null
                });
            }
        },
        //获取企业信息
        * queryentdetail({
            payload,
        }, { call, update, put, take }) {
            const entbaseinfo = yield call(querypolluntantentinfolist, { parentID: enterpriceid });
            yield update({ entbaseinfo: entbaseinfo });
            yield put({
                type: 'getPollutantTypeList',
                payload: {
                    ...payload,
                },
            });
            yield take('getPollutantTypeList/@@end');
        },
    }
});
