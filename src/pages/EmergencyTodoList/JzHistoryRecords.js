import React, { Component } from 'react';
import styles from '../EmergencyTodoList/JzHistoryRecords.less';
import {
    Button,
    Input,
    Card,
    Row,
    Col,
    Table,
    Form,
    Select, Modal, message, Tag, Radio, Checkbox,Spin
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import {routerRedux} from 'dva/router';

const pageIndex = 1;
const pageSize = 10;
@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetJzHistoryRecord'],
    JzHistoryRecord: task.JzHistoryRecord,
    RecordCount: task.RecordCount
}))
export default class JzHistoryRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment(moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))],
            pageIndex: pageIndex,
            pageSize: pageSize,
            beginTime: moment().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'),
            endTime: moment().format('YYYY-MM-DD 23:59:59'),
            dgimn: this.props.match.params.pointcode,
            typeID: this.props.match.params.TypeID,
        };
    }

    componentDidMount() {
        this.GetHistoryRecord(pageIndex, pageSize, this.state.dgimn, this.state.typeID, this.state.beginTime, this.state.endTime);
    }

    GetHistoryRecord=(pageIndex, pageSize, dgimn, typeID, beginTime, endTime) => {
        this.props.dispatch({
            type: 'task/GetJzHistoryRecord',
            payload: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                TypeID: typeID,
                DGIMN: dgimn,
                BeginTime: beginTime,
                EndTime: endTime,
            }
        });
    };

    _handleDateChange=(date, dateString) => {
        this.setState(
            {
                rangeDate: [moment(moment(dateString[0]).format('YYYY-MM-DD 00:00:00')), moment(moment(dateString[1]).format('YYYY-MM-DD 23:59:59'))],
                beginTime: dateString[0],
                endTime: dateString[1]
            }
        );
        this.GetHistoryRecord(pageIndex, pageSize, this.state.dgimn, this.state.typeID, dateString[0], dateString[1]);
    };

    onShowSizeChange = (pageIndex, pageSize) => {
        this.GetHistoryRecord(pageIndex, pageSize, this.state.dgimn, this.state.typeID, this.state.BeginTime, this.state.EndTime);
    }

    onChange = (pageIndex, pageSize) => {
        this.GetHistoryRecord(pageIndex, pageSize, this.state.dgimn, this.state.typeID, this.state.BeginTime, this.state.EndTime);
    }

    seeDetail=(Record) => {
        this.props.dispatch(routerRedux.push(`/OperationForm/JzRecordInfo/${Record.TaskID}/${Record.TypeID}`));
    }

    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 150;
        const dataSource = this.props.JzHistoryRecord;
        const columns = [{
            title: '校准人',
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
                    var content = text.split('),');
                    var resu = [];
                    content.map((item,key) => {
                        // item = item.replace('(',' - ');
                        // item = item.replace(')','');
                        if (key !== content.length - 1) {
                            item = item + ')';
                        }
                        resu.push(
                            <Tag style={{marginBottom: 1.5,marginTop: 1.5}} color="#108ee9">{item}</Tag>
                        );
                    });
                }
                return resu;
            }
        }, {
            title: '记录创建时间',
            dataIndex: 'CreateTime',
            width: '20%',
            key: 'CreateTime'
        }, {
            title: '详细',
            dataIndex: 'TaskID',
            width: '15%',
            key: 'TaskID',
            render: (text, Record) => {
                return <a onClick={
                    () => this.seeDetail(Record)
                } > 详细 </a>;
            }
        }];
        if (this.props.isloading) {
            return (<Spin
                style={{ width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center' }}
                size="large"
            />);
        }
        return (
            <Card bordered={false}>
                <Card>
                    <Form layout="inline">
                        <Row gutter={8}>
                            <Col span={2} >
                            记录创建时间：
                            </Col>
                            <Col span={3} >
                                <RangePicker_ style={{width: 350}} onChange={this._handleDateChange} format={'YYYY-MM-DD'} dateValue={this.state.rangeDate} />
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Table
                    size={'middle'}
                    scroll={{ y: 'calc(100vh - 475px)' }}
                    className={styles.tableCss}
                    loading={this.props.isloading}
                    columns={columns}
                    dataSource={dataSource}
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
        );
    }
}
