import React, { Component } from 'react';
import styles from './DataList.less';
 
import { MapInteractionCSS } from 'react-map-interaction';
import { connect } from 'dva';
import { pollutantInfo, mainpollutantInfo } from '../../config';
import {
    Spin,
    Card,
    Badge
} from 'antd';

@connect(({ points, loading }) => ({
    isloading: loading.effects['points/queryrealparam'],
    pointInfo: points.selectpoint,
    operationInfo: points.operationInfo,
    stateInfo: points.stateInfo,
    paramsInfo: points.paramsInfo,
    dataInfo: points.dataInfo,
    paramstatusInfo: points.paramstatusInfo,
    stateNameInfo: points.stateNameInfo,
    paramNameInfo: points.paramNameInfo,
}))
export default class ProcessFlowChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 1,
            translation: { x: 0, y: 0 }
        };
    }
    componentWillMount() {
        this.props.dispatch({
            type: 'points/updateState',
            payload: { DGIMN: this.props.DGIMN }
        });
        this.props.dispatch({
            type: 'points/queryrealparam',
            payload: {
                dgimn: this.props.DGIMN
            }
        });
    }

    getparamdata = (pollutantCode) => {
        debugger;
        const { paramsInfo, paramNameInfo } = this.props;
        let res = [];
        if (paramsInfo) {
            paramsInfo.map((item, key) => {
                if (item.name.split('_')[0]==(pollutantCode)) {
                    const nameInfo = paramNameInfo.find(value => {
                        return item.name.indexOf(value.code) > -1;
                    })
                    res.push(
                        <tr key={key}>
                            <td key={key + '1'} style={{ width: '40%', textAlign: 'center' }}>
                                {nameInfo.name}
                            </td>
                            <td key={key + '2'} style={{ width: '60%', textAlign: 'center' }}>
                                {item.value}
                            </td>
                        </tr>
                    )
                }
            })
        }
        return res;
    }

    getrealtimedata = (pollutantCode) => {
        const { dataInfo, paramsInfo } = this.props;
        const pollutantInfo = mainpollutantInfo.find((value, index, arr) => {
            return value.pollutantCode === pollutantCode;
        });
        if (pollutantInfo) {

            return (<Card title={pollutantInfo.pollutantName + "分析仪"} style={{ borderRadius: 10 }}>
                <table key={(record, index) => `complete${index}`} className={styles.FormTable}>
                    <tbody>
                        <tr>
                            <td style={{ width: '40%', textAlign: 'center' }}>{pollutantInfo.pollutantName}({pollutantInfo.unit})</td>
                            <td style={{ width: '60%', textAlign: 'center' }}>{!dataInfo ? '-' : dataInfo[pollutantCode]}</td>
                        </tr>
                        {
                            this.getparamdata(pollutantCode)
                        }
                    </tbody>
                </table>
            </Card>)
        }
    }
    getregistValue = (list, key, unit) => {
        if (!list) {
            return '暂未上传';
        }
        else {
            if (!list[key]) {
                return '暂未上传';
            }
            return list[key] + (unit ? unit : '');
        }
    }

    getStatusName = (list, key) => {
        if (!list) {
            return '暂未上传';
        }
        else {
            if (!list[key]) {
                return '暂未上传';
            }
            if (list[key].indexOf('_') > -1) {
                return list[key].split('_')[0];
            }
            return list[key];
        }
    }

    getSystemStatus = (list, key) => {
        if (list && list[key] && list[key].indexOf('_') > -1) {
            return list[key].split('_')[1];
        }
        return '0';
    }
     
    //系统参数
    getsystemparam=(param)=>{
        const {paramstatusInfo}=this.props;
        if(paramstatusInfo.length)
        {
            const nameInfo = paramstatusInfo.find(value => {
                return value.statename.indexOf(param) > -1;
            }) 
            if(nameInfo)
            return nameInfo.value;
        }
    }
    //系统状态
    getsystemstate=(param)=>{
        const {stateInfo}=this.props;
        if(stateInfo)
        {
            const nameInfo = stateInfo.find(value => {
                return value.name.indexOf(param) > -1;
            }) 
            if(nameInfo)
            {
                 if(nameInfo.statename=="正常")
                 {
                    return (<span className={styles.normalstatus}><Badge status="processing"  text="正常" /></span>)  
                 }
                 else
                 {
                    return (<span className={styles.overstatus}><Badge status="processing"  text="故障" /></span>)  
                 }
            }
          
        }
    }
    //图片上的点击事件
    positionClick=(param,status,data)=>{
       const {imgClick,paramstatusInfo,stateInfo,paramsInfo}=this.props;
       const paramlist=param?param.split(","):null;
       const statuslist=status?status.split(","):null;
       const datalist=data?data.split(","):null;
       let paramInfolist=[];
       let stateInfolist=[];
       let dataInfolist=[];
       if(paramlist)
       {
            paramlist.map(item=>{
                const params=paramstatusInfo.find(value=>{
                    return value.statecode==item;
                })
                if(params)
                paramInfolist.push(params);
            })
       }
       if(statuslist)
       {
            statuslist.map(item=>{
                const statuses=stateInfo.find(value=>{
                    return value.code==item;
                })
                if(statuses)
                stateInfolist.push(statuses);
            })
       }
       if(datalist)
       {
            datalist.map(item=>{
                const datas=paramsInfo.find(value=>{
                    return value.pollutantCode==item;
                })
                if(datas)
                dataInfolist.push(datas);
            })
       }

       if(paramInfolist.length>0 || stateInfolist.length>0 || dataInfolist.length>0) 
       {
            imgClick(paramInfolist,stateInfolist,dataInfolist);
       }
    }


    render() {
        const { scale, translation } = this.state;
        const { isloading,
            operationInfo, stateInfo, paramsInfo, dataInfo, paramstatusInfo } = this.props;
        //运行状态
        const cemsStatus = this.getSystemStatus(stateInfo, 'i12103');
        //工作状态
        const wordStatus = this.getSystemStatus(stateInfo, 'i12001');
        //截止阀状态
        const jzfStatus = this.getSystemStatus(stateInfo, 'i12104');
        //皮托管状态
        const ptgStatus = this.getSystemStatus(stateInfo, 'i12106');

        return (
 
            <div style={{height:'calc(100vh - 220px)'}} className={styles.GyProcessPic}>
                {isloading ? <Spin style={{
                    width: '100%',
                    height: 'calc(100vh - 260px)',
                    marginTop: 260
                }} size="large" />
                    : <MapInteractionCSS
                        scale={scale}
                        translation={translation}
                        onChange={({ scale, translation }) => this.setState({ scale, translation })}
                        defaultScale={1}
                        defaultTranslation={{ x: 0, y: 0 }}
                        minScale={0.05}
                        maxScale={5}
                        showControls={true}>
                        <div className={styles.imgBg1} >
                        <div onClick={()=>this.positionClick("i33003,i33004,i33001","i12110,i12105")} style={{  position: 'relative', left: '60px', 
                        top: '390px', fontWeight: '700', fontSize: '10px',width:300 }} className={styles.divClick}>探头温度:{this.getsystemparam('系统采样探头温度')}°C</div>
                        <div style={{  position: 'relative', left: '260px', 
                        top: '380px', fontWeight: '700', fontSize: '10px' ,width:300}}
                        onClick={()=>this.positionClick("i33003,i33004,i33001","i12110,i12105")} className={styles.divClick}>管线温度:{this.getsystemparam('系统采样管线温度')}°C</div>
                        <div style={{  position: 'relative', left: '225px', 
                        top: '580px', fontWeight: '700', fontSize: '10px',width:300 }} className={styles.divClick}>钢气瓶压力:{this.getsystemparam('钢气瓶压力')}Pa</div>
                        <div style={{  position: 'relative', left: '585px', 
                        top: '295px', fontWeight: '700', fontSize: '10px',width:300 }} className={styles.divClick}>冷凝器温度:{this.getsystemparam('冷凝器温度')}°C</div>
                        <div style={{  position: 'relative', left: '680px', 
                        top: '290px', fontWeight: '700', fontSize: '10px',width:300 }} className={styles.divClick}>使用次数:{this.getsystemparam('电磁阀累计使用次数')}次</div>

                        <div style={{  position: 'relative', left: '150px', 
                        top: '430px', fontWeight: '700', fontSize: '10px',width:300 }} className={styles.divClick}>使用次数:{this.getsystemparam('采样泵累计使用时间')}次</div>
                        <div style={{  position: 'relative', left: '365px', 
                        top: '360px', fontWeight: '700', fontSize: '10px',width:300 }} className={styles.divClick}>使用次数:{this.getsystemparam('蠕动泵累计使用时间')}次</div>
                        
                        <div style={{  position: 'relative', left: '600px', 
                        top: '200px', fontWeight: '700', fontSize: '10px' ,width:300}} className={styles.divClick}>
                          {this.getsystemstate("制冷器")}
                        </div>
                        <div style={{  position: 'relative', left: '260px', 
                        top: '210px', fontWeight: '700', fontSize: '10px' ,width:300}} className={styles.divClick} 
                         onClick={()=>this.positionClick("i33003,i33004,i33001","i12110,i12105")}>
                          {this.getsystemstate("采样管线")}
                         </div>
                  
                         <div style={{  position: 'relative', left: '80px', 
                        top: '190px', fontWeight: '700', fontSize: '10px' ,width:300}} className={styles.divClick} 
                         onClick={()=>this.positionClick("i33003,i33004,i33001","i12110,i12105")}>
                           {this.getsystemstate("探头吹扫")}
                         </div>

                         <div style={{  position: 'relative', left: '375px', 
                          top: '320px', fontWeight: '700', fontSize: '10px' ,width:300}} className={styles.divClick}>
                          {this.getsystemstate("蠕动泵状态")}
                         </div>
                         <div style={{  position: 'relative', left: '805px', 
                          top: '300px', fontWeight: '700', fontSize: '10px',width:300 }} className={styles.divClick}>
                          {this.getsystemstate("废液桶液位")}
                         </div>

                         <div style={{  position: 'relative', left: '480px', 
                          top: '110px', fontWeight: '700', fontSize: '10px',width:55,height:60 }}
                          onClick={()=>this.positionClick("","i12102","s05")}
                          className={styles.divClick}>
                          {this.getsystemstate("湿度")}
                         </div>
                         <div style={{  position: 'relative', left: '120px', 
                        top: '-95px', fontWeight: '700', fontSize: '10px',width:150,height:50 }} 
                        onClick={()=>this.positionClick("","","s07,s08,b02")} className={styles.divClick}>
                         </div>

                         <div style={{  position: 'relative', left: '120px', 
                        top: '-70px', fontWeight: '700', fontSize: '10px',width:150,height:50 }} 
                        onClick={()=>this.positionClick("","","01")} className={styles.divClick}>
                         </div>

                         <div style={{ position: 'relative', left: '1010px', 
                         top: '-30px', fontWeight: '700', fontSize: '10px',width:150,height:50 }} 
                         onClick={()=>this.positionClick("","","02,03")} className={styles.divClick}> 
                         </div>

                        
                        </div>
                        
                        
                        
                        
                    </MapInteractionCSS>
                }
            </div>
        );
    }
}
