import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Row, Col, TreeSelect, Table, Card, Button, Icon} from 'antd';
import styles from './index.less';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import Attention from '../../components/AnalyAlarmReason/AttentionDegree';
import EnterpriseAutoComplete from '../../components/EnterpriseAutoComplete/index';
import moment from 'moment';
import AlarmType from '../../mockdata/AnalyAlarmType/AlarmType';
import IndustryType from '../../mockdata/Base/Code/T_Cod_IndustryType';
import ConclusionInfo from '../../components/EnterpriseList/Conclusion';
import Cookie from 'js-cookie';
/*
页面：报警类别统计
描述：分别统计各个设备的报警
add by cg 18.6.8
modify by
*/
let standard = AlarmType[1];
export default class AnalyAlarmType extends Component {
    constructor(props) {
        super(props);

        const user = JSON.parse(Cookie.get('token'));
        if (user.User_Account === 'lisonggui') {
            standard = AlarmType[0];
        }
        // 左侧图的显示数据
        var AlarmStates = [];
        var AlarmFaults = [];
        var AlarmEnterprises = [];
        standard.data.map((item) => {
            AlarmStates.push(item.AlarmState);
            AlarmFaults.push(item.AlarmFault);
            AlarmEnterprises.push(item.AlarmEnterprise);
        });
        var sum = [];
        var sumbing = [];
        var colAlarmState = AlarmStates.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var colAlarmFault = AlarmFaults.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var colAlarmEnterprises = AlarmEnterprises.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        sum.push(colAlarmState);
        sum.push(colAlarmFault);
        sum.push(colAlarmEnterprises);
        sumbing.push({
            value: colAlarmState,
            name: '状态报警'
        });
        sumbing.push({
            value: colAlarmFault,
            name: '故障报警'
        });
        sumbing.push({
            value: colAlarmEnterprises,
            name: '设备报警'
        });
        let i = sum.length;
        let j = sum.length;
        let len = sum.length;
        for (i = 0; i < len; i++) {
            for (j = i; j < len; j++) {
                if (sum[i] > sum[j]) {
                    [sum[i], sum[j]] = [sum[j], sum[i]];
                }
            }
        }
        var PointName = [];
        sum.map((item) => {
            if (item === colAlarmState) {
                PointName.push('状态报警');
            }
            if (item === colAlarmFault) {
                PointName.push('故障报警');
            }
            if (item === colAlarmEnterprises) {
                PointName.push('设备报警');
            }
        });
        console.log(PointName);
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
        debugger;
        var conclusion2 = standard.summer;
        this.state = {
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
            expandForm: true,
            pollutantSum: sum,
            sumbings: sumbing,
            IndustryTypes: industryList,
            histogram: PointName,
            conclusion: conclusion2,
        };
    }
    _handleDateChange=(date, dateString) => {
        console.log(date);// [moment,moment]
        console.log(dateString);// ['2018-06-23','2018-06-25']
        this.setState({rangeDate: date});
    };
    onChange = (value) => {
        this.setState({ value });
    }
    render() {
        const columns = [{
            title: '名称',
            dataIndex: 'PointName',
            key: 'PointName',
            width: 110,
        }, {
            title: '设备报警',
            dataIndex: 'AlarmEnterprise',
            key: 'AlarmEnterprise',
            width: 110,
        }, {
            title: '状态报警',
            dataIndex: 'AlarmState',
            key: 'AlarmState',
            width: 110,
        }, {
            title: '故障报警',
            dataIndex: 'AlarmFault',
            key: 'AlarmFault',
            width: 110,
        }, {
            title: '总计',
            dataIndex: 'Count',
            key: 'Count',
            width: 110,
            render: (text, record) => (
                Number.parseInt(record.AlarmEnterprise) + Number.parseInt(record.AlarmState) + Number.parseInt(record.AlarmFault)
            )
        }
        ];
        // 循环求数据
        const dataSource = [];
        for (let item of standard.data) {
            dataSource.push({
                PointName: item.PointName,
                AlarmEnterprise: item.AlarmEnterprise,
                AlarmState: item.AlarmState,
                AlarmFault: item.AlarmFault,
            });
        }
        // 最下面一栏的总计
        let ColAlarmEnterprise = [];
        let ColAlarmState = [];
        let ColAlarmFault = [];
        for (let items of dataSource) {
            ColAlarmEnterprise.push(items.AlarmEnterprise);
            ColAlarmState.push(items.AlarmState);
            ColAlarmFault.push(items.AlarmFault);
        }
        var ColAlarmEnterprises = ColAlarmEnterprise.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var ColAlarmStates = ColAlarmState.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var ColAlarmFaults = ColAlarmFault.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        dataSource.push({
            PointName: '总计',
            AlarmEnterprise: ColAlarmEnterprises,
            AlarmState: ColAlarmStates,
            AlarmFault: ColAlarmFaults,

        });
        let Circleoption = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            title: {
                text: '报警类别占比'
            },
            series: [
                {
                    name: '报警类型',
                    type: 'pie',
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    radius: '90%',
                    center: ['50%', '50%'],
                    data: this.state.sumbings,
                }
            ]
        };
        let histogramoption = {
            grid: { // 控制图的大小，调整下面这些值就可以，
                x: 60,
                left: '3%',
                right: '3%',
                bottom: '3%',
                top: '10%',
                containLabel: true
                // x2: 50,
                //  y2: 50, // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
            },
            title: {
                text: '报警类别排名'
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: this.state.histogram,

            },
            series: [{
                data: this.state.pollutantSum,
                type: 'bar',
                barMaxWidth: 50, // 最大宽度
            }],
        };

        return (
            <div>
                <PageHeaderLayout>
                    <Card extra={
                        <div>
                            <RangePicker_ style={{width: 250}} placeholder="请选择时间" format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                        </div>
                    }>
                        <Row>
                            <Col span={12} >
                                <ReactEcharts
                                    option={histogramoption}
                                    notMerge={true}
                                    lazyUpdate={true} style={{height: 350}} />

                            </Col>
                            <Col span={12} >
                                <ReactEcharts
                                    option={Circleoption}
                                    notMerge={true}
                                    lazyUpdate={true} style={{height: 350}} />
                            </Col>
                        </Row>
                        <ConclusionInfo content={this.state.conclusion}>
                            <Table
                                pagination={false}
                                style={{marginTop: 10, marginBottom: 10}}
                                dataSource={dataSource}
                                columns={columns}
                                scroll={{ x: 640, y: 350 }}
                                onRow={(record, index) => {
                                    return {
                                        onClick: (a, b, c) => {
                                            let {selectid} = this.state;
                                            let index = selectid.findIndex(t => t === record.key);
                                            if (index !== -1) {
                                                selectid.splice(index, 1);
                                            } else {
                                                selectid.push(record.key);
                                            }
                                            this.setState({selectid: selectid});
                                        }, // 点击行
                                        onMouseEnter: () => {}, // 鼠标移入行
                                    };
                                }}
                            />
                        </ConclusionInfo>

                    </Card>
                </PageHeaderLayout>
            </div>
        );
    }
}
