import React, { Component } from 'react';
import {Row, Col, Card, Divider, Button, DatePicker, Table} from 'antd';
import img from '../../../public/video.png';
import styles from './Video.less';
import VideoAlarmData from '../../mockdata/PointDetail/VideoAlarmData.json';
import HistoryData from '../../mockdata/PointDetail/HisotryMonitorData.json';

const {RangePicker} = DatePicker;
export default class HistoryVideo extends Component {
    render() {
        const alarmColumns = [{
            title: '因子',
            dataIndex: 'PollutantCode',
            width: 50,
        }, {
            title: '报警时间段',
            dataIndex: 'AlarmTime',
            width: 130,
        }];

        const historyColumns = [{
            title: '监测时间',
            dataIndex: 'MonitorTime',
            width: 50,
        }, {
            title: '实测烟尘(mg/m³)',
            dataIndex: 'Col1',
            width: 50,
        }, {
            title: 'SO2(mg/m³)',
            dataIndex: 'Col2',
            width: 50,
            render: (text, record) => {
                if (text > 8) {
                    return (<span style={{color: 'red'}}>{text}</span>);
                } else {
                    return text;
                }
            }
        }, {
            title: 'NOX(mg/m³)',
            dataIndex: 'Col3',
            width: 50,
            render: (text, record) => {
                if (text > 14) {
                    return (<span style={{color: 'red'}}>{text}</span>);
                } else {
                    return text;
                }
            }
        }, {
            title: '流量(m³/h)',
            dataIndex: 'Col4',
            width: 50,
        }, {
            title: '氧含量(%)',
            dataIndex: 'Col5',
            width: 50,
        }, {
            title: '流速(L/S)',
            dataIndex: 'Col6',
            width: 50,
        }, {
            title: '温度(℃)',
            dataIndex: 'Col7',
            width: 50,
        }, {
            title: '湿度(%)',
            dataIndex: 'Col8',
            width: 50,
        }, {
            title: '烟气静压(Pa)',
            dataIndex: 'Col9',
            width: 50,
        }];

        return (
            <div>
                <Row gutter={24}>
                    <Col xl={19} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24, height: 490 }}>
                        <div className={styles.videoComponent} />
                    </Col>
                    <Col xl={5} lg={24} md={24} sm={24} xs={24}>

                        <Card className={styles.hisYunStyle}>
                            <Row>
                                <Col span={24} >历史视频时间：<RangePicker /></Col>
                            </Row>
                            <Divider type="horizontal" />
                            <Row>
                                <Col span={24} >
                                    <Row>
                                        <Col className={styles.gutterleft} span={8} ><Button icon="fast-backward"> 倒放</Button></Col>
                                        <Col className={styles.gutterleft} span={8} ><Button icon="up-square-o">暂停</Button></Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="caret-right">恢复</Button></Col>
                                    </Row>
                                    <Row>
                                        <Col className={styles.gutterleft} span={8} ><Button icon="step-forward">慢放</Button></Col>
                                        <Col className={styles.gutterleft} span={8} ><Button icon="fast-forward">快放</Button></Col>
                                        <Col className={styles.gutterleft} span={8} ><Button icon="picture">抓图</Button></Col>
                                    </Row>

                                </Col>
                            </Row>

                            <Divider type="horizontal" />
                            报警历史记录
                            <Row>
                                <Col className={styles.gutterleft} span={24} >
                                    <Table size="large" bordered={true} columns={alarmColumns} dataSource={VideoAlarmData} pagination={false} scroll={{y: 120, x: 100}} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Table
                    columns={historyColumns}
                    dataSource={HistoryData}
                    bordered={true}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        'total': 45,
                        'pageSize': 20,
                        'current': 1
                    }}
                    scroll={
                        {
                            y: 500
                        }
                    }
                />
            </div>
        );
    }
}
