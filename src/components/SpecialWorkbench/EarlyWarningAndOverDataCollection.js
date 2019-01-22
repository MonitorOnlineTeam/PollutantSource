import React, { PureComponent } from 'react';
import { Row, Col, Card, List, Tabs, Divider, Modal, Table ,Spin} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import ReactEcharts from 'echarts-for-react';
import styles from './EarlyWarningAndOverDataCollection.less';
import PollutantSelect from "../PointDetail/PollutantSelect";

const pageUrl = {
    updateState: 'workbenchmodel/updateState',
    getDataOverWarningData: 'workbenchmodel/getDataOverWarningData',
    getAllPointOverDataList: 'workbenchmodel/getAllPointOverDataList',
    getRealTimeWarningDatas: 'workbenchmodel/getRealTimeWarningDatas',
    getPollutantList: 'points/querypollutantlist',
    //加载企业信息
    getEntInfo: 'baseinfo/queryentdetail'
};
const TabPane = Tabs.TabPane;
@connect(({
    loading,
    workbenchmodel,
    points
}) => ({
    loadingDataOverWarning: loading.effects[pageUrl.getDataOverWarningData],
    hourDataOverWarningList: workbenchmodel.hourDataOverWarningList,
    allPointOverDataList: workbenchmodel.allPointOverDataList,
    warningDetailsDatas: workbenchmodel.warningDetailsDatas,
    pollutantList: points.pollutantlist,
    loadingRealTimeWarningDatas: loading.effects[pageUrl.getRealTimeWarningDatas],
}))
class EarlyWarningAndOverDataCollection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false,
            clickThisPointName: '',
            SuggestValue: null,
        };
    }

    componentWillMount() {
        this.getDataOverWarningData();
        this.getAllPointOverDataList();
    }

    /**
     * 智能监控_排口超标汇总_更新数据
     */
    getAllPointOverDataList = () => {
        this.props.dispatch({
            type: pageUrl.getAllPointOverDataList,
            payload: {},
        });
    }

    /**
     * 智能监控_当小时预警消息_更新数据
     */
    getDataOverWarningData = () => {
        this.props.dispatch({
            type: pageUrl.getDataOverWarningData,
            payload: {},
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
       * 智能监控_实时预警详情
       */
    getRealTimeWarningDatas = () => {
        this.props.dispatch({
            type: pageUrl.getRealTimeWarningDatas,
            payload: {},
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
 * 智能监控_显示预警详情弹窗口
 */
    showModal = (name, mn, pollutantCode, pollutantName, SuggestValue) => {

        this.updateState({
            SuggestValue: SuggestValue,
            warningDetailsDatas: {
                ...this.props.warningDetailsDatas,
                ...{
                    DGIMNs: mn,
                    selectedPollutantCode: pollutantCode,
                    selectedPollutantName: pollutantName
                }
            }
        });
        this.getRealTimeWarningDatas();
        this.getPollutantList(mn);

        this.setState({
            SuggestValue: SuggestValue,
            visibleModal: true,
            clickThisPointName: name,
        });
    }

    handleCancel = () => {
        this.setState({
            visibleModal: false,
        });
    }

    renderWarningDetailsCharts = () => {
        if (this.props.loadingRealTimeWarningDatas) {
            return (<Spin
                style={{
                    width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                size="large"
            />);
        }
        return this.getWarningChartOption();
    }

    /**
     * 智能监控_渲染预警详情图表数据
     */
    getWarningChartOption = () => {
        let { chartDatas, selectedPollutantCode, selectedPollutantName } = this.props.warningDetailsDatas;
        const { pollutantList } = this.props;
        let xAxis = [];
        let seriesData = [];

        chartDatas.map((item) => {
            xAxis.push(`${moment(item.MonitorTime).format('HH:mm:ss')}`);
            seriesData.push(item[selectedPollutantCode]);
        });
        let suugestValue = this.state.SuggestValue;

        // if(chartDatas.length>0)
        // {
        //     suugestValue=chartDatas[0][selectedPollutantCode+'_SuggestValue'];
        // }
        //当前选中的污染物的信息
        const selectPllutantInfo = pollutantList.find((value, index, arr) => value.pollutantCode == selectedPollutantCode);
        let legenddata = [];
        let pollutantData = [];
        legenddata.push(selectedPollutantName);
        if (selectPllutantInfo && selectPllutantInfo.alarmType) {
            legenddata.push('标准值');
            switch (selectPllutantInfo.alarmType) {
                //上限报警
                case 1:
                    pollutantData = [
                        {
                            yAxis: selectPllutantInfo.upperValue,
                            symbol: 'none',
                            label: {
                                normal: {
                                    position: 'end',
                                    formatter: selectPllutantInfo.upperValue
                                }
                            }
                        }
                    ];
                    break;
                //下限报警
                case 2:
                    pollutantData = [
                        {
                            yAxis: selectPllutantInfo.lowerValue,
                            symbol: 'none',
                            label: {
                                normal: {
                                    position: 'end',
                                    formatter: selectPllutantInfo.lowerValue
                                }
                            }
                        }
                    ];
                    break;
                //区间报警
                case 3:
                    pollutantData = [
                        {
                            yAxis: selectPllutantInfo.upperValue,
                            symbol: 'none',
                            label: {
                                normal: {
                                    position: 'end',
                                    formatter: selectPllutantInfo.upperValue
                                }
                            }
                        },
                        {
                            yAxis: selectPllutantInfo.lowerValue,
                            symbol: 'none',
                            label: {
                                normal: {
                                    position: 'end',
                                    formatter: selectPllutantInfo.lowerValue
                                }
                            }
                        }
                    ];
                    break;
            }
        }

        let suggestData = null;


        if (suugestValue && suugestValue != "-") {

            legenddata.push('建议浓度');
            suggestData = [
                {
                    yAxis: suugestValue,
                    symbol: 'none',
                    label: {
                        normal: {
                            position: 'end',
                            formatter: suugestValue
                        }
                    }
                }
            ];
        }
        let option = {
            color: ['#37b5e4', '#ff9d45', '#4fde48'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legenddata
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxis,
                name: '监测时间'
            },
            yAxis: {
                type: 'value',
                name: 'ug/m³',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            grid: {
                left: '5%',
                right: '8%'
            },
            series: [
                {
                    name: selectedPollutantName,
                    type: 'line',
                    data: seriesData,
                },
                {
                    name: '标准值',
                    type: 'line',
                    data: [],
                    markLine: {
                        data: pollutantData
                    }
                },
                {
                    name: '建议浓度',
                    type: 'line',
                    data: [],
                    markLine: {
                        data: suggestData,
                        // itemStyle : {
                        //     normal: {
                        //         lineStyle: {
                        //             color:'#FFC0CB',
                        //         },
                        //     }

                        // },
                    }
                }
            ]
        };


        return <ReactEcharts
            // loadingOption={this.props.loadingRealTimeWarningDatas}
            option={option}
            style={{ height: 'calc(100vh - 400px)', width: '100%' }}
            className="echarts-for-echarts"
            theme="my_theme"
        />;

    }

    //如果是数据列表则没有选择污染物，而是展示全部污染物
    getPollutantSelect = () => (<PollutantSelect
        optionDatas={this.props.pollutantList}
        defaultValue={this.props.warningDetailsDatas.selectedPollutantCode}
        style={{ width: 150, marginRight: 10 }}
        onChange={this.handlePollutantChange}
    />)

    // 污染物
    handlePollutantChange = (value, selectedOptions) => {
        this.updateState({
            warningDetailsDatas: {
                ...this.props.warningDetailsDatas,
                ...{
                    selectedPollutantCode: value,
                    selectedPollutantName: selectedOptions.props.children
                }
            }
        });
    };

    /**
 * 实时预警和超标汇总(2)
 */
    renderHourDataOverWarningList = () => {
        const listData = [];
        const { hourDataOverWarningList } = this.props;
        hourDataOverWarningList.tableDatas.map((items,key) => {
            //判断报警是否超过4小时
            listData.push({
                key:key,
                title: `${items.PointName}`,
                description: (
                    <div>
                        {
                            items.OverWarnings.map((item,key) => (
                                <div key={key}>
                                    <div key={key} className={styles.warningsData} onClick={(e) => this.showModal(items.PointName, items.DGIMNs, item.PollutantCode, item.PollutantName, item.SuggestValue)}>
                                        {item.PollutantName}
                                        <Divider type="vertical" style={{ backgroundColor: '#b3b3b3' }} />
                                        超标预警值为{item.AlarmValue}ug/m3
                                        <Divider type="vertical" style={{ backgroundColor: '#b3b3b3' }} />
                                        建议浓度为{item.SuggestValue}ug/m3
                                        <span style={{ float: 'right' }}>{item.AlarmOverTime}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            });

        });
        return (<List
            itemLayout="vertical"
            dataSource={listData}
            renderItem={(item,key) => (
                <List.Item
                    key={key}
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
    renderAllPointOverDataList = () => {
        const listData = [];
        const { allPointOverDataList } = this.props;
        allPointOverDataList.tableDatas.map((item,key) => {
            //判断报警是否超过4小时
            listData.push({
                title: `${item.PointName}`,
                description: (
                    <div>
                        {
                            <div>
                                <div style={{ backgroundColor: 'rgb(249,249,249)', padding: 10, marginBottom: 5 }}>
                                    {item.PollutantNames}
                                    <Divider type="vertical" style={{ backgroundColor: '#b3b3b3' }} />
                                    超标:{item.AlarmCount}次
                                    <span style={{ float: 'right' }}>{moment(item.LastTime).format('YYYY-MM-DD HH:00')}~{moment(item.FirstTime).format('YYYY-MM-DD HH:00')}</span>
                                </div>
                            </div>

                        }
                    </div>
                )
            });
        });
        return (<List
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
     * 智能监控_渲染预警详情表格数据
     */
    renderWarningDetailsTable = () => {
        let { selectedPollutantCode, selectedPollutantName, chartDatas } = this.props.warningDetailsDatas;

        const columns = [
            {
                title: '监测时间',
                dataIndex: 'MonitorTime',
                width: '20%',
                key:'MonitorTime',
                render: (text, record) => `${moment(text).format('HH:mm:ss')}`,
            },
            {
                title: '污染物',
                dataIndex: 'none',
                key:'none',
                render: (text, record) => `${selectedPollutantName}`,
                width: '20%'
            },
            {
                title: '监测值',
                dataIndex: selectedPollutantCode,
                key:selectedPollutantCode,
                width: '20%',
                align: 'center'
            },
            {
                title: '标准值',
                dataIndex: `${selectedPollutantCode}_StandardValue`,
                key:`${selectedPollutantCode}_StandardValue`,
                width: '20%',
                align: 'center'
            },
            {
                title: '建议浓度',
                dataIndex: `${selectedPollutantCode}_SuggestValue`,
                key:`${selectedPollutantCode}_SuggestValue`,
                width: '20%',
                align: 'center'
            }
        ];

        return <Table
            columns={columns}
            dataSource={chartDatas}
            // key="warntable"
            size="small"
            pagination={{ pageSize: 15 }}
            loading={this.props.loadingRealTimeWarningDatas}
            scroll={{ y: 'calc(100vh - 490px)' }}
            rowClassName={
                (record, index, indent) => {
                    if (index === 0) {
                        return;
                    }
                    if (index % 2 !== 0) {
                        return 'light';
                    }
                }
            }
        />;
    }

    render() {
        const { loadingDataOverWarning } = this.props;
        return (
            <div>
                <div> <Card
                    style={{ marginBottom: 10 }}
                    bordered={false}
                    loading={this.props.loadingDataOverWarning}
                >
                    <Card.Grid style={{ width: '100%', height: 505, paddingTop: 15 }}>
                        <Tabs>
                            <TabPane tab="实时预警" key="1">
                                <div style={{ height: 400, overflow: 'auto' }}>
                                    {
                                        this.renderHourDataOverWarningList()
                                    }
                                </div>
                            </TabPane>
                            <TabPane tab="超标汇总" key="2">
                                <div style={{ height: 400, overflow: 'auto' }}>
                                    {
                                        this.renderAllPointOverDataList()
                                    }
                                </div>
                            </TabPane>
                        </Tabs>
                    </Card.Grid>
                      </Card>
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
                        style={{ height: 'calc(100vh - 400px)' }}
                        className={styles.warningDetailsModal}
                    >
                        <TabPane tab="图表分析" key="1">
                            <Row>
                                <Col span={3}>{this.getPollutantSelect()}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        this.renderWarningDetailsCharts()
                                    }
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="数据分析" key="2">
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

export default EarlyWarningAndOverDataCollection;