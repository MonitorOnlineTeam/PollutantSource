import React, { Component } from 'react';
import {Spin,Button,Table,Popconfirm} from 'antd';
import { connect } from 'dva';
import { mainpoll } from '../../config';
import ReactEcharts from 'echarts-for-react';
import styles from './MapTreeDetail.less';
import UrgentDispatch from '../../components/OverView/UrgentDispatch';
import moment from 'moment';
import { routerRedux } from 'dva/router';
@connect(({ loading, overview, global, baseinfo }) => ({
    detailloading: loading.effects['overview/querydetailpollutant'],
    detailpcol: overview.detailpcol,
    detaildata: overview.detaildata,
    selectpoint:overview.selectpoint,
    detailtime: overview.detailtime,
    chartdata: overview.chartdata,
    existdata: overview.existdata,
    pollutantName: overview.pollutantName,
}))

class MapTreeDetail extends Component {
     constructor(props)
     {
         super(props);
         this.state={
            pdvisible:false
         };
     }
 
    //判断是派单还是催办按钮
    getbutton=()=>{
        const {selectpoint}=this.props;
        if(selectpoint)
        {
            const text='没有关联运维人,是否前去关联?';
            if(selectpoint.existTask==1)
            {
                if(selectpoint.operationUserID)
                {
                    return (
                        <span onClick={this.urge} style={{cursor: 'pointer'}}>
                        <img style={{width: 15, marginRight: 6, marginBottom: 4}}
                         src="/alarm.png" />紧急催办</span>
                            )
                }
                return (
                    <Popconfirm  title={text} onConfirm={this.addoperationInfo} okText="是" cancelText="否">
                    <span style={{cursor: 'pointer'}}>
                       <img style={{width: 15, marginRight: 6, marginBottom: 4}}
                        src="/alarm.png" />紧急催办</span>
                     </Popconfirm>)
            }
            else
            {
                if(selectpoint.operationUserID)
                {
                    return (
                        <span onClick={this.pdShow} style={{cursor: 'pointer'}}>
                        <img style={{width: 15, marginRight: 6, marginBottom: 4}}
                            src="/alarm.png" />紧急派单</span>
                    )
                }
                return (
                    <Popconfirm  title={text} onConfirm={this.addoperationInfo} okText="是" cancelText="否">
                    <span style={{cursor: 'pointer'}}>
                        <img style={{width: 15, marginRight: 6, marginBottom: 4}}
                            src="/alarm.png" />紧急派单</span>
                     </Popconfirm>
                        )
            }
        }
    }

   //跳转到添加运维人员界面
   addoperationInfo=()=>{
    const {selectpoint}=this.props;
    let viewtype='mapview';
    this.props.dispatch(routerRedux.push(`/sysmanage/pointdetail/${selectpoint.DGIMN}/${selectpoint.pollutantTypeCode}/${viewtype}`));
   }

   //催办
   urge=()=>{
    const {dispatch,selectpoint}=this.props;
    this.props.dispatch({
        type: 'overview/queryurge',
        payload: {
            personId:selectpoint.operationUserID,
            DGIMN:selectpoint.DGIMN
        }
    });
   }

   //派单
   pdShow = () => {
    this.setState({
        pdvisible: true,
    });
    }
    //派单窗口关闭
       onCancel=() => {
        this.setState({
            pdvisible: false,
        });
    }

    //主要污染物table点击事件(获取图表信息)
    detialTreeClick = (row) => {
        const { selectpoint } =this.props;
        this.props.dispatch({
            type: 'overview/queryoptionDataOnClick',
            payload: {
                datatype: 'hour',
                pollutantName: row.pollutantName,
                pollutantTypeCode:selectpoint.pollutantTypeCode,
                dgimn: row.dgimn,
                pollutantCodes: row.pcode,
                endTime: (moment(new Date()).add('hour', -1)).format('YYYY-MM-DD HH:00:00'),
                beginTime: (moment(new Date()).add('hour', -24)).format('YYYY-MM-DD HH:00:00'),
            }
        });
    }

    //返回按钮
    backTreeList = () => {
        this.props.dispatch({
            type: 'overview/updateState',
            payload: {
                selectpoint:null
            },
        });
    }


    //图表加载事件
    getChartOption=()=>{
        const {chartdataloading,existdata,chartdata}=this.props;
        if(chartdataloading)
        {
            return (<Spin style={{width: '100%',
            height: 'calc(100vh - 260px)',
            marginTop: 60 }} size="large" />);
        }
        if(existdata)
        {
            return (<ReactEcharts
                className={styles.echartdiv}
                style={{width: '100%', height: '200px', textAlign: 'center', padding: '0 15px 0 15px'}}
                option={this.props.chartdata}
                notMerge={true}
                lazyUpdate={true} />);
        }
        return(<img style={{width: 150, marginLeft: 120, marginTop: 70}} src="/nodata.png" />);
    }

       //获取状态图片
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

      //派单完毕之后刷新数据
      Refresh=()=>{
          const {dispatch,selectpoint,searchName}=this.props;
          this.props.dispatch({
                type: 'overview/querydatalist',
                payload: {
                    map: true,
                    pollutantTypes:selectpoint.pollutantTypeCode,
                    pointName:searchName
                },
            });
          
      }

