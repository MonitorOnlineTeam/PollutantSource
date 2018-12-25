import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import Add from '../../components/Video/addVideoInfo';
import Update from '../../components/Video/updateVideoInfo';
import InfoList from '../../components/Video/VideoInfoList';
import { Table, Card, Button, Modal, message, Divider, Icon, Row, Col, Menu, Dropdown,Form } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import moment from 'moment';
import MonitorContent from '../../components/MonitorContent/index';
const confirm = Modal.confirm;
@connect(({loading, videolist}) => ({
    ...loading,
    list: videolist.list,
    total: videolist.total,
    pageSize: videolist.pageSize,
    pageIndex: videolist.pageIndex,
    requstresult: videolist.requstresult,
}))
export default class VideoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
            visible: false,
            attentionvisible: false,
            type: 'add',
            title: '填写入库单',
            width: 400,
            expandForm: false,
            loading: true,
            DGIMN: this.props.match.params.pointcode,
            pointName: this.props.match.params.pointname,
            footer: <div>
                <Button key="back" onClick={this.handleCancel}>Return</Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>
                  Submit
                </Button>
            </div>

        };
    }

    componentWillMount() {
        this.onChange();
    }
    onChange = () => {
        this.props.dispatch({
            type: 'videolist/fetchuserlist',
            payload: {
                DGIMN: this.state.DGIMN,
            },
        });
     
    }
    onRef1 = (ref) => {
        this.child = ref;
    }
    onCancel=() => {
        this.setState({
            visible: false
        });
    }
    // 添加
    AddData=() => {
        this.child.handleSubmit();
    }
    // 修改
    updateData=() => {
        this.child.handleSubmitupdate();
    }
    deleteVideoInfo=(record) => {
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
    deleteVideoInfobyIndex=(record) => {
        this.props.dispatch({
            type: 'videolist/deleteVideoInfo',
            payload: {
                DGIMN: this.state.DGIMN,
                VedioCamera_ID: record.VedioCamera_ID,
                VedioDevice_ID: record.VedioDevice_ID,
                CameraMonitorID: record.CameraMonitorID,
            },
        });
    }
    info() {
        Modal.info({
            title: 'This is a notification message',
            content: (
                <div>
                    <p>some messages...some messages...</p>
                    <p>some messages...some messages...</p>
                </div>
            ),
            onOk() {},
        });
    }
    render() {
        console.log(this.props.match.params.pointcode === null ? null : this.props.match.params.pointcode);
        const columns = [
            { title: '设备名称', dataIndex: 'VedioDevice_Name', key: 'VedioDevice_Name' },
            { title: '相机名称', dataIndex: 'VedioCamera_Name', key: 'VedioCamera_Name' },
            // { title: '设备编号', width: 150, dataIndex: 'VedioDevice_No', key: 'VedioDevice_No' },
            // { title: '设备位置', width: 150, dataIndex: 'VedioDevice_Position', key: 'VedioDevice_Position' },
            { title: 'IP', dataIndex: 'IP', key: 'IP' },
            { title: '端口', dataIndex: 'Device_Port', key: 'Device_Port' },
            { title: '用户名', dataIndex: 'User_Name', key: 'User_Name' },
            { title: '密码', dataIndex: 'User_Pwd', key: 'User_Pwd' },
            { title: '通道号', dataIndex: 'VedioCamera_No', key: 'VedioCamera_No' },
            // { title: '相机位置', width: 250, dataIndex: 'VedioCamera_Position', key: 'VedioCamera_Position' },
            // { title: '生产日期', width: 250, dataIndex: 'ProduceDate', key: 'ProduceDate' },
            // { title: '相机编号', width: 150, dataIndex: 'VedioCamera_Version', key: 'VedioCamera_Version' },
            // { title: '经度', width: 150, dataIndex: 'Longitude', key: 'Longitude' },
            // { title: '纬度', width: 150, dataIndex: 'Latitude', key: 'Latitude' },
            // {
            //     title: 'Action',
            //     key: 'operation',
            //     fixed: 'right',
            //     width: 100,
            //     render: () => <a href="javascript:;">action</a>,
            // },
            {
                title: '操作',
                key: 'action',
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
                            console.log(record);
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
                    {Name:'首页',Url:'/'},
                    {Name:'系统管理',Url:''},
                    {Name:'排口管理',Url:'/sysmanage/pointinfo'},
                    {Name:'视频管理',Url:''}
                ]
            }>
            <div className={styles.cardTitle}>
                <Card bordered={false} title={this.props.match.params.pointname} style={{width:'100%'}}>
                <Form layout="inline" style={{marginBottom: 10}}>
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
                        dataSource={this.props.requstresult === '1' ? this.props.list : null}
                        pagination={false}
                        rowKey="VedioCamera_ID"
                        onRow={(record, index) => {
                            return {
                                onClick: (a, b, c) => {
                                    this.setState({
                                        item: record,
                                        selectedRowKeys: record.VedioCamera_ID
                                    });
                                }, // 点击行
                                onMouseEnter: () => {}, // 鼠标移入行
                            };
                        }}
                        loading={this.props.effects['videolist/fetchuserlist']}
                         className={styles.dataTable}
                         size="small"// small middle
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
                            this.state.type === 'add' ? <Add onCancels={this.onCancel} dgimn={this.state.DGIMN} name={this.state.pointName} onRef={this.onRef1} /> : this.state.type === 'update' ? <Update onCancels={this.onCancel} dgimn={this.state.DGIMN} item={this.state.data} onRef={this.onRef1} /> : <InfoList onCancels={this.onCancel} dgimn={this.state.DGIMN} item={this.state.data} onRef={this.onRef1} />
                        }

                    </Modal>

                </Card>
            </div>
           </MonitorContent>

        );
    }
}
