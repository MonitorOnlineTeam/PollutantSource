import React, { Component } from 'react';
import styles from './OverView.less';
import {
    Table
} from 'antd';
import ReactEcharts from 'echarts-for-react';
import img from '../../../public/timg.jpg';
import markerspoint from '../../mockdata/OverView/markersInfo.json';
class MonitorTips extends Component {
    render() {
        return (
            <div>
                <div className={styles.titleborder}>
                    <div className={styles.content}>
                        <h4 className={styles.pointInfo}>站点信息</h4>
                        <div>区域：{this.props.region}</div>
                        <div>行业：{this.props.industry}</div>
                        <div>控制级别：{this.props.control}</div>
                    </div>
                    <img src={img} className={styles.img} />
                    <div className={styles.clearboth} />
                </div>
                <div>
                    <h4>污染物</h4>
                    <Table
                        showHeader={false}
                        bordered={true}
                        size="small"
                        columns={markerspoint.wryinfo}
                        dataSource={markerspoint.wrydata}
                        pagination={false} />
                </div>
                <div className={styles.titleborder}>
                    <h4>污染物24小时趋势图</h4>
                    <ReactEcharts
                        className={styles.echartdiv}
                        style={{width: '95%', height: '100px'}}
                        option={markerspoint.monitorTrend}
                        notMerge={true}
                        lazyUpdate={true} />
                </div>
                <div style={{marginTop: '10px', marginLeft: '10px'}}><span style={{cursor: 'pointer'}}>查看工作情况</span><span onClick={this.props.stationclick} style={{ marginLeft: '80px', cursor: 'pointer' }}>查看更多>></span></div>
            </div>
        );
    }
}

export default MonitorTips;
