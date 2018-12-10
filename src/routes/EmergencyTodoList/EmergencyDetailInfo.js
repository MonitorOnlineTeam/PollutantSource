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
            CqfPatrolTaskIds: '62409e78-8d89-42f7-b17f-017d24cc61ce',
            CqfPatrolTypeIDs: 5,
            CyfPatrolTaskIds: '62409e78-8d89-42f7-b17f-017d24cc61ce',
            CyfPatrolTypeIDs: 6,
            ClfPatrolTaskIds: '62409e78-8d89-42f7-b17f-017d24cc61ce',
            ClfPatrolTypeIDs: 7,
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
        data[4].FormMainID = '4d44a51c-b0d8-464f-a52c-d51c6bd05e60';
        data[5].FormMainID = '5d44a51c-b0d8-464f-a52c-d51c6bd05e60';
        data[6].FormMainID = '6d44a51c-b0d8-464f-a52c-d51c6bd05e60';
        console.log(data[2].FormMainID = '323e0a8d-c90a-4d80-9fd1-d08dae5e9d2f');
        console.log(taskID);
        const rtnVal = [];
        data.map((item) => {
            console.log(item);
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
                            this.props.dispatch(routerRedux.push(`/sysmanage/ConsumablesReplaceRecord/${this.state.TaskIds}/${this.state.TypeIDs}`));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.StandardGasReplace:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/sysmanage/StandardGasRepalceRecord/${this.state.StandardGasTaskIds}/${this.state.StandardGasTypeIDs}`));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.CqfPatrol:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/sysmanage/CompleteExtraction/${this.state.CqfPatrolTaskIds}/${this.state.CqfPatrolTypeIDs}`));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.CyfPatrol:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/monitor/sysmanage/DilutionSampling/${this.state.CyfPatrolTaskIds}/${this.state.CyfPatrolTypeIDs}`));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.ClfPatrol:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/monitor/sysmanage/DirectMeasurement/${this.state.ClfPatrolTaskIds}/${this.state.ClfPatrolTypeIDs}`));
                        }}>{item.TypeName}</Button></p>);
                        break;
                    case EnumPsOperationForm.CheckRecord:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/pointdetail/:pointcode/JzRecordInfo/${taskID}/${item.ID}`));
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
            let AlarmList = []; // 报警记录
            let Remark = ''; // 处理说明
            let Attachments = ''; // 附件
            let TaskLogList = []; // 任务日志列表
            let TaskType = ''; // 任务类型
            let data = null; // 任务信息
            let RecordTypeInfo = [];
            let CompleteTime = null;
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
                // AlarmList = data.AlarmList;
                Remark = data.Remark;
                Attachments = data.Attachments;
                TaskLogList = data.TaskLogList;
                TaskType = data.TaskType;
                RecordTypeInfo = data.TaskFormList;
                CompleteTime = data.CompleteTime;
                if (data.AlarmList != null && data.AlarmList.length > 0) {
                    data.AlarmList.map((item) => {
                        AlarmList.push({
                            key: item.key,
                            BeginAlarmTime: item.FirstTime,
                            AlarmTime: item.AlarmTime,
                            AlarmMsg: item.AlarmMsg,
                            AlarmCount: item.AlarmCount
                        });
                    });
                }
            }

            const pics = Attachments !== '' ? Attachments.LowimgList : [];
            const columns = [{
                title: '开始报警时间',
                width: '20%',
                dataIndex: 'BeginAlarmTime',
                key: 'BeginAlarmTime',
            }, {
                title: '最后一次报警时间',
                width: '20%',
                dataIndex: 'AlarmTime',
                key: 'AlarmTime',
            }, {
                title: '报警信息',
                dataIndex: 'AlarmMsg',
                width: '45%',
                key: 'AlarmMsg',
            }, {
                title: '报警次数',
                dataIndex: 'AlarmCount',
                width: '15%',
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
                        <div style={{height: 'calc(100vh - 290px)'}} className={styles.ExceptionDetailDiv}>
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
                                        : <Table style={{ backgroundColor: 'white'}} bordered={false} dataSource={AlarmList} pagination={false} columns={columns} />
                                }

                            </Card>
                            <Card title={<span style={{fontWeight: '900'}}>处理说明</span>} style={{ marginTop: 20}} bordered={false}>
                                <DescriptionList className={styles.headerList} size="large" col="1">
                                    <Description>
                                        <TextArea rows={8} style={{width: '600px'}}>
                                            {Remark}
                                        </TextArea>
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
                                        {CompleteTime}
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
                                }}><Icon type="left" />退回</Button>
                            </div>
                        </div>
                    </PageHeaderLayout>
                );
            }
        }
    }
}
