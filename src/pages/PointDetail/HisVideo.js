import React, { Component } from 'react';
import HistoryVideo from '../../components/PointDetail/HistoryVideo';
import styles from './index.less';


/*
页面：5、历史视频
描述：可以和数据、参数、报警等联动查看
add by myt 18.7.9
*/

export default class HisVideo extends Component {
    render() {
        return (
            <div className={styles.videoHeight} style={{height: 'calc(100vh - 225px)'}}>
                <HistoryVideo />
            </div>
        );
    }
}
