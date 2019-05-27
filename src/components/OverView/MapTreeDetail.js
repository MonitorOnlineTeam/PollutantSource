import React, { Component } from 'react';
import {Spin,Button,Table,Popconfirm} from 'antd';
import { connect } from 'dva';
import { mainpoll } from '../../config';
import ReactEcharts from 'echarts-for-react';
import styles from './MapTreeDetail.less';
import UrgentDispatch from '../../components/OverView/UrgentDispatch';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import PdButton from '../../components/OverView/PdButton';
import {getPointStatusImg} from '../../utils/getStatusImg';


@connect(({ loading, overview, global, baseinfo }) => ({
    detailloading: loading.effects['overview/querydetailpollutant'],
    detailpcol: overview.detailpcol,
    detaildata: overview.detaildata,
    selectpoint:overview.selectpoint,
    detailtime: overview.detailtime,
    chartdata: overview.chartdata,
    existdata: overview.existdata,
    pollutantName: overview.pollutantName,
    mapdetailParams:overview.mapdetailParams,
    dataOverview:overview.dataOverview
}))

class MapTreeDetail extends Component {
     constructor(props)
     {
         super(props);
     }

     componentWillMount(){
         //加载首要污染物Table
        this.props.dispatch({
            type: 'overview/querydetailpollutant',
            payload: {
            }
        });
     }
    //主要污染物table点击事件(获取图表信息)
    detialTreeClick = (row) => {
        let { mapdetailParams,dispatch } =this.props;

        mapdetailParams={
            ...mapdetailParams,
            pollutantCode:row.pcode,
            pollutantName:row.pollutantName,
        }
        dispatch({
            type: 'overview/updateState',
            payload: {
                mapdetailParams:mapdetailParams
            }
        });

        dispatch({
            type: 'overview/queryoptionDataOnClick',
            payload: {
            }
        });
    }

    //返回按钮
    backTreeList = () => {
        const { dispatch,dataOverview } =this.props;
        dispatch({
            type: 'overview/updateState',
            payload: {
                selectpoint:null,
                dataOverview:{
                   ...dataOverview,
                   pointName:null
                }
            },
        });
        dispatch({
            type: 'overview/querydatalist',
            payload: {
                map: true,
            },
        });

    }


    //图表加载事件
    getChartOption=()=>{
        const {chartdataloading,existdata,chartdata,selectpoint}=this.props;
        if(selectpoint.stop)
        {
            return(<img style={{width: 150, marginLeft: 120, marginTop: 70}} src="/stopimg.png" />);
        }
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

      //派单完毕之后刷新数据
      Refresh=()=>{
          const {dispatch,selectpoint,searchName}=this.props;
          this.props.dispatch({
                type: 'overview/querydatalist',
                payload: {
                    map: true,
                },
            });

      }

      //进入站房
      stationClick = () => {
         const {selectpoint}=this.props;
         let viewtype='mapview';
         this.props.dispatch(routerRedux.push(`/pointdetail/${selectpoint.DGIMN}/${viewtype}`));
     };

     getpointStatus=(item)=>{
        let res=[];
         if(item.stop)
         {
            res.push(<span className={styles.stop}>停产中</span>)
         }
         else{
             if(item.scene)
             {
                // res.push(<span className={styles.operation}>运维中</span>)
             }
             if(item.warning)
             {
                res.push(<span className={styles.warning}>预警中</span>)
             }
             if(item.fault)
             {
                res.push(<span className={styles.fault}>故障中</span>)
             }
         }
        return res;
    }

    getTimeImg=()=>{
       const {detailtime}=this.props;
       if(detailtime)
       {
           return   (<span><img style={{width: 15, marginRight: 10, marginBottom: 4}} src="/treetime.png" />
                    {detailtime}</span>)
       }
       else
       {
           return '';
       }
    }


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
                            <span style={{position: 'relative',top: -2,marginRight: 2}}>{getPointStatusImg(selectpoint.status,selectpoint.stop,selectpoint.pollutantTypeCode)}</span>
                            {selectpoint.pointName}
                            {this.getpointStatus(selectpoint)}
                            <Button onClick={this.backTreeList} className={styles.backButton}>返回</Button>
                        </div>
                        <div style={{borderBottom: '1px solid #EBEBEB',marginTop: 6}} />
                        <div style={{marginLeft: 15, marginTop: 10,paddingBottom: 10}}>
                            {
                                this.getTimeImg()
                            }
                            <span style={{float: 'right',marginRight: 10}}>
                                <span onClick={this.stationClick} style={{marginRight: 15, cursor: 'pointer'}}><img style={{width: 15, marginRight: 6, marginBottom: 4}} src="/home.png" />进入站房</span>
                                <span style={{float:"right"}}><PdButton DGIMN={selectpoint.DGIMN} id={selectpoint.operationUserID} pname={selectpoint.pointName}  reloadData={() => this.Refresh()}
                                exist={selectpoint.existTask}
                                pollutantTypeCode={selectpoint.pollutantTypeCode}
                                name={selectpoint.operationUserName} tel={selectpoint.operationtel} viewType="mapview"/>
                               </span>  {/* {this.getbutton()} */}
                            </span>
                            <div style={{clear:'both'}}></div>
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
          </div>
          </div>
        );
    }
}

export default MapTreeDetail;
