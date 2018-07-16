import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from './OverView.less';
import markerspoint from '../../mockdata/OverView/markersInfo.json';
import AlarmTips from '../../components/OverView/AlarmTips';
import AlarmButtom from '../../components/OverView/AlarmButtom';
import {
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
                            <div><Icon type="tag" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />总排污量:200（吨）</div>
                            <div><Icon type="pie-chart" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />排污占比：12.8%</div>
                        </div>
                        <div className={styles.clearboth} />
                    </div>
                    <div style={{paddingTop: '5px', paddingBottom: '10px'}}>
                        <h4 className={styles.pointInfo}>排量占比</h4>
                        <ReactEcharts
                            style={{width: '95%', height: '150px'}}
                            option={markerspoint.sewagepieoption}
                            notMerge={true}
                            lazyUpdate={true} />

                    </div>
                    {/* <div style={{ margin: '8px 0 0 10px', paddingBottom: '5px' }}>
                        <span onClick={this.props.stationclick} style={{ marginLeft: '225px', cursor: 'pointer' }}>查看更多>></span></div> */}
                    {Isbutton ? <AlarmButtom NormalClick={this.props.NormalClick} /> : ''}
                </div>)
        );
    }
}

export default SewageTips;
