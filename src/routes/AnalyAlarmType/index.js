import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Row, Col, TreeSelect, Table, Card, Button, Icon} from 'antd';
import styles from './index.less';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import Attention from '../../components/AnalyAlarmReason/AttentionDegree';
import EnterpriseAutoComplete from '../../components/EnterpriseAutoComplete/index';
import moment from 'moment';
import AlarmType from '../../mockdata/Base/Code/T_Cod_AlarmType';
/*
页面：报警类别统计
描述：分别统计各个设备的报警
add by cg 18.6.8
modify by
*/

export default class AnalyAlarmType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
            expandForm: true,
        };
    }
    renderForm() {
        return this.state.expandForm ? this.renderSimpleForm() : this.renderAllForm();
    }
    renderSimpleForm() {
        const treeData = [{
            label: '农、林、牧、渔业',
            value: '农、林、牧、渔业',
            key: '农、林、牧、渔业',
            children: [{
                label: '农业',
                value: '农业',
                key: '农业',
            }, {
                label: '制造业',
                value: '制造业',
                key: '制造业',
            }],
        }, {
            label: '交通运输、仓储和邮政业',
            value: '交通运输、仓储和邮政业',
            key: '交通运输、仓储和邮政业',
            children: [{
                label: '铁路运输业',
                value: '铁路运输业',
                key: '铁路运输业',
            }, {
                label: '客运火车站',
                value: '客运火车站',
                key: '客运火车站',
            }],
        }];
        return (

            <Row style={{marginBottom: 30}}>
                <Col span="8">
                    <span >企业：<EnterpriseAutoComplete width={200} placeholder="请选择企业" /></span>
                </Col>
                <Col span="8">
                    <span>
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
                        />
                    </span>
                </Col>
                <Col span="8">
                    <span ><Button style={{width: 90}} type="primary" onClick={this._Processes}>查询</Button><a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                              展开 <Icon type="down" /> </a></span>
                </Col>
            </Row>
        );
    }

    toggleForm = () => {
        this.setState({
            expandForm: !this.state.expandForm,
        });
    };
    renderAllForm() {
        const treeData = [{
            label: '农、林、牧、渔业',
            value: '农、林、牧、渔业',
            key: '农、林、牧、渔业',
            children: [{
                label: '农业',
                value: '农业',
                key: '农业',
            }, {
                label: '制造业',
                value: '制造业',
                key: '制造业',
            }],
        }, {
            label: '交通运输、仓储和邮政业',
            value: '交通运输、仓储和邮政业',
            key: '交通运输、仓储和邮政业',
            children: [{
                label: '铁路运输业',
                value: '铁路运输业',
                key: '铁路运输业',
            }, {
                label: '客运火车站',
                value: '客运火车站',
                key: '客运火车站',
            }],
        }];
        return (
            <div>
                <Row style={{marginBottom: 30}}>
                    <Col span="8">
                        <span >企业：<EnterpriseAutoComplete width={200} placeholder="请选择企业" /></span>
                    </Col>
                    <Col span="8">
                        <span>
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
                            />
                        </span>
                    </Col>
                    <Col span="8">
                        <span ><Button style={{width: 90}} type="primary" onClick={this._Processes}>查询</Button><a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                              收起 <Icon type="up" />
                        </a></span>
                    </Col>
                </Row>
                <Row style={{marginBottom: 30}}>
                    <Col span="8">
                        <span > 级别：<Attention placeholder="请选择控制级别" width={200} /></span>
                    </Col>
                    <Col span="8">
                        <span className="gutter-box">时间：<RangePicker_ style={{width: 250}} placeholder="请选择时间" format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
                    </Col>
                </Row>
            </div>
        );
    }
    render() {
        const columns = [{
            title: '排口名称',
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
        for (let item of AlarmType) {
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
            series: [
                {
                    name: '报警类型',
                    type: 'pie',
                    radius: '90%',
                    center: ['45%', '50%'],
                    data: [
                        {value: 335, name: '设备报警'},
                        {value: 310, name: '状态报警'},
                        {value: 234, name: '故障报警'},
                    ],
                }
            ]
        };
        let histogramoption = {
            grid: { // 控制图的大小，调整下面这些值就可以，
                x: 60,
                // x2: 50,
                //  y2: 50, // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ['设备报警', '状态报警', '故障报警'],
                axisLabel: {
                    interval: 0,
                    rotate: -30
                }
            },
            series: [{
                data: [120, 200, 250],
                type: 'bar'
            }],
        };

        return (
            <div>
                <PageHeaderLayout title="报警类别统计">
                    <Row style={{width: '100%', height: 'calc(100vh - 180px)'}}>
                        <Col span={8}>
                            <Card style={{width: '100%', height: 'calc(100vh - 200px)'}}>
                                <Card>
                                    <ReactEcharts
                                        style={{marginLeft: 30}}
                                        option={Circleoption}
                                        notMerge={true}
                                        lazyUpdate={true} />
                                </Card>
                                <Card title="排名">
                                    <ReactEcharts
                                        style={{marginTop: 30, marginLeft: 30}}
                                        option={histogramoption}
                                        notMerge={true}
                                        lazyUpdate={true} />
                                </Card>
                            </Card>
                        </Col>
                        <Col span={14} style={{marginLeft: 30}}>
                            <div className={styles.tableListForm}>{this.renderForm()}</div>
                            <Row>
                                <Col >
                                    <Table
                                        style={{marginTop: 10}}
                                        dataSource={dataSource}
                                        columns={columns}
                                        scroll={{ x: 550, y: 'calc(100vh - 660px)' }}
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
                                    <Card style={{marginTop: 20}} title={'总结'}>
                                        <p>
                                            设备报警122次；状态报警119次；故障报警143次；总共384次。
                                        </p>
                                        <p>
                                            设备报警最多的是废气排口3,最少的是废气排口1
                                        </p>
                                        <p>
                                            状态报警最多的是废气排口3,最少的是废气排口2
                                        </p>
                                        <p>
                                            故障报警1最多的是废气排口3,最少的是废气排口1
                                        </p>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </PageHeaderLayout>
            </div>
        );
    }
}
