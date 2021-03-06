import React, { Component } from 'react';
import {
  Row,
  Col,
  Spin,
  Progress,
  Radio,
  Button,
} from 'antd';
import ReactEcharts from 'echarts-for-react';
import { routerRedux } from 'dva/router';
import {
  connect
} from 'dva';
import { Map, Polygon, Markers, InfoWindow } from 'react-amap';
import moment from 'moment';
import { getPointStatusImg } from '@/utils/getStatusImg';
import { onlyOneEnt } from '../../config';
import config from '../../config';
import styles from './index.less';
import Adapt from './Adapt.less';
import Link from 'umi/link';
import Marquee from '../../components/Marquee/index'



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
  getAllPollutantTypelist: 'overview/getPollutantTypeList',

};
const { RunningRate, TransmissionEffectiveRate, amapKey } = config;
const { enterpriceid } = config;
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
  loadingAllPollutantTypelist: loading.effects[pageUrl.getAllPollutantTypelist],
  RateStatisticsByEnt: homepage.RateStatisticsByEnt,
  TaskCount: homepage.TaskCount,
  ExceptionProcessing: homepage.ExceptionProcessing,
  AlarmAnalysis: homepage.AlarmAnalysis,
  statisticsPointStatus: workbenchmodel.statisticsPointStatus,
  allMonthEmissionsByPollutant: homepage.AllMonthEmissionsByPollutant,
  baseinfo: baseinfo.entbaseinfo,
  datalist: overview.data,
  pollutantTypelist: overview.pollutantTypelist,
  entCode: homepage.entCode,
  wheretopage: homepage.wheretopage,
  warningInfoList: homepage.warningInfoList,
  earlyWarningList: homepage.earlyWarningList
}))
class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenWidth: window.screen.width === 1600 ? 50 : 70,
      TheMonth: moment().format('MM'),
      position: [
        0, 0
      ],
      // zoom: window.innerWidth > 1600 ? 13 : 12,
      zoom: 13,
      visible: false,
      pointName: null,
      radioDefaultValue: "",
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
    window.addEventListener('resize', this.handleScroll());
    this.getbaseinfo();
    this.getpointdatalist();
    this.getExceptionProcessing();
    this.getTaskCount();
    this.getAlarmAnalysis();
    this.getRateStatisticsByEnt();
    this.getStatisticsPointStatus();
    this.getAllMonthEmissionsByPollutant();
    this.getpollutantTypelist();
  }

  componentDidMount() {
    // 获取报警信息
    this.props.dispatch({
      type: "homepage/getWarningInfo",
      payload: {
        PollutantType: "2",
      }
    })

    // 获取实时预警信息
    this.props.dispatch({
      type: "homepage/getEarlyWarningInfo",
      payload: {
        // PollutantType: "2",
      }
    })
    // 根据页面宽度修改地图缩放
    // if (window.innerWidth > 1600) {
    //   setTimeout(() => {
    //     this.setState({
    //       zoom: 13
    //     })
    //   }, 9000)
    // }
  }

  getpollutantTypelist = () => {
    const { dispatch } = this.props;
    dispatch({
      type: pageUrl.getAllPollutantTypelist,
      payload: {
        treeCard: true
      },
    });
  }

  handleScroll = () => {
    this.setState({
      screenWidth: window.screen.width === 1600 ? 50 : 70
    });
    this.getoperation();
  }

  /**
   *  企业基本信息
   */
  getbaseinfo = () => {
    const { dispatch, entCode } = this.props;
    dispatch({
      type: pageUrl.getbaseinfo,
      payload: {
        entCode: entCode
      },
    });
  }

  /**
   * 点位信息
   */
  getpointdatalist = () => {
    const {
      dispatch,
      entCode
    } = this.props;
    dispatch({
      type: pageUrl.getdatalist,
      payload: {
        map: true,
        pollutantTypes: '',
        entCode: entCode
      },
    });
  }

  /**
   * 点位状态
   */
  getStatisticsPointStatus = () => {
    const {
      dispatch,
      entCode
    } = this.props;
    dispatch({
      type: pageUrl.getStatisticsPointStatus,
      payload: {
        entCode: entCode
      },
    });
  }

  /**
   * 智能质控_率的统计_更新数据
   */
  getRateStatisticsByEnt = () => {
    const { dispatch, entCode } = this.props;
    dispatch({
      type: pageUrl.getRateStatisticsByEnt,
      payload: {
        entCode: entCode
      },
    });
  }

  /**
   * 智能预警--月数据
   */
  getExceptionProcessing = () => {
    const {
      dispatch,
      entCode
    } = this.props;
    dispatch({
      type: pageUrl.getExceptionProcessing,
      payload: {
        entCode: entCode
      },
    });
  }

  /**
   * 智能预警数据展示
   */
  EPData = () => {
    const retVal = [];
    const { epData } = this.props.ExceptionProcessing;
    const TheMonth = this.state.TheMonth;


    retVal.push(
      <div style={{ height: "100%" }}>
        <div className={Adapt.divson1}>{TheMonth}月质控智能预警<h2>{epData.ThisMonthEP}</h2>次</div>
        <div className={Adapt.divson2}>
          <div className={
            Adapt.Layered1
          }
          > 同比 {
              epData.ThisMonthTB > 0 ?
                <div><i className={Adapt.padd} /><h2 style={{ color: '#FF4E4E' }}>{Math.abs(epData.ThisMonthTB)}</h2><h5 style={{ color: '#FF4E4E' }}>次</h5></div> :
                <div><i className={Adapt.pdeduct} /><h2 style={{ color: '#5BF287' }}>{Math.abs(epData.ThisMonthTB)}</h2><h5 style={{ color: '#5BF287' }}>次</h5></div>
            }
          </div>
          <div className={Adapt.Layered1}>环比 {
            epData.ThisMonthHB > 0 ?
              <div><i className={Adapt.padd} /><h2 style={{ color: '#FF4E4E' }}>{Math.abs(epData.ThisMonthHB)}</h2><h5 style={{ color: '#FF4E4E' }}>次</h5></div> :
              <div><i className={Adapt.pdeduct} /><h2 style={{ color: '#5BF287' }}>{Math.abs(epData.ThisMonthHB)}</h2><h5 style={{ color: '#5BF287' }}>次</h5></div>
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
      dispatch,
      entCode
    } = this.props;
    dispatch({
      type: pageUrl.getTaskCount,
      payload: {
        entCode: entCode
      },
    });
  }

  /**
   * 智能质控_渲染图表
   */
  getOption = (type) => {
    const { rsdata } = this.props.RateStatisticsByEnt;
    let networkeRate = rsdata.NetworkeRate === undefined ? 0 : (parseFloat(rsdata.NetworkeRate) * 100).toFixed(0);
    let runningRate = rsdata.RunningRate === undefined ? 0 : (parseFloat(rsdata.RunningRate) * 100).toFixed(0);
    let transmissionEffectiveRate = rsdata.TransmissionEffectiveRate === undefined ? 0 : (parseFloat(rsdata.TransmissionEffectiveRate) * 100).toFixed(0);

    // 假数据
    networkeRate = 95;
    runningRate = 100;
    transmissionEffectiveRate = 90

    let legendData = [];
    let color = [];
    let seriesName = '';
    let seriesData = [];
    if (type === 1) {
      legendData = ['正常', '离线'];
      color = ['rgb(86,244,133)', 'rgb(32,99,81)'];
      seriesName = '实时联网率';
      seriesData = [
        { value: networkeRate, name: '正常' },
        { value: 100 - networkeRate, name: '离线' }
      ];
    } else if (type === 2) {
      legendData = ['达标', '未达标'];
      if (parseFloat(runningRate) >= RunningRate) {
        color = ['rgb(86,244,133)', 'rgb(32,99,81)'];
      } else {
        color = ['rgb(255,78,78)', 'rgb(32,99,81)'];
      }
      seriesName = '设备运转率';
      seriesData = [
        { value: runningRate, name: '达标' },
        { value: (100 - runningRate).toFixed(2), name: '未达标' }
      ];
    } else {
      legendData = ['达标', '未达标'];
      if (parseFloat(transmissionEffectiveRate) >= TransmissionEffectiveRate) {
        color = ['rgb(86,244,133)', 'rgb(32,99,81)'];
      } else {
        color = ['rgb(255,78,78)', 'rgb(32,99,81)'];
      }
      seriesName = '传输有效率';
      seriesData = [
        { value: transmissionEffectiveRate, name: '达标' },
        { value: (100 - transmissionEffectiveRate).toFixed(2), name: '未达标' }
      ];
    }
    let option = {
      color: color,
      animation: false,
      title: {
        show: false,
        text: seriesName,
        textAlign: 'center',
        x: '65',
        y: '115',
        padding: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'bolder',
          color: '#72A0BA',
        }
      },
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: "{b}:{d}%",
        position: [10, 20]
      },

      legend: {
        orient: 'vertical',
        x: 'left',
        data: []
      },
      series: [
        {
          name: '智能质控',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          hoverAnimation: true,
          silent: true,
          label: {
            normal: {
              show: true,
              position: 'center',
              formatter: function () {
                if (type === 1) {
                  return `${networkeRate}%`;
                }
                if (type === 2) {
                  return `${runningRate}%`;
                }
                return `${transmissionEffectiveRate}%`;
              },
              textStyle: {
                fontSize: 14,
                color: '#fff',
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
      dispatch,
      entCode
    } = this.props;
    dispatch({
      type: pageUrl.getAlarmAnalysis,
      payload: {
        entCode: entCode
      },
    });
  }

  /**
   * 异常报警及响应情况数据展示
   */
  AlarmAnalysisData = () => {
    const { aaData } = this.props.AlarmAnalysis;
    const TheMonth = this.state.TheMonth;
    const retVal = [];
    retVal.push(<div className={Adapt.monthWaringContainer}>
      {/* <div className={Adapt.s1}>{TheMonth}月异常报警及响应情况</div> */}
      <div className={Adapt.s2}>两小时内响应({aaData.LessThan2Hour})次</div>
      <div className={Adapt.s3}>{aaData.LessThan2Hourlink > 0 ? `环比上升${aaData.LessThan2Hourlink}%` : `环比下降${Math.abs(aaData.LessThan2Hourlink)}%`}</div>
      <div className={Adapt.s4}>超八小时响应({aaData.GreaterThan8Hour})次</div>
      <div className={Adapt.s5}>{aaData.GreaterThan8Hourlink > 0 ? `环比上升${aaData.GreaterThan8Hourlink}%` : `环比下降${Math.abs(aaData.GreaterThan8Hourlink)}%`}</div>
      <div className={Adapt.s6}>其它({aaData.OtherTime})次</div>
    </div>);
    return retVal;
  }
  /**
   * 智能运维_渲染图表
   */

  getoperation = () => {
    //var width  =window.screen.width==1600?50:70;
    const { aaData } = this.props.AlarmAnalysis;
    let seriesData = [];
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
      tooltip: false,
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
      dispatch,
      entCode
    } = this.props;
    dispatch({
      type: pageUrl.getAllMonthEmissionsByPollutant,
      payload: {
        entCode: entCode
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
  getlicense = (type) => {
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
    let SumDisplacement = 0;//总排量
    let Displacemented = 0;//已排放
    let SurplusDisplacement = 0;//剩余排量
    let xAxisData = [];//月
    let seriesData = [];//排量
    let title = null;
    let i = 1;
    if (type === 1) {
      let outed = 0;
      SurplusDisplacement = ycAnalData.length !== 0 ? ycAnalData.Remainder.toFixed(2) : 0;
      if (SurplusDisplacement > 0) {
        outed = SurplusDisplacement / (12 - Number.parseInt(TheMonth));
        title = `余${SurplusDisplacement}(t)`;
      } else {
        title = `超${Math.abs(SurplusDisplacement)}(t)`;
      }
      ycdata.map((ele) => {

        if (Number.parseInt(TheMonth) < i) {
          seriesData.push({ value: outed.toFixed(2), itemStyle: { normal: { color: '#051732', barBorderColor: 'tomato', barBorderWidth: 1, barBorderRadius: 0, borderType: "dotted" } } });
        } else {
          seriesData.push(ele == 0 ? { value: ele, itemStyle: { normal: { color: '#051732', barBorderColor: 'tomato', barBorderWidth: 1, barBorderRadius: 0, borderType: "dotted" } } } : ele);
        }
        i++;
      });
      xAxisData = ycdate;
      color = ['#0edaad'];
    } else if (type === 2) {
      let outed = 0;
      SurplusDisplacement = eyhlAnalData.length !== 0 ? eyhlAnalData.Remainder.toFixed(2) : 0;
      if (SurplusDisplacement > 0) {
        outed = SurplusDisplacement / (12 - Number.parseInt(TheMonth));
        //  title = `余${SurplusDisplacement}(t)`;
        title = `余${SurplusDisplacement}(t)`;
      } else {
        title = `超${Math.abs(SurplusDisplacement)}(t)`;
      }
      eyhldata.map((ele) => {
        if (Number.parseInt(TheMonth) < i) {
          seriesData.push({ value: outed.toFixed(2), itemStyle: { normal: { color: '#051732', barBorderColor: 'tomato', barBorderWidth: 1, barBorderRadius: 0, borderType: "dotted" } } });
        } else {
          seriesData.push(ele == 0 ? { value: ele, itemStyle: { normal: { color: '#051732', barBorderColor: 'tomato', barBorderWidth: 1, barBorderRadius: 0, borderType: "dotted" } } } : ele);
        }
        i++;
      });
      xAxisData = dyhwdate;
      color = ['#03b3ff'];

    } else {
      SurplusDisplacement = dyhwAnalData.length !== 0 ? dyhwAnalData.Remainder.toFixed(2) : 0;
      let outed = 0;
      if (SurplusDisplacement > 0) {
        outed = SurplusDisplacement / (12 - Number.parseInt(TheMonth));
        title = `余${SurplusDisplacement}(t)`;
      } else {
        title = `超${Math.abs(SurplusDisplacement)}(t)`;
      }
      dyhwdata.map((ele) => {
        if (Number.parseInt(TheMonth) < i) {
          seriesData.push({ value: outed.toFixed(2), itemStyle: { normal: { color: '#051732', barBorderColor: 'tomato', barBorderWidth: 1, barBorderRadius: 0, borderType: "dotted" } } });
        } else {
          seriesData.push(ele == 0 ? { value: ele, itemStyle: { normal: { color: '#051732', barBorderColor: 'tomato', barBorderWidth: 1, barBorderRadius: 0, borderType: "dotted" } } } : ele);
        }
        i++;
      });
      xAxisData = eyhldate;

      color = ['#40ccdd'];
    }
    let option = {
      title: {
        text: title,
        x: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bolder',
          color: color
        }
      },
      color: color,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '-10%',
        right: '4%',
        bottom: '-10%',
        containLabel: true
      },
      xAxis: [
        {
          show: false,
          type: 'category',
          data: xAxisData,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          show: false,
          type: 'value'
        }
      ],
      series: [
        {
          name: '约排放',
          type: 'bar',
          barWidth: '60%',
          data: seriesData,
        }
      ]
    };
    return option;
  }

  getProgress = (tcData) => {
    let percentage = 100;
    if (tcData && (tcData.CompletedTaskSum != 0 || tcData.NoCompletedTaskSum != 0)) {
      percentage = tcData.CompletedTaskSum / (tcData.CompletedTaskSum + tcData.NoCompletedTaskSum) * 100;
    }

    return (
      <Progress
        percent={100}
        successPercent={percentage}
        strokeColor="red"
        showInfo={false}
        strokeWidth={10}
      />
    )
  }

  /**渲染污染物列表 */
  renderpollutantTypelist = () => {
    const { pollutantTypelist } = this.props;
    let res = [];
    if (pollutantTypelist) {
      res.push(<RadioButton value="" style={{ top: -1 }}>全部</RadioButton>);
      pollutantTypelist.map((item, key) => {
        let type = "";
        if (item.pollutantTypeCode == 2) { type = "△" }  // 废气
        if (item.pollutantTypeCode == 1) { type = "○" }  // 废水
        if (item.pollutantTypeCode == 10) { type = "☆" }  // 厂界voc
        if (item.pollutantTypeCode == 12) { type = "□" }  // 厂界扬尘
        res.push(<RadioButton key={key} value={item.pollutantTypeCode}>{item.pollutantTypeName} <span style={{ fontSize: 16 }} >{type}</span></RadioButton>)
      })
    }
    return res;
  }

  getBackButton = () => {
    const { wheretopage } = this.props;
    if (!onlyOneEnt) {
      if (wheretopage == "datalist") {
        return (<Button type="primary"><Link to="/overview/datalistview">返回</Link></Button>)
      }
      else if (wheretopage == "mapview") {
        return (<Button type="primary"><Link to='/overview/mapview'>返回</Link></Button>)
      }
    }

  }

  /**地图 */
  getpolygon = (polygonChange) => {
    let res = [];
    if (polygonChange) {
      let arr = eval(polygonChange);
      for (let i = 0; i < arr.length; i++) {
        res.push(<Polygon
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
    zoomchange: (value) => { },
    complete: () => {
    }
  };

  //地图点位点击
  markersEvents = {
    click: (MapsOption, marker) => {
      const itemdata = marker.F ? marker.F.extData : marker.B.extData;
      this.treeCilck(itemdata);
    }
  };

  treeCilck = (row) => {
    // const {
    //     dispatch,
    // } = this.props;
    // this.setState({
    //     visible: true,
    //     pointName: row.pointName,
    //     position: {
    //         latitude: row.latitude,
    //         longitude: row.longitude,
    //     },
    // });
    // _thismap.setZoomAndCenter(15, [row.longitude, row.latitude]);
    let viewtype = 'homepage';
    this.props.dispatch(routerRedux.push(`/pointdetail/${row.DGIMN}/${viewtype}`));


  };

  /**污染物类型切换 */
  onRadioChange = (e) => {
    const value = e.target.value;
    const {
      dispatch,
      entCode
    } = this.props;
    dispatch({
      type: pageUrl.getdatalist,
      payload: {
        map: true,
        pollutantTypes: value,
        entCode: entCode
      },
    });
    this.setState({
      visible: false,
      radioDefaultValue: value
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
        latitude: baseinfo.latitude - 0.02
      };
    }

    const { tcData } = this.props.TaskCount;
    const {
      ycAnalData,
      eyhlAnalData,
      dyhwAnalData,
    } = this.props.allMonthEmissionsByPollutant;
    // 91%(0.5/0.6)
    let ycLink;
    if (ycAnalData && ycAnalData.length !== 0) {
      ycLink = `${Math.abs(ycAnalData.linkFlag.toFixed(2))}%(${ycAnalData.monthSum.toFixed(2)}/${ycAnalData.flag.toFixed(2)})`;
    }
    let dyhwLink;
    if (dyhwAnalData && dyhwAnalData.length !== 0) {
      dyhwLink = `${Math.abs(dyhwAnalData.linkFlag.toFixed(2))}%(${dyhwAnalData.monthSum.toFixed(2)}/${dyhwAnalData.flag.toFixed(2)})`;
    }
    let eyhlLink;
    if (eyhlAnalData && eyhlAnalData.length !== 0) {
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
    if (loadingdatalist || loadingRateStatistics || loadingbaseinfo || loadingrateStatistics || loadingTaskCount || loadingAlarmAnalysis || loadingStatisticsPointStatus || loadingAllMonthEmissionsByPollutant) {
      return (<Spin
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
      />);
    }
    let warningInfoList = this.props.warningInfoList;
    warningInfoList = [
      { "txt": `旺能环保：二氧化硫从2019-09-29 13:23:18发生了1次报警。` },
      { "txt": `废水出口：COD从2019-09-29 14:16:40发生了4次报警。` },
      { "txt": `监测排口：二氧化硫从2019-08-22 07:13:14发生了7次报警。` },
      { "txt": `2#炉脱硫后：氮氧化物从2019-08-19 14:23:18发生了3次报警。` },
      { "txt": `窑尾：流量从2019-08-11 11:30:00发生了11次报警。` },
      { "txt": `一线窑头：烟气温度从2019-08-06 23:01:44发生了17次报警。` },
      { "txt": `1号机组：烟气湿度从2019-08-22 08:33:54发生了4次报警。` },
      { "txt": `2号脱销入口：烟尘从2019-07-29 06:53:33发生了2次报警。` },
      { "txt": `1号脱销入口：二氧化硫从2019-07-24 17:43:16发生了7次报警。` },
      { "txt": `废气入口1：氮氧化物从2019-07-22 06:58:38发生了1次报警。` },
      { "txt": `排放口：烟气湿度从2019-07-20 13:23:18发生了4次报警。` },
      { "txt": `四川SCSN：二氧化硫从2019-07-19 21:21:44发生了4次报警。` },
      { "txt": `临时排放口-水泥窑尾：二氧化硫从2019-07-19 00:23:18发生了3次报警。` },
      { "txt": `1SYWJ层燃口：二氧化硫从2019-07-13 33:33:00发生了2次报警。` },
      { "txt": `废气入口2：烟尘从2019-07-11 11:23:11发生了1次报警。` },
    ]

    let earlyWarningList = this.props.earlyWarningList;
    // 假数据
    earlyWarningList = [
      { "txt": `四川SCSN：2019-09-29 13:18:39烟尘 | 超标预警值为6.1 | 建议浓度为4.3` },
      { "txt": `废气入口2：2019-08-21 13:18:39氮氧化物 | 超标预警值为4.1 | 建议浓度为2.4` },
      { "txt": `四川SCSN：2019-07-22 06:58:38二氧化硫 | 超标预警值为3.1 | 建议浓度为6.3` },
      { "txt": `2号脱销入口：2019-07-11 11:23:11二氧化硫 | 超标预警值为13.1 | 建议浓度为11.2` },
      { "txt": `废气入口2：2019-09-29 13:18:39二氧化硫 | 超标预警值为13.1 | 建议浓度为11.2` },
      { "txt": `1SYWJ层燃口：2019-07-19 21:21:44二氧化硫 | 超标预警值为13.1 | 建议浓度为11.2` },
      { "txt": `一线窑头：2019-08-19 14:23:18二氧化硫 | 超标预警值为6.3 | 建议浓度为4.3` },
      { "txt": `废水出口：2019-09-29 13:18:39二氧化硫 | 超标预警值为4.3 | 建议浓度为2.2` },
      { "txt": `旺能环保：2019-08-11 11:30:00二氧化硫 | 超标预警值为8.3 | 建议浓度为6.2` },
      { "txt": `2#炉脱硫后：2019-09-29 13:18:39二氧化硫 | 超标预警值为2.1 | 建议浓度为0.5` },
      { "txt": `2#炉脱硫后：2019-09-29 13:18:39二氧化硫 | 超标预警值为13.1 | 建议浓度为4.3` },
      { "txt": `旺能环保：2019-09-29 13:18:39二氧化硫 | 超标预警值为3.1 | 建议浓度为0.2` },
      { "txt": `2#炉脱硫后：2019-07-29 06:53:33二氧化硫 | 超标预警值为13.1 | 建议浓度为11.2` },
      { "txt": `废水出口：2019-09-29 13:18:39二氧化硫 | 超标预警值为13.1 | 建议浓度为11.2` },
      { "txt": `四川SCSN：2019-09-29 13:18:39烟尘 | 超标预警值为6.1 | 建议浓度为4.3` },
      { "txt": `废气入口2：2019-08-21 13:18:39氮氧化物 | 超标预警值为4.1 | 建议浓度为2.4` },
      { "txt": `四川SCSN：2019-07-22 06:58:38二氧化硫 | 超标预警值为3.1 | 建议浓度为6.3` },
      { "txt": `2号脱销入口：2019-07-11 11:23:11二氧化硫 | 超标预警值为13.1 | 建议浓度为11.2` },
    ]

    return (

      <div className={styles.homeWrapper} style={{ width: '100%', height: 'calc(100vh - 64px)' }}>
        <header className={Adapt.homeHeader}>
          <p><span>SDL</span> 污染源智能分析系统</p>
          <a className={Adapt.backMenu} href="" onClick={() => {
            this.props.dispatch(routerRedux.push("/"))
          }}>返回菜单</a>
        </header>
        <Map
          resizeEnable={true}
          events={this.mapEvents}
          zoom={this.state.zoom}
          mapStyle="amap://styles/blue"
          amapkey={amapKey}
          center={mapCenter}

        >
          <div style={
            {
              width: '454px',
              height: 'unset',
              position: 'absolute',
              top: '2%',
              left: '1%',
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
                <div className={Adapt.Echarts1920_}>
                  <div className={Adapt.ReactEcharts}>
                    <div>
                      <ReactEcharts
                        loadingOption={this.props.loadingRateStatistics}
                        option={this.getOption(1)}
                        style={{ height: '90px', width: '100%' }}
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
                        style={{ height: '90px', width: '100%' }}
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
                        style={{ height: '90px', width: '100%' }}
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
                        style={{ height: '50px', width: '100%' }}
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
                        style={{ height: '50px', width: '100%' }}
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
                        style={{ height: '50px', width: '100%' }}
                        className={Adapt.Echarts}
                        theme="my_theme"
                      />

                    </div>
                    <div className={Adapt.LeftLayout1Text}>{TheMonth}月传输有效率</div>

                  </div>

                </div>
              </div>

            </div>
            <div className={Adapt.leftContainer}>
              {/* LEFT@3 */}
              <div className={Adapt.LeftLayout3}>
                <div style={{ overflow: "hidden" }}>
                  <div className={Adapt.divfirt}>
                    <p>智能运维</p>
                  </div>


                  <div className={Adapt.divyw}>
                  {/* {tcData.TaskSum} */}
                    <div className={Adapt.divyws}>{TheMonth}月共创建运维<h2 style={{ color: '#40ccdd', display: "initial" }}>130</h2>次</div>
                    <div className={Adapt.divo}>
                      <div className={Adapt.divl} />
                      <div className={Adapt.divm}>
                        {this.getProgress(tcData)}
                      </div>
                      <div className={Adapt.divr} />
                    </div>
                    <div className={Adapt.diva}>
                    {/* {tcData.CompletedTaskSum} */}
                      <span className={Adapt.p1}>已完成<h2 style={{ color: '#62C400' }}>113</h2>次</span>
                      {/* {tcData.NoCompletedTaskSum} */}
                      <span className={Adapt.p2}>未完成<h2 style={{ color: '#F40000' }}>17</h2>次</span>
                    </div>
                  </div>

                </div>
                <div style={{ overflow: "hidden" }}>
                  <div>
                    <div className={Adapt.Layered1Title}>
                      <p>{TheMonth}月异常报警及响应情况</p>
                    </div>
                    <div className={Adapt.Layered1}>
                      <div className={Adapt.Echarts1920}>
                        <div className={Adapt.EchartsA1}>
                          <ReactEcharts
                            loadingOption={this.props.loadingRateStatistics}
                            option={this.getoperation()}
                            style={{ height: '200px' }}
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
                            style={{ height: '143px', width: '100%' }}
                            className="echarts-for-echarts"
                            theme="my_theme"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={Adapt.Layered1} style={{ marginTop: 30 }}>
                      <br />
                      {this.AlarmAnalysisData()}
                    </div>

                  </div>
                </div>
                <div className={Adapt.divsecond}>
                  {this.EPData()}
                </div>
              </div>
              {/* LEFT@2 */}
              <div className={Adapt.LeftLayout2}>
                <div className={Adapt.warningWrapper} style={{ borderTop: 0, marginTop: 15, height: "calc(100%)", marginLeft: -1, width: "calc(100% -2px)" }}>
                  {/* <div className={Adapt.title}>
            <i>▍</i>
            实时预警
                </div> */}
                  <Marquee loopData={earlyWarningList} direction='vertical' verticalItemHeight='30px' />
                  {/* <ul className={Adapt.list}>
                {
                  this.state.loopData.map(item => <li>{item.txt}</li>)
                }
              </ul> */}
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
              zIndex: 100
            }}
          >
            <Radio.Group style={{}} defaultValue={this.state.radioDefaultValue} buttonStyle="solid" size="default" onChange={this.onRadioChange}>
              {this.renderpollutantTypelist()}
            </Radio.Group>
          </div>
          <div className={Adapt.overproofWrapper}>
            <div className={Adapt.title}>{TheMonth}月超标汇总</div>
            <div className={Adapt.content}>
              <ul className={Adapt.colum}>
                <li>污染物</li>
                <li>超标次数</li>
                <li>超标倍数</li>
              </ul>
              <ul>
                <li>烟尘</li>
                <li>5次</li>
                <li>0.2-0.5</li>
              </ul>
              <ul>
                <li>二氧化硫</li>
                <li>3次</li>
                <li>0.1-0.3</li>
              </ul>
              <ul>
                <li>氮氧化物</li>
                <li>6次</li>
                <li>0.6-0.9</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              top: '3%',
              right: 500,
              zIndex: 100
            }}
          >
            {this.getBackButton()}
          </div>

          <div style={
            {
              width: '454px',
              height: 'unset',
              position: 'absolute',
              top: '2%',
              right: '1%',
              bottom: '2%',
            }}
          >
            {/* Right */}
            <div className={Adapt.RightLayout1}>
              {/* 排口情况 */}
              {/* <div className={Adapt.TitleOut}>排口情况</div> */}
              <Row gutter={24} className={Adapt.title}>
                <Col xl={24} lg={24} md={24} sm={12} xs={12}>
                  <div className={Adapt.divfirt}>
                    <p>智能监控</p>
                  </div>
                </Col>
              </Row>
              <div className={Adapt.RowElement}>
                <div className={Adapt.ColLeft} style={{ color: "#0edaad" }}>运行：{model.RuningNum}</div>
                <div className={Adapt.ColRight} style={{ color: "#ffcc44" }}>异常：{model.ExceptionNum}</div>
              </div>

              <div className={Adapt.RowElement}>
                <div className={Adapt.ColLeft} style={{ color: "#fd6c6c" }}>离线：{model.OffLine}</div>
                <div className={Adapt.ColRight} style={{ color: "#cccccc" }}>关停：{model.StopNum}</div>
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
                    style={{ height: '110px' }}
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
                    style={{ height: '110px' }}
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
                    style={{ height: '110px' }}
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
            {/* 实时预警 */}
            {/* <div className={Adapt.warningWrapper}>
              <div className={Adapt.title}>
                <i>▍</i>
                实时预警
                </div>
              <Marquee loopData={this.props.earlyWarningList} direction='vertical' verticalItemHeight='30px' />
            </div> */}
            {/* 报警信息 */}
            <div className={Adapt.warningWrapper}>
              <div className={Adapt.title}>
                <i>▍</i>
                报警信息
              </div>
              <Marquee loopData={warningInfoList} direction='vertical' verticalItemHeight='30px' />
              {/* <div className={Adapt.overproofWrapper}>

              </div> */}
            </div>

          </div>
          <Markers
            markers={this.props.datalist}
            events={this.markersEvents}
            className={this.state.special}
            render={(extData) => {
              return getPointStatusImg(extData.status, extData.stop, extData.pollutantTypeCode, 20, "home");
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
      </div >
    );
  }
}
export default index;
