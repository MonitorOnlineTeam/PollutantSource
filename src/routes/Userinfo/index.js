import React, { Component, Fragment } from 'react';
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
import Add from '../Userinfo/AddUser';
import DataFilter from '../Userinfo/DataFilter';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;

@connect(({loading, userinfo}) => ({
    ...loading,
    list: userinfo.list,
    total: userinfo.total,
    pageSize: userinfo.pageSize,
    pageIndex: userinfo.pageIndex,
    requstresult: userinfo.requstresult,
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
            DeleteMark: '',
            UserAccount: '',
            selectedRowKeys: [],
            userId: '',
        };
    }
    componentWillMount() {
        this.onChange();
    };
    selectRow = (record) => {
        this.setState({
            userId: record.key
        });
    }
    onSelectedRowKeysChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys
        });
    }
    onShowSizeChange = (pageIndex, pageSize) => {
        this.props.dispatch({
            type: 'userinfo/fetchuserlist',
            payload: {
                pageIndex: pageIndex,
                pageSize: pageSize
            },
        });
    }
    onChange = (pageIndex, pageSize) => {
        this.props.dispatch({
            type: 'userinfo/fetchuserlist',
            payload: {
                pageIndex: pageIndex,
                pageSize: pageSize
            },
        });
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys
        });
    }
    handleOK=(e) => {
        this.addForm.handleSubmit();
    }
    deleteuserbyid=(e) => {
        this.props.dispatch({
            type: 'userinfo/deleteuser',
            payload: {
                pageIndex: this.props.pageIndex,
                pageSize: this.props.pageSize,
                DeleteMark: this.props.DeleteMark,
                UserAccount: this.props.UserAccount,
                UserId: this.state.selectedRowKeys,
                callback: () => {
                    this.setState({
                        selectedRowKeys: [],
                    });
                }
            },
        });
    }
    delete=(e) => {
        if (this.state.selectedRowKeys.length > 0) {
            confirm({
                title: '确定要删除吗?',
                // content: 'Some descriptions',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => this.deleteuserbyid(),
                onCancel() {
                    console.log('Cancel');
                },
            });
        } else {
            message.error('请选择要删除的数据！');
        }
    };
    IsEnabled = (type, record) => {
        this.props.dispatch({
            type: 'userinfo/enableduser',
            payload: {
                pageIndex: this.props.pageIndex,
                pageSize: this.props.pageSize,
                DeleteMark: this.props.DeleteMark,
                UserAccount: this.props.UserAccount,
                UserId: record.User_ID,
                Enalbe: type
            },
        });
    };
    onRef1 = (ref) => {
        this.child = ref;
    }
    AddCompletion = () => {
        this.setState({
            DataFiltervisible: false,
            type: 'datafilter',
            title: '数据过滤',
            width: 1130
        });
    }
    AddData=() => {
        this.child.AddDataFilter();
    }
    render() {
        const columns = [{
            title: '登录名称',
            dataIndex: 'User_Account',
            key: 'User_Account',
            width: '150px',
            sorter: (a, b) => a.User_Account.length - b.User_Account.length,
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '用户名称',
            dataIndex: 'User_Name',
            key: 'User_Name',
            width: '80px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '性别',
            dataIndex: 'User_Sex',
            key: 'User_Sex',
            width: '10px',
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
            width: '120px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '报警类型',
            dataIndex: 'AlarmType',
            key: 'AlarmType',
            width: '100px',
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
            width: '80px',
            render: (text, record) => {
                if (text === '禁用') {
                    return <span > <Tag color="red" > <a onClick={
                        () => this.IsEnabled(1, record)
                    } > {text} </a></Tag > </span>;
                } else {
                    return <span > <Tag color="blue" > <a onClick={
                        () => this.IsEnabled(2, record)
                    } > {text} </a></Tag > </span>;
                }
            }
        },
        {
            title: '操作',
            width: '50px',
            render: (text, record) => (<Fragment >
                <a onClick={
                    () => this.props.dispatch(routerRedux.push(`/monitor/sysmanage/UserDetail/${record.key}`))
                } > 编辑 </a> </Fragment>
            ),
        },
        ];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange,
        };

        return (
            <Card bordered={false}>
                <Card>
                    <Form layout="inline">
                        <Row gutter={8}>
                            <Col span={3} >
                                <Search placeholder="姓名/登录名" onSearch={(value) => {
                                    this.setState({
                                        UserAccount: value
                                    });
                                    this.props.dispatch({
                                        type: 'userinfo/fetchuserlist',
                                        payload: {
                                            pageIndex: 1,
                                            pageSize: 10,
                                            DeleteMark: this.state.DeleteMark,
                                            UserAccount: value,
                                        },
                                    });
                                }}style={{ width: 200 }} /></Col>
                            <Col span={2} >
                                <Select value={this.state.DeleteMark} style={{ width: 120 }} onChange={(value) => {
                                    this.setState({
                                        DeleteMark: value
                                    });
                                    this.props.dispatch({
                                        type: 'userinfo/fetchuserlist',
                                        payload: {
                                            pageIndex: 1,
                                            pageSize: 10,
                                            DeleteMark: value,
                                            UserAccount: this.state.UserAccount
                                        },
                                    });
                                }}>
                                    <Option value="">全部</Option>
                                    <Option value="1">启用</Option>
                                    <Option value="2">禁用</Option>
                                </Select></Col>
                            <Col span={1} ><Button type="primary"
                                onClick={() => {
                                    this.props.dispatch(routerRedux.push(`/monitor/sysmanage/UserDetail/null`));
                                }}>添加</Button></Col>
                            <Col span={1} ><Button type="danger" onClick={this.delete}>删除</Button></Col>
                            <Col span={1} ><Button type="primary"
                                onClick={() => {
                                    if (this.state.selectedRowKeys.length === 1) {
                                        this.setState({
                                            DataFiltervisible: true,
                                            type: 'datafilter',
                                            title: '数据过滤',
                                            width: 1130
                                        });
                                    }
                                    if (this.state.selectedRowKeys.length > 1) {
                                        message.warning('请选择一位用户');
                                    }
                                    if (this.state.selectedRowKeys.length === 0) {
                                        message.warning('请选择用户');
                                    }
                                }}
                            >数据过滤</Button></Col>
                        </Row>
                    </Form>
                </Card>
                <Table
                    loading={this.props.effects['userinfo/fetchuserlist']}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.props.requstresult === '1' ? this.props.list : null}
                    scroll={{ y: 'calc(100vh - 455px)' }}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        'total': this.props.total,
                        'pageSize': this.props.pageSize,
                        'current': this.props.pageIndex,
                        onChange: this.onChange,
                        onShowSizeChange: this.onShowSizeChange,
                        pageSizeOptions: ['5', '10', '20', '30', '40']
                    }}
                />
                <Modal
                    visible={this.state.DataFiltervisible}
                    title={this.state.title}
                    width={this.state.width}
                    destroyOnClose={true}// 清除上次数据
                    onOk={() => {
                        this.AddData();
                    }
                    }
                    onCancel={() => {
                        this.setState({
                            DataFiltervisible: false
                        });
                    }}>
                    {
                        this.state.type === 'datafilter' ? <DataFilter pid={this.state.selectedRowKeys} onRef={this.onRef1} complant={this.AddCompletion} /> : ''
                    }
                </Modal>
            </Card>
        );
    }
}
