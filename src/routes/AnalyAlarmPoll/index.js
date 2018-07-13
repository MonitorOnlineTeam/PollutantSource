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
import IndustryType from '../../mockdata/Base/Code/T_Cod_IndustryType';
/*
页面：报警因子统计
描述：分别统计各个设备污染因子报警分布情况
add by cg 18.6.8
modify by
*/

export default class AnalyAlarmPoll extends Component {
    constructor(props) {
        super(props);
        debugger;
        var a01 = [];
        var a02 = [];
        var a03 = [];
        var b02 = [];
        var s01 = [];
        var s02 = [];
        var s03 = [];
        var s05 = [];
        var s08 = [];
        var zs01 = [];
        var zs02 = [];
        var zs03 = [];
        AlarmFactor.map((item) => {
            a01.push(item.a01);
            a02.push(item.a02);
            a03.push(item.a03);
            b02.push(item.b02);
            s01.push(item.s01);
            s02.push(item.s02);
            s03.push(item.s03);
            s05.push(item.s05);
            s08.push(item.s08);
            zs01.push(item.zs01);
            zs02.push(item.zs02);
            zs03.push(item.zs03);
        });
        var sum = [];
        var sumbing = [];
        var cola01 = a01.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var cola02 = a02.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var cola03 = a03.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var colb02 = b02.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var cols01 = s01.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var cols02 = s02.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var cols03 = s03.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var cols05 = s05.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var cols08 = s08.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var colzs01 = zs01.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var colzs02 = zs02.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        var colzs03 = zs03.reduce(function(first, second) {
            return Number.parseInt(first) + Number.parseInt(second);
        }, 0);
        this.state = {
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
            expandForm: true,
        };
        sum.push(cola01);
        sum.push(cola02);
        sum.push(cola03);
        sum.push(colb02);
        sum.push(cols01);
        sum.push(cols02);
        sum.push(cols03);
        sum.push(cols05);
        sum.push(cols08);
        sum.push(colzs01);
        sum.push(colzs02);
        sum.push(colzs03);
        sumbing.push({
            value: cola01,
            name: '实测烟尘'
        });
        sumbing.push({
            value: cola02,
            name: '实测二氧化硫'
        });
        sumbing.push({
            value: cola03,
            name: '实测氮氧化物'
        });
        sumbing.push({
            value: colb02,
            name: '流量'
        });
        sumbing.push({
            value: cols01,
            name: '氧含量'
        });
        sumbing.push({
            value: cols02,
            name: '流速'
        });
        sumbing.push({
            value: cols03,
            name: '烟气温度'
        });
        sumbing.push({
            value: cols05,
            name: '烟气湿度'
        });
        sumbing.push({
            value: cols08,
            name: '烟气静压'
        });
        sumbing.push({
            value: colzs01,
            name: '烟尘'
        });
        sumbing.push({
            value: colzs02,
            name: '二氧化硫'
        });
        sumbing.push({
            value: colzs03,
            name: '氮氧化物'
        });
        let i = sum.length;
        let j = sum.length;
        let len = sum.length;
        debugger;
        for (i = 0; i < len; i++) {
            for (j = i; j < len; j++) {
                if (sum[i] > sum[j]) {
                    [sum[i], sum[j]] = [sum[j], sum[i]];
                }
            }
        }
        var PointName = [];
        sum.map((item) => {
            if (item === cola01) {
                PointName.push('实测烟尘');
            }
            if (item === cola02) {
                PointName.push('实测二氧化硫');
            }
            if (item === cola03) {
                PointName.push('实测氮氧化物');
            }
            if (item === colb02) {
                PointName.push('流量');
            }
            if (item === cols01) {
                PointName.push('氧含量');
            }
            if (item === cols02) {
                PointName.push('流速');
            }
            if (item === cols03) {
                PointName.push('烟气温度');
            }
            if (item === cols05) {
                PointName.push('烟气湿度');
            }
            if (item === cols08) {
                PointName.push('烟气静压');
            }
            if (item === colzs01) {
                PointName.push('烟尘');
            }
            if (item === colzs02) {
                PointName.push('二氧化硫');
            }
            if (item === colzs03) {
                PointName.push('氮氧化物');
            }
        });
        // 递归获取行业下拉框
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
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
            expandForm: true,
            pollutantSum: sum,
            sumbings: sumbing,
            IndustryTypes: industryList,
            histogram: PointName,
        };
    }
    renderForm() {
        return this.state.expandForm ? this.renderSimpleForm() : this.renderAllForm();
    }
    onChange = (value) => {
        console.log(value);
        this.setState({ value });
    }
    renderSimpleForm() {
        return (

            <Row style={{marginBottom: 30}}>
                <Col span="8">
                    <span >企业：<EnterpriseAutoComplete width={200} placeholder="请选择企业" /></span>
                </Col>
                <Col span="9">
                    <span className="gutter-box">时间：<RangePicker_ style={{width: 250}} placeholder="请选择时间" format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
                </Col>
                <Col span="7">
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
        const treeData = this.state.IndustryTypes;
        return (
            <div>
                <Row style={{marginBottom: 30}}>
                    <Col span="8">
                        <span >企业：<EnterpriseAutoComplete width={200} placeholder="请选择企业" /></span>
                    </Col>
                    <Col span="9">
                        <span className="gutter-box">时间：<RangePicker_ style={{width: 250}} placeholder="请选择时间" format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
                    </Col>

                    <Col span="7">
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
            grid: { // 控制图的大小，调整下面这些值就可以，
                x: 80,
                // x2: 50,
                //  y2: 50, // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '10%',
                containLabel: true
            },
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
                    data: this.state.sumbings,
                }
            ]
        };
        let histogramoption = {
            grid: { // 控制图的大小，调整下面这些值就可以，
                x: 80,
                // x2: 50,
                //  y2: 50, // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'category',
                data: this.state.histogram,
                axisLabel: {
                    interval: 0,
                    rotate: -30
                },
            },
            series: [{
                data: this.state.pollutantSum,
                type: 'bar',
                barWidth: 15,
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
                                        style={{height: 400}}
                                        option={Circleoption}
                                        notMerge={true}
                                        lazyUpdate={true} />
                                </Card>
                                <Card title="因子排名">
                                    <ReactEcharts
                                        style={{height: 300}}
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
                                            实测烟尘报警84次；实测二氧化硫报警154次；实测氮氧化物报警173次；流量报警319次；氧含量报警65次；流速报警111次；延期温度报警50次；烟气湿度报警122次；烟气静压报警158次；烟尘报警329次，二氧化硫报警278次；氮氧化物报警157次。
                                        </p>
                                        <p>
                                            实测烟尘最大为脱硫出口1排口；最小为锅炉小号烟囱1排口、脱硫入口1排口、脱硫入口2排口
                                        </p>
                                        <p>
                                            实测二氧化硫最大为脱硫出口1排口；最小为锅炉小号烟囱1排口、脱硫入口1排口、脱硫入口2排口
                                        </p>
                                        <p>
                                            实测氮氧化物最大为锅炉小号烟囱1排口、脱硫入口1排口、脱硫入口2排口；最小为脱硫出口1排口
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
