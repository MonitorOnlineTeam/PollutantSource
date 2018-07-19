import React, { Component } from 'react';
import {Row, Col, Card, Icon, Tabs} from 'antd';
import AListRadio from '../../components/OverView/AListRadio';
import styles from './index.less';
import StatusPie from '../../components/OverView/StatusPie';
import WaterPie from '../../components/OverView/WaterPie';
import StatusBar from '../../components/OverView/StatusBar';
const TabPane = Tabs.TabPane;
class statusList extends Component {
    render() {
        const wcolor = ['#FFB90F', '#FFC125', '#FFD700'];
        const ocolor = ['#49d088', '#38b470', '#2aaf66'];
        return (
            <div style={{background: '#fff'}}>
                <AListRadio style={{margin: '18px 0 20px 1500px'}} dvalue="c" />
                <div className={styles.cardBody} style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Card>
                                <div style={{ padding: '16px 16px 10px 20px' }}>
                                    <div style={{
                                        color: 'rgba(0,0,0,.45)',
                                        padding: '0 0 5px 0'
                                    }}>
                                        <span>监控状态</span>
                                        <span style={{float: 'right', margin: '0 7px 0 0'}}><Icon type="appstore-o" /></span>
                                    </div>
                                    <div style={{padding: '0 0 0 10px', fontSize: '30px'}}>
                                        设备正常运行占比90%
                                    </div>
                                    <div style={{padding: '25px 0 7px 0', borderBottom: '1px solid #E8E8E8'}}>
                                        <span style={{padding: '0 0 0 10px'}}>日同比  85% <Icon style={{color: '#81C400', fontSize: '12px'}} type="caret-up" /></span>
                                        <span style={{padding: '0 0 0 10px'}}>周环比  91% <Icon style={{color: '#EA0000', fontSize: '12px'}} type="caret-down" /></span>
                                    </div>
                                    <div style={{padding: '5px 0 0 0'}}>
                                        <span style={{paddingLeft: '10px'}}><img src="../../../gisnormal.png" /><span style={{padding: '2px 0 0 5px'}}>正常 (108)</span></span>
                                        <span style={{paddingLeft: '10px'}}><img src="../../../gisover.png" /><span style={{padding: '2px 0 0 5px'}}>超标 (3)</span></span>
                                        <span style={{paddingLeft: '10px'}}><img src="../../../gisunline.png" /><span style={{padding: '2px 0 0 5px'}}>离线 (0)</span></span>
                                        <span style={{paddingLeft: '10px'}}><img src="../../../gisexception.png" /><span style={{padding: '2px 0 0 5px'}}>异常 (2)</span></span>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <div style={{ padding: '16px 16px 10px 20px' }}>
                                    <div style={{
                                        color: 'rgba(0,0,0,.45)',
                                        padding: '0 0 5px 0'
                                    }}>
                                        <span>质控情况</span>
                                        <span style={{float: 'right', margin: '0 7px 0 0'}}><Icon type="appstore-o" /></span>
                                    </div>
                                    <div style={{padding: '0 0 9px 0', borderBottom: '1px solid #E8E8E8'}}>
                                        <span style={{float: 'left', marginLeft: '70px'}}> <StatusPie value="92" title="执行率" />
                                        </span>

                                        <span style={{float: 'left', marginLeft: '80px'}}> <StatusPie value="97" title="成功率" />
                                        </span>
                                        <div style={{clear: 'both'}} />
                                    </div>
                                    <div style={{padding: '5px 0 0 0'}}>
                                        <span style={{paddingLeft: '10px'}}> <Icon type="info-circle-o" /><span style={{padding: '2px 0 0 5px'}}>应质控 (108)</span></span>
                                        <span style={{paddingLeft: '10px'}}><Icon type="clock-circle-o" /><span style={{padding: '2px 0 0 5px'}}>实际质控 (100)</span></span>
                                        <span style={{paddingLeft: '10px'}}><Icon type="check-circle-o" /><span style={{padding: '2px 0 0 5px'}}>成功次数 (105)</span></span>
                                    </div>

                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <div style={{ padding: '16px 16px 10px 20px' }}>
                                    <div style={{
                                        color: 'rgba(0,0,0,.45)',
                                        padding: '0 0 5px 0'
                                    }}>
                                        <span>排污情况</span>
                                        <span style={{float: 'right', margin: '0 7px 0 0'}}><Icon type="appstore-o" /></span>
                                    </div>
                                    <div>
                                        <div style={{float: 'left'}}><WaterPie color={wcolor} Percentage="76" title="排污量" /></div>
                                        <div style={{float: 'left', margin: '20px 0 0 10px'}}>
                                            <p><Icon style={{marginRight: '2px'}} type="api" />设备传输率 : 410吨</p>
                                            <p><Icon style={{marginRight: '2px'}} type="cloud" />今日排污量 : 17吨</p>
                                            <p><Icon style={{marginRight: '2px'}} type="cloud" />昨天排污量 : 17.6吨</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <div style={{ padding: '16px 16px 10px 20px' }}>
                                    <div style={{
                                        color: 'rgba(0,0,0,.45)',
                                        padding: '0 0 5px 0'
                                    }}>
                                        <span>运维信息</span>
                                        <span style={{float: 'right', margin: '0 7px 0 0'}}><Icon type="appstore-o" /></span>
                                    </div>
                                    <div>
                                        <div style={{float: 'left'}}><WaterPie color={ocolor} Percentage="89" title="传输率" /></div>
                                        <div style={{float: 'left', margin: '20px 0 0 10px'}}>
                                            <p><Icon style={{marginRight: '2px'}} type="api" /> 本月例行任务80次</p>
                                            <p><Icon style={{marginRight: '2px'}} type="cloud" />本月应急任务25次</p>
                                            <p>
                                                <span style={{padding: '0 0 0 10px'}}>(运维)同比  81 <Icon style={{color: '#EA0000', fontSize: '12px'}} type="caret-down" /></span>
                                                <span style={{padding: '0 0 0 10px'}}>(应急)同比  26 <Icon style={{color: '#81C400', fontSize: '12px'}} type="caret-up" /></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <div style={{padding: '30px 0 0 0'}}>
                        <Card>
                            <Tabs style={{margin: '0 0 0 20px'}} defaultActiveKey="1">
                                <TabPane tab={<span><Icon type="fork" />月统计</span>} key="1">
                                    <div style={{float: 'left', width: ''}}> <StatusBar /></div>
                                    <div>xxx</div>
                                </TabPane>
                                <TabPane tab={<span><Icon type="api" />年统计</span>} key="2">
                                      Tab 2
                                </TabPane>
                            </Tabs>,
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default statusList;
