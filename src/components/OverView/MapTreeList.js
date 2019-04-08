import React, { Component } from 'react';
import { Spin,Input,Tabs, Badge } from 'antd';
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
    selectpollutantTypeCode:overview.selectpollutantTypeCode,
    //数据一览后台参数
    dataOverview:overview.dataOverview,
    mapdetailParams:overview.mapdetailParams,

}))
class MapTreeList extends Component {
    constructor(props) {
        super(props);
    }

    // componentWillMount(){
    //     this.props.dispatch({

    //     })
    // }
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
          const { dispatch,mapdetailParams,selectpollutantTypeCode } = this.props;
          const pollutantInfoList=mainpoll.find(value=>value.pollutantCode==selectpollutantTypeCode || row.pollutantTypeCode);
          const defaultpollutantCode=pollutantInfoList.pollutantInfo[0].pollutantCode;
          const defaultpollutantName=pollutantInfoList.pollutantInfo[0].pollutantName;
          dispatch({
            type:'overview/updateState',
            payload:{
                    selectpoint:row,
                    // selectpollutantTypeCode:`${row.pollutantTypeCode}`,
                    mapdetailParams:{
                        ...mapdetailParams,
                        pollutantCode:defaultpollutantCode,
                        pollutantName:defaultpollutantName
                    }
            }
          })
          this.setState({
            visible: true,
            pointName:row.pointName,
            position: {
                latitude: row.latitude,
                longitude: row.longitude,
            },
          });
      };

    //搜索框查询
    onSerach=(value)=>{
        const {dispatch,dataOverview}=this.props;
        dataOverview.pointName=value;
        this.reloadData(dataOverview);
    }

     //重新加载
     reloadData=(dataOverview)=>{
         const {dispatch}=this.props;
         dispatch({
            type:'overview/updateState',
            payload:{
                dataOverview:dataOverview
            }
         })
         this.props.dispatch({
             type: 'overview/querydatalist',
             payload: {
                 map: true,
             },
         });
     }
     render() {
         const {maploading,selectpollutantTypeCode}=this.props;
         if(maploading) {
             return '';
         }
         return (
             <div style={{ marginLeft: 10, marginTop: 10 }}>
                 <div>
                     <Search
                         className={styles.search}
                         placeholder="请输入监测点名称进行查询"
                         enterButton="查询"
                         size="large"
                         style={{width:400}}
                         onSearch={value => this.onSerach(value)}
                     />
                 </div>

                 <div className={styles.statuslistContainer}
                 >
                    <Badge status="default" text="离线" />
                    <Badge status="success" text="在线" />
                    <Badge status="error" text="超标" />
                    <Badge status="warning" text="异常" />
                 </div>

                 <div>
                     <div className={styles.treelist} style={{ width: '400px',marginTop: 5,background:'#fff' }}>
                        <PointTree noselect={true} style={{ overflow: 'auto', width: 400, background: '#fff' }} getHeight='calc(100vh - 200px)'
                           treeCilck={this.treeCilck} PollutantType={selectpollutantTypeCode}
                        />
                     </div>
                 </div>
             </div>
         );
     }
}

export default MapTreeList;
