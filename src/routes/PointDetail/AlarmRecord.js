// import liraries
import React, { Component } from 'react';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import AlarmTypeSelect from '../../components/AlarmTypeSelect/index';
import {routerRedux} from 'dva/router';
import { Card,
    InputNumber,
    Row,
    Col,
    Modal,
    Table,
    Button
} from 'antd';
import {connect} from 'dva';
import PollutantSelect_ from '../../components/PointDetail/PollutantSelect_';
import moment from 'moment';
import ExceptionProcessing from '../../mockdata/Base/Code/T_Cod_ExceptionProcessing';
import Process from '../../components/AlarmRecord/Process';

@connect(() => ({

}))

class AlarmRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [],
            selectedRowKeys: [],

        };
    }
    _handleDateChange=(date, dateString) => {
        console.log(date);// [moment,moment]
        console.log(dateString);// ['2018-06-23','2018-06-25']
        // this.state.rangeDate = date;
        this.setState({rangeDate: date});
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    attentionClick=(e) => {
        this.setState({attentionvisible: true});
    }
    stationclick = () => {
        this.props.dispatch(routerRedux.push(`/monitor/pointdetail/${this.props.match.params.pointcode}/DataQuery`));
    }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [{
                key: 'all-data',
                text: 'Select All Data',
                onSelect: () => {
                    this.setState({
                        selectedRowKeys: [...Array(46).keys()], // 0...45
                    });
                },
            }, {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }, {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }],
            onSelection: this.onSelection,
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
        const data = ExceptionProcessing;
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 225px)' }}>
                <Card>
                    <Row gutter={16} style={{marginBottom: 40, marginLeft: 5, marginTop: 20}}>
                        <Col className="gutter-row" span={4}>
                            <span className="gutter-box">报警类别: <AlarmTypeSelect onChange={this._AlarmTypeChange} width={150} /></span>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <span className="gutter-box">污染物: <PollutantSelect_ onChange={this._handlePollutantChange} style={{width: 150}} /></span>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <span className="gutter-box">时间: <RangePicker_ style={{width: 350}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange} dateValue={this.state.rangeDate} /></span>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <span className="gutter-box">报警持续时长: <InputNumber min={1} max={1000} style={{width: 60}} />小时以上</span>
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
                    <Row gutter={18} style={{marginTop: 30}}>
                        <Col className="gutter-row" span={24}>
                            <Table
                                columns={columns}
                                dataSource={data}
                                scroll={{ x: 1950, y: 'calc(100vh - 465px)' }}
                                rowSelection={rowSelection}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}
export default AlarmRecord;
