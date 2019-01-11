
import React, { Component } from 'react';
import {
    Card,
    Row,
    Col,
    Table,
    Form,
    Spin,
    Tag
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import SearchInput from '../../components/OverView/SearchInput';
import TreeStatus from '../../components/OverView/TreeStatus';
import TreeCard from '../../components/OverView/TreeCard';
import TreeCardContent from '../../components/OverView/TreeCardContent';

@connect(({ task, overview, loading }) => ({
    loading: loading.effects['task/GetHistoryInspectionHistoryRecords'],
    HistoryInspectionHistoryRecordList: task.HistoryInspectionHistoryRecordList,
    HistoryInspectionHistoryRecordListCount: task.total,
    pageIndex: task.pageIndex,
    pageSize: task.pageSize,
    datalist: overview.data,
    pollutantTypeloading: loading.effects['overview/getPollutantTypeList'],
    treedataloading: loading.effects['overview/querydatalist'],
    pollutantTypelist: overview.pollutantTypelist,
}))
/*
页面：CEMS日常巡检记录表(历史记录)
*/
export default class InspectionHistoryRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment(moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))], // 最近七天
            BeginTime: moment().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'),
            EndTime: moment().format('YYYY-MM-DD 23:59:59'),
            DGIMN: this.props.DGIMN,
            pollutantTypeCode: "2",
            value: [],
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        var getDGIMN = localStorage.getItem('DGIMN')
        if (getDGIMN === null)
        {
            getDGIMN = '[object Object]';
        }  
        dispatch({
            type: 'overview/querydatalist',
            payload: {
                map: true,
                pollutantTypes: this.state.pollutantTypeCode,
                InspectionHistoryRecords: true,
                pageIndex: this.props.pageIndex,
                pageSize: this.props.pageSize,
                BeginTime: this.state.rangeDate[0].format('YYYY-MM-DD 00:00:00'),
                EndTime: this.state.rangeDate[1].format('YYYY-MM-DD 23:59:59'),
                DGIMN:getDGIMN,
            }
        });
        dispatch({
            type: 'overview/getPollutantTypeList',
            payload: {
            }
        });
    }

    GetHistoryRecord = (pageIndex, pageSize, DGIMN, BeginTime, EndTime) => {
        this.props.dispatch({
            type: 'task/GetHistoryInspectionHistoryRecords',
            payload: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                DGIMN: DGIMN,
                BeginTime: moment(BeginTime).format('YYYY-MM-DD 00:00:00'),
                EndTime: moment(EndTime).format('YYYY-MM-DD 23:59:59'),
            }
        });
    };

    _handleDateChange = (date, dateString) => {
        this.setState(
            {
                rangeDate: date,
                BeginTime: dateString[0],
                EndTime: dateString[1]
            }
        );
        this.GetHistoryRecord(this.props.pageIndex, this.props.pageSize, this.state.DGIMN, dateString[0], dateString[1]);
    };

    onShowSizeChange = (pageIndex, pageSize) => {
        this.GetHistoryRecord(pageIndex, pageSize, this.state.DGIMN, this.state.BeginTime, this.state.EndTime);
    }

    onChange = (pageIndex, pageSize) => {
        this.GetHistoryRecord(pageIndex, pageSize, this.state.DGIMN, this.state.BeginTime, this.state.EndTime);
    }

    seeDetail = (record) => {
        localStorage.setItem('DGIMN',this.props.DGIMN);
        this.props.dispatch(routerRedux.push(`/PatrolForm/CompleteExtraction/${this.state.DGIMN}/${this.props.match.params.viewtype}/qcontrollist/WQCQFInspectionHistoryRecords/${record.TaskID}`));
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
                    InspectionHistoryRecords: true,
                    pageIndex: this.props.pageIndex,
                    pageSize: this.props.pageSize,
                    BeginTime: this.state.rangeDate[0].format('YYYY-MM-DD 00:00:00'),
                    EndTime: this.state.rangeDate[1].format('YYYY-MM-DD 23:59:59'),
                    DGIMN: getDGIMN,
                    callback: (data) => {
                        const existdata = data.find((value, index, arr) => {
                            return value.DGIMN == getDGIMN
                        });
                        if(existdata==undefined)
                        {
                            this.props.dispatch({
                                type: 'task/GetHistoryInspectionHistoryRecords',
                                payload: {
                                    pageIndex: this.props.pageIndex,
                                    pageSize: this.props.pageSize,
                                    DGIMN: null,
                                    BeginTime: this.state.BeginTime,
                                    EndTime: this.state.EndTime,
                                }
                            });
                        }
                    }
                },
            });
        }
    //重新加载
    reloadData = (pollutantTypeCode, searchName) => {
        var getDGIMN = localStorage.getItem('DGIMN')
        if (getDGIMN === null)
        {
            getDGIMN = '[object Object]';
        }  
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                map: true,
                pollutantTypes: pollutantTypeCode,
                pointName: searchName,
                InspectionHistoryRecords: true,
                pageIndex: this.props.pageIndex,
                pageSize: this.props.pageSize,
                BeginTime: this.state.rangeDate[0].format('YYYY-MM-DD 00:00:00'),
                EndTime: this.state.rangeDate[1].format('YYYY-MM-DD 23:59:59'),
                DGIMN:getDGIMN,
                IfTabs:true, //切换选项卡事件
            },
        });
    }
    treeCilck = (row) => {
        localStorage.setItem('DGIMN', row.DGIMN);
        this.GetHistoryRecord(this.props.pageIndex, this.props.pageSize, row.DGIMN, this.state.BeginTime, this.state.EndTime);
    };
    render() {
        const { pollutantTypelist, treedataloading, datalist, pollutantTypeloading } = this.props;
        const dataSource = this.props.HistoryInspectionHistoryRecordList === null ? null : this.props.HistoryInspectionHistoryRecordList;
        const columns = [{
            title: '校准人',
            width: '20%',
            dataIndex: 'CreateUserID',
            key: 'CreateUserID'
        }, {
            title: '维护情况',
            width: '45%',
            dataIndex: 'Content',
            key: 'Content',
            render: (text, record) => {
                if (text !== undefined) {
                    var content = text.split(',');
                    var resu = [];
                    content.map((item, key) => {
                        item = item.replace('(', '  ');
                        item = item.replace(')', '');
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
                    () => this.seeDetail(record)
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
                                        PollutantType={2}
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
                            <Card bordered={false} style={{ height: 'calc(100vh - 110px)' }}>
                                <div className={styles.conditionDiv}>
                                    <Row gutter={8}>
                                        <Col span={3} >
                                            <label className={styles.conditionLabel}>记录时间：</label>
                                        </Col>
                                        <Col span={21} >
                                            <RangePicker_ style={{ width: 350 }} onChange={this._handleDateChange} format={'YYYY-MM-DD'} dateValue={this.state.rangeDate} />
                                        </Col>

                                    </Row>
                                </div>
                                <Table
                                    size="middle"
                                    scroll={{ y: 'calc(100vh - 350px)' }}
                                    loading={this.props.loading}
                                    className={styles.dataTable}
                                    columns={columns}
                                    dataSource={dataSource}
                                    rowClassName={
                                        (record, index, indent) => {
                                            if (index === 0) {
                                                return;
                                            }
                                            if (index % 2 !== 0) {
                                                return 'light';
                                            }
                                        }
                                    }
                                    pagination={{
                                        showSizeChanger: true,
                                        showQuickJumper: true,
                                        'total': this.props.HistoryInspectionHistoryRecordListCount,
                                        'pageSize': this.props.pageSize,
                                        'current': this.props.pageIndex,
                                        onChange: this.onChange,
                                        onShowSizeChange: this.onShowSizeChange,
                                        pageSizeOptions: ['10', '20', '30', '40']
                                    }}
                                />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

