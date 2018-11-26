import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import Add from '../../components/Video/addVideoInfo';
import Update from '../../components/Video/updateVideoInfo';
import { Table, Card, Button, Modal, message } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
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
            DGIMN: 'sgjt001003',
            pointName: '脱硫入口'
        };
    }

    componentWillMount() {
        this.onChange();
    };
    onChange = () => {
        this.props.dispatch({
            type: 'videolist/fetchuserlist',
            payload: {
                DGIMN: 'sgjt001003',
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
    deleteVideoInfo=(e) => {
        if (this.state.selectedRowKeys === undefined) {
            message.error('请选择要删除的数据！');
        } else {
            confirm({
                title: '确定要删除吗?',
                okText: '是',
                okType: 'danger',
                cancelText: '否',
                onOk: () => this.delete(),
                onCancel() {
                    console.log('Cancel');
                },
            });
        }
    };
    delete=() => {
        this.props.dispatch({
            type: 'videolist/deleteVideoInfo',
            payload: {
                DGIMN: this.state.DGIMN,
                VedioCamera_ID: this.state.item.VedioCamera_ID,
                VedioDevice_ID: this.state.item.VedioDevice_ID,
                CameraMonitorID: this.state.item.CameraMonitorID,
            },
        });
    }
    render() {
        const columns = [
            { title: '设备名称', width: 150, dataIndex: 'VedioDevice_Name', key: 'VedioDevice_Name' },
            { title: '设备编号', width: 150, dataIndex: 'VedioDevice_No', key: 'VedioDevice_No' },
            { title: '设备位置', width: 150, dataIndex: 'VedioDevice_Position', key: 'VedioDevice_Position' },
            { title: 'IP', width: 150, dataIndex: 'IP', key: 'IP' },
            { title: '用户名', width: 150, dataIndex: 'User_Name', key: 'User_Name' },
            { title: '密码', width: 200, dataIndex: 'User_Pwd', key: 'User_Pwd' },
            { title: '端口', width: 150, dataIndex: 'Device_Port', key: 'Device_Port' },
            { title: '相机名称', width: 150, dataIndex: 'VedioCamera_Name', key: 'VedioCamera_Name' },
            { title: '通道号', width: 100, dataIndex: 'VedioCamera_No', key: 'VedioCamera_No' },
            { title: '相机位置', width: 250, dataIndex: 'VedioCamera_Position', key: 'VedioCamera_Position' },
            { title: '生产日期', width: 250, dataIndex: 'ProduceDate', key: 'ProduceDate' },
            { title: '相机编号', width: 150, dataIndex: 'VedioCamera_Version', key: 'VedioCamera_Version' },
            { title: '经度', width: 150, dataIndex: 'Longitude', key: 'Longitude' },
            { title: '纬度', width: 150, dataIndex: 'Latitude', key: 'Latitude' },
            // {
            //     title: 'Action',
            //     key: 'operation',
            //     fixed: 'right',
            //     width: 100,
            //     render: () => <a href="javascript:;">action</a>,
            // },
        ];

        const rowSelection = {
            selectedRowKeys: [this.state.selectedRowKeys]
        };
        return (
            <Card bordered={false}>
                <Button style={{ marginBottom: 10 }} type="primary" onClick={() => {
                    this.setState({
                        visible: true,
                        type: 'add',
                        title: '添加视频信息',
                        width: 1130
                    });
                }}> 增加 </Button>
                <Button style={{ marginLeft: 10, marginBottom: 10 }} type="primary" onClick={() => {
                    if (this.state.selectedRowKeys === undefined) {
                        message.warning('请选择一条信息');
                    } else {
                        this.setState({
                            visible: true,
                            type: 'update',
                            title: '编辑视频信息',
                            width: 1130
                        });
                    }
                }}> 编辑 </Button>
                <Button style={{ marginLeft: 10, marginBottom: 10 }} onClick={() => {
                    if (this.state.selectedRowKeys === undefined) {
                        message.warning('请选择一条信息');
                    } else {
                        this.deleteVideoInfo();
                    }
                }}> 删除 </Button>
                <Table
                    // type={import('antd').Radio}
                    columns={columns}
                    dataSource={this.props.requstresult === '1' ? this.props.list : null}
                    // pagination={{
                    //     showSizeChanger: true,
                    //     showQuickJumper: true,
                    //     'total': 20,
                    //     'pageSize': 10,
                    //     'current': 1
                    // }}
                    scroll={
                        {
                            x: 2450,
                            y: 'calc(100vh -  440px)'
                        }
                    }
                    rowSelection={rowSelection}
                    rowKey="VedioCamera_ID"
                    onRow={(record, index) => {
                        return {
                            onClick: (a, b, c) => {
                                console.log(record);
                                console.log(index);
                                this.setState({
                                    item: record,
                                    selectedRowKeys: record.VedioCamera_ID
                                });
                            }, // 点击行
                            onMouseEnter: () => {}, // 鼠标移入行
                        };
                    }}
                />
                <Modal
                    visible={this.state.visible}
                    title={this.state.title}
                    width={this.state.width}
                    onOk={() => {
                        if (this.state.type === 'add') {
                            this.AddData();
                            // let index = this.props.dispatch(routerRedux.push(`./videolist`));
                            // message.success('添加成功', 3).then(() => index);
                            message.success('添加成功');
                        } else {
                            this.updateData();
                            message.success('修改成功');
                        }
                    }}
                    onCancel={this.onCancel}>
                    {
                        this.state.type === 'add' ? <Add onCancels={this.onCancel} dgimn={this.state.DGIMN} name={this.state.pointName} onRef={this.onRef1} /> : <Update onCancels={this.onCancel} dgimn={this.state.DGIMN} item={this.state.item} onRef={this.onRef1} />
                    }
                </Modal>
            </Card>

        );
    }
}
