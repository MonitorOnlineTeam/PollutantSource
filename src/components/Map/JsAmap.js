import React from 'react';
import PropTypes, { array } from 'prop-types';
import { Spin,Button } from 'antd';
import axios from 'axios';
import $script from 'scriptjs';
import styles from './Map.less';

const googleMapSdk = 'https://maps.googleapis.com/maps/api/js?key=your key';
const gaodeMapSdk = 'https://webapi.amap.com/maps?v=1.4.12&key=您申请的key值';


let map = null;
let marker = null;
let geocoder = null;
let Longitude = null;
let Latitude = null;
let zoomLevel = 15;
let mouseTool=null;
let newpoint = new Array();
let originalPolygon=new Array();
class JsAmap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0
        };
    }

    componentWillMount() {
        if (!window.AMap && !(window.google && window.google.maps)) {
            axios.get(googleMapSdk, {timeout: 1000}).then(res => {
                $script([googleMapSdk], (a, b) => {});
            }).catch((error) => {

                $script([gaodeMapSdk], function(a, b) {});
            });
        }
    }

    componentDidMount() {
        let _this = this;
        function listenerStorage() {
            if (window.AMap) {
                if (window.AMap) {
                    const {lat, lng, getMapAddress,polygon} = _this.props;
                    originalPolygon=polygon;
                    const latlngxy = [!lng || lng === 'undefined' || lng === '0' ? 116.397428 : lng, !lat || lat === 'undefined' || lat === '0' ? 39.90923 : lat];// 默认北京天安门
                    map = new window.AMap.Map('allmap', {
                        resizeEnable: true,
                        center: latlngxy,
                        zoom: zoomLevel
                    });

                    // 高德设置语言    ['en', 'zh_en', 'zh_cn']
                    let mapLang;
                    if (window.localStorage.getItem('i18n') === 'en_US') {
                        mapLang = 'en';
                    } else {
                        mapLang = 'zh_cn';
                    }
                    map.setLang(mapLang);

                    // 在新中心点添加 marker
                    marker = new window.AMap.Marker({
                        map: map,
                        position: latlngxy
                    });
                    //加载地图绘制工具
                    map.plugin(['AMap.MouseTool'], () => {
                        mouseTool = new window.AMap.MouseTool(map);
                    });

                    //默认加载的面
                    if (originalPolygon) {
                        let arr = eval(originalPolygon);
                        for (let i = 0; i < arr.length; i++) {
                            const polygon = new window.AMap.Polygon({
                                path: arr[i][0],//设置多边形边界路径
                                strokeColor: "#FF33FF", //线颜色
                                strokeOpacity: 0.2, //线透明度
                                strokeWeight: 3, //线宽
                                fillColor: "#1791fc", //填充色
                                fillOpacity: 0.35,//填充透明度
                                bubble: true
                            });
                            polygon.setMap(map);
                        }
                    }
                }
                _this.setState({
                    status: 1
                });
            } else {
                setTimeout(() => {
                    listenerStorage();
                }, 800);
            }
        }
        listenerStorage();
    }

    //开启绘制面功能
     clickPolygon=()=> {
         const {getMapPolygon}=this.props;
         const _this=this;
         //调用前先清除所有绘图工具的方法
         this.remove();
         mouseTool.polygon(); //用鼠标工具画多边形
         let arr = [];
         AMap.event.addListener(mouseTool, 'draw', (e) => { //添加事件
            let gaodei = new Array();
            for (let i = 0; i < e.obj.getPath().length; i++) {
                let garr = new Array();
                garr.push(e.obj.getPath()[i].lng);
                garr.push(e.obj.getPath()[i].lat);
                gaodei.push(garr);
            }
            newpoint.push(gaodei);
            _this.getAllPolygon();
        });
     }

    //回调坐标集合
    getAllPolygon=()=>{
        //原本有点坐标集合
        const {getMapPolygon } =this.props;
        let coordinatesetArray = new Array();
        if(originalPolygon) {
            const allRings=eval(originalPolygon);
            coordinatesetArray=allRings;
        }
        //新添加的集合
        if (newpoint && newpoint.length > 0) {
            for (let tep = 0; tep < newpoint.length; tep++) {
                let tempring = new Array();
                tempring.push(newpoint[tep]);
                coordinatesetArray.push(tempring);
            }
        }
        let arr = [];
        for (let key in coordinatesetArray) {
            arr.push(coordinatesetArray[key]);
        }
        const coordinateset = this.json2string(arr);
        getMapPolygon && getMapPolygon(coordinateset);
    }


    //开启编辑点位
     clickMarker=()=> {
         //调用前先清除所有绘图工具的方法
         this.remove();
         map.on('click', this.callBackFn);
     }

    callBackFn = (e)=> {
        const {getMapMarker}=this.props;
        //保证只有一个点位
        if (marker != null) {
            map.remove(marker);
        }
        const point=[e.lnglat.getLng(), e.lnglat.getLat()];
        marker = new AMap.Marker({
            map: map,
            position: point
        });
        getMapMarker && getMapMarker(point);

    };

    //重置所有绘图工具
      remove=()=> {
          map.off('click', this.callBackFn);
          mouseTool.close(false);
      };

    //js 转换
    json2string=(jsonObj)=>{
        let type = Object.prototype.toString.call(jsonObj).slice(8, -1); let rs;
        switch (type) {
            case "Undefined":
            case "Null":
            case "Number":
            case "Boolean":
            case "Date":
            case "Function":
            case "Error":
            case "RegExp": rs = jsonObj; break;
            case "String": rs = `"${  jsonObj  }"`; break;
            case "Array":
                rs = "";
                for (let i = 0, len = jsonObj.length; i < len; i++) {
                    rs += `${this.json2string(jsonObj[i])  },`;
                }
                rs = `[${  rs.slice(0, -1)  }]`;
                break;

            case "Object":
                rs = [];
                for (let k in jsonObj) {
                    rs.push(`"${  k.toString()  }":${  this.json2string(jsonObj[k])}`);
                }
                rs = `{${  rs.join(",")  }}`;
                break;
        }
        return rs;
    }


    //   getSearch=()=>{
    //     if (window.AMap) {
    //         window.AMap.service('AMap.Geocoder', function() { // 回调函数
    //         // 实例化Geocoder
    //             geocoder = new window.AMap.Geocoder({});
    //             geocoder.getLocation(nextProps.address, function(status, result) {
    //                 if (status === 'complete' && result.info === 'OK') {
    //                     let latlng = result.geocodes[0].location;
    //                     // 设置缩放级别和中心点
    //                     let latlngxy = [latlng['lng'], latlng['lat']];
    //                     const currentZoom = map.getZoom();
    //                     map.setZoomAndCenter(currentZoom != zoomLevel ? currentZoom : zoomLevel, latlngxy);
    //                 } else {

    //                 }
    //             });
    //         });
    //     }
    //   }


  componentWillReceiveProps=(nextProps) => {
      if (window.AMap && nextProps.address && nextProps.address != this.props.address) {
          window.AMap.service('AMap.Geocoder', () => { // 回调函数
          // 实例化Geocoder
              geocoder = new window.AMap.Geocoder({});
              geocoder.getLocation(nextProps.address, function(status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                      let latlng = result.geocodes[0].location;
                      // 设置缩放级别和中心点
                      let latlngxy = [latlng['lng'], latlng['lat']];
                      const currentZoom = map.getZoom();
                      map.setZoomAndCenter(currentZoom != zoomLevel ? currentZoom : zoomLevel, latlngxy);
                  } else {
                     
                  }
              });
          });
      }
  }

  //清除地图
  clearMap=()=>{
      //清空数据
      const {getMapPolygon,getMapMarker}=this.props;
      newpoint=new Array();
      originalPolygon=new Array();
      getMapPolygon && getMapPolygon(null);
      getMapMarker && getMapMarker(null);
      map.clearMap();
      this.remove();

  }

  render() {
      const { mapheight } = this.props;
      const allcoo=eval(originalPolygon);
      return (
          <div className={styles.mapButton} style={{height: mapheight || 300}}>
              <Spin spinning={this.state.status == 0} tip="Loading...">
                  <div id="allmap" style={{height: mapheight || 300}}>
                      <Button style={{left:30}} onClick={this.clearMap} className={styles.ClearButton}>清除全部</Button>
                      <Button style={{left:130}} onClick={this.clickPolygon} className={styles.ClearButton}>设置坐标集合</Button>
                      <Button style={{left:260}} onClick={this.clickMarker} className={styles.ClearButton}>设置经纬度</Button>
                  </div>
              </Spin>
          </div>
      );
  }
}

// JsAmap.propTypes = {
//     lng: PropTypes.string,
//     lat: PropTypes.string,
//     className: PropTypes.string,
// };

export default JsAmap;
