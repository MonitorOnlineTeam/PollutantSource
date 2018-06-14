import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from './OverView.less';
import markerspoint from '../../mockdata/OverView/markersInfo.json';
class SewageTips extends Component {
    render() {
        return (
            <div>
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
                        <div>总排污量:200</div>
                        <div>排污占比：12.8%</div>
                    </div>
                    <div className={styles.clearboth} />
                </div>
                <div className={styles.titleborder}>
                    <ReactEcharts
                        style={{width: '95%', height: '100px'}}
                        option={markerspoint.sewagepieoption}
                        notMerge={true}
                        lazyUpdate={true} />
                </div>
            </div>
        );
    }
}

export default SewageTips;
