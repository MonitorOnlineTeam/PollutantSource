import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from './OverView.less';
import {
    Spin,
} from 'antd';
class ChartData extends Component {
    render() {
        return (
            <div style={{background: '#fff', borderRadius: 10, width: 420, height: 240}}>
                <div style={{fontSize: 16, textAlign: 'center', padding: '10px 15px 10px 15px'}}>{this.props.pollutantName}24小时趋势图</div>
                {this.props.isloading ? <Spin style={{width: '100%',
                    height: 'calc(100vh - 260px)',
                    marginTop: 60 }} size="large" /> : (this.props.existdata ?
                        <ReactEcharts
                        className={styles.echartdiv}
                        style={{width: '100%', height: '200px', textAlign: 'center', padding: '0 15px 0 15px'}}
                        option={this.props.chartdata}
                        notMerge={true}
                        lazyUpdate={true} /> :
                    <img style={{width: 150, marginLeft: 120, marginTop: 70}} src="../../../nodata.png" />)}
            </div>
        );
    }
}
export default ChartData;
