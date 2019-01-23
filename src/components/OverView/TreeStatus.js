import React, { Component } from 'react';
import styles from './OverView.less';
import { Button } from 'antd/lib/radio';
import {
  Spin
} from 'antd';

import { connect } from 'dva';
@connect(({ loading, overview }) => ({
    //点位数据信息
    datalist: overview.data,
    //加载数据
    loading:loading.effects['overview/querydatalist'],
    //加载所以初始化显示的信息
    maploading:loading.effects['overview/queryentdetail']
}))

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
    const {loading,maploading}=this.props;
    if(maploading)
    {
        return(<Spin
            style={{ width: '100%',
                height: 70,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center' }}
            size="large"
        />)
    }
    if(loading)
    {
        return(<Spin
            style={{ width: '100%',
                height: 70,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center' }}
            size="large"
        />)
    }
        return (
            <div style={{
                width: 400,
                height: 75,
                background: '#fff',
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
