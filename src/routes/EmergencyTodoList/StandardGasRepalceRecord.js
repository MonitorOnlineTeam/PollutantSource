import React, { Component } from 'react';
import { Row, Col, Layout, Table, List, Button, Icon } from 'antd';
import { connect } from 'dva';
const {
    Header, Footer, Sider, Content,
} = Layout;
@connect(({ task, loading }) => ({
    StandardGasRepalceRecordList: task.StandardGasRepalceRecordList
}))
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
        console.log(this.props.StandardGasRepalceRecordList);
        const columnstwo = [{
            title: 'MaintenanceManagementUnitTitle',
            dataIndex: 'MaintenanceManagementUnitTitle',
            key: 'MaintenanceManagementUnitTitle',
            width: '20%',
            align: 'center',

        }, {
            title: 'MaintenanceManagementUnitContent',
            dataIndex: 'MaintenanceManagementUnitContent',
            key: 'MaintenanceManagementUnitContent',
            width: '29.2%',
            align: 'center',

        }, {
            title: 'PointPositionTitle',
            dataIndex: 'PointPositionTitle',
            key: 'PointPositionTitle',
            width: '18%',
            align: 'center',

        },
        {
            title: 'PointPositionContent',
            dataIndex: 'PointPositionContent',
            key: 'PointPositionContent',
            width: '32.8%',
            align: 'center',

        }
        ];
        const datatwo = [{
            key: '1',
            MaintenanceManagementUnitTitle: '维护管理单位',
            MaintenanceManagementUnitContent: this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].Content['MaintenanceManagementUnit'],
            PointPositionTitle: '安装地点',
            PointPositionContent: this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].Content['PointPosition'],
        }];
        const columnsthree = [{
            title: 'CreateUserIDTitle',
            dataIndex: 'CreateUserIDTitle',
            key: 'CreateUserIDTitle',
            width: '14%',
            align: 'center',

        }, {
            title: 'CreateUserIDTitleContent',
            dataIndex: 'CreateUserIDTitleContent',
            key: 'CreateUserIDTitleContent',
            width: '9%',
            align: 'center',

        }, {
            title: 'CreateTimeTitle',
            dataIndex: 'CreateTimeTitle',
            key: 'CreateTimeTitle',
            width: '9%',
            align: 'center',

        },
        {
            title: 'CreateTimeContent',
            dataIndex: 'CreateTimeContent',
            key: 'CreateTimeContent',
            width: '17.2%',
            align: 'center',

        }, {
            title: 'SignContentTitle',
            dataIndex: 'SignContentTitle',
            key: 'SignContentTitle',
            width: '10%',
            align: 'center',

        },
        {
            title: 'SignContentcontent',
            dataIndex: 'SignContentcontent',
            key: 'SignContentcontent',
            width: '10%',
            align: 'center',

        },
        {
            title: 'SignTimetitle',
            dataIndex: 'SignTimetitle',
            key: 'SignTimetitle',
            width: '10%',
            align: 'center',

        },
        {
            title: 'SignTimetitlecontent',
            dataIndex: 'SignTimetitlecontent',
            key: 'SignTimetitlecontent',
            width: '20.8%',
            align: 'center',

        }
        ];
        const datathree = [{
            key: '1',
            CreateUserIDTitle: '运行维护人员:',
            CreateUserIDTitleContent: this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].CreateUserID,
            CreateTimeTitle: '时间:',
            CreateTimeContent: this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].CreateTime,
            SignContentTitle: '负责人:',
            SignContentcontent: this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].SignContent,
            SignTimetitle: '时间:',
            SignTimetitlecontent: this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].SignTime,
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
                <Content style={{margin: 'auto', marginTop: 50}}>
                    <div style={{position: 'absolute', right: 15, top: 85}} >
                        <Button size="large" onClick={() => {
                            this.props.history.goBack(-1);
                        }}><Icon type="left" />退回</Button>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <h2>
                          标准气体更换记录表
                        </h2>
                    </div>
                    <div style={{backgroundColor: 'white'}}>
                        <h3>企业名称：{this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].Content['EnterpriseName']}</h3>
                        <Table
                            style={{width: 1000}}
                            columns={columns}
                            dataSource={this.props.StandardGasRepalceRecordList.length === 0 ? null : this.props.StandardGasRepalceRecordList[0].record[0].RecordList}
                            bordered={true}
                            pagination={false}
                            scroll={{ y: 330 }}
                            title={() =>
                                <div style={{marginLeft: -17, marginBottom: -16, marginTop: -16, marginRight: -17, backgroundColor: '#FAFAFA'}}>
                                    <Table
                                        style={{width: 1000}}
                                        columns={columnstwo}
                                        dataSource={datatwo}
                                        bordered={true}
                                        showHeader={false}
                                        pagination={false}
                                    />
                                </div>
                            }
                            footer={() =>
                                <div style={{marginLeft: -17, marginTop: -17, marginBottom: -16, backgroundColor: '#FAFAFA'}}>
                                    <Table
                                        style={{width: 1000}}
                                        columns={columnsthree}
                                        dataSource={datathree}
                                        bordered={true}
                                        showHeader={false}
                                        pagination={false}
                                    />
                                    <div style={{height: 50, lineHeight: '50px', marginLeft: 10}}>

                                       注：更换标准气体时应及时记录，每半年汇总存档。
                                    </div>

                                </div>
                            }
                        />
                    </div>

                </Content>

            </Layout>
            // <div>
            //     {this.props.match.params.Taskid}
            // </div>
        );
    }
}

export default StandardGasRepalceRecord;
