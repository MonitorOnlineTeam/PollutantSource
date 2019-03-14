import React, { Component } from 'react';
import {
    Spin, Tabs
} from 'antd';
import { connect } from 'dva';
import styles from './Tree.less';

@connect(({ loading, overview, maintenancelist, workbenchmodel, tasklist, points }) => ({
    //点位数据信息
    treedatalist: overview.data,
    //加载数据
    isloading: loading.effects['overview/querydatalist'],
    dataOne: overview.dataOne,
    DGIMN: maintenancelist.DGIMN, //点击的MN号码（不点击默认加载第一个）
    OperationCalendar: workbenchmodel.OperationCalendar,
    tasklist: tasklist.DGIMN,
    ProcessFlowDiagram: points.DGIMN,
}))

class TreeCardContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {},
        });
    }

    getStatusImg = (value) => {
        if (value === 0) {
            return <img style={{ width: 15 }} src="/gisunline.png" />;
        } if (value === 1) {
            return <img style={{ width: 15 }} src="/gisnormal.png" />;
        } if (value === 2) {
            return <img style={{ width: 15 }} src="/gisover.png" />;
        }
        return <img style={{ width: 15 }} src="/gisexception.png" />;
    }
    //此标识区分背景颜色，因为默认MN号码不在一个model中
    flag = (flags) => {
        switch (flags) {
            case 'OperationCalendar': return this.props.OperationCalendar.DGIMNs;
            case 'tasklist': return this.props.tasklist;
            case 'ProcessFlowDiagram': return this.props.ProcessFlowDiagram;
            default: return this.props.DGIMN;
        }
    }
    getTreeDatalist = () => {
        const { isloading, treedatalist, PollutantType, noselect } = this.props;
        var flag = this.flag(this.props.flag);
        let res = [];
        let pollutantType = this.props.PollutantType;
        if (treedatalist) {
            if (treedatalist.length !== 0) {
                this.props.treedatalist.map((item, key) => {
                    res.push(<div
                        key={key}
                        onClick={() => {
                            this.props.treeCilck(item, key);
                        }}
                        className={(item.DGIMN === flag && !noselect) ? styles.cardDivClick : styles.cardDiv}
                    >
                        <div key={key} className={styles.cardtopspan}>
                            <span className={styles.statusimg}>
                                {this.getStatusImg(item.status)}
                            </span>
                            <span className={styles.pointName}>
                                {item.pointName}
                            </span><span className={styles.pollutantType}>
                                类型：{item.pollutantType ? item.pollutantType : '废气'}
                            </span>
                        </div>
                        <div key={key + 1} className={styles.cardbottomspan}>
                            {
                                pollutantType == 1 ? <span className={styles.tsdiv}></span> : <span className={styles.tsdiv}>
                                    传输有效率 {item.transmissionEffectiveRate}
                                </span>
                            }

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

                });
            }
        } else {
            res = (<div style={{ textAlign: 'center', height: 70, background: '#fff' }}>暂无数据</div>);
        }
        return res;
    }
    render() {
        if (this.props.isloading) {
            return (
                <div style={{
                    width: '400px',
                    background: '#fff',
                    height: this.props.getHeight,
                }}
                >
                    <Spin
                        style={{
                            height: 'calc(100vh/1.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        size="large"
                    />
                </div>
            );
        }
        let { getHeight, treedatalist } = this.props;
        return (
            <div style={{ ...this.props.style, height: getHeight }}>
                {this.getTreeDatalist()}
            </div>
        );
    }
}

export default TreeCardContent;