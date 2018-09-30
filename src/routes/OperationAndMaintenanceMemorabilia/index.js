import React, { Component } from 'react';
import { Tabs, Card, Checkbox, Row, Col, Switch, Timeline, Icon } from 'antd';
import RangePicker_ from '../../components/PointDetail/RangePicker_';

import moment from 'moment';
const TabPane = Tabs.TabPane;

export default class OperationAndMaintenanceMemorabilia extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],

        };
    }
    _handleDateChange=(date, dateString) => {
        console.log(date);// [moment,moment]
        console.log(dateString);// ['2018-06-23','2018-06-25']
        this.setState({rangeDate: date});
    };
    callback(key) {
        console.log(key);
    }
    onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    OpenonChange(checked) {
        console.log(`switch to ${checked}`);
    }
    render() {
        return (

            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="排口信息" key="1">排口信息</TabPane>
                <TabPane tab="实时视频" key="2">实时视频</TabPane>
                <TabPane tab="运维大事记" key="3">
                    <Card>
                        <Row>

                            <Col span={9}>
                                <span >选择日期: <RangePicker_ style={{width: 350}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
                            </Col>
                            <Col span={12}>
                                <Checkbox checked={true} onChange={this.onChange}>应急任务</Checkbox>
                                <Checkbox onChange={this.onChange}>例行任务</Checkbox>
                                <Checkbox onChange={this.onChange}>例行任务计划</Checkbox>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '20px'}}>
                            <Col span={3}>
                                <span>
                            逾期情况查看:&nbsp;
                                </span>
                                <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={true} onChange={this.OpenonChange} />
                            </Col>
                            <Col span={3}>
                                <span>
                            报警响应超时:&nbsp;
                                </span>
                                <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={true} onChange={this.OpenonChange} />
                            </Col>
                        </Row>
                    </Card>
                    <div style={{height: 'calc(100vh - 190px)', width: '60%', paddingBottom: '20px', backgroundColor: 'rgb(238,241,246)', overflowX: 'hidden', overflowY: 'scroll', margin: 'auto', marginTop: '20px'}}>
                        <Card >
                            <Timeline style={{marginLeft: '10%'}}>

                                <Timeline.Item dot={<div style={{fontSize: '15px', display: 'table-cell', verticalAlign: 'middle', border: '2px solid rgb(87,161,255)', borderRadius: '90px', width: '30px', height: '30px', color: 'black', fontWeight: '500'}} >计</div>}>
                                    <Row>
                                        <Col span={24}>
                                            <div style={{height: '30px', paddingLeft: '30px'}}>
                                                <span>
                                                  狄云需要对当前监测点进行例行巡检。（由李雷制定计划）
                                                </span>
                                            </div>
                                            <div style={{height: '30px', paddingLeft: '30px'}}>

                                                <a style={{backgroundColor: 'red', color: '#FFFFFF', borderRadius: '3px'}}>&nbsp;&nbsp;未执行&nbsp;&nbsp;</a>
                                                <Icon type="environment" theme="outlined" style={{ fontSize: '22px', color: 'rgb(207,25,0)', marginLeft: '15px', marginTop: '5px' }} />
                                                <Icon type="picture" theme="twoTone" style={{ fontSize: '22px', color: 'rgb(207,25,0)', marginLeft: '13px', marginTop: '5px' }} />

                                            </div>
                                        </Col>
                                    </Row>
                                    <Col offset={15} span={4}>
                                        <a style={{textDecoration: 'underline', color: 'rgb(166,210,255)'}}>查看详情</a>
                                    </Col>
                                    <Row />
                                </Timeline.Item>

                                <Timeline.Item dot={<div style={{fontSize: '15px', display: 'table-cell', verticalAlign: 'middle', border: '2px solid rgb(87,161,255)', borderRadius: '90px', width: '30px', height: '30px', color: 'black', fontWeight: '500'}} >例</div>}>
                                    <Row>
                                        <Col span={24}>
                                            <div style={{height: '30px', paddingLeft: '30px'}}>
                                                <span>
                                                    狄云10:00开始执行例行任务，2018-08-02 16:00 完成了例行任务。
                                                </span>
                                            </div>
                                            <div style={{height: '30px', paddingLeft: '30px'}}>
                                                <a style={{backgroundColor: 'rgb(254,242,231)', color: 'rgb(252,210,94)', border: '1px solid rgb(249,186,147)', borderRadius: '3px'}}>&nbsp;&nbsp;例行任务逾期<span style={{color: 'rgb(235,28,37)'}}>5</span>天&nbsp;&nbsp;</a>
                                                <Icon type="environment" theme="outlined" style={{ fontSize: '22px', color: 'rgb(56,151,222)', marginLeft: '15px', marginTop: '5px' }} />
                                                <Icon type="picture" theme="twoTone" style={{ fontSize: '22px', color: 'rgb(56,151,222)', marginLeft: '15px', marginTop: '5px' }} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Col offset={15} span={4}>
                                        <a style={{textDecoration: 'underline', color: 'rgb(166,210,255)'}}>查看详情</a>
                                    </Col>
                                    <Row />
                                </Timeline.Item>
                                <Timeline.Item dot={<div style={{fontSize: '15px', display: 'table-cell', verticalAlign: 'middle', border: '2px solid rgb(87,161,255)', borderRadius: '90px', width: '30px', height: '30px', color: 'black', fontWeight: '500'}} >计</div>}>
                                    <Row>
                                        <Col span={24}>
                                            <div style={{height: '30px', paddingLeft: '30px'}}>
                                                <span>
                                                   狄云需要对当前监测点进行 例行巡检。（由李雷制定计划）
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Col offset={15} span={4}>
                                        <a style={{textDecoration: 'underline', color: 'rgb(166,210,255)'}}>查看详情</a>
                                    </Col>
                                    <Row />
                                </Timeline.Item>
                                <Timeline.Item dot={<div style={{fontSize: '15px', display: 'table-cell', verticalAlign: 'middle', border: '2px solid rgb(87,161,255)', borderRadius: '90px', width: '30px', height: '30px', color: 'black', fontWeight: '500'}} >计</div>}>
                                    <Row>
                                        <Col span={24}>
                                            <div style={{height: '30px', paddingLeft: '30px'}}>
                                                <span>
                                                    狄云需要对当前监测点进行 例行巡检。（由李雷制定计划）
                                                </span>
                                            </div>

                                        </Col>
                                    </Row>
                                    <Col offset={15} span={4}>
                                        <a style={{textDecoration: 'underline', color: 'rgb(166,210,255)'}}>查看详情</a>
                                    </Col>
                                    <Row />
                                </Timeline.Item>
                                <Timeline.Item dot={<div style={{fontSize: '15px', display: 'table-cell', verticalAlign: 'middle', border: '2px solid rgb(87,161,255)', borderRadius: '90px', width: '30px', height: '30px', color: 'black', fontWeight: '500'}} >应</div>}>
                                    <Row>
                                        <Col span={24}>
                                            <div style={{height: '30px', paddingLeft: '30px'}}>
                                                <span>
                                                    狄云09:00开始处理以上报警信息，2018-08-02 14:00完成应急任务。
                                                </span>
                                            </div>
                                            <div style={{height: '30px', paddingLeft: '30px'}}>

                                                <a style={{backgroundColor: 'rgb(247,255,236)', color: 'rgb(146,196,0)', border: '1px solid rgb(146,196,0)', borderRadius: '3px'}}>&nbsp;&nbsp;审核通过&nbsp;&nbsp;</a>
                                                <Icon type="environment" theme="outlined" style={{ fontSize: '22px', color: 'rgb(56,151,222)', marginLeft: '15px', marginTop: '5px' }} />
                                                <Icon type="picture" theme="twoTone" style={{ fontSize: '22px', color: 'rgb(56,151,222)', marginLeft: '15px', marginTop: '5px' }} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Col offset={15} span={4}>
                                        <a style={{textDecoration: 'underline', color: 'rgb(166,210,255)'}}>查看详情</a>
                                    </Col>
                                    <Row />
                                </Timeline.Item>
                                <Timeline.Item dot={<div style={{fontSize: '15px', display: 'table-cell', verticalAlign: 'middle', border: '2px solid rgb(87,161,255)', borderRadius: '90px', width: '30px', height: '30px', color: 'black', fontWeight: '500'}} >例</div>}>
                                    <Row>
                                        <Col span={24}>
                                            <div style={{height: '30px', paddingLeft: '30px'}}>
                                                <span>
                                                   狄云15:00开始执行例行任务，2018-08-02 16:00 完成了例行任务。
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Col offset={15} span={4}>
                                        <a style={{textDecoration: 'underline', color: 'rgb(166,210,255)'}}>查看详情</a>
                                    </Col>
                                    <Row />
                                </Timeline.Item>
                            </Timeline>

                        </Card>
                    </div>
                </TabPane>
                <TabPane tab="质控记录" key="4">质控记录</TabPane>
            </Tabs>

        );
    }
}
