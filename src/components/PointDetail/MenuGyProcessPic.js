import React, { Component } from 'react';
import styles from './DataList.less';
import { MapInteractionCSS } from 'react-map-interaction';
import { connect } from 'dva';
import { pollutantInfo } from '../../config';
import {
    Spin,
    Card
} from 'antd';

@connect(({ points, loading }) => ({
    isloading: loading.effects['points/queryprocesschart'],
    flows: points.processchart,
    pointInfo: points.selectpoint,
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
                dgimn: this.props.DGIMN 
            }
        });
    }
    addstateInfo = (status) => {
        const res = [];
        if (this.props.flows && this.props.flows[status + '_stateInfo']) {
            this.props.flows[status + '_stateInfo'].map((item, key) => {
                res.push(<tr>
                    <td>
                        {item.stateName}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        {item.stateValue}
                    </td>
                </tr>);
            });
        }
        return res;
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
    render() {
        const { scale, translation } = this.state;
        const { flows, isloading } = this.props;
        debugger
        return (
            <div className={styles.GyProcessPic}>
                <Spin style={{
                    width: '100%',
                    height: 'calc(100vh - 260px)',
                    marginTop: 260
                }} spinning={this.props.isloading} >
                    <MapInteractionCSS
                        scale={scale}
                        translation={translation}
                        onChange={({ scale, translation }) => this.setState({ scale, translation })}
                        defaultScale={1}
                        defaultTranslation={{ x: 0, y: 0 }}
                        minScale={0.05}
                        maxScale={5}
                        showControls={true}>
                        <div className={styles.imgBg} >
                            <div style={{ width: '200px', height: '20px', position: 'relative', left: '1250px', top: '20px', fontWeight: '1000', fontSize: '13px' }}>CEMS运行状态： {this.getstatus()}</div>
                            <div style={{ width: '100px', height: '20px', position: 'relative', left: '400px', top: '186px', fontWeight: '700', fontSize: '10px' }}>管线温度：{flows === null ? '暂未上传' : flows['系统采样管线温度'] + '°C'}</div>
                            <div style={{ width: '100px', height: '20px', position: 'relative', left: '635px', top: '152px', fontWeight: '700', fontSize: '10px' }}>制冷温度：{flows === null ? '暂未上传' : flows['系统冷凝器温度'] + '°C'}</div>
                            <div style={{ width: '100px', height: '20px', position: 'relative', left: '720px', top: '172px', fontWeight: '700', fontSize: '10px' }}>电磁阀：{flows === null ? '暂未上传' : flows.Jldcf}</div>
                            <div style={{ width: '90px', height: '20px', position: 'relative', left: '890px', top: '160px', fontWeight: '700', fontSize: '10px' }}>下次更换时间：{flows === null ? '  暂未上传' : flows['取样泵']}</div>
                            <div style={{ width: '100px', height: '20px', position: 'relative', left: '890px', top: '182px', fontWeight: '700', fontSize: '10px' }}><span className={flows === null ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows === null ? '' : flows.SdAlarm !== undefined ? flows.SdAlarm : ''}</span></div>
                            <div style={{ width: '100px', height: '20px', position: 'relative', left: '1070px', top: '225px', fontWeight: '700', fontSize: '10px' }}>下次更换时间：{flows === null ? '暂未上传' : flows['过滤器']}</div>
                            <div style={{ width: '100px', height: '20px', position: 'relative', left: '860px', top: '240px', fontWeight: '700', fontSize: '10px' }}>下次更换时间：{flows === null ? '暂未上传' : flows['蠕动泵']}</div>
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '720px', top: '275px', fontWeight: '700', fontSize: '10px' }}>滤芯下次更换时间：{flows === null ? '暂未上传' : flows['调节阀滤芯']}</div>
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '320px', top: '105px', fontWeight: '700', fontSize: '10px' }}>滤芯下次更换时间：{flows === null ? '暂未上传' : flows['探头滤芯']}</div>
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '1323px', top: '465px', fontWeight: '700', fontSize: '10px' }}>液位值：{flows === null ? '' : flows['液位高度']}</div>
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '367px', top: '-120px', fontWeight: '700', fontSize: '10px' }}>探头温度：{flows === null ? '暂未上传' : flows['系统采样探头温度'] + '°C'}</div>
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '367px', top: '-120px', fontWeight: '700', fontSize: '10px' }}>工作状态：{flows === null ? '暂未上传' : flows['工作状态']}</div>
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '527px', top: '-30px', fontWeight: '700', fontSize: '10px' }}>截止阀状态：{flows === null ? '暂未上传' : flows['截止阀故障']}</div>
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '207px', top: '-145px', fontWeight: '700', fontSize: '10px' }}>压差：{flows === null ? '暂未上传' : flows['压差']}</div>
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '207px', top: '-145px', fontWeight: '700', fontSize: '10px' }}>皮托管吹扫：{flows === null ? '暂未上传' : flows['皮托管吹扫']}</div>
                            {/* <div style={{width: '120px', height: '20px', position: 'relative', left: '378px', top: '400px', fontWeight: '700', fontSize: '10px'}}>状态：<span className={flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.QtFxy}</span></div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '893px', top: '380px', fontWeight: '700', fontSize: '10px'}}>状态：<span className={flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.YqcsFxy}</span></div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '1395px', top: '360px', fontWeight: '700', fontSize: '10px'}}>状态：<span className={flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.YcFxy}</span></div> */}
                            <div style={{ width: '120px', height: '20px', position: 'relative', left: '800px', top: '-249px', fontWeight: '700', fontSize: '10px' }}><span className={flows === null ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows === null ? '' : flows.ZlqAlarm}</span></div>
                            <div style={{ width: '80px', height: '20px', position: 'relative', left: '391px', top: '-165px', fontWeight: '700', fontSize: '10px' }}><span className={flows === null ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows === null ? '' : flows.CygxGz}</span></div>
                            <div style={{ width: '80px', height: '20px', position: 'relative', left: '225px', top: '-210px', fontWeight: '700', fontSize: '10px' }}><span className={flows === null ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows === null ? '' : flows.CyttGz}</span></div>
                            <div className={styles.cardcss} style={{ height: '320px', position: 'relative', top: '350px', fontWeight: '700', fontSize: '10px' }}>
                                <div style={{ width: '450px', position: 'relative', top: '5px', left: '25px', fontWeight: '700', fontSize: '10px' }}>
                                    <Card title="烟尘分析仪" style={{ borderRadius: 10 }}>
                                        <table className={styles.FormTable}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: '40%', textAlign: 'center' }}>烟尘(mg/m3)</td>
                                                    <td style={{ width: '60%', textAlign: 'center' }}>{flows === null ? '' : flows['zs01']}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '40%', textAlign: 'center' }}>
                                                        截距
                                                    </td>
                                                    <td style={{ width: '60%', textAlign: 'center' }}>
                                                        {flows !== null ? (flows['zs01_截距'] ? flows['zs01_截距'] : '暂未上传') : '暂未上传'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '40%', textAlign: 'center' }}>
                                                        斜率
                                                    </td>
                                                    <td style={{ width: '60%', textAlign: 'center' }}>
                                                        {flows !== null ? (flows['zs01_斜率'] ? flows['zs01_斜率'] : '暂未上传') : '暂未上传'}
                                                    </td>
                                                </tr>
                                                <tr style={{ border: 'none' }}>
                                                    <td style={{ width: '40%', textAlign: 'center' }}>
                                                        测量量程
                                                    </td>
                                                    <td style={{ width: '60%', textAlign: 'center' }}>
                                                        {flows !== null ? (flows['zs01_测量量程'] ? flows['zs01_测量量程'] : '暂未上传') : '暂未上传'}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Card>
                                </div>
                                <div style={{ width: '450px', height: '320px', position: 'relative', left: '525px', top: '-266px', fontWeight: '0', fontSize: '10px' }}>
                                    <Card title="二氧化硫分析仪" style={{ borderRadius: 10 }}>
                                        <table className={styles.FormTable}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: '40%', textAlign: 'center' }}>二氧化硫(mg/m3)</td>
                                                    <td style={{ width: '60%', textAlign: 'center' }}>{flows === null !== null ? '' : flows['zs02']}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '40%', textAlign: 'center' }}>
                                                        截距
                                                    </td>
                                                    <td style={{ width: '60%', textAlign: 'center' }}>
                                                        {flows !== null ? (flows['zs02_截距'] ? flows['zs02_截距'] : '暂未上传') : '暂未上传'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '40%', textAlign: 'center' }}>
                                                        斜率
                                                    </td>
                                                    <td style={{ width: '60%', textAlign: 'center' }}>
                                                        {flows !== null ? (flows['zs02_斜率'] ? flows['zs02_斜率'] : '暂未上传') : '暂未上传'}
                                                    </td>
                                                </tr>
                                                <tr style={{ border: 'none' }}>
                                                    <td style={{ width: '40%', textAlign: 'center' }}>
                                                        测量量程
                                                    </td>
                                                    <td style={{ width: '60%', textAlign: 'center' }}>
                                                        {flows !== null ? (flows['zs02_测量量程'] ? flows['zs02_测量量程'] : '暂未上传') : '暂未上传'}
                                                    </td>
                                                </tr>
                                                {
                                                    this.addstateInfo('02')
                                                }
                                            </tbody>
                                        </table>
                                    </Card>
                                </div>
                                <div style={{ width: '450px', height: '220px', position: 'relative', left: '1025px', top: '-584px', fontWeight: '700', fontSize: '10px' }}>
                                    <Card title="氮氧化物分析仪" style={{ borderRadius: 10 }}>
                                        <table className={styles.FormTable}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: '40%', textAlign: 'center' }}>氮氧化物(mg/m3)</td>
                                                    <td style={{ width: '60%', textAlign: 'center' }}>{flows === null ? '' : flows['zs03']}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '40%', textAlign: 'center' }}>
                                                        截距
                                                    </td>
                                                    <td style={{ width: '60%', textAlign: 'center' }}>
                                                        {flows !== null ? (flows['zs03_截距'] ? flows['zs03_截距'] : '暂未上传') : '暂未上传'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '40%', textAlign: 'center' }}>
                                                        斜率
                                                    </td>
                                                    <td style={{ width: '60%', textAlign: 'center' }}>
                                                        {flows !== null ? (flows['zs03_斜率'] ? flows['zs03_斜率'] : '暂未上传') : '暂未上传'}
                                                    </td>
                                                </tr>
                                                <tr style={{ border: 'none' }}>
                                                    <td style={{ width: '40%', textAlign: 'center' }}>
                                                        测量量程
                                                    </td>
                                                    <td style={{ width: '60%', textAlign: 'center' }}>
                                                        {flows !== null ? (flows['zs03_测量量程'] ? flows['zs03_测量量程'] : '暂未上传') : '暂未上传'}
                                                    </td>
                                                </tr>
                                                {
                                                    this.addstateInfo('03')
                                                }
                                            </tbody>
                                        </table>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </MapInteractionCSS>
                </Spin>
            </div>
        );
    }
}
