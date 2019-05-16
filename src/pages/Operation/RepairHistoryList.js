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
import styles from './index.less';
import { routerRedux } from 'dva/router';
import MonitorContent from '../../components/MonitorContent/index';
import SearchInput from '../../components/OverView/SearchInput';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import RepairHistoryListContent from '../EmergencyTodoList/RepairHistoryListContent';
import { EnumPollutantTypeCode } from '../../utils/enum';

@connect(({ overview, loading }) => ({
    datalist: overview.data,
    pollutantTypeloading: loading.effects['overview/getPollutantTypeList'],
    treedataloading: loading.effects['overview/querydatalist'],
    treeDataParameter: overview.treeDataParameter,
    dataOne: overview.dataOne,
    dataOverview: overview.dataOverview,
}))
/*
页面：维修历史记录
*/
export default class RepairHistoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
        this.updateState({
            dataOne:null,
            selectpollutantTypeCode:'2',
            dataOverview: {
                ...this.props.dataOverview,
                ...{
                    pointName: null,
                }
            }
        });
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
            payload: {},
        });
    }
    /**
     * 更新model中的state
    */
    updateState = (payload) => {
        this.props.dispatch({
            type: 'overview/updateState',
            payload: payload,
        });
    }
    treeCilck = (row, key) => {
        this.props.dispatch({
            type: 'maintenancelist/updateState',
            payload: { DGIMN: row.DGIMN }
        });
        this.props.dispatch({
            type: 'maintenancelist/GetRepairHistoryList',
            payload: {
            }
        });
    };
    render() {
        if (this.props.treedataloading && this.props.pollutantTypeloading) {
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
                    { Name: '智能运维', Url: '' },
                    { Name: '维修记录表', Url: '' }
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
                                            pollutantTypeloading={this.props.pollutantTypeloading}
                                            getStatusImg={this.getStatusImg} isloading={this.props.treedataloading}
                                            treeCilck={this.treeCilck} treedatalist={this.props.datalist} PollutantType={EnumPollutantTypeCode.GAS} ifSelect={true} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col style={{ width: document.body.clientWidth - 470, height: 'calc(100vh - 150px)', float: 'right', marginTop: '11px' }}>
                            {
                                this.props.dataOne === null ? null : <RepairHistoryListContent pointcode={this.props.dataOne} viewtype="no" height="calc(100vh - 360px)" operation="menu/intelligentOperation" />
                            }
                        </Col>
                    </Row>
                </div>
            </MonitorContent>
        );
    }
}
