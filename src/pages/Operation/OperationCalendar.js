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
import styles from './OperationCalendar.less';
import SearchInput from '../../components/OverView/SearchInput';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import MonitorContent from '../../components/MonitorContent/index';
import OperationData from '../../components/OperationCalendar/OperationData';
import { EnumPollutantTypeCode } from '../../utils/enum';

@connect(({ overview, workbenchmodel, loading }) => ({
    loading: loading.effects['workbenchmodel/getOperationCalendarData'],
    datalist: overview.data,
    pollutantTypeloading: loading.effects['overview/getPollutantTypeList'],
    treedataloading: loading.effects['overview/querydatalist'],
    dataOne: overview.dataOne,
    OperationCalendar: workbenchmodel.OperationCalendar,
}))
/*
页面：运维日历
*/
export default class OperationCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }

    //查询
    onSerach = (value) => {
        this.searchData(value);
    }
    //重新加载
    searchData = (searchName) => {
        this.updateState({
            dataOverview: {
                ...this.props.dataOverview,
                ...{
                    pointName: searchName,
                }
            }
        });
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                callback: (data) => {
                    if (data !== null) {
                        const existdata = data.find((value, index, arr) => {
                            return value.DGIMN == this.props.dataOne
                        });
                        if (existdata == undefined) {
                            this.GetData('1');
                        }
                        else {
                            this.updateStateOperation({
                                OperationCalendar: {
                                    ...this.props.OperationCalendar,
                                    ...{
                                        IsQueryAllUser: true,
                                        DGIMNs: this.props.dataOne,
                                    }
                                }
                            });
                            this.props.dispatch({
                                type: 'workbenchmodel/getOperationCalendarData',
                                payload: {
                                }
                            });
                        }
                    }
                }
            },
        });
    }
    //树点击事件
    treeCilck = (row, key) => {
        this.updateStateOperation({
            OperationCalendar: {
                ...this.props.OperationCalendar,
                ...{
                    DGIMNs: row.DGIMN,
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
            type: 'overview/updateState',
            payload: payload,
        });
    }

    /**
* 更新model中的state（运维日历model）
*/
    updateStateOperation = (payload) => {
        this.props.dispatch({
            type: 'workbenchmodel/updateState',
            payload: payload,
        });
    }
    render() {
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
                                            PollutantType={EnumPollutantTypeCode.GAS}
                                            treeCilck={this.treeCilck} flag={'OperationCalendar'} />
                                        {/* flag 向子组件传值的标识 */}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col style={{ width: document.body.clientWidth - 470, height: 'calc(100vh - 150px)', float: 'right' }}>
                            {
                                this.props.dataOne === null ? null : < OperationData DGIMN={this.props.dataOne} />
                            }
                        </Col>
                    </Row>
                </div>
            </MonitorContent>
        );
    }
}
