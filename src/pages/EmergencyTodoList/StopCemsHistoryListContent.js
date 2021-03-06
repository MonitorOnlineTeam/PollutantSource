import React, { Component } from 'react';
import {
    Card,
    Row,
    Col,
    Table,
    Form,
    Tag,
    Spin
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import styles from './StopCemsHistoryListContent.less';

const datas=[
    {
        "FormMainID":"609cd9f2-3fac-43b3-803e-7fb031373cbd",
        "TaskID":"c39151b5-bdcd-473a-bab0-2d202f7887cc",
        "TypeID":2,
        "TypeName":"StopCemsHistoryList",
        "Content":"{'EnterpriseName':'首钢京唐钢铁联合有限责任公司','PointPosition':'','StopSummary':''}",
        "CreateUserID":"印飞星",
        "CreateTime":"2019-01-08 14:46:16",
        "SignContent":null,
        "SignTime":null,
        "StopHour":146.02,
        "ReasonContent":"",
        "IsSign":false,
        "TaskStatus":3
    }, {
        "FormMainID":"609cd9f2-3fac-43b3-803e-7fb031373cbd",
        "TaskID":"c39151b5-bdcd-473a-bab0-2d202f7887cc",
        "TypeID":2,
        "TypeName":"StopCemsHistoryList",
        "Content":"{'EnterpriseName':'首钢京唐钢铁联合有限责任公司','PointPosition':'','StopSummary':''}",
        "CreateUserID":"王娇娇",
        "CreateTime":"2019-05-09 09:22:16",
        "SignContent":null,
        "SignTime":null,
        "StopHour":25.03,
        "ReasonContent":"",
        "IsSign":false,
        "TaskStatus":3
    }, {
        "FormMainID":"609cd9f2-3fac-43b3-803e-7fb031373cbd",
        "TaskID":"c39151b5-bdcd-473a-bab0-2d202f7887cc",
        "TypeID":2,
        "TypeName":"StopCemsHistoryList",
        "Content":"{'EnterpriseName':'首钢京唐钢铁联合有限责任公司','PointPosition':'','StopSummary':''}",
        "CreateUserID":"王娇娇",
        "CreateTime":"2019-03-27 09:02:16",
        "SignContent":null,
        "SignTime":null,
        "StopHour":52.07,
        "ReasonContent":"",
        "IsSign":false,
        "TaskStatus":3
    }, {
        "FormMainID":"609cd9f2-3fac-43b3-803e-7fb031373cbd",
        "TaskID":"c39151b5-bdcd-473a-bab0-2d202f7887cc",
        "TypeID":2,
        "TypeName":"StopCemsHistoryList",
        "Content":"{'EnterpriseName':'首钢京唐钢铁联合有限责任公司','PointPosition':'','StopSummary':''}",
        "CreateUserID":"印飞星",
        "CreateTime":"2019-04-05 12:46:16",
        "SignContent":null,
        "SignTime":null,
        "StopHour":102.05,
        "ReasonContent":"",
        "IsSign":false,
        "TaskStatus":3
    }, {
        "FormMainID":"609cd9f2-3fac-43b3-803e-7fb031373cbd",
        "TaskID":"c39151b5-bdcd-473a-bab0-2d202f7887cc",
        "TypeID":2,
        "TypeName":"StopCemsHistoryList",
        "Content":"{'EnterpriseName':'首钢京唐钢铁联合有限责任公司','PointPosition':'','StopSummary':''}",
        "CreateUserID":"王娇娇",
        "CreateTime":"2019-08-08 14:22:16",
        "SignContent":null,
        "SignTime":null,
        "StopHour":16.02,
        "ReasonContent":"",
        "IsSign":false,
        "TaskStatus":3
    }
]
@connect(({ maintenancelist, loading }) => ({
    loading: loading.effects['maintenancelist/GetStopCemsHistoryList'],
    StopCemsHistoryList: maintenancelist.StopCemsHistoryList,
    HistoryStopCemsListHistoryRecordsCount: maintenancelist.total,
    pageIndex: maintenancelist.pageIndex,
    pageSize: maintenancelist.pageSize,
    beginTime: maintenancelist.beginTime, //开始时间
    endTime: maintenancelist.endTime, //结束时间
    DGIMN: maintenancelist.DGIMN
}))
/*
页面：停机历史记录
*/
class StopCemsHistoryListContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment(moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))], // 最近3月
        };
    }

    componentDidMount() {
        const condition = {
            pageIndex: 1,
            pageSize: 10,
            beginTime: moment().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'), //运维大事记开始时间
            endTime: moment().format('YYYY-MM-DD 23:59:59'), //运维大事记结束时间
            DGIMN: this.props.pointcode
        };
        this.ChangeModelState(condition);
        // if(this.props.operation!=="menu/intelligentOperation"){
            this.GetHistoryRecord();
        // }
    }

    GetHistoryRecord = () => {
        this.props.dispatch({
            type: 'maintenancelist/GetStopCemsHistoryList',
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
                rangeDate: date,
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
            this.props.dispatch(routerRedux.push(`/PatrolForm/StopCemsRecord/${this.props.DGIMN}/${this.props.viewtype}/operationlist/StopCemsHistoryList/${record.TaskID}`));
        } else {
            this.props.dispatch(routerRedux.push(`/PatrolForm/StopCemsRecord/${this.props.DGIMN}/${this.props.operation}/StopCemsHistoryList/${record.TaskID}`));
        }
    }

    ChangeModelState = (condition) => {
        this.props.dispatch({
            type: 'maintenancelist/updateState',
            payload: { ...condition }
        });
    }

    render() {
        const dataSource =datas // this.props.StopCemsHistoryList === null ? [] : this.props.StopCemsHistoryList;
        const columns = [{
            title: '运维人',
            width: '20%',
            dataIndex: 'CreateUserID',
            key: 'CreateUserID'
        }, {
            title: '停机时长(小时)',
            width: '45%',
            dataIndex: 'StopHour',
            key: 'StopHour',
            render: (text, record) => {
                let resu = [];
                if (text !== undefined) {
                    resu.push(
                        <Tag key={text} style={{ marginBottom: 1.5, marginTop: 1.5 }} color="#108ee9">{text}</Tag>
                    );
                }
                return resu;
            }
        }, {
            title: '记录时间',
            dataIndex: 'CreateTime',
            width: '20%',
            key: 'CreateTime',
            sorter: (a, b) => Date.parse(a.CreateTime) - Date.parse(b.CreateTime),
        }, {
            title: '详细',
            dataIndex: 'TaskID',
            width: '15%',
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
                                <label className={styles.conditionLabel}>记录时间：</label>
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
                            'total': this.props.HistoryStopCemsListHistoryRecordsCount,
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
export default StopCemsHistoryListContent;
