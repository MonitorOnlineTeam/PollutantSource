import React, { Component } from 'react';
import styles from './OverView.less';
import {
    Button,
    Icon
} from 'antd';
import AlarmTips from '../../components/OverView/AlarmTips';
import AlarmButtom from '../../components/OverView/AlarmButtom';
class QualityControlTips extends Component {
    render() {
        let isAlarm = false;
        const Isbutton = this.props.Isbutton;
        if (Isbutton && this.props.alarmType) {
            isAlarm = true;
        }
        return (
            isAlarm
                ? <AlarmTips selectpoint={this.props.selectpoint} AlarmClick={this.props.AlarmClick} />
                : (<div>
                    <div style={{paddingTop: '5px', paddingBottom: '10px'}}>
                        <div className={styles.content}>
                            <h4 className={styles.pointInfo}>近期质控情况（月）</h4>
                            <div style={{fontSize: '18px', color: '#6FC425'}}>零点偏差：-0.5</div>
                            <div style={{fontSize: '18px', color: '#6FC425'}}>量程偏差：0.5</div>
                            <div><Icon type="copy" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />应质控：9次</div>
                            <div><Icon type="medicine-box" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />实质控：9次</div>
                            <div><Icon type="edit" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />上次质控：2018-6-1</div>
                            <div><Icon type="calendar" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />下次质控时间：2018-6-2</div>
                        </div>
                        <div className={styles.clearboth} />
                    </div>
                    {/* <div onClick={this.props.stationclick} style={{paddingLeft: '225px', marginTop: '8px', cursor: 'pointer', paddingBottom: '5px'}}>查看更多>></div> */}
                    {Isbutton ? <AlarmButtom NormalClick={this.props.NormalClick} /> : ''}
                </div>)
        );
    }
}
export default QualityControlTips;
