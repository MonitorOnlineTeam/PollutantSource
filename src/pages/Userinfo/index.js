import React, { Component, Fragment } from 'react';
import {
    Button,
    Input,
    Card,
    Row,
    Col,
    Table,
    Form,
    Select, Modal, Tag, Divider, Dropdown, Icon, Menu, Popconfirm, message
} from 'antd';
import styles from './index.less';
import MonitorContent from '../../components/MonitorContent/index';
import NewDataFilter from '../Userinfo/DataFilterNew';
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
        this.onChange(this.props.pageIndex,this.props.pageSize);
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
                DeleteMark: this.state.DeleteMark,
                UserAccount: this.state.UserAccount,
                UserId: id,
                callback: () => {
                    message.success('删除成功！')
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
                this.setState({
                    DataFiltervisible: true,
                    type: 'datafilter',
                    title: '数据过滤',
                    width: '80%',
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
                <Menu.Item key="1"><Icon type="setting" />数据过滤</Menu.Item>
            </Menu>
        );
        const columns = [{
            title: '登录名称',
            dataIndex: 'User_Account',
            key: 'User_Account',
            width: '10%',
            align:'center',
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
            align: 'center',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '角色名称',
            dataIndex: 'Roles_Name',
            key: 'Roles_Name',
            width: '10%',
            align: 'center',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '电话号码',
            dataIndex: 'Phone',
            key: 'Phone',
            width: '10%',
            align: 'center',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '推送类型',
            dataIndex: 'SendPush',
            key: 'SendPush',
            width: '20%',
            align: 'center',
            render: (text, record) => {
                return text;
            }
        },
        { title: '状态',
            dataIndex: 'DeleteMark',
            key: 'DeleteMark',
            width: '10%',
            align: 'center',
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
            width: '30%',
            align: 'center',
            render: (text, record) => {
                if (record.Roles_ID !== 'eec719c2-7c94-4132-be32-39fe57e738c9'){
                    
                return <Fragment >
                <a onClick={
                    () => this.props.dispatch(routerRedux.push(`/sysmanage/UserDetail/${record.key}`))
                } > 编辑 </a>
                <Divider type="vertical" />
                 <Popconfirm placement="left" title="确定要删除此用户吗？" onConfirm={() => this.deleteuserbyid(record.key)} okText="是" cancelText="否">
                    <a href="#" > 删除 </a>
                </Popconfirm>
                
                <Divider type="vertical" />
                <Dropdown overlay={menu(record.key)} >
                    <a>
                   更多 <Icon type="down" />
                    </a>
                </Dropdown>
            </Fragment>
            }
            else
            {
                return <Fragment >
                <a onClick={
                    () => this.props.dispatch(routerRedux.push(`/sysmanage/UserDetail/${record.key}`))
                } > 编辑 </a>
                <Divider type="vertical" />
                 <Popconfirm placement="left" title="确定要删除此用户吗？" onConfirm={() => this.deleteuserbyid(record.key)} okText="是" cancelText="否">
                    <a href="#" > 删除 </a>
                </Popconfirm>
            </Fragment>
            }
        },
        },
        ];
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    {Name:'首页',Url:'/'},
                    {Name:'系统管理',Url:''},
                    {Name:'用户管理',Url:''}
                ]
            }>
                <div className={styles.cardTitle}>
                    <Card bordered={false} >
                        <Form layout="inline" style={{marginBottom: 10}}>
                            <Row gutter={8}>
                                <Col span={24} >
                                    <Search placeholder="用户名/登录名" onSearch={(value) => {
                                        this.setState({
                                            UserAccount: value
                                        });
                                        this.props.dispatch({
                                            type: 'userinfo/fetchuserlist',
                                            payload: {
                                                pageIndex: 1,
                                                pageSize: this.props.pageSize,
                                                DeleteMark: this.state.DeleteMark,
                                                UserAccount: value,
                                            },
                                        });
                                    }}style={{ width: 200 }} />
                                    <Select value={this.state.DeleteMark} style={{ width: 120,marginLeft:10 }} onChange={(value) => {
                                        this.setState({
                                            DeleteMark: value
                                        });
                                        this.props.dispatch({
                                            type: 'userinfo/fetchuserlist',
                                            payload: {
                                                pageIndex: 1,
                                                pageSize: this.props.pageSize,
                                                DeleteMark: value,
                                                UserAccount: this.state.UserAccount
                                            },
                                        });
                                    }}>
                                        <Option value="">状态</Option>
                                        <Option value="1">启用</Option>
                                        <Option value="2">禁用</Option>
                                    </Select>
                                    <Button type="primary" style={{marginLeft:10}}
                                    onClick={() => {
                                        this.props.dispatch(routerRedux.push(`/sysmanage/UserDetail/null`));
                                    }}>添加</Button>
                                </Col>
                            </Row>
                        </Form>

                        <Table
                            loading={this.props.effects['userinfo/fetchuserlist']}
                            columns={columns}
                            className={styles.dataTable}
                            size="small"// small middle
                            dataSource={this.props.requstresult === '1' ? this.props.list : null}
                            scroll={{ y: 'calc(100vh - 330px)' }}
                            rowClassName={
                                (record, index, indent) => {
                                    if (index === 0) {
                                        return;
                                    }
                                    if (index % 2 !== 0) {
                                        return 'light';
                                    }
                                }
                            }
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
                            footer={false}
                            onCancel={() => {
                                this.setState({
                                    DataFiltervisible: false
                                });
                            }}>
                            {
                                <NewDataFilter pid={this.state.userId} />
                            }
                        </Modal>
                    </Card>
                </div>
            </MonitorContent>
        );
    }
}
