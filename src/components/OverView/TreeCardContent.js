import React, { Component } from 'react';
import {
    Spin, Tabs
} from 'antd';
import {connect} from 'dva';
import styles from './Tree.less';

@connect(({ loading, overview }) => ({
    //点位数据信息
    treedatalist: overview.data,
    //加载数据
    isloading:loading.effects['overview/querydatalist']
}))

class TreeCardContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDgimn: localStorage.getItem('DGIMN')
        };
    }

    componentWillMount(){

    }

    getStatusImg=(value) => {
        if (value === 0) {
            return <img style={{width:15}} src="/gisunline.png" />;
        } if (value === 1) {
            return <img style={{width:15}} src="/gisnormal.png" />;
        } if (value === 2) {
            return <img style={{width:15}} src="/gisover.png" />;
        }
        return <img style={{width:15}} src="/gisexception.png" />;
    }


    getTreeDatalist = () => {
        const { isloading, treedatalist, PollutantType,noselect } = this.props;
        let res = [];
        let pollutantType=this.props.PollutantType;

        if (treedatalist) {
            this.props.treedatalist.map((item, key) => {
                res.push(<div
                    key={key}
                    onClick={() => {
                        this.props.treeCilck(item, key);
                        this.setState({
                            selectDgimn:item.DGIMN
                        });
                    }}
                    className={(item.DGIMN===this.state.selectDgimn && !noselect)?styles.cardDivClick:styles.cardDiv}
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
                    <div key={key+1} className={styles.cardbottomspan}>
                    {
                        pollutantType==1?<span className={styles.tsdiv}></span>: <span className={styles.tsdiv}>
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