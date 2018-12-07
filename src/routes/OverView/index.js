// import liraries
import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Map, Markers, Polygon, InfoWindow} from 'react-amap';
import {
    Spin,
} from 'antd';
import AListRadio from '../../components/OverView/AListRadio';
import {routerRedux} from 'dva/router';
import {amapKey} from '../../config';
import TreeStatus from '../../components/OverView/TreeStatus';
import TreeList from '../../components/OverView/TreeList';
import MapPollutantDetail from '../../components/OverView/MapPollutantDetail';
import ChartData from '../../components/OverView/ChartData';
import TransmissionEfficiency from '../../components/OverView/TransmissionEfficiency';
import moment from 'moment';
import styles from './index.less';
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
@connect(({loading, points, overview, global, baseinfo}) => ({
    datalist: overview.data,
    treecol: overview.mainpcol,
    entInfoModel: baseinfo.entbaseinfo,
    entloading: loading.effects['baseinfo/queryentdetail'],
    detailpcol: overview.detailpcol,
    detaildata: overview.detaildata,
    chartdata: overview.chartdata,
    existdata: overview.existdata,
    chartloading: loading.effects['overview/queryoptionData'],
    selectdata: overview.selectdata,
    pollutantName: overview.pollutantName
}))

class OverViewMap extends PureComponent {
    constructor(props) {
        super(props);
        const _this = this;
        this.map = null;
        this.state = {
            visible: false,
            longitude: 100.300317,
            latitude: 39.01278,
            selectpoint: {},
            detailed: false,
            position: [
                0, 0
            ],
        };
        let _thismap;
        this.mapEvents = {
            created(m) {
                _thismap = m;
            },
            zoomchange: (value) => {

            },
            complete: () => {
                // _thismap.setZoomAndCenter(17, [118.510962, 38.976271]);
            }
        };
    }
     stationClick = () => {
         this.props.dispatch(routerRedux.push('/pointdetail/' + this.state.selectpoint.DGIMN));
     };

    markersEvents = {
        click: (MapsOption, marker) => {
            const itemdata = marker.F.extData;
            this.treeCilck(itemdata);
        }
    };
    componentDidMount() {
        this.props.dispatch({
            type: 'overview/querymainpollutantlist'
        });
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {map: true}
        });
        this.props.dispatch({
            type: 'baseinfo/queryentdetail',
            payload: {}
        });
    }
   treeCilck = (row) => {
       this.props.dispatch({
           type: 'overview/querydetailpollutant',
           payload: {
               dataType: 'HourData',
               dgimn: row.DGIMN
           }
       });
       this.props.dispatch({
           type: 'overview/queryoptionData',
           payload: {
               datatype: 'hour',
               dgimn: row.DGIMN,
               pollutantCodes: '01',
               endTime: moment(new Date()).add('hour', -1),
               beginTime: moment(new Date()).add('hour', -24),
           }
       });
       this.setState({
           visible: true,
           position: {
               latitude: row.latitude,
               longitude: row.longitude,
           },
           longitude: row.longitude,
           latitude: row.latitude,
           selectpoint: row,
           detailed: true,
           pointName: row.pointName,

       });
   };
   detialTreeClick=(row) => {
       this.props.dispatch({
           type: 'overview/queryoptionData',
           payload: {
               datatype: 'hour',
               dgimn: row.dgimn,
               pollutantCodes: row.pcode,
               endTime: moment(new Date()).add('hour', -1),
               beginTime: moment(new Date()).add('hour', -24),
           }
       });
   }
   backTreeList=() => {
       this.setState({
           detailed: false
       });
   }
   render() {
       const entInfo = this.props.entInfoModel ? this.props.entInfoModel[0] : '';
       const allcoo = entInfo ? eval(entInfo.coordinateSet) : '';
       const center = entInfo ? [entInfo.longitude, entInfo.latitude] : '';
       return (
           <div
               style={{
                   width: '100%',
                   height: 'calc(100vh - 67px)'
               }}>
               <Map events={this.mapEvents} resizeEnable={true} center={center}
                   zoom={13} loading={<Spin />} amapkey={amapKey} plugins={plugins}
               >
                   <div style={{ width: 450,
                       height: 'calc(100vh - 90px)',
                       position: 'absolute',
                       top: 10,
                       left: 5,
                       background: 'rgba(255, 255, 255, 0.5)',
                       borderRadius: 10
                   }}>
                       {!this.state.detailed ? <div style={{ marginLeft: 10, marginTop: 10 }}>
                           <div>
                               <TreeStatus datalist={this.props.datalist} />
                           </div>
                           <div style={{marginTop: 15}}>
                               <TreeList treeCilck={this.treeCilck} treecol={this.props.treecol} pointInfo={this.props.datalist} />
                           </div>
                       </div>
                           : <div style={{ marginLeft: 10, marginTop: 10 }}>
                               <div>
                                   <TreeStatus datalist={this.props.datalist} stationClick={this.stationClick} backTreeList={this.backTreeList} pointName={this.state.pointName} detailed={this.state.detailed} />
                               </div>
                               <div style={{marginTop: 15}}>
                                   <TransmissionEfficiency selectdata={this.props.selectdata} />
                               </div>
                               <div style={{marginTop: 15}}>
                                   <MapPollutantDetail detialTreeClick={this.detialTreeClick} detailpcol={this.props.detailpcol} detaildata={this.props.detaildata} />
                               </div>
                               <div style={{marginTop: 15}}>
                                   <ChartData pollutantName={this.props.pollutantName} isloading={this.props.chartloading} chartdata={this.props.chartdata} existdata={this.props.existdata} />
                               </div>
                           </div>
                       }
                   </div>
                   <div
                       style={{
                           position: 'absolute',
                           top: 10,
                           right: 200
                       }}>
                       <AListRadio dvalue="a" />
                   </div>
                   {
                       allcoo ? allcoo.map((item, key) => {
                           return (
                               <Polygon
                                   key={item.EntCode}
                                   style={{
                                       strokeColor: '#FF33FF',
                                       strokeOpacity: 0.2,
                                       strokeWeight: 3,
                                       fillColor: '#1791fc',
                                       fillOpacity: 0.35,
                                   }}
                                   path={item[0]}
                               />);
                       }) : ''
                   }
                   <Markers markers={this.props.datalist} className={this.state.special} events={this.markersEvents}
                       render={(extData) => {
                           if (extData.status === 0) {
                               return <img src="../../../gisunline.png" />;
                           } else if (extData.status === 1) {
                               return <img src="../../../gisnormal.png" />;
                           } else if (extData.status === 2) {
                               return <img src="../../../gisover.png" />;
                           } else {
                               return <img src="../../../gisexception.png" />;
                           }
                       }} />
                   <InfoWindow
                       position={this.state.position}
                       visible={this.state.visible}
                       isCustom={true}
                       offset={[0, -20]}
                   >
                       {this.state.selectpoint.pointName}
                   </InfoWindow>
               </Map>
           </div>

       );
   }
}
export default OverViewMap;
