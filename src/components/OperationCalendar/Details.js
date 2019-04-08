import React, { Component } from 'react';
import { Input, Select, InputNumber, Form, Button, Upload, DatePicker, Row, Col, Radio, message, Table, Tag } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import moment from 'moment';
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
@connect(({ manualupload, loading }) => ({
    PollutantTypesList: manualupload.PollutantTypesList,
    addselectdata: manualupload.addselectdata,
    unit: manualupload.unit,
    requstresult: manualupload.requstresult,
    reason: manualupload.reason
}))
/*
页面：日历详情
*/
@connect()
@Form.create()
export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exceptrangeDate: [],
            realrangeDate: [],
            description: '',
            pollutantList: [],
        };
    }
    render() {
        const columns = [
            {
                title: '监测点名称',
                dataIndex: 'PointName',
                key:'PointName',
                render: (text, record) => {
                    if (record.TaskType === 2)
                        return <div style={{ position: 'relative' }}>{text}<Tag style={{ position: 'absolute', top: -10 }} color="#f50">应急</Tag></div>;
                    return text;
                }
            },
            {
                title: '运维状态',
                key:'ExceptionTypeText',
                dataIndex: 'ExceptionTypeText',
                render: (text, record) => {
                    if (!text)
                        return <Tag color="rgb(76,205,122)">正常</Tag>;
                    return (
                        <div>
                            {
                                text.split(',').map((item,key) => (
                                    <Tag key={key} color="rgb(244,6,94)">{item}</Tag>
                                ))
                            }
                        </div>
                    );
                }
            },
            {
                title: '运维人',
                dataIndex: 'OperationName',
                key:'OperationName',
                render: (text, record) => {
                    if (record.TaskStatus === 2)
                        return <div style={{ position: 'relative' }}>{text}<Tag style={{ marginLeft: 7 }} color="#faad14">进行中</Tag></div>;
                    return text;
                }
            }, {
                title: '操作',
                dataIndex: 'opt',
                key:'opt',
                render: (text, record) => (
                    <a onClick={
                        () => this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfolayout/${undefined}/OperationCalendar/${record.TaskID}/${record.DGIMN}`))
                    }
                    > 详情
                    </a>
                )
            }];
        const data = this.props.dataType === 'month' ? this.props.data.filter(m => moment(m.CreateTime).format('YYYY-MM-DD') === this.props.dateValue.format("YYYY-MM-DD")) : this.props.data.filter(m => moment(m.CreateTime).format('YYYY-MM') === this.props.dateValue.format("YYYY-MM"))
        return (
            <div>
                <Table
                    rowKey={(record, index) => `complete${index}`}
                    columns={columns}
                    dataSource={data}
                    size="middle"
                    pagination={{ pageSize: 5 }}
                />
            </div >
        );
    }
}
