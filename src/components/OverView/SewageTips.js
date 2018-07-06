import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from './OverView.less';
import markerspoint from '../../mockdata/OverView/markersInfo.json';
import AlarmTips from '../../components/OverView/AlarmTips';
import {
    Button,
    Icon
} from 'antd';
class SewageTips extends Component {
    render() {
        let isAlarm = false;
        const Isbutton = this.props.Isbutton;
        if (Isbutton && this.props.alarmType) {
            isAlarm = true;
        }
        console.log(markerspoint.sewagepieoption);
        return (
            isAlarm
                ? <AlarmTips selectpoint={this.props.selectpoint} AlarmClick={this.props.AlarmClick} />
                : (<div>
                    <div className={styles.titleborder}>
                        <h4 className={styles.pointInfo}>24小时排污量</h4>
                        <ReactEcharts

                            style={{width: '95%', height: '100px'}}
                            option={markerspoint.sewageoption}
                            notMerge={true}
                            lazyUpdate={true} />
                    </div>
                    <div className={styles.titleborder}>
                        <div className={styles.content}>
                            <h4 className={styles.pointInfo}>排量统计</h4>
                            <div><Icon type="tag" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />总排污量:200</div>
                            <div><Icon type="pie-chart" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />排污占比：12.8%</div>
                        </div>
                        <div className={styles.clearboth} />
                    </div>
                    <div className={styles.titleborder}>
                        <h4 className={styles.pointInfo}>排量占比</h4>
                        <ReactEcharts
                            style={{width: '95%', height: '100px'}}
                            option={markerspoint.sewagepieoption}
                            notMerge={true}
                            lazyUpdate={true} />
                    </div>
                    <div style={{margin: '8px 0 0 10px', paddingBottom: '5px', borderBottom: '1px solid #ddd'}}><span style={{cursor: 'pointer'}}>查看工作情况</span>
                        <span onClick={this.props.stationclick} style={{ marginLeft: '80px', cursor: 'pointer' }}>查看更多>></span></div>
                    {Isbutton ? <div>
                        <Button style={{marginTop: '3px', marginLeft: '80px'}} onClick={this.props.NormalClick}>查看报警情况</Button>
                    </div> : ''}
                </div>)
        );
    }
}

export default SewageTips;
