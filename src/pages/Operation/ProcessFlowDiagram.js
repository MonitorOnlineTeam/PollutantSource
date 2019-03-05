import React, { Component } from 'react';
import {
    Card,
    Row,
    Col,
    Table,
    Form,
    Spin,
    Tag,
} from 'antd';
import SearchInput from '../../components/OverView/SearchInput';
import TreeStatus from '../../components/OverView/TreeStatus';
import TreeCard from '../../components/OverView/TreeCard';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import MonitorContent from '../../components/MonitorContent/index';
import GyPic from '../../components/PointDetail/GyProcessPic';
import styles from './index.less';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import style from '../../components/PointDetail/DataList.less';
import { MapInteractionCSS } from 'react-map-interaction';
import { pollutantInfo, zspollutantInfo } from '../../config';

@connect(({ overview, points, loading }) => ({
    datalist: overview.data,
    treedataloading: loading.effects['overview/querydatalist'],
    pollutantTypelist: overview.pollutantTypelist,
    loading: loading.effects['points/queryrealparam'],
    pointInfo: points.selectpoint,
    operationInfo: points.operationInfo,
    stateInfo: points.stateInfo,
    paramsInfo: points.paramsInfo,
    dataInfo: points.dataInfo,
    paramstatusInfo: points.paramstatusInfo,
    stateNameInfo: points.stateNameInfo,
    paramNameInfo: points.paramNameInfo,
}))

export default class ProcessFlowDiagram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollutantTypeCode: "2",
            scale: 1,
            translation: { x: 0, y: 0 }
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
                ProcessFlowDiagram: true,
                DGIMN: getDGIMN,
            }
        });
      
        // dispatch({
        //     type: 'points/queryrealparam',
        //     payload: {
        //         dgimn: getDGIMN
        //     }
        // });
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
    //重新加载
    searchData = (pollutantTypeCode, searchName) => {
        var getDGIMN = localStorage.getItem('DGIMN')
        if (getDGIMN === null) {
         //   getDGIMN = '[object Object]';
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
                                type: 'points/queryrealparam',
                                payload: {
                                    dgimn: "1"
                                }
                            });
                        }
                        else {
                            this.props.dispatch({
                                type: 'points/queryrealparam',
                                payload: {
                                    dgimn: getDGIMN
                                }
                            });
                        }
                    }

                }
            },
        });
    }
    treeCilck = (row, key) => {
        localStorage.setItem('DGIMN', row.DGIMN);
        this.props.dispatch({
            type: 'points/queryrealparam',
            payload: {
                dgimn: localStorage.getItem('DGIMN')
            }
        });
    };

    getparamdata = (pollutantCode) => {
        const { paramsInfo, paramNameInfo } = this.props;
        let res = [];
        if (paramsInfo) {
            paramsInfo.map((item, key) => {
                if (item.name.indexOf(pollutantCode) > -1) {
                    const nameInfo = paramNameInfo.find(value => {
                        return item.name.indexOf(value.code) > -1;
                    })
                    res.push(
                        <tr key={key}>
                            <td key={key + '1'} style={{ width: '40%', textAlign: 'center' }}>
                                {nameInfo.name}
                            </td>
                            <td key={key + '2'} style={{ width: '60%', textAlign: 'center' }}>
                                {item.value}
                            </td>
                        </tr>
                    )
                }
            })
        }
        return res;
    }

    getrealtimedata = (pollutantCode) => {
        const { dataInfo, paramsInfo } = this.props;
        const pollutantInfo = zspollutantInfo.find((value, index, arr) => {
            return value.pollutantCode === pollutantCode;
        });
        if (pollutantInfo) {

            return (<Card title={pollutantInfo.pollutantName + "分析仪"} style={{ borderRadius: 10 }}>
                <table key={(record, index) => `complete${index}`} className={styles.FormTable}>
                    <tbody>
                        <tr>
                            <td style={{ width: '40%', textAlign: 'center' }}>{pollutantInfo.pollutantName}({pollutantInfo.unit})</td>
                            <td style={{ width: '60%', textAlign: 'center' }}>{!dataInfo ? '-' : dataInfo[pollutantCode]}</td>
                        </tr>
                        {
                            this.getparamdata(pollutantCode)
                        }
                    </tbody>
                </table>
            </Card>)
        }
    }
    getregistValue = (list, key, unit) => {
        if (!list) {
            return '暂未上传';
        }
        else {
            if (!list[key]) {
                return '暂未上传';
            }
            return list[key] + (unit ? unit : '');
        }
    }

    getStatusName = (list, key) => {
        if (!list) {
            return '暂未上传';
        }
        else {
            if (!list[key]) {
                return '暂未上传';
            }
            if (list[key].indexOf('_') > -1) {
                return list[key].split('_')[0];
            }
            return list[key];
        }
    }

    getSystemStatus = (list, key) => {
        if (list && list[key] && list[key].indexOf('_') > -1) {
            return list[key].split('_')[1];
        }
        return '0';
    }
    render() {
        const {  loading, operationInfo, stateInfo, paramsInfo, dataInfo, paramstatusInfo, pollutantTypelist, treedataloading, datalist, pollutantTypeloading } = this.props;
        const { match } = this.props;
        let DGIMN = localStorage.getItem('DGIMN')
        const { scale, translation } = this.state;
        var spin = true;
        if (!treedataloading && !loading) {
            spin = false;
        }
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
                                            treeCilck={this.treeCilck} treedatalist={datalist} PollutantType={this.state.pollutantTypeCode} ifSelect={true} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col style={{ width: document.body.clientWidth - 470, float: 'right' }}>
                            <Card bordered={false} style={{ height: 'calc(100vh - 150px)', overflow: 'hidden', marginRight: 10, marginTop: 10 }}>
                                <div className={style.GyProcessPic} style={{ height: 'calc(100vh - 225px)' }}>
                                         <GyPic DGIMN={DGIMN} />              
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
