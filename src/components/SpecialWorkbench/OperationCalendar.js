import React, { PureComponent } from 'react';
import { Card, Calendar, Badge, Row, Col, Tag, Table } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './OperationCalendar.less';


const datas = [{
    "TaskID":"7c32858c-fedc-4367-ac58-4a7e64569547",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"6号脱硫入口",
    "DGIMN":"62262431qlsp03",
    "OperationName":"印飞星",
    "TaskType":2,
    "TaskTypeText":"应急任务",
    "ExceptionTypeText":"报警响应异常,打卡异常,工作超时",
    "TaskFrom":3,
    "TaskFromText":"专工派单",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-10-07 14:31:47"
},
{
    "TaskID":"7c32858c-fedc-4367-ac58-4a7e64569547",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"6号脱硫入口",
    "DGIMN":"62262431qlsp03",
    "OperationName":"印飞星",
    "TaskType":2,
    "TaskTypeText":"应急任务",
    "ExceptionTypeText":"报警响应异常,打卡异常,工作超时",
    "TaskFrom":3,
    "TaskFromText":"专工派单",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-09-30 14:31:47"
},
{
    "TaskID":"7c32858c-fedc-4367-ac58-4a7e64569547",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"6号脱硫入口",
    "DGIMN":"62262431qlsp03",
    "OperationName":"印飞星",
    "TaskType":2,
    "TaskTypeText":"应急任务",
    "ExceptionTypeText":"报警响应异常,打卡异常,工作超时",
    "TaskFrom":3,
    "TaskFromText":"专工派单",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-09-30 14:31:47"
},
{
    "TaskID":"fa220b66-5a37-4436-9cf2-8333a1e21733",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"6号脱硫入口",
    "DGIMN":"62262431qlsp03",
    "OperationName":"印飞星",
    "TaskType":1,
    "TaskTypeText":"例行任务",
    "ExceptionTypeText":"打卡异常,工作超时",
    "TaskFrom":1,
    "TaskFromText":"手动创建",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-10-08 14:23:20"
},
{
    "TaskID":"c8156dc3-344e-4ba3-85c4-083429b0b09c",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"9号脱硫出口",
    "DGIMN":"62030231jnsp03",
    "OperationName":"印飞星",
    "TaskType":2,
    "TaskTypeText":"应急任务",
    "ExceptionTypeText":"打卡异常",
    "TaskFrom":2,
    "TaskFromText":"报警响应",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-10-08 11:28:44"
},
{
    "TaskID":"f152a834-e4da-4fd9-bf3f-6e76e4300324",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"10号脱硫入口",
    "DGIMN":"62262431qlsp01",
    "OperationName":"印飞星",
    "TaskType":2,
    "TaskTypeText":"应急任务",
    "ExceptionTypeText":"报警响应异常,打卡异常",
    "TaskFrom":2,
    "TaskFromText":"报警响应",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-10-08 11:26:49"
},
{
    "TaskID":"ab2425dc-8233-4189-8973-b3b61344c69e",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"1号脱硫出口",
    "DGIMN":"399435xe8vd8pm",
    "OperationName":"印飞星",
    "TaskType":2,
    "TaskTypeText":"应急任务",
    "ExceptionTypeText":"打卡异常",
    "TaskFrom":2,
    "TaskFromText":"报警响应",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-10-08 11:21:23"
},
{
    "TaskID":"56566d45-f6fd-4a9a-8c36-84bed6f29ab7",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"3号脱硫出口",
    "DGIMN":"62020131jhdp02",
    "OperationName":"印飞星",
    "TaskType":2,
    "TaskTypeText":"应急任务",
    "ExceptionTypeText":"报警响应异常,打卡异常,工作超时",
    "TaskFrom":2,
    "TaskFromText":"报警响应",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-10-08 11:16:02"
},
{
    "TaskID":"77565346-06ef-4668-92fd-0c36bf63b40a",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"117号脱硫出口",
    "DGIMN":"62020131jhdp03",
    "OperationName":"印飞星",
    "TaskType":2,
    "TaskTypeText":"应急任务",
    "ExceptionTypeText":"报警响应异常,打卡异常,工作超时",
    "TaskFrom":3,
    "TaskFromText":"专工派单",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-10-07 14:38:18"
},
{
    "TaskID":"e5258a56-be28-4163-9f57-9dffbe52dac4",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"2号脱硫入口",
    "DGIMN":"399435xe8vd7pm",
    "OperationName":"印飞星",
    "TaskType":2,
    "TaskTypeText":"应急任务",
    "ExceptionTypeText":"报警响应异常,打卡异常,工作超时",
    "TaskFrom":3,
    "TaskFromText":"专工派单",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-10-08 13:47:06"
},
{
    "TaskID":"07fae097-869a-48a0-84e1-33cf667901c1",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"2号脱硫入口",
    "DGIMN":"399435xe8vd7pm",
    "OperationName":"印飞星",
    "TaskType":2,
    "TaskTypeText":"应急任务",
    "ExceptionTypeText":"报警响应异常,打卡异常",
    "TaskFrom":3,
    "TaskFromText":"专工派单",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-10-07 11:32:47"
},
{
    "TaskID":"6ee418f4-55fe-4685-805e-1dbea4a8db86",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"2号脱硫入口",
    "DGIMN":"399435xe8vd7pm",
    "OperationName":"印飞星",
    "TaskType":2,
    "TaskTypeText":"应急任务",
    "ExceptionTypeText":"报警响应异常,打卡异常",
    "TaskFrom":3,
    "TaskFromText":"专工派单",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-10-08 11:30:22"
},
{
    "TaskID":"6db42e91-c1cd-40df-bc29-9f53dbbb4fc6",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"1号脱销入口",
    "DGIMN":"399435xe9pa73m",
    "OperationName":"印飞星",
    "TaskType":2,
    "TaskTypeText":"应急任务",
    "ExceptionTypeText":"",
    "TaskFrom":3,
    "TaskFromText":"专工派单",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-10-06 19:25:45"
},
{
    "TaskID":"e451d951-eca4-431a-bbaf-43c0a1f00b6d",
    "EnterpriseName":"首钢京唐钢铁联合有限责任公司",
    "Abbreviation":"京唐首钢",
    "PointName":"1号脱硫入口",
    "DGIMN":"399435xe8vd9pm",
    "OperationName":"印飞星",
    "TaskType":2,
    "TaskTypeText":"应急任务",
    "ExceptionTypeText":"",
    "TaskFrom":3,
    "TaskFromText":"专工派单",
    "TaskStatus":3,
    "TaskStatusText":"已完成",
    "Remark":"",
    "CreateTime":"2019-10-05 15:20:29"
}
]
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
        this.setState({ dateType: datestring, selectedValue: date });
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
        let listData = [];//this.props.operation.tempTableDatas
        let thisData = datas.filter(m => moment(m.CreateTime).format('YYYY-MM-DD') === value.format("YYYY-MM-DD"));
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
                                text.split(',').map((item, key) => (
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
                        () => this.props.dispatch(routerRedux.push(`/TaskDetail/EmergencyDetailInfoLayout/workbench/nop/${record.TaskID}/${record.DGIMN}`))
                    }
                    > 详情
                    </a>
                )
            }];

        return <Table
            rowKey={(record, index) => `complete${index}`}
            columns={columns}
            dataSource={this.state.dateType === 'month' ? datas.filter(m => moment(m.CreateTime).format('YYYY-MM-DD') === this.state.selectedValue.format("YYYY-MM-DD")) : datas.filter(m => moment(m.CreateTime).format('YYYY-MM') === this.state.selectedValue.format("YYYY-MM"))}
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
                        title={`运维记录 - ${this.state.dateType === 'month' ? `${this.state.selectedValue.format('YYYY')}年${this.state.selectedValue.format('MM')}月${this.state.selectedValue.format('DD')}日` : `${this.state.selectedValue.format('YYYY')}年${this.state.selectedValue.format('MM')}月`} `}
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