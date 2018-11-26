import React, { Component } from 'react';
import RealTimeVideo from '../../components/PointDetail/RealTimeVideo';
import {Row, Col, Button, List, Table, Card, Select, Divider} from 'antd';
import MonitorData from '../../mockdata/PointDetail/VideoMonitorData.json';
import StateData from '../../mockdata/PointDetail/StateData.json';
import styles from './video.less';
const Option = Select.Option;
/*
页面：4、实时视频
描述：可以和数据、参数、报警等联动查看
add by myt 18.7.9
*/
export default class RealVideo extends Component {
    render() {
        const columns = [{
            title: '参数',
            dataIndex: 'Para',
            width: 50,
        }, {
            title: '值',
            dataIndex: 'Val',
            width: 50,
        }];

        return (
            <div >
                <Row gutter={24}>
                    <Col span={17} style={{ marginBottom: 10, height: 480 }}>
                        <div className={styles.videoComponent} />
                    </Col>
                    <Col span={7} >
                        <Card>
                            <Row>
                                <Col span={16}>
                                    <Select defaultValue="摄像头1号" style={{ width: 150 }}>
                                        <Option value="jack">摄像头1号</Option>
                                        <Option value="lucy">摄像头2号</Option>
                                        <Option value="disabled">摄像头3号</Option>
                                        <Option value="Yiminghe">摄像头4号</Option>
                                    </Select>
                                </Col>
                                <Col span={8} ><Button icon="picture">抓图</Button></Col>
                            </Row>
                            <Card style={{marginTop: 15}}>
                                <Row>
                                    <Col span={24} >
                                        <Row>
                                            <Col className={styles.gutterleft} span={8} ><Button> 左上</Button></Col>
                                            <Col className={styles.gutterleft} span={8} ><Button icon="arrow-up">上</Button></Col>
                                            <Col className={styles.gutterleft} span={8} ><Button>右下</Button></Col>
                                        </Row>
                                        <Row>
                                            <Col className={styles.gutterleft} span={8} ><Button icon="arrow-left">左</Button></Col>
                                            <Col className={styles.gutterleft} span={8} ><Button>自动</Button></Col>
                                            <Col className={styles.gutterleft} span={8} ><Button icon="arrow-right">右</Button></Col>
                                        </Row>
                                        <Row>
                                            <Col className={styles.gutterleft} span={8} ><Button>左下</Button></Col>
                                            <Col className={styles.gutterleft} span={8} ><Button icon="arrow-down">下</Button></Col>
                                            <Col className={styles.gutterleft} span={8} ><Button>右下</Button></Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </Card>
                            <Card style={{marginTop: 15}}>
                                <Row>

                                    <Col span={24}>
                                        <Row>
                                            <Col span={3} />
                                            <Col span={6} className={styles.gutterleft} ><Button>+</Button></Col>
                                            <Col span={6} className={styles.gutterleft} >变倍</Col>
                                            <Col span={6} className={styles.gutterleft}><Button>-</Button></Col>
                                            <Col span={3} />
                                        </Row>
                                        <Row>
                                            <Col span={3} />
                                            <Col className={styles.gutterleft} span={6} ><Button>+</Button></Col>
                                            <Col className={styles.gutterleft} span={6} >变焦</Col>
                                            <Col className={styles.gutterleft} span={6} ><Button>-</Button></Col>
                                            <Col span={3} />
                                        </Row>
                                        <Row>
                                            <Col span={3} />
                                            <Col className={styles.gutterleft} span={6} ><Button>+</Button></Col>
                                            <Col className={styles.gutterleft} span={6} >光圈</Col>
                                            <Col className={styles.gutterleft} span={6} ><Button>-</Button></Col>
                                            <Col span={3} />
                                        </Row>
                                    </Col>

                                </Row>
                            </Card>

                        </Card>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col xl={12} lg={24} sm={24} xs={24}>
                        <Card title="实时数据">
                            <List
                                bordered={true}
                                size="small"
                                itemLayout="horizontal"
                                dataSource={MonitorData}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta title={item.MonitorItem} />
                                        <List.Item.Meta title={item.MonitorValue} />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col xl={12} lg={24} sm={24} xs={24}>
                        <Card title="设备参数实时信息" >
                            <Table size="small" borderd={true} columns={columns} dataSource={StateData} pagination={false} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
