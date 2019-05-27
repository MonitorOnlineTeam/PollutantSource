import React, {
    Component,
    Fragment
} from 'react';
import {
    Button,
    Card,
    Row,
    Col,
    Table,
    Form,
    Modal,
    Divider,
    message
} from 'antd';
import {
    routerRedux
} from 'dva/router';
import {
    connect
} from 'dva';
import MonitorContent from '../../components/MonitorContent/index';
import Details from '../../components/FeedBack/Details';
import styles from './FeedBack.less';
const confirm = Modal.confirm;
@connect(({
    loading,
    administration
}) => ({
    loading: loading.effects['administration/GetFeedbackList'],
    FeedbackParameters: administration.FeedbackParameters
}))
export default class FeedBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    //初始化
    componentWillMount() {
        this.reloaddata();
    }
    onRef1 = (ref) => {
        this.child = ref;
    }
    //页码变化
    onChange = (pageIndex, pageSize) => {
        this.updateState({
            FeedbackParameters: {
                ...this.props.FeedbackParameters,
                ...{
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                }
            }
        });
        this.reloaddata();
    }

    //删除
    deleteFeedBack = (record) => {
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
            type: 'administration/DeleteFeedBackByID',
            payload: {
                ID: record.ID,
                callback: (requstresult) => {
                    if (requstresult === true) {
                        message.success("删除成功！");

                    } else {
                        message.error("删除失败！");
                    }
                }
            },
        });
        this.reloaddata();
    }
    //关闭modal
    onCancel = () => {
        this.setState({
            visible: false
        });
    }
    //详情
    showDetails = (row) => {
        this.updateState({
            FeedbackParameters: {
                ...this.props.FeedbackParameters,
                ...{
                    DataOne: row
                }
            }
        });
        this.setState({
            visible: true,
            title: "详情",
            row,
        });
    }
    //重新加载数据
    reloaddata = () => {
        this.props.dispatch({
            type: 'administration/GetFeedbackList',
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
        const { FeedbackParameters } = this.props;
        const columns = [{
            title: '姓名',
            dataIndex: 'Name',
            key: 'Name',
            width: '15%',
        },
        {
            title: '电话',
            dataIndex: 'Phone',
            key: 'Phone',
            width: '15%',
        },
        {
            title: '邮箱',
            dataIndex: 'EmailAddress',
            key: 'EmailAddress',
            width: '15%',
        },
        {
            title: '反馈详情',
            dataIndex: 'Details',
            key: 'Details',
            width: '15%',
            render: (text, record) => (
                text.length < 10 ? text : text.substring(0, 10) + "..."
            ),
        },
        {
            title: '创建时间',
            dataIndex: 'CreateTime',
            key: 'CreateTime',
            width: '15%',
            sorter: (a, b) => Date.parse(a.CreateTime) - Date.parse(b.CreateTime),
        },
        // {
        //     title: '是否处理',
        //     dataIndex: 'WhetherDeal',
        //     key: 'WhetherDeal',
        //     width: '10%',
        //     render: (text, record) => (
        //         text === true ? '已处理' : '未处理'
        //     )
        // },
        {
            title: '操作',
            width: '15%',
            render: (text, record) => (<Fragment >
                <a onClick={
                    () => this.showDetails(record)
                } > 详情 </a>
                <Divider type="vertical" />
                <a onClick={() => {
                    this.deleteFeedBack(record);
                }}>删除</a>
            </Fragment >
            ),
        },
        ];
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
<<<<<<< HEAD
                    // { Name: '首页', Url: '' },
                    // { Name: '系统管理', Url: '' },
=======
                    { Name: '系统管理', Url: '' },
>>>>>>> b63cf6e6c72291109fd45a31060210a6e86d6682
                    { Name: '意见反馈', Url: '' }
                ]
            }>
                <div className={styles.cardTitle}>
                    <Card bordered={false}>
                        {/* <Form layout="inline" style={{ marginBottom: 10 }}>
                            <Row gutter={8} >
                                <Col span={24} >
                                    <Search placeholder="名称"
                                        onSearch={this.serachName}
                                        style={{ width: 200, marginRight: 20 }} />
                                    <Button type="primary" style={{ marginLeft: 10 }}
                                        onClick={() => this.showModal(null)} > 添加 </Button>
                                </Col>
                            </Row>
                        </Form> */}
                        <Table
                            loading={this.props.loading}
                            columns={columns}
                            className={styles.tableCss}
                            rowKey="ID"
                            dataSource={
                                FeedbackParameters.data
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
                                    'total': FeedbackParameters.total,
                                    'pageSize': FeedbackParameters.pageSize,
                                    'current': FeedbackParameters.pageIndex,
                                    onChange: this.onChange,
                                    onShowSizeChange: this.onChange,
                                    pageSizeOptions: ['10', '20', '30', '40']
                                }} />
                    </Card>
                    <Modal
                        footer={null}
                        destroyOnClose="true"
                        visible={this.state.visible}
                        title={this.state.title}
                        onCancel={this.onCancel}
                        width='50%'>
                        {
                            <Details row={this.state.row} />
                        }
                    </Modal>
                </div>
            </MonitorContent>
        );
    }
}
