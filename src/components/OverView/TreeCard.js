import React, { Component } from 'react';
import styles from './Tree.less';
import {
    Spin,
} from 'antd';
class TreeCard extends Component {
    render() {
        return (
            <div style={{ height: 'calc(100vh - 200px)' }} className={styles.treelist}>
                {
                    this.props.isloading ? <Spin style={{width: '100%',
                        height: 'calc(100vh - 260px)',
                        marginTop: 260 }} size="large" /> : (this.props.treedatalist ? this.props.treedatalist.map(item => {
                        return (<div onClick={() => {
                            this.props.treeCilck(item);
                        }} className={styles.cardDiv}>
                            <div className={styles.cardtopspan}>
                                <span className={styles.statusimg}>
                                    { this.props.getStatusImg(item.status)}
                                </span>
                                <span className={styles.pointName}>
                                    { item.pointName}
                                </span><span className={styles.pollutantType}>
                                类型：{item.pollutantType ? item.pollutantType : '废气'}</span>
                            </div>
                            <div className={styles.cardbottomspan}><span className={styles.tsdiv}>
                                传输有效率 {item.transmissionEffectiveRate}</span>{
                                item.existTask ? <span className={styles.operation}>运维中</span> : ''
                            }
                            </div>
                        </div>);
                    }) : '')
                }
            </div>
        );
    }
}

export default TreeCard;
