import React, { Component } from 'react';
import { Card, Radio, Switch, Timeline, Spin, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import Ywdsjlistss from './Ywdsjlist.less';
import { EnumPatrolTaskType, EnumOperationTaskStatus } from '../../utils/enum';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
@connect(({ tasklist, loading }) => ({
    isloading: loading.effects['tasklist/GetYwdsj'],
    taskLists: tasklist.taskLists,
    isOver: tasklist.isOver,
    pageIndex: tasklist.pageIndex,
    taskType: tasklist.taskType, //任务类型
    beginTime: tasklist.beginTime, //运维大事记开始时间
    endTime: tasklist.endTime, //运维大事记结束时间
    IsAlarmTimeout: tasklist.IsAlarmTimeout, //是否报警响应超时
    DGIMN: tasklist.DGIMN
}))
class YwdsjlistContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment(moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))],
            iconLoading: false
        };
    }

    componentDidMount() {
        const condition = {
            isOver: false,//是否加载完毕
            pageIndex: 1,
            pageSize: 10,
            taskType: 0, //任务类型（0：全部，1：巡检任务，2：应急任务）
            beginTime: moment().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'), //运维大事记开始时间
            endTime: moment().format('YYYY-MM-DD 23:59:59'), //运维大事记结束时间
            IsAlarmTimeout: false, //是否报警响应超时
            DGIMN: this.props.pointcode == null ? "1" : this.props.pointcode
        };

        this.ChangeModelState(condition);
        if(this.props.taskfrom!=="operationywdsjlist"){
            this.GetYwdsj(false);
        }
    }

    GetYwdsj = (isLoadMoreOpt) => {
        this.props.dispatch({
            type: 'tasklist/GetYwdsj',
            payload: {
                isLoadMoreOpt: isLoadMoreOpt
            }
        });
    };

    _handleDateChange = (date, dateString) => {
        const condition = {
            beginTime: dateString[0],
            endTime: dateString[1],
            pageIndex: 1
        };
        this.ChangeModelState(condition);
        this.setState(
            {
                rangeDate: [moment(moment(dateString[0]).format('YYYY-MM-DD 00:00:00')), moment(moment(dateString[1]).format('YYYY-MM-DD 23:59:59'))],
            }
        );
        this.GetYwdsj(false);
    };

    onChange = (e) => {
        let taskType;
        if (e.target.value == EnumPatrolTaskType.ExceptionTask) {
            taskType = EnumPatrolTaskType.ExceptionTask;
        } else if (e.target.value == EnumPatrolTaskType.PatrolTask) {
            taskType = EnumPatrolTaskType.PatrolTask;
        } else {
            taskType = 0;
        }
        const condition = {
            taskType,
            pageIndex: 1
        };
        this.ChangeModelState(condition);
        this.GetYwdsj(false);
    }

    OpenonChange = (checked) => {
        const condition = {
            IsAlarmTimeout: checked,
            pageIndex: 1
        };
        this.ChangeModelState(condition);
        this.GetYwdsj(false);
    }

    EnterIconLoading = () => {
        this.setState({ iconLoading: true });
        const condition = {
            pageIndex: this.props.pageIndex + 1
        };
        this.ChangeModelState(condition);
        this.GetYwdsj(true);
        this.setState({ iconLoading: false });
    }

    ChangeModelState = (ywdsjCondition) => {
        this.props.dispatch({
            type: 'tasklist/updateState',
            payload: { ...ywdsjCondition }
        });
    }

    renderItem = (data) => {
        if (data != null && data.length > 0) {
            const rtnVal = [];
            let value = null;
            let valueName = null;
            let exceptionTypeText=``;
            data.map((item, key) => {
                rtnVal.push(<Timeline.Item key={key} dot={<div className={Ywdsjlistss.DateLoad} />}>
                    <p className={Ywdsjlistss.taskDate}>{item.NodeDate}</p>
                            </Timeline.Item>);
                item.NodeList.map((item1, key1) => {
                    if (item1.TaskType == EnumPatrolTaskType.PatrolTask) { //巡检任务
                        if(item1.TaskStatus==EnumOperationTaskStatus.WaitFor){
                            value=`例行任务于${item1.CreateTime}被创建，待执行`;
                           
                            rtnVal.push(
                                <Timeline.Item key={`${key1 }2${ key}`} dot={<img style={{width: '38px', height: '38px'}} src="/patrol.png" />}>
                                    <p className={Ywdsjlistss.taskDetail}>{value}</p>
                                    <div
                                        className={Ywdsjlistss.seeDetail}
                                        onClick={() => {
                                            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfolayout/${this.props.viewtype}/${this.props.taskfrom}/${item1.ID}/${this.props.DGIMN}`));
                                        }}
                                    >
                                        查看详情
                                    </div>
                                </Timeline.Item>
                            );
                        }else if(item1.TaskStatus == EnumOperationTaskStatus.Underway){
                            value=`例行任务于${item1.CreateTime}被创建，正在执行中，执行人：`;
                            valueName=`${item1.OperationsUserName}`;
                            rtnVal.push(
                                <Timeline.Item key={`${key1 }2${ key}`} dot={<img style={{width: '38px', height: '38px'}} src="/patrol.png" />}>
                                    <p className={Ywdsjlistss.taskDetail}>{value}<span style={{color: '#40B0F5', marginRight: '10px'}}>{valueName}</span></p>
                                    <div
                                        className={Ywdsjlistss.seeDetail}
                                        onClick={() => {
                                            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfolayout/${this.props.viewtype}/${this.props.taskfrom}/${item1.ID}/${this.props.DGIMN}`));
                                        }}
                                    >
                                        查看详情
                                    </div>
                                </Timeline.Item>
                            );
                        } else if (item1.TaskStatus == EnumOperationTaskStatus.Completed) {

                            value = `于${item1.CompleteTime}完成例行任务`;
                            valueName = `${item1.OperationsUserName}`;
                            rtnVal.push(
                                <Timeline.Item key={`${key1 }2${ key}`} dot={<img style={{width: '38px', height: '38px'}} src="/patrol.png" />}>
                                    <p className={Ywdsjlistss.taskDetail}><span style={{color: '#40B0F5', marginRight: '10px'}}>{valueName}</span>{value}</p>
                                    <div
                                        className={Ywdsjlistss.seeDetail}
                                        onClick={() => {
                                            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfolayout/${this.props.viewtype}/${this.props.taskfrom}/${item1.ID}/${this.props.DGIMN}`));
                                        }}
                                    >
                                        查看详情
                                    </div>
                                </Timeline.Item>
                            );
                        }
                    } else if (item1.TaskType == EnumPatrolTaskType.ExceptionTask) { //应急任务
                        if(item1.TaskStatus==EnumOperationTaskStatus.WaitFor){
                            value=`应急任务于${item1.CreateTime}被创建，待执行，执行人：`;
                            rtnVal.push(
                                <Timeline.Item key={`${key1 }3${ key}`} dot={<img style={{width: '38px', height: '38px'}} src="/emergeny.png" />}>
                                    <p className={Ywdsjlistss.taskDetail}>{value}</p>
                                    {
                                       item1.ExceptionTypeText?<div style={{height:'30px',lineHeight:'30px'}}><img style={{width:'18px',height:'18px',marginBottom:'4px',marginLeft:'20px',marginRight:'5px'}} src="/alarm_small.png"/>{item.ExceptionTypeText}</div>:''
                                    }
                                    <div
                                        className={Ywdsjlistss.seeDetail}
                                        onClick={() => {
                                            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfolayout/${this.props.viewtype}/${this.props.taskfrom}/${item1.ID}/${this.props.DGIMN}`));
                                        }}
                                    >
                                            查看详情
                                    </div>
                                </Timeline.Item>
                            );
                        }else if(item1.TaskStatus == EnumOperationTaskStatus.Underway){
                            value=`应急任务于${item1.CreateTime}被创建，正在执行中，执行人：`;
                            valueName=`${item1.OperationsUserName}`;
                            rtnVal.push(
                                <Timeline.Item key={`${key1 }3${ key}`} dot={<img style={{width: '38px', height: '38px'}} src="/emergeny.png" />}>
                                    <p className={Ywdsjlistss.taskDetail}>{value}<span style={{color: '#40B0F5', marginRight: '10px'}}>{valueName}</span></p>
                                    {
                                       item1.ExceptionTypeText?<div style={{height:'30px',lineHeight:'30px'}}><img style={{width:'18px',height:'18px',marginBottom:'4px',marginLeft:'20px',marginRight:'5px'}} src="/alarm_small.png"/>{item1.ExceptionTypeText}</div>:''
                                    }
                                    <div
                                        className={Ywdsjlistss.seeDetail}
                                        onClick={() => {
                                            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfolayout/${this.props.viewtype}/${this.props.taskfrom}/${item1.ID}/${this.props.DGIMN}`));
                                        }}
                                    >
                                            查看详情
                                    </div>
                                </Timeline.Item>
                            );
                        }else if(item1.TaskStatus == EnumOperationTaskStatus.Completed){
                            value = `于${item1.CompleteTime}完成应急任务`;
                            valueName = `${item1.OperationsUserName}`;
                            rtnVal.push(
                                <Timeline.Item key={`${key1 }3${ key}`} dot={<img style={{width: '38px', height: '38px'}} src="/emergeny.png" />}>
                                    <p className={Ywdsjlistss.taskDetail}><span style={{color: '#40B0F5', marginRight: '10px'}}>{valueName}</span>{value}</p>
                                    {
                                       item1.ExceptionTypeText?<div style={{height:'30px',lineHeight:'30px'}}><img style={{width:'18px',height:'18px',marginBottom:'4px',marginLeft:'20px',marginRight:'5px'}} src="/alarm_small.png"/>{item1.ExceptionTypeText}</div>:''
                                    }
                                    <div
                                        className={Ywdsjlistss.seeDetail}
                                        onClick={() => {
                                            this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfolayout/${this.props.viewtype}/${this.props.taskfrom}/${item1.ID}/${this.props.DGIMN}`));
                                        }}
                                    >
                                            查看详情
                                    </div>
                                </Timeline.Item>
                            );
                        }
                    } else {
                        let value2 = `需要对当前排口进行处理，`;
                        let valueName2 = `${item1.OperationsUserName}`;
                        let value3 = `${item1.Remark === null ? '' : item1.Remark}`;
                        rtnVal.push(
                            <Timeline.Item key={`${key1 }4${ key}`} dot={<img style={{ width: '38px', height: '38px' }} src="/alarmpic.png" />}>
                                <p className={Ywdsjlistss.taskDetail}><span style={{ color: '#40B0F5', marginRight: '10px' }}>{valueName2}</span>{value2}</p>
                                <p className={Ywdsjlistss.pLoad}>{value3}</p>
                            </Timeline.Item>
                        );
                    }
                });
            });
            return rtnVal;
        }
        return (<div style={{ paddingLeft: '20%' }}>暂无数据</div>);
    }

    render() {
        const extraContent = (
            <div style={{ height: '30px', lineHeight: '30px' }}>
                <RadioGroup defaultValue={this.props.taskType} onChange={this.onChange}>
                    <RadioButton value={0}>全部</RadioButton>
                    <RadioButton value={EnumPatrolTaskType.ExceptionTask}>应急任务</RadioButton>
                    <RadioButton value={EnumPatrolTaskType.PatrolTask}>例行任务</RadioButton>
                </RadioGroup>
                <RangePicker_ style={{ width: 350, textAlign: 'left', marginLeft: '10px' }} onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                <Switch style={{ marginLeft: '10px', marginBottom: '6px' }} checkedChildren="报警响应超时" unCheckedChildren="全部" defaultChecked={this.props.IsAlarmTimeout} onChange={this.OpenonChange} />
            </div>
        );

        let data = this.props.taskLists;
        const isOver = this.props.isOver;
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
            <Card extra={extraContent} bordered={false}>
                {
                    <div style={{ height: this.props.height }} className={Ywdsjlistss.divTimeLine}>
                        <Timeline mode="left">
                            {
                                this.renderItem(data)
                            }
                        </Timeline>
                        {data != null && data.length > 0 ? isOver ? <div>已加载全部</div> : <Button
                            loading={this.state.iconLoading}
                            onClick={this.EnterIconLoading}
                        >
                            加载更多
                        </Button> : ''}
                    </div>}
            </Card>
        );
    }
}
export default YwdsjlistContent;