import React, { Component } from 'react';
import styles from './index.less';
import moment from 'moment';
import { DatePicker, Input, Button, Radio, Row, Col, Spin, Card, Table, Select, Popover } from 'antd';
import MonitorContent from '../../components/MonitorContent/index';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';
import AlarmRecordModal from '../../components/GlobalHeader/AlarmRecordModal';
import { onlyOneEnt } from '../../config';
const { RangePicker } = DatePicker;
const Serach = Input.Search;
const dateChildren = [];
const Option = Select.Option;
const dateYear = moment().get('year');
for (let i = dateYear; i > dateYear - 10; --i) {
    dateChildren.push(<Option key={i}>{i}</Option>);
}
@connect(({ loading, analysisdata }) => ({
    loading: loading.effects['analysisdata/queryalloverdatalists'],
    overdatalist: analysisdata.overdatalist,
    overdataParameters: analysisdata.overdataParameters,
    AlarmTime: analysisdata.AlarmTime,
    Zs01: analysisdata.Zs01,
    Zs02: analysisdata.Zs02,
    Zs03: analysisdata.Zs03,
}))

class OverPointListAndChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: ['month', 'month'],
            rangeDate: [moment(new Date()).add(-1, 'month'), moment(new Date())],
        };
    }
    componentWillMount() {
        var entCode = "51216eae-8f11-4578-ad63-5127f78f6cca"; //一会修改
        this.updateState({
            overdataParameters: {
                ...this.props.overdataParameters,
                ...{
                    entCode: entCode,
                }
            }
        });
        //获取列表数据
        this.queryalloverdatalists();
        //获取图表数据
        this.queryalloverdataChart();

    }
    queryalloverdatalists = () => {
        this.props.dispatch({
            type: 'analysisdata/queryalloverdatalists',
            payload: {
            }
        });
    }
    queryalloverdataChart = () => {
        this.props.dispatch({
            type: 'analysisdata/queryalloverdataChart',
            payload: {
            }
        });
    }
    /**
   * 更新model中的state
  */
    updateState = (payload) => {
        this.props.dispatch({
            type: 'analysisdata/updateState',
            payload: payload,
        });
    }
    handlePanelChange = (value, mode) => {
        if (value) {
            this.setState({
                rangeDate: value,
                mode: [
                    mode[0] === 'date' ? 'month' : mode[0],
                    mode[1] === 'date' ? 'month' : mode[1],
                ],
            });
            let { overdataParameters } = this.props;
            overdataParameters = {
                ...overdataParameters,
                begintime: value[0],
                endtime: value[1]
            }
            this.reloaddata(overdataParameters);
        }
    }

    //刷新数据
    reloaddata = (overdataParameters) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'analysisdata/updateState',
            payload: {
                overdataParameters: overdataParameters
            }
        })
        dispatch({
            type: 'analysisdata/queryalloverdatalist',
            payload: {
            }
        });
    }
    //点击图表事件
    onChartClick = (opt) => {
        let { selectedDate } = this.props;
        var dateindex = opt.dataIndex;
        if (dateindex < 9) {
            dateindex = '0' + (dateindex + 1);
        }
        let clickDate = moment(selectedDate).format(`YYYY-${dateindex}-01 00:00:00`);
        this.updateState({
            overdataParameters: {
                ...this.props.overdataParameters,
                ...{
                    clickDate: clickDate,
                }
            }
        });
        //刷新下侧列表
        this.queryalloverdatalists();
    }
    //图表数据
    getOption = () => {
        let option = {
            color: ['rgb(66,186,161)', 'rgb(250,203,1)', 'rgb(104,178,241)'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: (params) => {
                    var tar = params[0];
                    var tar1 = params[1];
                    var tar2 = params[2];
                    return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value + ' 次<br/>' + tar1.seriesName + ' : ' + tar1.value + ' 次<br/>' + tar2.seriesName + ' : ' + tar2.value + ' 次';
                }
            },
            legend: {
                data: ['折算烟尘', '折算二氧化硫', '折算氮氧化物']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.props.AlarmTime,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '单位：(次)'
                }
            ],
            series: [
                {
                    name: '折算烟尘',
                    type: 'bar',
                    stack: '排口超标分析',
                    barWidth: '30%',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: this.props.Zs01,
                },
                {
                    name: '折算二氧化硫',
                    type: 'bar',
                    stack: '排口超标分析',
                    barWidth: '30%',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: this.props.Zs02,
                },
                {
                    name: '折算氮氧化物',
                    type: 'bar',
                    stack: '排口超标分析',
                    barWidth: '30%',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: this.props.Zs03,
                },
            ]
        };
        return option;
    }
    // 年份选择改变事件
    handleChangeDate = (value) => {
        debugger
        let Year = moment().get('year');
        let Month = moment().get('month') + 1;
        if (Month < 10) {
            Month = '0' + Month
        }
        const beginTime = moment(`${value}-01-01 00:00:00`).format('YYYY-01-01 HH:mm:ss');
        const endTime = moment(`${value}-01-01 00:00:00`).add(1, 'years').format('YYYY-01-01 HH:mm:ss');
        // 本年份
        if ((+value) === Year) {
            this.updateState({
                overdataParameters: {
                    ...this.props.overdataParameters,
                    ...{
                        beginTime: beginTime,
                        endTime: endTime,
                        selectedDate: `${Year}-${Month}-01 00:00:00`,
                        clickDate: `${Year}-${Month}-01 00:00:00`,
                        pointsTableData: []
                    }
                }
            });
        } else {
            this.updateState({
                overdataParameters: {
                    ...this.props.overdataParameters,
                    ...{
                        beginTime: beginTime,
                        endTime: endTime,
                        selectedDate: `${value}-01-01 00:00:00`,
                        clickDate: `${value}-01-01 00:00:00`,
                        pointsTableData: []
                    }
                }
            });
        }
        //获取列表数据
        this.queryalloverdatalists();
        //获取图表数据
        this.queryalloverdataChart();
    }
    //点击排口查看详情
    onDetail = (dgimn, pointName) => {
        const { rangeDate } = this.state;
        this.childAlarm.showModal(rangeDate[0], rangeDate[1], dgimn, pointName)
    }

    onRefAlarm = (ref) => {
        this.childAlarm = ref;
    }


    render() {
        const { rangeDate, mode } = this.state;
        const { overdatalist, loading, clickDate } = this.props;
        let tableTitle = `${moment(clickDate).format('YYYY-MM')}月响应情况(${this.props.match.params.entname})`
        const columnsPoints = [
            {
                title: (<span style={{ fontWeight: 'bold' }}>排口名称</span>),
                dataIndex: 'PointName',
                key: 'PointName',
                width: '25%',
                align: 'left',
                render: (text, record) => {
                    return (
                        <a onClick={() => this.onDetail(record.DGIMN, record.pointName)} > {text} </a>
                    );
                }
            },
            {
                title: (<span style={{ fontWeight: 'bold' }}>折算烟尘（超标次数）</span>),
                dataIndex: 'Zs01',
                key: 'Zs01',
                align: 'left',
                width: '25%',
                sorter: true,
                render: (text, record) => {
                    let MinMultiple, MaxMultiple, LastValue
                    record.Detail.map((item) => {
                        if (item.PollutantCode === "zs01") {
                            MinMultiple = item.MinMultiple;
                            MaxMultiple = item.MaxMultiple;
                            LastValue = item.LastValue;
                        }
                    })
                    const contents = (<div>
                        <li style={{ marginBottom: 10 }}>
                            <span>{`超标倍数：${MinMultiple}~${MaxMultiple}`}</span>
                        </li>
                        <li style={{ marginBottom: 10 }}>
                            <span>{`最新浓度：${LastValue}`}</span>
                        </li>
                    </div>);
                    return (<Popover content={contents} title={"详情"}><span style={{ cursor: 'pointer' }}>{text}</span></Popover>);
                }
            },
            {
                title: (<span style={{ fontWeight: 'bold' }}>折算二氧化硫（超标次数）</span>),
                dataIndex: 'Zs02',
                key: 'Zs02',
                align: 'left',
                width: '25%',
                sorter: true,
                render: (text, record) => {
                    let MinMultiple, MaxMultiple, LastValue
                    record.Detail.map((item) => {
                        if (item.PollutantCode === "zs02") {
                            MinMultiple = item.MinMultiple;
                            MaxMultiple = item.MaxMultiple;
                            LastValue = item.LastValue;
                        }
                    })
                    const contents = (<div>
                        <li style={{ marginBottom: 10 }}>
                            <span>{`超标倍数：${MinMultiple}~${MaxMultiple}`}</span>
                        </li>
                        <li style={{ marginBottom: 10 }}>
                            <span>{`最新浓度：${LastValue}`}</span>
                        </li>
                    </div>);
                    return (<Popover content={contents} title={"详情"}><span style={{ cursor: 'pointer' }}>{text}</span></Popover>);
                }
            },
            {
                title: (<span style={{ fontWeight: 'bold' }}>折算氮氧化物（超标次数）</span>),
                dataIndex: 'Zs03',
                key: 'Zs03',
                align: 'left',
                width: '25%',
                sorter: true,
                render: (text, record) => {
                    let MinMultiple, MaxMultiple, LastValue
                    record.Detail.map((item) => {
                        if (item.PollutantCode === "zs01") {
                            MinMultiple = item.MinMultiple;
                            MaxMultiple = item.MaxMultiple;
                            LastValue = item.LastValue;
                        }
                    })
                    const contents = (<div>
                        <li style={{ marginBottom: 10 }}>
                            <span>{`超标倍数：${MinMultiple}~${MaxMultiple}`}</span>
                        </li>
                        <li style={{ marginBottom: 10 }}>
                            <span>{`最新浓度：${LastValue}`}</span>
                        </li>
                    </div>);
                    return (<Popover content={contents} title={"详情"}><span style={{ cursor: 'pointer' }}>{text}</span></Popover>);
                }
            }
        ];
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    { Name: '首页', Url: '/' },
                    { Name: '智能分析', Url: '' },
                    { Name: '超标企业分析', Url: '/analysis/overresponse' },
                    { Name: '排口超标分析', Url: '' }
                ]
            }>

                <Card
                    title="排口超标分析"
                    extra={
                        <span style={{ color: '#b3b3b3' }}>
                            时间选择：
                        <Select
                                size="default"
                                defaultValue={dateYear}
                                onChange={this.handleChangeDate}
                                style={{ width: 200 }}>
                                {dateChildren}
                            </Select>
                        </span>
                    }
                >
                    <Row>
                        <ReactEcharts
                            option={this.getOption()}
                            style={{ height: '300px', width: '100%' }}
                            className="echarts-for-echarts"
                            onEvents={{ 'click': this.onChartClick }}
                            theme="my_theme" />
                    </Row>

                    <Row style={styles.cardTitle.cardBg}>
                        <Card
                            style={{ marginTop: 16 }}
                            bordered={false}
                            title={tableTitle}>
                            <Table
                                rowKey={(record, index) => `complete${index}`}
                                className={styles.dataTable}
                                loading={loading}
                                columns={columnsPoints}
                                onChange={this.handleTableChange}
                                size="middle"// small middle
                                dataSource={overdatalist}
                                scroll={{ y: 'calc(100vh - 390px)' }}
                                pagination={{
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    sorter: true,
                                    'total': this.props.total,
                                    'pageSize': this.props.pageSize,
                                    'current': this.props.pageIndex,
                                    pageSizeOptions: ['10', '20', '30', '40', '50']
                                }}
                            />
                        </Card>
                    </Row>
                </Card>
                <AlarmRecordModal  {...this.props} onRef={this.onRefAlarm} />
            </MonitorContent>
        );
    }
}

export default OverPointListAndChart;
