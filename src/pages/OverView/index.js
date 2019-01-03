// import liraries
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Map, Markers, Polygon, InfoWindow } from 'react-amap';
import {
    Spin,
} from 'antd';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import AListRadio from '../../components/OverView/AListRadio';
import { amapKey, centerlongitude, centerlatitude } from '../../config';
import TreeStatus from '../../components/OverView/TreeStatus';
import MapPollutantDetail from '../../components/OverView/MapPollutantDetail';
import ChartData from '../../components/OverView/ChartData';
import TransmissionEfficiency from '../../components/OverView/TransmissionEfficiency';
import UrgentDispatch from '../../components/OverView/UrgentDispatch';
import TreeDetailStatus from '../../components/OverView/TreeDetailStatus';
import TreeCard from '../../components/OverView/TreeCard';
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
]; let _thismap;
@connect(({ loading, overview, global, baseinfo }) => ({
    datalist: overview.data,
    treecol: overview.mainpcol,
    entInfoModel: baseinfo.entbaseinfo,
    entloading: loading.effects['baseinfo/queryentdetail'],
    detailpcol: overview.detailpcol,
    detaildata: overview.detaildata,
    chartdata: overview.chartdata,
    existdata: overview.existdata,
    chartloading: loading.effects['overview/queryoptionDataOnClick'],
    selectdata: overview.selectdata,
    pollutantName: overview.pollutantName,
    treedataloading: loading.effects['overview/querydatalist'],
    detailloading: loading.effects['overview/queryoptionData'],
    detailtime: overview.detailtime
}))

class OverViewMap extends PureComponent {
    constructor(props) {
        super(props);
        this.map = null;
        this.state = {
            visible: false,
            selectpoint: {},
            statusImg: null,
            detailed: false,
            pdvisible: false,
            position: [
                0, 0
            ],
        };
    }

    mapEvents = {
        created(m) {
            _thismap = m;
        },
        zoomchange: (value) => {

        },
        complete: () => {
            _thismap.setZoomAndCenter(13, [centerlongitude, centerlatitude]);
        }
    };

     stationClick = () => {
        let viewtype='mapview';
         this.props.dispatch(routerRedux.push(`/pointdetail/${this.state.selectpoint.DGIMN}/${viewtype}`));
     };

