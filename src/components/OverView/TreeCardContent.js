import React, { Component } from 'react';
import {
    Spin,Tabs
} from 'antd';
import styles from './Tree.less';
class TreeCardContent extends Component {
    getTreeDatalist=()=>{
        const {isloading,treedatalist,PollutantType}=this.props;
        if(isloading)
        {
            return(
                <Spin style={
                  this.props.style
                } size="large" /> 
            )
        }
        let res=[];
        if(treedatalist)
        {
            this.props.treedatalist.map(item => {
                if (item.pollutantTypeCode === this.props.PollutantType) {
                    res.push (<div onClick={() => {
                        this.props.treeCilck(item);
                    }} className={styles.cardDiv}>
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
                                item.fault ? <span className={styles.fault}>故障中</span>: ''
                            }
                            {
                                 item.status==4 ?  <span className={styles.stop}>停产中</span>: ''
                            }
                        </div>
                    </div>);
                }
            })
        }
        else
        {
            res=(<div style={{textAlign:'center',height:70,background:'#fff'}}>暂无数据</div>)
        }
        return res;
    }
    render() {
        const {pollutantTypeloading}=this.props;
        if(pollutantTypeloading)
        {
            return(
               <div></div>
            )
        }
        let {getHeight,treedatalist}=this.props;
        if(!treedatalist || !treedatalist[0])
        {
            getHeight=70;
        }
        return (
            <div style={{...this.props.style,height:getHeight}}>
              {  this.getTreeDatalist()}
            </div>
        );
    }
}

export default TreeCardContent;