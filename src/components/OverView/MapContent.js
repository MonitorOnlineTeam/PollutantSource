import React, { Component } from 'react';
import { Map, Markers, Polygon, InfoWindow } from 'react-amap';
import { connect } from 'dva';
import moment from 'moment';
import {
    Spin,
} from 'antd';
import { amapKey,mainpoll } from '../../config';


//地图工具
const plugins = [
    'MapType',
    'Scale', {
        name: 'ToolBar',
        options: {
            visible: true, // 不设置该属性默认就是 true
            onCreated(ins) {
                console.log(ins);
            }
        }
    }
];
let _thismap=null;
@connect(({ loading, overview }) => ({
    //点位数据信息
    datalist: overview.data,
    //企业的信息
    baseModel: overview.entbaseinfo,
    //加载所以初始化显示的信息
    maploading:loading.effects['overview/queryentdetail'],
    //选中的点
    selectpoint:overview.selectpoint,
    pollutantTypeCode:overview.selectpollutantTypeCode
}))
//地图（地图一览）
class MapContent extends Component {
    constructor(props) {
        super(props);
        this.state={
            position: [
                0, 0
            ],
            visible:false,
            pointName:null
        };
    }

    //初始化
    componentWillMount(){
        const {dispatch,pollutantTypeCode}=this.props;
        dispatch({
            type: 'overview/queryentdetail',
            payload:{ map: true,pollutantTypes:pollutantTypeCode }
        });
    }

    //地图事件
    mapEvents = {
        created(m) {
            _thismap = m;
        },
        zoomchange: (value) => {
        },
        complete: () => {
            // _thismap.setZoomAndCenter(13, [centerlongitude, centerlatitude]);
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
        const { dispatch,pollutantTypeCode } = this.props;

        const pollutantInfoList=mainpoll.find(value=>value.pollutantCode==pollutantTypeCode);
        //第一次加载时加载第一个污染物
        const defaultpollutantCode=pollutantInfoList.pollutantInfo[0].pollutantCode;
        const defaultpollutantName=pollutantInfoList.pollutantInfo[0].pollutantName;
        //加载首要污染物Table
        dispatch({
            type: 'overview/querydetailpollutant',
            payload: {
                dataType: 'HourData',
                dgimn: row.DGIMN,
                pollutantTypeCode:pollutantTypeCode,
                datatype: 'hour',
                pollutantCodes: defaultpollutantCode,
                pollutantName: defaultpollutantName,
                endTime: moment(new Date()).add('hour', -1).format('YYYY-MM-DD HH:00:00'),
                beginTime: moment(new Date()).add('hour', -24).format('YYYY-MM-DD HH:00:00'),
            }
        });
        this.setState({
            visible: true,
            pointName:row.pointName,
            position: {
                latitude: row.latitude,
                longitude: row.longitude,
            },
        });
        dispatch({
            type: 'overview/updateState',
            payload: {
                selectpoint: row,
                selectpollutantTypeCode:`${row.pollutantTypeCode}`
            },
        });
        _thismap.setZoomAndCenter(15, [row.longitude, row.latitude]);
    };

  //绘制厂界
  getpolygon=(polygonChange)=>{
      let res=[];
      if(polygonChange) {
          let arr = polygonChange;
          for (let i = 0; i < arr.length; i++) {
              res.push(<Polygon
                  key={i}
                  style={{
                      strokeColor: '#FF33FF',
                      strokeOpacity: 0.2,
                      strokeWeight: 3,
                      fillColor: '#595959',
                      fillOpacity: 0.35,
                  }}
                  path={arr[i]}
              />);
          }
      }
      return res;
  }

  render() {
      const {maploading,baseModel,selectpoint}=this.props;
      const baseinfo = baseModel[0];
      //地图中心
      let mapCenter;
      //厂界坐标
      let allcoo;
      if (baseinfo) {
          mapCenter = { longitude: baseinfo.longitude, latitude: baseinfo.latitude };
          if(baseinfo.coordinateSet)
              allcoo=eval(baseinfo.coordinateSet);
      }
      let pointposition=mapCenter;
      let pointvisible=false;
      let pointName=null;
      let zoom=12;
      if(selectpoint && _thismap) {
          pointposition=selectpoint.position;
          pointName=selectpoint.pointName;
          pointvisible=true;
          mapCenter=[selectpoint.longitude, selectpoint.latitude];
          zoom=15;
          _thismap.setZoomAndCenter(15, [selectpoint.longitude, selectpoint.latitude]);
      } else {
          zoom=12;
          pointvisible=false;
      }
      if(maploading) {
          return(<Spin
              style={{ width: '100%',
                  height: 'calc(100vh/2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center' }}
              size="large"
          />);
      }
      return (
          <Map
              events={this.mapEvents}
              resizeEnable={true}
              zoom={zoom}
              center={mapCenter}
              mapStyle="fresh"
              amapkey={amapKey}
              plugins={plugins}
          >
              {
                  this.getpolygon(allcoo)
              }
              <Markers
                  markers={this.props.datalist}
                  events={this.markersEvents}
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
              <InfoWindow
                  position={pointposition}
                  visible={pointvisible}
                  isCustom={true}
                  offset={[0, -25]}
              >
                  {pointName}
              </InfoWindow>
          </Map>
      );
  }
}

export default MapContent;