      //进入站房
      stationClick = () => {
        const {selectpoint}=this.props;
        let viewtype='mapview';
         this.props.dispatch(routerRedux.push(`/pointdetail/${selectpoint.DGIMN}/${viewtype}`));
     };

    render() {
        const {detailloading,detailpcol,detaildata,selectpoint,detailtime}=this.props;
        if(detailloading)
        {
       
            return(
            <div style={{height:'calc(100vh - 335px)'}} className={styles.mainDiv}>
            <Spin
               style={{ width: '100%',
                   height: 'calc(100vh/2)',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center' }}
               size="large"
           />
           </div>
           )
        }
        const pollutantInfoList=mainpoll.find(value=>{
            return value.pollutantCode==selectpoint.pollutantTypeCode;
         })
        let mainHeight=730;
        const screenHight=window.screen.height;
        if(screenHight<820)
        {
            mainHeight=screenHight-230;
        }
        return (
            <div style={{height:mainHeight}} className={styles.mainDiv}>
            <div style={{ marginLeft: 10, marginTop: 10,overflow:'auto' }}>
                    <div style={{
                        width: 420,
                        // height: 125,
                        background: '#fff',
                        borderRadius: 7,
                        boxShadow: 'rgba(136, 136, 136, 0.41) 4px 3px 9px'
                    }}>
                        <div style={{fontSize: 16, marginLeft: 15, paddingTop: 15}}>
                            <span style={{position: 'relative',top: -2,marginRight: 2}}>{this.getStatusImg(selectpoint.status)}</span>
                            {selectpoint.pointName} 
                            {selectpoint.scene ? <span className={styles.operation}>运维中</span> : ''}
                            {selectpoint.warning ? <span className={styles.warning}>预警中</span> : ''}
                            {selectpoint.fault ? <span className={styles.fault}>故障中</span>: ''}
                            {selectpoint.status==4 ?  <span className={styles.stop}>停产中</span>: ''}
                            <Button onClick={this.backTreeList} className={styles.backButton}>返回</Button>
                        </div>
                        <div style={{borderBottom: '1px solid #EBEBEB',marginTop: 6}} />
                        <div style={{marginLeft: 15, marginTop: 10,paddingBottom: 10}}>
                            <img style={{width: 15, marginRight: 10, marginBottom: 4}} src="/treetime.png" />{this.props.detailtime}
                            <span style={{float: 'right',marginRight: 10}}>
                                <span onClick={this.stationClick} style={{marginRight: 15, cursor: 'pointer'}}><img style={{width: 15, marginRight: 6, marginBottom: 4}} src="/home.png" />进入站房</span>
                                {this.getbutton()}
                            </span>
                        </div>
                    </div>
                    
                    <div style={{ height: 'calc(100vh - 215px)' }}>
                        {pollutantInfoList.csyxl?<div style={{marginTop: 15}}>
                        <div style={{background: '#fff', borderRadius: 10, width: 420, height: 107}}>
                        <div className={styles.teimgbg}>
                        传输有效率
                            <div className={styles.rate}>
                                { selectpoint ? (selectpoint.transmissionEffectiveRate ? selectpoint.transmissionEffectiveRate : '-') : '-'}
                            </div>
                            </div>
                            <div className={styles.teimgbg}>
                            传输率
                                <div className={styles.rate}>
                                    { selectpoint ? (selectpoint.transmissionRate ? selectpoint.transmissionRate : '-') : '-'}
                                </div>
                            </div>
                            <div className={styles.teimgbg}>
                            有效率
                                <div className={styles.rate}>
                                    { selectpoint ? (selectpoint.effectiveRate ? selectpoint.effectiveRate : '-') : '-'}
                                </div>
                          </div>
                       </div>
                        </div>:''}
                        <div style={{marginTop: 15}}>
                        <Table size="small" columns={this.props.detailpcol} dataSource={this.props.detaildata} pagination={false}
                            className={styles.treeTable}
                            rowKey="pcode"
                            style={{ fontSize: '12px',  background: '#fff', width: 420, borderRadius: 10 }}
                            onRow={record => ({
                                onClick: () => {
                                    this.detialTreeClick(record);
                                }
                            })}
                           />
                        </div>

                        <div style={{marginTop: 15}}>
                        <div style={{background: '#fff', borderRadius: 10, width: 420, height: 240}}>
                        <div style={{fontSize: 16, textAlign: 'center', padding: '10px 15px 10px 15px'}}>{this.props.pollutantName}24小时趋势图</div>
                         {this.getChartOption()}
                        </div>
                        </div>
                    </div>

                    <UrgentDispatch
                    onCancel={this.onCancel}
                    visible={this.state.pdvisible}
                    operationUserID={selectpoint?selectpoint.operationUserID:null}
                    DGIMN={selectpoint?selectpoint.DGIMN:null}
                    pointName={selectpoint?selectpoint.pointName:null}
                    operationUserName={selectpoint?selectpoint.operationUserName:null}
                    operationtel={selectpoint?selectpoint.operationtel:null}
                    reloadData={()=>this.Refresh()}
                />
          </div>
          </div>
        );
    }
}

export default MapTreeDetail;