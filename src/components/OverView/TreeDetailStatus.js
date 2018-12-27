import React, { Component } from 'react';
import styles from './OverView.less';
import { Button } from 'antd';
class TreeDetailStatus extends Component {


    getbutton=()=>{
        if(this.props.pointInfo)
        {
            if(this.props.pointInfo.existTask==1)
            {
                return (
                <span onClick={this.props.urge} style={{cursor: 'pointer'}}>
                   <img style={{width: 15, marginRight: 6, marginBottom: 4}}
                    src="../../../alarm.png" />紧急催办</span>)
            }
            else
            {
                return (<span onClick={this.props.pdShow} style={{cursor: 'pointer'}}>
                       <img style={{width: 15, marginRight: 6, marginBottom: 4}}
                        src="../../../alarm.png" />紧急派单</span>)
            }
        }
    }
    render() {
        return (
            <div style={{
                width: 420,
                // height: 125,
                background: '#fff',
                borderRadius: 7,
                boxShadow: 'rgba(136, 136, 136, 0.41) 4px 3px 9px'
            }}>
                <div style={{fontSize: 16, marginLeft: 15, paddingTop: 15}}>
                    <span style={{position: 'relative',top: -2,marginRight: 2}}>{this.props.statusImg}</span>
                    {this.props.pointName}  { this.props.pointInfo.existTask ? <span className={styles.operation}>运维中</span> : ''}
                    <Button onClick={this.props.backTreeList} className={styles.backButton}>返回</Button>
                </div>
                <div style={{borderBottom: '1px solid #EBEBEB',marginTop: 6}} />
                <div style={{marginLeft: 15, marginTop: 10,paddingBottom: 10}}>
                    <img style={{width: 15, marginRight: 10, marginBottom: 4}} src="../../../treetime.png" />{this.props.detailtime}
                    <span style={{float: 'right',marginRight: 10}}>
                        <span onClick={this.props.stationClick} style={{marginRight: 15, cursor: 'pointer'}}><img style={{width: 15, marginRight: 6, marginBottom: 4}} src="../../../home.png" />进入站房</span>
                         {this.getbutton()}
                    </span>
                </div>
            </div>
        );
    }
}
export default TreeDetailStatus;
