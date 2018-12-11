import React, { Component } from 'react';
import styles from './OverView.less';
class TransmissionEfficiency extends Component {
    render() {
        const selectdata = this.props.selectdata;
        return (
            <div style={{background: '#fff', borderRadius: 10, width: 420, height: 107}}>
                <div className={styles.teimgbg}>
                  传输有效率
                    <div className={styles.rate}>
                        { selectdata ? (selectdata.transmissionEffectiveRate ? selectdata.transmissionEffectiveRate : '-') : '-'}
                    </div>
                </div>
                <div className={styles.teimgbg}>
                  传输率
                    <div className={styles.rate}>
                        { selectdata ? (selectdata.transmissionRate ? selectdata.transmissionRate : '-') : '-'}
                    </div>
                </div>
                <div className={styles.teimgbg}>
                  有效率
                    <div className={styles.rate}>
                        { selectdata ? (selectdata.effectiveRate ? selectdata.effectiveRate : '-') : '-'}
                    </div>
                </div>
            </div>
        );
    }
}

export default TransmissionEfficiency;
