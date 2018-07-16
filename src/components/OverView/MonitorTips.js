import React, { Component } from 'react';
import styles from './OverView.less';
import {
    Table,
    Button,
    Icon
} from 'antd';
import ReactEcharts from 'echarts-for-react';
import img from '../../../public/timg.jpg';
import markerspoint from '../../mockdata/OverView/markersInfo.json';
import AlarmTips from '../../components/OverView/AlarmTips';
import AlarmButtom from '../../components/OverView/AlarmButtom';

class MonitorTips extends Component {
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
                            <h4 className={styles.pointInfo}>站点信息</h4>
                            <div><Icon type="environment-o" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />区域：{this.props.region}</div>
                            <div><Icon type="team" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />行业：{this.props.industry}</div>
                            <div><Icon type="api" style={{ fontSize: 14, color: '#A8A6A5', marginRight: '2px' }} />控制级别：{this.props.control}</div>
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
                    <div style={{paddingTop: '5px'}}>
                        <h4>污染物24小时趋势图</h4>
                        <ReactEcharts
                            className={styles.echartdiv}
                            style={{width: '95%', height: '110px'}}
                            option={markerspoint.monitorTrend}
                            notMerge={true}
                            lazyUpdate={true} />
                    </div>
                    <div style={{ margin: '8px 0 0 10px', paddingBottom: '5px' }}>
                        <span onClick={this.props.stationclick} style={{ marginLeft: '225px', cursor: 'pointer' }}>查看更多>></span></div>
                    {Isbutton ? <AlarmButtom /> : ''}
                </div>)
        );
    }
}

export default MonitorTips;
