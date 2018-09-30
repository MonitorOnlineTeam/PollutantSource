import React, { Component } from 'react';
import { Card,
    Row,
    Col,
    Table,
    Form,
    Select,
} from 'antd';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import styles from '../OperationPlanList/index.less';
import EnterprisePointCascadeMultiSelect from '../../components/EnterprisePointCascadeMultiSelect/index';
const FormItem = Form.Item;
const Option = Select.Option;
export default class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            loading: false,
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],

        };
    }
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
    handleChanges(value) {
        console.log(`selected ${value}`);
    }
    render() {
        const columns = [{
            title: '排口',
            dataIndex: 'CommonPoint',
            key: 'CommonPoint',
            width: '60px',
            render: (text, record) => {
                return text;
            }
        },
        { title: '紧急程度',
            dataIndex: 'Emergency',
            key: 'Emergency',
            width: '60px',
            sorter: (a, b) => a.Emergency - b.Emergency,
            render: (text, row, index) => {
                if (text === '紧急') {
                    return <div style={{color: 'red'}}>{text}</div>;
                } else if (text === '中等') {
                    return <div style={{color: '#FF8247'}}>{text}</div>;
                } else if (text === '一般') {
                    return <div style={{color: '#FFB90F'}}>{text}</div>;
                } else {
                    return <div >{text}</div>;
                }
            }
        }, {
            title: '任务状态',
            dataIndex: 'Taskstate',
            key: 'Taskstate',
            width: '60px',
            render: (text, row, index) => {
                if (text === '完成') {
                    return <div style={{color: '#00EE00'}}>{text}</div>;
                } else if (text === '未执行') {
                    return <div style={{color: '#FF0000'}}>{text}</div>;
                } else {
                    return <div >{text}</div>;
                }
            }
        }, {
            title: '运维人',
            dataIndex: 'OperationPerson',
            key: 'OperationPerson',
            width: '80px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '电话',
            dataIndex: 'OperationPhone',
            key: 'OperationPhone',
            width: '80px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '时间',
            dataIndex: 'FirstAlarmTime',
            key: 'FirstAlarmTime',
            width: '80px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '操作',
            key: 'Action',
            fixed: 'Action',
            width: 100,
            render: () => <a href="javascript:;">详情</a>,
        },
        ];
        const data = [{
            key: '1',
            CommonPoint: '大唐集团-脱硫入口1',
            Emergency: '紧急',
            Taskstate: '完成',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '3',
            StateEmergency: '2',
        },
        {
            key: '2',
            CommonPoint: '大唐集团-脱硫入口2',
            Emergency: '紧急',
            Taskstate: '完成',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '3',
            StateEmergency: '2',
        },
        {
            key: '3',
            CommonPoint: '大唐集团-脱硫入口3',
            Emergency: '紧急',
            Taskstate: '完成',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '3',
            StateEmergency: '2',
        },
        {
            key: '4',
            CommonPoint: '大唐集团-脱硫入口4',
            Emergency: '紧急',
            Taskstate: '完成',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '3',
            StateEmergency: '2',
        },
        {
            key: '5',
            CommonPoint: '大唐集团-脱硫入口5',
            Emergency: '紧急',
            Taskstate: '完成',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '3',
            StateEmergency: '2',
        },
        {
            key: '6',
            CommonPoint: '大唐集团-脱硫入口6',
            Emergency: '紧急',
            Taskstate: '完成',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '3',
            StateEmergency: '2',
        },
        {
            key: '7',
            CommonPoint: '大唐集团-脱硫入口7',
            Emergency: '紧急',
            Taskstate: '完成',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '3',
            StateEmergency: '2',
        },
        {
            key: '8',
            CommonPoint: '大唐集团-脱硫入口8',
            Emergency: '中等',
            Taskstate: '未执行',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '2',
            StateEmergency: '',
        },
        {
            key: '9',
            CommonPoint: '大唐集团-脱硫入口9',
            Emergency: '中等',
            Taskstate: '未执行',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '2',
            StateEmergency: '',
        },
        {
            key: '10',
            CommonPoint: '大唐集团-脱硫入口10',
            Emergency: '一般',
            Taskstate: '未执行',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '2',
            StateEmergency: '',
        },
        {
            key: '11',
            CommonPoint: '大唐集团-脱硫入口11',
            Emergency: '一般',
            Taskstate: '未执行',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '2',
            StateEmergency: '',
        },
        {
            key: '12',
            CommonPoint: '大唐集团-脱硫入口12',
            Emergency: '一般',
            Taskstate: '未执行',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '2',
            StateEmergency: '',
        },
        {
            key: '13',
            CommonPoint: '大唐集团-脱硫入口13',
            Emergency: '一般',
            Taskstate: '未执行',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '2',
            StateEmergency: '',
        },
        {
            key: '14',
            CommonPoint: '大唐集团-脱硫入口14',
            Emergency: '一般',
            Taskstate: '未执行',
            OperationPerson: '吴加好',
            OperationPhone: '13612345678',
            FirstAlarmTime: '2018-8-22 08:00:00',
            Action: '详情',
            StateTaskstate: '2',
            StateEmergency: '',
        }
        ];
        return (
            <PageHeaderLayout >
                <Card>
                    <Card>
                        <Form layout="inline">
                            <Row gutter={{ md: 8, lg: 8, xl: 8 }}>
                                <Col span={8} md={8} sm={8}>
                                    <FormItem label="超标时间">
                                        <RangePicker_ style={{width: 250}} format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                                    </FormItem>
                                </Col>
                                <Col span={5} md={5} sm={5}>
                                    <FormItem label="紧急程度">
                                        <Select defaultValue="全部" style={{ width: 120 }} onChange={this.handleChanges}>
                                            <Option value="1">紧急</Option>
                                            <Option value="2">中等</Option>
                                            <Option value="3">一般</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span={11} md={11} sm={11}>
                                    <FormItem label="排口名称">
                                        <EnterprisePointCascadeMultiSelect initValue={['bjldgn']} width="300px" cascadeSize={2} />
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>

                    </Card>
                    <Row gutter={18} >
                        <Col span={24}>
                            <Table
                                loading={this.state.loading}
                                columns={columns}
                                dataSource={data}
                                scroll={{ y: 'calc(100vh - 455px)' }}
                                pagination={{
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    'total': 45,
                                    'pageSize': 20,
                                    'current': 1
                                }}

                            />
                        </Col>
                    </Row>
                </Card>
            </PageHeaderLayout>

        );
    }
}
