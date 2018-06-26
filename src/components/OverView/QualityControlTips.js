import React, { Component } from 'react';
import styles from './OverView.less';

class QualityControlTips extends Component {
    render() {
        return (
            <div>
                <div className={styles.titleborder}>
                    <div className={styles.content}>
                        <h4 className={styles.pointInfo}>近期质控情况（月）</h4>
                        <div style={{fontSize: '18px', color: '#6FC425'}}>质控率：100%</div>
                        <div>应质控：9次</div>
                        <div>实质控：9次</div>
                        <div>上次质控：2018-6-1</div>
                        <div>下次质控时间：2018-6-2</div>
                        <div>平均质控时间：10分钟</div>
                    </div>
                    <div className={styles.clearboth} />
                </div>
                <div style={{marginLeft: '180px', marginTop: '8px', cursor: 'pointer'}}>查看更多>></div>
            </div>
        );
    }
}
export default QualityControlTips;
