import React, { Component } from 'react';
import styles from './OverView.less';
import {
    Button,
    Icon
} from 'antd';
import AlarmTips from '../../components/OverView/AlarmTips';
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
                    <div className={styles.titleborder}>
                        <div className={styles.content}>
                            <h4 className={styles.pointInfo}>近期质控情况（月）</h4>
                            <div style={{fontSize: '18px', color: '#6FC425'}}>质控率：100%</div>
                            <div><Icon type="copy" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />应质控：9次</div>
                            <div><Icon type="medicine-box" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />实质控：9次</div>
                            <div><Icon type="edit" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />上次质控：2018-6-1</div>
                            <div><Icon type="calendar" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />下次质控时间：2018-6-2</div>
                            <div><Icon type="file" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />平均质控时间：10分钟</div>
                        </div>
                        <div className={styles.clearboth} />
                    </div>
                    <div style={{paddingLeft: '180px', marginTop: '8px', cursor: 'pointer', paddingBottom: '5px', borderBottom: '1px solid #ddd'}}>查看更多>></div>
                    {Isbutton ? <div>
                        <Button style={{marginTop: '3px', marginLeft: '80px'}} onClick={this.props.NormalClick}>查看报警情况</Button>
                    </div> : ''}
                </div>)
        );
    }
}
export default QualityControlTips;
