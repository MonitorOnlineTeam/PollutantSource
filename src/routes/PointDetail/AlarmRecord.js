
import React, { Component } from 'react';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import AlarmTypeSelect from '../../components/AlarmTypeSelect/index';
import moment from 'moment';
import PollutantSelect_ from '../../components/PointDetail/PollutantSelect_';
import ExceptionProcessing from '../../mockdata/Base/Code/T_Cod_ExceptionProcessing';
import Process from '../../components/AlarmRecord/Process';
import { Card,
    InputNumber,
    Row,
    Col,
    Modal,
    Table,
    Button,
    Icon,
} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './index.less';
import Videos from '../../components/AlarmRecord/Video';
import {connect} from 'dva';
@connect(() => ({

}))
class AlarmRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
            ExceptionProcessingList: ExceptionProcessing,
            expandForm: true,
            alarmTypeValue: '',
            PollutantValue: '',
            DateValue: '',
            numberValue: '',
            visible: false,
        };
    }
    _handleAlarmChange=(e) => {
        let value = e;
        this.setState({alarmTypeValue: value});
    };
    _handlePollutantChange = (e) => {
        let value = e;
        this.setState({PollutantValue: value});
    };

    // _handleDateChange(e) {
    //     let value = e;
    //     this.setState({_handleDateChange: value});
    // };
    numberChange(e) {
        let value = e;
        this.setState({numberValue: value});
    };
    _handleDateChange=(date, dateString) => {
        console.log(date);// [moment,moment]
        console.log(dateString);// ['2018-06-23','2018-06-25']
        this.setState({rangeDate: date});
    };
    stationclick = () => {
        console.log(this);
        this.props.dispatch(routerRedux.push(`/monitor/emergency/emergencydetailinfo/${this.state.selectid}`));
    }
    // '/monitor/emergency/emergencydetailinfo/:exceptionhandleid': {
    //     component: dynamicWrapper(app, ['points'], () =>
    //   import('../routes/EmergencyTodoList/EmergencyDetailInfo')),

    // 按钮查询事件
    _Processes=() => {
        let PollutantValue = [];
        ExceptionProcessing.map((item) => {
            if (item.PollutantCode === this.state.PollutantValue) {
                PollutantValue.push({AlarmType: item.AlarmType, AlarmTime: item.AlarmTime, ExceptRecoverTime: item.ExceptRecoverTime, State: item.State, AlarmMsg: item.AlarmMsg, AlarmContinuedTime: item.AlarmContinuedTime, PollutantCode: item.PollutantCode, PollutantName: item.PollutantName});
            }
        });
        this.setState({ExceptionProcessingList: PollutantValue});
    }
    renderForm() {
        return this.state.expandForm ? this.renderSimpleForm() : this.renderAllForm();
    }
    renderSimpleForm() {
        return (
            <div style={{ width: '100%' }}>
                <Card>
                    <Row gutter={16} >
                        <Col span={8}>
                            <span >污染物: <PollutantSelect_ onChange={this._handlePollutantChange} style={{width: 150}} /></span>
                        </Col>
                        <Col span={9}>
                            <span >时间: <RangePicker_ style={{width: 250}} format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
                        </Col>
                        <Col span={2}>
                            <span ><Button style={{width: 90}} type="primary" onClick={() => {
                                this.setState({
                                    visible: true,
                                    type: 'add',
                                    title: '处理',
                                    width: 530
                                });
                            }}>处理</Button></span>
                        </Col>
                        <Col>
                            <span ><Button style={{width: 90}} type="primary" onClick={this._Processes}>查询</Button>  <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            展开 <Icon type="down" /> </a></span>
                        </Col>
                    </Row>
                    <Modal
                        visible={this.state.visible}
                        title={this.state.title}
                        width={this.state.width}
                        onOk={() => {
                            this.setState({
                                visible: false
                            });
                        }}
                        onCancel={() => {
                            this.setState({
                                visible: false
                            });
                        }}>
                        {
                            this.state.type === 'add' ? <Videos /> : null
                        }
                    </Modal>
                </Card>
            </div>
        );
    }
    toggleForm = () => {
        this.setState({
            expandForm: !this.state.expandForm,
        });
    };
    renderAllForm() {
        return (
            <div style={{ width: '100%' }}>
                <Card>
                    <Row gutter={16} >
                        <Col span={8}>
                            <span >污染物: <PollutantSelect_ onChange={this._handlePollutantChange} style={{width: 150}} /></span>
                        </Col>
                        <Col span={9}>
                            <span >时间: <RangePicker_ style={{width: 350}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
                        </Col>

                        <Col span={2}>
                            <span ><Button style={{width: 90}} type="primary" onClick={() => {
                                this.setState({
                                    visible: true,
                                    type: 'add',
                                    title: '处理',
                                    width: 530
                                });
                            }}>处理</Button></span>

                        </Col>
                        <Col>
                            <span ><Button style={{width: 90}} type="primary" onClick={this._Processes}>查询</Button><a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            收起 <Icon type="up" />
                            </a></span>
                        </Col>
                    </Row>
                    <Row style={{marginTop: 15}}>
                        <Col span={8}>
                            <span >报警类别: <AlarmTypeSelect defaultValue="限值报警" onChange={this._handleAlarmChange} width={150} /></span>
                        </Col>
                        <Col span={9}>
                            <span >报警持续时长: <InputNumber onChange={this.numberChange} min={1} max={1000} style={{width: 60}} defaultValue={1} />小时以上</span>
                        </Col>
                    </Row>
                    <Modal
                        visible={this.state.visible}
                        title={this.state.title}
                        width={this.state.width}
                        onOk={() => {
                            this.setState({
                                visible: false
                            });
                        }}
                        onCancel={() => {
                            this.setState({
                                visible: false
                            });
                        }}>
                        {
                            this.state.type === 'add' ? <Process /> : null
                        }
                    </Modal>

                </Card>
            </div>
        );
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        const columns = [{
            title: '污染物',
            dataIndex: 'PollutantName',
            key: 'PollutantName',
            width: 110,
        },
        { title: '报警时间',
            dataIndex: 'AlarmTime',
            key: 'AlarmTime',
            width: 150,
        }, {
            title: '报警类别',
            dataIndex: 'AlarmType',
            key: 'AlarmType',
            width: 110,
        }, {
            title: '报警状态',
            dataIndex: 'State',
            key: 'State',
            width: 110,
        },
        {
            title: '报警持续时长(小时)',
            dataIndex: 'AlarmContinuedTime',
            key: 'AlarmContinuedTime',
            width: 150,
        },
        {
            title: '运维单',
            dataIndex: 'ViewOperation',
            key: 'ViewOperation',
            width: 80,
            render: (text, record, index) => { return <Button type="primary" shape="circle" icon="link" size={'small'} onClick={this.stationclick} id={record.key} />; }
        },
        {
            title: '报警视频',
            dataIndex: 'AlarmVideo',
            key: 'AlarmVideo',
            width: 110,
            render: (text, record, index) => {
                return <Button type="primary" shape="circle" icon="play-circle-o" size={'small'} onClick={() => {
                    this.setState({
                        visible: true,
                        title: '报警视频',
                    });
                }} id={record.key} />;
            }
        },
        {
            title: '预计恢复时间',
            dataIndex: 'ExceptRecoverTime',
            key: 'ExceptRecoverTime',
            width: 180,
        }, {
            title: '描述',
            dataIndex: 'AlarmMsg',
            key: 'AlarmMsg',
            width: 800,
        }];
        const data = this.state.ExceptionProcessingList;
        return (
            <Card>
                <div className={styles.tableListForm}>{this.renderForm()}</div>
                <Row gutter={18} >
                    <Col span={24}>
                        <Table
                            columns={columns}
                            dataSource={data}
                            scroll={{ x: 2060, y: 'calc(100vh - 475px)' }}
                            rowSelection={rowSelection}
                        />
                        <div>
                            <Modal
                                visible={this.state.visible}
                                title="报警视频"
                                width="800px"
                                height="500px"
                                onOk={() => {
                                    this.setState({
                                        visible: false
                                    });
                                }}
                                onCancel={() => {
                                    this.setState({
                                        visible: false
                                    });
                                }}>
                                {
                                    <Videos />
                                }
                            </Modal>
                        </div>
                    </Col>
                </Row>
            </Card>

        );
    }
}
export default AlarmRecord;
