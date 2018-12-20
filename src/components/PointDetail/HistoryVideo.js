import React, { Component } from 'react';
import {Row, Col, Card, Divider, Button, DatePicker, Table} from 'antd';
import styles from './Video.less';
import { connect } from 'dva';
import moment from 'moment';
const {RangePicker} = DatePicker;
@connect(({loading, videolist}) => ({
    ...loading,
    historyVideolist: videolist.historyVideolist,
    AlarmInfoList: videolist.AlarmInfoList,
}))
export default class HistoryVideo extends Component {
    constructor(props) {
        super(props);
        var defaultBeginTime = moment().add('days', -1).format('YYYY-MM-DD 00:00:00');
        var date = moment().format('YYYY-MM-DD 23:59:59');
        this.state = {
            beginDate: defaultBeginTime,
            endDate: date,
            DGIMN: 'sgjt001003',
            MonitorTime: '2018-11-27 08:00:00'
        };
    }
    componentWillMount() {
        this.onChange();
    };
    onChange = () => {
        this.props.dispatch({
            type: 'videolist/gethistoryVideoList',
            payload: {
                DGIMN: this.state.DGIMN,
                MonitorTime: this.state.MonitorTime,
            },
        });
        this.props.dispatch({
            type: 'videolist/getAlarmHistory',
            payload: {
                DGIMN: this.state.DGIMN,
                beginDate: this.state.beginDate,
                endDate: this.state.endDate,
            },
        });
    }
    rangepickerOnChange=(date, dateString) => {
        this.setState({beginDate: dateString[0], endDate: dateString[1]});
        this.props.dispatch({
            type: 'videolist/updateAlarmHistory',
            payload: {
                DGIMN: this.state.DGIMN,
                beginDate: date[0].format('YYYY-MM-DD 00:00:00'),
                endDate: date[1].format('YYYY-MM-DD 23:59:59'),
            },
        });
    }
    render() {
        console.log(this.state.beginDate);
        console.log(this.state.endDate);
        const dateFormat = 'YYYY/MM/DD';
        const monthFormat = 'YYYY/MM';
        const alarmColumns = [{
            title: '因子',
            dataIndex: 'PollutantCode',

        }, {
            title: '报警时间段',
            dataIndex: 'RangeTime',
        }];

        const historyColumns = [
            {
                title: '监测时间',
                dataIndex: 'MonitorTime',

            }, {
                title: '实测烟尘(mg/m³)',
                dataIndex: '01',

            },
            {
                title: '实测二氧化硫(mg/m³)',
                dataIndex: '02',

            },
            {
                title: '实测氮氧化物(mg/m³)',
                dataIndex: '03',

            },
            {
                title: '烟尘(mg/m³)',
                dataIndex: 'zs01',

            },
            {
                title: '二氧化硫(mg/m³)',
                dataIndex: 'zs02',

            },
            {
                title: '氮氧化物(mg/m³)',
                dataIndex: 'zs03',

            },
            {
                title: '流量(m³/h)',
                dataIndex: 'b02',

            }, {
                title: '氧含量(%)',
                dataIndex: 's01',

            }, {
                title: '流速(L/S)',
                dataIndex: 's02',

            }, {
                title: '温度(℃)',
                dataIndex: 's03',

            }, {
                title: '湿度(%)',
                dataIndex: 's05',

            }, {
                title: '烟气静压(Pa)',
                dataIndex: 's08',

            }];

        return (
            <div>
                <Row gutter={24}>
                    <Col xl={17} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24, height: 490 }}>
                        <div className={styles.videoComponent} />
                    </Col>
                    <Col xl={7} lg={24} md={24} sm={24} xs={24}>

                        <Card className={styles.hisYunStyle}>
                            <Row>
                                <Col span={24} >   <RangePicker defaultValue={[moment(this.state.beginDate, dateFormat), moment(this.state.endDate, dateFormat)]} onChange={this.rangepickerOnChange} /></Col>
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
                                    <Table size="large" columns={alarmColumns} dataSource={this.props.AlarmInfoList} pagination={false} scroll={{y: 120, x: 100}} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xl={1} lg={24} md={24} sm={24} xs={24} />
                </Row>
                <Table
                    columns={historyColumns}
                    dataSource={this.props.historyVideolist}
                    pagination={false}
                    bordered={true}
                    // pagination={{
                    //     showSizeChanger: true,
                    //     showQuickJumper: true,
                    //     'total': 45,
                    //     'pageSize': 20,
                    //     'current': 1
                    // }}
                    // scroll={
                    //     {
                    //         y: 500
                    //     }
                    // }
                />
            </div>
        );
    }
}
