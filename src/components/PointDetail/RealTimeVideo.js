import React, { Component } from 'react';
import {Row, Col, Button, List, Table, Card, Divider} from 'antd';
import MonitorData from '../../mockdata/PointDetail/VideoMonitorData.json';
import StateData from '../../mockdata/PointDetail/StateData.json';
import img from '../../../public/video.png';
import styles from './Video.less';

export default class RealTimeVideo extends Component {
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
                    <Col xl={20} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10, height: 400 }}>
                    <Card style={{background:'black',height:500,width:800}}></Card>
                    </Col>
                    <Col xl={4} lg={24} md={24} sm={24} xs={24}>
                        <Card  style={{ marginBottom: 24 }} >
                            <Row>
                                <Col span={24} ><Button icon="picture">抓图</Button></Col>
                            </Row>
                            <Divider type="horizontal" />
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
                            <Divider type="horizontal" />
                            <Row>
                                <Col className={styles.gutterleft} span={8} ><Button>+</Button></Col>
                                <Col className={styles.gutterleft} span={8} >变倍</Col>
                                <Col className={styles.gutterleft} span={8} ><Button>-</Button></Col>
                            </Row>
                            <Row>
                                <Col className={styles.gutterleft} span={8} ><Button>+</Button></Col>
                                <Col className={styles.gutterleft} span={8} >变焦</Col>
                                <Col className={styles.gutterleft} span={8} ><Button>-</Button></Col>
                            </Row>
                            <Row>
                                <Col className={styles.gutterleft} span={8} ><Button>+</Button></Col>
                                <Col className={styles.gutterleft} span={8} >光圈</Col>
                                <Col className={styles.gutterleft} span={8} ><Button>-</Button></Col>
                            </Row>
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
