import React, { Component } from 'react';
import styles from './OverView.less';
import { Button } from 'antd/lib/radio';
class TreeStatus extends Component {
    render() {
        return (
            <div style={{
                width: 420,
                height: 75,
                background: '#fff',
                borderRadius: 7,
                boxShadow: 'rgba(136, 136, 136, 0.41) 4px 3px 9px'
            }}>
                <div className={styles.statuslist}>
                    <span><img src="../../../gisunline.png" />离线</span>
                    <span><img src="../../../gisnormal.png" />在线</span>
                    <span><img src="../../../gisover.png" />超标</span>
                    <span><img src="../../../gisexception.png" />异常</span>
                </div>
                <div style={{borderBottom: '1px solid #EBEBEB'}} />
                <div style={{marginLeft: 120, marginTop: 3}}>
                    <img style={{width: 15, marginRight: 10, marginBottom: 4}} src="../../../treetime.png" />{this.props.datalist[0] ? this.props.datalist[0].MonitorTime : ''}
                </div>
            </div>
        );
    }
}
export default TreeStatus;
