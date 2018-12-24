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
    Icon,
    Radio,
    Divider, Badge
} from 'antd';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import FilesList from '../StandardLibrary/FilesList';
import styles from './index.less';
import MonitorContent from '../../components/MonitorContent/index';
const Search = Input.Search;
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
            Fvisible: false,
            title: '',
            width: '500',
            StandardLibraryID: null,
        };
    }
    componentWillMount() {
        this.onChange();
    }

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
    showFile=(record) => {
        if (record.IsFiles === 1) {
            this.setState({
                StandardLibraryID: record.id,
                Fvisible: true,
                title: '文件列表',
                width: 800
            });
        } else {
            message.error('没有可以下载的文件');
        }
    }
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
            align: 'left',
            render: (text, record) => {
                return text;
            }
        },
        {
            title: '标准类型',
            dataIndex: 'Type',
            key: 'Type',
            width: '10%',
            align: 'center',
            render: (text, record) => {
                if (text === 1) {
                    return <span > <Badge status="error" text="国标" /></span >;
                }
                if (text === 2) {
                    return <span > <Badge status="success" text="地表" /> </span >;
                }
                return <span > <Badge status="warning" text="行标" /></span >;
            }
        },
        {
            title: '文件',
            dataIndex: 'IsFiles',
            key: 'IsFiles',
            width: '10%',
            align: 'center',
            render: (text, record) => {
                return <Button type="primary" shape="circle" icon="download" size={'small'} id={record.key} onClick={() => {
                    this.showFile(record);
                }} />;
            }
        },
        { title: '状态',
            dataIndex: 'IsUsed',
            key: 'IsUsed',
            width: '10%',
            align: 'center',
            sorter: (a, b) => a.IsUsed - b.IsUsed,
            render: (text, record) => {
                if (text === 0) {
                    return <span > <Tag color="red" > <a onClick={
                        () => this.IsEnabled(1, record)
                    } > 禁用 </a></Tag > </span>;
                }
                return <span > <Tag color="blue" > <a onClick={
                    () => this.IsEnabled(0, record)
                } > 启用 </a></Tag > </span>;
            }
        },
        {
            title: '操作',
            width: '20%',
            align: 'center',
            render: (text, record) => (<Fragment >
                <a onClick={
                    () => this.props.dispatch(routerRedux.push(`/sysmanage/UserDetail/${record.key}`))
                } > 应用到排口 </a> <Divider type="vertical" />
                <a onClick={
                    () => this.props.dispatch(routerRedux.push(`/sysmanage/StandardLibraryDetail/${record.key}`))
                } > 编辑 </a> <Divider type="vertical" />
                <Popconfirm placement="left" title="确定要删除此标准下所有数据吗？" onConfirm={() => this.confirm(record.key)} okText="是" cancelText="否">
                    <a href="#" > 删除 </a>
                </Popconfirm>
            </Fragment >
            ),
        },
        ];
        return (
            <MonitorContent >
                <div className={
                    styles.cardTitle
                } >
                    <Card bordered={false}>
                        <Form layout="inline" style={{marginBottom: 10}}>
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
                                        this.props.dispatch(routerRedux.push(`/sysmanage/StandardLibraryDetail/null`));
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
                                        <Radio.Button value="0"><Badge status="default" text="全部" /></Radio.Button>
                                        <Radio.Button value="1"><Badge status="error" text="国标" /></Radio.Button>
                                        <Radio.Button value="2"><Badge status="success" text="地表" /></Radio.Button>
                                        <Radio.Button value="3"><Badge status="warning" text="行标" /></Radio.Button>
                                    </Radio.Group>
                                </Col>
                            </Row>
                        </Form>
                        <Table
                            loading={this.props.effects['standardlibrary/getlist']}
                            columns={columns}
                            className={styles.dataTable}
                            dataSource={this.props.requstresult === '1' ? this.props.list : null}
                            //expandedRowRender={expandedRowRender}
                            size="small"
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
                            visible={this.state.Fvisible}
                            title={this.state.title}
                            width={this.state.width}
                            destroyOnClose={true}// 清除上次数据
                            footer={false}
                            onCancel={
                                () => {
                                    this.setState({
                                        Fvisible: false
                                    });
                                }
                            } >
                            {
                                <FilesList pid={this.state.StandardLibraryID} />
                            }
                        </Modal>
                    </Card>
                </div>
            </MonitorContent>
        );
    }
}
