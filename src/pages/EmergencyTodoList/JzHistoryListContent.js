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
    Spin
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import { routerRedux } from 'dva/router';
import styles from '../EmergencyTodoList/JzHistoryListContent.less';

const datas=[
    {
        "CreateUserID":"印飞星",
        "CreateTime":"2019-06-02 16:02:58",
        "TaskID":"281d87da-7156-4956-93ae-cf6d4a3799ae",
        "TypeID":8,
        "Content":"零点漂移仪器校准(O2:,SO2:,NOX:,颗粒物:),量程漂移仪器校准(O2:,SO2:,NOX:,颗粒物:)",
        "FormMainID":"9552676a-483c-43bc-a779-0f03e2520bfe",
        "IsSign":false,
        "TaskStatus":3
    },
    {
        "CreateUserID":"王娇娇",
        "CreateTime":"2019-03-11 09:15:02",
        "TaskID":"beaedfe3-daa6-4d45-a1f8-371699f6cbc8",
        "TypeID":8,
        "Content":"零点漂移仪器校准(SO2:是,NOX:,颗粒物:是,O2:是),量程漂移仪器校准(SO2:是,NOX:,颗粒物:否,O2:是)",
        "FormMainID":"1172e190-c858-41a2-8963-6160ffb704cd",
        "IsSign":false,
        "TaskStatus":3
    },
    {
        "CreateUserID":"李建军",
        "CreateTime":"2019-08-08 12:55:02",
        "TaskID":"beaedfe3-daa6-4d45-a1f8-371699f6cbc8",
        "TypeID":8,
        "Content":"零点漂移仪器校准(SO2:是,NOX:,颗粒物:是,O2:是)",
        "FormMainID":"1172e190-c858-41a2-8963-6160ffb704cd",
        "IsSign":false,
        "TaskStatus":3
    },
    {
        "CreateUserID":"印飞星",
        "CreateTime":"2019-02-11 16:22:02",
        "TaskID":"beaedfe3-daa6-4d45-a1f8-371699f6cbc8",
        "TypeID":8,
        "Content":"零点漂移仪器校准(SO2:是,NOX:,颗粒物:是,O2:是),量程漂移仪器校准(SO2:是,NOX:,颗粒物:否,O2:是)",
        "FormMainID":"1172e190-c858-41a2-8963-6160ffb704cd",
        "IsSign":false,
        "TaskStatus":3
    },
    {
        "CreateUserID":"张家印",
        "CreateTime":"2019-06-11 13:55:02",
        "TaskID":"beaedfe3-daa6-4d45-a1f8-371699f6cbc8",
        "TypeID":8,
        "Content":"零点漂移仪器校准(SO2:是,NOX:,颗粒物:是,O2:是)",
        "FormMainID":"1172e190-c858-41a2-8963-6160ffb704cd",
        "IsSign":false,
        "TaskStatus":3
    },
]

@connect(({ maintenancelist, loading }) => ({
    loading: loading.effects['maintenancelist/GetJzHistoryList'],
    JzHistoryRecord: maintenancelist.JzHistoryList,
    RecordCount: maintenancelist.total,
    pageIndex: maintenancelist.pageIndex,
    pageSize: maintenancelist.pageSize,
    beginTime: maintenancelist.beginTime, //开始时间
    endTime: maintenancelist.endTime, //结束时间
    DGIMN: maintenancelist.DGIMN
}))
class JzHistoryListContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment(moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))]
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
            type: 'maintenancelist/GetJzHistoryList',
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
            this.props.dispatch(routerRedux.push(`/PatrolForm/JzRecord/${this.props.DGIMN}/${this.props.viewtype}/qcontrollist/JzHistoryList/${record.TaskID}`));
        } else {
            this.props.dispatch(routerRedux.push(`/PatrolForm/JzRecord/${this.props.DGIMN}/${this.props.operation}/JzHistoryList/${record.TaskID}`));
        }
    }

    ChangeModelState = (condition) => {
        this.props.dispatch({
            type: 'maintenancelist/updateState',
            payload: { ...condition }
        });
    }

    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 150;
        const dataSource =datas// this.props.JzHistoryRecord;
        const columns = [{
            title: '运维人',
            width: '20%',
            dataIndex: 'CreateUserID',
            key: 'CreateUserID'
        }, {
            title: '分析仪校准是否正常',
            width: '45%',
            dataIndex: 'Content',
            key: 'Content',
            render: (text, Record) => {
                if (text !== undefined) {
                    let content = text.split('),');
                    var resu = [];
                    content.map((item, key) => {
                        // item = item.replace('(',' - ');
                        // item = item.replace(')','');
                        if (key !== content.length - 1) {
                            item += ')';
                        }
                        resu.push(
                            <Tag key={key} style={{ marginBottom: 1.5, marginTop: 1.5 }} color="#108ee9">{item}</Tag>
                        );
                    });
                }
                return resu;
            }
        }, {
            title: '记录时间',
            dataIndex: 'CreateTime',
            width: '20%',
            key: 'CreateTime'
        }, {
            title: '详细',
            dataIndex: 'TaskID',
            width: '15%',
            key: 'TaskID',
            render: (text, Record) => <a onClick={
                () => this.seeDetail(Record)
            } > 详细 </a>
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
                            (record, index) => {
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
                            'total': this.props.RecordCount,
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
export default JzHistoryListContent;