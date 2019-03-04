import React, { Component } from 'react';
import {
    Card,
    Row,
    Col,
    Table,
    Form,
    Spin,
    Tag,
    Calendar,
    Badge,
    Modal,
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import styles from './OperationCalendar.less';
import { routerRedux } from 'dva/router';
import Details from '../../components/OperationCalendar/Details';
import SearchInput from '../../components/OverView/SearchInput';
import TreeStatus from '../../components/OverView/TreeStatus';
import TreeCard from '../../components/OverView/TreeCard';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import MonitorContent from '../../components/MonitorContent/index';

@connect(({ task, overview, workbenchmodel, loading }) => ({
    loading: loading.effects['workbenchmodel/getOperationCalendarData'],
    datalist: overview.data,
    pollutantTypeloading: loading.effects['overview/getPollutantTypeList'],
    treedataloading: loading.effects['overview/querydatalist'],
    pollutantTypelist: overview.pollutantTypelist,
    operation: workbenchmodel.OperationCalendar,
}))
/*
页面：运维日历
*/
export default class OperationCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollutantTypeCode: "2",
            defaultDateValue: moment(),
            dateValue: moment(),
            dateType: 'month',
            visible: false,
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
                OperationCalendar: true,
                DGIMN: getDGIMN,
            }
        });
    }
    GetData = (DGIMN) => {
        this.props.dispatch({
            type: 'workbenchmodel/getOperationCalendarData',
            payload: {
                IsQueryAllUser: true,
                DGIMNs: DGIMN,
            }
        });
    };

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
                OperationCalendar: true,
                DGIMN: getDGIMN,
                search: true,
                callback: (data) => {
                    if (data !== null) {
                        const existdata = data.find((value, index, arr) => {
                            return value.DGIMN == getDGIMN
                        });
                        if (existdata == undefined) {
                            this.GetData('1');
                        }
                        else {
                            this.props.dispatch({
                                type: 'workbenchmodel/getOperationCalendarData',
                                payload: {
                                    IsQueryAllUser: true,
                                    DGIMNs: getDGIMN,
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
        this.GetData(row.DGIMN);
    };
    /**
   * 更新model中的state
   */
    updateState = (payload) => {
        this.props.dispatch({
            type: 'workbenchmodel/updateState',
            payload: payload,
        });
    }
    //日历日显示内容
    dateCellRender = (value) => {
        let exceptionlistData = [];
        let commonlistData = [];
        var returnResult = [];
        let operationingday = null;
        let thisData = this.props.operation.tempTableDatas.filter(m => moment(m.CreateTime).format('YYYY-MM-DD') === value.format("YYYY-MM-DD"));
        if (!this.props.treedataloading && !this.props.pollutantTypeloading && !this.props.loading) {
            if (thisData && thisData.length > 0) {
                let ExceptionTypeText = thisData.filter(m => m.ExceptionTypeText !== "");
                if (ExceptionTypeText && ExceptionTypeText.length > 0) {
                    for (var i = 0; i < ExceptionTypeText.length; i++) {
                        for (var j = i + 1; j < ExceptionTypeText.length; j++) {
                            if (ExceptionTypeText[i].TaskTypeText === ExceptionTypeText[j].TaskTypeText && ExceptionTypeText[i].ExceptionTypeText === ExceptionTypeText[j].ExceptionTypeText) {
                                ++i;
                            }
                        }
                        exceptionlistData.push(ExceptionTypeText[i]);
                    }
                    exceptionlistData.map((item) => {
                        returnResult.push({
                            'type': 'warning',
                            'content': item.TaskTypeText + '-' + item.ExceptionTypeText
                        })
                    })
                    operationingday = ExceptionTypeText.filter(m => m.TaskStatus === 2);
                }
            }
        }
        return (
            <div style={{ height: '90%' }} >
                <div style={{ height: '80%' }}>
                    <ul className={styles.day} >
                        {
                            returnResult.map((item, key) => (
                                <li key={key}>
                                    <Tag key={key} style={{ marginBottom: 1, marginTop: 1 }} color={item.ExceptionTypeText === '报警响应异常' ? '#F70303' : item.ExceptionTypeText === '工作超时' ? '#F79503' : '#F7C603'}>{item.content}</Tag>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div style={{ height: '20%', textAlign: 'right' }}>
                    {operationingday === null ? null : operationingday.length === 0 ? null : <Tag color="#F79855">{'进行中' + operationingday.length + '个'}</Tag>}
                </div>
            </div>


        );
    }
    //日历月显示内容
    monthCellRender = (value) => {
        let listData = [];
        var returnResult = [];
        let operationingmonth = null;
        let thisData = this.props.operation.tempTableDatas.filter(m => moment(m.CreateTime).format('YYYY-MM') === value.format("YYYY-MM"));
        if (thisData && thisData.length > 0) {
            let ExceptionTypeText = thisData.filter(m => m.ExceptionTypeText !== "");
            if (ExceptionTypeText && ExceptionTypeText.length > 0) {
                returnResult.push({
                    'TaskType': '异常任务：',
                    'Content': ExceptionTypeText.length + '次'
                })
                operationingmonth = ExceptionTypeText.filter(m => m.TaskStatus === 2);
            }
        }
        return (
            <div style={{ height: '65%' }} >
                <div style={{ height: '80%' }}>
                    <ul className={styles.month} >
                        {
                            returnResult.map((item, key) => (
                                <li key={key}>
                                    <Tag key={key} style={{ height: 26, fontSize: 20, paddingBottom: 2, paddingTop: 2 }} color='#E83939'>{item.TaskType}{item.Content}</Tag>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div style={{ height: '20%', textAlign: 'right', whiteSpace: 'nowrap', textOverflow: 'hidden' }}>
                    {operationingmonth === null ? null : operationingmonth.length === 0 ? null : <Tag color="#F79855">{'进行中' + operationingmonth.length + '个'}</Tag>}
                </div>
            </div>
        );
    }
    dateSelect = (date) => {
        let dateValue = date;
        //过滤，没有数据不弹出对话框
        const data = this.state.dateType === 'month' ? this.props.operation.tempTableDatas.filter(m => moment(m.CreateTime).format('YYYY-MM-DD') === date.format("YYYY-MM-DD")) : this.props.operation.tempTableDatas.filter(m => moment(m.CreateTime).format('YYYY-MM') === date.format("YYYY-MM"));
        if (data.length != 0) {
            this.setState({
                visible: true,
            });
        }
        this.setState({
            dateValue: dateValue
        });
        if (date < moment()) {
            if (moment(this.props.operation.beginTime) < date && moment(this.props.operation.endTime) > date) {
            }
            else {
                this.getdataByDateTime(date);
 
            }
        }
    }
    onPanelChange = (date, datestring) => {
        this.setState({ dateType: datestring, dateValue: date })
        debugger
        if (date < moment()) {
            if (moment(this.props.operation.beginTime) < date && moment(this.props.operation.endTime) > date) {
            }
            else {
                this.getdataByDateTime(date);
            }
        }
    }
    getdataByDateTime=(date)=>{
        let begintimes = date.format('YYYY-01-01 00:00:00');
        let endtimes = moment(begintimes).add(1, 'years').format('YYYY-01-01 00:00:00');
        this.updateState({
            OperationCalendar: {
                ...this.props.operation,
                ...{
                    beginTime: begintimes,
                    endTime: endtimes,
                }
            }
        });
        this.GetData(localStorage.getItem('DGIMN'));
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    render() {
        const { pollutantTypelist, treedataloading, datalist, pollutantTypeloading } = this.props;
        const { detailed, statusImg, selectpoint, pointName } = this.state;
        var dataSource = [];
        var spining = true;
        if (!this.props.treedataloading && !this.props.pollutantTypeloading && !this.props.loading) {
            spining = this.props.loading;
            dataSource = this.props.HistoryRepairHistoryRecods === null ? null : this.props.HistoryRepairHistoryRecods;
        }
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
            <MonitorContent {...this.props} breadCrumbList={
                [
                    { Name: '首页', Url: '/' },
                    { Name: '智能运维', Url: '' },
                    { Name: '运维日历', Url: '' }
                ]
            }>
                <div className={styles.cardTitle}>
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
                                    <Card bordered={false} style={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}>
                                        <div>
                                            {
                                                <Calendar value={this.state.dateValue} dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} onSelect={this.dateSelect} onPanelChange={this.onPanelChange} />
                                            }
                                        </div>
                                    </Card>
                                </Spin>
                            </div>
                            <Modal
                                footer={null}
                                title="详情"
                                width='60%'
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            >
                                <Details data={this.props.operation.tempTableDatas} dateValue={this.state.dateValue} dataType={this.state.dateType} />
                            </Modal>
                        </Col>
                    </Row>
                </div>
            </MonitorContent>
        );
    }
}
