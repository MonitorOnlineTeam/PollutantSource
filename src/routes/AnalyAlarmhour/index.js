import React, { Component } from 'react';
import { Card,
    TreeSelect,
    Row,
    Col,
    Button,
    Breadcrumb,
    Tabs,
    Icon,
} from 'antd';
import Attention from '../../components/AnalyAlarmReason/AttentionDegree';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import PointList from '../../components/PointList/PointsList';
import styles from '../../routes/PointDetail/index.less';
import { Link } from 'dva/router';
import ReactEcharts from 'echarts-for-react';
import AlarmContinue from '../../mockdata/Base/Code/T_Cod_AlarmContinue.json';
import IndustryType from '../../mockdata/Base/Code/T_Cod_IndustryType';
/*
页面：报警时长统计
描述：分别统计各个设备的累计报警时长和连续报警时长
add by cg 18.6.8
modify by
*/
export default class AnalyAlarmhour extends Component {
    constructor(props) {
        super(props);
        var name = [];
        var ContinueTime = [];
        var CountTime = [];
        AlarmContinue.map((item) => {
            debugger;
            name.push(item.PointName);
            ContinueTime.push(item.ContinueTimeLength);
            CountTime.push(item.CountTimeLength);
        });
        var industryList = [];
        IndustryType.map((item) => {
            if (item.ParentNode === 'root') {
                industryList.push({
                    label: item.IndustryTypeName,
                    value: item.IndustryTypeName,
                    key: item.IndustryTypeName,
                    children: getSecond(item.IndustryTypeCode)
                });
            }
        });
        function getSecond(Code) {
            var children = [];
            IndustryType.map((item) => {
                if (item.ParentNode === Code) {
                    children.push({
                        label: item.IndustryTypeName,
                        value: item.IndustryTypeName,
                        key: item.IndustryTypeName,
                        children: getSecond(item.IndustryTypeCode)
                    }
                    );
                }
            });
            return children;
        }
        this.state = {
            AlarmContinueList: AlarmContinue,
            expandForm: true,
            DGIMNS: [],
            PointName: name,
            ContinueTimeLength: ContinueTime,
            CountTimeLength: CountTime,
            IndustryTypes: industryList,
        };
    }
    state = {
        value: undefined,
    };
    SearchEmergencyDataList = (value) => {
        debugger;
        this.setState({
            AlarmContinueList: [],
            DGIMNS: value,
            PointName: [],
            ContinueTimeLength: [],
            CountTimeLength: [],
        });
        console.log(this.state.DGIMNS);
        let dataList = [];
        AlarmContinue.map((item, _key) => {
            if (value.indexOf(item.DGIMN) > -1) {
                dataList.push(item);
            }
        });
        var name = [];
        var ContinueTime = [];
        var CountTime = [];
        dataList.map((item) => {
            name.push(item.PointName);
            ContinueTime.push(item.ContinueTimeLength);
            CountTime.push(item.CountTimeLength);
        });
        this.setState({
            AlarmContinueList: dataList,
            PointName: name,
            ContinueTimeLength: ContinueTime,
            CountTimeLength: CountTime,
        });
    };
    onChange = (value) => {
        console.log(value);
        this.setState({ value });
    }
    render() {
        const treeData = this.state.IndustryTypes;
        let option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['连续报警时长', '累计时长']
            },
            toolbox: {
                show: true,
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: this.state.PointName
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '连续报警时长',
                    type: 'bar',
                    data: this.state.ContinueTimeLength,
                    barMaxWidth: 50, // 最大宽度
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
                },
                {
                    name: '累计时长',
                    type: 'bar',
                    data: this.state.CountTimeLength,
                    barMaxWidth: 50, // 最大宽度
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
                },

            ],
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
        };
        return (
            <PointList handleChange={this.SearchEmergencyDataList} IsMoreSelect="true">
                <div className={styles.pageHeader}>
                    <Breadcrumb className={styles.breadcrumb} >
                        <Breadcrumb.Item key="1">
                            <Link to="/monitor/overview"> 首页 </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item key="1">
                            综合分析
                        </Breadcrumb.Item>
                        <Breadcrumb.Item key="1-3-1">
                            报警专题分析
                        </Breadcrumb.Item>
                        <Breadcrumb.Item key="1-3-1">
                            报警时长统计
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div>
                    <Card title="报警时长统计" bordered={false}>
                        <p>
                            <Row style={{marginLeft: 50}}>
                                <Col span={6}>
                                    <span >时间：<RangePicker_ style={{width: 250, marginLeft: 5}} placeholder="请选择时间" format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
                                </Col>
                                <Col span={5}>
                                    <span>行业：</span>
                                    <TreeSelect
                                        showSearch={true}
                                        style={{ width: 200 }}
                                        value={this.state.value}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder="请选择行业"
                                        allowClear={true}
                                        treeDefaultExpandAll={true}
                                        onChange={this.onChange}
                                        treeData={treeData}
                                    /></Col>
                                <Col span={5}>
                                    <span > 级别：<Attention placeholder="请选择控制级别" width={200} /></span>
                                </Col>

                                <Col span={5}>
                                    <span ><Button type="primary" onClick={this._Processes}>查询</Button></span>
                                </Col>
                            </Row>
                        </p>
                        <p style={{marginTop: 30}}>
                            <Card style={{ height: 'calc(100vh - 305px)' }}>
                                <ReactEcharts option={option} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 'calc(100vh - 500px)', marginLeft: -100 }} />
                                <Card title="总结：" >
                                    <p>连续报警时长最大是锅炉小号烟囱1排口，时长为33；累计报警时长最大是脱硫出口1排口，时长为99。</p>
                                </Card>
                            </Card>
                        </p>
                    </Card>
                </div>
            </PointList>
        );
    }
}
