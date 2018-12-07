// import liraries
import React, { Component } from 'react';
import EmergencyDataList from '../../mockdata/InspectionTaskList/inspectionTaskList.json';
import {Button, Table, Select, Card, Form, Row, Col, message} from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import styless from '../ReplacementPartAdd/index.less';
import {routerRedux} from 'dva/router';

const FormItem = Form.Item;


/* 
页面：8、例行任务记录
描述：例行任务的历史记录
add by cg 18.6.8
modify by 
*/
@Form.create()
@connect()
class InspectionTaskRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
        RangeDate: [moment().subtract(7, 'days'), moment()],
        TargetStatus: '',
        OpeartionPerson: '',
        selectid: ''
    };
}

// 时间范围
_handleDateChange=(_date, dateString) => {
this.state.RangeDate = dateString;
};

// 任务状态
_handleTargetChange=(value) => {
 this.setState({
     TargetStatus: value
 });
};

// 运维人
_handleOperationChange=(value) => {
this.setState({
    OpeartionPerson: value
});
};

toggleForm = () => {
this.setState({
    expandForm: !this.state.expandForm,
});
};

handleFormReset = () => {
const { form } = this.props;
form.resetFields();
this.setState({
    formValues: {},
});
};

renderSimpleForm() {
const { getFieldDecorator } = this.props.form;
return (
    <Form layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={9} sm={24}>
                <FormItem label="开始时间">
                    {getFieldDecorator(`MaterialName`)(
                        <RangePicker_ dateValue={this.state.RangeDate} format="YYYY-MM-DD" onChange={this._handleDateChange} style={{ width: '100%' }} />
                    )}
                </FormItem>
            </Col>
            <Col md={5} sm={24}>
            <FormItem label="逾期时长">
                    {getFieldDecorator(`Specifications`)(
                        <Select placeholder="请选择"
                            onChange={this._handleOperationChange}
                            style={{ width: '100%' }}>
                            <Option value="">全部</Option>
                            <Option value="1">一天内</Option>
                            <Option value="2">一周内</Option>
                            <Option value="3">一周以上  </Option>
                        </Select>
                    ) }
                </FormItem>
            </Col>
            <Col md={5} sm={24}>
                <FormItem label="处理人">
                    {getFieldDecorator(`Specifications`)(
                        <Select placeholder="请选择"
                            onChange={this._handleOperationChange}
                            style={{ width: '100%' }}>
                            <Option value="">全部</Option>
                            <Option value="小李">小李</Option>
                            <Option value="小王">小王</Option>
                        </Select>
                    ) }
                </FormItem>
            </Col>
            <Col md={5} sm={24}>
                <Button type="primary" htmlType="submit" onClick={this.SearchInfo}>
        查询 </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
        重置
                </Button>
            </Col>
        </Row>
    </Form>
);
}

renderForm() {
return this.renderSimpleForm();
}

render() {
const { match} = this.props;
const pointcode = match.params.pointcode; // 任务ID
const points = ['bjldgn01', 'dtgjhh11102', 'dtgrjx110'];
const taskList = EmergencyDataList.EDataList.filter(function(item) {
    if (points.indexOf(pointcode) > -1) {
        return item.DGIMN === 'dtgjhh11102';
    } else {
        return item.DGIMN === 'bjldgn01';
    }
});

const EColumn = [
    {
        title: '执行人',
        width: '20%',
        dataIndex: 'User_Name',
        align: 'center'
    }, {
        title: '开始时间',
        width: '20%',
        dataIndex: 'BeginTime',
        align: 'center'
    }, {
        title: '结束时间',
        width: '20%',
        dataIndex: 'EndTime',
        align: 'center'
    }, {
        title: '签到',
        width: '20%',
        dataIndex: 'SignFlag',
        align: 'center'
    }, {
        title: '逾期时长(天)',
        width: '20%',
        dataIndex: 'LimitTime',
        align: 'center'
    }
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        let keys = [];
        selectedRowKeys.map(t => {
            if (Array.isArray(t)) {
                t.map(a => {
                    if (a !== '') { keys.push(a); }
                });
            } else {
                if (t !== '') { keys.push(t); }
            }
        });
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
    selectedRowKeys: [this.state.selectid]
};

return (
    <div
        style={{ width: '100%',
            height: 'calc(100vh - 223px)' }}
    >
        <Card bordered={false} >
            <div>
                <div className={styless.tableListForm}>{this.renderForm()}</div>
                <Button style={{marginLeft: 10, marginBottom: 10}} onClick={() => {
                    if (this.state.selectid === '') {
                        message.info('请选择应急任务！');
                    } else {
                        this.props.dispatch(routerRedux.push(`/emergency/emergencydetailinfo/${this.state.selectid}`));
                    }
                }}> 查看 </Button>
                <Table
                    columns={EColumn}
                    dataSource={taskList}
                    rowKey="InspectionTaskId"
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        'total': taskList.length,
                        'pageSize': 20,
                        'current': 1
                    }}
                    rowSelection={rowSelection}
                    scroll={
                        {
                            y: 'calc(100vh - 478px)'
                        }
                    }
                    onRow={(record, index) => {
                        return {
                            onClick: (a, b, c) => {
                                this.setState({selectid: record.InspectionTaskId});
                            }, // 点击行
                            onMouseEnter: () => {}, // 鼠标移入行
                        };
                    }}
                />
            </div></Card>
    </div>
);
}
}
// make this component available to the app
export default InspectionTaskRecord;
