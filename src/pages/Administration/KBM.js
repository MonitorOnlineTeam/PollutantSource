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
    Divider,
    Menu,
    Icon,
    Radio,
    Popconfirm,
    message
} from 'antd';
import {
    routerRedux
} from 'dva/router';
import {
    connect
} from 'dva';
import MonitorContent from '../../components/MonitorContent/index';
import KBMModal from '../../components/KBM/KBMModal';
import styles from './KBM.less';
const RadioGroup = Radio.Group;
const Search = Input.Search;
const confirm = Modal.confirm;
import { imgaddress } from '../../config';
@connect(({
    loading,
    administration
}) => ({
    loading: loading.effects['administration/GetKBMList'],
    list: administration.KBMList,
    total: administration.total,
    pageIndex: administration.pageIndex,
    pageSize: administration.pageSize,
}))
export default class KBM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: null,
            footer: <div>
                <Button key="back" onClick={this.handleCancel}>Return</Button>,
                      <Button key="submit" type="primary" onClick={this.handleOk}>
                    Submit
                      </Button>
            </div>
        };
    }
    //初始化
    componentWillMount() {
        this.reloaddata(this.state.Name, this.props.pageIndex, this.props.pageSize);
    }
    onRef1 = (ref) => {
        this.child = ref;
    }
    //页码变化
    onChange = (pageIndex, pageSize) => {

        this.reloaddata(this.state.Name, pageIndex, pageSize);
    }
    //删除
    deletepoint = (row) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'administration/DeleteSparePartsRecord',
            payload: {
                id: row.ID,
            }
        })
    }
    //按照名字搜索
    serachName = (value) => {
        this.setState({ Name: value });
        this.reloaddata(value, this.props.pageIndex, this.props.pageSize);
    }

    //关闭modal
    onCancel = () => {
        this.setState({
            visible: false
        });
    }
    // 添加数据
    AddData = () => {
        this.child.handleSubmit();
        this.reloaddata(this.state.Name, this.props.pageIndex, this.props.pageSize);
    }
    // 修改
    updateData = (record) => {
        this.child.handleSubmit(record);
        this.reloaddata(this.state.Name, this.props.pageIndex, this.props.pageSize);
    }
    //删除
    deleteKBM = (record) => {
        confirm({
            title: '确定要删除吗?',
            okText: '是',
            okType: 'primary',
            cancelText: '否',
            onOk: () => this.delete(record),
            onCancel() {
                console.log('取消');
            },
        });
    };
    delete = (record) => {
        this.props.dispatch({
            type: 'administration/DeleteKBM',
            payload: {
                ID: record.ID,
                callback: (requstresult, reason) => {
                    if (requstresult === '1') {
                        message.success(reason);

                    } else {
                        message.error(reason);
                    }
                }
            },
        });
        this.reloaddata(this.state.Name, this.props.pageIndex, this.props.pageSize);
    }
    //开启modal
    showModal = (row) => {
        let title = "添加知识库信息";
        if (!row) {
            this.setState({
                footer: <div>
                    <Button key="back" onClick={this.onCancel}>取消</Button>
                    <Button key="submit" type="primary" onClick={this.AddData}>
                        确定
                    </Button>
                </div>
            });
        }
        else {
            title = "修改知识库信息";
            this.setState({
                footer: <div>
                    <Button key="back" onClick={this.onCancel}>取消</Button>
                    <Button key="submit" type="primary" onClick={this.updateData}>
                        确定
                </Button>
                </div>
            });
        }
        this.setState({
            visible: true,
            title,
            row,
        });
    }
    //下载文件
    showFile = (record) => {
        if (record.FileName !== "") {
            const fileName = record.FileName.split('.');
            var name = fileName[0] + '.';
            if (fileName.length > 2) {
                name = "";
                for (let index = 0; index < fileName.length; index++) {
                    const element = array[index];
                    if (index < fileName.length - 1) {
                        name += element + '.';
                    }

                }
            }
            // if (fileName[fileName.length - 1] === 'png' || fileName[fileName.length - 1] === 'gif'|| fileName[fileName.length - 1] === 'bmp'|| fileName[fileName.length - 1] === 'jpg') {
            //     window.open('../upload/' + name + fileName[fileName.length - 1])
            // }
            // else {
            window.open(imgaddress + name + 'pdf')
            // }
        }
        else {
            message.error('未上传文件')
        }
    }
    //重新加载数据
    reloaddata = (Name, pageIndex, pageSize) => {
        this.updateState({
            pageIndex: pageIndex,
            pageSize: pageSize,
            KBMParameters: {
                ...this.props.KBMParameters,
                ...{
                    Name: Name,
                }
            }
        });
        this.props.dispatch({
            type: 'administration/GetKBMList',
            payload: {
            }
        })
    }
    /**
* 更新model中的state
*/
    updateState = (payload) => {
        this.props.dispatch({
            type: 'administration/updateState',
            payload: payload,
        });
    }
    render() {
        const menu = (id, name) => (
            <Menu onClick={(e) => {
                this.onMenu.bind()(e.key, id, name);
            }}>
                <Menu.Item key="1"><Icon type="bars" />监测标准</Menu.Item>
                <Menu.Item key="2"><Icon type="tool" />停产管理</Menu.Item>
                <Menu.Item key="3"><Icon type="youtube" />视频管理</Menu.Item>
                <Menu.Item key="4"><Icon type="home" />进入排口</Menu.Item>
            </Menu>
        );
        const { pageSize, pageIndex, total } = this.props;
        const { parttype } = this.state;
        const columns = [{
            title: '名称',
            dataIndex: 'Name',
            key: 'Name',
            width: '16%',
        },
        {
            title: '知识库类型',
            dataIndex: 'RepositoryType',
            key: 'RepositoryType',
            width: '16%',
        },
        {
            title: '文件类型',
            dataIndex: 'DirectoryType',
            key: 'DirectoryType',
            width: '16%',
        },
        {
            title: '文件',
            dataIndex: 'Directory',
            key: 'Directory',
            width: '14%',
            render: (text, record) => {
                return <Button type="primary" shape="circle" icon="download" size={'small'} id={record.key} onClick={() => {
                    this.showFile(record);
                }} />;
            }
        },
        {
            title: '创建(修改)时间',
            dataIndex: 'CreateDate',
            key: 'CreateDate',
            width: '18%',
            sorter: (a, b) => Date.parse(a.CreateDate) - Date.parse(b.CreateDate),
        },
        {
            title: '操作',
            width: '20%',
            render: (text, record) => (<Fragment >
                <a onClick={
                    () => this.showModal(record)
                } > 编辑 </a>
                <Divider type="vertical" />
                <a onClick={() => {
                    this.deleteKBM(record);
                }}>删除</a>
            </Fragment >
            ),
        },
        ];
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    { Name: '首页', Url: '/' },
                    { Name: '系统管理', Url: '' },
                    { Name: '知识库管理', Url: '' }
                ]
            }>
                <div className={styles.cardTitle}>
                    <Card bordered={false}>
                        <Form layout="inline" style={{ marginBottom: 10 }}>
                            <Row gutter={8} >
                                <Col span={24} >
                                    <Search placeholder="名称"
                                        onSearch={this.serachName}
                                        style={{ width: 200, marginRight: 20 }} />
                                    <Button type="primary" style={{ marginLeft: 10 }}
                                        onClick={() => this.showModal(null)} > 添加 </Button>
                                </Col>
                            </Row>
                        </Form>
                        <Table loading={this.props.loading}
                            columns={columns}
                            className={styles.tableCss}
                            rowKey="ID"
                            dataSource={
                                this.props.list
                            }
                            size="middle"
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
                            pagination={
                                {
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    'total': total,
                                    'pageSize': pageSize,
                                    'current': pageIndex,
                                    onChange: this.onChange,
                                    onShowSizeChange: this.onChange,
                                    pageSizeOptions: ['20', '30', '40', '50']
                                }} />
                    </Card>
                    <Modal
                        footer={this.state.footer}
                        destroyOnClose="true"
                        visible={this.state.visible}
                        title={this.state.title}
                        onCancel={this.onCancel}
                        width='50%'>
                        {
                            <KBMModal row={this.state.row} onRef={this.onRef1} onCancels={this.onCancel} />
                        }
                    </Modal>
                </div>
            </MonitorContent>
        );
    }
}
