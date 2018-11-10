import React, { Component } from 'react';
import {
    Button,
    Input,
    Card,
    Row,
    Col,
    Table,
    Form,
    Select, Modal,
} from 'antd';
import Add from '../Userinfo/AddUser';
import DataFilter from '../Userinfo/DataFilter';
import {connect} from 'dva';
const Option = Select.Option;
const Search = Input.Search;

@connect(({loading, userinfo}) => ({
    ...loading,
    list: userinfo.list,
    total: userinfo.total
}))
export default class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Addvisible: false,
            DataFiltervisible: false,
            loading: false,
            type: '',
            title: '',
            width: 400,
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
            title: '登录名称',
            dataIndex: 'User_Account',
            key: 'User_Account',
            width: '60px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '用户名称',
            dataIndex: 'User_Name',
            key: 'User_Name',
            width: '60px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '性别',
            dataIndex: 'User_Sex',
            key: 'User_Sex',
            width: '30px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '角色名称',
            dataIndex: 'Roles_Name',
            key: 'Roles_Name',
            width: '160px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '电话号码',
            dataIndex: 'Phone',
            key: 'Phone',
            width: '80px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '报警类型',
            dataIndex: 'AlarmType',
            key: 'AlarmType',
            width: '80px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '报警时间',
            dataIndex: 'AlarmTime',
            key: 'AlarmTime',
            width: '80px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '推送类型',
            dataIndex: 'SendPush',
            key: 'SendPush',
            width: '160px',
            render: (text, record) => {
                return text;
            }
        },
        { title: '状态',
            dataIndex: 'DeleteMark',
            key: 'DeleteMark',
            width: '60px',
            sorter: (a, b) => a.Emergency - b.Emergency,
            render: (text, row, index) => {
                if (text === '禁用') {
                    return <div style={{color: 'red'}}>{text}</div>;
                } else {
                    return <div >{text}</div>;
                }
            }
        },
        ];
        const data = [{
            key: '1',
            User_Account: 'liudajun',
            User_Name: '刘大军',
            User_Sex: '男',
            Phone: '13612345678',
            AlarmType: '实时报警',
            AlarmTime: '1,2,3',
            SendPush: '短信推送,APP推送',
            DeleteMark: '启用',
            Roles_Name: '运维主管,运维人员',
        },
        {
            key: '2',
            User_Account: 'xiaoliu',
            User_Name: '小刘',
            User_Sex: '女',
            Roles_Name: '运维人员',
            Phone: '13612345678',
            AlarmTime: '1,2,3',
            SendPush: 'APP推送',
            DeleteMark: '禁用',
            AlarmType: '定时报警',
        }
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };
        return (
            <Card>
                <Card>
                    <Form layout="inline">
                        <Row gutter={8}>
                            <Col span={3} >
                                <Search placeholder="姓名/登录名" onSearch={value => console.log(value)}
                                    style={{ width: 200 }} /></Col>
                            <Col span={2} >
                                <Select defaultValue="0" style={{ width: 120 }}>
                                    <Option value="0">全部</Option>
                                    <Option value="1">启用</Option>
                                    <Option value="2">禁用</Option>
                                </Select></Col>
                            <Col span={1} ><Button type="primary"
                                onClick={() => {
                                    this.setState({
                                        Addvisible: true,
                                        type: 'add',
                                        title: '新建用户',
                                        width: 1130
                                    });
                                }}>添加</Button></Col>
                            <Col span={1} ><Button type="danger">删除</Button></Col>
                            <Col span={1} ><Button type="primary"
                                onClick={() => {
                                    this.setState({
                                        DataFiltervisible: true,
                                        type: 'datafilter',
                                        title: '数据过滤',
                                        width: 1130
                                    });
                                }}
                            >数据过滤</Button></Col>
                        </Row>
                    </Form>
                </Card>
                <Table
                    loading={this.state.loading}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.props.list}
                    scroll={{ y: 'calc(100vh - 455px)' }}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        'total': 45,
                        'pageSize': 20,
                        'current': 1
                    }}
                />
                <Modal
                    visible={this.state.Addvisible}
                    title={this.state.title}
                    width={this.state.width}
                    onOk={() => {
                        this.setState({
                            Addvisible: false
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            Addvisible: false
                        });
                    }}>
                    {
                        this.state.type === 'add' ? <Add /> : ''
                    }
                </Modal>
                <Modal
                    visible={this.state.DataFiltervisible}
                    title={this.state.title}
                    width={this.state.width}
                    onOk={() => {
                        this.setState({
                            DataFiltervisible: false
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            DataFiltervisible: false
                        });
                    }}>
                    {
                        this.state.type === 'datafilter' ? <DataFilter /> : ''
                    }
                </Modal>
            </Card>
        );
    }
}
