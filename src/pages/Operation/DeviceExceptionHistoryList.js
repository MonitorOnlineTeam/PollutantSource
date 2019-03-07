import React, { Component } from 'react';
import {
    Card,
    Row,
    Col,
    Table,
    Form,
    Spin
} from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import SearchInput from '../../components/OverView/SearchInput';
import TreeStatus from '../../components/OverView/TreeStatus';
import TreeCard from '../../components/OverView/TreeCard';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import MonitorContent from '../../components/MonitorContent/index';
import DeviceExceptionHistoryListContent from '../EmergencyTodoList/DeviceExceptionHistoryListContent';
import { EnumPollutantTypeCode } from '../../utils/enum';
import moment from 'moment';

@connect(({ overview, loading }) => ({
    datalist: overview.data,
    pollutantTypeloading: loading.effects['overview/getPollutantTypeList'],
    treedataloading: loading.effects['overview/querydatalist'],
}))
/*
页面：异常历史记录
*/
export default class DeviceExceptionListHistoryRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollutantTypeCode: EnumPollutantTypeCode.GAS,
            rangeDate: [moment(moment(new Date()).subtract(3, 'month').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))], // 最近3月
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        var getDGIMN = localStorage.getItem('DGIMN')
        dispatch({
            type: 'overview/querydatalist',
            payload: {
                map: true,
                pollutantTypes: this.state.pollutantTypeCode,
                DeviceExceptionListHistoryRecord: true,
                DGIMN: getDGIMN,

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
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                pollutantTypes: pollutantTypeCode,
                pointName: searchName,
                callback: (data) => {
                }
            },
        });
    }
    treeCilck = (row) => {
        this.props.dispatch({
            type: 'maintenancelist/updateState',
            payload: { DGIMN: row.DGIMN }
        });
        localStorage.setItem('DGIMN', row.DGIMN);
        this.props.dispatch({
            type: 'maintenancelist/GetDeviceExceptionHistoryList',
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
                    { Name: '智能质控', Url: '' },
                    { Name: '设备数据异常记录表', Url: '' }
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
                        <Col style={{ width: document.body.clientWidth - 470, height: 'calc(100vh - 150px)', float: 'right' ,marginTop:'11px'}}>
                            <DeviceExceptionHistoryListContent pointcode={localStorage.getItem('DGIMN')} viewtype="no" height="calc(100vh - 360px)" operation="menu/intelligentOperation" />
                        </Col>
                    </Row>
                </div>
            </MonitorContent>


        );
    }
}
