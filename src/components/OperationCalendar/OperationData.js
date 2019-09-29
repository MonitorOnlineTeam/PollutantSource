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
import styles from './OperationData.less';
import { routerRedux } from 'dva/router';
import Details from '../../components/OperationCalendar/Details';
import SearchInput from '../../components/OverView/SearchInput';
import TreeStatus from '../../components/OverView/TreeStatus';
import TreeCard from '../../components/OverView/TreeCard';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import MonitorContent from '../../components/MonitorContent/index';
import { EnumPollutantTypeCode } from '../../utils/enum';

@connect(({ overview, workbenchmodel, loading }) => ({
    loading: loading.effects['workbenchmodel/getOperationCalendarData'],
    datalist: overview.data,
    pollutantTypeloading: loading.effects['overview/getPollutantTypeList'],
    treedataloading: loading.effects['overview/querydatalist'],
    OperationCalendar: workbenchmodel.OperationCalendar,
}))
/*
页面：运维日历(右侧组件)
*/
export default class OperationData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }
    componentDidMount() {
        this.GetData();
    }
    //查询数据
    GetData = () => {
        this.updateState({
            OperationCalendar: {
                ...this.props.OperationCalendar,
                ...{
                    DGIMNs: this.props.DGIMN,
                    IsQueryAllUser: true,
                }
            }
        });
        this.props.dispatch({
            type: 'workbenchmodel/getOperationCalendarData',
            payload: {
            }
        });
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
        let thisData = this.props.OperationCalendar.tempTableDatas.filter(m => moment(m.CreateTime).format('YYYY-MM-DD') === value.format("YYYY-MM-DD"));
        if (!this.props.loading) {
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
        let thisData = this.props.OperationCalendar.tempTableDatas.filter(m => moment(m.CreateTime).format('YYYY-MM') === value.format("YYYY-MM"));
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
        const { OperationCalendar } = this.props;
        //过滤，没有数据不弹出对话框
        const data = OperationCalendar.dateType === 'month' ? OperationCalendar.tempTableDatas.filter(m => moment(m.CreateTime).format('YYYY-MM-DD') === date.format("YYYY-MM-DD")) : OperationCalendar.tempTableDatas.filter(m => moment(m.CreateTime).format('YYYY-MM') === date.format("YYYY-MM"));
        if (data.length != 0) {
            this.setState({
                visible: true,
            });
        }
        this.updateState({
            OperationCalendar: {
                ...this.props.OperationCalendar,
                ...{
                    dateValue: dateValue
                }
            }
        });
        if (date < moment()) {
            if (moment(OperationCalendar.beginTime) < date && moment(OperationCalendar.endTime) > date) {
            }
            else {
                this.getdataByDateTime(date);
            }
        }
    }
    onPanelChange = (date, datestring) => {
        const { OperationCalendar } = this.props;
        this.updateState({
            OperationCalendar: {
                ...this.props.OperationCalendar,
                ...{
                    dateType: datestring,
                    dateValue: date
                }
            }
        });
        if (date < moment()) {
            if (moment(OperationCalendar.beginTime) < date && moment(OperationCalendar.endTime) > date) {
            }
            else {
                this.getdataByDateTime(date);
            }
        }
    }
    getdataByDateTime = (date) => {
        let begintimes = date.format('YYYY-01-01 00:00:00');
        let endtimes = moment(begintimes).add(1, 'years').format('YYYY-01-01 00:00:00');
        this.updateState({
            OperationCalendar: {
                ...this.props.OperationCalendar,
                ...{
                    beginTime: begintimes,
                    endTime: endtimes,
                }
            }
        });
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
        const { OperationCalendar } = this.props;
        var spining = true;
        if (!this.props.loading) {
            spining = this.props.loading;
        }
        return (

            <div style={{ marginRight: 10, marginTop: 10 }}>
                <Spin style={{
                    marginTop: '20%',
                }} spinning={spining}>
                    <Card bordered={false} style={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}>
                        <div>
                            {
                                <Calendar value={OperationCalendar.dateValue} dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} onSelect={this.dateSelect} onPanelChange={this.onPanelChange} />
                            }
                        </div>
                    </Card>
                </Spin>
                <Modal
                    footer={null}
                    title="详情"
                    width='60%'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Details data={OperationCalendar.tempTableDatas} dateValue={OperationCalendar.dateValue} dataType={OperationCalendar.dateType} />
                </Modal>
            </div>
        );
    }
}
