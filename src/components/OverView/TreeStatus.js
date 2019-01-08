import React, { Component } from 'react';
import styles from './OverView.less';
import { Button } from 'antd/lib/radio';
class TreeStatus extends Component {
    getTimeImgSpan=()=>{
      const {datalist}=this.props;
      if(datalist && datalist[0])
      {
          return (<div><img style={{width: 15, marginRight: 10, marginBottom: 4}}
             src="/treetime.png" />
             {datalist[0].MonitorTime}
            </div> 
            )
      }

    }
    render() {
        return (
            <div style={{
                width: 400,
                height: 75,
                background: '#fff',
               // borderRadius: 7,
            //    boxShadow: 'rgba(136, 136, 136, 0.41) 4px 3px 9px'
            }}>
                <div className={styles.statuslist}>
                    <span><img style={{width:15}} src="/gisunline.png" />离线</span>
                    <span><img style={{width:15}} src="/gisnormal.png" />在线</span>
                    <span><img style={{width:15}} src="/gisover.png" />超标</span>
                    <span><img style={{width:15}} src="/gisexception.png" />异常</span>
                </div>
                <div style={{borderBottom: '1px solid #EBEBEB'}} />
                <div style={{marginLeft: 120, marginTop: 3}}>
                   {this.getTimeImgSpan()}
                </div>
            </div>
        );
    }
}
export default TreeStatus;
