import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Row, Col, TreeSelect, Table, Card, Button, Icon} from 'antd';
import styles from './index.less';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import Attention from '../../components/AnalyAlarmReason/AttentionDegree';
import EnterpriseAutoComplete from '../../components/EnterpriseAutoComplete/index';
import moment from 'moment';
import AlarmFactor from '../../mockdata/Base/Code/T_Cod_AlarmFactor';
/*
页面：报警因子统计
描述：分别统计各个设备污染因子报警分布情况
add by cg 18.6.8
modify by
*/

export default class AnalyAlarmPoll extends Component {
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
            width: 100,
            fixed: 'left',
        }, {
            title: '实测烟尘',
            dataIndex: 'a01',
            key: 'a01',
            width: 100,

        }, {
            title: '实测二氧化硫',
            dataIndex: 'a02',
            key: 'a02',
            width: 120,
        }, {
            title: '实测氮氧化物',
            dataIndex: 'a03',
            key: 'a03',
            width: 120,
        }, {
            title: '流量',
            dataIndex: 'b02',
            key: 'b02',
            width: 100,
        }, {
            title: '氧含量',
            dataIndex: 's01',
            key: 's01',
            width: 100,
        }, {
            title: '流速',
            dataIndex: 's02',
            key: 's02',
            width: 100,
        }, {
            title: '烟气温度',
            dataIndex: 's03',
            key: 's03',
            width: 100,
        }, {
            title: '烟气湿度',
            dataIndex: 's05',
            key: 's05',
            width: 100,
        }, {
            title: '烟气静压',
            dataIndex: 's08',
            key: 's08',
            width: 100,
        }, {
            title: '烟尘',
            dataIndex: 'zs01',
            key: 'zs01',
            width: 100,
        }, {
            title: '二氧化硫',
            dataIndex: 'zs02',
            key: 'zs02',
            width: 100,
        }, {
            title: '氮氧化物',
            dataIndex: 'zs03',
            key: 'zs03',
            width: 100,
        }, {
            title: '总计',
            dataIndex: 'Count',
            key: 'Count',
            width: 100,
            render: (text, record) => (
                Number.parseInt(record.a01) + Number.parseInt(record.a02) + Number.parseInt(record.a03) + Number.parseInt(record.b02) + Number.parseInt(record.s01) + Number.parseInt(record.s02) + Number.parseInt(record.s03) + Number.parseInt(record.s05) + Number.parseInt(record.s08) + Number.parseInt(record.zs01) + Number.parseInt(record.zs02) + Number.parseInt(record.zs03)
            )
        }
        ];
        // 循环求数据
        const dataSource = [];
        for (let item of AlarmFactor) {
            dataSource.push({
                PointName: item.PointName,
                a01: item.a01,
                a02: item.a02,
                a03: item.a03,
                b02: item.b02,
                s01: item.s01,
                s02: item.s02,
                s03: item.s03,
                s05: item.s05,
                s08: item.s08,
                zs01: item.zs01,
                zs02: item.zs02,
                zs03: item.zs03,
            });
        }
        // 最下面一栏的总计
        let Cola01 = [];
        let Cola02 = [];
        let Cola03 = [];
        let Colb02 = [];
        let Cols01 = [];
        let Cols02 = [];
        let Cols03 = [];
        let Cols05 = [];
        let Cols08 = [];
        let Colzs01 = [];
        let Colzs02 = [];
        let Colzs03 = [];
        for (let items of dataSource) {
            Cola01.push(items.a01);
            Cola02.push(items.a02);
            Cola03.push(items.a03);
            Colb02.push(items.b02);
            Cols01.push(items.s01);
            Cols02.push(items.s02);
            Cols03.push(items.s03);
            Cols05.push(items.s05);
            Cols08.push(items.s08);
            Colzs01.push(items.zs01);
            Colzs02.push(items.zs02);
            Colzs03.push(items.zs03);
        }
        var Cola01s = Cola01.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var Cola02s = Cola02.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var Cola03s = Cola03.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var Colb02s = Colb02.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var Cols01s = Cols01.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var Cols02s = Cols02.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var Cols03s = Cols03.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var Cols05s = Cols05.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var Cols08s = Cols08.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var Colzs01s = Colzs01.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var Colzs02s = Colzs02.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var Colzs03s = Colzs03.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);

        dataSource.push({
            PointName: '总计',
            a01: Cola01s,
            a02: Cola02s,
            a03: Cola03s,
            b02: Colb02s,
            s01: Cols01s,
            s02: Cols02s,
            s03: Cols03s,
            s05: Cols05s,
            s08: Cols08s,
            zs01: Colzs01s,
            zs02: Colzs02s,
            zs03: Colzs03s,

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
                <PageHeaderLayout title="报警因子统计">
                    <Row style={{width: '100%'}}>
                        <Col span={8}>
                            <Card style={{width: '100%', height: 'calc(100vh - 180px)'}}>
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
                                        scroll={{ x: 1400, y: 350 }}
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
