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
        const data=this.props.data;
        var AlarmList=[];
        if (this.props.data !== null && this.props.data.length > 0) {
            this.props.data[0].AlarmMsgList.map((item) => {
                    AlarmList.push({
                        AlarmMsg: item
                    });
            });
        }
        const columns = [{
            title: '报警信息',
            dataIndex: 'AlarmMsg',
            width: '45%',
            key: 'AlarmMsg',
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
