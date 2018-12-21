
import React, { Component } from 'react';
import {
    Card,
    Row,
    Col,
    Table,
    Form,
    Spin,
    Tag
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import styles from '../EmergencyTodoList/XSCYFInspectionHistoryRecords.less';
import {routerRedux} from 'dva/router';

    @connect(({ task, loading }) => ({
        loading: loading.effects['task/GetHistoryInspectionHistoryRecords'],
        HistoryInspectionHistoryRecordList: task.HistoryInspectionHistoryRecordList,
        HistoryInspectionHistoryRecordListCount: task.total,
        pageIndex: task.pageIndex,
        pageSize: task.pageSize,
    }))
    /*
    页面：稀释采样法CEMS日常巡检记录表(历史记录)
    */
export default class XSCYFInspectionHistoryRecords extends Component {
        constructor(props) {
            super(props);
            this.state = {
                rangeDate: [moment(moment().subtract(3, 'month').format('YYYY-MM-01')), moment(moment().format('YYYY-MM-DD'))], // 最近七天
                BeginTime: moment().subtract(11, 'month').format('YYYY-MM-DD 00:00:00'),
                EndTime: moment().format('YYYY-MM-DD 23:59:59'),
                DGIMN: this.props.match.params.pointcode,
                typeID: this.props.match.params.TypeID,
            };
        }
        componentDidMount() {
            this.GetHistoryRecord(this.props.pageIndex, this.props.pageSize, this.state.DGIMN, this.state.typeID, this.state.BeginTime, this.state.EndTime);
        }
        GetHistoryRecord=(pageIndex, pageSize, DGIMN, typeID, BeginTime, EndTime) => {
            this.props.dispatch({
                type: 'task/GetHistoryInspectionHistoryRecords',
                payload: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    TypeID: typeID,
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
            this.props.dispatch(routerRedux.push(`/pointdetail/${this.props.match.params.pointcode}/DilutionSampling/${record.TaskID}/${record.TypeID}`));
        }

        render() {
            const dataSource = this.props.HistoryInspectionHistoryRecordList === null ? null : this.props.HistoryInspectionHistoryRecordList;
            const columns = [{
                title: '校准人',
                width: '20%',
                dataIndex: 'CreateUserID',
                key: 'CreateUserID'
            }, {
                title: '维护情况',
                width: '45%',
                dataIndex: 'Content',
                key: 'Content',
                render: (text, record) => {
                    if (text !== undefined) {
                        var content = text.split(',');
                        var resu = [];
                        content.map((item,key) => {
                            item = item.replace('(','  ');
                            item = item.replace(')','');
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
                key: 'CreateTime',
                sorter: (a, b) => Date.parse(a.CreateTime) - Date.parse(b.CreateTime),
            }, {
                title: '详细',
                dataIndex: 'TaskID',
                width: '15%',
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
                                        <RangePicker_ style={{width: 350}} onChange={this._handleDateChange} format={'YYYY-MM-DD'} dateValue={this.state.rangeDate} />
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        <Table
                            size={'middle'}
                            scroll={{ y: 'calc(100vh - 475px)' }}
                            loading={this.props.loading}
                            className={styles.tableCss}
                            columns={columns}
                            dataSource={dataSource}
                            pagination={{
                                showSizeChanger: true,
                                showQuickJumper: true,
                                'total': this.props.HistoryInspectionHistoryRecordListCount,
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

