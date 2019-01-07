
import React, { Component } from 'react';
import { Map, Markers } from 'react-amap';
import { Row, Col,Card,List, Spin,Table,Calendar, Badge,Tag,Icon,Button,Tabs,Divider,Modal } from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { amapKey } from '../../config';
import PollutantSelect from '../../components/PointDetail/PollutantSelect';
import styles from './index.less';

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;
/*
页面：工作台
add by cg 18.6.8
modify by wjw 18.12.24
*/

const gridStyle = {
    width: '50%',
    textAlign: 'center',
    height: '200px'
};

function getMonthData(value) {
// if (value.month() === 8) {
//   return 1394;
// }
}

function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}


const MarkerLayoutStyle={
    minWidth:150,
    position:'absolute',
    backgroundColor:'white',
    height:50,
    top:-55,
    left:-63,
    textAlign:'center',
    borderRadius:'10%',
    lineHeight:'50px'
};
const pageUrl = {
    updateState: 'workbenchmodel/updateState',
    getOperationData: 'workbenchmodel/getOperationData',
    getExceptionAlarmData: 'workbenchmodel/getExceptionAlarmData',
    getRateStatisticsData: 'workbenchmodel/getRateStatisticsData',
    getNetworkeRateData: 'workbenchmodel/getNetworkeRateData',
    getEquipmentoperatingRateData: 'equipmentoperatingrate/getData',
    getTransmissionefficiencyRateData:'transmissionefficiency/getData',
    getDataOverWarningData:'workbenchmodel/getDataOverWarningData',
    getAllPointOverDataList:'workbenchmodel/getAllPointOverDataList',
    getOverPointList:'workbenchmodel/getOverPointList',
    getStatisticsPointStatus:'workbenchmodel/getStatisticsPointStatus',
    getRealTimeWarningDatas:'workbenchmodel/getRealTimeWarningDatas',
    getPollutantList:'points/querypollutantlist'
};
@connect(({
    loading,
    workbenchmodel,
    transmissionefficiency,
    equipmentoperatingrate,
    points
}) => ({
    loadingOperationData: loading.effects[pageUrl.getOperationData],
    loadingExceptionAlarm:loading.effects[pageUrl.getExceptionAlarmData],
    loadingRateStatistics:loading.effects[pageUrl.getRateStatisticsData],
    loadingNetworkeRate:loading.effects[pageUrl.getNetworkeRateData],
    loadingEquipmentoperatingRate:loading.effects[pageUrl.getEquipmentoperatingRateData],
    loadingTransmissionefficiencyRate:loading.effects[pageUrl.getTransmissionefficiencyRateData],
    loadingDataOverWarning:loading.effects[pageUrl.getDataOverWarningData],
    loadingAllPointOverDataList:loading.effects[pageUrl.getAllPointOverDataList],
    loadingOverPointList:loading.effects[pageUrl.getOverPointList],
    operation: workbenchmodel.operation,
    exceptionAlarm: workbenchmodel.exceptionAlarm,
    rateStatistics: workbenchmodel.rateStatistics,
    networkeRateList: workbenchmodel.networkeRateList,
    equipmentoperatingRateTableDatas: equipmentoperatingrate.tableDatas,
    transmissionefficiencyRateTableDatas:transmissionefficiency.tableDatas,
    hourDataOverWarningList:workbenchmodel.hourDataOverWarningList,
    allPointOverDataList:workbenchmodel.allPointOverDataList,
    overPointList:workbenchmodel.overPointList,
    statisticsPointStatus:workbenchmodel.statisticsPointStatus,
    pollutantList: points.pollutantlist,
    warningDetailsDatas: workbenchmodel.warningDetailsDatas
}))
class SpecialWorkbench extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultDateValue:moment(),
            selectedValue: moment(),
            visibleModal:false,
            clickThisPointName:''
        };
    }

    componentWillMount() {
        this.getOperationData(1);
        this.getExceptionAlarmData(1);
        this.getRateStatisticsData();
        this.getNetworkeRateData();
        this.getEquipmentoperatingRateData();
        this.getTransmissionefficiencyRateData();
        this.getDataOverWarningData();
        this.getAllPointOverDataList();
        this.getOverPointList();
        this.getStatisticsPointStatus();


    }

    /**
     * 更新model中的state
     */
    updateState = (payload) => {
        this.props.dispatch({
            type: pageUrl.updateState,
            payload: payload,
        });
    }

    /**
     * 根据排口获取污染物
     */
    getPollutantList = (mn) => {
        this.props.dispatch({
            type: pageUrl.getPollutantList,
            payload: {
                dgimn: mn
            }
        });
    }

    /**
     * 智能监控_实时预警详情
     */
    getRealTimeWarningDatas = () =>{
        this.props.dispatch({
            type: pageUrl.getRealTimeWarningDatas,
            payload: {},
        });
    }

    /**
     * 智能监控_排口的所有状态_更新数据
     */
    getStatisticsPointStatus = () =>{
        this.props.dispatch({
            type: pageUrl.getStatisticsPointStatus,
            payload: {},
        });
    }

    /**
     * 智能监控_当前超标排口_更新数据
     */
    getOverPointList = () =>{
        this.props.dispatch({
            type: pageUrl.getOverPointList,
            payload: {},
        });
    }

    /**
     * 智能监控_排口超标汇总_更新数据
     */
    getAllPointOverDataList = () =>{
        this.props.dispatch({
            type: pageUrl.getAllPointOverDataList,
            payload: {},
        });
    }

    /**
     * 智能监控_当小时预警消息_更新数据
     */
    getDataOverWarningData = () =>{
        this.props.dispatch({
            type: pageUrl.getDataOverWarningData,
            payload: {},
        });
    }

    /**
     * 智能质控_率的统计_更新数据
     */
    getRateStatisticsData = () =>{
        this.props.dispatch({
            type: pageUrl.getRateStatisticsData,
            payload: {},
        });
    }

    /**
     * 智能质控_排口联网率_更新数据
     */
    getNetworkeRateData = () =>{
        this.props.dispatch({
            type: pageUrl.getNetworkeRateData,
            payload: {},
        });
    }

    /**
     * 智能质控_排口设备运转率_更新数据
     */
    getEquipmentoperatingRateData = (pageIndex) =>{
        this.props.dispatch({
            type: pageUrl.getEquipmentoperatingRateData,
            payload: {
                pageIndex: pageIndex||1,
            }
        });
    }

    /**
     * 智能质控_排口传输有效率_更新数据
     */
    getTransmissionefficiencyRateData = (pageIndex) =>{
        this.props.dispatch({
            type: pageUrl.getTransmissionefficiencyRateData,
            payload: {
                pageIndex: pageIndex||1,
            }
        });
    }

    /**
     * 智能质控_异常报警_更新数据
     */
    getExceptionAlarmData = (pageIndex) =>{
        this.props.dispatch({
            type: pageUrl.getExceptionAlarmData,
            payload: {},
        });
    }

    /**
     * 智能质控_渲染异常报警数据列表
     */
    renderExceptionAlarmList = ()=>{
        //console.log('exceptionAlarm:',this.props.exceptionAlarm);
        const listData = [];
        const colorArray={
            "数据异常":"magenta",
            "参数异常":"red",
            "逻辑异常":"volcano",
            "状态异常":"orange"
        };
        this.props.exceptionAlarm.tableDatas.map((item)=>{
            //判断报警是否超过4小时
            const seconds=moment().diff(moment(item.FirstAlarmTime), 'minutes');
            const hour=Math.floor(seconds/60);
            const minutes=Math.floor(seconds%60);
            const color = hour>= 4 ? 'red':'rgb(129,203,237)';
            const minutesLable=minutes>0?`${minutes}分钟`:'';

            const labelDiv=<div style={{color:`${color}`}}>已发生{hour}小时{minutesLable}</div>;
            const btnDiv=hour>= 4 ?(<div style={{marginTop:43}}>
                <Button style={{width:100,border:'none',backgroundColor:'rgb(74,210,187)'}} type="primary">督办</Button>
            </div>):'';
            listData.push({
                href: 'http://ant.design',
                title: `${item.PointName}`,
                avatar: (<Icon type="alert" theme="twoTone" />),
                description: (<div>
                    <div>
                        {
                            item.ExceptionTypes.split(',').map(item => (
                                <Tag color={`${colorArray[item]}`}>{item}</Tag>
                            ))
                        }
                    </div>
                    <div style={{marginTop:10}}>
                        <div>{item.LastAlarmMsg}</div>
                        {/* <div>首次报警时间：2018-12-27</div>
                        <div>报警总次数：<span style={{fontWeight:'bold'}}>98</span></div> */}
                    </div>
                              </div>),
                content: '',
                extra:(
                    <div style={{marginTop:30,marginRight:70,textAlign:'center'}}>
                        {labelDiv}
                        {btnDiv}
                    </div>
                )
            });
        });
        return (<List
            itemLayout="vertical"
            // size="large"
            dataSource={listData}
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[]}
                    extra={item.extra}
                >
                    <List.Item.Meta
                        // avatar={<div>{item.avatar}</div>}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />);
    }

    /**
     * 智能运维_更新运维数据
     */
    getOperationData = (pageIndex) =>{
        this.props.dispatch({
            type: pageUrl.getOperationData,
            payload: {},
        });
    }

    /**
     * 智能运维_渲染运维历史记录表格
     */
    renderOperationTable = ()=>{
        const columns = [
            {
                title: '排口名称',
                dataIndex: 'PointName',
                render: (text, record) => {
                    // debugger;
                    if(record.TaskType===2)
                        return <div style={{position:'relative'}}>{text}<Tag style={{position:'absolute',top:-10}} color="#faad14">应急</Tag></div>;

                    return text;

                }
            },
            {
                title: '运维状态',
                dataIndex: 'ExceptionTypeText',
                render: (text, record) => {
                    // debugger;
                    if(!text)
                        return <Tag color="rgb(76,205,122)">正常</Tag>;

                    return (
                        <div>
                            {
                                text.split(',').map(item => (
                                    <Tag color="rgb(244,6,94)">{item}</Tag>
                                ))
                            }
                        </div>
                    );

                }
            },
            {
                title: '运维人',
                dataIndex: 'OperationName',
            }, {
                title: '操作',
                dataIndex: 'opt',
                render: (text, record) => (
                    <a onClick={
                        () => this.props.dispatch(routerRedux.push(`/TaskDetail/EmergencyDetailInfo/workbench/nop/${record.TaskID}`))
                    }
                    > 详情
                    </a>
                )
            }];

        return <Table
            columns={columns}
            dataSource={this.props.operation.tempTableDatas.filter(m=>moment(m.CreateTime).format('YYYY-MM-DD')===this.state.selectedValue.format("YYYY-MM-DD"))}
            size="small"
            pagination={{ pageSize: 5 }}
        />;
    }

    /**
     * 智能运维_日历表时间选择事件
     */
    onCalendarSelect = (value) => {
        // debugger;
        let selectValue = value.format('YYYY-MM-DD 00:00:00');
        this.setState({
            // value,
            defaultDateValue:value,
            selectedValue: value
        });
        if(value.format("YYYY-MM")===this.state.selectedValue.format("YYYY-MM")) {
            return null;
        }

        if(value.format("YYYY-MM")!==moment(this.props.operation.beginTime).format("YYYY-MM")) {
            this.updateState({
                operation:{
                    ...this.props.operation,
                    ...{
                        beginTime: moment(selectValue).add(-1,'months').format('YYYY-MM-01 00:00:00'),
                        endTime: moment(selectValue).add(2,'months').format('YYYY-MM-01 00:00:00'),
                    }
                }
            });
            this.getOperationData(1);
        }
    }

    /**
     * 智能运维_日历表插件基础渲染
     */
    renderCalendar = () =><Calendar value={this.state.defaultDateValue} fullscreen={false} onSelect={this.onCalendarSelect} dateCellRender={this.dateCellRender} monthCellRender={monthCellRender} />

    /**
     * 智能运维_日历表插件渲染任务数据
     */
    dateCellRender = (value) =>{
        let listData=[];
        let thisData=this.props.operation.tempTableDatas.filter(m=>moment(m.CreateTime).format('YYYY-MM-DD')===value.format("YYYY-MM-DD"));
        if(thisData&&thisData.length>0) {
            let ExceptionTypeText=thisData.filter(m=>m.ExceptionTypeText!=="");
            if(ExceptionTypeText&&ExceptionTypeText.length>0) {
                listData = [{ type: 'warning', content: '' }];
            }else {
                listData = [{ type: 'success', content: '' }];
            }
        }

        return (
            <ul className="events">
                {
                    listData.map(item => (
                        <li key={item.content}>
                            <Badge status={item.type} text={item.content} />
                        </li>
                    ))
                }
            </ul>
        );
    }

    /**
     * 智能质控_渲染图表
     */
    getOption = (type) => {
        //console.log('rateStatistics',this.props.rateStatistics);
        const {model}=this.props.rateStatistics;
        let networkeRate=(parseFloat(model.NetworkeRate) * 100).toFixed(2);
        let runningRate=(parseFloat(model.RunningRate) * 100).toFixed(2);
        let transmissionEffectiveRate=(parseFloat(model.TransmissionEffectiveRate) * 100).toFixed(2);

        let legendData=[];
        let color=[];
        let seriesName='';
        let seriesData=[];
        if(type===1) {
            legendData=['正常','离线'];
            color=['rgb(245,68,66)','rgb(160,6,1)'];
            seriesName='实时联网率';
            seriesData=[//(parseFloat(model.NetworkeRate) * 100).toFixed(2)
                {value:networkeRate, name:'正常'},
                {value:100-networkeRate, name:'离线'}
            ];
        }else if(type===2) {
            legendData=['达标','未达标'];
            color=['rgb(73,226,124)','rgb(48,155,86)'];
            seriesName='设备运转率';
            seriesData=[
                {value:runningRate, name:'达标'},
                {value:(100-runningRate).toFixed(2), name:'未达标'}
            ];
        }else {
            legendData=['达标','未达标'];
            color=['rgb(245,68,66)','rgb(160,6,1)'];
            seriesName='传输有效率';
            seriesData=[
                {value:transmissionEffectiveRate, name:'达标'},
                {value:(100-transmissionEffectiveRate).toFixed(2), name:'未达标'}
            ];
        }
        let option = {
            color: color,
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:legendData
            },
            series: [
                {
                    name:seriesName,
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,

                    itemStyle : {
                        normal : {
                            label : {
                                // formatter : function (params){
                                //     return params.value + '% <br/>详情情况';
                                // },
                                formatter: "{b}: {c}%",
                                textStyle: {
                                    baseline : 'top'
                                }
                            }
                        },
                    },
                    data:seriesData
                }
            ]
        };
        return option;
    }

    /**
     * 智能运维_日期面板改变事件(TODO:后续)
     */
    onPanelChange = (value, mode)=>{
        //console.log(value, mode);
    }

    /**
     * 智能质控_渲染排口联网率表格
     */
    renderNetWorkingRateTable = () =>{
        const columns = [
            {
                title: '排口名称',
                dataIndex: 'PointName'
            },
            {
                title: '联网率',
                dataIndex: 'RateValue',
                render: (text, record) => {
                    if(text===100)
                        return `${(parseFloat(text) * 100).toFixed(2) }%`;
                    // return <Tag color="rgb(244,6,94)">离线</Tag>;
                    return <span style={{color:'red'}}>离线</span>;
                }
            }];

        return <Table loading={this.props.loadingNetworkeRate} columns={columns} dataSource={this.props.networkeRateList.tableDatas.slice(0,3)} size="small" pagination={false} />;
    }

    /**
     * 智能质控_渲染排口设备运转率表格
     */
    renderEquipmentoperatingRateTable = () =>{
        const columns = [
            {
                title: '排口名称',
                dataIndex: 'PointName'
            },
            {
                title: '设备运转率',
                dataIndex: 'RunningRate',
                render: (text, record) => `${(parseFloat(text) * 100).toFixed(2) }%`
            }];

        return <Table loading={this.props.loadingEquipmentoperatingRate} columns={columns} dataSource={this.props.equipmentoperatingRateTableDatas.slice(0,3)} size="small" pagination={false} />;
    }

    /**
     * 智能质控_渲染排口传输有效率表格
     */
    renderTransmissionefficiencyRateTable = () =>{
        const columns = [
            {
                title: '排口名称',
                dataIndex: 'PointName'
            },
            {
                title: '传输有效率',
                dataIndex: 'TransmissionEffectiveRate',
                render: (text, record) => `${(parseFloat(text) * 100).toFixed(2) }%`
            }];

        return <Table loading={this.props.loadingTransmissionefficiencyRate} columns={columns} dataSource={this.props.transmissionefficiencyRateTableDatas.slice(0,3)} size="small" pagination={false} />;
    }

    /**
     * 智能监控_渲染当小时预警数据列表
     */
    renderHourDataOverWarningList = ()=>{
        console.log('hourDataOverWarningList:',this.props.hourDataOverWarningList);
        const listData = [];

        this.props.hourDataOverWarningList.tableDatas.map((items)=>{
            //判断报警是否超过4小时
            listData.push({
                title:`${items.PointName}`,
                description:(
                    <div>
                        {
                            items.OverWarnings.map(item => (
                                <div>
                                    <div className={styles.warningsData} onClick={(e)=>this.showModal(items.PointName,items.DGIMNs,item.PollutantCode,item.PollutantName)}>
                                        {item.PollutantName}
                                        <Divider type="vertical" style={{backgroundColor:'#b3b3b3'}} />
                                    超标预警值为{item.AlarmValue}ug/m3
                                        <Divider type="vertical" style={{backgroundColor:'#b3b3b3'}} />
                                    建议浓度为{item.SuggestValue}ug/m3
                                        <span style={{float:'right'}}>{item.AlarmOverTime}</span>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                )
            });

        });
        return (<List
            // size="middle"
            // bordered={false}
            itemLayout="vertical"
            dataSource={listData}
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[]}
                >
                    <List.Item.Meta
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
        );
    }

    /**
     * 智能监控_渲染数据超标数据列表
     */
    renderAllPointOverDataList = ()=>{
        //console.log('allPointOverDataList:',this.props.allPointOverDataList);
        const listData = [];
        this.props.allPointOverDataList.tableDatas.map((item)=>{
            //判断报警是否超过4小时
            listData.push({
                title:`${item.pointName}`,
                description:(
                    <div>
                        {
                            item.pollutantList.map(item => (
                                <div>
                                    <div style={{backgroundColor:'rgb(249,249,249)',padding:10,marginBottom:5}}>
                                        {item.pollutantName} 超标:{item.Count}次
                                        <Divider type="vertical" style={{backgroundColor:'#b3b3b3'}} />
                                        超标倍数:{item.MinMultiple}-{item.MaxMultiple}
                                        <span style={{float:'right'}}>{item.time}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                )
            });

        });
        return (<List
            // size="middle"
            // bordered={false}
            itemLayout="vertical"
            dataSource={listData}
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[]}
                >
                    <List.Item.Meta
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
        );
    }

    /**
     * 智能监控_地图点位渲染
     */
    getMarkers =()=>{
        let markers=[];
        this.props.overPointList.tableDatas.map((item)=>{
            let position = {
                longitude:item.Longitude,
                latitude:item.Latitude,
                PointName:item.PointName
            };
            markers.push({position});

        });
        //console.log(markers);
        return markers;
    }

    /**
     * 智能监控_地图点位渲染样式
     */
    renderMarkerLayout(extData){
        return <div style={{position:'absolute'}}><div style={MarkerLayoutStyle}>{extData.position.PointName}</div><img style={{width:15}} src="/gisover.png" /></div>;
    }

    /**
     * 智能监控_地图默认显示的位置
     */
    mapCenter = ()=>
        ({
            longitude:112.45,
            latitude:36.28,
            PointName:'-'
        })
        // if(this.props.overPointList.tableDatas.length>0) {
        //     let position = {
        //         longitude:this.props.overPointList.tableDatas[0].Longitude,
        //         latitude:this.props.overPointList.tableDatas[0].Latitude,
        //         PointName:this.props.overPointList.tableDatas[0].PointName
        //     };

    //     return position;
    // }


    /**
     * 智能监控_渲染排口所有状态
     */
    renderStatisticsPointStatus = () =>{
        const {model}=this.props.statisticsPointStatus;

        return <span style={{float:"right",marginRight:'5%'}}>
            <span style={{marginRight:20}}>排放口:<span style={{marginLeft:5,color:'rgb(72,145,255)'}}>{model.PointTotal}</span></span>
            <span style={{marginRight:20}}>运行:<span style={{marginLeft:5,color:'rgb(93,192,94)'}}>{model.RuningNum}</span></span>
            <span style={{marginRight:20}}>离线:<span style={{marginLeft:5,color:'rgb(244,5,4)'}}>{model.OffLine}</span></span>
            <span style={{marginRight:20}}>异常:<span style={{marginLeft:5,color:'gold'}}>{model.ExceptionNum}</span></span>
            <span style={{marginRight:20}}>关停:<span style={{marginLeft:5,color:'rgb(208,145,14)'}}>{model.StopNum}</span></span>
        </span>;
    }

    //如果是数据列表则没有选择污染物，而是展示全部污染物
    getPollutantSelect =()=>(<PollutantSelect
        optionDatas={this.props.pollutantList}
        defaultValue={this.props.warningDetailsDatas.selectedPollutantCode}
        style={{width: 150,marginRight:10}}
        onChange={this.handlePollutantChange}
    /> )

    // 污染物
    handlePollutantChange=(value, selectedOptions) => {
        //debugger;
        this.updateState({
            warningDetailsDatas:{
                ...this.props.warningDetailsDatas,
                ...{
                    selectedPollutantCode:value,
                    selectedPollutantName:selectedOptions.props.children
                }
            }
        });
    };

    /**
     * 智能监控_渲染预警详情图表数据
     */
    getWarningChartOption =() =>{
        console.log('pollutantList',this.props.pollutantList);
        console.log('warningDetailsDatas',this.props.warningDetailsDatas);
        let {chartDatas,selectedPollutantCode,selectedPollutantName}=this.props.warningDetailsDatas;

        let xAxis=[];
        let seriesData=[];

        chartDatas.map((item) => {
            xAxis.push(item.MonitorTime);
            seriesData.push(item[selectedPollutantCode]);
        });

        let option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[selectedPollutantName]
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: xAxis
            },
            yAxis: {
                type: 'value',
                name: 'ug/m³',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name:selectedPollutantName,
                    type:'line',
                    data:seriesData,
                }
            ]
        };
        return option;

    }

    /**
     * 智能监控_渲染预警详情表格数据
     */
    renderWarningDetailsTable = ()=>{
        let { selectedPollutantCode,selectedPollutantName,chartDatas } = this.props.warningDetailsDatas;

        const columns = [
            {
                title: '监测时间',
                dataIndex: 'MonitorTime'
            },
            {
                title: '污染物',
                dataIndex: 'none',
                render: (text, record) => `${selectedPollutantName }`
            },
            {
                title: '监测值',
                dataIndex: selectedPollutantCode
            },
            {
                title: '标准值',
                dataIndex: `${selectedPollutantCode}_StandardValue`
            },
            {
                title: '建议浓度',
                dataIndex: `${selectedPollutantCode}_SuggestValue`
            }
        ];

        return <Table
            columns={columns}
            dataSource={chartDatas}
            size="small"
            pagination={{ pageSize: 15 }}
        />;
    }

    /**
     * 智能监控_显示预警详情弹窗口
     */
    showModal = (name,mn,pollutantCode,pollutantName)=>{
        
        this.updateState({
            warningDetailsDatas:{
                ...this.props.warningDetailsDatas,
                ...{
                    DGIMNs: mn,
                    selectedPollutantCode:pollutantCode,
                    selectedPollutantName:pollutantName
                }
            }
        });
        this.getRealTimeWarningDatas();
        this.getPollutantList(mn);

        this.setState({
            visibleModal: true,
            clickThisPointName:name
        });
    }

    handleCancel =()=>{
        this.setState({
            visibleModal: false,
        });
    }

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: 'calc(100vh - 65px)',
                    overflow: 'auto'
                }}
                className={styles.contentDiv}
            >
                <div className={styles.workBench}>
                    <div className={styles.headerDiv}>
                        <p>智能监控</p>
                        {this.renderStatisticsPointStatus()}

                    </div>
                    <Row gutter={24}>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                            <Card
                                title={`当前超标排口(${this.props.overPointList.tableDatas.length}个)`}
                                bordered={false}
                                extra={<a href="#">更多>></a>}
                            >
                                <div id="app" style={{height:400}}>
                                    <Map amapkey={amapKey} center={this.mapCenter()} zoom={1}>
                                        <Markers
                                            markers={this.getMarkers()}
                                            render={(item)=>this.renderMarkerLayout(item)}
                                        />
                                    </Map>
                                </div>
                            </Card>
                        </Col>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <Card
                                style={{ marginBottom: 10 }}
                                bordered={false}
                                loading={this.props.loadingDataOverWarning}
                            >
                                <Card.Grid style={{width:'100%',height:505,paddingTop:15}}>
                                    <Tabs>
                                        <TabPane tab="实时预警" key="1">
                                            <div style={{height:400,overflow:'auto'}}>
                                                {
                                                    this.renderHourDataOverWarningList()
                                                }
                                            </div>

                                        </TabPane>
                                        <TabPane tab="超标汇总" key="2">
                                            <div style={{height:400,overflow:'auto'}}>
                                                {
                                                    this.renderAllPointOverDataList()
                                                }
                                            </div>

                                        </TabPane>
                                    </Tabs>
                                </Card.Grid>
                            </Card>
                        </Col>
                    </Row>

                    <div className={styles.headerDiv}>
                        <p>智能质控</p>
                    </div>

                    <Row gutter={24}>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                            <Row>
                                <Col span={24}>
                                    <Card title="实时联网率" style={{}} extra={<a href="/overview/datalistview">更多>></a>}>
                                        <Card.Grid style={gridStyle}>
                                            {/* 实时联网率 */}

                                            <ReactEcharts
                                                loadingOption={this.props.loadingRateStatistics}
                                                option={this.getOption(1)}
                                                style={{height: '150px', width: '100%'}}
                                                className="echarts-for-echarts"
                                                onEvents={{'click': this.onChartClick}}
                                                theme="my_theme"
                                            />

                                        </Card.Grid>
                                        <Card.Grid style={gridStyle}>
                                            {
                                                this.renderNetWorkingRateTable()
                                            }
                                        </Card.Grid>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Card
                                        title="十月设备运转率"
                                        style={{marginTop:10}}
                                        extra={<a
                                            href="/qualitycontrol/equipmentoperatingrate"
                                        >更多>>
                                        </a>}
                                    >
                                        <Card.Grid style={gridStyle}>
                                            {/* 十月设备运转率 */}

                                            <ReactEcharts
                                                loadingOption={this.props.loadingRateStatistics}
                                                option={this.getOption(2)}
                                                style={{height: '150px', width: '100%'}}
                                                className="echarts-for-echarts"
                                                onEvents={{'click': this.onChartClick}}
                                                theme="my_theme"
                                            />

                                        </Card.Grid>
                                        <Card.Grid style={gridStyle}>
                                            {
                                                this.renderEquipmentoperatingRateTable()
                                            }
                                        </Card.Grid>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Card
                                        title="十月传输有效率"
                                        style={{marginTop:10}}
                                        extra={<a
                                            href="/qualitycontrol/transmissionefficiency"
                                        >更多>>
                                               </a>}
                                    >
                                        <Card.Grid style={gridStyle} loading={this.props.loadingRateStatistics}>
                                            {/* 十月传输有效率 */}

                                            <ReactEcharts
                                                option={this.getOption(3)}
                                                style={{height: '150px', width: '100%'}}
                                                className="echarts-for-echarts"
                                                onEvents={{'click': this.onChartClick}}
                                                theme="my_theme"
                                            />

                                        </Card.Grid>
                                        <Card.Grid style={gridStyle}>
                                            {
                                                this.renderTransmissionefficiencyRateTable()
                                            }
                                        </Card.Grid>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <Card
                                title="异常报警"
                                style={{ marginBottom: 10}}
                                bordered={false}
                                // extra={<a href="#">更多>></a>}
                                className={styles.exceptionAlarm}
                                loading={this.props.loadingExceptionAlarm}
                            >
                                <Card.Grid style={{width:'100%',height:736}} key="1">
                                    {this.renderExceptionAlarmList()}
                                </Card.Grid>
                            </Card>
                        </Col>
                    </Row>

                    <div className={styles.headerDiv}>
                        <p>智能运维</p>
                    </div>

                    <Row gutter={24}>
                        <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                            <Card style={{}}>
                                <Card.Grid style={{width:'100%'}}>
                                    <div className={styles.calendarDiv}>
                                        <div style={{textAlign: 'left', marginBottom: -35}}>
                                            <div style={{
                                                width: 6,
                                                height: 6,
                                                backgroundColor: '#faad14',
                                                display: 'inline-block',
                                                borderRadius: '100%',
                                                cursor: 'pointer',
                                                marginRight: 3
                                            }}
                                            /> <span style={{cursor: 'pointer'}}> 异常任务</span>
                                            <div style={{
                                                width: 6,
                                                height: 6,
                                                backgroundColor: '#52c41a',
                                                display: 'inline-block',
                                                borderRadius: '100%',
                                                cursor: 'pointer',
                                                marginLeft: 20,
                                                marginRight: 3
                                            }}
                                            /><span style={{cursor: 'pointer'}}> 正常任务</span>
                                        </div>
                                        {
                                            this.renderCalendar()
                                        }
                                    </div>
                                </Card.Grid>
                            </Card>
                        </Col>
                        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                            <Card
                                loading={this.props.loadingOperationData}
                                title={`运维记录 - ${this.state.selectedValue.format('YYYY-MM-DD')} `}
                                style={{ }}
                                // extra={<Pagination size="small" total={50} />}
                            >
                                <Card.Grid style={{width:'100%',height:297,padding: 15}}>
                                    {
                                        this.renderOperationTable()
                                    }

                                </Card.Grid>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title={
                        <Row>
                            <Col span={10}>{this.state.clickThisPointName}</Col>
                        </Row>
                    }
                    visible={this.state.visibleModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="70%"
                    footer={[]}
                >
                    <Tabs
                        defaultActiveKey="1"
                        tabPosition="left"
                        style={{height: 'calc(100vh - 400px)'}}
                    >
                        <TabPane tab="图表分析" key="1">
                            <Row>
                                <Col span={3}>{this.getPollutantSelect()}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ReactEcharts
                                        option={this.getWarningChartOption()}
                                        style={{height: 'calc(100vh - 400px)', width: '100%'}}
                                        className="echarts-for-echarts"
                                        theme="my_theme"
                                    />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="数据分析" key="2">
                            {/* <Row style={{marginBottom:10}}>
                                <Col span={3}>{this.getPollutantSelect()}</Col>
                            </Row> */}
                            <Row>
                                <Col>
                                    {
                                        this.renderWarningDetailsTable()
                                    }
                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>

        );
    }
}
export default SpecialWorkbench;
