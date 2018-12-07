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
    Popconfirm,
    Tag,
    Menu,
    Icon,
    Radio,
    Dropdown,
    Divider,
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
@connect(({loading, standardlibrary}) => ({
    ...loading,
    list: standardlibrary.list,
    pollutantList: standardlibrary.pollutantList,
    total: standardlibrary.total,
    pageSize: standardlibrary.pageSize,
    pageIndex: standardlibrary.pageIndex,
    requstresult: standardlibrary.requstresult,
}))
export default class StandardLibrary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: null,
            Type: null,
            pollutantList: [],
        };
    }
    componentWillMount() {
        this.onChange();
    };

    onShowSizeChange = (pageIndex, pageSize) => {
        this.props.dispatch({
            type: 'standardlibrary/getlist',
            payload: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                Name: this.state.Name,
                Type: this.state.Type,

            },
        });
    }
    onChange = (pageIndex, pageSize) => {
        this.props.dispatch({
            type: 'standardlibrary/getlist',
            payload: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                Name: this.state.Name,
                Type: this.state.Type,
            },
        });
    }
    getPollutant = (key) => {
        this.props.dispatch({
            type: 'standardlibrary/getpollutantListlist',
            payload: {
                StandardLibraryID: key,
                callback: () => {
                    if (this.props.requstresult === '1') {
                        this.setState({
                            pollutantList: this.props.pollutantList,
                        });
                    } else {
                        this.setState({
                            pollutantList: null,
                        });
                    }
                }
            },
        });
    }
    confirm = (id) => {
        this.props.dispatch({
            type: 'standardlibrary/deletestandardlibrarybyid',
            payload: {
                pageIndex: this.props.pageIndex,
                pageSize: this.props.pageSize,
                Name: this.state.Name,
                Type: this.state.Type,
                StandardLibraryID: id,
                callback: () => {
                    if (this.props.requstresult === '1') {
                        message.success('删除成功！');
                    } else {
                        message.success('删除失败！');
                    }
                }
            },
        });
    }
    IsEnabled = (type, record) => {
        this.props.dispatch({
            type: 'standardlibrary/enableordisable',
            payload: {
                pageIndex: this.props.pageIndex,
                pageSize: this.props.pageSize,
                Name: this.state.Name,
                Type: this.state.Type,
                StandardLibraryID: record.key,
                Enalbe: type
            },
        });
    };
    onRef1 = (ref) => {
        this.child = ref;
    }
    render() {
        const expandedRowRender = (record) => {
            let arr = record.child;
            const columns = [
                { title: '污染物编号', dataIndex: 'PollutantCode', key: 'PollutantCode' },
                { title: '污染物名称', dataIndex: 'PollutantName', key: 'PollutantName' },
                { title: '上限', dataIndex: 'UpperLimit', key: 'upgradeNum' },
                { title: '下限', dataIndex: 'LowerLimit', key: 'LowerLimit' },
                { title: '报警类型', dataIndex: 'AlarmType', key: 'AlarmType' },
            ];
            return (
                <Table
                    // loading={this.props.effects['standardlibrary/getpollutantListlist']}
                    columns={columns}
                    dataSource={arr.length > 1 ? arr : null}
                    pagination={false}
                />
            );
        };
        const columns = [{
            title: '标准名称',
            dataIndex: 'Name',
            key: 'Name',
            width: '350px',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '标准类型',
            dataIndex: 'Type',
            key: 'Type',
            width: '100px',
            sorter: (a, b) => a.Type - b.Type,
            render: (text, record) => {
                if (text === 1) {
                    return <span > <Tag color="lime" > 国标 </Tag > </span >;
                }
                if (text === 2) {
                    return <span > <Tag color="green" > 地标 </Tag > </span >;
                } else {
                    return <span > <Tag color="cyan" > 行标 </Tag > </span >;
                }
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
            sorter: (a, b) => a.IsUsed - b.IsUsed,
            render: (text, record) => {
                if (text === 0) {
                    return <span > <Tag color="red" > <a onClick={
                        () => this.IsEnabled(1, record)
                    } > 禁用 </a></Tag > </span>;
                } else {
                    return <span > <Tag color="blue" > <a onClick={
                        () => this.IsEnabled(0, record)
                    } > 启用 </a></Tag > </span>;
                }
            }
        },
        {
            title: '操作',
            width: '150px',
            render: (text, record) => (<Fragment >
                <a onClick={
                    () => this.props.dispatch(routerRedux.push(`/monitor/sysmanage/UserDetail/${record.key}`))
                } > 应用到排口 </a> <Divider type="vertical" />
                <a onClick={
                    () => this.props.dispatch(routerRedux.push(`/monitor/sysmanage/StandardLibraryDetail/${record.key}`))
                } > 编辑 </a> <Divider type="vertical" />
                <Popconfirm placement="left" title="确定要删除此标准下所有数据吗？" onConfirm={() => this.confirm(record.key)} okText="是" cancelText="否">
                    <a href="#" > 删除 </a>
                </Popconfirm>
            </Fragment >
            ),
        },
        ];
        return (
            <Card bordered={false}>
                <Card>
                    <Form layout="inline">
                        <Row gutter={8}>
                            <Col span={3} >
                                <Search placeholder="标准名称" onSearch={(value) => {
                                    this.setState({
                                        Name: value
                                    });
                                    this.props.dispatch({
                                        type: 'standardlibrary/getlist',
                                        payload: {
                                            pageIndex: 1,
                                            pageSize: 10,
                                            Type: this.state.Type,
                                            Name: value,
                                        },
                                    });
                                }}style={{ width: 200 }} /></Col>
                            <Col span={1} ><Button type="primary"
                                onClick={() => {
                                    this.props.dispatch(routerRedux.push(`/monitor/sysmanage/StandardLibraryDetail/null`));
                                }}>添加</Button></Col>
                            <Col span={12} >
                                <Radio.Group defaultValue="0" buttonStyle="solid" onChange={(e) => {
                                    console.log(e.target.value);
                                    this.setState({
                                        Type: e.target.value
                                    });
                                    this.props.dispatch({
                                        type: 'standardlibrary/getlist',
                                        payload: {
                                            pageIndex: 1,
                                            pageSize: 10,
                                            Type: e.target.value,
                                            Name: this.state.Name,
                                        },
                                    });
                                }}>
                                    <Radio.Button value="0">全部</Radio.Button>
                                    <Radio.Button value="1">国标</Radio.Button>
                                    <Radio.Button value="2">地标</Radio.Button>
                                    <Radio.Button value="3">行标</Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Table
                    loading={this.props.effects['standardlibrary/getlist']}
                    columns={columns}
                    dataSource={this.props.requstresult === '1' ? this.props.list : null}
                    expandedRowRender={expandedRowRender}
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
            </Card>
        );
    }
}
