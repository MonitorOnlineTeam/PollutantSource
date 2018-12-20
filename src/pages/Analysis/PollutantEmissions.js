/**
 * 功  能：污染物月度排放量分析
 * 创建人：吴建伟
 * 创建时间：2018.12.10
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
import {connect} from 'dva';
// import { debug } from 'util';
// const { MonthPicker } = DatePicker;
const Option = Select.Option;
// const monthFormat = 'YYYY';
const pageUrl = {
    updateState: 'pollutantemissions/updateState',
    getChartData: 'pollutantemissions/getChartData',
    getPointsData: 'pollutantemissions/getPointsData',
    getPointDaysData: 'pollutantemissions/getPointDaysData'
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
    loadingTable: loading.effects[pageUrl.getPointsData],
    loadingChart: loading.effects[pageUrl.getChartData],
    loadingDays: loading.effects[pageUrl.getPointDaysData],
    total: pollutantemissions.total,
    pageSize: pollutantemissions.pageSize,
    pageIndex: pollutantemissions.pageIndex,
    tableDatas: pollutantemissions.tableDatas,
    pointDaysDatas: pollutantemissions.pointDaysDatas,
    xAxisData: pollutantemissions.xAxisData,
    seriesData: pollutantemissions.seriesData,
    pollutantCodes: pollutantemissions.pollutantCodes,
    emissionsSort: pollutantemissions.emissionsSort,
    selectedDate: pollutantemissions.selectedDate,
    clickDate: pollutantemissions.clickDate,
}))
export default class PollutantEmissions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            beginTime: moment(moment().format('YYYY')),
            endTime: '',
            modalVisible: false,
            pointName: '-'
        };
    }
    componentWillMount() {
        this.getChartData();
        this.getPointsTableData(1);
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
    getPointsTableData = (pageIndex) => {
        this.props.dispatch({
            type: pageUrl.getPointsData,
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
        if (this.state.modalVisible) {
            this.getPointDaysTableData(pagination.current);
        } else {
            this.getPointsTableData(pagination.current);
        }
    }
    handleChangeDate = (value) => {
        // debugger;
        let Year = moment().get('year');
        let Month = moment().get('month') + 1;
        let beginTime = moment(`${value}-01-01 00:00:00`);

        // 本年份
        if ((+value) === Year) {
            this.updateState({
                beginTime: beginTime.format('YYYY-MM-01 HH:mm:ss'),
                endTime: beginTime.add(1,'years').format('YYYY-01-01 00:00:00'),
                selectedDate: `${Year}-${Month}-01 00:00:00`,
                clickDate: `${Year}-${Month}-01 00:00:00`,
                tableDatas: []
            });
        } else {
            this.updateState({
                beginTime: beginTime.format('YYYY-MM-01 HH:mm:ss'),
                endTime: beginTime.add(1,'years').format('YYYY-01-01 00:00:00'),
                selectedDate: `${value}-01-01 00:00:00`,// beginTime.format('YYYY-01-01 HH:mm:ss'),
                clickDate: `${value}-01-01 00:00:00`,
                tableDatas: []
            });
        }
        this.getChartData();
        this.getPointsTableData(1);
    }
    handleChangePollutant = (value) => {
        this.updateState({
            pollutantCodes: [`${value}`]
        });
        this.getChartData();
        this.getPointsTableData(1);
    }
    showModal = (params) => {
        // debugger
        this.setState({
            modalVisible: true,
            pointName: params.PointName
        });
        this.updateState({
            queryDGIMNs: params.DGIMNs,
            queryDate: this.props.queryDate,
            pointDaysDatas: []

        });
        this.getPointDaysTableData(1);
    }
    handleModalOk = (e) => {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    }

    handleModalCancel = (e) => {
    // console.log(e);
        this.setState({
            modalVisible: false,
        });
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
                    // debugger;
                    var tar = params[0];
                    return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value + ' kg';
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
                    data: this.props.xAxisData,// ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '单位：(kg)'
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
                    data: this.props.seriesData, // [800, 1000, 1100, 1200, 1300, 550, 820, 830, 1000, 1050, 1000, 900]
                }
            ]
        };
        return option;
    }
    onChartClick = (opt) => {
        // debugger;
        let { selectedDate } = this.props;
        console.log(selectedDate);
        let clickDate = moment(selectedDate).format(`YYYY-${opt.dataIndex + 1}-01 00:00:00`);

        this.updateState({
            clickDate: clickDate
        });
        this.getPointsTableData(1);
    }
    render() {
        const columns = [
            {
                title: (<span style={{fontWeight: 'bold'}}>排口名称</span>),
                dataIndex: 'PointName',
                key: 'PointName',
                width: '66.66%',
                align: 'left',
                render: (text, record) => {
                    return (
                        <a onClick={
                            () => this.showModal(record)
                        } > {text} </a>
                    );
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>排放量(kg)</span>),
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
        const columnsDays = [
            {
                title: (<span style={{fontWeight: 'bold'}}>排口名称</span>),
                dataIndex: 'PointName',
                key: 'PointName',
                align: 'left',
                width: '33.33%',
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>时间</span>),
                dataIndex: 'DataDate',
                key: 'DataDate',
                align: 'left',
                width: '33.33%',
                show: true,
                render: (text, record) => {
                    return text;
                }
            },
            {
                title: (<span style={{fontWeight: 'bold'}}>排放量(kg)</span>),
                dataIndex: 'Emissions',
                key: 'Emissions',
                align: 'left',
                width: '33.33%',
                // width: '300px',
                sorter: true,
                render: (text, record) => {
                    return text;
                }
            }
        ];

        return (
            <MonitorContent>
                <div className={styles.cardTitle}
                    style={{
                        // height: 'calc(100vh - 348px)'
                    }}
                >
                    <Card title="排放量统计" >
                        <Row>
                            <Col span={4}>
                                <span>污染物：
                                    <Select
                                        size="default"
                                        defaultValue={this.props.pollutantCodes[0]}
                                        onChange={this.handleChangePollutant}
                                        style={{ width: 200 }}
                                    >
                                        <Option key="01">实测烟尘</Option>
                                        <Option key="02">实测二氧化硫</Option>
                                        <Option key="03">实测氮氧化物</Option>
                                    </Select>
                                </span>
                            </Col>
                            <Col span={4}>
                                <span>时间：
                                    <Select
                                        size="default"
                                        defaultValue={dateYear}
                                        onChange={this.handleChangeDate}
                                        style={{ width: 200 }}
                                    >
                                        {dateChildren}
                                    </Select>
                                </span>
                            </Col>
                        </Row>

                        <Row loading={this.props.loadingChart}>
                            <ReactEcharts
                                option={this.getOption()}
                                lazyUpdate={true}
                                style={{height: '300px', width: '100%'}}
                                className="echarts-for-echarts"
                                onChartReady={this.onChartReadyCallback}
                                onEvents={{'click': this.onChartClick}}
                                theme="my_theme" />
                        </Row>

                        <Row style={styles.cardTitle.cardBg}>

                            <Card
                                style={{  }}
                                // type="inner"
                                bordered={false}
                                title={`${moment(this.props.clickDate).format('YYYY-MM')}月排放量排口统计`}
                            >
                                <Table style={{ }} className={styles.dataTable}
                                    loading={this.props.loadingTable}
                                    columns={columns}
                                    onChange={this.handleTableChange}
                                    size="small"// small middle
                                    dataSource={this.props.tableDatas}
                                    scroll={{ y: 'calc(100vh - 400px)' }}
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
                        <Modal
                            title={`${moment(this.props.clickDate).format('YYYY-MM')}月-${this.state.pointName} 排放量详情`}
                            width="50%"
                            visible={this.state.modalVisible}
                            onOk={this.handleModalOk}
                            onCancel={this.handleModalCancel}
                            destroyOnClose={true}
                        >
                            <Table style={{ marginTop: 16 }} className={styles.dataTable}
                                loading={this.props.loadingDays}
                                columns={columnsDays}
                                onChange={this.handleTableChange}
                                size="small"// small middle
                                dataSource={this.props.pointDaysDatas}
                                scroll={{ y: 'calc(100vh - 400px)' }}
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
                        </Modal>
                    </Card>
                </div>
            </MonitorContent>
        );
    }
}
