
import React, { Component } from 'react';
import { Row, Col,Card,List, message, Avatar, Spin,Table,Calendar, Badge,Alert,Tag,Link,Icon,Button } from 'antd';
import styles from './index.less';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { relative } from 'path';
/*
页面：工作台
add by cg 18.6.8
modify by wjw 18.12.24
*/
const listData = [];
for (let i = 0; i < 4; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `废气排口 ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: (<div>
        <div>
            <Tag color="magenta">参数异常</Tag>
            <Tag color="red">连续值异常</Tag>
            <Tag color="volcano">超限异常</Tag>
            <Tag color="orange">逻辑异常</Tag>
        </div>
        <div style={{marginTop:10}}>
            <div>烟气分析仪故障烟气分析仪故障烟气分析仪故障烟气分析仪故障</div>
            <div>首次报警时间：2018-12-27</div>
            <div>报警总次数：<span style={{fontWeight:'bold'}}>98</span></div>
        </div>
      </div>),
    content: '',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
const gridStyle = {
width: '50%',
textAlign: 'center',
height: '200px'
};
const columns = [
    {
        title: '排口名称',
        dataIndex: 'PointName',
    }, 
    {
        title: '运维人',
        dataIndex: 'OperationName',
    }, 
    {
        title: '状态',
        dataIndex: 'ExceptionTypeText',
    }, {
        title: '操作',
        dataIndex: 'opt',
        render: (text, record) => {
            return (
                <a > 查看运维 </a>
            );
        }
    }];
  const data = [{
    key: '1',
    name: '脱硫出口1',
    age: '离线',
    address: '派单',
  }, {
    key: '2',
    name: '脱硫出口1',
    age: '离线',
    address: '派单',
  }, {
    key: '3',
    name: '脱硫出口1',
    age: '离线',
    address: '派单',
  }];
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
  
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
const pageUrl = {
    updateState: 'workbenchmodel/updateState',
    getOperationData: 'workbenchmodel/getOperationData'
};
@connect(({
    loading,
    workbenchmodel
}) => ({
    loading: loading.effects[pageUrl.getOperationData],
    operation: workbenchmodel.operation
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
            operation:{
                tableDatas:this.props.operation.tableDatas.filter(m=>moment(m.CreateTime).format('YYYY-MM-DD')===moment().format("YYYY-MM-DD")).slice(0,6)
            }
        };
    }
    componentWillMount() {
        this.getOperationData(1);
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
                    else
                    {
                        return text;
                    }
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
                    else
                    {
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
                }
            }, {
                title: '操作',
                dataIndex: 'opt',
                render: (text, record) => {
                    return (
                        <a onClick={
                            () => this.props.dispatch(routerRedux.push(`/pointdetail/${record.DGIMN}/emergencydetailinfo/${record.TaskID}`))
                        } > 详情 </a>
                    );
                }
            }];
        
        return <Table columns={columns} dataSource={this.state.operation.tableDatas} size="small" pagination={false}/>
    }
    /**
     * 智能运维_日历表时间选择事件
     */
    onCalendarSelect = (value) => {
        let selectValue = value.format('YYYY-MM-DD 00:00:00');
        this.setState({
          // value,
            selectedValue: value,
            operation:{
                tableDatas:this.props.operation.tableDatas.filter(m=>moment(m.CreateTime).format('YYYY-MM-DD')===value.format("YYYY-MM-DD")).slice(0,6)
        }
        });
        if(value.format("YYYY-MM")===this.state.selectedValue.format("YYYY-MM"))
        {
            return false;
        }
        
        if(value.format("YYYY-MM")!==moment(this.props.operation.beginTime).format("YYYY-MM"))
        {
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
    renderCalendar = () =>{

        return <Calendar fullscreen={false} onSelect={this.onCalendarSelect} dateCellRender={this.dateCellRender} monthCellRender={monthCellRender} />;
    }
    /**
     * 智能运维_日历表插件渲染任务数据
     */
    dateCellRender = (value) =>{
        let listData=[];
        let thisData=this.props.operation.tableDatas.filter(m=>moment(m.CreateTime).format('YYYY-MM-DD')===value.format("YYYY-MM-DD"));
        if(thisData&&thisData.length>0)
        {
            let ExceptionTypeText=thisData.filter(m=>m.ExceptionTypeText!=="");
            if(ExceptionTypeText&&ExceptionTypeText.length>0)
            {
                listData = [{ type: 'warning', content: '' }];
            }else
            {
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
        this.fetchData((res) => {
            this.setState({
            data: res.results,
            });
        });
    }
    fetchData = (callback) => {
        reqwest({
          url: fakeDataUrl,
          type: 'json',
          method: 'get',
          contentType: 'application/json',
          success: (res) => {
            callback(res);
          },
        });
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
    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    }

    getOption = (type) => {

        let legendData=[];
        let color=[];
        let seriesName='';
        let seriesData=[];
        if(type===1)
        {
            legendData=['正常','离线'];
            color=['rgb(245,68,66)','rgb(160,6,1)'];
            seriesName='实时联网率';
            seriesData=[
                {value:90, name:'正常'},
                {value:10, name:'离线'}
            ];
        }else if(type===2)
        {
            legendData=['达标','未达标'];
            color=['rgb(73,226,124)','rgb(48,155,86)'];
            seriesName='设备运转率';
            seriesData=[
                {value:90, name:'达标'},
                {value:10, name:'未达标'}
            ];
        }else
        {
            legendData=['达标','未达标'];
            color=['rgb(245,68,66)','rgb(160,6,1)'];
            seriesName='传输有效率';
            seriesData=[
                {value:90, name:'达标'},
                {value:10, name:'未达标'}
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
    

    render() {
        //console.log(this.props.operation);
        const {operation} = this.props;
        return (
            <div style={{
                width: '100%',
                height: 'calc(100vh - 65px)',
                overflow: 'auto'
            }} className={styles.contentDiv}
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
                                title='当前超标排口(0个)'
                                bordered={false}
                                >
                                <div className={styles.mapChart}>
                                    <img
                                        src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                                        alt="map"
                                    />
                                </div>
                            </Card>
                        </Col>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <Card
                                title='10月超标汇总'
                                style={{ marginBottom: 10 }}
                                bordered={false}
                                extra={<a href="#">更多>></a>}
                                >
                                <div className={styles.demoInfiniteContainer}>
                                    <InfiniteScroll
                                        initialLoad={false}
                                        pageStart={0}
                                        loadMore={this.handleInfiniteOnLoad}
                                        hasMore={!this.state.loading && this.state.hasMore}
                                        useWindow={false}
                                        >
                                        <List
                                            dataSource={this.state.data}
                                            size="small"
                                            renderItem={item => (
                                                <List.Item key={item.id}>
                                                    <List.Item.Meta
                                                    title={<a href="https://ant.design">{item.name.last}</a>}
                                                    description={item.email}
                                                    />
                                                    <div></div>
                                                </List.Item>
                                                )}
                                            >
                                            {this.state.loading && this.state.hasMore && (
                                            <div className="demo-loading-container">
                                                <Spin />
                                            </div>
                                            )}
                                        </List>
                                    </InfiniteScroll>
                                </div>
                            </Card>
                            <Card
                                title='当前小时预警消息'
                                style={{ marginBottom: 10 }}
                                // bodyStyle={{ textAlign: 'center' }}
                                bordered={false}
                                extra={<a href="#">更多>></a>}
                                >
                                <div className={styles.demoInfiniteContainer}>
                                    <InfiniteScroll
                                        initialLoad={false}
                                        pageStart={0}
                                        loadMore={this.handleInfiniteOnLoad}
                                        hasMore={!this.state.loading && this.state.hasMore}
                                        useWindow={false}
                                        >
                                        <List
                                            dataSource={this.state.data}
                                            size="small"
                                            renderItem={item => (
                                                <List.Item key={item.id}>
                                                    <List.Item.Meta
                                                    title={<a href="https://ant.design">{item.name.last}</a>}
                                                    description={item.email}
                                                    />
                                                    <div></div>
                                                </List.Item>
                                                )}
                                            >
                                            {this.state.loading && this.state.hasMore && (
                                            <div className="demo-loading-container">
                                                <Spin />
                                            </div>
                                            )}
                                        </List>
                                    </InfiniteScroll>
                                </div>
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
                                    <Card title='实时联网率' style={{}} extra={<a href="#">更多>></a>}>
                                        <Card.Grid style={gridStyle}>
                                        {/* 实时联网率 */}
                                        
                                        <ReactEcharts
                                            option={this.getOption(1)}
                                            style={{height: '150px', width: '100%'}}
                                            className="echarts-for-echarts"
                                            onEvents={{'click': this.onChartClick}}
                                            theme="my_theme" />

                                        </Card.Grid>
                                        <Card.Grid style={gridStyle}>
                                            <Table columns={columns} dataSource={data} size="small" pagination={false}/>
                                        </Card.Grid>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Card title='十月设备运转率' style={{marginTop:10}} extra={<a href="#">更多>></a>}>
                                            <Card.Grid style={gridStyle}>
                                            {/* 十月设备运转率 */}
                                            
                                            <ReactEcharts
                                                option={this.getOption(2)}
                                                style={{height: '150px', width: '100%'}}
                                                className="echarts-for-echarts"
                                                onEvents={{'click': this.onChartClick}}
                                                theme="my_theme" />

                                            </Card.Grid>
                                            <Card.Grid style={gridStyle}>
                                                <Table columns={columns} dataSource={data} size="small" pagination={false}/>
                                            </Card.Grid>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Card title='十月传输有效率' style={{marginTop:10}} extra={<a href="#">更多>></a>}>
                                        <Card.Grid style={gridStyle}>
                                        {/* 十月传输有效率 */}
                                        
                                        <ReactEcharts
                                            option={this.getOption(3)}
                                            style={{height: '150px', width: '100%'}}
                                            className="echarts-for-echarts"
                                            onEvents={{'click': this.onChartClick}}
                                            theme="my_theme" />

                                        </Card.Grid>
                                        <Card.Grid style={gridStyle}>
                                            <Table columns={columns} dataSource={data} size="small" pagination={false}/>
                                        </Card.Grid>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <Card
                                title='异常报警'
                                style={{ marginBottom: 10}}
                                bordered={false}
                                extra={<a href="#">更多>></a>}
                                className={styles.exceptionAlarm}
                                >
                                <Card.Grid style={{width:'100%',height:736}} key='1'>
                                    <List
                                        itemLayout="vertical"
                                        // size="large"
                                        dataSource={listData}
                                        renderItem={item => (
                                        <List.Item
                                            key={item.title}
                                            actions={[]}
                                            extra={<div style={{marginTop:30,marginRight:70,textAlign:'center'}}><div style={{color:'red'}}>已发生4小时</div><div style={{marginTop:43}}><Button style={{width:100,border:'none',backgroundColor:'rgb(74,210,187)'}} type="primary">督办</Button></div> </div>}
                                        >
                                            <List.Item.Meta
                                            avatar={<Avatar src={item.avatar} />}
                                            title={<a href={item.href}>{item.title}</a>}
                                            description={item.description}
                                            />
                                            {item.content}
                                        </List.Item>
                                        )}
                                    />
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
                                <Card.Grid style={{width:'100%'}} >
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
                                                }} /> <span style={{cursor: 'pointer'}}> 异常任务</span>
                                                <div style={{
                                                    width: 6,
                                                    height: 6,
                                                    backgroundColor: '#52c41a',
                                                    display: 'inline-block',
                                                    borderRadius: '100%',
                                                    cursor: 'pointer',
                                                    marginLeft: 20,
                                                    marginRight: 3
                                                }} /><span style={{cursor: 'pointer'}}> 正常任务</span>
                                            </div>
                                            {
                                                this.renderCalendar()
                                            }
                                    </div>
                                </Card.Grid>
                            </Card>
                        </Col>
                        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                            <Card title='运维记录' style={{ }} extra={<a href="#">更多>></a>}>
                                <Card.Grid style={{width:'100%',height:297,padding: 15}} >
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
