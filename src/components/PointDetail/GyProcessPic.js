import React, { Component } from 'react';
import styles from '../PointDetail/DataList.less';
import FlowInfo from '../../mockdata/PointDetail/ProcessFlowDiagram.json';

export default class GyProcessPic extends Component {
    render() {
        const { DGIMN, status } = this.props;
        const flows = FlowInfo.DataList.filter((item) => {
            return item.Status === status;
        });
        return (
            <div className={styles.GyProcessPic} style={{height: 'calc(100vh - 225px)'}}>
                <div className={styles.imgBg} >
                    <div style={{width: '200px', height: '20px', position: 'relative', left: '1250px', top: '20px', fontWeight: '1000', fontSize: '13px'}}>CEMS运行状态：<span className={flows.length === 0 ? styles.AlarmCommon : (flows[0].Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows.length === 0 ? '' : flows[0].CEMSStatus}</span></div>
                    <div style={{width: '100px', height: '20px', position: 'relative', left: '400px', top: '186px', fontWeight: '700', fontSize: '10px'}}>管线：{flows.length === 0 ? '' : flows[0].GxTemperature}</div>
                    <div style={{width: '100px', height: '20px', position: 'relative', left: '635px', top: '152px', fontWeight: '700', fontSize: '10px'}}>制冷温度：{flows.length === 0 ? '' : flows[0].LnqZlTemperature}</div>
                    <div style={{width: '100px', height: '20px', position: 'relative', left: '720px', top: '172px', fontWeight: '700', fontSize: '10px'}}>电磁阀：{flows.length === 0 ? '' : flows[0].Jldcf}</div>
                    <div style={{width: '100px', height: '20px', position: 'relative', left: '890px', top: '160px', fontWeight: '700', fontSize: '10px'}}>下次更换时间：{flows.length === 0 ? '' : flows[0].CybNextChangeTime}</div>
                    <div style={{width: '100px', height: '20px', position: 'relative', left: '890px', top: '182px', fontWeight: '700', fontSize: '10px'}}><span className={flows.length === 0 ? styles.AlarmCommon : (flows[0].Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows.length === 0 ? '' : flows[0].SdAlarm}</span></div>
                    <div style={{width: '100px', height: '20px', position: 'relative', left: '1070px', top: '225px', fontWeight: '700', fontSize: '10px'}}>下次更换时间：{flows.length === 0 ? '' : flows[0].GlqNextChangeTime}</div>
                    <div style={{width: '100px', height: '20px', position: 'relative', left: '860px', top: '240px', fontWeight: '700', fontSize: '10px'}}>下次更换时间：{flows.length === 0 ? '' : flows[0].RdbNextChangeTime}</div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '720px', top: '275px', fontWeight: '700', fontSize: '10px'}}>滤芯下次更换时间：{flows.length === 0 ? '' : flows[0].LxNextChangeTime}</div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '320px', top: '105px', fontWeight: '700', fontSize: '10px'}}>滤芯下次更换时间：{flows.length === 0 ? '' : flows[0].TtLxNextChangeTime}</div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '1323px', top: '465px', fontWeight: '700', fontSize: '10px'}}>液位值：{flows.length === 0 ? '' : flows[0].Ywz}</div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '367px', top: '-120px', fontWeight: '700', fontSize: '10px'}}>探头温度：{flows.length === 0 ? '' : flows[0].TtTemperature}</div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '367px', top: '-120px', fontWeight: '700', fontSize: '10px'}}>报警开关：{flows.length === 0 ? '' : flows[0].TtAlarmKg}</div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '367px', top: '-120px', fontWeight: '700', fontSize: '10px'}}>反吹状态：{flows.length === 0 ? '' : flows[0].TtFc}</div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '527px', top: '-40px', fontWeight: '700', fontSize: '10px'}}>截止阀状态：{flows.length === 0 ? '' : flows[0].Jzf}</div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '207px', top: '-160px', fontWeight: '700', fontSize: '10px'}}>压差：{flows.length === 0 ? '' : flows[0].Cy}</div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '207px', top: '-160px', fontWeight: '700', fontSize: '10px'}}>皮托管吹扫：{flows.length === 0 ? '' : flows[0].PtgCsStatus}</div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '378px', top: '400px', fontWeight: '700', fontSize: '10px'}}>状态：<span className={flows.length === 0 ? styles.AlarmCommon : (flows[0].Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows.length === 0 ? '' : flows[0].QtFxy}</span></div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '893px', top: '380px', fontWeight: '700', fontSize: '10px'}}>状态：<span className={flows.length === 0 ? styles.AlarmCommon : (flows[0].Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows.length === 0 ? '' : flows[0].YqcsFxy}</span></div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '1395px', top: '360px', fontWeight: '700', fontSize: '10px'}}>状态：<span className={flows.length === 0 ? styles.AlarmCommon : (flows[0].Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows.length === 0 ? '' : flows[0].YcFxy}</span></div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '800px', top: '-249px', fontWeight: '700', fontSize: '10px'}}><span className={flows.length === 0 ? styles.AlarmCommon : (flows[0].Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows.length === 0 ? '' : flows[0].ZlqAlarm}</span></div>
                    <div style={{width: '80px', height: '20px', position: 'relative', left: '391px', top: '-165px', fontWeight: '700', fontSize: '10px'}}><span className={flows.length === 0 ? styles.AlarmCommon : (flows[0].Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows.length === 0 ? '' : flows[0].CygxGz}</span></div>
                    <div style={{width: '80px', height: '20px', position: 'relative', left: '225px', top: '-210px', fontWeight: '700', fontSize: '10px'}}><span className={flows.length === 0 ? styles.AlarmCommon : (flows[0].Status !== '0' ? styles.shine_red : styles.AlarmCommon)}>{flows.length === 0 ? '' : flows[0].CyttGz}</span></div>
                    <div style={{width: '450px', height: '220px', position: 'relative', left: '25px', top: '329px', fontWeight: '700', fontSize: '10px'}}>
                        <table className={styles.FormTable}>
                            <thead>
                                <th style={{width: '30%', textAlign: 'left'}}>
    因子
                                </th>
                                <th style={{width: '68%', textAlign: 'left'}}>
    值
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{width: '19%', textAlign: 'left'}}>SO2(mg/m3)</td>
                                    <td style={{width: '81%', textAlign: 'left'}}>{flows.length === 0 ? '' : flows[0].QtFxy_SO2}</td>
                                </tr>
                                <tr>
                                    <td>NOX(mg/m3)</td>
                                    <td>{flows.length === 0 ? '' : flows[0].QtFxy_NOX}</td>
                                </tr>
                                <tr>
                                    <td>温度(℃)</td>
                                    <td>{flows.length === 0 ? '' : flows[0].QtFxy_Temperature}</td>
                                </tr>
                                <tr>
                                    <td>压力(MPa)</td>
                                    <td>{flows.length === 0 ? '' : flows[0].QtFxy_Pressure}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{width: '450px', height: '220px', position: 'relative', left: '525px', top: '95px', fontWeight: '0', fontSize: '10px'}}>
                        <table className={styles.FormTable}>
                            <thead>
                                <th style={{width: '25%', textAlign: 'left'}}>
    参数
                                </th>
                                <th style={{width: '25%', textAlign: 'left'}}>
    值
                                </th>
                                <th style={{width: '25%', textAlign: 'left'}}>
    参数
                                </th>
                                <th style={{width: '25%', textAlign: 'left'}}>
    值
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{width: '25%', textAlign: 'left'}}>流量(m3/h)</td>
                                    <td style={{width: '25%', textAlign: 'left'}}>{flows.length === 0 ? '' : flows[0].YqcsFxy_Flow}</td>
                                    <td style={{width: '25%', textAlign: 'left'}}>流速(m/s)</td>
                                    <td style={{width: '25%', textAlign: 'left'}}>{flows.length === 0 ? '' : flows[0].YqcsFxy_FlowSpeed}</td>
                                </tr>
                                <tr>
                                    <td>含氧量(%)</td>
                                    <td>{flows.length === 0 ? '' : flows[0].YqcsFxy_O2}</td>
                                    <td>温度(℃)</td>
                                    <td>{flows.length === 0 ? '' : flows[0].YqcsFxy_Temperature}</td>
                                </tr>
                                <tr>
                                    <td>湿度(%)</td>
                                    <td>{flows.length === 0 ? '' : flows[0].YqcsFxy_Sd}</td>
                                    <td>截面积</td>
                                    <td>{flows.length === 0 ? '' : flows[0].YqcsFxy_AectionalArea}</td>
                                </tr>
                                <tr>
                                    <td>截距</td>
                                    <td>{flows.length === 0 ? '' : flows[0].YqcsFxy_Intercept}</td>
                                    <td>压力</td>
                                    <td>{flows.length === 0 ? '' : flows[0].YqcsFxy_Pressure}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{width: '450px', height: '220px', position: 'relative', left: '1025px', top: '-139px', fontWeight: '700', fontSize: '10px'}}>
                        <table className={styles.FormTable}>
                            <thead>
                                <th style={{width: '30%', textAlign: 'left'}}>
    因子
                                </th>
                                <th style={{width: '68%', textAlign: 'left'}}>
    值
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{width: '19%', textAlign: 'left'}}>实测烟尘(mg/m3)</td>
                                    <td style={{width: '81%', textAlign: 'left'}}>{flows.length === 0 ? '' : flows[0].Scyc}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
