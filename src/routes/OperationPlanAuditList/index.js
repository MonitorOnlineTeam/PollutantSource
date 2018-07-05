import React, { Component } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Table, Card, Modal, Button, DatePicker, Input, message} from 'antd';
import auditList from '../../mockdata/OperationStock/PlanAuditList.json';
import styles from './index.less';

/*
页面：运维计划待审核列表
描述：待审核的运维计划
add by cg 18.6.8
modify by myt
*/

const {TextArea} = Input;
const {RangePicker} = DatePicker;

export default class OperationPlanAuditList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 'pass',
            title: '审批意见',
            width: 400,
            selectid: [],
        };
    }

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                let keys = [];
                selectedRowKeys.map(t => {
                    if (Array.isArray(t)) {
                        t.map(a => {
                            if (a !== '') { keys.push(a); }
                        });
                    } else {
                        debugger;
                        if (t !== '') { keys.push(t); }
                    }
                });
                this.setState({selectid: keys});
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
            selectedRowKeys: this.state.selectid
        };

        const columns = [{
            title: '运维单位',
            dataIndex: 'Company',
            width: 250,
        }, {
            title: '计划周期',
            dataIndex: 'WeekInfo',
            width: 150,
        }, {
            title: '状态',
            dataIndex: 'State',
            width: 150,
            render: (text, record) => {
                let result = '未指定';
                switch (text) {
                    case '1':
                        result = '未审核';
                        break;
                    case '2':
                        result = '通过审核';
                        break;
                    case '3':
                        result = '未通过';
                        break;
                }
                return result;
            }
        }, {
            title: '制定时间',
            dataIndex: 'MadeTime',
            width: 150
        }, {
            title: '已做计划数',
            dataIndex: 'Made',
            width: 80
        }, {
            title: '未做计划数量',
            dataIndex: 'UnMade',
            width: 80
        }, {
            title: '总排口数',
            dataIndex: 'Total',
            width: 80
        }, {
            title: '完成率(%)',
            dataIndex: 'MadeRate',
            width: 80
        }, {
            title: '操作',
            key: 'action',
            width: 80,
            render: (text, record) => {
                return (
                    <span>
                        <a href="../plan/OperationPlanUp">查看详细</a>
                    </span>
                );
            }
        }];

        return (
            <PageHeaderLayout title="待审核列表" >
                <Card bordered={false} >
                    <div>
                        <div style={{marginBottom: 10}}>
                            制定时间：<RangePicker />
                        </div>
                        <Button type="primary" className={styles.pass} onClick={() => {
                            this.setState((state) => {
                                if (state.selectid.length === 0) {
                                    message.warning('请先选择行再进行操作');
                                }
                            });
                        }}>通过</Button>
                        <Button onClick={() => {
                            this.setState((state) => {
                                if (state.selectid.length === 0) {
                                    message.warning('请先选择行再进行操作');
                                } else {
                                    return {
                                        visible: (state.selectid.length > 0),
                                        type: 'fail',
                                        title: '不通过审批意见',
                                        width: 600
                                    };
                                }
                            });
                        }}>不通过</Button>
                        <Table
                            columns={columns}
                            dataSource={auditList}
                            pagination={{
                                showSizeChanger: true,
                                showQuickJumper: true,
                                'total': 45,
                                'pageSize': 20,
                                'current': 1
                            }}
                            onRow={(record, index) => {
                                return {
                                    onClick: (a, b, c) => {
                                        let {selectid} = this.state;
                                        let index = selectid.findIndex(t => t === record.key);
                                        if (index !== -1) {
                                            selectid.splice(index, 1);
                                        } else {
                                            selectid.push(record.key);
                                        }
                                        this.setState({selectid: selectid});
                                    }, // 点击行
                                    onMouseEnter: () => {}, // 鼠标移入行
                                };
                            }}
                            rowSelection={rowSelection}
                            scroll={
                                {
                                    y: 'calc(100vh - 445px)'
                                }
                            }
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
                                <TextArea placeholder="请填写审批意见" autosize={{ minRows: 6, maxRows: 20 }} />
                            }
                        </Modal>
                    </div></Card></PageHeaderLayout>
        );
    }
}
