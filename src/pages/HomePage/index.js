import React, { Component } from 'react';
import {
    Row,
    Col,
    Spin,
    Progress,
    Layout,
    Drawer
} from 'antd';
import ReactEcharts from 'echarts-for-react';
import {
    connect
} from 'dva';
import { Map, Polygon,Markers } from 'react-amap';
import config from '../../config';
import styles from './index.less';
import Adapt from './Adapt.less';

/*
页面：首页
add by xpy
modify by
*/
const pageUrl = {
    getRateStatisticsData: 'workbenchmodel/getRateStatisticsData',
    getbaseinfo: 'baseinfo/queryentdetail',
    getdatalist: 'overview/querydatalist',
};
const { amapKey } = config;
const {enterpriceid}=config;
let _thismap;

@connect(({
    loading,
    workbenchmodel,
    baseinfo,
    overview,
}) => ({
    loadingRateStatistics: loading.effects[pageUrl.getRateStatisticsData],
    loadingbaseinfo: loading.effects[pageUrl.getbaseinfo],
    rateStatistics: workbenchmodel.rateStatistics,
    baseinfo: baseinfo.entbaseinfo,
    datalist: overview.data,
}))
class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            screenWidth:window.screen.width===1600?50:70
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
        this.getRateStatisticsData();
        this.getbaseinfo();
        this.getpointdatalist();
    }
     
    handleScroll=()=>{
      this.setState({
        screenWidth:window.screen.width===1600?50:70
        
      })
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

             },
         });
     }

    /**
     * 智能质控_率的统计_更新数据
     */
    getRateStatisticsData = () => {
        const {dispatch} = this.props;
        dispatch({
            type: pageUrl.getRateStatisticsData,
            payload: {

            },
        });
    }

    /**
     * 智能质控_渲染图表
     */
    getOption = (type) => {
        const {model}=this.props.rateStatistics;
        let networkeRate=(parseFloat(model.NetworkeRate) * 100).toFixed(2);
        let runningRate=(parseFloat(model.RunningRate) * 100).toFixed(2);
        let transmissionEffectiveRate=(parseFloat(model.TransmissionEffectiveRate) * 100).toFixed(2);

        let legendData=[];
        let color=[];
        let seriesName='';
        let seriesData=[];
        if(type===1) {
            legendData=['正常','离线'];
            color=['rgb(86,244,133)','rgb(32,99,81)'];
            seriesName='实时联网率';
            seriesData=[//(parseFloat(model.NetworkeRate) * 100).toFixed(2)
                {value:networkeRate, name:'正常'},
                {value:100-networkeRate, name:'离线'}
            ];
        }else if(type===2) {
            legendData=['达标','未达标'];
            color=['rgb(86,244,133)','rgb(52,150,103)'];
            seriesName='设备运转率';
            seriesData=[
                {value:runningRate, name:'达标'},
                {value:(100-runningRate).toFixed(2), name:'未达标'}
            ];
        }else {
            legendData=['达标','未达标'];
            color=['rgb(255,78,78)','rgb(89,55,72)'];
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
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '10',
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
     * 智能运维_更新数据
     */

    /**
     * 智能运维_渲染图表
     */

     getoperation=()=>{
      //var width  =window.screen.width==1600?50:70;
         let option = {
             color: ['rgb(238,204,45)', 'rgb(61,201,252)', 'rgb(44,199,142)'],
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
                 data: [{
                     value: 335,
                     name: '二小时内响应'
                 },
                 {
                     value: 310,
                     name: '超八小时响应'
                 },
                 {
                     value: 234,
                     name: '其它'
                 },
                 ]
             }]
         };
         return option;
     }

     /**
      * 排污许可证_渲染图表
      */
     getlicense=(type)=>{
         let color = [];
         if(type===1){
             color = ['#ffffff'];
         } else if(type===2) {
             color = ['#EDCB2B'];
         } else{
             color = ['#F84B4E'];
         }
         let option = {
             title: {
                 text: '余0.17(t)',
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
                     data : ['1月', '1月', '1月', '1月', '1月', '1月', '1月', '1月', '1月', '1月', '1月', '1月'],
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
                     name:'直接访问',
                     type:'bar',
                     barWidth: '60%',
                     data:[10, 52, 200, 334, 390, 330, 334, 390, 330,11,22,
                         {value:220,itemStyle: {normal: {color: '#051732',barBorderColor: 'tomato',barBorderWidth:1,barBorderRadius:0,borderType:"dotted"}}}
                     ],
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

     render() {
         const baseinfo = this.props.baseinfo[0];
         let polygonChange;
         let mapCenter;
         let bounds;
         if (baseinfo) {
             const coordinateSet = baseinfo.coordinateSet;
             polygonChange = coordinateSet;
             mapCenter = {
                 longitude: baseinfo.longitude,
                 latitude: baseinfo.latitude
             };
         }
         if (mapCenter!==undefined) {
             bounds = {
                 sw: {
                     longitude: mapCenter.longitude-1,
                     latitude: mapCenter.latitude-1,
                 },
                 ne: {
                     longitude: mapCenter.longitude + 1,
                     latitude: mapCenter.latitude + 1,
                 }
             };
         }
         return (

             <div style={{ width: '100%',height: 'calc(100vh - 67px)'}}>
                 <Map
                     resizeEnable={true}
                     events={this.mapEvents}
                     zoom={13}
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
                         <div  className={Adapt.LeftLayout1} style={{}}>
                             <Row gutter={24}>
                                 <Col xl={24} lg={24} md={24} sm={12} xs={12}>
                                     <div className={Adapt.divfirt}>
                                         <p>智能质控</p>
                                     </div>
                                 </Col>
                             </Row>
                             <div>
                                 <div  className={Adapt.Echarts1920} >
                                     <div  className={Adapt.ReactEcharts}>
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
                                     <div className={Adapt.ReactEcharts} >
                                         <div>
                                             <ReactEcharts
                                                 loadingOption={this.props.loadingRateStatistics}
                                                 option={this.getOption(2)}
                                                 style={{height: '90px', width: '100%'}}
                                                 className={Adapt.Echarts}
                                                 theme="my_theme"
                                             />
                                         </div>
                                         <div className={Adapt.LeftLayout1Text}>10月设备运转率</div>
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
                                         <div className={Adapt.LeftLayout1Text}>10月传输有效率</div>
                                         
                                     </div>

                                 </div>
                                      <div  className={Adapt.Echarts1600} >
                                     <div  className={Adapt.ReactEcharts}>
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
                                     <div className={Adapt.ReactEcharts} >
                                         <div>
                                             <ReactEcharts
                                                 loadingOption={this.props.loadingRateStatistics}
                                                 option={this.getOption(2)}
                                                 style={{height: '50px', width: '100%'}}
                                                 className={Adapt.Echarts}
                                                 theme="my_theme"
                                             />
                                         </div>
                                         <div className={Adapt.LeftLayout1Text}>10月设备运转率</div>
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
                                         <div className={Adapt.LeftLayout1Text}>10月传输有效率</div>
                                         
                                     </div>

                                 </div>
                             </div>

                         </div>
                         {/* LEFT@2 */}
                         <div  className={Adapt.LeftLayout2} >
                             <div className={Adapt.divsecond}>
                                 <div className={Adapt.divson1}>10月质控智能预警<h2>18</h2>次</div>
                                 <div className={Adapt.divson2}>
                                     <div  className={Adapt.Layered1}>同比<i className={Adapt.padd} /><h2 style={{color:'#FF4E4E'}}>3</h2><h5 style={{color:'#FF4E4E'}}>次</h5></div>
                                     <div className={Adapt.Layered1}>环比<i className={Adapt.pdeduct} /><h2 style={{color:'#5BF287'}}>10</h2><h5 style={{color:'#5BF287'}}>次</h5></div>
                                 </div>
                             </div>
                         </div>
					    {/* LEFT@3 */}
                         <div className={Adapt.LeftLayout3} >
                             <div>
                                         <div className={Adapt.divfirt}>
                                             <p>智能运维</p>
                                         </div>
                               
                                   
                                         <div className={Adapt.divyw}>
                                         <div className={Adapt.divyws}>计划运维<h2 style={{color:'#40ccdd',display:"initial"}}>31</h2>次</div>
                                             <div className={Adapt.divo}>
                                                 <div className={Adapt.divl} />
                                                 <div className={Adapt.divm}>
                                                     <Progress
                                                         percent={100}
                                                         successPercent={60}
                                                         strokeColor="red"
                                                         showInfo={false}
                                                         strokeWidth={10}
                                                     />
                                                 </div>
                                                 <div className={Adapt.divr} />
                                             </div>
                                             <div className={Adapt.diva}>
                                                 <span className={Adapt.p1}>实际运维<h2 style={{color:'#62C400'}}>31</h2>次</span>
                                                 <span className={Adapt.p2}>逾期运维<h2 style={{color:'#F40000'}}>5</h2>次</span>
                                             </div>
                                         </div>
                                   
                                 </div>
                                 <div >
                                     <div >
                                        
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
                                                 <div className={Adapt.s1}>异常报警及响应情况</div>
                                                 <div className={Adapt.s2}>两小时内响应(111)次</div>
                                                 <div className={Adapt.s3}>环比上升6%</div>
                                                 <div className={Adapt.s4}>超八小时响应(52)次</div>
                                                 <div className={Adapt.s5}>环比下降8%</div>
                                                 <div className={Adapt.s6}>其它(55)次</div>
                                             </div>
                                        
                                     </div>
                                 </div>
                             </div>
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
                         <div className={Adapt.RightLayout1} >
                         {/* 排口情况 */}
                           <div className={Adapt.TitleOut}>排口情况</div>
                           <div className={Adapt.RowElement}>
                           <div className={Adapt.ColLeft} style={{color:"#0edaad"}}>运行：26</div>
                           <div className={Adapt.ColRight} style={{color:"#ffcc44"}}>异常：5</div>
                           </div>

                           <div className={Adapt.RowElement}>
                           <div className={Adapt.ColLeft} style={{color:"#fd6c6c"}}>离线：8</div>
                           <div className={Adapt.ColRight} style={{color:"#cccccc"}}>关停：0</div>
                           </div>

                           <div className={Adapt.RowOut}>
                           <div className={Adapt.ColTop}>40</div>
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
                                                           option={this.getlicense(1)}
                                                           style={{height: '110px'}}
                                                           className="echarts-for-echarts"
                                                           theme="my_theme"
                                                       />
                                                 </div>
                                             
                                                 <div className={Adapt.Layered1}>  
                                              <div className={Adapt.divtext1}>
                                                          本年度累计排放量占比
                                                          <br/>
                                                           91%(0.5/0.6)
                                              </div>
                                              </div>
                                        </div>
                                  
                                         {/* 烟尘 */}
                                         <div  className={Adapt.smoke}>
                                              <div className={Adapt.divtitle}>
                                               <i >▍</i>  
                                               烟尘物排污许可情况
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
                                                         <br/>
                                                        91%(0.5/0.6)
                                                      </div>
                                               </div>
                                                
                                          </div>     
                                      
                                       
                                 
                                          {/*二氧化硫排污许可情况  */}

                                        <div  className={Adapt.SO2}>
                                              <div className={Adapt.divtitle}>
                                              <i>▍</i>
                                                  二氧化硫排污许可情况
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
                                                          <br/>
                                                         91%(0.5/0.6)
                                                      </div>
                                                 </div>

                                        </div>
                                  
                         </div>
                     </div>
                     <Markers
                         markers={this.props.datalist}
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
                 </Map>
             </div>
         );
     }
}
export default index;
