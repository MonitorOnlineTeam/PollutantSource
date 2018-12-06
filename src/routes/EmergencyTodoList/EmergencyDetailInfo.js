import React, { Component } from 'react';
import styles from '../EmergencyTodoList/EmergencyDetailInfo.less';
import {Card, Divider, Button, Input, Table, Row, Col, Icon, Spin } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { connect } from 'dva';
import {EnumRequstResult, EnumPatrolTaskType, EnumPsOperationForm} from '../../utils/enum';
import { routerRedux } from 'dva/router';
const { Description } = DescriptionList;
const { TextArea } = Input;

@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetTaskDetailInfo'],
    taskInfo: task.TaskInfo
}))
export default class EmergencyDetailInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TaskIds: '62409e78-8d89-42f7-b17f-017d24cc61ce',
            TypeIDs: 3,
            StandardGasTaskIds: '999363d6-0167-47f2-8a8e-da50849401de',
            StandardGasTypeIDs: 4,
        };
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'task/GetTaskDetailInfo',
            payload: {
                TaskID: this.props.match.params.TaskID,
                UserID: this.props.match.params.UserID
            }
        });
    }

    renderItem=(data, taskID) => {
        data[2].FormMainID = '323e0a8d-c90a-4d80-9fd1-d08dae5e9d2f';
        data[3].FormMainID = '3202407a-3ce0-47f9-ad30-4dab35990559';
        console.log(data[2].FormMainID = '323e0a8d-c90a-4d80-9fd1-d08dae5e9d2f');
        console.log(taskID);
        const rtnVal = [];
        data.map((item) => {
            if (item.FormMainID != null) {
                switch (item.ID) {
                    case EnumPsOperationForm.Repair:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(``));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.StopMachine:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(``));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.YhpReplace:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/monitor/sysmanage/ConsumablesReplaceRecord/${this.state.TaskIds}/${this.state.TypeIDs}`));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.StandardGasReplace:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/monitor/sysmanage/StandardGasRepalceRecord/${this.state.StandardGasTaskIds}/${this.state.StandardGasTypeIDs}`));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.CqfPatrol:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(``));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.CyfPatrol:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(``));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.ClfPatrol:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(``));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.CheckRecord:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/monitor/EmergencyTodoList/JzRecordInfo/${taskID}/${item.ID}`));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.TestRecord:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(``));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.DataException:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(``));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    default:
                        break;
                }
            }
        });
        return rtnVal;
    }

    render() {
        const SCREEN_WIDTH = document.querySelector('body').offsetWidth;

        if (this.props.taskInfo === null) {
            return (
                <div />
            );
        } else {
            let TaskID = ''; // 任务ID
            let TaskCode = ''; // 任务编号
            let PointName = ''; // 排口名称
            let EnterpriseName = ''; // 企业名称
            let TaskFrom = ''; // 任务来源
            let EmergencyStatusText = ''; // 紧急程度
            let TaskStatusText = ''; // 任务状态
            let TaskDescription = ''; // 任务描述
            let OperationsUserName = ''; // 运维人
            let CreateTime = ''; // 任务创建时间
            let RecordInfoList = []; // 报警记录
            let Remark = ''; // 处理说明
            let Attachments = ''; // 附件
            let TaskLogList = []; // 任务日志列表
            let TaskType = ''; // 任务类型
            let data = null; // 任务信息
            let RecordTypeInfo = [];
            const taskInfo = this.props.taskInfo;
            if (taskInfo.requstresult == EnumRequstResult.Success) {
                data = taskInfo.data[0];
                TaskID = data.ID;
                TaskCode = data.TaskCode;
                PointName = data.PointName;
                EnterpriseName = data.EnterpriseName;
                TaskFrom = data.TaskFrom;
                EmergencyStatusText = data.EmergencyStatusText;
                TaskStatusText = data.TaskStatusText;
                TaskDescription = data.TaskDescription;
                OperationsUserName = data.OperationsUserName;
                CreateTime = data.CreateTime;
                RecordInfoList = data.RecordInfoList;
                Remark = data.Remark;
                Attachments = data.Attachments;
                TaskLogList = data.TaskLogList;
                TaskType = data.TaskType;
                RecordTypeInfo = data.TaskFormList;
            }

            const pics = Attachments !== '' ? Attachments.LowimgList : [];
            const dataSource = [{
                key: '1',
                BeginAlarmTime: '2018-08-30 3:20',
                LastAlarmTime: '2018-08-30 5:20',
                AlarmInfo: 'SO2连续值异常',
                AlarmCount: '15'
            }, {
                key: '2',
                BeginAlarmTime: '2018-08-30 7:20',
                LastAlarmTime: '2018-08-30 9:00',
                AlarmInfo: '烟尘零值异常',
                AlarmCount: '14'
            }, {
                key: '3',
                BeginAlarmTime: '2018-08-30 9:00',
                LastAlarmTime: '2018-08-30 11:00',
                AlarmInfo: '气态分析仪温度过高',
                AlarmCount: '13'
            }];

            const columns = [{
                title: '开始报警时间',
                dataIndex: 'BeginAlarmTime',
                key: 'BeginAlarmTime',
            }, {
                title: '最后一次报警时间',
                dataIndex: 'LastAlarmTime',
                key: 'LastAlarmTime',
            }, {
                title: '报警信息',
                dataIndex: 'AlarmInfo',
                key: 'AlarmInfo',
            }, {
                title: '报警次数',
                dataIndex: 'AlarmCount',
                key: 'AlarmCount',
            }];
            const LogColumn = [
                {
                    title: '步骤',
                    width: '10%',
                    dataIndex: 'Remark',
                    align: 'center'
                }, {
                    title: '处理人',
                    width: '20%',
                    dataIndex: 'CreateUserName',
                    align: 'center'
                }, {
                    title: '创建时间',
                    width: '20%',
                    dataIndex: 'CreateTime',
                    align: 'center'
                }, {
                    title: '说明',
                    width: '20%',
                    dataIndex: 'TaskRemark',
                    align: 'center'
                }, {
                    title: '处理状态',
                    width: '10%',
                    dataIndex: 'TaskStatusText',
                    align: 'center'
                }];
            if (this.props.isloading) {
                return (
                    <div className={styles.loadContent}>
                        <Spin size="large" />
                    </div>
                );
            } else {
                return (
                    <PageHeaderLayout title="">
                        <div style={{height: 'calc(100vh - 190px)'}} className={styles.ExceptionDetailDiv}>
                            <Card title={<span style={{fontWeight: '900'}}>任务信息</span>} bordered={false}>
                                <DescriptionList className={styles.headerList} size="large" col="3">
                                    <Description term="任务单号">{TaskCode}</Description>
                                    <Description term="排口" >{PointName}</Description>
                                    <Description term="企业">{EnterpriseName}</Description>
                                </DescriptionList>
                                <DescriptionList style={{marginTop: 20}} className={styles.headerList} size="large" col="3">
                                    <Description term="任务来源">{TaskFrom}</Description>
                                    <Description term="紧急程度"><div style={{color: 'red'}}>{EmergencyStatusText}</div></Description>
                                    <Description term="任务状态"> <div style={{color: '#32CD32'}}>{TaskStatusText }</div></Description>
                                    <Description term="任务内容">{TaskDescription}</Description>
                                </DescriptionList>
                                <DescriptionList style={{marginTop: 20}} className={styles.headerList} size="large" col="3">
                                    <Description term="运维人">{OperationsUserName}</Description>
                                    <Description term="创建时间">{CreateTime}</Description>
                                </DescriptionList>
                                {
                                    TaskType === EnumPatrolTaskType.PatrolTask ? null
                                        : <Divider style={{ marginBottom: 20}} />
                                }
                                {
                                    TaskType === EnumPatrolTaskType.PatrolTask ? null
                                        : <Table style={{ backgroundColor: 'white'}} bordered={false} dataSource={dataSource} pagination={false} columns={columns} />
                                }

                            </Card>
                            <Card title={<span style={{fontWeight: '900'}}>处理说明</span>} style={{ marginTop: 20}} bordered={false}>
                                <DescriptionList className={styles.headerList} size="large" col="1">
                                    <Description>
                                        <TextArea rows={8} style={{width: '600px'}} />
                                    </Description>
                                </DescriptionList>

                            </Card>
                            <Card title={<span style={{fontWeight: '900'}}>处理记录</span>} style={{ marginTop: 20}} bordered={false}>
                                <DescriptionList className={styles.headerList} size="large" col="1">
                                    <Description>
                                        {
                                            this.renderItem(RecordTypeInfo, TaskID)
                                        }
                                    </Description>
                                </DescriptionList>
                                <DescriptionList style={{marginTop: 20}} className={styles.headerList} size="large" col="2">
                                    <Description term="处理人">
                                        {OperationsUserName}
                                    </Description>
                                    <Description term="处理时间">
                                        {}
                                    </Description>
                                </DescriptionList>
                            </Card>
                            <Card title={<span style={{fontWeight: '900'}}>附件</span>} bordered={false}>
                                <Row gutter={16} justify="center" align="middle">
                                    {
                                        pics.map((item) => {
                                            var srcValue = `../../../${item}`;
                                            return (
                                                <Col span={6} align="center">
                                                    <img src={srcValue} />
                                                </Col>
                                            );
                                        })
                                    }
                                </Row>
                            </Card>
                            <Card title={<span style={{fontWeight: '900'}}>日志表</span>} style={{marginTop: 20 }} bordered={false}>
                                <Table columns={LogColumn}
                                    dataSource={TaskLogList}
                                    rowKey="StepID"
                                    bordered={true}
                                    pagination={false}
                                />
                            </Card>
                            <div className={styles.Toexamine} >
                                <Button size="large" onClick={() => {
                                    this.props.history.goBack(-1);
                                    // this.props.dispatch(routerRedux.push(`/monitor/operation/emergency/emergencytodolist/`));
                                }}><Icon type="left" />退回</Button>
                            </div>
                        </div>
                    </PageHeaderLayout>
                );
            }
        }
    }
}
