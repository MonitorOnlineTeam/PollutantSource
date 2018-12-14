import React, { Component } from 'react';
import { Table, Button, Icon, Layout } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
@connect(({ task, loading }) => ({
    PatrolRecordListPC: task.PatrolRecordListPC
}))

/*
页面：稀释采样法CEMS日常巡检记录表
*/

class DilutionSampling extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         values: null,
    //     };
    // }
    componentWillMount() {
        this.onChange();
    }
    onChange = () => {
        this.props.dispatch({
            type: 'task/GetPatrolRecordListPC',
            payload: {
                TaskIds: this.props.match.params.CyfPatrolTaskIds,
                TypeIDs: this.props.match.params.CyfPatrolTypeIDs
            },
        });
    }

    render() {
        const columns = [{
            title: '项目',
            dataIndex: 'parentName',
            width: '20%',
            align: 'center',
            render: (value, row, index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.count !== 0) {
                    if (row.parentName === '巡检人员签字') {
                        obj.props.colSpan = 2;
                    } else {
                        obj.props.rowSpan = row.count;
                    }
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        }, {
            title: '内容',
            dataIndex: 'childName',
            width: '40%',
            align: 'center',
            render: (value, row, index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.parentName === '巡检人员签字') {
                    obj.props.colSpan = 0;
                } else if (row.parentName === '维护情况') {
                    obj.props.colSpan = 3;
                }
                return obj;
            },
        }, {
            title: '维护情况',
            dataIndex: 'MintenanceDescription',
            width: '20%',
            align: 'center',
            render: (value, row, index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.parentName === '巡检人员签字') {
                    return {
                        children: <img src={value === null ? null : `data:image/jpeg;base64,${value}`} />,
                        props: {
                            colSpan: 2,
                        },
                    };
                } else if (row.parentName === '维护情况') {
                    obj.props.colSpan = 0;
                }
                return obj;
            },
        }, {
            title: '备注',
            dataIndex: 'MaintenanceSituation',
            width: '20%',
            align: 'center',
            render: (value, row, index) => {
                const obj = {
                    children: value,
                    props: {},
                };
                if (row.count !== 0) {
                    if (row.parentName === '巡检人员签字') {
                        obj.props.colSpan = 0;
                    } else if (row.parentName === '维护情况') {
                        obj.props.colSpan = 0;
                    } else {
                        obj.props.rowSpan = row.count;
                    }
                } else {
                    obj.props.rowSpan = 0;
                }
                return obj;
            },
        }];
        const columnTitle = [{
            title: '项目',
            dataIndex: 'producter',
            width: '20%',
            align: 'center',
        }, {
            title: '内容',
            dataIndex: 'format',
            width: '40%',
            align: 'center',
        }];
        const dataTitle = [{
            key: '0',
            producter: this.props.PatrolRecordListPC.length === 0 ? null : this.props.PatrolRecordListPC[0].Record[0].Content.GasCemsEquipmentManufacturer,
            format: this.props.PatrolRecordListPC.length === 0 ? null : this.props.PatrolRecordListPC[0].Record[0].Content.GasCemsCode,
        },
        {
            key: '1',
            producter: this.props.PatrolRecordListPC.length === 0 ? null : this.props.PatrolRecordListPC[0].Record[0].Content.KlwCemsEquipmentManufacturer,
            format: this.props.PatrolRecordListPC.length === 0 ? null : this.props.PatrolRecordListPC[0].Record[0].Content.KlwCemsCode,
        }, {
            key: '2',
            producter: this.props.PatrolRecordListPC.length === 0 ? null : this.props.PatrolRecordListPC[0].Record.length === 0 ? this.props.PatrolRecordListPC[0].info[0].PointPosition : this.props.PatrolRecordListPC[0].Record[0].Content.PointPosition,
            format: this.props.PatrolRecordListPC.length === 0 ? null : this.props.PatrolRecordListPC[0].Record[0].Content.MaintenanceManagementUnit,
        }
        ];
        return (
            <div style={{backgroundColor: 'white'}}>
                <div style={{position: 'absolute', right: 40, top: 198}} >
                    <Button size="large" onClick={() => {
                        this.props.history.goBack(-1);
                    }}><Icon type="left" />退回</Button>
                </div>
                <Layout style={{backgroundColor: 'white'}}>
                    <div style={{ width: '100%',
                        height: '50px',
                        lineHeight: '50px',
                        margin: 'auto',
                        fontSize: '20px',
                        textAlign: 'center',
                        fontWeight: 'bold'}}>
                        稀释采样法CEMS日常巡检记录表
                    </div>
                    <div style={{
                        height: 'calc(100vh - 273px)',
                        width: '65%',
                        paddingBottom: '20px',
                        backgroundColor: 'white',
                        overflowX: 'hidden',
                        overflowY: 'scroll',
                        margin: 'auto',
                    }}
                    >
                        <table style={{
                            width: '100%',
                            marginBottom: 12,
                            marginTop: 10,
                            fontWeight: 'bold'}}>
                            <tr>
                                <td>企业名称： {this.props.PatrolRecordListPC.length === 0 ? null : this.props.PatrolRecordListPC[0].Record[0].Content.EnterpriseName}</td>
                                <td>巡检日期： {this.props.PatrolRecordListPC.length === 0 ? null : this.props.PatrolRecordListPC[0].Record.length === 0 ? null : this.props.PatrolRecordListPC[0].Record[0].Content.PatrolDate }</td>
                            </tr>
                        </table>
                        <Table
                            columns={columnTitle}
                            dataSource={dataTitle}
                            bordered={true}
                            pagination={false}
                            showHeader={false}
                        />
                        <div style={{fontWeight: 'bold', marginBottom: 12, marginTop: 12}}>运行维护内容及处理说明：</div>
                        <Table
                            columns={columns}
                            dataSource={this.props.PatrolRecordListPC.length === 0 ? null : this.props.PatrolRecordListPC[0].Record.length === 0 ? this.props.PatrolRecordListPC[0].Code : this.props.PatrolRecordListPC[0].Record[0].RecordList}
                            bordered={true}
                            pagination={false}
                        />
                    </div>
                </Layout>
            </div>
        );
    }
}
export default DilutionSampling;
