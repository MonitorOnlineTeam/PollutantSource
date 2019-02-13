import React, { Component } from 'react';
import { Input, Select, InputNumber, Form, Button, Upload, DatePicker, Row, Col, Radio, message, Table, Tag } from 'antd';
import { connect } from 'dva';
/*
页面：报警详情
*/
@connect()
@Form.create()
export default class AlarmDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        var AlarmList=[];
        if (this.props.data !== null && this.props.data.length > 0) {
            this.props.data.map((item) => {
                    AlarmList.push({
                        key: item.key,
                        BeginAlarmTime: item.FirstTime,
                        AlarmTime: item.AlarmTime,
                        AlarmMsg: item.AlarmMsg,
                        AlarmCount: item.AlarmCount
                    });
            });
        }
        const columns = [{
            title: '开始报警时间',
            width: '20%',
            dataIndex: 'BeginAlarmTime',
            key: 'BeginAlarmTime',
            sorter: (a, b) => Date.parse(a.BeginAlarmTime) - Date.parse(b.BeginAlarmTime),
        }, {
            title: '最后一次报警时间',
            width: '20%',
            dataIndex: 'AlarmTime',
            key: 'AlarmTime',
            // sorter: (a, b) => Date.parse(a.AlarmTime) - Date.parse(b.AlarmTime),
        }, {
            title: '报警信息',
            dataIndex: 'AlarmMsg',
            width: '45%',
            key: 'AlarmMsg',
        }, {
            title: '报警次数',
            dataIndex: 'AlarmCount',
            width: '15%',
            key: 'AlarmCount',
            sorter: (a, b) => a.AlarmCount - b.AlarmCount,
        }];
        return (
            <div style={{width:'95%',margin:'auto'}}>
                <Table
                    rowKey={(record, index) => `complete${index}`}
                    columns={columns}
                    dataSource={AlarmList}
                    scroll={{ y: 'calc(100vh - 350px)' }}
                    size="middle"
                    pagination={{ pageSize: 10 }}
                />
            </div >
        );
    }
}
