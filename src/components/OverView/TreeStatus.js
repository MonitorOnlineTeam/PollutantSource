import React, { Component } from 'react';
import styles from './OverView.less';
import { Button } from 'antd/lib/radio';
class TreeStatus extends Component {
    render() {
        const height = this.props.detailed ? 125 : 75;
        const timemargin = this.props.detailed ? 15 : 120;
        const marginTop=this.props.detailed ? 10 : 3;
        return (
            <div style={{
                width: 420,
                height: height,
                background: '#fff',
                borderRadius: 7,
                boxShadow:'rgba(136, 136, 136, 0.41) 4px 3px 9px'
            }}>
                {this.props.detailed ? (
                    <div style={{fontSize: 16, marginLeft: 15, paddingTop: 15}}>当前排口：{this.props.pointName}
                        <Button onClick={this.props.backTreeList} style={{borderRadius: 28, borderColor: '#6CB5FF'}} className={styles.backButton}>返回</Button></div>
                ) : ''}
                <div className={styles.statuslist}>
                    <span><img src="../../../gisunline.png" />离线</span>
                    <span><img src="../../../gisnormal.png" />在线</span>
                    <span><img src="../../../gisover.png" />超标</span>
                    <span><img src="../../../gisexception.png" />异常</span>
                </div>
                <div style={{borderBottom: '1px solid #EBEBEB'}} />
                <div style={{marginLeft: timemargin, marginTop: marginTop}}>
                    <img style={{width: 15, marginRight: 10, marginBottom: 4}} src="../../../treetime.png" />{this.props.datalist[0] ? this.props.datalist[0].MonitorTime : ''}
                    {this.props.detailed
                    ?   <span style={{float:'right',marginRight:10}}>
                        <span onClick={this.props.stationClick} style={{marginRight: 15, cursor: 'pointer'}}><img style={{width: 15, marginRight: 6, marginBottom: 4}} src="../../../home.png" />进入站房</span>
                        <span><img style={{width: 15, marginRight: 6, marginBottom: 4}} src="../../../alarm.png" />紧急派单</span>
                    </span>
                    : ''}
                </div>
             

            </div>
        );
    }
}
export default TreeStatus;
