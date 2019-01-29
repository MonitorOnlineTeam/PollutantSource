import React, { Component } from 'react';
import { Form, Card, Radio, Row, Col, Switch, Timeline, Icon, Spin, Button } from 'antd';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import { connect } from 'dva';
import moment from 'moment';
import Ywdsjlistss from './Ywdsjlist.less';
import { EnumPatrolTaskType, EnumOperationTaskStatus } from '../../utils/enum';
import { routerRedux } from 'dva/router';
import SearchInput from '../../components/OverView/SearchInput';
import TreeStatus from '../../components/OverView/TreeStatus';
import TreeCard from '../../components/OverView/TreeCard';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import MonitorContent from '../../components/MonitorContent/index';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
@connect(({ task, overview, loading }) => ({
    loading: loading.effects['task/GetYwdsj'],
    OperationInfo: task.OperationInfo,
    IsOver: task.IsOver,
    datalist: overview.data,
    pollutantTypeloading: loading.effects['overview/getPollutantTypeList'],
    treedataloading: loading.effects['overview/querydatalist'],
    pollutantTypelist: overview.pollutantTypelist,
    pageIndex: task.pageIndex,
    pageSize: task.pageSize,
    DGIMN: task.DGIMN,
}))
export default class Ywdsjlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment(moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))],
            IsAlarmTimeout: true,
            beginTime: moment().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'),
            endTime: moment().format('YYYY-MM-DD 23:59:59'),
            taskType: 0,
            iconLoading: false,
            alarmStatus: true,
            pollutantTypeCode: "2",
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        var getDGIMN = localStorage.getItem('DGIMN')
        if (getDGIMN === null) {
            getDGIMN = '[object Object]';
        }
        dispatch({
            type: 'overview/querydatalist',
            payload: {
                map: true,
                pollutantTypes: this.state.pollutantTypeCode,
                Ywdsjlist: true,
                pageIndex: this.props.pageIndex,
                pageSize: this.props.pageSize,
                taskType: this.state.taskType,
                IsAlarmTimeout: this.state.IsAlarmTimeout,
                beginTime: this.state.rangeDate[0].format('YYYY-MM-DD 00:00:00'),
                endTime: this.state.rangeDate[1].format('YYYY-MM-DD 23:59:59'),
                DGIMN: getDGIMN,
                isLoadMoreOpt: false,
            }
        });
    }

    GetYwdsj = (pageIndex, taskType, IsAlarmTimeout, beginTime, endTime, isLoadMoreOpt) => {
        this.props.dispatch({
            type: 'task/GetYwdsj',
            payload: {
                pageIndex: pageIndex,
                pageSize: this.props.pageSize,
                taskType: taskType,
                DGIMNs: localStorage.getItem('DGIMN'),
                IsAlarmTimeout: IsAlarmTimeout,
                beginTime: beginTime,
                endTime: endTime,
                isLoadMoreOpt: isLoadMoreOpt
            }
        });
    };

    _handleDateChange = (date, dateString) => {
        this.setState(
            {
                rangeDate: date,
                beginTime: dateString[0],
                endTime: dateString[1],
            }
        );
        this.GetYwdsj(this.props.pageIndex, this.state.taskType, this.state.IsAlarmTimeout, dateString[0], dateString[1], false, localStorage.getItem('DGIMN'));
    };

    onChange = (e) => {
        let taskType;
        if (e.target.value == EnumPatrolTaskType.ExceptionTask) {
            taskType = EnumPatrolTaskType.ExceptionTask;
            this.setState({
                taskType: EnumPatrolTaskType.ExceptionTask
            });
        } else if (e.target.value == EnumPatrolTaskType.PatrolTask) {
            taskType = EnumPatrolTaskType.PatrolTask;
            this.setState({
                taskType: EnumPatrolTaskType.PatrolTask
            });
        } else {
            taskType = 0;
            this.setState({
                taskType: 0
            });
        }

        this.GetYwdsj(this.props.pageIndex, taskType, this.state.IsAlarmTimeout, this.state.beginTime, this.state.endTime, false, localStorage.getItem('DGIMN'));
    }

    OpenonChange = (checked) => {
        this.setState({
            IsAlarmTimeout: checked,
            alarmStatus: checked
        });

        this.GetYwdsj(this.props.pageIndex, this.state.taskType, checked, this.state.beginTime, this.state.endTime, false, localStorage.getItem('DGIMN'));
    }

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
        let pageIndex = this.props.pageIndex + 1;
        this.setState({ pageIndex: pageIndex });
        this.GetYwdsj(pageIndex, this.state.taskType, this.state.IsAlarmTimeout, this.state.beginTime, this.state.endTime, true, localStorage.getItem('DGIMN'));
        this.setState({ iconLoading: false });
    }
    //查询
    onSerach = (value) => {
        this.setState({
            searchName: value
        })
        const { pollutantTypeCode } = this.state;
        this.searchData(pollutantTypeCode, value);
    }
    getStatusImg = (value) => {
        if (value === 0) {
            return <img style={{ width: 15 }} src="/gisunline.png" />;
        } if (value === 1) {
            return <img style={{ width: 15 }} src="/gisnormal.png" />;
        } if (value === 2) {
            return <img style={{ width: 15 }} src="/gisover.png" />;
        }
        return <img style={{ width: 15 }} src="/gisexception.png" />;
    }
    //重新加载
    searchData = (pollutantTypeCode, searchName) => {
        var getDGIMN = localStorage.getItem('DGIMN')
        if (getDGIMN === null) {
            getDGIMN = '[object Object]';
        }
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                map: true,
                pollutantTypes: pollutantTypeCode,
                pointName: searchName,
                RepairHistoryRecords: true,
                pageIndex: this.props.pageIndex,
                pageSize: this.props.pageSize,
                BeginTime: this.state.rangeDate[0].format('YYYY-MM-DD 00:00:00'),
                EndTime: this.state.rangeDate[1].format('YYYY-MM-DD 23:59:59'),
                DGIMN: getDGIMN,
                search: true,
                callback: (data) => {
                    if (data !== null) {
                        const existdata = data.find((value, index, arr) => {
                            return value.DGIMN == getDGIMN
                        });
                        if (existdata == undefined) {
                            this.props.dispatch({
                                type: 'task/GetYwdsj',
                                payload: {
                                    pageIndex: this.props.pageIndex,
                                    pageSize: this.props.pageSize,
                                    taskType: this.state.taskType,
                                    DGIMNs: '1',
                                    IsAlarmTimeout: this.state.IsAlarmTimeout,
                                    beginTime: this.state.rangeDate[0].format('YYYY-MM-DD 00:00:00'),
                                    endTime: this.state.rangeDate[1].format('YYYY-MM-DD 23:59:59'),
                                    isLoadMoreOpt: this.state.iconLoading,
                                }
                            });
                        }
                        else {
                            this.props.dispatch({
                                type: 'task/GetYwdsj',
                                payload: {
                                    pageIndex: this.props.pageIndex,
                                    pageSize: this.props.pageSize,
                                    taskType: this.state.taskType,
                                    DGIMNs: getDGIMN,
                                    IsAlarmTimeout: this.state.IsAlarmTimeout,
                                    beginTime: this.state.rangeDate[0].format('YYYY-MM-DD 00:00:00'),
                                    endTime: this.state.rangeDate[1].format('YYYY-MM-DD 23:59:59'),
                                    isLoadMoreOpt: this.state.iconLoading,
                                }
                            });
                        }
                    }

                }
            },
        });
    }
    treeCilck = (row, key) => {
        localStorage.setItem('DGIMN', row.DGIMN);
        this.GetYwdsj(this.props.pageIndex, this.state.taskType, this.state.IsAlarmTimeout, this.state.beginTime, this.state.endTime, false, row.DGIMN);
    };
    renderItem = (data) => {
        if (data != null && data.length > 0) {
            const rtnVal = [];
            data.map((item, key) => {
                rtnVal.push(<Timeline.Item key={key} dot={<div className={Ywdsjlistss.DateLoad} />}>
                    <p className={Ywdsjlistss.taskDate}>{item.NodeDate}</p>
                </Timeline.Item>);
                item.NodeList.map((item1, key1) => {
                    if (item1.TaskStatus === EnumOperationTaskStatus.Underway) {
                        let value = `于${item1.CreateTime}，开始任务，正在进行中`;
                        var valueName = `${item1.OperationsUserName}`;
                        rtnVal.push(
                            <Timeline.Item key={key1 + '1' + key} dot={<img style={{ width: '38px', height: '38px' }} src="/patrol.png" />}>
                                <p className={Ywdsjlistss.taskDetail}><span style={{ color: '#40B0F5', marginRight: '10px' }}>{valueName}</span>{value}</p>
                                <div className={Ywdsjlistss.seeDetail} onClick={() => {
                                    this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfo/${this.props.match.params.viewtype}/operationywdsjlist/${item1.ID}/${localStorage.getItem('DGIMN')}`));
                                }}>
                                    查看详情
                                </div>
                            </Timeline.Item>
                        );
                    } else {
                        if (item1.TaskType === EnumPatrolTaskType.PatrolTask) {
                            var value = `于${item1.CompleteTime}完成例行任务`;
                            var valueName = `${item1.OperationsUserName}`;
                            rtnVal.push(
                                <Timeline.Item key={key1 + '2' + key} dot={<img style={{ width: '38px', height: '38px' }} src="/patrol.png" />}>
                                    <p className={Ywdsjlistss.taskDetail}><span style={{ color: '#40B0F5', marginRight: '10px' }}>{valueName}</span>{value}</p>
                                    <div className={Ywdsjlistss.seeDetail} onClick={() => {
                                        this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfo/${undefined}/operationywdsjlist/${item1.ID}/${localStorage.getItem('DGIMN')}`));
                                    }}>
                                        查看详情
                                </div>
                                </Timeline.Item>
                            );
                        } else if (item1.TaskType === EnumPatrolTaskType.ExceptionTask) {
                            var value1 = `于${item1.CompleteTime === null ? '' : item1.CompleteTime}完成应急任务`;
                            var valueName1 = `${item1.OperationsUserName}`;
                            rtnVal.push(
                                <Timeline.Item key={key1 + '3' + key} dot={<img style={{ width: '38px', height: '38px' }} src="/emergeny.png" />}>
                                    <p className={Ywdsjlistss.taskDetail}><span style={{ color: '#40B0F5', marginRight: '10px' }}>{valueName1}</span>{value1}</p>
                                    <div className={Ywdsjlistss.seeDetail} onClick={() => {
                                        this.props.dispatch(routerRedux.push(`/TaskDetail/emergencydetailinfo/${undefined}/operationywdsjlist/${item1.ID}/${localStorage.getItem('DGIMN')}`));
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
                                <Timeline.Item key={key1 + '4' + key} dot={<img style={{ width: '38px', height: '38px' }} src="/alarmpic.png" />}>
                                    <p className={Ywdsjlistss.taskDetail}><span style={{ color: '#40B0F5', marginRight: '10px' }}>{valueName2}</span>{value2}</p>
                                    <p className={Ywdsjlistss.pLoad}>{value3}</p>
                                </Timeline.Item>
                            );
                        }
                    }
                });
            });
            return rtnVal;
        }
        if (this.props.loading != undefined && !this.props.loading) {
            return (<div>暂无数据</div>);
        }
    }

    render() {
        const { pollutantTypelist, treedataloading, datalist, pollutantTypeloading } = this.props;
        const { match, routerData, children } = this.props;
        const extraContent = (
            <div style={{ height: '30px', lineHeight: '30px' }}>
                <RadioGroup defaultValue={this.state.taskType} onChange={this.onChange}>
                    <RadioButton value={0}>全部</RadioButton>
                    <RadioButton value={EnumPatrolTaskType.ExceptionTask}>应急任务</RadioButton>
                    <RadioButton value={EnumPatrolTaskType.PatrolTask}>例行任务</RadioButton>
                </RadioGroup>
                <RangePicker_ style={{ width: 350, textAlign: 'left', marginLeft: '10px' }} onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                <Switch style={{ marginLeft: '10px', marginBottom: '6px' }} checkedChildren="报警响应超时" unCheckedChildren="报警响应未超时" defaultChecked={this.state.alarmStatus} onChange={this.OpenonChange} />
            </div>
        );
        var data = [];
        var spining = true;
        if (!this.props.treedataloading && !this.props.pollutantTypeloading && !this.props.loading) {
            spining = this.props.loading;
            data = this.props.OperationInfo;
        }

        const IsOver = this.props.IsOver;

        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    { Name: '首页', Url: '/' },
                    { Name: '智能运维', Url: '' },
                    { Name: '运维大事记', Url: '' }
                ]
            }>
                <div className={Ywdsjlistss.cardTitle}>
                    <Row>
                        <Col>
                            <div style={{
                                width: 450,
                                position: 'absolute',
                                borderRadius: 10
                            }}
                            >
                                <div style={{ marginLeft: 5, marginTop: 5 }}>
                                    <div><SearchInput
                                        onSerach={this.onSerach}
                                        style={{ marginTop: 5, marginBottom: 5, width: 400 }} searchName="排口名称" /></div>
                                    <div style={{ marginTop: 5 }}>
                                        <TreeCardContent style={{ overflow: 'auto', width: 400, background: '#fff' }}
                                            getHeight='calc(100vh - 200px)'
                                            pollutantTypeloading={pollutantTypeloading}
                                            getStatusImg={this.getStatusImg} isloading={treedataloading}
                                            treeCilck={this.treeCilck} treedatalist={datalist} PollutantType={this.state.pollutantTypeCode} ifSelect={true} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col style={{ width: document.body.clientWidth - 470, height: 'calc(100vh - 150px)', float: 'right' }}>
                            <div style={{ marginRight: 10, marginTop: 10 }}>
                                <Spin style={{
                                    marginTop: '20%',
                                }} spinning={spining}>
                                    <Card extra={extraContent} bordered={false}>
                                        {
                                            <div style={{ height: 'calc(100vh - 245px)' }} className={Ywdsjlistss.divTimeLine}>
                                                <Timeline mode="left">
                                                    {
                                                        this.renderItem(data)
                                                    }
                                                </Timeline>
                                                {data != null && data.length > 0 ? (IsOver ? <div>已加载全部</div> : <Button
                                                    loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                                                    加载更多
                        </Button>) : ''}
                                            </div>}
                                    </Card>
                                </Spin>
                            </div>

                        </Col>
                    </Row>
                </div>
            </MonitorContent>
        );
    }
}
