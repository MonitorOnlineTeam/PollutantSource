import React, { Component } from 'react';
import styles from '../EmergencyTodoList/EmergencyDetailInfo.less';
import {Card, Divider, Button, Input, Table, Row, Col, Icon } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { connect } from 'dva';
import {EnumRequstResult, EnumPatrolTaskType} from '../../utils/enum';

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
            showforminfo: false
        };
    }

    SeeDetailInfo = () => {
        this.setState({
            showforminfo: true
        });
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
    render() {
        const SCREEN_WIDTH = document.querySelector('body').offsetWidth;

        if (this.props.taskInfo === null || this.props.isloading) {
            return (
                <div>
                    正在加载中
                </div>
            );
        } else {
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
            const taskInfo = this.props.taskInfo;
            if (taskInfo.requstresult == EnumRequstResult.Success) {
                data = taskInfo.data[0];
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
                                    <Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={this.SeeDetailInfo}>气态分析仪运行状况检查记录表</Button><br />
                                    <Button icon="check-circle-o">备品备件更换记录</Button><br />
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
                            &nbsp;
                            <Button type="primary" size="large" >通过<Icon type="right" /></Button >
                        </div>
                        {/* <Modal
                            title="气态分析仪运行状况检查记录表"
                            visible={this.state.showforminfo}
                            width={SCREEN_WIDTH - 400}
                            style={{ top: 20 }}
                            bodyStyle={{ padding: 5, backgroundColor: 'rgb(240,242,245)' }}
                            onCancel={() => {
                                this.setState({
                                    showforminfo: false
                                });
                            }}
                            footer={null}
                        >
                            <QualityControl {...this.props} emergencyId={emergencyId} />
                        </Modal> */}
                    </div>
                </PageHeaderLayout>
            );
        }
    }
}
