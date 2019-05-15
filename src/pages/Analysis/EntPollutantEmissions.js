/**
 * 功  能：企业污染物月度排放量分析
 * 创建人：张洪宾
 * 创建时间：2019.05.07
 */
import React, { Component } from 'react';
import {
    Card,
    Table,
    // DatePicker,
    // Progress,
    Row,
    Col,
    // Button,
    Select,
    Modal
} from 'antd';
import moment from 'moment';
import styles from './index.less';
import ReactEcharts from 'echarts-for-react';
import MonitorContent from '../../components/MonitorContent/index';
import { connect } from 'dva';
import {onlyOneEnt} from '../../config'
import Link from 'umi/link';
// import { debug } from 'util';
// const { MonthPicker } = DatePicker;
const Option = Select.Option;
// const monthFormat = 'YYYY';
const pageUrl = {
    updateState: 'pollutantemissions/updateState',
    getChartData: 'pollutantemissions/getEntChartData',
    getPointDaysData: 'pollutantemissions/getPointDaysData',
    getEntsData:'pollutantemissions/getEntsData',
};

const dateChildren = [];
const dateYear = moment().get('year');
for (let i = dateYear; i > dateYear - 10; --i) {
    dateChildren.push(<Option key={i}>{i}</Option>);
}

@connect(({
    loading,
    pollutantemissions
}) => ({
    loadingTable: loading.effects[pageUrl.getEntsData],
    loadingChart: loading.effects[pageUrl.getChartData],
    loadingDays: loading.effects[pageUrl.getPointDaysData],
    
    total: pollutantemissions.total,
    pageSize: pollutantemissions.pageSize,
    pageIndex: pollutantemissions.pageIndex,
    tableDatas: pollutantemissions.tableDatas,
    pointDaysDatas: pollutantemissions.pointDaysDatas,
    xAxisData: pollutantemissions.xAxisData,
    seriesData: pollutantemissions.seriesData,

    entxAxisData:pollutantemissions.entxAxisData,
    entseriesData:pollutantemissions.entseriesData,

    pollutantCodes: pollutantemissions.pollutantCodes,
    emissionsSort: pollutantemissions.emissionsSort,
    selectedDate: pollutantemissions.selectedDate,
    clickDate: pollutantemissions.clickDate,
    enttableDatas:pollutantemissions.enttableDatas
}))
export default class EntPollutantEmissions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            beginTime: moment(moment().format('YYYY')),
            endTime: '',
            pointName: '-'
        };
    }
    componentWillMount() {
        this.getChartData();
        this.getEntsTableData(1);
    }
    getChartData = () => {
        this.props.dispatch({
            type: pageUrl.getChartData,
            payload: {
            },
        });
    }

    updateState = (payload) => {
        this.props.dispatch({
            type: pageUrl.updateState,
            payload: payload,
        });
    }
 
   getEntsTableData=(pageIndex)=>{
        this.props.dispatch({
            type: pageUrl.getEntsData,
            payload: {
                pageIndex: pageIndex,
            },
        });
   }

    getPointDaysTableData = (pageIndex) => {
        this.props.dispatch({
            type: pageUrl.getPointDaysData,
            payload: {
                pageIndex: pageIndex,
            },
        });
    }
    handleTableChange = (pagination, filters, sorter) => {
        if (sorter.order) {
            this.updateState({
                emissionsSort: sorter.order,
                pageIndex: pagination.current,
                pageSize: pagination.pageSize
            });
        } else {
            this.updateState({
                emissionsSort: '',
                pageIndex: pagination.current,
                pageSize: pagination.pageSize
            });
        }
        this.getEntsTableData(pagination.current);
    }
    handleChangeDate = (value) => {
        let Year = moment().get('year');
        let Month = moment().get('month') + 1;
        let beginTime = moment(`${value}-01-01 00:00:00`);
        if (Month < 10) {
            Month = '0' + Month
        }
        // 本年份
        if ((+value) === Year) {
            this.updateState({
                beginTime: beginTime.format('YYYY-MM-01 HH:mm:ss'),
                endTime: beginTime.add(1, 'years').format('YYYY-01-01 00:00:00'),
                selectedDate: `${Year}-${Month}-01 00:00:00`,
                clickDate: `${Year}-${Month}-01 00:00:00`,
                enttableDatas: []
            });
        } else {
            this.updateState({
                beginTime: beginTime.format('YYYY-MM-01 HH:mm:ss'),
                endTime: beginTime.add(1, 'years').format('YYYY-01-01 00:00:00'),
                selectedDate: `${value}-01-01 00:00:00`,// beginTime.format('YYYY-01-01 HH:mm:ss'),
                clickDate: `${value}-01-01 00:00:00`,
                enttableDatas: []
            });
        }
        this.getChartData();
        this.getEntsTableData(1);
    }
    handleChangePollutant = (value) => {
        this.updateState({
            pollutantCodes: [`${value}`]
        });
        this.getChartData();
        this.getEntsTableData(1);
    }

    getOption = () => {
        let option = {
            color: ['rgb(91,176,255)'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: (params) => {
                    var tar = params[0];
                    return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value + ' t';
                }
            },
            legend: {
                data: ['排放总量']
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
                    data: this.props.entxAxisData,// ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '单位：(t)'
                }
            ],
            series: [
                {
                    name: '排放总量',
                    type: 'bar',
                    barWidth: '30%',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    data: this.props.entseriesData, // [800, 1000, 1100, 1200, 1300, 550, 820, 830, 1000, 1050, 1000, 900]
                }
            ]
        };
        return option;
    }
    onChartClick = (opt) => {
        let { selectedDate } = this.props;
        console.log(selectedDate);
        var dateindex = opt.dataIndex;
        if (dateindex < 9) {
            dateindex = '0' + (dateindex + 1);
        }
        let clickDate = moment(selectedDate).format(`YYYY-${dateindex}-01 00:00:00`);

        this.updateState({
            clickDate: clickDate
        });
        this.getEntsTableData(1);
    }
    render() {
         const columns = [
            {
                title: (<span style={{ fontWeight: 'bold' }}>企业名称</span>),
                dataIndex: 'EnterpriseName',
                key: 'EnterpriseName',
                width: '66.66%',
                align: 'left',
                render: (text, record) => {
                    return (
                        <Link to={`/analysis/pollutantemissionspoint/${record.EnterpriseCode}/${record.EnterpriseName}`}> {text} </Link>
                    );
                }
            },
            {
                title: (<span style={{ fontWeight: 'bold' }}>排放量(mg/m³)</span>),
                dataIndex: 'Emissions',
                key: 'Emissions',
                align: 'left',
                width: '33.33%',

                sorter: true,
                render: (text, record) => {
                    return text;
                }
            }
        ];


        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    { Name: '首页', Url: '/' },
                    { Name: '智能分析', Url: '' },
                    { Name: '企业月度排放量分析', Url: '' }
                ]
            }>
                <div className={styles.cardTitle}
                // style={{
                //     height: 'calc(100vh - 248px)'
                // }}
                >
                    <Card title="排放量统计" extra={
                        <div>
                            <span style={{ color: '#b3b3b3' }}>污染物
                                    <Select
                                    size="default"
                                    defaultValue={this.props.pollutantCodes[0]}
                                    onChange={this.handleChangePollutant}
                                    style={{ width: 200, marginLeft: 10, marginRight: 20 }}
                                >
                                    <Option key="01">实测烟尘</Option>
                                    <Option key="02">实测二氧化硫</Option>
                                    <Option key="03">实测氮氧化物</Option>
                                </Select>
                            </span>
                            <span style={{ color: '#b3b3b3' }}>时间
                                    <Select
                                    size="default"
                                    defaultValue={dateYear}
                                    onChange={this.handleChangeDate}
                                    style={{ width: 200, marginLeft: 10 }}
                                >
                                    {dateChildren}
                                </Select>
                            </span>
                        </div>
                    }>
                        <Row>
                            <ReactEcharts
                                option={this.getOption()}
                                lazyUpdate={true}
                                style={{ height: '300px', width: '100%' }}
                                className="echarts-for-echarts"
                                onChartReady={this.onChartReadyCallback}
                                onEvents={{ 'click': this.onChartClick }}
                                theme="my_theme" />
                        </Row>

                        <Row style={styles.cardTitle.cardBg}>

                            <Card
                                style={{}}
                                // type="inner"
                                bordered={false}
                                title={`${moment(this.props.clickDate).format('YYYY-MM')}月排放量排口统计`}
                            >
                                <Table style={{}} className={styles.dataTable}
                                    rowKey={(record, index) => `complete${index}`}
                                    loading={this.props.loadingTable}
                                    columns={columns}
                                    onChange={this.handleTableChange}
                                    size="small"// small middle
                                    dataSource={this.props.enttableDatas}
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
