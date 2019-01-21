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
import { amapKey, centerlongitude, centerlatitude,mainpoll } from '../../config';
import TreeStatus from '../../components/OverView/TreeStatus';
import MapPollutantDetail from '../../components/OverView/MapPollutantDetail';
import ChartData from '../../components/OverView/ChartData';
import TransmissionEfficiency from '../../components/OverView/TransmissionEfficiency';
import UrgentDispatch from '../../components/OverView/UrgentDispatch';
import TreeDetailStatus from '../../components/OverView/TreeDetailStatus';
import TreeCard from '../../components/OverView/TreeCard';
import SearchInput from '../../components/OverView/SearchInput';
import TreeCardContent from '../../components/OverView/TreeCardContent';
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
    pollutantTypeloading:loading.effects['overview/getPollutantTypeList'],
    detailpollutantloading:loading.effects['overview/querydetailpollutant'],
    detailtime: overview.detailtime,
    pollutantTypelist:overview.pollutantTypelist
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
            pollutantTypeCode:"2",
            pointName:null,
            searchName:null
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
            payload: { map: true,pollutantTypes:this.state.pollutantTypeCode }
        });
        dispatch({
            type: 'baseinfo/queryentdetail',
            payload: {}
        });
        dispatch({
            type: 'overview/getPollutantTypeList',
            payload: {
            }
        });
    }

    treeCilck = (row) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'overview/querydetailpollutant',
            payload: {
                dataType: 'HourData',
                dgimn: row.DGIMN,
                pollutantTypeCode:this.state.pollutantTypeCode
            }
        });
        const pollutantInfoList=mainpoll.find(value=>{
            return value.pollutantCode==this.state.pollutantTypeCode;
        })
        const defaultpollutantCode=pollutantInfoList.pollutantInfo[0].pollutantCode;
        const defaultpollutantName=pollutantInfoList.pollutantInfo[0].pollutantName;
        dispatch({
            type: 'overview/queryoptionData',
            payload: {
                datatype: 'hour',
                dgimn: row.DGIMN,
                pollutantCodes: defaultpollutantCode,
                pollutantName: defaultpollutantName,
                pollutantTypeCode:this.state.pollutantTypeCode,
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
                pollutantTypeCode:this.state.pollutantTypeCode,
                dgimn: row.dgimn,
                pollutantCodes: row.pcode,
                endTime: (moment(new Date()).add('hour', -1)).format('YYYY-MM-DD HH:00:00'),
                beginTime: (moment(new Date()).add('hour', -24)).format('YYYY-MM-DD HH:00:00'),
            }
        });
    }

    pdShow = () => {
        this.setState({
            pdvisible: true,
        });
    }
    //派单窗口关闭
    onCancel=() => {
        this.setState({
            pdvisible: false,
        });
    }
    backTreeList = () => {
        this.setState({
            detailed: false,
            visible: false
        });
    }
   //催办
   urge=()=>{
    this.props.dispatch({
        type: 'overview/queryurge',
        payload: {
            personId:this.state.selectpoint.operationUserID,
            DGIMN: this.state.selectpoint.DGIMN
        }
    });
   }
      //直接刷新（带数据）
    Refresh=()=>{
        const {pollutantTypeCode,searchName}=this.state;
       this.reloadData(pollutantTypeCode,searchName);
    }

    //重新加载
    reloadData=(pollutantTypeCode,searchName)=>{
        this.setState({
            pollutantTypeCode:pollutantTypeCode
        })
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                 map: true,
                 pollutantTypes:pollutantTypeCode,
                 pointName:searchName
            },
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

  //当前选中的污染物类型
  getNowPollutantType=(key)=>{
     this.setState({
         pollutantTypeCode:key
     })
     const {searchName}=this.state;
     this.reloadData(key,searchName);
  }

  //查询
  onSerach=(value)=>{
      this.setState({
        searchName:value
      })
    const {pollutantTypeCode}=this.state;
    this.reloadData(pollutantTypeCode,value);
  }

  getdetailed=()=>{
    const { pollutantTypelist,detailloading,detailpcol,detaildata,selectdata,chartdata,pollutantName,
        existdata,treedataloading,datalist,chartloading,pollutantTypeloading}  = this.props;
    const {detailed,statusImg,selectpoint,pointName,detailpollutantloading}=this.state;
    if(!detailed)
    {
      return( 
      <div style={{ marginLeft: 10, marginTop: 10 }}>
        <div><SearchInput
        onSerach={this.onSerach}
        style={{marginTop:5,marginBottom:5,width:400}} searchName="排口名称" /></div>
          <div>
            <TreeStatus datalist={datalist} />
          </div>
          <div style={{ marginTop: 5 }}>
            <TreeCard
            style={{
                width: '400px',
                marginTop: 5,
                background:'#fff'
            }}
            pollutantTypeloading={pollutantTypeloading}
            getHeight={'calc(100vh - 260px)'} getStatusImg={this.getStatusImg} isloading={treedataloading} 
            getNowPollutantType={this.getNowPollutantType}
            treeCilck={this.treeCilck} treedatalist={datalist} PollutantType={2} 
            pollutantTypelist={pollutantTypelist}
            tabkey={this.state.pollutantTypeCode}
            />
            <TreeCardContent style={{overflow:'auto',width:400,background:'#fff'}}
             getHeight='calc(100vh - 290px)'
             pollutantTypeloading={pollutantTypeloading}
             getStatusImg={this.getStatusImg} isloading={treedataloading} 
            treeCilck={this.treeCilck} treedatalist={datalist} PollutantType={this.state.pollutantTypeCode} />
          </div>
        </div>);
    }else
    {
         if(detailloading)
         {
             return(<Spin
                style={{ width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center' }}
                size="large"
            />)
         }
         const pollutantInfoList=mainpoll.find(value=>{
            return value.pollutantCode==this.state.pollutantTypeCode;
         })
         return(
            <div style={{ marginLeft: 10, marginTop: 10,overflow:'auto' }}>
              <div>
                <TreeDetailStatus urge={this.urge} pointInfo={selectpoint} statusImg={statusImg} pdShow={this.pdShow} 
                detailtime={this.props.detailtime} stationClick={this.stationClick} backTreeList={this.backTreeList} 
                pointName={pointName} detailed={detailed}
               
                />
              </div>
              <div style={{ height: 'calc(100vh - 215px)' }} className={styles.detailInfo}>
              {pollutantInfoList.csyxl?<div style={{marginTop: 15}}>
                <TransmissionEfficiency selectdata={selectdata} />
              </div>:''}
              <div style={{marginTop: 15}}>
                <MapPollutantDetail
                 isloading={detailpollutantloading}
                detialTreeClick={this.detialTreeClick} detailpcol={detailpcol} 
                detaildata={detaildata} />
              </div>
              <div style={{marginTop: 15}}>
                <ChartData pollutantName={pollutantName} isloading={chartloading}
                 chartdata={chartdata} existdata={existdata} />
              </div>
            </div>
            </div>)
    }
  }
  //获取坐标集合
  getpolygon=(polygonChange)=>{
    let res=[];
    if(polygonChange)
    {
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
              />)
        }
    }
    return res;
}


   render() {
       const entInfo = this.props.entInfoModel ? this.props.entInfoModel[0] : '';
       const allcoo = entInfo ? eval(entInfo.coordinateSet) : '';
       const {chartloading, detailloading} = this.props;
       const {selectpoint}=this.state;
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
             mapStyle={'fresh'}
             amapkey={amapKey}
             plugins={plugins}
           >
               <UrgentDispatch
                    onCancel={this.onCancel}
                    visible={this.state.pdvisible}
                    operationUserID={selectpoint?selectpoint.operationUserID:null}
                    DGIMN={selectpoint?selectpoint.DGIMN:null}
                    pointName={selectpoint?selectpoint.pointName:null}
                    operationUserName={selectpoint?selectpoint.operationUserName:null}
                    operationtel={selectpoint?selectpoint.operationtel:null}
                    reloadData={()=>this.Refresh()}
                />
             <div style={{ width: 450,
                       height: 'calc(100vh - 90px)',
                       position: 'absolute',
                       top: 10,
                       left: 5,
                     //  background: 'rgba(255, 255, 255, 0.5)',
                       borderRadius: 10
                   }}
             >
               
            {this.getdetailed()}

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
                    this.getpolygon(allcoo)
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
           

              
           </Map>
         </div>

        );
    }
}
export default OverViewMap;
