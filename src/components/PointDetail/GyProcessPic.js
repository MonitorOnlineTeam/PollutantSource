import React, { Component } from 'react';
import styles from '../PointDetail/DataList.less';
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
export default class GyProcessPic extends Component {
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
                dgimn: 'sgjt001003'
            }
        });
    }
    addstateInfo=(status) => {
        const res = [];
        if (this.props.flows && this.props.flows[status + '_stateInfo']) {
            this.props.flows[status + '_stateInfo'].map((item, key) => {
                res.push(<tr>
                    <td>
                        {item.stateName}
                    </td>
                    <td style={{textAlign: 'center'}}>
                        {item.stateValue}
                    </td>
                </tr>);
            });
        }
        return res;
    }
    // 获取状态
    getstatus=() => {
        let res = <span style={{color: '#A8A6A5'}}>离线</span>;
        if (this.props.flows) {
            switch (this.props.flows.status) {
                case 0:res = <span style={{color: '#A8A6A5'}}>离线</span>; break;
                case 1:
                case 2:res = <span style={{color: '#79C403'}}>正常</span>; break;
                case 3:res = <span style={{color: '#FADE00'}}>异常</span>; break;
            }
        }
        return res;
    }
    render() {
        const { scale, translation } = this.state;
        const { flows, isloading, pointInfo } = this.props;
        console.log(pointInfo);
        console.log(flows);
        return (
            <div className={styles.GyProcessPic} style={{height: 'calc(100vh - 225px)'}}>
                { isloading ? <Spin style={{width: '100%',
                    height: 'calc(100vh - 260px)',
                    marginTop: 260 }} size="large" />
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
                            <div style={{width: '200px', height: '20px', position: 'relative', left: '1250px', top: '20px', fontWeight: '1000', fontSize: '13px'}}>CEMS运行状态： {this.getstatus()}</div>
                            <div style={{width: '100px', height: '20px', position: 'relative', left: '400px', top: '186px', fontWeight: '700', fontSize: '10px'}}>管线：{flows ? '' : flows.GxTemperature}</div>
                            <div style={{width: '100px', height: '20px', position: 'relative', left: '635px', top: '152px', fontWeight: '700', fontSize: '10px'}}>制冷温度：{flows ? '' : flows.LnqZlTemperature}</div>
                            <div style={{width: '100px', height: '20px', position: 'relative', left: '720px', top: '172px', fontWeight: '700', fontSize: '10px'}}>电磁阀：{flows ? '' : flows.Jldcf}</div>
                            <div style={{width: '100px', height: '20px', position: 'relative', left: '890px', top: '160px', fontWeight: '700', fontSize: '10px'}}>下次更换时间：{flows ? '' : flows.CybNextChangeTime}</div>
                            <div style={{width: '100px', height: '20px', position: 'relative', left: '890px', top: '182px', fontWeight: '700', fontSize: '10px'}}><span className={flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.SdAlarm}</span></div>
                            <div style={{width: '100px', height: '20px', position: 'relative', left: '1070px', top: '225px', fontWeight: '700', fontSize: '10px'}}>下次更换时间：{flows ? '' : flows.GlqNextChangeTime}</div>
                            <div style={{width: '100px', height: '20px', position: 'relative', left: '860px', top: '240px', fontWeight: '700', fontSize: '10px'}}>下次更换时间：{flows ? '' : flows.RdbNextChangeTime}</div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '720px', top: '275px', fontWeight: '700', fontSize: '10px'}}>滤芯下次更换时间：{flows ? '' : flows.LxNextChangeTime}</div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '320px', top: '105px', fontWeight: '700', fontSize: '10px'}}>滤芯下次更换时间：{flows ? '' : flows.TtLxNextChangeTime}</div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '1323px', top: '465px', fontWeight: '700', fontSize: '10px'}}>液位值：{flows ? '' : flows.Ywz}</div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '367px', top: '-120px', fontWeight: '700', fontSize: '10px'}}>探头温度：{flows ? '' : flows.TtTemperature}</div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '367px', top: '-120px', fontWeight: '700', fontSize: '10px'}}>报警开关：{flows ? '' : flows.TtAlarmKg}</div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '367px', top: '-120px', fontWeight: '700', fontSize: '10px'}}>反吹状态：{flows ? '' : flows.TtFc}</div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '527px', top: '-40px', fontWeight: '700', fontSize: '10px'}}>截止阀状态：{flows ? '' : flows.Jzf}</div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '207px', top: '-160px', fontWeight: '700', fontSize: '10px'}}>压差：{flows ? '' : flows.Cy}</div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '207px', top: '-160px', fontWeight: '700', fontSize: '10px'}}>皮托管吹扫：{flows ? '' : flows.PtgCsStatus}</div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '378px', top: '400px', fontWeight: '700', fontSize: '10px'}}>状态：<span className={flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.QtFxy}</span></div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '893px', top: '380px', fontWeight: '700', fontSize: '10px'}}>状态：<span className={flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.YqcsFxy}</span></div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '1395px', top: '360px', fontWeight: '700', fontSize: '10px'}}>状态：<span className={flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.YcFxy}</span></div>
                            <div style={{width: '120px', height: '20px', position: 'relative', left: '800px', top: '-249px', fontWeight: '700', fontSize: '10px'}}><span className={flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.ZlqAlarm}</span></div>
                            <div style={{width: '80px', height: '20px', position: 'relative', left: '391px', top: '-165px', fontWeight: '700', fontSize: '10px'}}><span className={flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.CygxGz}</span></div>
                            <div style={{width: '80px', height: '20px', position: 'relative', left: '225px', top: '-210px', fontWeight: '700', fontSize: '10px'}}><span className={flows ? styles.AlarmCommon : (flows.Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows ? '' : flows.CyttGz}</span></div>
                            <div style={{background: '#ECECEC', height: '320px', position: 'relative', top: '260px', fontWeight: '700', fontSize: '10px'}}>
                                <div style={{width: '450px', position: 'relative', top: '5px', left: '25px', fontWeight: '700', fontSize: '10px'}}>
                                    <Card title="烟尘分析仪" style={{ borderRadius: 10, overflowY: 'auto', height: 300 }}>
                                        <table className={styles.FormTable}>
                                            <tbody>
                                                <tr>
                                                    <td style={{width: '40%', textAlign: 'left'}}>烟尘(mg/m3)</td>
                                                    <td style={{width: '60%', textAlign: 'center'}}>{!flows ? '' : flows['01']}</td>
                                                </tr>
                                                {
                                                    this.addstateInfo('01')
                                                }
                                            </tbody>
                                        </table>
                                    </Card>
                                </div>
                                <div style={{width: '450px', height: '320px', position: 'relative', left: '525px', top: '-296px', fontWeight: '0', fontSize: '10px'}}>
                                    <Card title="二氧化硫分析仪" style={{ borderRadius: 10, overflowY: 'auto', height: 300 }}>
                                        <table className={styles.FormTable}>
                                            <tbody>
                                                <tr>
                                                    <td style={{width: '40%', textAlign: 'left'}}>二氧化硫(mg/m3)</td>
                                                    <td style={{width: '60%', textAlign: 'center'}}>{!flows ? '' : flows['02']}</td>
                                                </tr>
                                                {
                                                    this.addstateInfo('02')
                                                }
                                            </tbody>
                                        </table>
                                    </Card>
                                </div>
                                <div style={{width: '450px', height: '220px', position: 'relative', left: '1025px', top: '-617px', fontWeight: '700', fontSize: '10px'}}>
                                    <Card title="氮氧化物分析仪" style={{ borderRadius: 10, overflowY: 'auto', height: 300 }}>
                                        <table className={styles.FormTable}>
                                            <tbody>
                                                <tr>
                                                    <td style={{width: '40%', textAlign: 'left'}}>氮氧化物(mg/m3)</td>
                                                    <td style={{width: '60%', textAlign: 'center'}}>{!flows ? '' : flows['03']}</td>
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
                }
            </div>
        );
    }
}
