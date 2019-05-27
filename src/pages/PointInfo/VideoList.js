import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import Add from '../../components/Video/addVideoInfo';
import Update from '../../components/Video/updateVideoInfo';
import InfoList from '../../components/Video/VideoInfoList';
import { Table, Card, Button, Modal, message, Divider, Icon, Row, Col, Menu, Dropdown, Form } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import moment from 'moment';
import MonitorContent from '../../components/MonitorContent/index';
const confirm = Modal.confirm;
@connect(({ loading, videolist }) => ({
    ...loading,
    videoListParameters: videolist.videoListParameters,
    requstresult: videolist.requstresult,
}))
export default class VideoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 'add',
            title: '填写入库单',
            width: 400,
            data:null,
            pointName: this.props.match.params.pointname,
            footer: <div>
                <Button key="back" onClick={this.handleCancel}>Return</Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>
                    Submit
                </Button>
            </div>
        };
    }

    componentDidMount() {
        this.onChange();
    }
    onChange = () => {
        this.updateState({
            videoListParameters: {
                ...this.props.videoListParameters,
                ...{
                    DGIMN: this.props.match.params.pointcode,
                    pointName: this.props.match.params.pointname,
                }
            }
        });
        this.props.dispatch({
            type: 'videolist/fetchuserlist',
            payload: {
            },
        });
    }
    /**
   * 更新model中的state
  */
    updateState = (payload) => {
        this.props.dispatch({
            type: 'analysisdata/updateState',
            payload: payload,
        });
    }
    onRef1 = (ref) => {
        this.child = ref;
    }
    onCancel = () => {
        this.setState({ visible: false })
        this.onChange();
    }
    // 添加
    AddData = () => {
        this.child.handleSubmit();
    }
    // 修改
    updateData = () => {
        this.child.handleSubmitupdate();
    }
    deleteVideoInfo = (record) => {
        confirm({
            title: '确定要删除吗?',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => this.deleteVideoInfobyIndex(record),
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    deleteVideoInfobyIndex = (record) => {
        const { videoListParameters } = this.props;
        this.props.dispatch({
            type: 'videolist/deleteVideoInfo',
            payload: {
                DGIMN: videoListParameters.DGIMN,
                VedioCamera_ID: record.VedioCamera_ID,
                VedioDevice_ID: record.VedioDevice_ID,
                CameraMonitorID: record.CameraMonitorID,
                callback: (result) => {
                    if (result === '1') {
                        this.onChange();
                        message.success('删除成功！')
                    }
                    else {
                        message.error('删除失败！')
                    }
                }
            },
        });
    }
    render() {
        const { videoListParameters } = this.props;
        const columns = [
            { title: '设备名称', dataIndex: 'VedioDevice_Name', key: 'VedioDevice_Name', width: '10%' },
            { title: '相机名称', dataIndex: 'VedioCamera_Name', key: 'VedioCamera_Name', width: '10%' },
            { title: 'IP', dataIndex: 'IP', key: 'IP', width: '14%' },
            { title: '端口', dataIndex: 'Device_Port', key: 'Device_Port', width: '14%' },
            { title: '用户名', dataIndex: 'User_Name', key: 'User_Name', width: '14%' },
            { title: '密码', dataIndex: 'User_Pwd', key: 'User_Pwd', width: '14%' },
            { title: '通道号', dataIndex: 'VedioCamera_No', key: 'VedioCamera_No', width: '10%' },
            {
                title: '操作',
                key: 'action',
                width: '14%',
                render: (text, record, index) => (
                    <span>
                        <a onClick={() => {
                            this.setState({
                                visible: true,
                                type: 'details',
                                title: '视频详情信息',
                                width: 1130,
                                data: record,
                                footer: null
                            });
                        }}>详情</a>
                        <Divider type="vertical" />
                        <a onClick={() => {
                               this.setState({
                                visible: true,
                                type: 'update',
                                title: '编辑视频信息',
                                width: 1130,
                                data: record,
                                footer: <div>
                                    <Button key="back" onClick={this.onCancel}>取消</Button>
                                    <Button key="submit" type="primary" onClick={this.updateData}>
                                        确定
                                    </Button>
                                </div>
                            });
                        }}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={() => {
                            this.deleteVideoInfo(record);
                        }}>删除</a>
                    </span>
                ),
            }

        ];
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    // { Name: '首页', Url: '' },
                    // { Name: '系统管理', Url: '' },
                    {Name:'企业管理',Url:'/EnterpriseManager'},
                    {Name:'排口管理',Url:`/sysmanage/pointinfo/${this.props.match.params.EntCode}`},
                    { Name: '视频管理', Url: '' }
                ]
            }>
                <div className={styles.cardTitle}>
                    <Card bordered={false} title={videoListParameters.pointname} style={{ width: '100%' }}>
                        <Form layout="inline" style={{ marginBottom: 10 }}>
                            <Row gutter={8} >
                                <Col span={24} >
                                    <Button type="primary"
                                        onClick={
                                            () => {
                                                this.setState({
                                                    visible: true,
                                                    type: 'add',
                                                    title: '添加视频信息',
                                                    width: 1130,
                                                    footer: <div>
                                                        <Button key="back" onClick={this.onCancel}>取消</Button>
                                                        <Button key="submit" type="primary" onClick={this.AddData}>
                                                            确定
                                    </Button>
                                                    </div>
                                                });
                                            }
                                        } > 添加 </Button>
                                </Col >
                            </Row>
                        </Form>
                        <Table
                            columns={columns}
                            pagination={false}
                            dataSource={videoListParameters.list}
                            rowKey="VedioCamera_ID"
                            loading={this.props.effects['videolist/fetchuserlist']}
                            className={styles.dataTable}
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
                        />
                     <Modal
                            footer={this.state.footer}
                            destroyOnClose="true"
                            visible={this.state.visible}
                            title={this.state.title}
                            width={this.state.width}
                            onCancel={this.onCancel}>
                            {
                                this.state.type === 'add' ? <Add onCancels={this.onCancel} dgimn={videoListParameters.DGIMN} name={videoListParameters.pointName} onRef={this.onRef1} /> : this.state.type === 'update' ? <Update onCancels={this.onCancel} dgimn={videoListParameters.DGIMN} item={this.state.data} onRef={this.onRef1} /> : <InfoList onCancels={this.onCancel} dgimn={videoListParameters.DGIMN} item={this.state.data} onRef={this.onRef1} />
                            }

                        </Modal>

                    </Card>
                </div>
            </MonitorContent>

        );
    }
}
