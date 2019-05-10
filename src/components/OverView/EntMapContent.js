import React, { Component } from 'react';
import { Map, Markers, Polygon, InfoWindow } from 'react-amap';
import { connect } from 'dva';
import moment from 'moment';
import {
    Spin,
} from 'antd';
import { amapKey,mainpoll } from '../../config';
import {getPointStatusImg} from '../../utils/getStatusImg';
import { debug } from 'util';


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
    entlist: overview.entlist,
    loading:loading.effects['overview/querygetentdatalist'],
}))
//监控地图
class EntMapContent extends Component {
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
         
    }

    //地图事件
    mapEvents = {
        created(m) {
            _thismap = m;
        },
        zoomchange: (value) => {
        },
        complete: () => {
            _thismap.setFitView();
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
         
    };

    polygonEvents={
        click:(e)=>{
           this.entClick(e.target.F.extData);
        }
    }
    
  //绘制厂界
  getpolygon=()=>{
      const {entlist}=this.props;
      if(entlist && entlist.length>0)
      {
        let res=[];
        entlist.map(item=>{
            if(item.coordinateSet) {
                let arr = eval(item.coordinateSet);
                for (let i = 0; i < arr.length; i++) {
                    res.push(<Polygon
                        events={this.polygonEvents}
                        key={item.entCode+i}
                        extData={item}
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
        })
        return res;
      }
  }

  getInfoWindows=()=>{
        const {entlist}=this.props;
        let res=[];
        if(entlist && entlist.length>0)
        {
            entlist.map((item,key)=>{
             const pointposition=[item.longitude,item.latitude];
             res.push( <InfoWindow
                position={pointposition}
                visible={true}
                key={key}
                isCustom={true}
                offset={[0, -25]}
                >
                {item.entName}
              </InfoWindow>)
            })
        }
        return res;
  }

  entClick=(ent)=>{
      const {dispatch}=this.props;
      dispatch({
          type:'overview/updateState',
          payload:{
            selectent:ent
          }
      }) 
      dispatch({
          type:'overview/getPollutantTypeList',
          payload:{}
      })
  }

  render() {
      let {loading,selectpoint}=this.props;
      if(loading) {
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
              mapStyle="fresh"
              amapkey={amapKey}
              plugins={plugins}
          >
          {this.getpolygon()}
          {this.getInfoWindows()}

          </Map>
      );
  }
}

export default EntMapContent;
