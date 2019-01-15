import React, { Component } from 'react';
import {
    Row,
    Col,
    Spin,
    Progress,
    Layout,
} from 'antd';
import ReactEcharts from 'echarts-for-react';
import {
    connect
} from 'dva';
import { Map, Polygon,GroundImage,Markers } from 'react-amap';
import config from '../../config';
import styles from './index.less';
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
class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

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
        this.getRateStatisticsData();
        this.getbaseinfo();
        this.getpointdatalist();
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
            title:{
                text: seriesName,
                textAlign:'center',
                x:'80',
                y: '115',
                padding:0,
                textStyle:{
                    fontSize: 14,
                    fontWeight: 'bolder',
                    color: '#72A0BA'
                }
            },
            tooltip: {
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
         let option = {
             color: ['rgb(238,204,45)', 'rgb(61,201,252)', 'rgb(44,199,142)'],
             tooltip:false,
             calculable: false,
             series: [{
                 name: '异常报警及响应情况',
                 type: 'pie',
                 radius: [40, 70],
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
                 left: '3%',
                 right: '4%',
                 bottom: '3%',
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

             <div
                 style={{
                     width: '100%',
                     height: 'calc(100vh)',
                     overflow: 'hidden'
                 }}
                 className={styles.divcontent}
             >

                 <Row gutter={24}>
                     <Col span={24}>
                         <div className={styles.divhead}>
                             <div className={styles.divleft} />
                             <div className={styles.divlogotext}>{config.logindesc}</div>
                             <div className={styles.divright} />
                         </div>
                     </Col>
                 </Row>


                 <Row gutter={24}>
                     <Col xl={7} lg={24} md={24} sm={24} xs={24}>
                         <Row gutter={24}>
                             <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                 <div className={styles.divfirt}>
                                     <p>智能质控</p>
                                 </div>
                             </Col>
                         </Row>
                         <Row gutter={24}>
                             <div style={{margin:'0px 0px 10px 30px'}}>
                                 <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                     <div>
                                         <ReactEcharts
                                             loadingOption={this.props.loadingRateStatistics}
                                             option={this.getOption(1)}
                                             style={{height: '130px', width: '110%'}}
                                             className="echarts-for-echarts"
                                             theme="my_theme"
                                         />
                                     </div>
                                 </Col>
                                 <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                     <div>
                                         <ReactEcharts
                                             loadingOption={this.props.loadingRateStatistics}
                                             option={this.getOption(2)}
                                             style={{height: '130px', width: '110%'}}
                                             className="echarts-for-echarts"
                                             theme="my_theme"
                                         />
                                     </div>
                                 </Col>
                                 <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                     <div>
                                         <ReactEcharts
                                             loadingOption={this.props.loadingRateStatistics}
                                             option={this.getOption(3)}
                                             style={{height: '130px', width: '110%'}}
                                             className="echarts-for-echarts"
                                             theme="my_theme"
                                         />
                                     </div>
                                 </Col>
                             </div>
                         </Row>
                         <Row gutter={24}>
                             <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                 <div className={styles.divsecond}>
                                     <div className={styles.divson1}>十月质控智能预警<h2>18</h2>次</div>
                                     <div className={styles.divson2}>
                                         <div>同比<p className={styles.padd} /><h2 style={{color:'#FF4E4E'}}>3</h2><h5 style={{color:'#FF4E4E'}}>次</h5></div>
                                         <div style={{margin:'0px 0px 0px 20px'}}>环比<p className={styles.pdeduct} /><h2 style={{color:'#5BF287'}}>10</h2><h5 style={{color:'#5BF287'}}>次</h5></div>
                                     </div>
                                 </div>
                             </Col>
                         </Row>
                         <Row gutter={24}>
                             <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                 <div className={styles.divfirt}>
                                     <p>智能运维</p>
                                 </div>
                             </Col>
                         </Row>
                         <Row gutter={24}>
                             <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                 <div className={styles.divyw}>
                                     <div className={styles.divo}>
                                         <div className={styles.divl} />
                                         <div className={styles.divm}>
                                             <Progress
                                                 percent={100}
                                                 successPercent={60}
                                                 strokeColor="red"
                                                 showInfo={false}
                                                 strokeWidth={10}
                                             />
                                         </div>
                                         <div className={styles.divr} />
                                     </div>
                                     <div className={styles.diva}>
                                         <span className={styles.p1}>实际运维:<h2 style={{color:'#62C400'}}>31</h2>次</span>
                                         <span className={styles.p2}>逾期运维:<h2 style={{color:'#F40000'}}>5</h2>次</span>
                                     </div>
                                 </div>
                             </Col>
                         </Row>
                         <Row gutter={24}>
                             <div style={{margin:'0px 0px 10px 30px'}}>
                                 <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                     <div>
                                         <ReactEcharts
                                             loadingOption={this.props.loadingRateStatistics}
                                             option={this.getoperation()}
                                             style={{height: '200px', width: '100%'}}
                                             className="echarts-for-echarts"
                                             theme="my_theme"
                                         />
                                     </div>
                                 </Col>
                                 <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                     <div className={styles.divyc}>
                                         <span className={styles.s1}>异常报警及响应情况</span><br />
                                         <span className={styles.s2}>两小时内响应(111)次</span><br />
                                         <span className={styles.s3}>环比上升6%</span><br />
                                         <span className={styles.s4}>超八小时响应(52)次</span><br />
                                         <span className={styles.s5}>环比下降8%</span><br />
                                         <span className={styles.s6}>其它(55)次</span><br />
                                     </div>
                                 </Col>
                             </div>
                         </Row>
                     </Col>
                     <Col xl={10} lg={24} md={24} sm={24} xs={24}>
                         <Row gutter={24}>
                             <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                 <div className={styles.divfirt}>
                                     <p>智能监控</p>
                                 </div>
                             </Col>
                         </Row>
                         <Row gutter={24}>
                             <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                 <div style={{
                                     width: "100%",
                                     height: "400px",
                                 }}
                                 >
                                     <Map
                                         resizeEnable={true}
                                         events={this.mapEvents}
                                         zoom={12}
                                         mapStyle="blue_night"
                                         amapkey={amapKey}
                                         center={mapCenter}
                                         loading={<Spin
                                             style={{width: '100%',
                                                 height: 'calc(100vh - 260px)',
                                                 marginTop: 260 }}
                                             size="large"
                                         />}
                                     >
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
                             </Col>
                         </Row>
                         <Row gutter={24}>
                             <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                 <div className={styles.divtable}>
                                     <table border="0" cellPadding="0" cellSpacing="20" border-collapse="inherit">
                                         <tr color="#fff">
                                             <th> 污染物</th>
                                             <th> 超标次数 </th>
                                             <th> 超标倍数</th>
                                             <th> 最新浓度</th>
                                         </tr>
                                         <tr>
                                             <td>100</td>
                                             <td>200</td>
                                             <td>300</td>
                                             <td>300</td>
                                         </tr>
                                         <tr>
                                             <td>400</td>
                                             <td>500</td>
                                             <td>600</td>
                                             <td>300</td>
                                         </tr>
                                     </table>
                                 </div>
                             </Col>
                         </Row>
                         <Row gutter={24}>
                             <Col />
                         </Row>
                     </Col>
                     <Col xl={7} lg={24} md={24} sm={24} xs={24}>
                         <Row gutter={24}>
                             <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                 <div style={{textAlign:'center'}}>
                                     <div className={styles.divpoint}>
                                         <div className={styles.left}>
                                             <div className={styles.top}>运行：20</div>
                                             <div className={styles.bottom}>离线：9</div>
                                         </div>
                                         <div className={styles.center}>
                                             <div className={styles.number}>40</div>
                                             <div className={styles.name}>排污口</div>
                                         </div>
                                         <div className={styles.right}>
                                             <div className={styles.top}>异常：5</div>
                                             <div className={styles.bottom}>关停：60</div>
                                         </div>
                                     </div>
                                 </div>
                             </Col>
                         </Row>
                         <Row gutter={24}>
                             <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                 <div className={styles.divdyhw}>
                                     <div className={styles.divtitle}>
                                         <p>氮氧化物排污许可情况</p>
                                     </div>
                                     <Row gutter={24}>
                                         <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                             <ReactEcharts
                                                 loadingOption={this.props.loadingRateStatistics}
                                                 option={this.getlicense(1)}
                                                 style={{height: '130px', width: '80%'}}
                                                 className="echarts-for-echarts"
                                                 theme="my_theme"
                                             />
                                         </Col>
                                         <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                             <div className={styles.divtext}>
                                                 <p>本年度累计排放量占比</p>
                                                 <p>91%(0.5/0.6)</p>
                                             </div>
                                         </Col>
                                     </Row>
                                 </div>
                                 <div className={styles.divycpw}>
                                     <div className={styles.divtitle}>
                                         <p>烟尘物排污许可情况</p>
                                     </div>
                                     <Row gutter={24}>
                                         <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                             <ReactEcharts
                                                 loadingOption={this.props.loadingRateStatistics}
                                                 option={this.getlicense(2)}
                                                 style={{height: '130px', width: '80%'}}
                                                 className="echarts-for-echarts"
                                                 theme="my_theme"
                                             />
                                         </Col>
                                         <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                             <div className={styles.divtext}>
                                                 <p>本年度累计排放量占比</p>
                                                 <p>91%(0.5/0.6)</p>
                                             </div>
                                         </Col>
                                     </Row>
                                 </div>
                                 <div className={styles.diveyhl}>
                                     <div className={styles.divtitle}>
                                         <p>二氧化硫排污许可情况</p>
                                     </div>
                                     <Row gutter={24}>
                                         <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                             <ReactEcharts
                                                 loadingOption={this.props.loadingRateStatistics}
                                                 option={this.getlicense(3)}
                                                 style={{height: '130px', width: '80%'}}
                                                 className="echarts-for-echarts"
                                                 theme="my_theme"
                                             />
                                         </Col>
                                         <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                             <div className={styles.divtext}>
                                                 <p>本年度累计排放量占比</p>
                                                 <p>91%(0.5/0.6)</p>
                                             </div>
                                         </Col>
                                     </Row>
                                 </div>
                             </Col>
                         </Row>
                     </Col>
                 </Row>
             </div>
         );
     }
}
export default HomePage;
