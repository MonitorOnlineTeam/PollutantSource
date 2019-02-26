
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
import SearchInput from '../../components/OverView/SearchInput';
import TreeStatus from '../../components/OverView/TreeStatus';
import TreeCard from '../../components/OverView/TreeCard';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import MonitorContent from '../../components/MonitorContent/index';
import WQCQFInspectionHistoryListContent from '../EmergencyTodoList/WQCQFInspectionHistoryListContent';
import { EnumPollutantTypeCode } from '../../utils/enum';

@connect(({ maintenancelist, overview, loading }) => ({
    datalist: overview.data,
    pollutantTypeloading: loading.effects['overview/getPollutantTypeList'],
    treedataloading: loading.effects['overview/querydatalist'],
}))
/*
页面：CEMS日常巡检记录表(历史记录)
*/
export default class InspectionHistoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollutantTypeCode: EnumPollutantTypeCode.GAS
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
            }
        });

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
                InspectionHistoryRecords: true,
                pageIndex: this.props.pageIndex,
                pageSize: this.props.pageSize,
                BeginTime: this.state.rangeDate[0].format('YYYY-MM-DD 00:00:00'),
                EndTime: this.state.rangeDate[1].format('YYYY-MM-DD 23:59:59'),
                DGIMN: getDGIMN,
                search: true,
                callback: (data) => {
                }
            },
        });
    }
    treeCilck = (row) => {
        this.props.dispatch({
            type: 'maintenancelist/updateState',
            payload: {DGIMN:row.DGIMN}
        });
        localStorage.setItem('DGIMN', row.DGIMN);
        this.props.dispatch({
            type: 'maintenancelist/GetInspectionHistoryList',
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
                    { Name: '首页', Url: '/' },
                    { Name: '智能运维', Url: '' },
                    { Name: '巡检记录', Url: '' }
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
                                        treeCilck={this.treeCilck} treedatalist={this.props.datalist} PollutantType={this.state.pollutantTypeCode} ifSelect={true} />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col style={{ width: document.body.clientWidth - 470, height: 'calc(100vh - 150px)', float: 'right' }}>
                    <WQCQFInspectionHistoryListContent  pointcode={localStorage.getItem('DGIMN')} viewtype="no" height="calc(100vh - 360px)"/>
                    </Col>
                </Row>
            </div>
            </MonitorContent>
        );
    }
}

