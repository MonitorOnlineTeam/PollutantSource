// 监控总览-数据查询
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import {getPollutantDatas, getAllConcentration} from '../../mockdata/Base/commonbase';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import ButtonGroup_ from '../../components/PointDetail/ButtonGroup_';
import Select_ from '../../components/PointDetail/Select_';
import styles from './index.less';
import {
    Table,
    Row,
    Col,
    Card,
    Popover,
    Icon,
    Modal
} from 'antd';

/*
页面：2、数据查询
描述：管控状态、参数信息，分钟、小时，日数据
add by cg 18.6.8
modify by
*/
const pollutantDatas = getPollutantDatas();

class DataQuery extends Component {
    constructor(props) {
        super(props);
        var defaultOption = {
            legend: [],
            xAxisData: [],
            series: [{
                name: '',
                type: 'line',
                data: []
            }]
        };
        const obj = {
            startTime: '',
            endTime: '',
            concentration: [pollutantDatas[0].Value],
            dataType: 'hour'
        };
        let concentrationDatas = getAllConcentration(obj);
        concentrationDatas = concentrationDatas[0].PollutantData[0].Datas;
        defaultOption.series[0].name = pollutantDatas[0].Name;

        concentrationDatas.map((item) => {
            defaultOption.xAxisData.push(item.MonitoringTime);
            defaultOption.series[0].data.push((+item.Concentration));
        });

        this.state = {
            pollutantDatas: getPollutantDatas(),
            searchData: {
                pollutantValue: pollutantDatas[0].Value,
                pollutantText: pollutantDatas[0].Name,
                rangeDate: [],
                dataType: 'hour'
            },
            optionData: {
                legendData: [pollutantDatas[0].Name],
                xAxisData: defaultOption.xAxisData,
                series: defaultOption.series,
                unit: pollutantDatas[0].Unit,
                min: pollutantDatas[0].Min,
                max: pollutantDatas[0].Max

            },
            tableData: concentrationDatas,
            tempDataParam: obj,
            lookDataParamModal: false,
        };
    }
    // 污染物
    _handlePollutantChange=(value, selectedOptions) => {
        let setData = this.state;
        setData.searchData.pollutantValue = selectedOptions.props.value;
        setData.searchData.pollutantText = selectedOptions.props.children;
        setData.optionData.unit = selectedOptions.props.Unit;
        setData.optionData.min = selectedOptions.props.minValue;
        setData.optionData.max = selectedOptions.props.maxValue;
        this._reloadData(setData);
    };
    // 时间范围
    _handleDateChange=(date, dateString) => {
        let setData = this.state;
        setData.searchData.rangeDate = date;
        if (date.length === 0) {
            this._reloadData(setData);
        } else {
            let filterTableDatas = [];
            setData.tableData.map((item) => {
                let thisMonitoringTime = `${item.MonitoringTime}`;
                if (thisMonitoringTime >= `${date[0].format('YYYY-MM-DD 00:00:00')}` && thisMonitoringTime <= `${date[1].format('YYYY-MM-DD HH:mm:ss')}`) {
                    filterTableDatas.push(item);
                }
            });
            setData.tableData = [];
            setData.tableData = filterTableDatas;
            let isFilter = true;
            this._reloadData(setData, isFilter);
        }
    };
    // 时间类型
    _handleDateTypeChange=(e) => {
        let setData = this.state;
        setData.searchData.dataType = e.target.value;
        this._reloadData(setData);
    }
    // 刷新
    _reloadData=(stateParam, isFilter) => {
        let setData = stateParam;

        if (!isFilter) {
            setData.tableData = [];
            setData.tableData = getAllConcentration({
                dataType: setData.searchData.dataType,
                concentration: [setData.searchData.pollutantValue]
            })[0].PollutantData[0].Datas;
        }
        setData.optionData.legendData = [setData.searchData.pollutantText];
        setData.optionData.xAxisData = [];
        setData.optionData.series[0].name = setData.searchData.pollutantText;
        setData.optionData.series[0].data = [];

        setData.tableData.map((item) => {
            setData.optionData.xAxisData.push(item.MonitoringTime);
            setData.optionData.series[0].data.push((+item.Concentration));
        });
        // console.log(setData.tableData);
        this.setState({setData});
    };
    _lookDataParamModal=(modalVisible) => {
        let setData = this.state;
        setData.lookDataParamModal = modalVisible;
        this.setState({ setData });
    };
    render() {
        const option = {
            title: {
                // text: '2018-05-17~2018-05-18'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: this.state.optionData.legendData
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {}
                }
            },
            grid: [
                {x: '5%', y: '7%', y2: '5%', x2: '5%'}
            ],
            xAxis: {
                type: 'category',
                name: '时间',
                boundaryGap: false,
                data: this.state.optionData.xAxisData
            },
            yAxis: {
                type: 'value',
                name: '浓度(' + `${this.state.optionData.unit}` + ')',
                axisLabel: {
                    formatter: '{value}'
                },
                min: this.state.optionData.min,
                max: Math.floor((this.state.optionData.min + this.state.optionData.max) * 1.5)
            },
            series: this.state.optionData.series
        };
        // console.log(option);
        const columns = [
            {
                title: '时间',
                dataIndex: 'MonitoringTime',
                width: 200,
                key: 'MonitoringTime'
            }, {
                title: '浓度(' + `${this.state.optionData.unit}` + ')',
                dataIndex: 'Concentration',
                className: 'table_concentration',
                width: 150,
                render: (text, row, index) => {
                    let color = (+row.Concentration) > (+row.Standard) ? 'red' : 'none';
                    let content = (
                        <div className={styles.popoverTip}>
                            <p onClick={() => this._lookDataParamModal(true)}><Icon type="table" style={{ fontSize: 14, color: '#08c' }} /> 查看各参数数据</p>
                            {/* <p><Icon type="table" style={{ fontSize: 14, color: '#08c' }} />标准值:<b>{row.Standard}</b></p> */}
                            {/* <p>超标倍数:<b style={{color: color}}>{row.Overproof}</b></p> */}
                            {/* <a href="##">查看管控状态及参数</a> */}
                            <p><Icon type="laptop" style={{ fontSize: 14, color: '#08c' }} /> 查看仪器状态参数</p>
                        </div>
                    );
                    return (
                        <Popover placement="bottom" content={content} trigger="click">
                            <a style={{color: color, cursor: 'pointer'}}>{row.Concentration}</a>
                        </Popover>);
                },
                key: 'Concentration'
            }];
        return (
            <div className={styles.cardTitle}>
                <Row>
                    <Col span={18} push={6} >
                        <Card title="监测趋势图" extra={
                            <div>
                                <Select_
                                    optionDatas={this.state.pollutantDatas}
                                    ref={(r) => { this.select_Pollutant = r; }}
                                    defaultValue={this.state.pollutantDatas[0].Value}
                                    style={{width: 200}}
                                    onChange={this._handlePollutantChange}
                                />
                                <RangePicker_ dateValue={this.state.searchData.rangeDate} format="YYYY-MM-DD" ref={(r) => { this.RangePicker_ = r; }} onChange={this._handleDateChange} />
                                <ButtonGroup_ checked={this.state.searchData.dataType} onChange={this._handleDateTypeChange} />

                            </div>
                        } style={{ width: '100%', height: 'calc(100vh - 225px)' }}>
                            <ReactEcharts option={option} lazyUpdate={true} notMerge={true} id="rightLine" style={{ width: '100%', height: 'calc(100vh - 380px)' }} />
                        </Card>
                    </Col>
                    <Col span={6} pull={18}>
                        <Card title="监测维度" extra={<a href="#" />} style={{ width: '98%', height: 'calc(100vh - 225px)' }}>
                            <Table rowKey="Key" size="middle" columns={columns} dataSource={this.state.tableData} pagination={false} bordered={true} scroll={{ x: '100%', y: 'calc(100vh - 385px)' }} />
                            <a className="login-form-forgot" href="">加载更多……</a>
                        </Card>
                    </Col>
                </Row>
                <Modal
                    title="Vertically centered modal dialog"
                    wrapClassName="vertical-center-modal"
                    style={{ top: 20 }}
                    visible={this.state.lookDataParamModal}
                    onOk={() => this._lookDataParamModal(false)}
                    onCancel={() => this._lookDataParamModal(false)}
                >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>
            </div>
        );
    }
}
// make this component available to the app
export default DataQuery;
