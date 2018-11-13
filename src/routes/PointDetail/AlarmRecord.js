
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
    Radio,
    Modal,
    Table,
    Button,
    Icon,
    Form,
} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './index.less';
import Videos from '../../components/AlarmRecord/Video';
import {connect} from 'dva';
const FormItem = Form.Item;
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
            process: false,
            video: false,
            value: 1,
            selectid: ''
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
    VideoClick=() => {
        this.setState({video: true});
    }
    ProcessCilck=() => {
        ;
        this.setState({process: true});
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
                            <span ><Button style={{width: 90}} type="primary" onClick={this.ProcessCilck}>处理</Button></span>
                        </Col>
                        <Col>
                            <span ><Button style={{width: 90}} type="primary" onClick={this._Processes}>查询</Button>  <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            展开 <Icon type="down" /> </a></span>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
    toggleForm = () => {
        this.setState({
            expandForm: !this.state.expandForm,
        });
    };
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
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
                            <span ><Button style={{width: 90}} type="primary" onClick={this.ProcessCilck}>处理</Button></span>

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
                </Card>
            </div>
        );
    }
    render() {
        const RadioGroup = Radio.Group;
    
        const columns = [{
            title: '运维人',
            dataIndex: 'OperationPerson',
            key: 'OperationPerson',
            width: '60px'
        },
        { title: '状态',
            dataIndex: 'State',
            key: 'State',
            width: '60px'
        }, {
            title: '设备名称',
            dataIndex: 'DeviceName',
            key: 'DeviceName',
            width: '60px'
        }, {
            title: '规格/型号',
            dataIndex: 'Size',
            key: 'Size',
            width: '80px'
        },
        {
            title: '初次报警时间',
            dataIndex: 'FirstAlarmTime',
            key: 'FirstAlarmTime',
            width: '80px'
        },
        {
            title: '报警次数',
            dataIndex: 'Alarmcount',
            key: 'Alarmcount',
            width: '60px'
            // render: (text, record, index) => { return <Button type="primary" shape="circle" icon="link" size={'small'} onClick={this.stationclick} id={record.key} />; }
        },
        {
            title: '最近一次报警时间',
            dataIndex: 'LastAlarmTime',
            key: 'LastAlarmTime',
            width: '80px'
            // render: (text, record, index) => {
            //     return <Button type="primary" shape="circle" icon="play-circle-o" size={'small'} onClick={this.VideoClick} id={record.key} />;
            // }
        },
        {
            title: '报警类别',
            dataIndex: 'AlarmType',
            key: 'AlarmType',
            width: '80px'
        }];

        const data = this.state.ExceptionProcessingList;
        return (
            <Card>
                {/* <div className={styles.tableListForm}>{this.renderForm()}</div> */}
                <Card>
                    <Form layout="inline">
                        <Row gutter={{ md: 8, lg: 8, xl: 8 }}>
                            <Col span={12}>
                                <FormItem label="超标时间">
                                    <RangePicker_ style={{width: 250}} format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="状态">
                                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                                        <Radio value={1}>全部</Radio>
                                        <Radio value={2}>已处理</Radio>
                                        <Radio value={3}>未处理</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>

                </Card>
                <Row gutter={18} >
                    <Col span={24}>
                        <Table
                            columns={columns}
                            dataSource={data}
                            rowKey="InspectionTaskId"
                            scroll={{ x: '1720px', y: 'calc(100vh - 475px)' }}
                        />
                        {/* <div>
                            <Modal
                                visible={this.state.process}
                                title="报警视频"
                                width="800px"
                                height="500px"
                                onOk={() => {
                                    this.setState({
                                        process: false
                                    });
                                }}
                                onCancel={() => {
                                    this.setState({
                                        process: false
                                    });
                                }}>
                                {
                                    <Process />
                                }
                            </Modal>
                            <Modal
                                visible={this.state.video}
                                title="档案下载"
                                width="50%"
                                footer={null}
                                onOk={() => {
                                    this.setState({
                                        video: false
                                    });
                                }}
                                onCancel={() => {
                                    this.setState({
                                        video: false
                                    });
                                }}>
                                {
                                    <Videos />
                                }
                            </Modal>
                        </div> */}
                    </Col>
                </Row>
            </Card>

        );
    }
}
export default AlarmRecord;
