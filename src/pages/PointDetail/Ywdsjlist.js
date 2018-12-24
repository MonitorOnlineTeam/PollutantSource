import React, { Component } from 'react';
import { Form, Card, Radio, Row, Col, Switch, Timeline, Icon, Spin, Button } from 'antd';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import { connect } from 'dva';
import moment from 'moment';
import Ywdsjlistss from './Ywdsjlist.less';
import {EnumPatrolTaskType} from '../../utils/enum';
import { routerRedux } from 'dva/router';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const pageIndex = 1;
const pageSize = 10;
@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetYwdsj'],
    OperationInfo: task.OperationInfo,
    IsOver: task.IsOver
}))
export default class Ywdsjlist extends Component {
    constructor(props) {
        super(props);
        const beginTime = this.props.match.params.begintime;
        const endTime = this.props.match.params.begintime;
        this.state = {
            rangeDate: [moment(moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))],
            pageIndex: pageIndex,
            pageSize: pageSize,
            IsAlarmTimeout: true,
            beginTime: moment().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'),
            endTime: moment().format('YYYY-MM-DD 23:59:59'),
            taskType: 0,
            iconLoading: false,
            alarmStatus:true
        };
    }

    componentDidMount() {
        this.GetYwdsj(this.state.pageIndex, this.state.taskType, this.state.IsAlarmTimeout, this.state.beginTime, this.state.endTime, false);
    }

    GetYwdsj=(pageIndex, taskType, IsAlarmTimeout, beginTime, endTime, isLoadMoreOpt) => {
        this.props.dispatch({
            type: 'task/GetYwdsj',
            payload: {
                pageIndex: pageIndex,
                pageSize: this.state.pageSize,
                taskType: taskType,
                DGIMNs: this.props.match.params.pointcode,
                IsAlarmTimeout: IsAlarmTimeout,
                beginTime: beginTime,
                endTime: endTime,
                isLoadMoreOpt: isLoadMoreOpt
            }
        });
    };

    _handleDateChange=(date, dateString) => {
        this.setState(
            {
                rangeDate: [moment(moment(dateString[0]).format('YYYY-MM-DD 00:00:00')), moment(moment(dateString[1]).format('YYYY-MM-DD 23:59:59'))],
                beginTime: dateString[0],
                endTime: dateString[1],
                pageIndex: pageIndex
            }
        );
        this.GetYwdsj(pageIndex, this.state.taskType, this.state.IsAlarmTimeout, dateString[0], dateString[1], false);
    };

    onChange=(e)=> {
        let taskType;
        if (e.target.value == EnumPatrolTaskType.ExceptionTask) {
            taskType=EnumPatrolTaskType.ExceptionTask;
            this.setState({
                taskType: EnumPatrolTaskType.ExceptionTask
            });
        }else if (e.target.value == EnumPatrolTaskType.PatrolTask) {
            taskType = EnumPatrolTaskType.PatrolTask;
            this.setState({
                taskType: EnumPatrolTaskType.PatrolTask
            });
        }else{
            taskType = 0;
            this.setState({
                taskType: 0
            });
        }

        this.GetYwdsj(pageIndex, taskType, this.state.IsAlarmTimeout, this.state.beginTime, this.state.endTime, false);
    }

    OpenonChange=(checked) => {
        this.setState({
            IsAlarmTimeout: checked,
            pageIndex: pageIndex,
            alarmStatus:checked
        });

        this.GetYwdsj(pageIndex, this.state.taskType, checked, this.state.beginTime, this.state.endTime, false);
    }

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
        let pageIndex = this.state.pageIndex + 1;
        this.setState({ pageIndex: pageIndex });
        this.GetYwdsj(pageIndex, this.state.taskType, this.state.IsAlarmTimeout, this.state.beginTime, this.state.endTime, true);
        this.setState({ iconLoading: false });
    }

    renderItem=(data) => {
        if (data != null && data.length > 0) {
            const rtnVal = [];
            data.map((item) => {
                rtnVal.push(<Timeline.Item dot={<div className={Ywdsjlistss.DateLoad} />}>
                    <p className={Ywdsjlistss.taskDate}>{item.NodeDate}</p>
                </Timeline.Item>);
                item.NodeList.map((item1) => {
                    if (item1.TaskType === EnumPatrolTaskType.PatrolTask) {
                        var value = `于${item1.CompleteTime}完成例行任务`;
                        var valueName = `${item1.OperationsUserName}`;
                        rtnVal.push(
                            <Timeline.Item dot={<img style={{width: '38px', height: '38px'}} src="../../../patrol.png" />}>
                                <p className={Ywdsjlistss.taskDetail}><span style={{color: '#40B0F5', marginRight: '10px'}}>{valueName}</span>{value}</p>
                                <div className={Ywdsjlistss.seeDetail} onClick={() => {
                                    this.props.dispatch(routerRedux.push(`/emergencydetailinfo/${item1.ID}`));
                                }}>
                                查看详情
                                </div>
                            </Timeline.Item>
                        );
                    } else if (item1.TaskType === EnumPatrolTaskType.ExceptionTask) {
                        var value1 = `于${item1.CompleteTime === null ? '' : item1.CompleteTime}完成应急任务`;
                        var valueName1 = `${item1.OperationsUserName}`;
                        rtnVal.push(
                            <Timeline.Item dot={<img style={{width: '38px', height: '38px'}} src="../../../emergeny.png" />}>
                                <p className={Ywdsjlistss.taskDetail}><span style={{color: '#40B0F5', marginRight: '10px'}}>{valueName1}</span>{value1}</p>
                                <div className={Ywdsjlistss.seeDetail} onClick={() => {
                                    this.props.dispatch(routerRedux.push(`/emergencydetailinfo/${item1.ID}`));
                                }}>
                                查看详情
                                </div>
                            </Timeline.Item>
                        );
                    } else {
                        var value2 = `需要对当前排口进行处理，`;
                        var valueName2 = `${item1.OperationsUserName}`;
                        var value3 = `${item1.Remark === null ? '' : item1.Remark}`;
                        rtnVal.push(
                            <Timeline.Item dot={<img style={{width: '38px', height: '38px'}} src="../../../alarmpic.png" />}>
                                <p className={Ywdsjlistss.taskDetail}><span style={{color: '#40B0F5', marginRight: '10px'}}>{valueName2}</span>{value2}</p>
                                <p className={Ywdsjlistss.pLoad}>{value3}</p>
                            </Timeline.Item>
                        );
                    }
                });
            });
            return rtnVal;
        }
        return (<div style={{paddingLeft: '20%'}}>暂无数据</div>);
    }

    render() {
        const extraContent = (
            <div style={{height:'30px',lineHeight:'30px'}}>
            <RadioGroup defaultValue={this.state.taskType} onChange={this.onChange}>
            <RadioButton value={0}>全部</RadioButton>
            <RadioButton value={EnumPatrolTaskType.ExceptionTask}>应急任务</RadioButton>
            <RadioButton value={EnumPatrolTaskType.PatrolTask}>例行任务</RadioButton>
            </RadioGroup>
              <RangePicker_ style={{width: 350,textAlign:'left',marginLeft:'10px'}} onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
              <Switch style={{marginLeft:'10px',marginBottom:'6px'}} checkedChildren="报警响应超时" unCheckedChildren="报警响应未超时" defaultChecked={this.state.alarmStatus} onChange={this.OpenonChange} />
            </div>
          );
        let data = this.props.OperationInfo;
        const IsOver = this.props.IsOver;
        if (this.props.isloading) {
            return (<Spin
                style={{ width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center' }}
                size="large"
            />);
        }
        return (
            <div style={{ width: '100%', height: 'calc(100vh - 222px)' }}>
                <Card extra={extraContent} bordered={false}>
                    {
                    <div style={{height: 'calc(100vh - 400px)'}} className={Ywdsjlistss.divTimeLine}>
                            <Timeline mode="left">
                            {
                                    this.renderItem(data)
                                }
                        </Timeline>
                            {data != null && data.length > 0 ? (IsOver ? <div>已加载全部</div> : <Button
                            loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                             加载更多
                        </Button>) : ''}
                        </div> }
                </Card>
            </div>

        );
    }
}
