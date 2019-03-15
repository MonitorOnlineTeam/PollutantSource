import React, { Component } from 'react';
import { Form, Card, Row, Col, Icon, Spin, Button } from 'antd';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import SearchInput from '../../components/OverView/SearchInput';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import MonitorContent from '../../components/MonitorContent/index';
import Ywdsjlistss from './Ywdsjlist.less';
import YwdsjlistContent from '../PointDetail/YwdsjlistContent';
import { EnumPollutantTypeCode } from '../../utils/enum';

@connect(({overview, loading }) => ({
    datalist: overview.data,
    pollutantTypeloading: loading.effects['overview/getPollutantTypeList'],
    treedataloading: loading.effects['overview/querydatalist'],
    pollutantTypelist: overview.pollutantTypelist,
    dataOne: overview.dataOne,
    dataOverview: overview.dataOverview,
}))
export default class Ywdsjlist extends Component {
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
            },
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
            type: 'tasklist/updateState',
            payload: { DGIMN: row.DGIMN }
        });
        this.props.dispatch({
            type: 'tasklist/GetYwdsj',
            payload: {
                isLoadMoreOpt: false
            }
        });
    };

    render() {
        const { treedataloading, datalist, pollutantTypeloading } = this.props;
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
                                            treeCilck={this.treeCilck} treedatalist={datalist} PollutantType={EnumPollutantTypeCode.GAS} flag={'tasklist'} ifSelect={true} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col style={{ width: document.body.clientWidth - 470, height: 'calc(100vh - 150px)', float: 'right', marginTop: '10px' }}>
                            {
                                this.props.dataOne === null ? null : <YwdsjlistContent pointcode={this.props.dataOne} taskfrom="operationywdsjlist" viewtype="no" height="calc(100vh - 248px)" />
                            }

                        </Col>
                    </Row>
                </div>
            </MonitorContent>
        );
    }
}
