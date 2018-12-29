
import React, { Component } from 'react';
import { Map, Markers, Polygon, InfoWindow } from 'react-amap';
import { Row, Col,Card,List, message, Avatar, Spin,Table,Calendar, Badge,Alert,Tag,Link,Icon,Button,Tabs,Popover } from 'antd';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { relative } from 'path';
import { amapKey, centerlongitude, centerlatitude } from '../../config';
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
const randomPosition = () => ({
    longitude: 100 + Math.random() * 20,
    latitude: 30 + Math.random() * 20
});
const randomMarker = (len) =>
    Array(len).fill(true).map((e, idx) => ({
        position: randomPosition()
    }))
  ;
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
};
@connect(({
    loading,
    workbenchmodel,
    transmissionefficiency,
    equipmentoperatingrate
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
}))
class SpecialWorkbench extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'tab1',
            noTitleKey: 'app',
            data: [],
            loading: false,
            hasMore: true,
            value: moment(),
            selectedValue: moment(),
            markers: randomMarker(100),
            center: randomPosition()
        };
        this.randomMarkers = this.randomMarkers.bind(this);
    }

    componentWillMount() {
        this.getOperationData(1);
        this.getExceptionAlarmData(1);
        this.getRateStatisticsData();
        this.getNetworkeRateData();
        this.getEquipmentoperatingRateData();
        this.getTransmissionefficiencyRateData();
        this.getDataOverWarningData();
        //this.getAllPointOverDataList();
        this.getOverPointList();

    }

    randomMarkers() {
        this.setState({
            markers: randomMarker(100)
        });
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
        console.log('exceptionAlarm:',this.props.exceptionAlarm);
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
                title: '运维人',
                dataIndex: 'OperationName',
            },
            {
                title: '状态',
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
            }, {
                title: '操作',
                dataIndex: 'opt',
                render: (text, record) => (
                    <a onClick={
                        () => this.props.dispatch(routerRedux.push(`/pointdetail/${record.DGIMN}/emergencydetailinfo/${record.TaskID}`))
                    }
                    > 详情
                    </a>
                )
            }];

        return <Table columns={columns} dataSource={this.props.operation.tempTableDatas.filter(m=>moment(m.CreateTime).format('YYYY-MM-DD')===this.state.selectedValue.format("YYYY-MM-DD")).slice(0,6)} size="small" pagination={false} />;
    }

    /**
     * 智能运维_日历表时间选择事件
     */
    onCalendarSelect = (value) => {
        // debugger;
        let selectValue = value.format('YYYY-MM-DD 00:00:00');
        this.setState({
            // value,
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
    renderCalendar = () =><Calendar fullscreen={false} onSelect={this.onCalendarSelect} dateCellRender={this.dateCellRender} monthCellRender={monthCellRender} />

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

    componentDidMount() {
    }

    handleInfiniteOnLoad = () => {
        let data = this.state.data;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.fetchData((res) => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    }

    getOption = (type) => {
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
                {value:100-runningRate, name:'未达标'}
            ];
        }else {
            legendData=['达标','未达标'];
            color=['rgb(245,68,66)','rgb(160,6,1)'];
            seriesName='传输有效率';
            seriesData=[
                {value:transmissionEffectiveRate, name:'达标'},
                {value:100-transmissionEffectiveRate, name:'未达标'}
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

    onPanelChange = (value, mode)=>{
        console.log(value, mode);
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
                    return <Tag color="rgb(244,6,94)">离线</Tag>;
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

        this.props.hourDataOverWarningList.tableDatas.map((item)=>{
            //判断报警是否超过4小时
            listData.push({
                title:`${item.PointName}`,
                description:(
                    <div>
                        {
                            item.OverWarnings.map(item => (
                                <div>
                                    {
                                        `在${item.AlarmOverTime} ${item.PollutantName} 超标预警值为${item.AlarmValue}ug/m3 建议浓度为${item.SuggestValue}ug/m3`
                                    }
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
        console.log('allPointOverDataList:',this.props.allPointOverDataList);
        const listData = [];
        listData.push({
            title:`脱硫入口1`,
            description:(
                <div>
                    <div>
                        {
                            `二氧化硫超标5次 超标倍数0.2-0.5,氮氧化物超标2次 超标倍数0.1-0.3`
                        }
                    </div>
                    <div>
                        {
                            `二氧化硫超标5次 超标倍数0.2-0.5,氮氧化物超标2次 超标倍数0.1-0.3`
                        }
                    </div>
                    {/* {
                        item.OverWarnings.map(item => (
                            <div>
                                {
                                    `在${item.AlarmOverTime} ${item.PollutantName} 超标预警值为${item.AlarmValue}ug/m3 建议浓度为${item.SuggestValue}ug/m3`
                                }
                            </div>
                        ))
                    } */}
                </div>
            )
        });
        listData.push({
            title:`脱硫入口2`,
            description:(
                <div>
                    <div>
                        {
                            `二氧化硫超标5次 超标倍数0.2-0.5,氮氧化物超标2次 超标倍数0.1-0.3`
                        }
                    </div>
                    <div>
                        {
                            `二氧化硫超标5次 超标倍数0.2-0.5,氮氧化物超标2次 超标倍数0.1-0.3`
                        }
                    </div>
                    {/* {
                        item.OverWarnings.map(item => (
                            <div>
                                {
                                    `在${item.AlarmOverTime} ${item.PollutantName} 超标预警值为${item.AlarmValue}ug/m3 建议浓度为${item.SuggestValue}ug/m3`
                                }
                            </div>
                        ))
                    } */}
                </div>
            )
        });
        this.props.allPointOverDataList.tableDatas.map((item)=>{
            //判断报警是否超过4小时
            listData.push({
                title:`脱硫入口1`,
                description:(
                    <div>
                        <div>
                            {
                                `二氧化硫超标5次 超标倍数0.2-0.5,氮氧化物超标2次 超标倍数0.1-0.3`
                            }
                        </div>
                        <div>
                            {
                                `二氧化硫超标5次 超标倍数0.2-0.5,氮氧化物超标2次 超标倍数0.1-0.3`
                            }
                        </div>
                        {/* {
                            item.OverWarnings.map(item => (
                                <div>
                                    {
                                        `在${item.AlarmOverTime} ${item.PollutantName} 超标预警值为${item.AlarmValue}ug/m3 建议浓度为${item.SuggestValue}ug/m3`
                                    }
                                </div>
                            ))
                        } */}
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
        console.log(markers);
        return markers;
    }

    renderMarkerLayout(extData){
        return <div style={{position:'absolute'}}><div style={MarkerLayoutStyle}>{extData.position.PointName}</div><img style={{width:15}} src="../../../gisover.png" /></div>;
    }

    mapCenter =()=>{

        if(this.props.overPointList.tableDatas.length>0) {
            let position = {
                longitude:this.props.overPointList.tableDatas[0].Longitude,
                latitude:this.props.overPointList.tableDatas[0].Latitude,
                PointName:this.props.overPointList.tableDatas[0].PointName
            };

            return position;
        }
    }

    render() {
        //console.log(this.props.operation);
        const {operation} = this.props;
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
                    {/* <Card style={{ }} bordered={false}>
                        <p>智能监控</p>
                    </Card> */}
                    <div className={styles.headerDiv}>
                        <p>智能监控</p>
                        <span style={{float:"right",marginRight:'5%'}}>
                            <span style={{marginRight:20}}>排放口:<span style={{marginLeft:5,color:'rgb(72,145,255)'}}>12</span></span>
                            <span style={{marginRight:20}}>运行:<span style={{marginLeft:5,color:'rgb(93,192,94)'}}>8</span></span>
                            <span style={{marginRight:20}}>超标:<span style={{marginLeft:5,color:'rgb(244,5,4)'}}>3</span></span>
                            <span style={{marginRight:20}}>关停:<span style={{marginLeft:5,color:'rgb(208,145,14)'}}>1</span></span>
                        </span>
                    </div>
                    <Row gutter={24}>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                            <Card
                                title={`当前超标排口(${this.props.overPointList.tableDatas.length}个)`}
                                bordered={false}
                                extra={<a href="#">更多>></a>}
                            >
                                <div id="app" style={{height:400}}>
                                    <Map amapkey={amapKey} center={this.mapCenter()} zoom={13}>
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
                                    <Tabs tabBarExtraContent={<a href="#">更多>></a>}>
                                        <TabPane tab="实时预警" key="1">
                                            {
                                                this.renderHourDataOverWarningList()
                                            }
                                        </TabPane>
                                        <TabPane tab="超标汇总" key="2">
                                            {
                                                this.renderAllPointOverDataList()
                                            }
                                        </TabPane>
                                    </Tabs>
                                </Card.Grid>
                            </Card>

                            {/* <Card
                                title='10月超标汇总'
                                style={{ marginBottom: 10 }}
                                bordered={false}
                                extra={<a href="#">更多>></a>}
                                >
                                <Card.Grid style={{width:'100%',height:250,paddingTop:15}} >
                                    {
                                        this.renderAllPointOverDataList()
                                    }
                                </Card.Grid>
                            </Card>
                            <Card
                                title='当前小时预警消息'
                                style={{ marginBottom: 10 }}
                                // bodyStyle={{ textAlign: 'center' }}
                                bordered={false}
                                loading={this.props.loadingDataOverWarning}
                                extra={<a href="#">更多>></a>}
                                >
                                <Card.Grid style={{width:'100%',height:250,paddingTop:15}} >
                                    {
                                        this.renderHourDataOverWarningList()
                                    }
                                </Card.Grid>

                            </Card> */}
                        </Col>
                    </Row>

                    <div className={styles.headerDiv}>
                        <p>智能质控</p>
                    </div>

                    <Row gutter={24}>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                            <Row>
                                <Col span={24}>
                                    <Card title="实时联网率" style={{}} extra={<a href="#">更多>></a>}>
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
                                    <Card title="十月设备运转率" style={{marginTop:10}} extra={<a href="#">更多>></a>}>
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
                                    <Card title="十月传输有效率" style={{marginTop:10}} extra={<a href="#">更多>></a>}>
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
                            <Card loading={this.props.loadingOperationData} style={{}}>
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
                            <Card loading={this.props.loadingOperationData} title={`运维记录 - ${this.state.selectedValue.format('YYYY-MM-DD')} `} style={{ }} extra={<a href="#">更多>></a>}>
                                <Card.Grid style={{width:'100%',height:297,padding: 15}}>
                                    {
                                        this.renderOperationTable()
                                    }
                                </Card.Grid>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

        );
    }
}
export default SpecialWorkbench;
