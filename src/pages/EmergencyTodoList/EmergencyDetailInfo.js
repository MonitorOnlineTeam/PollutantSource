import React, { Component } from 'react';
import styles from '../EmergencyTodoList/EmergencyDetailInfo.less';
import {Card, Divider, Button, Input, Table, Icon, Spin,Modal,Upload } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import { connect } from 'dva';
import {EnumRequstResult, EnumPatrolTaskType, EnumPsOperationForm} from '../../utils/enum';
import { routerRedux } from 'dva/router';
import {imgaddress} from '../../config.js';
import { CALL_HISTORY_METHOD } from 'react-router-redux';
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
            previewVisible: false,
            previewImage: ''
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

    handlePreview = (file) => {
        this.setState({
            previewImage: `${imgaddress}${file.name}`,
            previewVisible: true,
        });
    }

    handleCancel=() => {
        this.setState({
            previewVisible: false
        });
    }

    renderItem=(data, taskID) => {
        const rtnVal = [];
        data.map((item) => {
            if (item.FormMainID !== null) {
                switch (item.ID) {
                    case EnumPsOperationForm.Repair:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/pointdetail/:pointcode/RepairRecordDetail/${taskID}/${item.ID}`));
                        }}>{item.CNNAME}</Button></p>);
                        break;
                    case EnumPsOperationForm.StopMachine:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            //this.props.dispatch(routerRedux.push(`/pointdetail/:pointcode/StopCemsInfo/${this.state.TaskIds}/${this.state.TypeIDs}`));
                            this.props.dispatch(routerRedux.push(`/pointdetail/:pointcode/StopCemsInfo/${taskID}/${item.ID}`));
                        }}>{item.CNNAME}</Button></p>);
                        break;
                    case EnumPsOperationForm.YhpReplace:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/pointdetail/:pointcode/ConsumablesReplaceRecord/${taskID}/${item.ID}`));
                        }}>{item.CNNAME}</Button></p>);
                        break;
                    case EnumPsOperationForm.StandardGasReplace:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/pointdetail/:pointcode/StandardGasRepalceRecord/${taskID}/${item.ID}`));
                        }}>{item.CNNAME}</Button></p>);
                        break;
                    case EnumPsOperationForm.CqfPatrol:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/pointdetail/:pointcode/CompleteExtraction/${taskID}/${item.ID}`));
                        }}>{item.CNNAME}</Button></p>);
                        break;
                    case EnumPsOperationForm.CyfPatrol:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/pointdetail/:pointcode/DilutionSampling/${taskID}/${item.ID}`));
                        }}>{item.CNNAME}</Button></p>);
                        break;
                    case EnumPsOperationForm.ClfPatrol:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/pointdetail/:pointcode/DirectMeasurement/${taskID}/${item.ID}`));
                        }}>{item.CNNAME}</Button></p>);
                        break;
                    case EnumPsOperationForm.CheckRecord:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/pointdetail/:pointcode/JzRecordInfo/${taskID}/${item.ID}`));
                        }}>{item.CNNAME}</Button></p>);
                        break;
                    case EnumPsOperationForm.TestRecord:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(``));
                        }}>{item.CNNAME}</Button></p>);
                        break;
                    case EnumPsOperationForm.DataException:
                        rtnVal.push(<p style={{marginBottom: 0}}><Button style={{marginBottom: '5px'}} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/pointdetail/:pointcode/DeviceExceptionDetail/${taskID}/${item.ID}`));
                        }}>{item.CNNAME}</Button></p>);
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
        }
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
        if (taskInfo.requstresult == EnumRequstResult.Success && taskInfo.data !== null) {
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
            if (data.AlarmList !== null && data.AlarmList.length > 0) {
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

        const pics = Attachments !== '' ? Attachments.ThumbimgList : [];
        const fileList = [];
        pics.map((item) => {
            fileList.push({
                uid: item,
                name: item.replace('_thumbnail',''),
                status: 'done',
                url: `${imgaddress}${item}`,
            });
        });
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
        }

        const upload = {
            showUploadList: {showPreviewIcon: true, showRemoveIcon: false },
            listType: 'picture-card',
            fileList: [...fileList]
        };
        return (
            <div style={{height: 'calc(100vh - 220px)'}} className={styles.ExceptionDetailDiv}>
                <Card title={<span style={{fontWeight: '900'}}>任务信息</span>}>
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
                        TaskType === EnumPatrolTaskType.PatrolTask ? null :
                            <Divider style={{ marginBottom: 20}} />
                    }
                    {
                        TaskType === EnumPatrolTaskType.PatrolTask ? null :
                            <Table style={{ backgroundColor: 'white'}} bordered={false} dataSource={AlarmList} pagination={false} columns={columns} />
                    }

                </Card>
                <Card title={<span style={{fontWeight: '900'}}>处理说明</span>} style={{ marginTop: 20}}>
                    <DescriptionList className={styles.headerList} size="large" col="1">
                        <Description>
                            <TextArea rows={8} style={{width: '600px'}}>
                                {Remark}
                            </TextArea>
                        </Description>
                    </DescriptionList>

                </Card>
                <Card title={<span style={{fontWeight: '900'}}>处理记录</span>} style={{ marginTop: 20}}>
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
                <Card title={<span style={{fontWeight: '900'}}>附件</span>}>
                    <Upload
                        {...upload}
                        onPreview={this.handlePreview}
                    />
                </Card>
                <Card title={<span style={{fontWeight: '900'}}>日志表</span>} style={{marginTop: 20 }}>
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
                <Modal width="65%" visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%',marginTop: '20px' }} src={this.state.previewImage} />
                </Modal>
            </div>
        );
    }
}