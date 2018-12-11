import React, { Component } from 'react';
import { Row, Col, Layout, Table, List, Button, Icon } from 'antd';
import { connect } from 'dva';
const {
    Header, Footer, Sider, Content,
} = Layout;
@connect(({ task, loading }) => ({
    StandardGasRepalceRecordList: task.StandardGasRepalceRecordList
}))

/*
页面：标准气体更换记录表
*/

class StandardGasRepalceRecord extends Component {
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
            type: 'task/StandardGasRepalceRecordList',
            payload: {
                TaskIds: this.props.match.params.StandardGasTaskIds,
                TypeIDs: this.props.match.params.StandardGasTypeIDs
            },
        });
    }
    render() {
        const signContent = this.props.StandardGasRepalceRecordList.length === 0 ? null : `data:image/jpeg;base64,${this.props.StandardGasRepalceRecordList[0].record.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].SignContent}`;
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
            MaintenanceManagementUnitContent: this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record.length === 0 ? this.props.StandardGasRepalceRecordList[0].info[0].MaintenanceManagementUnit : this.props.StandardGasRepalceRecordList[0].record[0].Content['MaintenanceManagementUnit'],
            PointPositionTitle: '安装地点',
            PointPositionContent: this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record.length === 0 ? this.props.StandardGasRepalceRecordList[0].info[0].PointPosition : this.props.StandardGasRepalceRecordList[0].record[0].Content['PointPosition'],
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
            width: '18.1%',
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
        const datathree = [{
            key: '1',
            CreateUserIDTitle: '运行维护人员:',
            CreateUserIDTitleContent: this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].CreateUserID,
            CreateTimeTitle: '时间:',
            CreateTimeContent: this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].CreateTime,
            SignContentTitle: '负责人:',
            SignContentcontent: this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].SignContent===null?null: <img src={signContent} />,
            SignTimetitle: '时间:',
            SignTimetitlecontent: this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].SignTime,
        }];
        const columnsfour = [{
            title: 'Detail',
            dataIndex: 'Detail',
            key: 'Detail',
            width: '100%',
        }
        ];
        const datafour = [{
            key: '1',
            Detail: ' 注：更换标准气体时应及时记录，每半年汇总存档。',
        }];
        const columns = [{
            title: '序号',
            dataIndex: 'name',
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
            title: '标准物质名称',
            dataIndex: 'StandardGasName',
            width: '12%',
            align: 'center',
        }, {
            title: '气体浓度',
            dataIndex: 'GasStrength',
            width: '12%',
            align: 'center',
        }, {
            title: '单位',
            dataIndex: 'Unit',
            width: '11%',
            align: 'center',
        }, {
            title: '数量',
            dataIndex: 'Num',
            width: '11%',
            align: 'center',
        }, {
            title: '供应商',
            dataIndex: 'Supplier',
            width: '11%',
            align: 'center',
        }, {
            title: '有效期',
            dataIndex: 'PeriodOfValidity',
            width: '17%',
            align: 'center',
        }];
        return (
            <Layout style={{backgroundColor: 'white'}}>
                <Content style={{margin: 'auto'}}>
                    <div style={{position: 'absolute', right: 40, top: 198}} >
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
                        标准气体更换记录表
                    </div>
                    <div style={{
                        height: 'calc(100vh - 290px)',
                        paddingBottom: '20px',
                        margin: 'auto',
                    }}
                    >
                        <div style={{fontWeight: 'bold', marginBottom: 12, marginTop: 10}}>企业名称：{this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record.length === 0 ? this.props.StandardGasRepalceRecordList[0].info[0].EnterpriseName : this.props.StandardGasRepalceRecordList[0].record[0].Content['EnterpriseName']}</div>
                        <Table
                            style={{width: 1200}}
                            columns={columns}
                            dataSource={this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].RecordList}
                            bordered={true}
                            pagination={false}
                            scroll={{ y: 330 }}
                            title={() =>
                                <div style={{marginLeft: -17, marginBottom: -16, marginTop: -16, marginRight: -17, backgroundColor: 'white'}}>
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

export default StandardGasRepalceRecord;
