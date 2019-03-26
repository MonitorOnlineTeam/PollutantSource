import moment from 'moment';
import React from 'react';
import { Icon, Popover, Badge } from 'antd';
import {queryoverdatalist,querysinglepointinfo,queryrealparam} from '../services/pointApi'
    import {querypollutantlist,queryhistorydatalist}from '../services/overviewApi';
import {getList} from '../services/videodata';
import { Model } from '../dvapack';

export default Model.extend({
    namespace: 'points',
    state: {
        tablist: [
            { key: 'processflowdiagram', tab: '工艺流程图' },
            { key: 'dataquery', tab: '数据查询' },
            { key: 'alarmrecord', tab: '报警记录' },
            { key: 'realvideo', tab: '实时视频' },
            { key: 'hisvideo', tab: '历史视频' },
            { key: 'ywdsjlist', tab: '运维大事记' },
            { key: 'qcontrollist', tab: '质控记录' },
            { key: 'operationlist', tab: '运维记录' },
        ],
        selectpoint: [],
        pollutantlist: [],
        datalist: [],
        chartdata: null,
        columns: [],
        datatable: [],
        total: 0,
        overdata: [],
        overtotal: 0,
        processchart: {},
        tablewidth:0,
        operationInfo:null,
        stateInfo:null,
        paramsInfo:null,
        dataInfo:null,
        stateNameInfo:null,
        paramNameInfo:null,
        paramstatusInfo:null,
        DGIMN:'',
        historyparams:{
            datatype: "realtime",
            DGIMNs:null,
            pageIndex:null,
            pageSize:null,
            beginTime:null,
            endTime:null,
            payloadpollutantCode:null, 
            payloadpollutantName:null,
            isAsc:true
        },
        overdataparams:{
            DGIMN: null,
            pollutantCode: null,
            beginTime: moment(new Date()).add(-1, 'month').format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            pageIndex: 1,
            pageSize: 15
        }
    },
    effects: {
        * querypollutantlist({ payload
        }, { select, call, put, update, take }) {
            const body={
                DGIMNs:payload.dgimn
            }
            const result = yield call(querypollutantlist, body);
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
                if(payload.overdata) {
                    yield put({
                        type: 'queryoverdatalist',
                        payload: payload
                    });
                    yield take('queryoverdatalist/@@end');
                } else {
                    yield put({
                        type: 'queryhistorydatalist',
                        payload: payload
                    });
                    yield take('queryhistorydatalist/@@end');
                }
            } else {
                yield update({ pollutantlist: [],datalist: null, chartdata: null, columns: null, datatable: null, total: 0 });
            }
        },
        * queryhistorydatalist({ 
            payload
        }, {select, call, update}) {
            let { pollutantlist,historyparams } = yield select(_ => _.points);

            if(!pollutantlist[0]) {
                yield update({ datalist: null, chartdata: null, columns: null, datatable: null, total: 0 });
                return;
            }
            if(payload.dgimn)
            {
                historyparams.DGIMNs=payload.dgimn;
            }
            //如果是初次加载的话
            if(!historyparams.payloadpollutantCode && pollutantlist.length>0)
            {
                historyparams.payloadpollutantCode=pollutantlist[0].pollutantCode;
                historyparams.payloadpollutantName=pollutantlist[0].pollutantName;
            }
            const resultlist = yield call(queryhistorydatalist, historyparams);
            debugger;
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
                seriesdata = seriesdata.concat(item[historyparams.payloadpollutantCode]);
            });
            let polluntinfo = pollutantlist.find((value, index, arr) =>
             value.pollutantCode === historyparams.payloadpollutantCode);
            let pollutantcols = [];
            let tablewidth=0;
            let width= (window.screen.availWidth - 200 - 120)/pollutantlist.length;
            if(width<200) {
                width=200;
            }
            tablewidth= width*pollutantlist.length+200;
            pollutantlist.map((item, key) => {
                pollutantcols = pollutantcols.concat({
                    title: `${item.pollutantName }(${ item.unit })`,
                    dataIndex: item.pollutantCode,
                    key: item.pollutantCode,
                    align:'center',
                    width: width,
                    render: (value, record, index) => {
                        const additional = record[`${item.pollutantCode }_params`];
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
                        name: '浓度(' + `${historyparams.payloadpollutantName}` + `${polluntinfo.unit?polluntinfo.unit:''}` + ')',
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
                        name: historyparams.payloadpollutantName,
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
        }, {call, update,select}) {
            debugger;
            let {overdataparams}=yield select(a=>a.points);
            if(payload.dgimn)
            {
                overdataparams.DGIMN=payload.dgimn;
            }
            const res = yield call(queryoverdatalist, overdataparams);

            if (res.data) {
                let reslist = [];
                res.data.map((item, key) => {
                    reslist = reslist.concat({
                        ...item,
                        overValue: item.value,
                        key: key
                    });
                });
                yield update({ overdata: reslist, overtotal: res.total });
            } else {
                yield update({ overdata: [], overtotal: 0 });
            }
        },
        * querysinglepointinfo({
            payload
        }, {call, update,put,take}) {
            const body={
                DGIMNs:payload.dgimn
            }
            const res = yield call(querysinglepointinfo, body);
            if(res) {
                yield update({ selectpoint: res[0] });
            } else {
                yield update({ selectpoint: null });
            }
            if(payload.isfirst) {
                yield put({
                    type:'overview/getPollutantTypeList',
                    payload:{
                        ...payload,
                        dgimn:null
                    }
                });
                yield take('overview/getPollutantTypeList/@@end');
            }
        },
        * queryrealparam({
            payload
        }, {call, update}) {
            const body={
                DGIMN:payload.dgimn
            }
            const res = yield call(queryrealparam, body);
            if(res) {
                yield update({
                    operationInfo:res.operationInfo,
                    stateInfo:res.stateInfo,
                    paramsInfo:res.paramsInfo,
                    dataInfo:res.dataInfo,
                    stateNameInfo:res.stateNameInfo,
                    paramNameInfo:res.paramNameInfo,
                    paramstatusInfo:res.paramstatusInfo
                });
            }
        },
        * updateVideoMenu({ payload }, {select, call, update}) {
            const res = yield call(getList, {...payload});
            if(!res.data) {
                const { tablist } = yield select(_ => _.points);
                let newtablist=tablist.filter(t=>t.key!=="realvideo"&&t.key!=="hisvideo");
                yield update({
                    tablist:newtablist
                });
            }
        },
    },
    reducers: {
        //更新工艺流程图的实时数据
        updateRealTimeData(state, { payload }) {
            if (payload && payload.array) {
                const {selectpoint,dataInfo}=state;
                let resdata = JSON.parse(JSON.stringify(dataInfo));
                if(selectpoint && selectpoint.DGIMN && resdata) {
                    payload.array.map(item=>{
                        if(item.DGIMN==selectpoint.DGIMN) {
                            resdata[item.PollutantCode]=item.MonitorValue;
                        }
                    });

                    return {
                        ...state,
                        dataInfo:resdata
                    };
                }
                return state;
            }

        },
        //更新工艺流程图参数信息
        updateDynamicControlParam(state, { payload }) {
            if (payload && payload.array) {
                const { paramsInfo,selectpoint,paramstatusInfo } = state;
                //污染物参数
                let resparamsInfo=JSON.parse(JSON.stringify(paramsInfo));
                //系统参数
                let resparamstatusInfo=JSON.parse(JSON.stringify(paramstatusInfo));
                if(selectpoint && resparamsInfo && resparamstatusInfo) {
                    payload.array.map(item=>{
                        if(item.DGIMN==selectpoint.DGIMN) {
                            if(item.PollutantCode!='cems') {
                                resparamsInfo[`${item.PollutantCode}-${ item.StateCode}`]=item.NewStateValue;
                            } else {
                                resparamstatusInfo[item.StateCode]=item.NewStateValue;
                            }
                        }
                    });
                    return {
                        ...state,
                        paramsInfo:resparamsInfo,
                        paramstatusInfo:resparamstatusInfo
                    };
                }
                return state;
            }

        },
        //更新工艺流程图系统状态信息
        updateDynamicControlState(state, { payload }) {
            if (payload && payload.array) {
                const { stateInfo,stateNameInfo,selectpoint } = state;
                let resstateInfo=JSON.parse(JSON.stringify(stateInfo));
                if(selectpoint && resstateInfo) {
                    payload.array.map(item=>{
                        if(item.DGIMN==selectpoint.DGIMN) {
                            const stateName=stateNameInfo[item.Code];
                            if(stateName) {
                                resstateInfo[item.Code]=stateName+item.State;
                            }
                        }
                    });
                    return {
                        ...state,
                        stateInfo:resstateInfo,
                    };
                }
                return state;
            }

        },

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
