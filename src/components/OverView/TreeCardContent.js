import React, { Component } from 'react';
import {
    Spin, Tabs
} from 'antd';
import styles from './Tree.less';
class TreeCardContent extends Component {
    constructor(props) {
        super(props);
    }
    getTreeDatalist = () => {
        const { isloading, treedatalist, PollutantType } = this.props;
        let res = [];
        if (treedatalist) {
            this.props.treedatalist.map((item, key) => {
                let treecardcss = styles.cardDiv;
                if (item.pollutantTypeCode === this.props.PollutantType) {
                    if (this.props.ifSelect) {
                        if (item.DGIMN === localStorage.getItem('DGIMN')) {
                            treecardcss = styles.cardDivClick;
                        }
                    }
                    res.push(<div onClick={() => {
                        this.props.treeCilck(item, key);
                    }} className={treecardcss}>
                        <div className={styles.cardtopspan}>
                            <span className={styles.statusimg}>
                                {this.props.getStatusImg(item.status)}
                            </span>
                            <span className={styles.pointName}>
                                {item.pointName}
                            </span><span className={styles.pollutantType}>
                                类型：{item.pollutantType ? item.pollutantType : '废气'}</span>
                        </div>
                        <div className={styles.cardbottomspan}><span className={styles.tsdiv}>
                            传输有效率 {item.transmissionEffectiveRate}</span>
                            {
                                item.scene ? <span className={styles.operation}>运维中</span> : ''
                            }
                            {
                                item.warning ? <span className={styles.warning}>预警中</span> : ''
                            }
                            {
                                item.fault ? <span className={styles.fault}>故障中</span> : ''
                            }
                            {
                                item.status == 4 ? <span className={styles.stop}>停产中</span> : ''
                            }
                        </div>
                    </div>);
                }
            })
        }
        else {
            res = (<div style={{ textAlign: 'center', height: 70, background: '#fff' }}>暂无数据</div>)
        }
        return res;
    }
    render() {
        const { pollutantTypeloading } = this.props;
        if (pollutantTypeloading) {
            if (this.props.isloading) {
                return (
                    <div style={{
                        width: '400px',
                        background: '#fff',
                        height: this.props.getHeight,
                    }}>
                        <Spin
                            style={{
                                // width: '100%',
                                height: 'calc(100vh/2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            size="large"
                        />
                    </div>

                );
            }
        }

        let { getHeight, treedatalist } = this.props;
        // if (!treedatalist || !treedatalist[0]) {
        //     getHeight = 70;
        // }
        return (
            <div style={{ ...this.props.style, height: getHeight }}>
                {this.getTreeDatalist()}
            </div>
        );
    }
}

export default TreeCardContent;