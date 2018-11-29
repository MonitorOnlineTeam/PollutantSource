import React, {
    Component,
    Fragment
} from 'react';
import {
    Button,
    Input,
    Card,
    Row,
    Col,
    Table,
    Form,
    Modal,
    message,
    Tag,
    Menu,
    Icon,
    Badge,
    Dropdown,
} from 'antd';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
const Search = Input.Search;
const confirm = Modal.confirm;
const menu = (
    <Menu>
        <Menu.Item>
      Action 1
        </Menu.Item>
        <Menu.Item>
      Action 2
        </Menu.Item>
    </Menu>
);
export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    // componentWillMount() {
    //     this.onChange();
    // };

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
    render() {
        const expandedRowRender = (record) => {
            const name = record.Name;
            console.log(name);
            const columns = [
                { title: 'key', dataIndex: 'key', key: 'key' },
                { title: '污染物编号', dataIndex: 'PollutantCode', key: 'PollutantCode' },
                { title: '污染物类型', dataIndex: 'Type', key: 'Type' },
                { title: '报警类型', dataIndex: 'AlarmType', key: 'AlarmType' },
                { title: '上限', dataIndex: 'UpperLimit', key: 'upgradeNum' },
                { title: '下限', dataIndex: 'LowerLimit', key: 'LowerLimit' },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: () => (
                        <span className="table-operation">
                            <a href="javascript:;">Pause</a>
                            <a href="javascript:;">Stop</a>
                            <Dropdown overlay={menu}>
                                <a href="javascript:;">
                More <Icon type="down" />
                                </a>
                            </Dropdown>
                        </span>
                    ),
                },
            ];

            const data = [
                {
                    'key': name,
                    'PollutantCode': 'SO2 ',
                    'Type': '气体污染物',
                    'AlarmType': '上限报警',
                    'UpperLimit': '30',
                    'LowerLimit': '50',
                }
            ];
            return (
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            );
        };
        const columns = [{
            title: '标准名称',
            dataIndex: 'Name',
            key: 'Name',
            width: '350px',
            sorter: (a, b) => a.User_Account.length - b.User_Account.length,
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '标准类型',
            dataIndex: 'Type',
            key: 'Type',
            width: '100px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '文件',
            dataIndex: 'AttachmentID',
            key: 'AttachmentID',
            width: '100px',
            render: (text, record) => {
                return text;
            }
        },
        { title: '状态',
            dataIndex: 'IsUsed',
            key: 'IsUsed',
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
        const data
        = [{
            'key': '1',
            'Name': '大气污染物综合排放标准 GB 16297-1996 ',
            'Type': '国标',
            'AttachmentID': '33',
            'IsUsed': '启用',
        },
        {
            'key': '2',
            'Name': '环境监测技术规范 第二册 大气和废气部分 国家环境保护局（1986）年',
            'Type': '省标',
            'AttachmentID': '33',
            'IsUsed': '禁用',
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
                    // loading={this.props.effects['userinfo/fetchuserlist']}
                    // rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    expandedRowRender={expandedRowRender}
                    scroll={{ y: 'calc(100vh - 455px)' }}
                    // pagination={{
                    //     showSizeChanger: true,
                    //     showQuickJumper: true,
                    //     'total': this.props.total,
                    //     'pageSize': this.props.pageSize,
                    //     'current': this.props.pageIndex,
                    //     onChange: this.onChange,
                    //     onShowSizeChange: this.onShowSizeChange,
                    //     pageSizeOptions: ['5', '10', '20', '30', '40']
                    // }}
                />
            </Card>
        );
    }
}
