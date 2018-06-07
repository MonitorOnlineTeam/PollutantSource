// import liraries
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Map, Markers,Marker, InfoWindow } from 'react-amap';
import { Select, Cascader, Input, Card, Spin,Radio } from 'antd';
import { routerRedux } from 'dva/router';
import config from '../../config';
import MarkerDetail from '../../components/MarkerDetail';
import styles from './index.less';
import city from '../../utils/city';
import BreadcrumbHeader from '../../components/BreadcrumbHeader';

const Option = Select.Option;
const Search = Input.Search;

const { amapKey, zoom } = config;
const plugins = [
  'MapType',
  'Scale', {
    name: 'ToolBar',
    options: {
      visible: true, // 不设置该属性默认就是 true
      onCreated(ins) {
        console.log(ins);
      },
    },
  },
];

@connect(({ loading, points, global }) => ({
  ...loading,
  pointlist: points.pointlist,
  pollutanttype: global.pollutanttype,
  lastdata: points.lastdata,
  hourtendency: points.hourtendency,
  selectpoint: points.selectpoint,
  pollutant: points.pollutant,
  markers:[]
}))
class OverViewMap extends PureComponent {
  constructor(props) {
    super(props);
    const _this = this;
    this.map = null;
  
    this.state = {
      position: [0, 0],
      visible: false,
      markers:this.props.markers
    };

     
  
    this.markersEvents = {
      click: (MapsOption, marker) => {
        const itemdata = marker.F.extData;
        _this.setState({
          visible: false,
        });
        _this.setState({
          position: { longitude: itemdata.position.longitude, latitude: itemdata.position.latitude },
          visible: true,
        });
      }
      
    }
  }
  render() {
    const markersinfo=[
      {
      key: "1",
      position: {
        longitude: 116.335854,
        latitude: 39.985071,
      },
      title:"研发顶楼1"
    },
    {
      key: "2",
      position: {
        longitude: 116.365869,
        latitude: 39.915087,
      },
      title:"研发顶楼2"
    },
    {
      key: "3",
      position: {
        longitude: 116.346202,
        latitude: 40.070817,
      },
      title:"研发顶楼3"
    },
    {
      key: "4",
      position: {
        longitude: 116.246282,
        latitude: 40.170817,
      },
      title:"研发顶楼4"
    }];

    const { location, pollutanttype, effects } = this.props;
    const { payload = {} } = location;
    const clusterOptions = {
      zoomOnClick: true,
      gridSize: 30,
      minClusterSize: 3,
    };
    const html = `<div><h4>Greetings</h4><p>This is content of this info window</p><p>Click 'Change Value' Button: ${this.state.value}</p></div>`;
    return (
      <div
        style={{ width: '100%',height: 'calc(100vh - 70px)' }}
      >
            <Map
              loading={<Spin />}
              amapkey={amapKey}
              plugins={plugins}
            >
                <div style={{width:260,position:'absolute',top:100,left:100,background:'#fff' }}>
                    <Radio.Group style={{padding:'10px 2px 2px 10px' }} defaultValue="a">
                      <Radio.Button value="a">监控</Radio.Button>
                      <Radio.Button value="b">运维</Radio.Button>
                      <Radio.Button value="c">排污</Radio.Button>
                      <Radio.Button value="d">质控</Radio.Button>
                    </Radio.Group>
                    <Input  style={{ width:237,margin:'0px 2px 10px 10px' }}/>
               </div>
            
             <Markers markers={ markersinfo} 
              events={this.markersEvents}/>
             <InfoWindow
               autoMove
               showShadow
                position={this.state.position}
                visible={this.state.visible}
                content={html}
                size={{
                  width: 290,
                  height: 350,
                }}
                offset={[0, -10]}
              />
            </Map>
      </div>);
  }
}


// make this component available to the app
export default OverViewMap;
