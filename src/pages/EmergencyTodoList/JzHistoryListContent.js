import React, { Component } from 'react';
import styles from '../EmergencyTodoList/JzHistoryListContent.less';
import {
    Button,
    Input,
    Card,
    Row,
    Col,
    Table,
    Form,
    Select, Modal, message, Tag, Radio, Checkbox,
    Spin
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import { routerRedux } from 'dva/router';

@connect(({ maintenancelist, loading }) => ({
    loading: loading.effects['maintenancelist/GetJzHistoryList'],
    JzHistoryRecord: maintenancelist.JzHistoryList,
    RecordCount: maintenancelist.total,
    pageIndex: maintenancelist.pageIndex,
    pageSize: maintenancelist.pageSize,
    beginTime:maintenancelist.beginTime, //开始时间
    endTime:maintenancelist.endTime, //结束时间
    DGIMN:maintenancelist.DGIMN
}))
class JzHistoryListContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment(moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))]
        };
    }

    componentDidMount() {
        const condition={
            pageIndex: 1,
            pageSize: 10,
            beginTime:moment().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'), //运维大事记开始时间
            endTime:moment().format('YYYY-MM-DD 23:59:59'), //运维大事记结束时间
            DGIMN: this.props.pointcode
        };
        this.ChangeModelState(condition);
        this.GetHistoryRecord();
    }

    GetHistoryRecord = () => {
        this.props.dispatch({
            type: 'maintenancelist/GetJzHistoryList',
            payload: {
            }
        });
    };

    _handleDateChange = (date, dateString) => {
        const condition={
            beginTime: dateString[0],
            endTime: dateString[1],
            pageIndex:1
        };
        this.ChangeModelState(condition);
        this.setState(
            {
                rangeDate: date
            }
        );
        this.GetHistoryRecord();
    };

    onShowSizeChange = (pageIndex, pageSize) => {
        const condition={
            pageIndex,
            pageSize
        };
        this.ChangeModelState(condition);
        this.GetHistoryRecord();
    }

    onChange = (pageIndex, pageSize) => {
        const condition={
            pageIndex,
            pageSize
        };
        this.ChangeModelState(condition);
        this.GetHistoryRecord();
    }

    seeDetail = (Record) => {
        if(this.props.operation===undefined){
            this.props.dispatch(routerRedux.push(`/PatrolForm/JzRecord/${this.props.DGIMN}/${this.props.viewtype}/operationlist/JzHistoryList/${record.TaskID}`));
        }else{
            this.props.dispatch(routerRedux.push(`/PatrolForm/JzRecord/${this.props.DGIMN}/${this.props.operation}/JzHistoryList/${record.TaskID}`));
        }
    }

    ChangeModelState=(condition)=>{
        this.props.dispatch({
            type: 'maintenancelist/updateState',
            payload: {...condition}
        });
    }

    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 150;
        const dataSource = this.props.JzHistoryRecord;
        const columns = [{
            title: '校准人',
            width: '20%',
            dataIndex: 'CreateUserID',
            key: 'CreateUserID'
        }, {
            title: '分析仪校准是否正常',
            width: '45%',
            dataIndex: 'Content',
            key: 'Content',
            render: (text, Record) => {
                if (text !== undefined) {
                    var content = text.split('),');
                    var resu = [];
                    content.map((item, key) => {
                        // item = item.replace('(',' - ');
                        // item = item.replace(')','');
                        if (key !== content.length - 1) {
                            item = item + ')';
                        }
                        resu.push(
                            <Tag key={key} style={{ marginBottom: 1.5, marginTop: 1.5 }} color="#108ee9">{item}</Tag>
                        );
                    });
                }
                return resu;
            }
        }, {
            title: '记录时间',
            dataIndex: 'CreateTime',
            width: '20%',
            key: 'CreateTime'
        }, {
            title: '详细',
            dataIndex: 'TaskID',
            width: '15%',
            key: 'TaskID',
            render: (text, Record) => {
                return <a onClick={
                    () => this.seeDetail(Record)
                } > 详细 </a>;
            }
        }];
        if (this.props.loading) {
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
                <Card bordered={false}>
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
                        rowKey={(record, index) => `complete${index}`}
                        size="middle"
                        scroll={{ y: this.props.height }}
                        loading={this.props.loading}
                        className={styles.dataTable}
                        columns={columns}
                        dataSource={dataSource}
                        rowClassName={
                            (record, index) => {
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
                            'total': this.props.RecordCount,
                            'pageSize': this.props.pageSize,
                            'current': this.props.pageIndex,
                            onChange: this.onChange,
                            onShowSizeChange: this.onShowSizeChange,
                            pageSizeOptions: ['10', '20', '30', '40']
                        }}
                    />
                </Card>
            </div>
        );
    }
}
export default JzHistoryListContent;