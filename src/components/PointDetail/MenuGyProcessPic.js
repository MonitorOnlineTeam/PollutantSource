import React, { Component } from 'react';
import styles from './DataList.less';
import { MapInteractionCSS } from 'react-map-interaction';
import { connect } from 'dva';
import { pollutantInfo, zspollutantInfo } from '../../config';
import {
    Spin,
    Card
} from 'antd';

@connect(({ points, loading }) => ({
    isloading: loading.effects['points/queryprocesschart'],
    flows: points.processchart,
    pointInfo: points.selectpoint,
    operationInfo: points.operationInfo,
    stateInfo: points.stateInfo,
    paramsInfo: points.paramsInfo,
    dataInfo: points.dataInfo,
    paramstatusInfo: points.paramstatusInfo,
    stateNameInfo: points.stateNameInfo,
    paramNameInfo: points.paramNameInfo,
}))
export default class MenuGyProcessPic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 1,
            translation: { x: 0, y: 0 }
        };
    }
    componentWillMount() {
        this.props.dispatch({
            type: 'points/queryprocesschart',
            payload: {
                dgimn: this.props.pointInfo.DGIMN // this.props.pointInfo.DGIMN
            }
        });
        this.props.dispatch({
            type: 'points/queryrealparam',
            payload: {
                dgimn: this.props.pointInfo.DGIMN// sgjt001003
            }
        });
    }

    // 获取状态
    getstatus = () => {
        let res = <span style={{ color: '#A8A6A5' }}>离线</span>;
        if (this.props.flows) {
            switch (this.props.flows.status) {
                case 0: res = <span style={{ color: '#A8A6A5' }}>离线</span>; break;
                case 1:
                case 2: res = <span style={{ color: '#79C403' }}>正常</span>; break;
                case 3: res = <span style={{ color: '#FADE00' }}>异常</span>; break;
            }
        }
        return res;
    }

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
        const { scale, translation } = this.state;
        const { flows, isloading,
            operationInfo, stateInfo, paramsInfo, dataInfo, paramstatusInfo } = this.props;
        //运行状态
        const cemsStatus = this.getSystemStatus(stateInfo, 'i12103');
        //工作状态
        const wordStatus = this.getSystemStatus(stateInfo, 'i12001');
        //截止阀状态
        const jzfStatus = this.getSystemStatus(stateInfo, 'i12104');
        //皮托管状态
        const ptgStatus = this.getSystemStatus(stateInfo, 'i12106');

        return (

            <div className={styles.GyProcessPic} style={{ height: 'calc(100vh - 225px)' }}>
                {isloading ? <Spin style={{
                    width: '100%',
                    height: 'calc(100vh - 260px)',
                    marginTop: 260
                }} size="large" />
                    : <MapInteractionCSS
                        scale={scale}
                        translation={translation}
                        onChange={({ scale, translation }) => this.setState({ scale, translation })}
                        defaultScale={1}
                        defaultTranslation={{ x: 0, y: 0 }}
                        minScale={0.05}
                        maxScale={5}
                        showControls={true}>
                        <div className={styles.imgBg} >
                            <div className={cemsStatus == "1" ? styles.shine_red : ''} style={{ width: '200px', height: '20px', position: 'relative', left: '1250px', top: '20px', fontWeight: '1000', fontSize: '13px' }}>CEMS运行状态：{this.getStatusName(stateInfo, 'i12103')}</div>
                            <div style={{ width: '100px', height: '20px', position: 'relative', left: '400px', top: '186px', fontWeight: '700', fontSize: '10px' }}>管线温度：{this.getregistValue(paramstatusInfo, 'i33001', '°C')}</div>
                            <div style={{ width: '100px', height: '20px', position: 'relative', left: '635px', top: '152px', fontWeight: '700', fontSize: '10px' }}>制冷温度：{this.getregistValue(paramstatusInfo, 'i33002', '°C')}</div>
                            <div style={{ width: '100px', height: '20px', position: 'relative', left: '720px', top: '172px', fontWeight: '700', fontSize: '10px' }}> </div>
                            <div style={{ width: '90px', height: '20px', position: 'relative', left: '890px', top: '160px', fontWeight: '700', fontSize: '10px' }}>下次更换时间：{this.getregistValue(operationInfo, '取样泵')}</div>
                            <div style={{ width: '100px', height: '20px', position: 'relative', left: '890px', top: '182px', fontWeight: '700', fontSize: '10px' }}><span className={!flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.SdAlarm}</span></div>
                            <div style={{ width: '100px', height: '20px', position: 'relative', left: '1070px', top: '225px', fontWeight: '700', fontSize: '10px' }}>下次更换时间：{this.getregistValue(operationInfo, '过滤器')}</div>
                            <div style={{ width: '100px', height: '20px', position: 'relative', left: '860px', top: '240px', fontWeight: '700', fontSize: '10px' }}>下次更换时间：{this.getregistValue(operationInfo, '蠕动泵')}</div>
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '720px', top: '275px', fontWeight: '700', fontSize: '10px' }}>滤芯下次更换时间：{this.getregistValue(operationInfo, '调节阀滤芯')}</div>
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '320px', top: '105px', fontWeight: '700', fontSize: '10px' }}>滤芯下次更换时间：{this.getregistValue(operationInfo, '探头滤芯')}</div>
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '1323px', top: '465px', fontWeight: '700', fontSize: '10px' }}>液位值：{this.getregistValue(paramstatusInfo, 'i33501')}</div>
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '367px', top: '-120px', fontWeight: '700', fontSize: '10px' }}>探头温度：{this.getregistValue(paramstatusInfo, 'i33003', '°C')}</div>

                            <div className={wordStatus == "1" ? styles.shine_red : ''} style={{ width: '120px', height: '20px', position: 'relative', left: '367px', top: '-120px', fontWeight: '700', fontSize: '10px' }}>工作状态：{this.getStatusName(stateInfo, 'i12001')}</div>
                            <div className={jzfStatus == "1" ? styles.shine_red : ''} style={{ width: '120px', height: '20px', position: 'relative', left: '527px', top: '-30px', fontWeight: '700', fontSize: '10px' }}>截止阀状态：{this.getStatusName(stateInfo, 'i12104')}</div>
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '207px', top: '-145px', fontWeight: '700', fontSize: '10px' }}>压差：{this.getStatusName(stateInfo, '压差')}</div>
                            <div className={ptgStatus == "1" ? styles.shine_red : ''} style={{ width: '120px', height: '20px', position: 'relative', left: '207px', top: '-145px', fontWeight: '700', fontSize: '10px' }}>皮托管吹扫：{this.getStatusName(stateInfo, 'i12106')}</div>
                            {/* <div style={{width: '120px', height: '20px', position: 'relative', left: '378px', top: '400px', fontWeight: '700', fontSize: '10px'}}>状态：<span className={flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.QtFxy}</span></div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '893px', top: '380px', fontWeight: '700', fontSize: '10px'}}>状态：<span className={flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.YqcsFxy}</span></div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '1395px', top: '360px', fontWeight: '700', fontSize: '10px'}}>状态：<span className={flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.YcFxy}</span></div> */}
                            <div className={styles.cardcss} style={{ height: '320px', position: 'relative', top: '350px', fontWeight: '700', fontSize: '10px' }}>
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
                }
            </div>
        );
    }
}
