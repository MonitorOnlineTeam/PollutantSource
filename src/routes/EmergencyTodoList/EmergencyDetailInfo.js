import React, { Component, Fragment } from 'react';
import styles from '../EmergencyTodoList/EmergencyDetailInfo.less';
import {Steps, Card, Popover, Divider, Button, Input, Table, Modal } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import EmergencyInfo from '../../mockdata/EmergencyTodoList/EmergencyDetailInfo.json';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {routerRedux} from 'dva/router';
import { connect } from 'dva';
import QualityControl from './QualityControl';

const { Description } = DescriptionList;
const { TextArea } = Input;
const Step = Steps.Step;
const customDot = (dot, { status, index }) => (
    <Popover content={<span>step {index} status: {status}</span>}>
        {dot}
    </Popover>
);

@connect()
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

    render() {
        const SCREEN_WIDTH = document.querySelector('body').offsetWidth;
        const { match} = this.props;
        debugger;

        const emergencyId = match.params.exceptionhandleid; // 任务ID
        const LogColumn = [
            {
                title: '步骤',
                width: '10%',
                dataIndex: 'StepName',
                align: 'center',
                render: (value, row, index) => {
                    const obj = {
                        children: value,
                        props: {},
                    };
                    if (index === 3) {
                        obj.props.rowSpan = 3;
                    }
                    if (index > 3) {
                        obj.props.rowSpan = 0;
                    }
                    return obj;
                },
            }, {
                title: '处理人',
                width: '20%',
                dataIndex: 'User_Name',
                align: 'center'
            }, {
                title: '开始时间',
                width: '20%',
                dataIndex: 'BeginTime',
                align: 'center'
            }, {
                title: '完成时间',
                width: '20%',
                dataIndex: 'EndTime',
                align: 'center'
            }, {
                title: '说明',
                width: '20%',
                dataIndex: 'Remark',
                align: 'center'
            }, {
                title: '处理状态',
                width: '10%',
                dataIndex: 'HandlingState',
                align: 'center'
            }];

            // 任务处理进程
        const taskProcess = EmergencyInfo.TaskProcess.filter(function(item) {
            return item.ExceptionHandleId === emergencyId;
        });

        const currentProcess = taskProcess.filter(function(item) {
            return item.UserName !== '';
        });

        // 任务单基本信息
        const taskBasicInfo = EmergencyInfo.TaskBasicInfo.filter((item) => {
            return item.ExceptionHandleId === emergencyId;
        });

        // 应急处理
        const emergencyHandle = EmergencyInfo.EmergencyHandle.filter((item) => {
            return item.ExceptionHandleId === emergencyId;
        });

        // 校准信息
        const correctInfo = EmergencyInfo.CorrectInfo.filter((item) => {
            return item.ExceptionHandleId === emergencyId;
        });

        // 审批流程
        const approvalProcess = EmergencyInfo.ApprovalProcess.filter((item) => {
            return item.ExceptionHandleId === emergencyId;
        });

        const currentApprovalProcess = approvalProcess.filter(function(item) {
            return item.CheckName !== '';
        });

        const logDataList = EmergencyInfo.LogDataList.filter((item) => {
            return item.ExceptionHandleId === emergencyId;
        });
        console.log(emergencyId);
        return (
            <PageHeaderLayout title="应急任务详情">
                <div style={{height: 'calc(100vh - 190px)'}} className={styles.ExceptionDetailDiv}>
                    <Card title="" style={{ }} bordered={false}>
                        <Steps progressDot={customDot} current={currentProcess.length}>
                            {
                                taskProcess.map((item) => {
                                    return (<Step title={item.ProcessName} description={
                                        <div className={styles.stepDescription}>
                                            <Fragment>
                                                {item.UserName}
                                            </Fragment>
                                            <div>{item.CreateTime}</div>
                                        </div>
                                    } />);
                                })
                            }
                        </Steps>
                    </Card>
                    <Card title="任务信息" style={{marginTop: 20 }} bordered={false}>
                        <DescriptionList className={styles.headerList} size="large" col="3">
                            <Description term="任务单号">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].TaskNo}</Description>
                            <Description term="排口" style={{fontWeight: '1000'}}>{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].PointName}</Description>
                            <Description term="企业">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].EnterName}</Description>
                            <Description term="省份">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].Province}</Description>
                            <Description term="城市">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].City}</Description>
                        </DescriptionList>
                        <DescriptionList style={{marginTop: 20}} className={styles.headerList} size="large" col="3">
                            <Description term="任务来源">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].TaskSource}</Description>
                            <Description term="紧急程度" style={{fontWeight: '1000'}}>{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].Emergence}</Description>
                            <Description term="任务状态">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].TaskStatus}</Description>
                            <Description term="任务内容" style={{fontWeight: '1000'}}>{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].TaskContent}</Description>
                        </DescriptionList>
                        <DescriptionList style={{marginTop: 20}} className={styles.headerList} size="large" col="3">
                            <Description term="创建人">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].CreatePerson}</Description>
                            <Description term="创建时间">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].CreateTime}</Description>
                        </DescriptionList>
                        <Divider style={{ marginBottom: 20 }} />
                        <DescriptionList className={styles.headerList} size="large" col="3">
                            <Description term="设备类型">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].DeviceType}</Description>
                            <Description term="设备品牌">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].DeviceBrand}</Description>
                            <Description term="设备编号">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].DeviceNo}</Description>
                            <Description term="设备型号">{taskBasicInfo.length === 0 ? '' : taskBasicInfo[0].DeviceType}</Description>
                        </DescriptionList>
                    </Card>
                    <Card title="应急处理" style={{ marginTop: 20}} bordered={false}>
                        <DescriptionList className={styles.headerList} size="large" col="1">
                            <Description term="处理说明">
                                <TextArea style={{width: '400px'}} autosize={{ minRows: 2, maxRows: 6 }} value={emergencyHandle.length === 0 ? '' : emergencyHandle[0].HandleContent} />
                            </Description>
                            <Description term="处理记录">
                                <Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={this.SeeDetailInfo}>气态分析仪运行状况检查记录表</Button><br />
                                <Button icon="check-circle-o">备品备件更换记录</Button><br />
                            </Description>
                        </DescriptionList>
                        <DescriptionList style={{marginTop: 20}} className={styles.headerList} size="large" col="2">
                            <Description term="处理人">
                                {emergencyHandle.length === 0 ? '' : emergencyHandle[0].HandlePerson}
                            </Description>
                            <Description term="处理时间">
                                {emergencyHandle.length === 0 ? '' : emergencyHandle[0].HandleTime}
                            </Description>
                        </DescriptionList>
                    </Card>
                    <Card title="校准" style={{ marginTop: 20}} bordered={false}>
                        <DescriptionList className={styles.headerList} size="large" col="1">
                            <Description term="校准记录">
                                <Button style={{marginBottom: '5px'}} icon="check-circle-o">校准信息记录表</Button>
                            </Description>
                        </DescriptionList>
                        <DescriptionList style={{marginTop: 20}} className={styles.headerList} size="large" col="2">
                            <Description term="校准人">
                                {correctInfo.length === 0 ? '' : correctInfo[0].HandlePerson}
                            </Description>
                            <Description term="校准时间">
                                {correctInfo.length === 0 ? '' : correctInfo[0].HandleTime}
                            </Description>
                        </DescriptionList>
                    </Card>
                    <Card title="审核" style={{ marginTop: 20}} bordered={false}>
                        <Steps direction="vertical" size="large" current={currentApprovalProcess.length}>
                            {
                                approvalProcess.map((item) => {
                                    return (
                                        <Step title={<div><span>{item.NodeName}</span><span className={styles.stepCheckName}>{item.CheckName}</span><span className={styles.stepCheckName}>{item.CheckTime}</span></div>}
                                            description={
                                                <div className={styles.stepDescription}>
                                                    <div style={{width: '50%', height: '40px'}}>
                                                        {item.CheckContent}
                                                    </div>
                                                </div>
                                            } />
                                    );
                                })
                            }
                        </Steps>
                    </Card>

                    <Card title="日志表" style={{marginTop: 20 }} bordered={false}>
                        <Table columns={LogColumn}
                            dataSource={logDataList}
                            rowKey="StepID"
                            bordered={true}
                            pagination={false}
                        />
                    </Card>
                    <div className={styles.returnLastPage}>
                        <Button type="solid" icon="left" onClick={() => {
                            this.props.history.goBack(-1);
                            // this.props.dispatch(routerRedux.push(`/monitor/operation/emergency/emergencytodolist/`));
                        }}>返回</Button>
                    </div>
                    <Modal
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
                    </Modal>
                </div>
            </PageHeaderLayout>
        );
    }
}
