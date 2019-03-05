import React, { Component } from 'react';
import { Form, Card, Row, Col, Icon, Spin, Button } from 'antd';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import SearchInput from '../../components/OverView/SearchInput';
import TreeStatus from '../../components/OverView/TreeStatus';
import TreeCard from '../../components/OverView/TreeCard';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import MonitorContent from '../../components/MonitorContent/index';
import Ywdsjlistss from './Ywdsjlist.less';
import YwdsjlistContent from '../PointDetail/YwdsjlistContent';
import moment from 'moment';
import { EnumPollutantTypeCode } from '../../utils/enum';

@connect(({ tasklist, overview, loading }) => ({
    datalist: overview.data,
    pollutantTypeloading: loading.effects['overview/getPollutantTypeList'],
    treedataloading: loading.effects['overview/querydatalist'],
    pollutantTypelist: overview.pollutantTypelist
}))
export default class Ywdsjlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollutantTypeCode: EnumPollutantTypeCode.GAS,
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
                Ywdsjlist:true,
                DGIMN: getDGIMN
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
        var getDGIMN = localStorage.getItem('DGIMN');

        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                map: true,
                pollutantTypes: pollutantTypeCode,
                pointName: searchName,
                RepairHistoryRecords: true,
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

    treeCilck = (row, key) => {
        this.props.dispatch({
            type: 'tasklist/updateState',
            payload: {DGIMN:row.DGIMN}
        });
        localStorage.setItem('DGIMN', row.DGIMN);
        this.props.dispatch({
            type: 'tasklist/GetYwdsj',
            payload: {
                isLoadMoreOpt: false
            }
        });
    };

    render() {
        const { pollutantTypelist, treedataloading, datalist, pollutantTypeloading } = this.props;
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    { Name: '首页', Url: '/' },
                    { Name: '智能运维', Url: '' },
                    { Name: '运维大事记', Url: '' }
                ]
            }>
                <div className={Ywdsjlistss.cardTitle}>
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
                                            pollutantTypeloading={pollutantTypeloading}
                                            getStatusImg={this.getStatusImg} isloading={treedataloading}
                                            treeCilck={this.treeCilck} treedatalist={datalist} PollutantType={this.state.pollutantTypeCode} ifSelect={true} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col style={{ width: document.body.clientWidth - 470, height: 'calc(100vh - 150px)', float: 'right',marginTop:'10px' }}>
                            <YwdsjlistContent  pointcode={localStorage.getItem('DGIMN')} taskfrom="operationywdsjlist" viewtype="no" height="calc(100vh - 248px)"/>
                        </Col>
                    </Row>
                </div>
            </MonitorContent>
        );
    }
}
