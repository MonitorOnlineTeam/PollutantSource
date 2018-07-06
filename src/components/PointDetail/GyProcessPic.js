import React, { Component } from 'react';
import styles from '../PointDetail/DataList.less';
import FlowInfo from '../../mockdata/PointDetail/ProcessFlowDiagram.json';

export default class GyProcessPic extends Component {
    render() {
        const { DGIMN, status } = this.props;
        const flows = FlowInfo.DataList.filter((item) => {
            return item.DGMIN === DGIMN && item.Status === status;
        });

        return (
            <div className={styles.GyProcessPic} style={{height: 'calc(100vh - 225px)'}}>
                <div className={styles.imgBg} >
                    <div style={{width: '200px', height: '20px', position: 'relative', left: '1250px', top: '20px', fontWeight: '1000', fontSize: '13px'}}>CEMS运行状态：{flows.length === 0 ? '' : flows[0].CEMSStatus}</div>
                    <div style={{width: '100px', height: '20px', position: 'relative', left: '400px', top: '186px', fontWeight: '700', fontSize: '10px'}}>管线：{flows.length === 0 ? '' : flows[0].GxTemperature}</div>
                    <div style={{width: '100px', height: '20px', position: 'relative', left: '635px', top: '152px', fontWeight: '700', fontSize: '10px'}}>制冷温度：{flows.length === 0 ? '' : flows[0].LnqZlTemperature}</div>
                    <div style={{width: '100px', height: '20px', position: 'relative', left: '720px', top: '172px', fontWeight: '700', fontSize: '10px'}}>电磁阀：{flows.length === 0 ? '' : flows[0].Jldcf}</div>
                    <div style={{width: '100px', height: '20px', position: 'relative', left: '890px', top: '160px', fontWeight: '700', fontSize: '10px'}}>下次更换时间：{flows.length === 0 ? '' : flows[0].CybNextChangeTime}</div>
                    <div style={{width: '100px', height: '20px', position: 'relative', left: '890px', top: '182px', fontWeight: '700', fontSize: '10px'}}>{flows.length === 0 ? '' : flows[0].SdAlarm}</div>
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
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '392px', top: '400px', fontWeight: '700', fontSize: '10px'}}>状态：{flows.length === 0 ? '' : flows[0].QtFxy}</div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '893px', top: '380px', fontWeight: '700', fontSize: '10px'}}>状态：{flows.length === 0 ? '' : flows[0].YqcsFxy}</div>
                    <div style={{width: '120px', height: '20px', position: 'relative', left: '1395px', top: '360px', fontWeight: '700', fontSize: '10px'}}>状态：{flows.length === 0 ? '' : flows[0].YcFxy}</div>
                </div>

            </div>
        );
    }
}
