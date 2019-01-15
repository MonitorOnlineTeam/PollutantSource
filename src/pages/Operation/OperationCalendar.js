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

@connect(({ task, overview, workbenchmodel, loading }) => ({
    loading: loading.effects['workbenchmodel/getOperationCalendarData'],
    datalist: overview.data,
    pollutantTypeloading: loading.effects['overview/getPollutantTypeList'],
    treedataloading: loading.effects['overview/querydatalist'],
    pollutantTypelist: overview.pollutantTypelist,
    operation: workbenchmodel.operation,
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
        dispatch({
            type: 'overview/getPollutantTypeList',
            payload: {
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
    //当前选中的污染物类型
    getNowPollutantType = (key) => {
        this.setState({
            pollutantTypeCode: key
        })
        const { searchName } = this.state;
        this.reloadData(key, searchName);
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
                callback: (data) => {
                    const existdata = data.find((value, index, arr) => {
                        return value.DGIMN == getDGIMN
                    });
                    if (existdata == undefined) {
                        this.GetData('1');
                    }
                }
            },
        });
    }
    //重新加载
    reloadData = (pollutantTypeCode, searchName) => {
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
            },
        });
    }
    treeCilck = (row, key) => {
        localStorage.setItem('DGIMN', row.DGIMN);
        this.GetData(row.DGIMN);
    };
    //日历日显示内容
    dateCellRender = (value) => {
        let exceptionlistData = [];
        let commonlistData = [];
        var returnResult = [];
        let thisData = this.props.operation.tempTableDatas.filter(m => moment(m.CreateTime).format('YYYY-MM-DD') === value.format("YYYY-MM-DD"));
        if (thisData && thisData.length > 0) {
            let ExceptionTypeText = thisData.filter(m => m.ExceptionTypeText !== "");
            // let CommonTypeText = thisData.filter(m => m.ExceptionTypeText === "");
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
            }
            // if (CommonTypeText && CommonTypeText.length > 0) {
            //     for (var i = 0; i < CommonTypeText.length; i++) {
            //         for (var j = i + 1; j < CommonTypeText.length; j++) {
            //             if (CommonTypeText[i].TaskTypeText === CommonTypeText[j].TaskTypeText) {
            //                 ++i;
            //             }
            //         }
            //         commonlistData.push(CommonTypeText[i]);
            //     }
            //     commonlistData.map((item) => {
            //         returnResult.push({
            //             'type': 'success',
            //             'content': item.TaskTypeText + '-' + '正常'
            //         })
            //     })
            // }
        }
        return (
            <ul className={styles.day} >
                {
                    returnResult.map(item => (
                        <li key={item.content}>
                            {/* <Badge style={{ marginBottom: 3 }} status={item.type} /> */}
                            <Tag style={{ marginBottom: 1, marginTop: 1 }} color={item.ExceptionTypeText === '报警响应异常' ? '#F70303' : item.ExceptionTypeText === '工作超时' ? '#F79503' : '#F7C603'}>{item.content}</Tag>
                        </li>
                    ))
                }
            </ul>
        );
    }
    //日历月显示内容
    monthCellRender = (value) => {
        let listData = [];
        var returnResult = [];
        let thisData = this.props.operation.tempTableDatas.filter(m => moment(m.CreateTime).format('YYYY-MM') === value.format("YYYY-MM"));
        if (thisData && thisData.length > 0) {
            let ExceptionTypeText = thisData.filter(m => m.ExceptionTypeText !== "");
            // let CommonTypeText = thisData.filter(m => m.ExceptionTypeText === "");
            if (ExceptionTypeText && ExceptionTypeText.length > 0) {
                returnResult.push({
                    'TaskType': '异常任务：',
                    'Content': ExceptionTypeText.length + '次'
                })
            }
            // if (CommonTypeText && CommonTypeText.length > 0) {
            //     returnResult.push({
            //         'TaskType': '正常任务：',
            //         'Content': CommonTypeText.length + '次'
            //     })
            // }

        }
        return (
            <ul className={styles.month} >
                {
                    returnResult.map(item => (
                        <li key={item.TaskType}>

                            {/* <span>{item.TaskType}</span> */}
                            <Tag style={{ height: 26, fontSize: 20, paddingBottom: 2, paddingTop: 2 }} color='#E83939'>{item.TaskType}{item.Content}</Tag>
                        </li>
                    ))
                }
            </ul>
        );
    }
    dateSelect = (date) => {
        this.setState({
            visible: true,
            dateValue: date,
        });

    }
    onPanelChange = (date, datestring) => {
        this.setState({ dateType: datestring })
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
        const dataSource = this.props.HistoryRepairHistoryRecods === null ? null : this.props.HistoryRepairHistoryRecods;
        const columns = [{
            title: '校准人',
            width: '20%',
            dataIndex: 'CreateUserID',
            key: 'CreateUserID'
        }, {
            title: '维修项目',
            width: '45%',
            dataIndex: 'RecordItem',
            key: 'RecordItem',
            render: (text, record) => {
                if (text !== undefined) {
                    var content = text.split(',');
                    var resu = [];
                    content.map((item, key) => {
                        resu.push(
                            <Tag style={{ marginBottom: 1.5, marginTop: 1.5 }} color="#108ee9">{item}</Tag>
                        );
                    });
                }
                return resu;
            }
        }, {
            title: '记录时间',
            dataIndex: 'CreateTime',
            width: '20%',
            key: 'CreateTime',
            sorter: (a, b) => Date.parse(a.CreateTime) - Date.parse(b.CreateTime),
        }, {
            title: '详细',
            dataIndex: 'TaskID',
            width: '15%',
            key: 'TaskID',
            render: (text, record) => {
                return <a onClick={
                    () => this.seeDetail(text, record)
                } > 详细 </a>;
            }
        }];
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
            <div className={styles.cardTitle}>
                <Row>
                    <Col>
                        <div style={{
                            width: 450,
                            position: 'absolute',
                            top: 10,
                            left: 5,
                            borderRadius: 10
                        }}
                        >
                            <div style={{ marginLeft: 10, marginTop: 10 }}>
                                <div><SearchInput
                                    onSerach={this.onSerach}
                                    style={{ marginTop: 5, marginBottom: 5, width: 400 }} searchName="排口名称" /></div>
                                <div style={{ marginTop: 5 }}>
                                    <TreeCard
                                        style={{
                                            width: '400px',
                                            marginTop: 5,
                                            background: '#fff'
                                        }}
                                        pollutantTypeloading={pollutantTypeloading}
                                        getHeight={'calc(100vh - 220px)'} getStatusImg={this.getStatusImg}
                                        getNowPollutantType={this.getNowPollutantType}
                                        PollutantType={2} treedatalist={datalist}
                                        pollutantTypelist={pollutantTypelist}
                                        tabkey={this.state.pollutantTypeCode}
                                    />
                                    <TreeCardContent style={{ overflow: 'auto', width: 400, background: '#fff' }}
                                        getHeight='calc(100vh - 220px)'
                                        pollutantTypeloading={pollutantTypeloading}
                                        getStatusImg={this.getStatusImg} isloading={treedataloading}
                                        treeCilck={this.treeCilck} treedatalist={datalist} PollutantType={2} ifSelect={true} />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col style={{ width: document.body.clientWidth - 430, height: 'calc(100vh - 90px)', float: 'right' }}>
                        <div style={{ marginRight: 10, marginTop: 25 }}>
                            <Spin style={{
                                marginTop: '20%',
                            }} spinning={this.props.loading}>
                                <Card bordered={false} style={{ height: 'calc(100vh - 110px)',overflow:'auto' }}>
                                    <div>
                                        {/* <div style={{ textAlign: 'left', marginBottom: -35 }}>
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
                                        </div> */}
                                        {
                                            <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} onSelect={this.dateSelect} onPanelChange={this.onPanelChange} />
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
        );
    }
}
