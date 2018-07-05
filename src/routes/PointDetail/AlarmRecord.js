// import liraries
import React, { Component } from 'react';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import AlarmTypeSelect from '../../components/AlarmTypeSelect/index';
import { Card,
    InputNumber,
    Row,
    Col,
    Modal
} from 'antd';
import PollutantSelect_ from '../../components/PointDetail/PollutantSelect_';
import { Button } from 'antd';
import { Table, Icon, Divider } from 'antd';
import ExceptionProcessing from '../../mockdata/Base/Code/T_Cod_ExceptionProcessing';
import Process from '../../components/AlarmRecord/Process';
class AlarmRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [],

        };
    }

    _handleDateChange=(date, dateString) => {
        console.log(date);// [moment,moment]
        console.log(dateString);// ['2018-06-23','2018-06-25']
        // this.state.rangeDate = date;
        this.setState({rangeDate: date});
    };
    render() {
        const columns = [{
            title: '污染物',
            dataIndex: 'PollutantName',
            key: '1',
            width: 110,

        },
        { title: '报警时间',
            dataIndex: 'AlarmTime',
            key: '2',
            width: 180,

        }, {
            title: '报警类别',
            dataIndex: 'AlarmType',
            key: '3',
            width: 110,

        }, {
            title: '报警状态',
            dataIndex: 'State',
            key: '4',
            width: 110,

        },
        {
            title: '报警持续时长(小时)',
            dataIndex: 'AlarmContinuedTime',
            key: '5',
            width: 180,

        },
        {
            title: '预计恢复时间',
            dataIndex: 'ExceptRecoverTime',
            key: '6',
            width: 180,

        }, {
            title: '描述',
            dataIndex: 'AlarmMsg',
            key: '7',
            width: 1250,

        }];
        this._AlarmTypeChange = (value, selectedOptions) => {
            console.log(value);
            console.log(selectedOptions);

            // ExceptionProcessing.map(item => {
            //     if(item[]
            // });
        };

        const data = ExceptionProcessing;
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 225px)' }}>
                <Card title="北京绿都供暖-锅炉小号烟囱">
                    <Row gutter={16} style={{marginBottom: 40, marginLeft: 5}}>
                        <Col className="gutter-row" span={4}>
                            <span className="gutter-box">报警类别: <AlarmTypeSelect onChange={this._AlarmTypeChange} width={150} /></span>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <span className="gutter-box">污染物: <PollutantSelect_ onChange={this._handlePollutantChange} style={{width: 150}} /></span>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <span className="gutter-box">时间: <RangePicker_ dateFormat="YYYY-MM-DD" dateValue={this.state.rangeDate} onChange={this._handleDateChange} /></span>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <span className="gutter-box">报警持续时长: <InputNumber min={1} max={1000} style={{width: 60}} defaultValue={3} />小时以上</span>
                        </Col>
                        <Col className="gutter-row" span={2}>
                            <span className="gutter-box"><Button style={{width: 90}} type="primary">查看运维</Button></span>
                        </Col>
                        <Col className="gutter-row" span={2}>
                            <span className="gutter-box"><Button style={{width: 90}} type="primary" onClick={() => {
                                this.setState({
                                    visible: true,
                                    type: 'add',
                                    title: '处理',
                                    width: 530
                                });
                            }}>处理</Button></span>
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
                    <Row gutter={16}>
                        <Col className="gutter-row" span={24}>
                            <div className="gutter-box"><Table
                                columns={columns}
                                dataSource={data}
                                scroll={{ x: 1950, y: 600 }}
                            /></div>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}
export default AlarmRecord;
