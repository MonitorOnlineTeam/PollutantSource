import React, { Component } from 'react';
import { Form, Card, Checkbox, Row, Col, Switch, Timeline, Icon, Spin, Button } from 'antd';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import { connect } from 'dva';
import moment from 'moment';
import styless from '../ReplacementPartAdd/index.less';
import Ywdsjlistss from './Ywdsjlist.less';
import {EnumPatrolTaskType} from '../../utils/enum';
import { routerRedux } from 'dva/router';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['应急任务', '例行任务'];
const defaultCheckedList = ['应急任务', '例行任务'];
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
        this.state = {
            rangeDate: [moment(moment(new Date()).subtract(7, 'day').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))],
            pageIndex: pageIndex,
            pageSize: pageSize,
            IsAlarmTimeout: true,
            beginTime: moment().subtract(7, 'day').format('YYYY-MM-DD 00:00:00'),
            endTime: moment().format('YYYY-MM-DD 23:59:59'),
            taskType: 0,
            checkedList: defaultCheckedList,
            iconLoading: false
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
                // DGIMNs: this.props.match.params.pointcode,
                DGIMNs: 'sgjt001003',
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
                beginTime: dateString[0],
                endTime: dateString[1],
                pageIndex: pageIndex
            }
        );
        this.GetYwdsj(pageIndex, this.state.taskType, this.state.IsAlarmTimeout, dateString[0], dateString[1], false);
    };

    onChange=(checkedList) => {
        this.setState({
            checkedList: checkedList,
            pageIndex: pageIndex
        });
        let taskType;
        if (checkedList.length === 1 && checkedList[0] === '应急任务') {
            taskType = EnumPatrolTaskType.ExceptionTask;
            this.setState({
                taskType: EnumPatrolTaskType.ExceptionTask
            });
        }

        if (checkedList.length === 1 && checkedList[0] === '例行任务') {
            taskType = EnumPatrolTaskType.PatrolTask;
            this.setState({
                taskType: EnumPatrolTaskType.PatrolTask
            });
        }

        if (checkedList.length === 2 || checkedList.length === 0) {
            taskType = 0;
            this.setState({
                taskType: 0
            });
        }

        this.GetYwdsj(pageIndex, taskType, this.state.IsAlarmTimeout, this.state.beginTime, this.state.endTime, false);
    };

    OpenonChange=(checked) => {
        this.setState({
            IsAlarmTimeout: checked,
            pageIndex: pageIndex
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

    renderSimpleForm() {
        return (
            <Form layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={9} sm={24}>
                        <FormItem label="开始时间">
                            <RangePicker_ style={{width: 350}} onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                        </FormItem>
                    </Col>
                    <Col md={5} sm={24}>
                        <FormItem label="任务状态">
                            <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                        </FormItem>
                    </Col>
                    <Col md={5} sm={24}>
                        <span>
                            报警响应超时:&nbsp;
                        </span>
                        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={true} onChange={this.OpenonChange} />
                    </Col>
                </Row>
            </Form>
        );
    }

    renderForm() {
        return this.renderSimpleForm();
    }
    renderItem=(data) => {
        if (data != null && data.length > 0) {
            const rtnVal = [];
            data.map((item) => {
                rtnVal.push(<Timeline.Item dot={<div className={Ywdsjlistss.DateLoad} />}>
                    <p style={{color: '#66C7F9', marginLeft: '-100px'}}>{item.NodeDate}</p>
                </Timeline.Item>);
                item.NodeList.map((item1) => {
                    if (item1.TaskType === EnumPatrolTaskType.PatrolTask) {
                        var value = `于${item1.CompleteTime}完成例行任务`;
                        var valueName = `${item1.OperationsUserName}`;
                        rtnVal.push(
                            <Timeline.Item dot={<img style={{width: '38px', height: '38px'}} src="../../../patrol.png" />}>
                                <p style={{marginLeft: '10px'}}><span style={{color: '#40B0F5', marginRight: '10px'}}>{valueName}</span>{value}</p>
                                <p><Button type="primary" size="small" style={{fontSise: '10px'}} onClick={() => {
                                    this.props.dispatch(routerRedux.push(`/pointdetail/${this.props.match.params.pointcode}/emergencydetailinfo/${item1.ID}`));
                                }
                                }>查看详情</Button></p>
                            </Timeline.Item>
                        );
                    } else if (item1.TaskType === EnumPatrolTaskType.ExceptionTask) {
                        var value1 = `于${item1.CompleteTime === null ? '' : item1.CompleteTime}完成应急任务`;
                        var valueName1 = `${item1.OperationsUserName}`;
                        rtnVal.push(
                            <Timeline.Item dot={<img style={{width: '38px', height: '38px'}} src="../../../emergeny.png" />}>
                                <p style={{marginLeft: '10px'}}><span style={{color: '#40B0F5', marginRight: '10px'}}>{valueName1}</span>{value1}</p>
                                <p><Button type="primary" size="small" style={{fontSise: '10px'}} onClick={() => {
                                    this.props.dispatch(routerRedux.push(`/pointdetail/${this.props.match.params.pointcode}/emergencydetailinfo/${item1.ID}`));
                                }
                                }>查看详情</Button></p>
                            </Timeline.Item>
                        );
                    } else {
                        var value2 = `需要对当前排口进行处理，`;
                        var valueName2 = `${item1.OperationsUserName}`;
                        var value3 = `${item1.Remark === null ? '' : item1.Remark}`;
                        rtnVal.push(
                            <Timeline.Item dot={<img style={{width: '38px', height: '38px'}} src="../../../alarm.png" />}>
                                <p style={{marginLeft: '10px'}}><span style={{color: '#40B0F5', marginRight: '10px'}}>{valueName2}</span>{value2}</p>
                                <p className={Ywdsjlistss.pLoad}>{value3}</p>
                            </Timeline.Item>
                        );
                    }
                });
            });
            return rtnVal;
        } else {
            return (<div>暂无数据</div>);
        }
    }

    render() {
        let data = this.props.OperationInfo;
        const IsOver = this.props.IsOver;

        return (
            <div style={{ width: '100%', height: 'calc(100vh - 222px)' }}>
                <Card >
                    <div bordered="false" className={styless.tableListForm}>{this.renderSimpleForm()}</div>
                    <div>
                        { this.props.isloading ? <div style={{height: 'calc(100vh - 400px)'}} className={Ywdsjlistss.divTimeLine}><Spin className={Ywdsjlistss.divTimeLine} /></div>
                            : <div style={{height: 'calc(100vh - 400px)'}} className={Ywdsjlistss.divTimeLine}><Timeline mode="left">
                                {
                                    this.renderItem(data)
                                }
                            </Timeline>
                            {data != null && data.length > 0 ? (IsOver ? <div>已加载全部</div> : <Button
                                loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                             加载更多
                            </Button>):''}
                            </div> }

                    </div>
                </Card>
            </div>

        );
    }
}
