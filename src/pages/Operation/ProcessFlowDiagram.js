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
import GyPic from '../../components/PointDetail/MenuGyProcessPic';
import SearchInput from '../../components/OverView/SearchInput';
import TreeStatus from '../../components/OverView/TreeStatus';
import TreeCard from '../../components/OverView/TreeCard';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import MonitorContent from '../../components/MonitorContent/index';
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
      
        dispatch({
            type: 'points/queryrealparam',
            payload: {
                dgimn: getDGIMN
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
        let status = '0'; // 任务
        const alarmType = ['bjldgn01', 'dtgjhh11102', 'dtgrjx110'];
        if (alarmType.indexOf(localStorage.getItem('DGIMN')) > -1) {
            status = '1';
        } else {
            status = '0';
        }
        const { scale, translation } = this.state;
        var spin = true;
        if (!treedataloading && !loading) {
            spin = false;
        }
        //运行状态
        const cemsStatus = this.getSystemStatus(stateInfo, 'i12103');
        //工作状态
        const wordStatus = this.getSystemStatus(stateInfo, 'i12001');
        //截止阀状态
        const jzfStatus = this.getSystemStatus(stateInfo, 'i12104');
        //皮托管状态
        const ptgStatus = this.getSystemStatus(stateInfo, 'i12106');
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
                                    <Spin
                                        spinning={spin}
                                        style={{
                                            width: '100%',
                                            marginTop: 150
                                        }} >
                                        <MapInteractionCSS
                                            scale={scale}
                                            translation={translation}
                                            onChange={({ scale, translation }) => this.setState({ scale, translation })}
                                            defaultScale={1}
                                            defaultTranslation={{ x: 0, y: 0 }}
                                            minScale={0.05}
                                            maxScale={5}
                                            showControls={true}>
                                            <div className={style.imgBg} >
                                                <div className={cemsStatus == "1" ? style.shine_red : ''} style={{ width: '200px', height: '20px', position: 'relative', left: '1250px', top: '20px', fontWeight: '1000', fontSize: '13px' }}>CEMS运行状态：{this.getStatusName(stateInfo, 'i12103')}</div>
                                                <div style={{ width: '100px', height: '20px', position: 'relative', left: '400px', top: '186px', fontWeight: '700', fontSize: '10px' }}>管线温度：{this.getregistValue(paramstatusInfo, 'i33001', '°C')}</div>
                                                <div style={{ width: '100px', height: '20px', position: 'relative', left: '635px', top: '152px', fontWeight: '700', fontSize: '10px' }}>制冷温度：{this.getregistValue(paramstatusInfo, 'i33002', '°C')}</div>
                                                <div style={{ width: '100px', height: '20px', position: 'relative', left: '720px', top: '172px', fontWeight: '700', fontSize: '10px' }}> </div>
                                                <div style={{ width: '90px', height: '20px', position: 'relative', left: '890px', top: '160px', fontWeight: '700', fontSize: '10px' }}>下次更换时间：{this.getregistValue(operationInfo, '取样泵')}</div>
                                                <div style={{ width: '100px', height: '20px', position: 'relative', left: '890px', top: '182px', fontWeight: '700', fontSize: '10px' }}><span></span></div>
                                                <div style={{ width: '100px', height: '20px', position: 'relative', left: '1070px', top: '225px', fontWeight: '700', fontSize: '10px' }}>下次更换时间：{this.getregistValue(operationInfo, '过滤器')}</div>
                                                <div style={{ width: '100px', height: '20px', position: 'relative', left: '860px', top: '240px', fontWeight: '700', fontSize: '10px' }}>下次更换时间：{this.getregistValue(operationInfo, '蠕动泵')}</div>
                                                <div style={{ width: '120px', height: '20px', position: 'relative', left: '720px', top: '275px', fontWeight: '700', fontSize: '10px' }}>滤芯下次更换时间：{this.getregistValue(operationInfo, '调节阀滤芯')}</div>
                                                <div style={{ width: '120px', height: '20px', position: 'relative', left: '320px', top: '105px', fontWeight: '700', fontSize: '10px' }}>滤芯下次更换时间：{this.getregistValue(operationInfo, '探头滤芯')}</div>
                                                <div style={{ width: '120px', height: '20px', position: 'relative', left: '1323px', top: '465px', fontWeight: '700', fontSize: '10px' }}>液位值：{this.getregistValue(paramstatusInfo, 'i33501')}</div>
                                                <div style={{ width: '120px', height: '20px', position: 'relative', left: '367px', top: '-120px', fontWeight: '700', fontSize: '10px' }}>探头温度：{this.getregistValue(paramstatusInfo, 'i33003', '°C')}</div>

                                                <div className={wordStatus == "1" ? style.shine_red : ''} style={{ width: '120px', height: '20px', position: 'relative', left: '367px', top: '-120px', fontWeight: '700', fontSize: '10px' }}>工作状态：{this.getStatusName(stateInfo, 'i12001')}</div>
                                                <div className={jzfStatus == "1" ? style.shine_red : ''} style={{ width: '120px', height: '20px', position: 'relative', left: '527px', top: '-30px', fontWeight: '700', fontSize: '10px' }}>截止阀状态：{this.getStatusName(stateInfo, 'i12104')}</div>
                                                <div style={{ width: '120px', height: '20px', position: 'relative', left: '207px', top: '-145px', fontWeight: '700', fontSize: '10px' }}>压差：{this.getStatusName(stateInfo, '压差')}</div>
                                                <div className={ptgStatus == "1" ? style.shine_red : ''} style={{ width: '120px', height: '20px', position: 'relative', left: '207px', top: '-145px', fontWeight: '700', fontSize: '10px' }}>皮托管吹扫：{this.getStatusName(stateInfo, 'i12106')}</div>
                                           
                                                <div className={style.cardcss} style={{ height: '320px', position: 'relative', top: '350px', fontWeight: '700', fontSize: '10px' }}>
                                                    <div style={{ width: '450px', position: 'absolute', top: '10px', left: '25px', fontWeight: '700', fontSize: '10px' }}>

                                                        {this.getrealtimedata('zs01')}
                                                    </div>
                                                    <div style={{ width: '450px', height: '320px', position: 'absolute', left: '525px', top: '10px', fontWeight: '0', fontSize: '10px' }}>

                                                        {this.getrealtimedata('zs02')}
                                                    </div>
                                                    <div style={{ width: '450px', height: '220px', position: 'absolute', left: '1025px', top: '10px', fontWeight: '700', fontSize: '10px' }}>

                                                        {this.getrealtimedata('zs03')}
                                                    </div>
                                                </div>
                                            </div>
                                        </MapInteractionCSS>
                                    </Spin>
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
