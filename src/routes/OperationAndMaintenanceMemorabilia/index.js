import React, { Component } from 'react';
import { Tabs, Card, Checkbox, Row, Col, Switch, Timeline, Icon, Button } from 'antd';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import { connect } from 'dva';
import {EnumRequstResult, EnumPatrolTaskType} from '../../utils/enum';
import moment, { now } from 'moment';
import { routerRedux } from 'dva/router';
const TabPane = Tabs.TabPane;
@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetYwdsj'],
    OpeartionInfo: task.OpeartionInfo
}))
export default class OperationAndMaintenanceMemorabilia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment('YYYY-MM-DD HH:mm:ss').subtract(7, 'day'), moment('YYYY-MM-DD HH:mm:ss')],
            pageIndex: 1,
            pageSize: 20,
            IsAlarmTimeout: true,
            beginTime: moment('YYYY-MM-DD HH:mm:ss').subtract(7, 'day'),
            endTime: moment('YYYY-MM-DD HH:mm:ss')
        };
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'task/GetYwdsj',
            payload: {
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize,
                taskType: this.state.taskType,
                DGIMNs: this.props.match.params.DGIMNs,
                IsAlarmTimeout: this.state.IsAlarmTimeout,
                beginTime: this.state.beginTime,
                endTime: this.state.endTime
            }
        });
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
                            <Col span={7}>
                                <span >选择日期: <RangePicker_ style={{width: 350}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
                            </Col>
                            <Col span={3}>
                                <Checkbox checked={true} onChange={this.onChange}>应急任务</Checkbox>
                                <Checkbox onChange={this.onChange}>例行任务</Checkbox>
                            </Col>
                            <Col span={2}>
                                <span>
                            报警响应超时:&nbsp;
                                </span>
                                <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={true} onChange={this.OpenonChange} />
                            </Col>
                        </Row>
                        {<Row style={{marginTop: '20px'}}>
                            <Col span={3}>
                                <Button style={{marginLeft: 10, marginBottom: 10}} onClick={() => {
                                    this.props.dispatch(routerRedux.push(`/emergency/emergencydetailinfo/00553062-ade0-420d-a7d4-c657397dbf20/766f911d-5e41-4bbf-b705-add427a16e77`));
                                }
                                }> 查看任务详情 </Button>
                            </Col>
                        </Row>}
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
