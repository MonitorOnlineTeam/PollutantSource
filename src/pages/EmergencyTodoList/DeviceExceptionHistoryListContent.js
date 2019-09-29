import React, { Component } from 'react';
import {
    Card,
    Row,
    Col,
    Table,
    Spin
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import styles from "./DeviceExceptionHistoryListContent.less";

const datas=[
    {
        "FormMainID":"5d42e57e-5bc4-43ef-9651-687fda584635",
        "TaskID":"beaedfe3-daa6-4d45-a1f8-371699f6cbc8",
        "TypeID":10,
        "TypeName":"DeviceExceptionHistoryList",
        "Content":"3",
        "CreateUserID":"王娇娇",
        "CreateTime":"2019-03-11 14:09:48",
        "SignContent":null,
        "SignTime":null,
        "detailID":"19a07d95-0c47-469d-986c-b00f2ae0c704",
        "ExceptionStatus":"分钟数据连续零值",
        "ExceptionReason":"分钟数据连续零值",
        "DealingSituations":"已解决",
        "IsOk":"0",
        "IsSign":false,
        "TaskStatus":"3"
    },
    {
        "FormMainID":"5d42e57e-5bc4-43ef-9651-687fda584635",
        "TaskID":"beaedfe3-daa6-4d45-a1f8-371699f6cbc8",
        "TypeID":10,
        "TypeName":"DeviceExceptionHistoryList",
        "Content":"3",
        "CreateUserID":"印飞星",
        "CreateTime":"2019-09-11 09:09:48",
        "SignContent":null,
        "SignTime":null,
        "detailID":"19a07d95-0c47-469d-986c-b00f2ae0c704",
        "ExceptionStatus":"小时数据连续零值",
        "ExceptionReason":"小时数据连续零值",
        "DealingSituations":"已解决",
        "IsOk":"0",
        "IsSign":false,
        "TaskStatus":"3"
    },
    {
        "FormMainID":"5d42e57e-5bc4-43ef-9651-687fda584635",
        "TaskID":"beaedfe3-daa6-4d45-a1f8-371699f6cbc8",
        "TypeID":10,
        "TypeName":"DeviceExceptionHistoryList",
        "Content":"3",
        "CreateUserID":"张家印",
        "CreateTime":"2019-04-25 13:44:48",
        "SignContent":null,
        "SignTime":null,
        "detailID":"19a07d95-0c47-469d-986c-b00f2ae0c704",
        "ExceptionStatus":"小时数据连续异常",
        "ExceptionReason":"小时数据连续异常",
        "DealingSituations":"已解决",
        "IsOk":"0",
        "IsSign":false,
        "TaskStatus":"3"
    },
    {
        "FormMainID":"5d42e57e-5bc4-43ef-9651-687fda584635",
        "TaskID":"beaedfe3-daa6-4d45-a1f8-371699f6cbc8",
        "TypeID":10,
        "TypeName":"DeviceExceptionHistoryList",
        "Content":"3",
        "CreateUserID":"李建军",
        "CreateTime":"2019-08-09 15:12:48",
        "SignContent":null,
        "SignTime":null,
        "detailID":"19a07d95-0c47-469d-986c-b00f2ae0c704",
        "ExceptionStatus":"分钟数据连续零值",
        "ExceptionReason":"分钟数据连续零值",
        "DealingSituations":"已解决",
        "IsOk":"0",
        "IsSign":false,
        "TaskStatus":"3"
    },
    {
        "FormMainID":"5d42e57e-5bc4-43ef-9651-687fda584635",
        "TaskID":"beaedfe3-daa6-4d45-a1f8-371699f6cbc8",
        "TypeID":10,
        "TypeName":"DeviceExceptionHistoryList",
        "Content":"3",
        "CreateUserID":"印飞星",
        "CreateTime":"2019-02-22 16:25:48",
        "SignContent":null,
        "SignTime":null,
        "detailID":"19a07d95-0c47-469d-986c-b00f2ae0c704",
        "ExceptionStatus":"分钟数据连续零值",
        "ExceptionReason":"分钟数据连续零值",
        "DealingSituations":"已解决",
        "IsOk":"0",
        "IsSign":false,
        "TaskStatus":"3"
    },
    {
        "FormMainID":"5d42e57e-5bc4-43ef-9651-687fda584635",
        "TaskID":"beaedfe3-daa6-4d45-a1f8-371699f6cbc8",
        "TypeID":10,
        "TypeName":"DeviceExceptionHistoryList",
        "Content":"3",
        "CreateUserID":"王娇娇",
        "CreateTime":"2019-06-05 13:11:48",
        "SignContent":null,
        "SignTime":null,
        "detailID":"19a07d95-0c47-469d-986c-b00f2ae0c704",
        "ExceptionStatus":"小时数据连续零值",
        "ExceptionReason":"小时数据连续零值",
        "DealingSituations":"已解决",
        "IsOk":"0",
        "IsSign":false,
        "TaskStatus":"3"
    },
]

@connect(({ maintenancelist, loading }) => ({
    loading: loading.effects['maintenancelist/GetDeviceExceptionHistoryList'],
    HistoryDeviceExceptionList: maintenancelist.DeviceExceptionHistroyList,
    HistoryDeviceExceptionListCount: maintenancelist.total,
    pageIndex: maintenancelist.pageIndex,
    pageSize: maintenancelist.pageSize,
    beginTime: maintenancelist.beginTime, //开始时间
    endTime: maintenancelist.endTime, //结束时间
    DGIMN: maintenancelist.DGIMN
}))
/*
页面：异常历史记录
*/
class DeviceExceptionHistoryListContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment(moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))], // 最近3月
        };
    }

    componentDidMount() {
        debugger
        const condition = {
            pageIndex: 1,
            pageSize: 10,
            beginTime: moment().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'), //运维大事记开始时间
            endTime: moment().format('YYYY-MM-DD 23:59:59'), //运维大事记结束时间
            DGIMN: this.props.pointcode
        };
        this.ChangeModelState(condition);
        this.GetHistoryRecord();
    }
    GetHistoryRecord = () => {
        this.props.dispatch({
            type: 'maintenancelist/GetDeviceExceptionHistoryList',
            payload: {
            }
        });
    };

    _handleDateChange = (date, dateString) => {
        const condition = {
            beginTime: date[0].format("YYYY-MM-DD HH:mm:ss"),
            endTime: date[1].format("YYYY-MM-DD HH:mm:ss"),
            pageIndex: 1
        };
        this.ChangeModelState(condition);
        this.setState(
            {
                rangeDate: date
            }
        );
        this.GetHistoryRecord();
    };

    onShowSizeChange = (pageIndex, pageSize) => {
        const condition = {
            pageIndex,
            pageSize
        };
        this.ChangeModelState(condition);
        this.GetHistoryRecord();
    }

    onChange = (pageIndex, pageSize) => {
        const condition = {
            pageIndex,
            pageSize
        };
        this.ChangeModelState(condition);
        this.GetHistoryRecord();
    }

    seeDetail = (record) => {
        if (this.props.operation === undefined) {
            this.props.dispatch(routerRedux.push(`/PatrolForm/DeviceExceptionRecord/${this.props.DGIMN}/${this.props.viewtype}/qcontrollist/DeviceExceptionHistoryList/${record.TaskID}`));
        } else {
            this.props.dispatch(routerRedux.push(`/PatrolForm/DeviceExceptionRecord/${this.props.DGIMN}/${this.props.operation}/DeviceExceptionHistoryList/${record.TaskID}`));
        }
    }

    ChangeModelState = (condition) => {
        this.props.dispatch({
            type: 'maintenancelist/updateState',
            payload: { ...condition }
        });
    }

    render() {
        const dataSource =datas// this.props.HistoryDeviceExceptionList === null ? null : this.props.HistoryDeviceExceptionList;
        const columns = [{
            title: '运维人',
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
            render: (text, record) => <a onClick={
                () => this.seeDetail(record)
            }
            > 详细
                                      </a>
        }];
        if (this.props.loading) {
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
                            <Col span={3}>
                                记录时间：
                            </Col>
                            <Col span={21}>
                                <RangePicker_ style={{ width: 350 }} onChange={this._handleDateChange} format="YYYY-MM-DD" dateValue={this.state.rangeDate} />
                            </Col>

                        </Row>
                    </div>
                    <Table
                        rowKey={(record, index) => `complete${index}`}
                        size="middle"
                        scroll={{ y: this.props.height }}
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
export default DeviceExceptionHistoryListContent;