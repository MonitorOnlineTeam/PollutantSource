import React, { Component } from 'react';
import { Button, Table, Spin, Modal, Divider, Popconfirm } from 'antd';
import { connect } from 'dva';

import Addepinfo from './addepinfo.js';
@connect(({baseinfo, loading}) => ({
    isloading: loading.effects['baseinfo/queryeeplist'],
    pdlist: baseinfo.pdlist,
}))
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            defaultvalue: null,
            defaultmodelname: '添加排污许可证'

        };
    }
    buttonback = () => this.props.history.goBack(-1);
    showModal = () => {
        this.setState({
            visible: true,
            defaultvalue: null,
            defaultmodelname: '添加排污许可证信息'
        });
    };
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };
    editbutton = (record) => {
        this.setState({
            defaultvalue: record,
            visible: true,
            defaultmodelname: '修改排污许可证信息'
        });
    };
    deletebutton = (record) => {
        this.props.dispatch({
            type: 'baseinfo/querydelep',
            payload: {
                code: record.code,
            },
        });
    };

    render() {
        const { pdlist, isloading } = this.props;
        const columns = [{
            title: '名称',
            dataIndex: 'name',
        }, {
            title: '编号',
            dataIndex: 'num',
        }, {
            title: '状态',
            dataIndex: 'status',
        },
        {
            title: '描述',
            dataIndex: 'describe',
        }, {
            title: '有效时间',
            dataIndex: 'effectivetime',
        },
        // {
        //     title: '附件',
        //     dataIndex: 'enclosure',
        // },
        {
            title: '操作',
            render: (text, record) => (
                <span>
                    <a onClick={() => {
                        this.editbutton(record);
                    }}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm title="确定要删除吗？" okText="是" cancelText="否" onConfirm={() => {
                        this.deletebutton(record);
                    }}>
                        <a href="javascript:;" >删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        return (

            <div style={{ background: '#fff', padding: 24, height: 'calc(100vh - 70px)' }}>
                { isloading ? <Spin style={{width: '100%',
                    height: 'calc(100vh - 260px)',
                    marginTop: 260 }} size="large" />
                    : (<div><div>
                        <Button style={{marginLeft: 10}} onClick={this.showModal} >添加</Button>
                        <Button style={{float: 'Right'}} onClick={this.buttonback} >返回</Button>
                    </div><div style={{marginTop: 20}}><Table dataSource={pdlist} columns={columns} />
                    </div>
                    </div>
                    )
                }
                <Modal
                    title={this.state.defaultmodelname}
                    visible={this.state.visible}
                    onCancel={this.hideModal}
                    footer={null}
                    width={500}
                >
                    <Addepinfo hideModal={this.hideModal} defaultvalue={this.state.defaultvalue} />
                </Modal>
            </div>
        );
    }
}

export default index;
