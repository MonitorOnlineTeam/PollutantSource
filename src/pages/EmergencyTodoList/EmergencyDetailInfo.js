import React, { Component } from 'react';
import styles from '../EmergencyTodoList/EmergencyDetailInfo.less';
import { Card, Divider, Button, Input, Table, Icon, Spin, Modal, Upload, Form } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import { connect } from 'dva';
import { EnumRequstResult, EnumPatrolTaskType, EnumPsOperationForm } from '../../utils/enum';
import { routerRedux } from 'dva/router';
import { imgaddress } from '../../config.js';
import { CALL_HISTORY_METHOD } from 'react-router-redux';
import MonitorContent from '../../components/MonitorContent/index';
import { get } from '../../dvapack/request';
import { async } from 'q';
import moment from 'moment';
const { Description } = DescriptionList;
const { TextArea } = Input;
const FormItem = Form.Item;
@Form.create()
@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetTaskDetailInfo'],
    taskInfo: task.TaskInfo,
    DGIMN: null
}))
export default class EmergencyDetailInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            cdvisible: false
        };
    }

    componentDidMount() {
        this.reloaddata();
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: `${imgaddress}${file.name}`,
            previewVisible: true,
        });
    }

    handleCancel = () => {
        this.setState({
            previewVisible: false
        });
    }

    reloaddata = () => {
        this.props.dispatch({
            type: 'task/GetTaskDetailInfo',
            payload: {
                TaskID: this.props.match.params.TaskID,
                UserID: this.props.match.params.UserID
            }
        });
    }

    renderItem = (data, taskID) => {
        const rtnVal = [];
        let taskfrom = this.props.match.params.taskfrom;
        if (taskfrom.indexOf("qcontrollist") > -1) {
            taskfrom = taskfrom.split('-')[0];
        }
        data.map((item, key) => {
            if (item.FormMainID !== null) {
                switch (item.ID) {
                    case EnumPsOperationForm.Repair:
                        rtnVal.push(<p key={key} style={{ marginBottom: 0 }}><Button style={{ marginBottom: '5px' }} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/PatrolForm/RepairRecordDetail/${this.state.DGIMN}/${this.props.match.params.viewtype}/${taskfrom}/nop/${taskID}`));
                        }}>{item.CnName}</Button></p>);
                        break;
                    case EnumPsOperationForm.StopMachine:
                        rtnVal.push(<p key={key} style={{ marginBottom: 0 }}><Button style={{ marginBottom: '5px' }} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/PatrolForm/StopCemsInfo/${this.state.DGIMN}/${this.props.match.params.viewtype}/${taskfrom}/nop/${taskID}`));
                        }}>{item.CnName}</Button></p>);
                        break;
                    case EnumPsOperationForm.YhpReplace:
                        rtnVal.push(<p key={key} style={{ marginBottom: 0 }}><Button  style={{ marginBottom: '5px' }} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/PatrolForm/ConsumablesReplaceRecord/${this.state.DGIMN}/${this.props.match.params.viewtype}/${taskfrom}/nop/${taskID}`));
                        }}>{item.CnName}</Button></p>);
                        break;
                    case EnumPsOperationForm.StandardGasReplace:
                        rtnVal.push(<p key={key} style={{ marginBottom: 0 }}><Button  style={{ marginBottom: '5px' }} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/PatrolForm/StandardGasRepalceRecord/${this.state.DGIMN}/${this.props.match.params.viewtype}/${taskfrom}/nop/${taskID}`));
                        }}>{item.CnName}</Button></p>);
                        break;
                    case EnumPsOperationForm.CqfPatrol:
                        rtnVal.push(<p key={key} style={{ marginBottom: 0 }}><Button  style={{ marginBottom: '5px' }} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/PatrolForm/CompleteExtraction/${this.state.DGIMN}/${this.props.match.params.viewtype}/${taskfrom}/nop/${taskID}`));
                        }}>{item.CnName}</Button></p>);
                        break;
                    case EnumPsOperationForm.CyfPatrol:
                        rtnVal.push(<p key={key} style={{ marginBottom: 0 }}><Button  style={{ marginBottom: '5px' }} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/PatrolForm/DilutionSampling/${this.state.DGIMN}/${this.props.match.params.viewtype}/${taskfrom}/nop/${taskID}`));
                        }}>{item.CnName}</Button></p>);
                        break;
                    case EnumPsOperationForm.ClfPatrol:
                        rtnVal.push(<p key={key} style={{ marginBottom: 0 }}><Button  style={{ marginBottom: '5px' }} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/PatrolForm/DirectMeasurement/${this.state.DGIMN}/${this.props.match.params.viewtype}/${taskfrom}/nop/${taskID}`));
                        }}>{item.CnName}</Button></p>);
                        break;
                    case EnumPsOperationForm.CheckRecord:
                        rtnVal.push(<p key={key} style={{ marginBottom: 0 }}><Button  style={{ marginBottom: '5px' }} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/PatrolForm/JzRecordInfo/${this.state.DGIMN}/${this.props.match.params.viewtype}/${taskfrom}/nop/${taskID}`));
                        }}>{item.CnName}</Button></p>);
                        break;
                    case EnumPsOperationForm.TestRecord:
                        rtnVal.push(<p key={key} style={{ marginBottom: 0 }}><Button  style={{ marginBottom: '5px' }} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/PatrolForm/BdTestRecord/${this.state.DGIMN}/${this.props.match.params.viewtype}/${taskfrom}/nop/${taskID}`));
                        }}>{item.CnName}</Button></p>);
                        break;
                    case EnumPsOperationForm.DataException:
                        rtnVal.push(<p key={key} style={{ marginBottom: 0 }}><Button style={{ marginBottom: '5px' }} icon="check-circle-o" onClick={() => {
                            this.props.dispatch(routerRedux.push(`/PatrolForm/DeviceExceptionDetail/${this.state.DGIMN}/${this.props.match.params.viewtype}/${taskfrom}/nop/${taskID}`));
                        }}>{item.CnName}</Button></p>);
                        break;
                    default:
                        break;
                }
            }
        });
        return rtnVal;
    }

    //生成面包屑
    renderBreadCrumb = () => {
        const rtnVal = [];
        let listUrl = this.props.match.params.viewtype;
        let taskID = this.props.match.params.TaskID;
        let taskfrom = this.props.match.params.taskfrom;
        let histroyrecordtype = null;
        rtnVal.push({ Name: '首页', Url: '/' });
        switch (listUrl) {
            case 'datalistview':    //数据一栏
                rtnVal.push({ Name: '数据一览', Url: `/overview/${listUrl}` });
                break;
            case 'mapview':         //地图一栏
                rtnVal.push({ Name: '地图一览', Url: `/overview/${listUrl}` });
                break;
            case 'pielist':                //我的派单
                rtnVal.push({ Name: '我的派单', Url: `/account/settings/mypielist` });
                break;
            case 'workbench':
                rtnVal.push({ Name: '工作台', Url: `/${listUrl}` });
            default:
                break;
        }
        if (taskfrom === 'ywdsjlist') {     //大事记
            rtnVal.push({ Name: '运维大事记', Url: `/pointdetail/${this.props.match.params.DGIMN}/${listUrl}/${taskfrom}` });
        }
        else if (taskfrom === 'operationywdsjlist') {
            rtnVal.push({ Name: '运维大事记', Url: `/operation/ywdsjlist` });
        }
        else if (taskfrom.indexOf('qcontrollist') > -1) {    //质控记录（从表单进来时）
            taskfrom = taskfrom.split('-')[0]
            histroyrecordtype = taskfrom.split('-')[1];
            rtnVal.push({ Name: '质控记录', Url: `/pointdetail/${this.props.match.params.DGIMN}/${listUrl}/${taskfrom}/${histroyrecordtype}` });
        }

        rtnVal.push({ Name: '任务详情', Url: '' })
        return rtnVal;
    }

    //获取撤单按钮
    getCancelOrderButton = (createtime, TaskStatus) => {
        if (moment(createtime) > moment(new Date()).add(-7, 'day') && TaskStatus == 3) {
            return <Button onClick={this.cdShow}><Icon type="close-circle" />打回</Button>
        }
        else {
            return <Button disabled ><Icon type="close-circle" />打回</Button>
        }
    }
    cdShow = () => {
        this.setState({
            cdvisible: true
        })
    }
    cdClose = () => {
        this.setState({
            cdvisible: false
        })
    }
    cdOk = (TaskID) => {
        this.props.dispatch({
            type: 'task/GetPostRevokeTask',
            payload: {
                taskID: TaskID,
                userID: this.props.match.params.UserID,
                revokeReason: this.props.form.getFieldValue('reason'),
                reload: () => this.reloaddata(),
                close: () => this.cdClose()
            }
        })
    }


    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 250;

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                sm: { span: 5 },
            },
            wrapperCol: {
                sm: { span: 16 },
            },
        };
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
        let TaskStatus = '';//任务状态编码
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
        let DGIMN = null;
        const taskInfo = this.props.taskInfo;
        if (taskInfo.requstresult == EnumRequstResult.Success && taskInfo.data !== null) {
            data = taskInfo.data[0];
            DGIMN = data.DGIMN;
            TaskID = data.ID;
            TaskCode = data.TaskCode;
            PointName = data.PointName;
            EnterpriseName = data.EnterpriseName;
            TaskFrom = data.TaskFrom;
            EmergencyStatusText = data.EmergencyStatusText;
            TaskStatusText = data.TaskStatusText;
            TaskStatus = data.TaskStatus;
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
        var index=0;
        pics.map((item,key) => {
            index++;
            if (item === 'no') {
                fileList.push({
                    uid: index,
                    name: item,
                    status: 'done',
                    url: `/NoPic.png`,
                });
            } else {
                fileList.push({
                    uid: index,
                    name: item.replace('_thumbnail', ''),
                    status: 'done',
                    url: `${imgaddress}${item}`,
                });
            }

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
                key: 'Remark',
                align: 'center'
            }, {
                title: '处理人',
                width: '20%',
                dataIndex: 'CreateUserName',
                key: 'CreateUserName',
                align: 'center'
            }, {
                title: '创建时间',
                width: '20%',
                dataIndex: 'CreateTime',
                key: 'CreateTime',
                align: 'center'
            }, {
                title: '说明',
                width: '20%',
                dataIndex: 'TaskRemark',
                key: 'TaskRemark',
                align: 'center'
            }, {
                title: '处理状态',
                width: '10%',
                dataIndex: 'TaskStatusText',
                key: 'TaskStatusText',
                align: 'center'
            }];

        const upload = {
            showUploadList: { showPreviewIcon: true, showRemoveIcon: false },
            listType: 'picture-card',
            fileList: [...fileList]
        };
        if (this.props.isloading) {
            return (<Spin
                style={{
                    width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                size="large"
            />);
        }
        return (
            <div>
                <MonitorContent  {...this.props} breadCrumbList={this.renderBreadCrumb()}>


                    <Card title={<span style={{ fontWeight: '900' }}>任务详情</span>} extra={
                        <div>
                            <span style={{ marginRight: 20 }}>{this.getCancelOrderButton(CreateTime, TaskStatus)}</span>
                            <Button style={{ float: "right", marginRight: 30 }} onClick={() => {
                                this.props.history.goBack(-1);
                            }}><Icon type="left" />退回</Button>
                        </div>}>

                        <div style={{ height: SCREEN_HEIGHT }} className={styles.ExceptionDetailDiv}>
                            <Card title={<span style={{ fontWeight: '600' }}>基本信息</span>}>
                                <DescriptionList className={styles.headerList} size="large" col="3">
                                    <Description term="任务单号">{TaskCode}</Description>
                                    <Description term="排口" >{PointName}</Description>
                                    <Description term="企业">{EnterpriseName}</Description>
                                </DescriptionList>
                                <DescriptionList style={{ marginTop: 20 }} className={styles.headerList} size="large" col="3">
                                    <Description term="任务来源">{TaskFrom}</Description>
                                    <Description term="紧急程度"><div style={{ color: 'red' }}>{EmergencyStatusText}</div></Description>
                                    <Description term="任务状态"> <div style={{ color: '#32CD32' }}>{TaskStatusText}</div></Description>
                                    <Description term="任务内容">{TaskDescription}</Description>
                                </DescriptionList>
                                <DescriptionList style={{ marginTop: 20 }} className={styles.headerList} size="large" col="3">
                                    <Description term="运维人">{OperationsUserName}</Description>
                                    <Description term="创建时间">{CreateTime}</Description>
                                </DescriptionList>
                                {
                                    TaskType === EnumPatrolTaskType.PatrolTask ? null :
                                        <Divider style={{ marginBottom: 20 }} />
                                }
                                {
                                    TaskType === EnumPatrolTaskType.PatrolTask ? null :
                                        <Table rowKey={(record, index) => `complete${index}`} style={{ backgroundColor: 'white' }} bordered={false} dataSource={AlarmList} pagination={false} columns={columns} />
                                }

                            </Card>
                            <Card title={<span style={{ fontWeight: '900' }}>处理说明</span>} style={{ marginTop: 20 }}>
                                <DescriptionList className={styles.headerList} size="large" col="1">
                                    <Description>
                                        <TextArea rows={8} style={{ width: '600px' }} value={Remark}>

                                        </TextArea>
                                    </Description>
                                </DescriptionList>

                            </Card>
                            <Card title={<span style={{ fontWeight: '900' }}>处理记录</span>} style={{ marginTop: 20 }}>
                                <DescriptionList className={styles.headerList} size="large" col="1">
                                    <Description>
                                        {
                                            this.renderItem(RecordTypeInfo, TaskID)
                                        }
                                    </Description>
                                </DescriptionList>
                                <DescriptionList style={{ marginTop: 20 }} className={styles.headerList} size="large" col="2">
                                    <Description term="处理人">
                                        {OperationsUserName}
                                    </Description>
                                    <Description term="处理时间">
                                        {CompleteTime}
                                    </Description>
                                </DescriptionList>
                            </Card>
                            <Card title={<span style={{ fontWeight: '900' }}>附件</span>}>
                                <Upload
                                    {...upload}
                                    onPreview={this.handlePreview}
                                />
                            </Card>
                            <Card title={<span style={{ fontWeight: '900' }}>日志表</span>} style={{ marginTop: 20 }}>
                                <Table columns={LogColumn}
                                    rowKey={(record, index) => `complete${index}`}
                                    dataSource={TaskLogList}
                                    bordered={true}
                                    pagination={false}
                                />
                            </Card>
                        </div>
                    </Card>

                    <Modal
                        visible={this.state.cdvisible}
                        onCancel={this.cdClose}
                        onOk={() => this.cdOk(TaskID)}
                        title="打回说明"
                    >
                        <Form className="login-form">
                            <FormItem
                                {...formItemLayout}
                                label="说明"
                            >
                                {getFieldDecorator('reason', {
                                    rules: [{ required: true, message: '请输入打回说明' }],
                                })(
                                    <Input.TextArea rows='3' prefix={<Icon type="rollback" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                )}
                            </FormItem>
                        </Form>
                    </Modal>
                    <Modal width="65%" visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%', marginTop: '20px' }} src={this.state.previewImage} />
                    </Modal>
                </MonitorContent>

            </div>
        );
    }
}
