import React, { Component } from 'react';
import {
    Row,
    Col,
    Spin,
    Progress,
    Radio,
} from 'antd';
import ReactEcharts from 'echarts-for-react';
import {
    connect
} from 'dva';
import { Map, Polygon,Markers,InfoWindow } from 'react-amap';
import moment from 'moment';
import config from '../../config';
import styles from './index.less';
import Adapt from './Adapt.less';

/*
页面：首页
add by xpy
modify by
*/
const pageUrl = {
    getStatisticsPointStatus: 'workbenchmodel/getStatisticsPointStatus',
    getRateStatisticsByEnt: 'homepage/getRateStatisticsByEnt',
    getbaseinfo: 'baseinfo/queryentdetail',
    getdatalist: 'overview/querydatalist',
    getExceptionProcessing: 'homepage/getExceptionProcessing',
    getTaskCount: 'homepage/getTaskCount',
    getAlarmAnalysis: 'homepage/getAlarmAnalysis',
    getAllMonthEmissionsByPollutant: 'homepage/getAllMonthEmissionsByPollutant',
};
const { RunningRate,TransmissionEffectiveRate,amapKey } = config;
const {enterpriceid}=config;
const RadioButton = Radio.Button;
let _thismap;

@connect(({
    loading,
    workbenchmodel,
    baseinfo,
    overview,
    homepage,
}) => ({
    loadingdatalist: loading.effects[pageUrl.getdatalist],
    loadingRateStatistics: loading.effects[pageUrl.getRateStatisticsByEnt],
    loadingbaseinfo: loading.effects[pageUrl.getbaseinfo],
    loadingrateStatistics: loading.effects[pageUrl.getExceptionProcessing],
    loadingTaskCount: loading.effects[pageUrl.getTaskCount],
    loadingAlarmAnalysis: loading.effects[pageUrl.getAlarmAnalysis],
    loadingStatisticsPointStatus: loading.effects[pageUrl.getStatisticsPointStatus],
    loadingAllMonthEmissionsByPollutant: loading.effects[pageUrl.getAllMonthEmissionsByPollutant],
    RateStatisticsByEnt: homepage.RateStatisticsByEnt,
    TaskCount: homepage.TaskCount,
    ExceptionProcessing: homepage.ExceptionProcessing,
    AlarmAnalysis: homepage.AlarmAnalysis,
    statisticsPointStatus: workbenchmodel.statisticsPointStatus,
    allMonthEmissionsByPollutant: homepage.AllMonthEmissionsByPollutant,
    baseinfo: baseinfo.entbaseinfo,
    datalist: overview.data,
}))
class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            screenWidth:window.screen.width===1600?50:70,
            TheMonth: moment().format('MM'),
            position: [
                0, 0
            ],
            visible: false,
            pointName: null
        };
        this.mapEvents = {
            created(m) {
                _thismap = m;
            },
            zoomchange: (value) => {

            },
            complete: () => {
                //_thismap.setZoomAndCenter(13, [centerlongitude, centerlatitude]);
            }
        };
    }

    componentWillMount() {
        window.addEventListener('resize',this.handleScroll());
        this.getbaseinfo();
        this.getpointdatalist();
        this.getExceptionProcessing();
        this.getTaskCount();
        this.getAlarmAnalysis();
        this.getRateStatisticsByEnt();
        this.getStatisticsPointStatus();
        this.getAllMonthEmissionsByPollutant();
    }

    handleScroll=()=>{
        this.setState({
            screenWidth:window.screen.width===1600?50:70

        });
        this.getoperation();
    }

    /**
     *  企业基本信息
     */
     getbaseinfo = () => {
         const {dispatch} = this.props;
         dispatch({
             type: pageUrl.getbaseinfo,
             payload: {
                 parentID: enterpriceid,
             },
         });
     }

     /**
      * 点位信息
      */
     getpointdatalist = () => {
         const {
             dispatch
         } = this.props;
         dispatch({
             type: pageUrl.getdatalist,
             payload: {
                 map: true,
                 pollutantTypes:'2'
             },
         });
     }

        /**
         * 点位状态
         */
        getStatisticsPointStatus = () => {
            const {
                dispatch
            } = this.props;
            dispatch({
                type: pageUrl.getStatisticsPointStatus,
                payload: {

                },
            });
        }

    /**
     * 智能质控_率的统计_更新数据
     */
    getRateStatisticsByEnt = () => {
        const {dispatch} = this.props;
        dispatch({
            type: pageUrl.getRateStatisticsByEnt,
            payload: {

            },
        });
    }

    /**
     * 智能预警--月数据
     */
    getExceptionProcessing = () => {
        const {
            dispatch
        } = this.props;
        dispatch({
            type: pageUrl.getExceptionProcessing,
            payload: {

            },
        });
    }

    /**
     * 智能预警数据展示
     */
    EPData=()=>{
        const retVal=[];
        const {epData}=this.props.ExceptionProcessing;
        const TheMonth = this.state.TheMonth;
        retVal.push(
            <div>
                <div className={Adapt.divson1}>{TheMonth}月质控智能预警<h2>{epData.ThisMonthEP}</h2>次</div>
                <div className={Adapt.divson2}>
                    <div className={
                        Adapt.Layered1
                    }
                    > 同比 {
                            epData.ThisMonthTB > 0 ?
                                <div><i className={Adapt.padd} /><h2 style={{color:'#FF4E4E'}}>{Math.abs(epData.ThisMonthTB)}</h2><h5 style={{color:'#FF4E4E'}}>次</h5></div> :
                                <div><i className={Adapt.pdeduct} /><h2 style={{color:'#5BF287'}}>{Math.abs(epData.ThisMonthTB)}</h2><h5 style={{color:'#5BF287'}}>次</h5></div>
                        }
                    </div>
                    <div className={Adapt.Layered1}>环比 {
                        epData.ThisMonthHB > 0 ?
                            <div><i className={Adapt.padd} /><h2 style={{color:'#FF4E4E'}}>{Math.abs(epData.ThisMonthHB)}</h2><h5 style={{color:'#FF4E4E'}}>次</h5></div> :
                            <div><i className={Adapt.pdeduct} /><h2 style={{color:'#5BF287'}}>{Math.abs(epData.ThisMonthHB)}</h2><h5 style={{color:'#5BF287'}}>次</h5></div>
                    }
                    </div>
                </div>
            </div>);
        return retVal;
    }

    /**
     * 智能运维--获取数据
     */
    getTaskCount = () => {
        const {
            dispatch
        } = this.props;
        dispatch({
            type: pageUrl.getTaskCount,
            payload: {

            },
        });
    }

    /**
     * 智能质控_渲染图表
     */
    getOption = (type) => {
        const {rsdata}=this.props.RateStatisticsByEnt;
        let networkeRate = rsdata.NetworkeRate===undefined?0:(parseFloat(rsdata.NetworkeRate) * 100).toFixed(0);
        let runningRate = rsdata.RunningRate === undefined ? 0 : (parseFloat(rsdata.RunningRate) * 100).toFixed(0);
        let transmissionEffectiveRate = rsdata.TransmissionEffectiveRate === undefined ? 0 : (parseFloat(rsdata.TransmissionEffectiveRate) * 100).toFixed(0);

        let legendData=[];
        let color=[];
        let seriesName='';
        let seriesData=[];
        if(type===1) {
            legendData=['正常','离线'];
            color=['rgb(86,244,133)','rgb(32,99,81)'];
            seriesName='实时联网率';
            seriesData=[
                {value:networkeRate, name:'正常'},
                {value:100-networkeRate, name:'离线'}
            ];
        }else if(type===2) {
            legendData=['达标','未达标'];
            if (parseFloat(runningRate) >= RunningRate) {
                color=['rgb(86,244,133)','rgb(32,99,81)'];
            }else {
                color = ['rgb(255,78,78)', 'rgb(32,99,81)'];
            }
            seriesName='设备运转率';
            seriesData=[
                {value:runningRate, name:'达标'},
                {value:(100-runningRate).toFixed(2), name:'未达标'}
            ];
        }else {
            legendData=['达标','未达标'];
            if (parseFloat(transmissionEffectiveRate) >= TransmissionEffectiveRate) {
                color = ['rgb(86,244,133)', 'rgb(32,99,81)'];
            } else {
                color = ['rgb(255,78,78)', 'rgb(32,99,81)'];
            }
            seriesName='传输有效率';
            seriesData=[
                {value:transmissionEffectiveRate, name:'达标'},
                {value:(100-transmissionEffectiveRate).toFixed(2), name:'未达标'}
            ];
        }
        let option = {
            color: color,
            animation:false,
            title:{
                show:false,
                text: seriesName,
                textAlign:'center',
                x:'65',
                y: '115',
                padding:0,
                textStyle:{
                    fontSize: 14,
                    fontWeight: 'bolder',
                    color: '#72A0BA',
                }
            },
            tooltip: {
                show:true,
                trigger: 'item',
                formatter: "{b}:{d}%",
                position:[10,20]
            },

            legend: {
                orient: 'vertical',
                x: 'left',
                data:[]
            },
            series: [
                {
                    name:'智能质控',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    hoverAnimation:true,
                    silent:true,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: function() {
                                if(type===1) {
                                    return `${networkeRate}%`;
                                }
                                if(type===2) {
                                    return `${runningRate}%`;
                                }
                                return `${transmissionEffectiveRate}%`;
                            },
                            textStyle:{
                                fontSize:14,
                                color:'#fff',
                            }
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    data: seriesData
                }
            ]
        };
        return option;
    }

    /**
     * 异常报警及响应情况--本月数据
     */
    getAlarmAnalysis = () => {
        const {
            dispatch
        } = this.props;
        dispatch({
            type: pageUrl.getAlarmAnalysis,
            payload: {

            },
        });
    }

    /**
     * 异常报警及响应情况数据展示
     */
    AlarmAnalysisData=()=>{
        const {aaData}=this.props.AlarmAnalysis;
        const TheMonth = this.state.TheMonth;
        const retVal=[];
        retVal.push(<div>
            <div className={Adapt.s1}>{TheMonth}月异常报警及响应情况</div>
            <div className={Adapt.s2}>两小时内响应({aaData.LessThan2Hour})次</div>
            <div className={Adapt.s3}>{aaData.LessThan2Hourlink>0?`环比上升${aaData.LessThan2Hourlink}%`:`环比下降${Math.abs(aaData.LessThan2Hourlink)}%`}</div>
            <div className={Adapt.s4}>超八小时响应({aaData.GreaterThan8Hour})次</div>
            <div className={Adapt.s5}>{aaData.GreaterThan8Hourlink>0?`环比上升${aaData.GreaterThan8Hourlink}%`:`环比下降${Math.abs(aaData.GreaterThan8Hourlink)}%`}</div>
            <div className={Adapt.s6}>其它({aaData.OtherTime})次</div>
                    </div>);
        return retVal;
    }
    /**
     * 智能运维_渲染图表
     */

     getoperation=()=>{
         //var width  =window.screen.width==1600?50:70;
         const {aaData}=this.props.AlarmAnalysis;
         let seriesData=[];
         seriesData = [{
             value: aaData.LessThan2Hour,
             name: '二小时内响应'
         },
         {
             value: aaData.GreaterThan8Hour,
             name: '超八小时响应'
         },
         {
             value: aaData.OtherTime,
             name: '其他'
         }
         ];
         let option = {
             color: ['rgb(77,199,140)', 'rgb(90,203,254)', 'rgb(234,203,0)'],
             tooltip:false,
             calculable: false,
             series: [{
                 name: '异常报警及响应情况',
                 type: 'pie',
                 radius: [40, this.state.screenWidth],
                 itemStyle: {
                     normal: {
                         label: {
                             show: false
                         },
                         labelLine: {
                             show: false
                         }
                     },
                     emphasis: {
                         label: {
                             show: false,
                             formatter: "{c}次",
                             textStyle: {
                                 color: 'red',
                                 fontSize: '18',
                                 fontFamily: '微软雅黑',
                                 fontWeight: 'bold'
                             }
                         }
                     }
                 },
                 data: seriesData
             }]
         };
         return option;
     }

     /**
      * 排污许可证获取数据（一年）
      */
     getAllMonthEmissionsByPollutant = () => {
         const {
             dispatch
         } = this.props;
         dispatch({
             type: pageUrl.getAllMonthEmissionsByPollutant,
             payload: {

             },
         });
     }


     /**
      * 排污许可证_渲染图表
       * ycdate: [],
         ycdata: [],
         ycAnalData: [],
         eyhldate: [],
         eyhldata: [],
         eyhlAnalData: [],
         dyhwdate: [],
         dyhwdata: [],
         dyhwAnalData: [],
      */
     getlicense=(type)=>{
         const {
             ycdate,
             ycdata,
             ycAnalData,
             eyhldate,
             eyhldata,
             eyhlAnalData,
             dyhwdate,
             dyhwdata,
             dyhwAnalData,
         } = this.props.allMonthEmissionsByPollutant;
         let TheMonth = this.state.TheMonth;
         let color = [];
         let SumDisplacement=0;//总排量
         let Displacemented=0;//已排放
         let SurplusDisplacement=0;//剩余排量
         let xAxisData= [];//月
         let seriesData = [];//排量
         let title=null;
         let i=1;
         if(type===1){
             let outed=0;
             SurplusDisplacement = ycAnalData.length !== 0 ? ycAnalData.Remainder.toFixed(2) : 0;
             if (SurplusDisplacement>0) {
                 outed = SurplusDisplacement / (12 - Number.parseInt(TheMonth));
                 title = `余${SurplusDisplacement}(t)`;
             }else {
                 title = `超${Math.abs(SurplusDisplacement)}(t)`;
             }
             ycdata.map((ele) => {

                 if (Number.parseInt(TheMonth) <i) {
                     seriesData.push({value:outed.toFixed(2),itemStyle: {normal: {color: '#051732',barBorderColor: 'tomato',barBorderWidth:1,barBorderRadius:0,borderType:"dotted"}}});
                 }else{
                     seriesData.push(ele);
                 }
                 i++;
             });
             xAxisData = ycdate;
             color = ['#0edaad'];
         } else if(type===2) {
             let outed = 0;
             SurplusDisplacement = eyhlAnalData.length !== 0 ? eyhlAnalData.Remainder.toFixed(2) : 0;
             if (SurplusDisplacement > 0) {
                 outed = SurplusDisplacement / (12 - Number.parseInt(TheMonth));
                 title = `余${SurplusDisplacement}(t)`;
             } else {
                 title = `超${Math.abs(SurplusDisplacement)}(t)`;
             }
             eyhldata.map((ele) => {
                 if (Number.parseInt(TheMonth) <i) {
                     seriesData.push({value:outed.toFixed(2),itemStyle: {normal: {color: '#051732',barBorderColor: 'tomato',barBorderWidth:1,barBorderRadius:0,borderType:"dotted"}}});
                 }else{
                     seriesData.push(ele);
                 }
                 i++;
             });
             xAxisData = dyhwdate;
             color = ['#FACB33'];

         } else{
             SurplusDisplacement = dyhwAnalData.length !== 0 ? dyhwAnalData.Remainder.toFixed(2) : 0;
             let outed=0;
             if (SurplusDisplacement > 0) {
                 outed=SurplusDisplacement / (12 - Number.parseInt(TheMonth));
                 title = `余${SurplusDisplacement}(t)`;
             } else {
                 title = `超${Math.abs(SurplusDisplacement)}(t)`;
             }
             dyhwdata.map((ele) => {
                 if (Number.parseInt(TheMonth) <i) {
                     seriesData.push({value:outed.toFixed(2),itemStyle: {normal: {color: '#051732',barBorderColor: 'tomato',barBorderWidth:1,barBorderRadius:0,borderType:"dotted"}}});
                 }else{
                     seriesData.push(ele);
                 }
                 i++;
             });
             xAxisData = eyhldate;

             color = ['#40ccdd'];
         }
         let option = {
             title: {
                 text: title,
                 x:'center',
                 textStyle: {
                     fontSize: 14,
                     fontWeight: 'bolder',
                     color: color
                 }
             },
             color: color,
             tooltip : {
                 trigger: 'axis',
                 axisPointer : {
                     type : 'shadow'
                 }
             },
             grid: {
                 left: '-10%',
                 right: '4%',
                 bottom: '-10%',
                 containLabel: true
             },
             xAxis : [
                 {
                     show : false,
                     type : 'category',
                     data: xAxisData,
                     axisTick: {
                         alignWithLabel: true
                     }
                 }
             ],
             yAxis : [
                 {
                     show : false,
                     type : 'value'
                 }
             ],
             series : [
                 {
                     name:'约排放',
                     type:'bar',
                     barWidth: '60%',
                     data: seriesData,
                 }
             ]
         };
         return option;
     }

     /**地图 */
     getpolygon = (polygonChange) => {
         let res = [];
         if (polygonChange) {
             let arr = eval(polygonChange);
             for (let i = 0; i < arr.length; i++) {
                 res.push( <Polygon
                     key={
                         i
                     }
                     style={
                         {
                             strokeColor: '#FF33FF',
                             strokeOpacity: 0.2,
                             strokeWeight: 3,
                             fillColor: '#1791fc',
                             fillOpacity: 0.1,
                         }
                     }
                     path={
                         arr[i]
                     }
                 />);
             }
         }
         return res;
     }

     mapEvents = {
         created(m) {
             _thismap = m;
         },
         zoomchange: (value) => {},
         complete: () => {
         }
     };

        //地图点位点击
        markersEvents = {
            click: (MapsOption, marker) => {
                const itemdata = marker.F.extData;
                this.treeCilck(itemdata);
            }
        };