    markersEvents = {
        click: (MapsOption, marker) => {
            const itemdata = marker.F.extData;
            this.treeCilck(itemdata);
        }
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'overview/querymainpollutantlist'
        });
        dispatch({
            type: 'overview/querydatalist',
            payload: { map: true }
        });
        dispatch({
            type: 'baseinfo/queryentdetail',
            payload: {}
        });
    }

    treeCilck = (row) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'overview/querydetailpollutant',
            payload: {
                dataType: 'HourData',
                dgimn: row.DGIMN
            }
        });
        dispatch({
            type: 'overview/queryoptionData',
            payload: {
                datatype: 'hour',
                dgimn: row.DGIMN,
                pollutantCodes: '01',
                pollutantName: '烟尘',
                endTime: (moment(new Date()).add('hour', -1)).format('YYYY-MM-DD HH:00:00'),
                beginTime: (moment(new Date()).add('hour', -24)).format('YYYY-MM-DD HH:00:00'),
            }
        });
        this.setState({
            visible: true,
            position: {
                latitude: row.latitude,
                longitude: row.longitude,
            },
            selectpoint: row,
            detailed: true,
            pointName: row.pointName,
            statusImg: this.getStatusImg(row.status)
        });
        _thismap.setZoomAndCenter(12, [row.longitude, row.latitude]);
    };

    detialTreeClick = (row) => {
        this.props.dispatch({
            type: 'overview/queryoptionDataOnClick',
            payload: {
                datatype: 'hour',
                pollutantName: row.pollutantName,
                dgimn: row.dgimn,
                pollutantCodes: row.pcode,
                endTime: (moment(new Date()).add('hour', -1)).format('YYYY-MM-DD HH:00:00'),
                beginTime: (moment(new Date()).add('hour', -24)).format('YYYY-MM-DD HH:00:00'),
            }
        });
    }

    onCancel = () => {
        this.setState({
            pdvisible: false,
        });
    }

    pdShow = () => {
        this.setState({
            pdvisible: true,
        });
    }

    backTreeList = () => {
        this.setState({
            detailed: false,
            visible: false
        });
    }

   urge=()=>{
    this.props.dispatch({
        type: 'overview/queryoptionDataOnClick',
        payload: {
            personId:this.state.selectpoint.operationUserID,
            DGIMN: this.state.selectpoint.DGIMN
        }
    });
   }

   getStatusImg=(value) => {
    if (value === 0) {
        return <img style={{width:15}} src="/gisunline.png" />;
    } if (value === 1) {
        return <img style={{width:15}} src="/gisnormal.png" />;
    } if (value === 2) {
        return <img style={{width:15}} src="/gisover.png" />;
    }
    return <img style={{width:15}} src="/gisexception.png" />;
}

   render() {
       const entInfo = this.props.entInfoModel ? this.props.entInfoModel[0] : '';
       const allcoo = entInfo ? eval(entInfo.coordinateSet) : '';
       const {chartloading, detailloading} = this.props;
       return (
         <div
           style={{
                   width: '100%',
                   height: 'calc(100vh - 67px)'
               }}
               className={styles.detailInfo}
         >
           <Map
             events={this.mapEvents}
             resizeEnable
             zoom={13}
             loading={<Spin
               style={{width: '100%',
                       height: 'calc(100vh - 260px)',
                       marginTop: 260 }}
               size="large"
             />}
             amapkey={amapKey}
             plugins={plugins}
           >
             <UrgentDispatch
               onCancel={this.onCancel}
               visible={this.state.pdvisible}
               selectpoint={this.state.selectpoint}
             />
             <div style={{ width: 450,
                       height: 'calc(100vh - 90px)',
                       position: 'absolute',
                       top: 10,
                       left: 5,
                       background: 'rgba(255, 255, 255, 0.5)',
                       borderRadius: 10
                   }}
             >
               {!this.state.detailed ? <div style={{ marginLeft: 10, marginTop: 10 }}>
                 <div>
                   <TreeStatus datalist={this.props.datalist} />
                 </div>
                 <div style={{ marginTop: 15 }}>
                 {/* 添加PollutantType 污染物类型（再调试，为不报错加的2）和为getHeight 自定义高度参数 */}
                   <TreeCard getHeight={'calc(100vh - 210px)'} getStatusImg={this.getStatusImg} isloading={this.props.treedataloading} treeCilck={this.treeCilck} treedatalist={this.props.datalist} PollutantType={2} />
                 </div>
               </div> :
                           detailloading ? <Spin
                             style={{width: '100%',
                               height: 'calc(100vh - 260px)',
                               marginTop: 260 }}
                             size="large"
                           /> :
                           <div style={{ marginLeft: 10, marginTop: 10 }}>
                             <div>
                               <TreeDetailStatus urge={this.urge} pointInfo={this.state.selectpoint} statusImg={this.state.statusImg} pdShow={this.pdShow} detailtime={this.props.detailtime} stationClick={this.stationClick} backTreeList={this.backTreeList} pointName={this.state.pointName} detailed={this.state.detailed} />
                             </div>
                             <div style={{ height: 'calc(100vh - 215px)' }} className={styles.detailInfo}>
                             <div style={{marginTop: 15}}>
                               <TransmissionEfficiency selectdata={this.props.selectdata} />
                             </div>
                             <div style={{marginTop: 15}}>
                               <MapPollutantDetail detialTreeClick={this.detialTreeClick} detailpcol={this.props.detailpcol} detaildata={this.props.detaildata} />
                             </div>
                             <div style={{marginTop: 15}}>
                               <ChartData pollutantName={this.props.pollutantName} isloading={chartloading} chartdata={this.props.chartdata} existdata={this.props.existdata} />
                             </div>
                           </div>
                           </div>
                       }
             </div>
             <div
               style={{
                           position: 'absolute',
                           top: 10,
                           right: 100
                       }}
             >
               <AListRadio dvalue="a" />
             </div>
             {
                       allcoo ? allcoo.map((item, key) => (
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
                         />)) : ''
                   }
             <Markers
               markers={this.props.datalist}
               className={this.state.special}
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
               position={this.state.position}
               visible={this.state.visible}
               isCustom
               offset={[0, -20]}
             >
               {this.state.selectpoint.pointName}
             </InfoWindow>
             <UrgentDispatch />
           </Map>
         </div>

        );
    }
}
export default OverViewMap;
