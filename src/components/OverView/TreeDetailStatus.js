import React, { Component } from 'react';
import styles from './OverView.less';
import { Button } from 'antd/lib/radio';
class TreeDetailStatus extends Component {
    render() {
        return (
            <div style={{
                width: 420,
                height: 125,
                background: '#fff',
                borderRadius: 7,
                boxShadow: 'rgba(136, 136, 136, 0.41) 4px 3px 9px'
            }}>
                <div style={{fontSize: 16, marginLeft: 15, paddingTop: 15}}>当前排口：{this.props.pointName}
                    <Button onClick={this.props.backTreeList} style={{borderRadius: 28, borderColor: '#6CB5FF'}} className={styles.backButton}>返回</Button></div>
                <div className={styles.statuslist}>
                    <span><img src="../../../gisunline.png" />离线</span>
                    <span><img src="../../../gisnormal.png" />在线</span>
                    <span><img src="../../../gisover.png" />超标</span>
                    <span><img src="../../../gisexception.png" />异常</span>
                </div>
                <div style={{borderBottom: '1px solid #EBEBEB'}} />
                <div style={{marginLeft: 15, marginTop: 10}}>
                    <img style={{width: 15, marginRight: 10, marginBottom: 4}} src="../../../treetime.png" />{this.props.detailtime}
                    <span style={{float: 'right',marginRight: 10}}>
                        <span onClick={this.props.stationClick} style={{marginRight: 15, cursor: 'pointer'}}><img style={{width: 15, marginRight: 6, marginBottom: 4}} src="../../../home.png" />进入站房</span>
                        <span onClick={this.props.pdShow} style={{cursor: 'pointer'}}><img style={{width: 15, marginRight: 6, marginBottom: 4}} src="../../../alarm.png" />紧急派单</span>
                    </span>
                </div>
            </div>
        );
    }
}
export default TreeDetailStatus;
