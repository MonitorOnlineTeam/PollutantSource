import React, { Component } from 'react';
import {
    Card,
    Row,
    Col,
    Table,
    Form,
    Spin
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import styles from '../EmergencyTodoList/DeviceExceptionHistoryList.less';
import { routerRedux } from 'dva/router';


@connect(({ maintenancelist, loading }) => ({
    loading: loading.effects['maintenancelist/GetDeviceExceptionHistoryList'],
    HistoryDeviceExceptionList: maintenancelist.DeviceExceptionHistroyList,
    HistoryDeviceExceptionListCount: maintenancelist.total,
    pageIndex: maintenancelist.pageIndex,
    pageSize: maintenancelist.pageSize,
}))
/*
页面：异常历史记录
*/
export default class DeviceExceptionHistoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment(moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))], // 最近七天
            BeginTime: moment().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'),
            EndTime: moment().format('YYYY-MM-DD 23:59:59'),
            DGIMN: this.props.match.params.pointcode,
            TypeID: this.props.match.params.TypeID,
        };
    }
    componentDidMount() {
        this.GetHistoryRecord(this.props.pageIndex, this.props.pageSize, this.state.DGIMN, this.state.TypeID, this.state.BeginTime, this.state.EndTime);
    }

    GetHistoryRecord = (pageIndex, pageSize, DGIMN, TypeID, BeginTime, EndTime) => {
        this.props.dispatch({
            type: 'maintenancelist/GetDeviceExceptionHistoryList',
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

    _handleDateChange = (date, dateString) => {
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

    seeDetail = (record) => {
        this.props.dispatch(routerRedux.push(`/PatrolForm/DeviceExceptionRecord/${this.state.DGIMN}/${this.props.match.params.viewtype}/qcontrollist/DeviceExceptionHistoryList/${record.TaskID}`));
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
            title: '记录时间',
            dataIndex: 'CreateTime',
            width: '20%',
            key: 'CreateTime',
            sorter: (a, b) => Date.parse(a.CreateTime) - Date.parse(b.CreateTime),
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
        if (this.props.isloading) {
            return (<Spin
                style={{
                    width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                size="large"
            />);
        }
        return (
            <div className={styles.cardTitle}>
                <Card bordered={false}>
                    <div className={styles.conditionDiv}>
                        <Row gutter={8}>
                            <Col span={3} >
                                记录时间：
                                </Col>
                            <Col span={21} >
                                <RangePicker_ style={{ width: 350 }} onChange={this._handleDateChange} format={'YYYY-MM-DD'} dateValue={this.state.rangeDate} />
                            </Col>

                        </Row>
                    </div>
                    <Table
                        rowKey={(record, index) => `complete${index}`}
                        size="middle"
                        scroll={{ y: 'calc(100vh - 465px)' }}
                        loading={this.props.loading}
                        className={styles.dataTable}
                        columns={columns}
                        dataSource={dataSource}
                        rowClassName={
                            (record, index, indent) => {
                                if (index === 0) {
                                    return;
                                }
                                if (index % 2 !== 0) {
                                    return 'light';
                                }
                            }
                        }
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                            'total': this.props.HistoryDeviceExceptionListCount,
                            'pageSize': this.props.pageSize,
                            'current': this.props.pageIndex,
                            onChange: this.onChange,
                            onShowSizeChange: this.onShowSizeChange,
                            pageSizeOptions: ['10', '20', '30', '40']
                        }}
                    />
                </Card>
            </div>
        );
    }
}