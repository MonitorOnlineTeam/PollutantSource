import React, { Component } from 'react';
import { Row, Col, Layout, Table, List, Button, Icon } from 'antd';
import { exportExcel } from 'xlsx-oc';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ExportJsonExcel from 'js-export-excel';
import { connect } from 'dva';
const {
    Header, Footer, Sider, Content,
} = Layout;
@connect(({ task, loading }) => ({
    ConsumablesReplaceRecordList: task.ConsumablesReplaceRecordList
}))
/*
页面：易耗品更换记录表
*/
class ConsumablesReplaceRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
        this.onChange();
    };
    onChange = () => {
        this.props.dispatch({
            type: 'task/fetchuserlist',
            payload: {
                TaskIds: this.props.match.params.TaskIds,
                TypeIDs: this.props.match.params.TypeIDs
            },
        });
    }
    render() {
        const signContent = this.props.ConsumablesReplaceRecordList.length === 0 ? null : `data:image/jpeg;base64,${this.props.ConsumablesReplaceRecordList[0].record.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record[0].SignContent}`;
        const columnsone = [{
            dataIndex: 'EnterpriseNameTitle',
            key: 'EnterpriseNameTitle',
            width: '14%',
            align: 'center',
        }, {
            dataIndex: 'EnterpriseNameContent',
            key: 'EnterpriseNameContent',
            width: '19.3%',
            align: 'center',
        }, {
            dataIndex: 'CodeTitle',
            key: 'CodeTitle',
            width: '16%',
            align: 'center',
        },
        {
            dataIndex: 'CodeContent',
            key: 'CodeContent',
            width: '18%',
            align: 'center',
        }, {
            dataIndex: 'EquipmentTitle',
            key: 'EquipmentTitle',
            width: '13%',
            align: 'center',
        }, {
            dataIndex: 'EquipmentContent',
            key: 'EquipmentContent',
            width: '19.7%',
            align: 'center',
        },
        ];
        const dataone = [{
            key: '1',
            EnterpriseNameTitle: '设备名称',
            EnterpriseNameContent: 'CEMS',
            CodeTitle: '规格型号',
            CodeContent: this.props.ConsumablesReplaceRecordList.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record.length === 0 ? this.props.ConsumablesReplaceRecordList[0].info[0].Code : this.props.ConsumablesReplaceRecordList[0].record[0].Content['Code'],
            EquipmentTitle: '设备编号',
            EquipmentContent: this.props.ConsumablesReplaceRecordList.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record.length === 0 ? this.props.ConsumablesReplaceRecordList[0].info[0].EquipmentCode : this.props.ConsumablesReplaceRecordList[0].record[0].Content['EquipmentCode'],
        }];
        const columnstwo = [{
            dataIndex: 'MaintenanceManagementUnitTitle',
            key: 'MaintenanceManagementUnitTitle',
            width: '20%',
            align: 'center',
        }, {
            dataIndex: 'MaintenanceManagementUnitContent',
            key: 'MaintenanceManagementUnitContent',
            width: '29.3%',
            align: 'center',
        }, {
            dataIndex: 'PointPositionTitle',
            key: 'PointPositionTitle',
            width: '18%',
            align: 'center',
        },
        {
            dataIndex: 'PointPositionContent',
            key: 'PointPositionContent',
            width: '32.7%',
            align: 'center',
        }
        ];
        const datatwo = [{
            key: '1',
            MaintenanceManagementUnitTitle: '维护管理单位',
            MaintenanceManagementUnitContent: this.props.ConsumablesReplaceRecordList.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record.length === 0 ? this.props.ConsumablesReplaceRecordList[0].info[0].MaintenanceManagementUnit : this.props.ConsumablesReplaceRecordList[0].record[0].Content['MaintenanceManagementUnit'],
            PointPositionTitle: '安装地点',
            PointPositionContent: this.props.ConsumablesReplaceRecordList.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record.length === 0 ? this.props.ConsumablesReplaceRecordList[0].info[0].PointPosition : this.props.ConsumablesReplaceRecordList[0].record[0].Content['PointPosition'],
        }];
        const columnsthree = [{
            dataIndex: 'CreateUserIDTitle',
            key: 'CreateUserIDTitle',
            width: '13%',
            align: 'center',
        }, {
            dataIndex: 'CreateUserIDTitleContent',
            key: 'CreateUserIDTitleContent',
            width: '11%',
            align: 'center',
        }, {
            dataIndex: 'CreateTimeTitle',
            key: 'CreateTimeTitle',
            width: '11%',
            align: 'center',
        },
        {
            dataIndex: 'CreateTimeContent',
            key: 'CreateTimeContent',
            width: '18%',
            align: 'center',
        }, {
            dataIndex: 'SignContentTitle',
            key: 'SignContentTitle',
            width: '10%',
            align: 'center',
        },
        {
            dataIndex: 'SignContentcontent',
            key: 'SignContentcontent',
            width: '100px',
            align: 'center',
        },
        {
            dataIndex: 'SignTimetitle',
            key: 'SignTimetitle',
            width: '10%',
            align: 'center',
        },
        {
            dataIndex: 'SignTimetitlecontent',
            key: 'SignTimetitlecontent',
            width: '20%',
            align: 'center',
        }
        ];
        const columnsfour = [{
            dataIndex: 'Detail',
            key: 'Detail',
            width: '100%',
        }
        ];
        const datafour = [{
            key: '1',
            Detail: ' 注：更换易耗品时应及时记录，每半年汇总存档。',
        }];
        const datathree = [{
            key: '1',
            CreateUserIDTitle: '运行维护人员:',
            CreateUserIDTitleContent: this.props.ConsumablesReplaceRecordList.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record[0].CreateUserID,
            CreateTimeTitle: '时间:',
            CreateTimeContent: this.props.ConsumablesReplaceRecordList.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record[0].CreateTime,
            SignContentTitle: '负责人:',
            SignContentcontent: this.props.ConsumablesReplaceRecordList.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record.length === 0 ? null : <img src={signContent} />,
            SignTimetitle: '时间:',
            SignTimetitlecontent: this.props.ConsumablesReplaceRecordList.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record[0].SignTime,
        }];
        const columns = [{
            title: '序号',
            dataIndex: 'ID',
            width: '9%',
            align: 'center',
            render(text, record, index) {
                return (
                    <span>{index + 1}</span>
                );
            }
        }, {
            title: '更换日期',
            dataIndex: 'ReplaceDate',
            width: '17%',
            align: 'center',
        }, {
            title: '易耗品名称',
            dataIndex: 'ConsumablesName',
            width: '12%',
            align: 'center',
        }, {
            title: '规格型号',
            dataIndex: 'Model',
            width: '12%',
            align: 'center',
        }, {
            title: '单位',
            dataIndex: 'Unit',
            width: '13%',
            align: 'center',
        }, {
            title: '数量',
            dataIndex: 'Num',
            width: '13%',
            align: 'center',
        }, {
            title: '更换原因说明（备注）',
            dataIndex: 'Remark',
            width: '24%',
            align: 'center',
        }];
        return (
            <Layout style={{backgroundColor: 'white'}}>
                <Content style={{margin: 'auto', marginTop: 50}}>
                    <div style={{position: 'absolute', right: 15, top: 85}} >
                        <Button size="large" onClick={() => {
                            this.props.history.goBack(-1);
                        }}><Icon type="left" />退回</Button>
                    </div>
                    <div style={{ width: '80%',
                        height: '50px',
                        lineHeight: '50px',
                        margin: 'auto',
                        fontSize: '20px',
                        textAlign: 'center',
                        fontWeight: 'bold'}}>
                          易耗品更换记录表
                    </div>
                    <div style={{backgroundColor: 'white', marginTop: 10}}>
                        <div style={{fontWeight: 'bold', marginBottom: 12, marginTop: 10}}>企业名称：{this.props.ConsumablesReplaceRecordList.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record.length === 0 ? this.props.ConsumablesReplaceRecordList[0].info[0].EnterpriseName : this.props.ConsumablesReplaceRecordList[0].record[0].Content['EnterpriseName']}</div>
                        <Table
                            id="table-to-xls"
                            ref="table"
                            style={{width: 1200, backgroundColor: 'white'}}
                            columns={columns}
                            dataSource={this.props.ConsumablesReplaceRecordList.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record.length === 0 ? null : this.props.ConsumablesReplaceRecordList[0].record[0].RecordList}
                            bordered={true}
                            pagination={false}
                            scroll={{ y: 330 }}
                            title={() =>
                                <div style={{marginLeft: -17, marginBottom: -17, marginTop: -16, marginRight: -17, backgroundColor: 'white'}}>
                                    <Table
                                        style={{width: 1200}}
                                        columns={columnsone}
                                        dataSource={dataone}
                                        bordered={true}
                                        showHeader={false}
                                        pagination={false}
                                    />
                                    <Table
                                        style={{width: 1200}}
                                        columns={columnstwo}
                                        dataSource={datatwo}
                                        bordered={true}
                                        showHeader={false}
                                        pagination={false}
                                    />
                                </div>
                            }
                            footer={() =>
                                <div style={{marginLeft: -17, marginTop: -17, marginBottom: -16, backgroundColor: 'white'}}>
                                    <Table
                                        style={{width: 1200}}
                                        columns={columnsthree}
                                        dataSource={datathree}
                                        bordered={true}
                                        showHeader={false}
                                        pagination={false}
                                    />
                                    <Table
                                        style={{width: 1200}}
                                        columns={columnsfour}
                                        dataSource={datafour}
                                        bordered={true}
                                        showHeader={false}
                                        pagination={false}
                                    />
                                </div>
                            }
                        />
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default ConsumablesReplaceRecord;
