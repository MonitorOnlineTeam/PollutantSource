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
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
const Option = Select.Option;
const Search = Input.Search;

@connect(({loading, userinfo}) => ({
    ...loading,
    list: userinfo.list,
    total: userinfo.total,
    pageSize: userinfo.pageSize,
    pageIndex: userinfo.pageIndex,

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
    componentWillMount() {
        this.onChange();
    };

    onChange(pageNumber) {
        this.props.dispatch({
            type: 'userinfo/fetchuserlist',
            payload: {
                pageIndex: pageNumber,
            },
        });
    }
    handleOK=(e) => {
        this.addForm.handleSubmit();
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
                                <Select defaultValue="" style={{ width: 120 }}>
                                    <Option value="">全部</Option>
                                    <Option value="1">启用</Option>
                                    <Option value="2">禁用</Option>
                                </Select></Col>
                            <Col span={1} ><Button type="primary"
                                onClick={() => {
                                    // this.setState({
                                    //     Addvisible: true,
                                    //     type: 'add',
                                    //     title: '新建用户',
                                    //     width: 1130
                                    // });
                                    this.props.dispatch(routerRedux.push(`/monitor/sysmanage/UserDetail/null`));
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
                    loading={this.props.effects['userinfo/fetchuserlist']}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.props.list}
                    scroll={{ y: 'calc(100vh - 455px)' }}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        'total': this.props.total,
                        'pageSize': this.props.pageSize,
                        'current': this.props.pageIndex,
                        onChange: this.onChange
                    }}
                />
                <Modal
                    visible={this.state.Addvisible}
                    title={this.state.title}
                    width={this.state.width}
                    onOk={() => {
                        this.handleOK().bind(this);
                    }}
                    onCancel={() => {
                        this.setState({
                            Addvisible: false
                        });
                    }}>
                    {
                        this.state.type === 'add' ? <Add wrappedComponentRef={(inst) => this.addForm = inst} /> : ''
                    }
                </Modal>
                <Modal
                    visible={this.state.DataFiltervisible}
                    title={this.state.title}
                    width={this.state.width}
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
