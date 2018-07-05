// 监控总览-数据查询
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {getPollutantDatas, getAllConcentration} from '../../mockdata/Base/commonbase';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import ButtonGroup_ from '../../components/PointDetail/ButtonGroup_';
import PollutantSelect_ from '../../components/PointDetail/PollutantSelect_';
import PopoverViewData_ from '../../components/PointDetail/PopoverViewData_';
import styles from './index.less';
import {
    Table,
    Row,
    Col,
    Card,
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
        // console.log(this.props.match.params.pointcode);
        var defaultOption = {
            legend: [],
            xAxisData: [],
            series: [{
                name: '',
                type: 'line',
                data: [],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }]
        };
        const defaultPollutant = pollutantDatas[0];
        const obj = {
            startTime: '',
            endTime: '',
            concentration: [pollutantDatas[0].Value],
            dataType: 'realtime',
            point: [this.props.match.params.pointcode] || []
        };
        let concentrationDatas = getAllConcentration(obj);
        let defaultTableDatas = [];
        // console.log(defaultPollutant.Value);
        let t = 1;
        concentrationDatas.map((item) => {
            let _thisPollutantInfo = {};
            item.MonitoringDatas.map((time) => {
                let _thisPollutant = time.PollutantDatas.find((pollutants) => {
                    return pollutants.PollutantCode === defaultPollutant.Value;
                });
                _thisPollutantInfo = _thisPollutant;
                _thisPollutantInfo.MonitoringTime = time.MonitoringTime;
                defaultOption.xAxisData.push(_thisPollutantInfo.MonitoringTime);
                defaultOption.series[0].data.push((+_thisPollutantInfo.Concentration));
                defaultOption.series[0].name = _thisPollutantInfo.PollutantName;
                let _rowData = {};
                _rowData = _thisPollutantInfo;
                _rowData.Key = t++;
                // _rowData.MonitoringTime = _thisPollutantInfo.MonitoringTime;
                // _rowData.Concentration = _thisPollutantInfo.Concentration;
                defaultTableDatas.push(_rowData);
            });
        });

        this.state = {
            pollutantDatas: getPollutantDatas(),
            searchData: {
                pollutantCode: defaultPollutant.Value,
                pollutantText: defaultPollutant.Name,
                rangeDate: [],
                dataType: 'realtime'
            },
            optionData: {
                legendData: [defaultPollutant.Name],
                xAxisData: defaultOption.xAxisData,
                series: defaultOption.series,
                unit: defaultPollutant.Unit,
                min: defaultPollutant.Min,
                max: defaultPollutant.Max

            },
            tableData: defaultTableDatas,
            tempDataParam: obj,
            lookDataParamModal: false,
            modalData: {
                allParamData: [],
                statusData: []
            },
            dgmin: obj.point
        };
    }
    // 污染物
    _handlePollutantChange=(value, selectedOptions) => {
        let setData = this.state;
        setData.searchData.pollutantCode = selectedOptions.props.value;
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

            let _thisTableDatas = getAllConcentration({
                dataType: setData.searchData.dataType,
                pollutantCodes: [setData.searchData.pollutantCode],
                point: setData.dgmin || []
            });
            // console.log(_thisTableDatas);
            let t = 1;
            _thisTableDatas.map((item) => {
                item.MonitoringDatas.map((time) => {
                    // console.log(time);
                    let _thisPollutantInfo = {};
                    let _thisPollutant = time.PollutantDatas.find((pollutants) => {
                        return pollutants.PollutantCode === setData.searchData.pollutantCode;
                    });

                    _thisPollutantInfo = _thisPollutant;
                    _thisPollutantInfo.MonitoringTime = time.MonitoringTime;

                    let _rowData = {};
                    _rowData = _thisPollutantInfo;
                    _rowData.Key = t++;
                    // _rowData.MonitoringTime = _thisPollutantInfo.MonitoringTime;
                    // _rowData.Concentration = _thisPollutantInfo.Concentration;
                    setData.tableData.push(_rowData);
                });
            });
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
    // 查看数据参数弹窗
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
                    // console.log(row.Concentration + ' ' + row.Standard);
                    return (
                        <PopoverViewData_
                            dataParam={{
                                dataType: this.state.searchData.dataType,
                                pollutantCode: this.state.searchData.pollutantCode,
                                point: this.state.dgmin || [],
                                rowTime: row.MonitoringTime,
                                sort: 'asc'
                            }}
                        >
                            <a style={{color: color, cursor: 'pointer'}}>{row.Concentration}</a>
                        </PopoverViewData_>
                    );
                },
                key: 'Concentration'
            }];
        return (
            <div className={styles.cardTitle}>
                <Row>
                    <Col span={18} push={6} >
                        <Card title="监测趋势图" extra={
                            <div>
                                <PollutantSelect_
                                    optionDatas={this.state.pollutantDatas}
                                    ref={(r) => { this.select_Pollutant = r; }}
                                    defaultValue={this.state.searchData.pollutantCode}
                                    style={{width: 200}}
                                    onChange={this._handlePollutantChange}
                                />
                                <RangePicker_ style={{width: 250}} dateValue={this.state.searchData.rangeDate} format="YYYY-MM-DD" onChange={this._handleDateChange} />
                                <ButtonGroup_ checked={this.state.searchData.dataType} onChange={this._handleDateTypeChange} />

                            </div>
                        } style={{ width: '100%', height: 'calc(100vh - 225px)' }}>
                            <ReactEcharts option={option} lazyUpdate={true} notMerge={true} id="rightLine" style={{ width: '100%', height: 'calc(100vh - 380px)' }} />
                        </Card>
                    </Col>
                    <Col span={6} pull={18}>
                        <Card title="监测维度" extra={<a href="#" />} style={{ width: '98%', height: 'calc(100vh - 225px)' }}>
                            <Table
                                rowKey="Key"
                                size="middle"
                                columns={columns}
                                dataSource={this.state.tableData}
                                pagination={false}
                                bordered={false}
                                scroll={{ x: '100%', y: 'calc(100vh - 385px)' }} />
                            <a className="login-form-forgot" href="">加载更多……</a>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}
// make this component available to the app
export default DataQuery;
