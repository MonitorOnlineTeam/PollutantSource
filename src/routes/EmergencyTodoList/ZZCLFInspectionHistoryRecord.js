
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
    
    @connect(({ task, loading }) => ({
        HistoryInspectionHistoryRecordList: task.HistoryInspectionHistoryRecordList,
        HistoryInspectionHistoryRecordListCount: task.HistoryInspectionHistoryRecordListCount,
        pageIndex: task.pageIndex,
        pageSize: task.pageSize,
    }))
    /*
    页面：直接测量法CEMS日常巡检记录表(历史记录)
    */
    export default class ZZCLFInspectionHistoryRecord extends Component {
        constructor(props) {
            super(props);
            this.state = {
                rangeDate: [moment(moment(new Date()).subtract(11, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))], // 最近七天
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
                type: 'task/GetHistoryInspectionHistoryRecord',
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
                    rangeDate:date,
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
            this.props.dispatch(routerRedux.push(`/pointdetail/:pointcode/DirectMeasurement/${record.taskId}/${this.state.typeID}`));
        }
    
        render() {
            const dataSource = this.props.HistoryInspectionHistoryRecordList === null ? null : this.props.HistoryInspectionHistoryRecordList;
            const columns = [{
                title: '校准人',
                width: '20%',
                dataIndex: 'operationPerson',
                key: 'operationPerson'
            }, {
                title: '异常情况处理',
                width: '45%',
                dataIndex: 'content',
                key: 'content'
            }, {
                title: '记录创建时间',
                dataIndex: 'createTime',
                width: '20%',
                key: 'createTime'
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
                                    <Col span={3} >
                                记录创建时间：
                                    </Col>
                                    <Col span={3} >
                                        <RangePicker_ style={{width: 350}} onChange={this._handleDateChange} format="YYYY-MM-DD"  dateValue={this.state.rangeDate} />
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
                                'total': this.props.HistoryInspectionHistoryRecordListCount,
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
    