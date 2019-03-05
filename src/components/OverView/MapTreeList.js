import React, { Component } from 'react';
import { Spin,Input,Tabs } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './MapTreeList.less';
import { mainpoll } from '../../config';
import {getPointStatusImg} from '../../utils/getStatusImg';
import PointTree from '../../components/OverView/TreeCardContent';


const Search = Input.Search;
const TabPane = Tabs.TabPane;
@connect(({ loading, overview }) => ({
    //点位数据信息
    datalist: overview.data,
    //污染物类型
    pollutantTypelist:overview.pollutantTypelist,
    //加载数据
    loading:loading.effects['overview/querydatalist'],
    //加载所有初始化显示的信息
    maploading:loading.effects['overview/queryentdetail'],

    //默认污染物类型
    pollutantTypeCode:overview.selectpollutantTypeCode
}))

class MapTreeList extends Component {
    constructor(props) {
        super(props);
        this.state={
            searchName:null
        };
    }


    //获取当期数据的时间
    getTimeImgSpan=()=>{
        const {datalist}=this.props;
        if(datalist && datalist[0]) {
            return (<div><img
                style={{width: 15, marginRight: 10, marginBottom: 4}}
                src="/treetime.png"
            />
                {datalist[0].MonitorTime}
            </div>
            );
        }
    }

      //树的点击事件
      treeCilck = (row) => {
          const { dispatch } = this.props;
          const pollutantInfoList=mainpoll.find(value=>value.pollutantCode==row.pollutantTypeCode);
          const defaultpollutantCode=pollutantInfoList.pollutantInfo[0].pollutantCode;
          const defaultpollutantName=pollutantInfoList.pollutantInfo[0].pollutantName;
          dispatch({
              type: 'overview/querydetailpollutant',
              payload: {
                  dataType: 'HourData',
                  dgimn: row.DGIMN,
                  pollutantTypeCode:row.pollutantTypeCode,
                  datatype: 'hour',
                  dgimn: row.DGIMN,
                  pollutantCodes: defaultpollutantCode,
                  pollutantName: defaultpollutantName,
                  endTime: moment(new Date()).format('YYYY-MM-DD HH:00:00'),
                  beginTime: moment(new Date()).add('hour', -23).format('YYYY-MM-DD HH:00:00'),
                  stop:row.stop
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
          });

          dispatch({
              type: 'overview/updateState',
              payload: {
                  selectpoint: row,
                  selectpollutantTypeCode:`${row.pollutantTypeCode}`
              },
          });
      };


      //当前选中的污染物类型
      getNowPollutantType=(key)=>{
          const {dispatch}=this.props;
          dispatch({
              type: 'overview/updateState',
              payload: {
                  selectpollutantTypeCode:`${key}`
              },
          });
          const {searchName}=this.state;
          this.reloadData(key,searchName);
      }

    //搜索框查询
    onSerach=(value)=>{
        const {dispatch}=this.props;
        dispatch({
            type: 'overview/updateState',
            payload: {
                searchName:value
            },
        });
        const {pollutantTypeCode}=this.props;
        this.reloadData(pollutantTypeCode,value);
    }

     //重新加载
     reloadData=(pollutantTypeCode,searchName)=>{
         this.props.dispatch({
             type: 'overview/querydatalist',
             payload: {
                 map: true,
                 pollutantTypes:pollutantTypeCode,
                 pointName:searchName
             },
         });
     }

     render() {
         const {maploading,pollutantTypeCode}=this.props;
  
         if(maploading) {
             return '';
         }
         return (
             <div style={{ marginLeft: 10, marginTop: 10 }}>
                 <div>
                     <Search
                         className={styles.search}
                         placeholder="请输入排口名称进行查询"
                         enterButton="查询"
                         size="large"
                         style={{width:400}}
                         onSearch={value => this.onSerach(value)}
                     />
                 </div>

                 <div style={{
                     width: 400,
                     height: 48,
                     background: '#fff',
                     marginTop:5
                 }}
                 >
                     <div className={styles.statuslist}>
                         <span><img style={{width:15}} src="/gisunline.png" />离线</span>
                         <span><img style={{width:15}} src="/gisnormal.png" />在线</span>
                         <span><img style={{width:15}} src="/gisover.png" />超标</span>
                         <span><img style={{width:15}} src="/gisexception.png" />异常</span>
                     </div>
                 </div>

                 <div>
                     <div className={styles.treelist} style={{ width: '400px',marginTop: 5,background:'#fff' }}>
                        <PointTree noselect={true} style={{ overflow: 'auto', width: 400, background: '#fff' }} getHeight='calc(100vh - 290px)' 
                           treeCilck={this.treeCilck} PollutantType={pollutantTypeCode}
                        />
                     </div>
                 </div>
             </div>
         );
     }
}

export default MapTreeList;