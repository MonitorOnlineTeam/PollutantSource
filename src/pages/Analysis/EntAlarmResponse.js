/**
 * 功  能：报警及时响应统计分析
 * 创建人：吴建伟
 * 创建时间：2018.12.10
 */
import React, { Component } from 'react';
import {
    Card,
    Table,
    Row,
    Modal,
    Select
} from 'antd';
import moment from 'moment';
import styles from './index.less';
import ReactEcharts from 'echarts-for-react';
import MonitorContent from '../../components/MonitorContent/index';
import { connect } from 'dva';
import Link from 'umi/link';
const Option = Select.Option;
const pageUrl = {
    updateState: 'alarmresponse/updateState',
    getChartData: 'alarmresponse/getChartData',
    getEntsData: 'alarmresponse/getEntsData',
};
const dateChildren = [];
const dateYear = moment().get('year');
for (let i = dateYear; i > dateYear - 10; --i) {
    dateChildren.push(<Option key={i}>{i}</Option>);
}
@connect(({
    loading,
    alarmresponse
}) => ({
    loadingPointsTable: loading.effects[pageUrl.getEntsData],
 
    total: alarmresponse.total,
    pageSize: alarmresponse.pageSize,
    pageIndex: alarmresponse.pageIndex,
    selectedDate: alarmresponse.selectedDate,
    clickDate: alarmresponse.clickDate,
    queryDGIMNs: alarmresponse.queryDGIMNs,
    xAxisData: alarmresponse.xAxisData,
    seriesData2: alarmresponse.seriesData2,
    seriesData8: alarmresponse.seriesData8,
    entTableData: alarmresponse.entTableData,
    pointDaysTableData: alarmresponse.pointDaysTableData
}))
export default class EntAlarmResponse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            beginTime: moment(moment().format('YYYY-MM')),
            endTime: '',
            pointName: '-'
        };
    }
    componentWillMount() {
        this.getChartData(1);
        this.getPointsTableData(1);
    }
    updateState = (payload) => {
        this.props.dispatch({
            type: pageUrl.updateState,
            payload: payload,
        });
    }
    // 更新图表数据
    getChartData = (pageIndex) => {
        this.props.dispatch({
            type: pageUrl.getChartData,
            payload: {
                pageIndex: pageIndex,
            },
        });
    }
    // 更新所有排口列表数据
    getPointsTableData = (pageIndex) => {
        this.props.dispatch({
            type: pageUrl.getEntsData,
            payload: {
                pageIndex: pageIndex,
            },
        });
    }
 
    handleTableChange = (pagination, filters, sorter) => {
        if (sorter.order) {
            this.updateState({
                sort2: sorter.field === 'LessThan2Hour' ? sorter.order : '',
                sort8: sorter.field === 'GreaterThan8Hour' ? sorter.order : '',
                pageIndex: pagination.current,
                pageSize: pagination.pageSize
            });
        } else {
            this.updateState({
                sort2: '',
                sort8: '',
                pageIndex: pagination.current,
                pageSize: pagination.pageSize
            });
        }
       this.getPointsTableData(pagination.current);
    }
    onDateChange = (value, dateString) => {
        let endTime = moment(dateString).add(1, 'months').add(-1, 'days').format('YYYY-MM-DD HH:mm:ss');

        if (moment(dateString).add(1, 'months').add(-1, 'days') > moment()) {
            endTime = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        this.updateState({
            beginTime: moment(dateString).format('YYYY-MM-01 HH:mm:ss'),
            endTime: endTime
        });
        this.getChartData(this.props.pageIndex);
    }
    // 年份选择改变事件
    handleChangeDate = (value) => {
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
                beginTime: beginTime,
                endTime: endTime,
                selectedDate: `${Year}-${Month}-01 00:00:00`,
                clickDate: `${Year}-${Month}-01 00:00:00`,
                entTableData: []
            });
        } else {
            this.updateState({
                beginTime: beginTime,
                endTime: endTime,
                selectedDate: `${value}-01-01 00:00:00`,
                clickDate: `${value}-01-01 00:00:00`,
                entTableData: []
            });
        }
        this.getChartData();
        this.getPointsTableData(1);
    }
    handleModalOk = (e) => {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    }

    handleModalCancel = (e) => {
        this.setState({
            modalVisible: false,
        });
    }
    onChartClick = (opt) => {
        let { selectedDate } = this.props;
        var dateindex = opt.dataIndex;
        if (dateindex < 9) {
            dateindex = '0' + (dateindex + 1);
        }
        let clickDate = moment(selectedDate).format(`YYYY-${dateindex}-01 00:00:00`);
        this.updateState({
            clickDate: clickDate
        });
        this.getPointsTableData(1);
    }
    getOption = () => {
        let option = {
            color: ['rgb(66,186,161)', 'rgb(250,203,1)'],// 66 186 161 ['rgb(102,163,255)','rgb(250,203,1)']
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: (params) => {
                    var tar = params[0];
                    var tar1 = params[1];
                    return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value + ' 个<br/>' + tar1.seriesName + ' : ' + tar1.value + ' 个';
                }
            },
            legend: {
                data: ['2小时内', '超8小时']
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
                    data: this.props.xAxisData,// ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '单位：(个)'
                }
            ],
            series: [
                {
                    name: '2小时内',
                    type: 'bar',
                    stack: '月响应情况',
                    barWidth: '30%',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: this.props.seriesData2,// [800, 1000, 1100, 1200, 1300, 550, 820, 830, 1000, 1050, 1000, 900]
                },
                {
                    name: '超8小时',
                    type: 'bar',
                    stack: '月响应情况',
                    barWidth: '30%',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: this.props.seriesData8 // [800, 1000, 1100, 1200, 1300, 550, 820, 830, 1000, 1050, 1000, 900]
                }
            ]
        };
        return option;
    }
    render() {
        const columnsPoints = [
            {
                title: (<span style={{ fontWeight: 'bold' }}>企业名称</span>),
                dataIndex: 'EntName',
                key: 'EntName',
                width: '50%',
                align: 'left',
                render: (text, record) => {
                    return (
                        <Link to={`/analysis/pointalarmresponse/${record.EntCode}/${record.EntName}`}> {text} </Link>
                    );
                }
            },
            {
                title: (<span style={{ fontWeight: 'bold' }}>2小时内</span>),
                dataIndex: 'LessThan2Hour',
                key: 'LessThan2Hour',
                align: 'left',
                width: '25%',
                sorter: true,
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{ fontWeight: 'bold' }}>超8小时</span>),
                dataIndex: 'GreaterThan8Hour',
                key: 'GreaterThan8Hour',
                align: 'left',
                width: '25%',
                sorter: true,
                render: (text, record) => {
                    return text;
                }
            }
        ];
       
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    { Name: '智能分析', Url: '' },
                    { Name: '企业报警及时响应情况', Url: '' }
                ]
            }>
                <div className={styles.cardTitle} >
                    <Card
                        title="企业报警及时响应统计"
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
                                // type="inner"
                                bordered={false}
                                title={`${moment(this.props.clickDate).format('YYYY-MM')}月响应情况`}>
                                <Table
                                    rowKey={(record, index) => `complete${index}`}
                                    style={{}}
                                    className={styles.dataTable}
                                    loading={this.props.loadingPointsTable}
                                    columns={columnsPoints}
                                    onChange={this.handleTableChange}
                                    size="small"// small middle
                                    dataSource={this.props.entTableData}
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
                </div>
            </MonitorContent>
        );
    }
}
