import React, { Component } from 'react';
import {
    Button,
    Input,
    Card,
    Row,
    Col,
    Table,
    Form,
    Select, Modal, message, Tag, Radio, Checkbox,
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import {routerRedux} from 'dva/router';
import { DEFAULT_ENCODING } from 'crypto';

@connect(({ task, loading }) => ({
    // isloading: loading.effects['task/GetJzHistoryRecord'],
    HistoryDeviceExceptionList: task.List,
    HistoryDeviceExceptionListCount: task.total,
    pageIndex: task.pageIndex,
    pageSize: task.pageSize,
}))
/*
页面：异常历史记录
*/
export default class DeviceExceptionListHistoryRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment(moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))], // 最近七天
            BeginTime: moment().subtract(11, 'month').format('YYYY-MM-DD 00:00:00'),
            EndTime: moment().format('YYYY-MM-DD 23:59:59'),
            DGIMN: this.props.match.params.pointcode,
            TypeID: this.props.match.params.TypeID,
        };
    }
    componentDidMount() {
        debugger;
        this.GetHistoryRecord(this.props.pageIndex, this.props.pageSize, this.state.DGIMN, this.state.TypeID, this.state.BeginTime, this.state.EndTime);
    }

    GetHistoryRecord=(pageIndex, pageSize, DGIMN, TypeID, BeginTime, EndTime) => {
        debugger;
        this.props.dispatch({
            type: 'task/GetDeviceExceptionList',
            payload: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                TypeID: TypeID,
                DGIMN: DGIMN,
                BeginTime: moment(BeginTime).format('YYYY-MM-DD 00:00:00'),
                EndTime: moment(EndTime).format('YYYY-MM-DD 23:59:59'),
            }
        });
    };

    _handleDateChange=(date, dateString) => {
        this.setState(
            {
                rangeDate: date,
                BeginTime: dateString[0],
                EndTime: dateString[1]
            }
        );
        this.GetHistoryRecord(this.props.pageIndex, this.props.pageSize, this.state.DGIMN, this.state.typeID, dateString[0], dateString[1]);
    };

    onShowSizeChange = (pageIndex, pageSize) => {
        this.GetHistoryRecord(pageIndex, pageSize, this.state.DGIMN, this.state.typeID, this.state.BeginTime, this.state.EndTime);
    }

    onChange = (pageIndex, pageSize) => {
        this.GetHistoryRecord(pageIndex, pageSize, this.state.DGIMN, this.state.typeID, this.state.BeginTime, this.state.EndTime);
    }

    seeDetail=(record) => {
        this.props.dispatch(routerRedux.push(`/pointdetail/:pointcode/DeviceExceptionDetail/${record.TaskID}/${this.state.TypeID}`));
    }

    render() {
        const dataSource = this.props.HistoryDeviceExceptionList === null ? null : this.props.HistoryDeviceExceptionList;
        const columns = [{
            title: '校准人',
            width: '13%',
            dataIndex: 'CreateUserID',
            key: 'CreateUserID'
        }, {
            title: '异常状况',
            width: '19%',
            dataIndex: 'ExceptionStatus',
            key: 'ExceptionStatus'
        }, {
            title: '异常原因',
            width: '19%',
            dataIndex: 'ExceptionReason',
            key: 'ExceptionReason'
        }, {
            title: '处理情况',
            width: '19%',
            dataIndex: 'DealingSituations',
            key: 'DealingSituations'
        }, {
            title: '记录创建时间',
            dataIndex: 'CreateTime',
            width: '20%',
            key: 'CreateTime'
        }, {
            title: '详细',
            dataIndex: 'TaskID',
            width: '10%',
            key: 'TaskID',
            render: (text, record) => {
                return <a onClick={
                    () => this.seeDetail(record)
                } > 详细 </a>;
            }
        }];
        return (
            <div>
                <Card bordered={false}>
                    <Card>
                        <Form layout="inline">
                            <Row gutter={8}>
                                <Col span={4} >
                            记录创建时间：
                                </Col>
                                <Col span={5} >
                                    <RangePicker_ style={{width: 350}} onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                    <Table
                        // loading={this.props.isloading}
                        columns={columns}
                        dataSource={dataSource}
                        scroll={{ y: 'calc(100vh - 455px)' }}
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                            'total': this.props.HistoryDeviceExceptionListCount,
                            'pageSize': this.props.pageSize,
                            'current': this.props.pageIndex,
                            onChange: this.onChange,
                            onShowSizeChange: this.onShowSizeChange,
                            pageSizeOptions: ['5', '10', '20', '30', '40']
                        }}
                    />
                </Card>
            </div>
        );
    }
}
