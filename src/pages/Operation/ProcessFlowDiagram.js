import React, { Component } from 'react';
import {
    Card,
    Row,
    Col,
    Table,
    Form,
    Tag,
} from 'antd';
import SearchInput from '../../components/OverView/SearchInput';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import MonitorContent from '../../components/MonitorContent/index';
import GyPic from '../../components/PointDetail/GyProcessPic';
import styles from './index.less';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import style from '../../components/PointDetail/DataList.less';
import { MapInteractionCSS } from 'react-map-interaction';
import { pollutantInfo, zspollutantInfo } from '../../config';
import { EnumPollutantTypeCode } from '../../utils/enum';

@connect(({ overview, loading }) => ({
    datalist: overview.data,
    treedataloading: loading.effects['overview/querydatalist'],
    loading: loading.effects['points/queryrealparam'],
    dataOne: overview.dataOne,
    dataOverview: overview.dataOverview,
}))

export default class ProcessFlowDiagram extends Component {
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
            type: 'points/updateState',
            payload: { DGIMN: row.DGIMN }
        });
        localStorage.setItem('DGIMN', row.DGIMN);
        this.props.dispatch({
            type: 'points/queryrealparam',
            payload: {
                dgimn: localStorage.getItem('DGIMN')
            }
        });
    };

    render() {
        const { treedataloading, datalist, pollutantTypeloading } = this.props;
        const { match } = this.props;
        let DGIMN = localStorage.getItem('DGIMN')
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    { Name: '首页', Url: '/' },
                    { Name: '智能运维', Url: '' },
                    { Name: '运转实况', Url: '' }
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
                                            pollutantTypeloading={pollutantTypeloading}
                                            getStatusImg={this.getStatusImg} isloading={treedataloading}
                                            treeCilck={this.treeCilck} treedatalist={datalist} PollutantType={EnumPollutantTypeCode.GAS} flag={'ProcessFlowDiagram'} ifSelect={true} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col style={{ width: document.body.clientWidth - 470, float: 'right' }}>
                            <Card bordered={false} style={{ height: 'calc(100vh - 150px)', overflow: 'hidden', marginRight: 10, marginTop: 10 }}>
                                <div className={style.GyProcessPic} style={{ height: 'calc(100vh - 225px)' }}>
                                    {
                                        this.props.dataOne === null ? null : <GyPic DGIMN={this.props.dataOne} />
                                    }
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </MonitorContent>
        );
    }
}
