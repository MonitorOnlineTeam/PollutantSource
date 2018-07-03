import React, { Component } from 'react';
import PointList from '../../components/PointList/PointsList';
import {Button, Table, Select, Modal, Card, Form, Row, Col} from 'antd';
import EmergencyDataList from '../../mockdata/EmergencyTodoList/EmergencyDataList.json';
import moment from 'moment';
import EmergencyDetailInfo from './EmergencyDetailInfo';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styless from '../ReplacementPartAdd/index.less';
import {routerRedux} from 'dva/router';
const FormItem = Form.Item;

  @Form.create()
export default class EmergencyTodoList extends Component {
      constructor(props) {
          super(props);
          this.state = {
              EmergencyData: EmergencyDataList.EDataList,
              RangeDate: [moment().subtract(7, 'days'), moment()],
              TargetStatus: '',
              OpeartionPerson: '',
              DGIMNS: [],
          };
      }

    SearchEmergencyDataList = (value) => {
        this.setState({
            EmergencyData: [],
            DGIMNS: value
        });

        let dataList = [];
        EmergencyDataList.EDataList.map((item, _key) => {
            let isexist = false;
            if (value.indexOf(item.DGIMN) > -1) {
                isexist = true;
            }

            if (isexist) { dataList.push(item); }
        });
        this.setState({
            EmergencyData: dataList
        });
    };

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

    SearchInfo=() => {

    }

    handleFormReset = () => {
        const { form } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
    };

    renderSimpleForm() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        return (
            <Form layout="inline">
                <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
                    <Col span={6} md={6} sm={24}>
                        <FormItem label="开始时间">
                            {getFieldDecorator(`MaterialName`)(
                                <RangePicker_ dateValue={this.state.RangeDate} format="YYYY-MM-DD" onChange={this._handleDateChange} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6} md={6} sm={24}>
                        <FormItem label="任务状态">
                            {getFieldDecorator('Brand')(
                                <Select style={{ width: 200, marginLeft: 10 }} placeholder="请输入"
                                    onChange={this._handleTargetChange}>
                                    <Option value="">全部</Option>
                                    <Option value="处理中">处理中</Option>
                                    <Option value="未审核">未审核</Option>
                                    <Option value="正在审核">正在审核</Option>
                                    <Option value="未通过">未通过</Option>
                                    <Option value="审核通过">审核通过</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6} md={6} sm={24}>
                        <FormItem label="处理人">
                            {getFieldDecorator(`Specifications`)(
                                <Select style={{ width: 200, marginLeft: 10 }} placeholder="请输入"
                                    onChange={this._handleOperationChange}>
                                    <Option value="">全部</Option>
                                    <Option value="小李">小李</Option>
                                    <Option value="小王">小王</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6} md={6} sm={24}>
                        <span className={styless.submitButtons}>
                            <Button type="primary" htmlType="submit" onClick={this.SearchInfo}>
                查询 </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
                            </Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    renderForm() {
        return this.renderSimpleForm();
    }
    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight;
        const SCREEN_WIDTH = document.querySelector('body').offsetWidth;
        const thata = this;
        const EColumn = [
            {
                title: '故障类型',
                width: '10%',
                dataIndex: 'ExceptionType',
                align: 'center'
            }, {
                title: '处理人',
                width: '15%',
                dataIndex: 'User_Name',
                align: 'center'
            }, {
                title: '开始时间',
                width: '20%',
                dataIndex: 'BeginHandleTime',
                align: 'center'
            }, {
                title: '结束时间',
                width: '20%',
                dataIndex: 'EndHandleTime',
                align: 'center'
            }, {
                title: '签到',
                width: '15%',
                dataIndex: 'SignFlag',
                align: 'center'
            }, {
                title: '任务状态',
                width: '10%',
                dataIndex: 'CheckState',
                align: 'center'
            }, {
                title: '操作',
                width: '10%',
                dataIndex: 'action',
                align: 'center',
                render: (text, record) => {
                    const that = thata;
                    debugger;
                    return (
                        <span>
                            <Button type="dashed" icon="search" size="small"
                                onClick={(record) => {
                                    debugger;
                                    that.props.dispatch(routerRedux.push(`/monitor/emergency/emergencydetailinfo/${record.ExceptionHandleId}`));
                                }}
                            >详细
                            </Button>
                        </span>
                    );
                }
            }
        ];

        return (
            <PointList handleChange={this.SearchEmergencyDataList} IsShowChk={'none'}>
                <PageHeaderLayout title="待办列表">
                    <Card bordered={false} >
                        <div>
                            <div className={styless.tableListForm}>{this.renderForm()}</div>
                            <Table
                                columns={EColumn}
                                dataSource={this.state.EmergencyData}
                                rowKey="ExceptionHandleId"
                                pagination={{
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    'pageSize': 20,
                                    'current': 1
                                }}
                                scroll={
                                    {
                                        y: 'calc(100vh - 460px)'
                                    }
                                }
                                bordered={true}
                            />
                        </div></Card>
                </PageHeaderLayout>
            </PointList>
        );
    }
  }
