import React, { Component, Fragment } from 'react';
import {
    Button,
    Input,
    Card,
    Row,
    Col,
    Table,
    Form,
    Select, Modal, Tag, Divider, Dropdown,Icon,Menu
} from 'antd';
import styles from './index.less';
import MonitorContent from '../../components/MonitorContent/index';
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
            userId: '',
        };
    }
    componentWillMount() {
        this.onChange();
    }
    selectRow = (record) => {
        this.setState({
            userId: record.key
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
    handleOK=(e) => {
        this.addForm.handleSubmit();
    }
    deleteuserbyid=(id) => {
        this.props.dispatch({
            type: 'userinfo/deleteuser',
            payload: {
                pageIndex: this.props.pageIndex,
                pageSize: this.props.pageSize,
                DeleteMark: this.props.DeleteMark,
                UserAccount: this.props.UserAccount,
                UserId: id,
                callback: () => {

                }
            },
        });
    }
    delete=(id) => {
        confirm({
            title: '确定要删除吗?',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => this.deleteuserbyid(id),
            onCancel() {
                console.log('Cancel');
            },
        });
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
                Enalbe: type,

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
    onMenu = (key,id) => {
        switch (key) {
            case '1':
                this.delete(id);
                break;
            case '2':
                this.setState({
                    DataFiltervisible: true,
                    type: 'datafilter',
                    title: '数据过滤',
                    width: 1130,
                    userId: id,
                });
                break;
            default:
                break;
        }
    }
    render() {
        const menu = (id) => (
            <Menu onClick={(e) => {
                this.onMenu.bind()(e.key,id);
            }}>
                <Menu.Item key="1"><Icon type="delete" />删除</Menu.Item>
                <Menu.Item key="2"><Icon type="setting" />数据过滤</Menu.Item>
            </Menu>
        );
        const columns = [{
            title: '登录名称',
            dataIndex: 'User_Account',
            key: 'User_Account',
            width: '10%',
            sorter: (a, b) => a.User_Account.length - b.User_Account.length,
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '用户名称',
            dataIndex: 'User_Name',
            key: 'User_Name',
            width: '10%',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '性别',
            dataIndex: 'User_Sex',
            key: 'User_Sex',
            width: '5%',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '角色名称',
            dataIndex: 'Roles_Name',
            key: 'Roles_Name',
            width: '10%',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '电话号码',
            dataIndex: 'Phone',
            key: 'Phone',
            width: '10%',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '报警类型',
            dataIndex: 'AlarmType',
            key: 'AlarmType',
            width: '10%',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '报警时间',
            dataIndex: 'AlarmTime',
            key: 'AlarmTime',
            width: '10%',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '推送类型',
            dataIndex: 'SendPush',
            key: 'SendPush',
            width: '15%',
            render: (text, record) => {
                return text;
            }
        },
        { title: '状态',
            dataIndex: 'DeleteMark',
            key: 'DeleteMark',
            width: '10%',
            render: (text, record) => {
                if (text === '禁用') {
                    return <span > <Tag color="red" > <a onClick={
                        () => this.IsEnabled(1, record)
                    } > {text} </a></Tag > </span>;
                }
                return <span > <Tag color="blue" > <a onClick={
                    () => this.IsEnabled(2, record)
                } > {text} </a></Tag > </span>;
            }
        },
        {
            title: '操作',
            width: '10%',
            render: (text, record) => (<Fragment >
                <a onClick={
                    () => this.props.dispatch(routerRedux.push(`/sysmanage/userdetail/${record.key}`))
                } > 编辑 </a>
                <Divider type="vertical" />
                <Dropdown overlay={menu(record.key)} >
                    <a>
                   更多 <Icon type="down" />
                    </a>
                </Dropdown>
            </Fragment>
            ),
        },
        ];
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
                                    <Option value="">状态</Option>
                                    <Option value="1">启用</Option>
                                    <Option value="2">禁用</Option>
                                </Select></Col>
                            <Col span={1} ><Button type="primary"
                                onClick={() => {
                                    this.props.dispatch(routerRedux.push(`/sysmanage/userdetail/null`));
                                }}>添加</Button></Col>
                        </Row>
                    </Form>
                </Card>
                <Table
                    loading={this.props.effects['userinfo/fetchuserlist']}
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
                        this.state.type === 'datafilter' ? <DataFilter pid={this.state.userId} onRef={this.onRef1} complant={this.AddCompletion} /> : ''
                    }
                </Modal>
            </Card>
        );
    }
}
