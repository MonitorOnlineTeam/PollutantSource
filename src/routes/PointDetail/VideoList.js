import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import Add from '../../components/Video/addVideoInfo';
import { Table, Card, Button, Modal } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
@connect()
export default class VideoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
            selectid: [],
            item: [],
            visible: false,
            attentionvisible: false,
            type: 'add',
            title: '填写入库单',
            width: 400,
            expandForm: false,
            loading: true,
        };
    }

    render() {
        const columns = [
            { title: '关联监测点', width: 150, dataIndex: 'pointname', key: 'name', fixed: 'left' },
            { title: '设备名称', width: 150, dataIndex: 'devicename', key: 'age' },
            { title: '设备型号', width: 150, dataIndex: 'xinghao', key: '1' },
            { title: '设备IP', width: 150, dataIndex: 'ip', key: '2' },
            { title: 'IP端口', width: 150, dataIndex: 'address', key: '3' },
            { title: '登录名', width: 150, dataIndex: 'name', key: '4' },
            { title: '登陆密码', width: 150, dataIndex: 'password', key: '5' },
            { title: '设备存放位置', width: 250, dataIndex: 'cun', key: '6' },
            { title: '摄像头名称', width: 150, dataIndex: 'position', key: '7' },
            { title: '摄像头编号', width: 150, dataIndex: 'video', key: '8' },
            { title: '型号', width: 150, dataIndex: 'xing', key: '9' },
            // {
            //     title: 'Action',
            //     key: 'operation',
            //     fixed: 'right',
            //     width: 100,
            //     render: () => <a href="javascript:;">action</a>,
            // },
        ];

        const data = [{
            key: '1',
            pointname: '废气排口1',
            devicename: '大唐集团',
            xinghao: 'Android',
            ip: '172.16.12.133',
            address: '8018',
            name: 'admin',
            password: '123456',
            cun: '江西省吉安市世纪大道110号',
            position: '废气排口1',
            video: '分片1',
            xing: 'A380',
        },
        {
            key: '2',
            pointname: '废气排口2',
            devicename: '大唐集团',
            xinghao: 'Android',
            ip: '172.16.12.133',
            address: '8018',
            name: 'admin',
            password: '123456',
            cun: '江西省吉安市世纪大道110号',
            position: '废气排口1',
            video: '分片1',
            xing: 'A380',
        },
        {
            key: '3',
            pointname: '废气排口3',
            devicename: '大唐集团',
            xinghao: 'Android',
            ip: '172.16.12.133',
            address: '8018',
            name: 'admin',
            password: '123456',
            cun: '江西省吉安市世纪大道110号',
            position: '废气排口1',
            video: '分片1',
            xing: 'A380',
        },
        {
            key: '4',
            pointname: '废气排口4',
            devicename: '大唐集团',
            xinghao: 'Android',
            ip: '172.16.12.133',
            address: '8018',
            name: 'admin',
            password: '123456',
            cun: '江西省吉安市世纪大道110号',
            position: '废气排口1',
            video: '分片1',
            xing: 'A380',
        },
        {
            key: '5',
            pointname: '废气排口5',
            devicename: '大唐集团',
            xinghao: 'Android',
            ip: '172.16.12.133',
            address: '8018',
            name: 'admin',
            password: '123456',
            cun: '江西省吉安市世纪大道110号',
            position: '废气排口1',
            video: '分片1',
            xing: 'A380',
        },
        {
            key: '6',
            pointname: '废气排口6',
            devicename: '大唐集团',
            xinghao: 'Android',
            ip: '172.16.12.133',
            address: '8018',
            name: 'admin',
            password: '123456',
            cun: '江西省吉安市世纪大道110号',
            position: '废气排口1',
            video: '分片1',
            xing: 'A380',
        },
        {
            key: '7',
            pointname: '废气排口7',
            devicename: '大唐集团',
            xinghao: 'Android',
            ip: '172.16.12.133',
            address: '8018',
            name: 'admin',
            password: '123456',
            cun: '江西省吉安市世纪大道110号',
            position: '废气排口1',
            video: '分片1',
            xing: 'A380',
        },
        {
            key: '8',
            pointname: '废气排口8',
            devicename: '大唐集团',
            xinghao: 'Android',
            ip: '172.16.12.133',
            address: '8018',
            name: 'admin',
            password: '123456',
            cun: '江西省吉安市世纪大道110号',
            position: '废气排口1',
            video: '分片1',
            xing: 'A380',
        },
        {
            key: '9',
            pointname: '废气排口9',
            devicename: '大唐集团',
            xinghao: 'Android',
            ip: '172.16.12.133',
            address: '8018',
            name: 'admin',
            password: '123456',
            cun: '江西省吉安市世纪大道110号',
            position: '废气排口1',
            video: '分片1',
            xing: 'A380',
        }, {
            key: '10',
            pointname: '废气排口10',
            devicename: '大唐集团',
            xinghao: 'Android',
            ip: '172.16.12.133',
            address: '8018',
            name: 'admin',
            password: '123456',
            cun: '江西省吉安市世纪大道110号',
            position: '废气排口1',
            video: '分片1',
            xing: 'A380',
        }];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                debugger;
                let keys = [];
                selectedRowKeys.map(t => {
                    if (Array.isArray(t)) {
                        t.map(a => {
                            if (a !== '') { keys.push(a); }
                        });
                    } else {
                        if (t !== '') { keys.push(t); }
                    }
                });
                this.setState({ selectid: keys, item: selectedRows });
                console.log(this.state.selectid);
                console.log(this.state.item);
            },
            selectedRowKeys: this.state.selectid
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
                    this.setState({
                        visible: true,
                        type: 'info',
                        title: '查看',
                        width: 1130
                    });
                }}> 编辑 </Button>
                <Button style={{ marginLeft: 10, marginBottom: 10 }} onClick={() => {

                }}> 删除 </Button>
                <Table
                    // type={import('antd').Radio}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        'total': 20,
                        'pageSize': 10,
                        'current': 1
                    }}
                    scroll={
                        {
                            x: 1950,
                            y: 'calc(100vh -  110px)'
                        }
                    }
                    rowSelection={rowSelection}
                    // type="Radio"
                // onRow={(record, index) => {
                //     return {
                //         onClick: (a, b, c) => {
                //             debugger;
                //             this.setState({selectid: record.key});
                //             this.setState({item: record});
                //             console.log(this.state.item);
                //             console.log(this.state.selectid);
                //         }, // 点击行
                //         onMouseEnter: () => {}, // 鼠标移入行
                //     };
                // }}
                />
                <Modal
                    visible={this.state.visible}
                    title={this.state.title}
                    width={this.state.width}
                    onOk={() => {
                        this.setState({
                            visible: false
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        });
                    }}>
                    {
                        this.state.type === 'add' ? <Add item={this.state.item} /> : <Add />
                    }
                </Modal>
            </Card>

        );
    }
}
