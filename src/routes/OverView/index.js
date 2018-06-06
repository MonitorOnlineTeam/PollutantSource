// import liraries
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Map, Markers, InfoWindow } from 'react-amap';
import { Select, Cascader, Input, Card, Spin } from 'antd';
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
}))
class OverViewMap extends PureComponent {
  constructor() {
    super();
    const _this = this;
    this.map = null;
    this.state = {
      position: [0, 0],
      visible: false,
    };
  }
 
  render() {
    const markers = [{
      key: "1234546",
      position: {
        longitude: 109.480766,
        latitude: 29.932931,
      },
      title: `雪迪龙-研发顶楼`,
    }];
    const { location, pollutanttype, effects } = this.props;
    const { payload = {} } = location;
  
    const windowheight = 220 + (this.props.lastdata.length * 15);
    const clusterOptions = {
      zoomOnClick: true,
      gridSize: 30,
      minClusterSize: 3,
    };
    return (
      <div
        style={{ width: '100%',
      height: 'calc(100vh - 120px)' }}
        className={styles.standardList}
      >
            <Map
              loading={<Spin />}
              amapkey={amapKey}
              plugins={plugins}
            >
             <Input style={{width:200,position:'absolute',top:100,left:100}} />
              <Markers
                markers={markers}
                events={this.markerEvents}
                useCluster={clusterOptions}
                render={(extData) => {
                return (<div style={{ background: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  width: '30px',
                  height: '40px',
                  color: '#000',
                  textAlign: 'center',
                  lineHeight: '40px' }}
                />);
              }}
              />
            </Map>
      </div>);
  }
}


// make this component available to the app
export default OverViewMap;