treeCilck = (row) => {
    const {
        dispatch,
    } = this.props;
    this.setState({
        visible: true,
        pointName: row.pointName,
        position: {
            latitude: row.latitude,
            longitude: row.longitude,
        },
    });
    _thismap.setZoomAndCenter(15, [row.longitude, row.latitude]);
};

     /**污染物类型切换 */
     onRadioChange=(e)=>{
         const value = e.target.value;
         const {
             dispatch
         } = this.props;
         dispatch({
             type: pageUrl.getdatalist,
             payload: {
                 map: true,
                 pollutantTypes: value
             },
         });
         this.setState({
             visible:false,
         });
     }

     render() {
         const TheMonth = this.state.TheMonth;
         const baseinfo = this.props.baseinfo[0];
         const { model } = this.props.statisticsPointStatus;
         const {
             pointName,
             position,
             visible
         } = this.state;
         let pointposition = position;
         let pointvisible = visible;
         let polygonChange;
         let mapCenter;
         if (baseinfo) {
             const coordinateSet = baseinfo.coordinateSet;
             polygonChange = coordinateSet;
             mapCenter = {
                 longitude: baseinfo.longitude,
                 latitude: baseinfo.latitude
             };
         }

         const {tcData}=this.props.TaskCount;
         const {
             ycAnalData,
             eyhlAnalData,
             dyhwAnalData,
         } = this.props.allMonthEmissionsByPollutant;
         // 91%(0.5/0.6)
         let ycLink;
         if (ycAnalData.length !== 0) {
             ycLink = `${Math.abs(ycAnalData.linkFlag.toFixed(2))}%(${ycAnalData.monthSum.toFixed(2)}/${ycAnalData.flag.toFixed(2)})`;
         }
         let dyhwLink;
         if (dyhwAnalData.length !== 0) {
             dyhwLink = `${Math.abs(dyhwAnalData.linkFlag.toFixed(2))}%(${dyhwAnalData.monthSum.toFixed(2)}/${dyhwAnalData.flag.toFixed(2)})`;
         }
         let eyhlLink;
         if (eyhlAnalData.length !== 0) {
             eyhlLink = `${Math.abs(eyhlAnalData.linkFlag.toFixed(2))}%(${eyhlAnalData.monthSum.toFixed(2)}/${eyhlAnalData.flag.toFixed(2)})`;
         }
         const {
             loadingRateStatistics,
             loadingbaseinfo,
             loadingrateStatistics,
             loadingTaskCount,
             loadingAlarmAnalysis,
             loadingStatisticsPointStatus,
             loadingAllMonthEmissionsByPollutant,
             loadingdatalist,
         } = this.props;
         if (loadingdatalist&&loadingRateStatistics && loadingbaseinfo && loadingrateStatistics && loadingTaskCount && loadingAlarmAnalysis && loadingStatisticsPointStatus && loadingAllMonthEmissionsByPollutant) {
             return ( <Spin
                 style={
                     {
                         width: '100%',
                         height: 'calc(100vh/2)',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center'
                     }
                 }
                 size="large"
             /> );
         }
         return (

             <div style={{ width: '100%',height: 'calc(100vh - 67px)'}}>
                 <Map
                     resizeEnable={true}
                     events={this.mapEvents}
                     zoom={12}
                     mapStyle="amap://styles/darkblue"
                     amapkey={amapKey}
                     center={mapCenter}
                     loading={<Spin
                         style={{width: '100%',
                             height: 'calc(100vh - 260px)',
                             marginTop: 260 }}
                         size="large"
                     />}
                 >
                     <div style={
                         {
                             width: '426px',
                             height:'unset',
                             position: 'absolute',
                             top: '2%',
                             left: '2%',
                             bottom: '2%',
                         }}
                     >
                         <div className={Adapt.LeftLayout1} style={{}}>
                             <Row gutter={24}>
                                 <Col xl={24} lg={24} md={24} sm={12} xs={12}>
                                     <div className={Adapt.divfirt}>
                                         <p>智能质控</p>
                                     </div>
                                 </Col>
                             </Row>
                             <div>
                                 <div className={Adapt.Echarts1920}>
                                     <div className={Adapt.ReactEcharts}>
                                         <div>
                                             <ReactEcharts
                                                 loadingOption={this.props.loadingRateStatistics}
                                                 option={this.getOption(1)}
                                                 style={{height: '90px', width: '100%'}}
                                                 //className="echarts-for-echarts"
                                                 className={Adapt.Echarts}
                                                 theme="my_theme"
                                             />
                                         </div>
                                         <div className={Adapt.LeftLayout1Text}>实时联网率</div>
                                     </div>
                                     <div className={Adapt.ReactEcharts}>
                                         <div>
                                             <ReactEcharts
                                                 loadingOption={this.props.loadingRateStatistics}
                                                 option={this.getOption(2)}
                                                 style={{height: '90px', width: '100%'}}
                                                 className={Adapt.Echarts}
                                                 theme="my_theme"
                                             />
                                         </div>
                                         <div className={Adapt.LeftLayout1Text}>{TheMonth}月设备运转率</div>
                                     </div>
                                     <div className={Adapt.ReactEcharts}>
                                         <div>
                                             <ReactEcharts
                                                 loadingOption={this.props.loadingRateStatistics}
                                                 option={this.getOption(3)}
                                                 style={{height: '90px', width: '100%'}}
                                                 className={Adapt.Echarts}
                                                 theme="my_theme"
                                             />

                                         </div>
                                         <div className={Adapt.LeftLayout1Text}>{TheMonth}月传输有效率</div>

                                     </div>

                                 </div>
                                 <div className={Adapt.Echarts1600}>
                                     <div className={Adapt.ReactEcharts}>
                                         <div>
                                             <ReactEcharts
                                                 loadingOption={this.props.loadingRateStatistics}
                                                 option={this.getOption(1)}
                                                 style={{height: '50px', width: '100%'}}
                                                 //className="echarts-for-echarts"
                                                 className={Adapt.Echarts}
                                                 theme="my_theme"
                                             />
                                         </div>
                                         <div className={Adapt.LeftLayout1Text}>实时联网率</div>
                                     </div>
                                     <div className={Adapt.ReactEcharts}>
                                         <div>
                                             <ReactEcharts
                                                 loadingOption={this.props.loadingRateStatistics}
                                                 option={this.getOption(2)}
                                                 style={{height: '50px', width: '100%'}}
                                                 className={Adapt.Echarts}
                                                 theme="my_theme"
                                             />
                                         </div>
                                         <div className={Adapt.LeftLayout1Text}>{TheMonth}月设备运转率</div>
                                     </div>
                                     <div className={Adapt.ReactEcharts}>
                                         <div>
                                             <ReactEcharts
                                                 loadingOption={this.props.loadingRateStatistics}
                                                 option={this.getOption(3)}
                                                 style={{height: '50px', width: '100%'}}
                                                 className={Adapt.Echarts}
                                                 theme="my_theme"
                                             />

                                         </div>
                                         <div className={Adapt.LeftLayout1Text}>{TheMonth}月传输有效率</div>

                                     </div>

                                 </div>
                             </div>

                         </div>
                         {/* LEFT@2 */}
                         <div className={Adapt.LeftLayout2}>
                             <div className={Adapt.divsecond}>
                                 {this.EPData()}
                             </div>
                         </div>
                         {/* LEFT@3 */}
                         <div className={Adapt.LeftLayout3}>
                             <div>
                                 <div className={Adapt.divfirt}>
                                     <p>智能运维</p>
                                 </div>


                                 <div className={Adapt.divyw}>
                                     <div className={Adapt.divyws}>{TheMonth}月共创建运维<h2 style={{color:'#40ccdd',display:"initial"}}>{tcData.TaskSum}</h2>次</div>
                                     <div className={Adapt.divo}>
                                         <div className={Adapt.divl} />
                                         <div className={Adapt.divm}>
                                             <Progress
                                                 percent={100}
                                                 successPercent={tcData.CompletedTaskSum}
                                                 strokeColor="red"
                                                 showInfo={false}
                                                 strokeWidth={10}
                                             />
                                         </div>
                                         <div className={Adapt.divr} />
                                     </div>
                                     <div className={Adapt.diva}>
                                         <span className={Adapt.p1}>已完成<h2 style={{color:'#62C400'}}>{tcData.CompletedTaskSum}</h2>次</span>
                                         <span className={Adapt.p2}>未完成<h2 style={{color:'#F40000'}}>{tcData.NoCompletedTaskSum}</h2>次</span>
                                     </div>
                                 </div>

                             </div>
                             <div>
                                 <div>

                                     <div className={Adapt.Layered1}>
                                         <div className={Adapt.Echarts1920}>
                                             <div className={Adapt.EchartsA1}>
                                                 <ReactEcharts
                                                     loadingOption={this.props.loadingRateStatistics}
                                                     option={this.getoperation()}
                                                     style={{height: '200px'}}
                                                     className="echarts-for-echarts"
                                                     theme="my_theme"
                                                 />
                                             </div>
                                         </div>
                                         <div className={Adapt.Echarts1600}>
                                             <div className={Adapt.EchartsA1}>
                                                 <ReactEcharts
                                                     loadingOption={this.props.loadingRateStatistics}
                                                     option={this.getoperation()}
                                                     style={{height: '143px', width: '100%'}}
                                                     className="echarts-for-echarts"
                                                     theme="my_theme"
                                                 />
                                             </div>
                                         </div>
                                     </div>
                                     <div className={Adapt.Layered1}>
                                         <br />
                                         {this.AlarmAnalysisData()}
                                     </div>

                                 </div>
                             </div>
                         </div>
                     </div>
                     {/**中间污染物类型*/}
                     <div
                         style={{
                             position: 'absolute',
                             top: '2%',
                             left: 500,
                             zIndex:100
                         }}
                     >
                         <Radio.Group defaultValue="2" buttonStyle="solid" size="small" onChange={this.onRadioChange}>
                             <RadioButton value="2">废气</RadioButton>
                             <RadioButton value="1">废水</RadioButton>
                         </Radio.Group>
                     </div>
                     <div style={
                         {
                             width: '426px',
                             height: 'unset',
                             position: 'absolute',
                             top: '2%',
                             right: '2%',
                             bottom: '2%',
                         }}
                     >
                         {/* Right */}
                         <div className={Adapt.RightLayout1}>
                             {/* 排口情况 */}
                             <div className={Adapt.TitleOut}>排口情况</div>
                             <div className={Adapt.RowElement}>
                                 <div className={Adapt.ColLeft} style={{color:"#0edaad"}}>运行：{model.RuningNum}</div>
                                 <div className={Adapt.ColRight} style={{color:"#ffcc44"}}>异常：{model.ExceptionNum}</div>
                             </div>

                             <div className={Adapt.RowElement}>
                                 <div className={Adapt.ColLeft} style={{color:"#fd6c6c"}}>离线：{model.OffLine}</div>
                                 <div className={Adapt.ColRight} style={{color:"#cccccc"}}>关停：{model.StopNum}</div>
                             </div>

                             <div className={Adapt.RowOut}>
                                 <div className={Adapt.ColTop}>{model.PointTotal}</div>
                                 <div className={Adapt.colTopOut}>排放口</div>
                             </div>
                         </div>
                         <div className={Adapt.RightLayout2} style={{}}>

                             {/*氮氧化物排污许可情况  */}
                             <div className={Adapt.NOx}>
                                 <div className={Adapt.divtitle}>
                                     <i>▍</i>
                                                  氮氧化物排污许可情况
                                 </div>
                                 <div className={Adapt.Layered2}>
                                     <ReactEcharts
                                         loadingOption={this.props.loadingRateStatistics}
                                         option={this.getlicense(3)}
                                         style={{height: '110px'}}
                                         className="echarts-for-echarts"
                                         theme="my_theme"
                                     />
                                 </div>

                                 <div className={Adapt.Layered1}>
                                     <div className={Adapt.divtext1}>
                                                          本年度累计排放量占比
                                         <br />
                                         {dyhwLink}
                                     </div>
                                 </div>
                             </div>

                             {/* 烟尘 */}
                             <div className={Adapt.smoke}>
                                 <div className={Adapt.divtitle}>
                                     <i>▍</i>
                                               烟尘物排污许可情况
                                 </div>
                                 <div className={Adapt.Layered2}>
                                     <ReactEcharts
                                         loadingOption={this.props.loadingRateStatistics}
                                         option={this.getlicense(1)}
                                         style={{height: '110px'}}
                                         className="echarts-for-echarts"
                                         theme="my_theme"
                                     />
                                 </div>

                                 <div className={Adapt.Layered1}>
                                     <div className={Adapt.divtext1}>
                                                         本年度累计排放量占比
                                         <br />
                                         {ycLink}
                                     </div>
                                 </div>

                             </div>


                             {/*二氧化硫排污许可情况  */}

                             <div className={Adapt.SO2}>
                                 <div className={Adapt.divtitle}>
                                     <i>▍</i>
                                                  二氧化硫排污许可情况
                                 </div>
                                 <div className={Adapt.Layered2}>

                                     <ReactEcharts
                                         loadingOption={this.props.loadingRateStatistics}
                                         option={this.getlicense(2)}
                                         style={{height: '110px'}}
                                         className="echarts-for-echarts"
                                         theme="my_theme"
                                     />
                                 </div>

                                 <div className={Adapt.Layered1}>
                                     <div className={Adapt.divtext1}>
                                                          本年度累计排放量占比
                                         <br />
                                         {
                                             eyhlLink
                                         }
                                     </div>
                                 </div>

                             </div>

                         </div>
                     </div>
                     <Markers
                         markers={this.props.datalist}
                         events={this.markersEvents}
                         className={this.state.special}
                         render={(extData) => {
                             if (extData.status === 0) {
                                 return <img style={{width:15}} src="/gisunline.png" />;
                             } if (extData.status === 1) {
                                 return <img style={{width:15}} src="/gisnormal.png" />;
                             } if (extData.status === 2) {
                                 return <img style={{width:15}} src="/gisover.png" />;
                             }
                             return <img style={{width:15}} src="/gisexception.png" />;
                         }}
                     />
                     {
                         this.getpolygon(polygonChange)
                     }
                     <InfoWindow
                         position={pointposition}
                         visible={this.state.visible}
                         isCustom={true}
                         offset={[0, -25]}
                     >
                         {pointName}
                     </InfoWindow>
                 </Map>
             </div>
         );
     }
}
export default index;
