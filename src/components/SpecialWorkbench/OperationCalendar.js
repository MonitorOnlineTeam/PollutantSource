import React, { PureComponent } from 'react';
import { Card, Calendar, Badge,Row, Col ,Tag,Table} from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './OperationCalendar.less';

@connect(({
    loading,
    workbenchmodel,
}) => ({
    loadingOperationData: loading.effects['workbenchmodel/getOperationData'],
    operation: workbenchmodel.operation,
}))
/**
 * 运维日历（5）
 */
class OperationCalendar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: moment(),
            dateType: 'month',
        };
    }

    componentWillMount() {
        this.getOperationData(1);
    }

    /**
     * 智能运维_日历表插件基础渲染
     */
    renderCalendar = () => <Calendar value={this.state.selectedValue} fullscreen={false} onSelect={this.onCalendarSelect} dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} onPanelChange={this.onPanelChange} />

    /**
     * 智能运维_日历表时间选择事件
     */
    onCalendarSelect = (value) => {
        let selectValue = value.format('YYYY-MM-DD 00:00:00');
        this.setState({
            selectedValue: value
        });
        if (value.format("YYYY-MM") === this.state.selectedValue.format("YYYY-MM")) {
            return null;
        }
        if (value.format("YYYY-MM") !== moment(this.props.operation.beginTime).format("YYYY-MM")) {
            this.updateState({
                operation: {
                    ...this.props.operation,
                    ...{
                        beginTime: moment(selectValue).add(-1, 'months').format('YYYY-MM-01 00:00:00'),
                        endTime: moment(selectValue).add(2, 'months').format('YYYY-MM-01 00:00:00'),
                    }
                }
            });
            this.getOperationData(1);
        }
    }

    //日期面板变化回调
    onPanelChange = (date, datestring) => {
        this.setState({ dateType: datestring,selectedValue:date});
    }

    /**
     * 更新model中的state
     */
    updateState = (payload) => {
        this.props.dispatch({
            type: 'workbenchmodel/updateState',
            payload: payload,
        });
    }

    /**
     * 智能运维_更新运维数据
     */
    getOperationData = (pageIndex) => {
        this.props.dispatch({
            type: 'workbenchmodel/getOperationData',
            payload: {},
        });
    }

    /**
 * 智能运维_日历表插件渲染任务数据
 */
    dateCellRender = (value) => {
        let listData = [];
        let thisData = this.props.operation.tempTableDatas.filter(m => moment(m.CreateTime).format('YYYY-MM-DD') === value.format("YYYY-MM-DD"));
        if (thisData && thisData.length > 0) {
            let ExceptionTypeText = thisData.filter(m => m.ExceptionTypeText !== "");
            if (ExceptionTypeText && ExceptionTypeText.length > 0) {
                listData = [{ type: 'warning', content: '' }];
            } else {
                listData = [{ type: 'success', content: '' }];
            }
        }

        return (
            <ul className="events">
                {
                    listData.map(item => (
                        <li key={item.content}>
                            <Badge status={item.type} text={item.content} />
                        </li>
                    ))
                }
            </ul>
        );
    }

    monthCellRender = (value) => {
        const num = this.getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }

    getMonthData = (value) => {
    }

    /**
     * 智能运维_渲染运维历史记录表格
     */
    renderOperationTable = () => {
        const columns = [
            {
                title: '排口名称',
                dataIndex: 'PointName',
                render: (text, record) => {
                    if (record.TaskType === 2)
                        return <div style={{ position: 'relative' }}>{text}<Tag style={{ position: 'absolute', top: -10 }} color="#f50">应急</Tag></div>;
                    return text;
                }
            },
            {
                title: '运维状态',
                dataIndex: 'ExceptionTypeText',
                render: (text, record) => {
                    if (!text)
                        return <Tag color="rgb(76,205,122)">正常</Tag>;
                    return (
                        <div>
                            {
                                text.split(',').map((item,key) => (
                                    <Tag key={key} color="rgb(244,6,94)">{item}</Tag>
                                ))
                            }
                        </div>
                    );
                }
            },
            {
                title: '运维人',
                dataIndex: 'OperationName',
                render: (text, record) => {
                    if (record.TaskStatus === 2)
                        return <div style={{ position: 'relative' }}>{text}<Tag style={{ marginLeft: 7 }} color="#faad14">进行中</Tag></div>;
                    return text;
                }
            }, {
                title: '操作',
                dataIndex: 'opt',
                render: (text, record) => (

                    <a onClick={
                        () => this.props.dispatch(routerRedux.push(`/TaskDetail/EmergencyDetailInfo/workbench/nop/${record.TaskID}/${record.DGIMN}`))
                    }
                    > 详情
                    </a>
                )
            }];

        return <Table
            key="oprationtable"
            columns={columns}
            dataSource={this.state.dateType === 'month' ? this.props.operation.tempTableDatas.filter(m => moment(m.CreateTime).format('YYYY-MM-DD') === this.state.selectedValue.format("YYYY-MM-DD")) : this.props.operation.tempTableDatas.filter(m => moment(m.CreateTime).format('YYYY-MM') === this.state.selectedValue.format("YYYY-MM"))}
            size="small"
            pagination={{ pageSize: 5 }}
        />;
    }

    render() {
        return (
            <Row gutter={24}>
                <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                    <Card style={{}}>
                        <Card.Grid style={{ width: '100%' }}>
                            <div className={styles.calendarDiv}>
                                <div style={{ textAlign: 'left', marginBottom: -35 }}>
                                    <div style={{
                                        width: 6,
                                        height: 6,
                                        backgroundColor: '#faad14',
                                        display: 'inline-block',
                                        borderRadius: '100%',
                                        cursor: 'pointer',
                                        marginRight: 3
                                    }}
                                    /> <span style={{ cursor: 'pointer' }}> 异常任务</span>
                                    <div style={{
                                        width: 6,
                                        height: 6,
                                        backgroundColor: '#52c41a',
                                        display: 'inline-block',
                                        borderRadius: '100%',
                                        cursor: 'pointer',
                                        marginLeft: 20,
                                        marginRight: 3
                                    }}
                                    /><span style={{ cursor: 'pointer' }}> 正常任务</span>
                                </div>
                                {
                                    this.renderCalendar()
                                }
                            </div>
                        </Card.Grid>
                    </Card>
                </Col>
                <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                    <Card
                        loading={this.props.loadingOperationData}
                        title={`运维记录 - ${this.state.dateType==='month'? `${this.state.selectedValue.format('YYYY')}年${this.state.selectedValue.format('MM')}月${this.state.selectedValue.format('DD')}日`:`${this.state.selectedValue.format('YYYY')}年${this.state.selectedValue.format('MM')}月`} `}
                        style={{}}
                    >
                        <Card.Grid style={{ width: '100%', height: 297, padding: 15 }}>
                            {
                                this.renderOperationTable()
                            }
                        </Card.Grid>
                    </Card>
                </Col>
            </Row>


        );
    }
}

export default OperationCalendar;