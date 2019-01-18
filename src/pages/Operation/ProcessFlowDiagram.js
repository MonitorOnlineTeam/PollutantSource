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
import GyPic from '../../components/PointDetail/MenuGyProcessPic';
import SearchInput from '../../components/OverView/SearchInput';
import TreeStatus from '../../components/OverView/TreeStatus';
import TreeCard from '../../components/OverView/TreeCard';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import styles from './index.less';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
@connect(({ overview, loading }) => ({
    datalist: overview.data,
    pollutantTypeloading: loading.effects['overview/getPollutantTypeList'],
    treedataloading: loading.effects['overview/querydatalist'],
    pollutantTypelist: overview.pollutantTypelist,
}))

export default class ProcessFlowDiagram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollutantTypeCode: "2",
            DGIMN: localStorage.getItem('DGIMN'),
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'overview/getPollutantTypeList',
            payload: {
            }
        });
        var getDGIMN = localStorage.getItem('DGIMN')
        if (getDGIMN === null) {
            getDGIMN = '[object Object]';
        }
        dispatch({
            type: 'overview/querydatalist',
            payload: {
                map: true,
                pollutantTypes: this.state.pollutantTypeCode,
                ProcessFlowDiagram: true,
                DGIMN: getDGIMN,
            }
        });

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
    //查询
    onSerach = (value) => {
        this.setState({
            searchName: value
        })
        const { pollutantTypeCode } = this.state;
        this.searchData(pollutantTypeCode, value);
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
                ProcessFlowDiagram: true,
                pointName: searchName,
                DGIMN: getDGIMN,
                search: true,
                callback: (data) => {
                    if (data !== null) {
                        const existdata = data.find((value, index, arr) => {
                            return value.DGIMN == getDGIMN
                        });
                        if (existdata == undefined) {
                            this.props.dispatch({
                                type: 'points/queryprocesschart',
                                payload: {
                                    dgimn: null // this.props.pointInfo.DGIMN
                                }
                            });
                        }
                        else {
                            this.props.dispatch({
                                type: 'points/queryprocesschart',
                                payload: {
                                    dgimn: getDGIMN // this.props.pointInfo.DGIMN
                                }
                            });
                        }
                    }

                }
            },
        });
    }
    //重新加载
    reloadData = (pollutantTypeCode, searchName) => {
        var getDGIMN = '[object Object]'
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                map: true,
                ProcessFlowDiagram: true,
                pollutantTypes: pollutantTypeCode,
                pointName: searchName,
                DGIMN: getDGIMN,
            },
        });
    }
    treeCilck = (row, key) => {
        localStorage.setItem('DGIMN', row.DGIMN);
        this.setState({ DGIMN: row.DGIMN })
        this.props.dispatch({
            type: 'points/queryprocesschart',
            payload: {
                dgimn: row.DGIMN // this.props.pointInfo.DGIMN
            }
        });
    };
    render() {
        const { pollutantTypelist, treedataloading, datalist, pollutantTypeloading } = this.props;
        const { match } = this.props;
        let status = '0'; // 任务
        const alarmType = ['bjldgn01', 'dtgjhh11102', 'dtgrjx110'];
        if (alarmType.indexOf(this.state.DGIMN) > -1) {
            status = '1';
        } else {
            status = '0';
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
                                    style={{ marginTop: 5, marginBottom: 10, width: 400 }} searchName="排口名称" /></div>
                                <div style={{ marginTop: 5 }}>
                                    <TreeCardContent style={{ overflow: 'auto', width: 400, background: '#fff' }}
                                        getHeight='calc(100vh - 165px)'
                                        pollutantTypeloading={pollutantTypeloading}
                                        getStatusImg={this.getStatusImg} isloading={treedataloading}
                                        treeCilck={this.treeCilck} treedatalist={datalist} PollutantType={this.state.pollutantTypeCode} ifSelect={true} />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col style={{ width: document.body.clientWidth - 430, float: 'right' }}>
                        <Card bordered={false} style={{ height: 'calc(100vh - 110px)', overflow: 'hidden', marginRight: 10, marginTop: 25 }}>
                            <GyPic style={{}} DGIMN={this.state.DGIMN} status={status} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
