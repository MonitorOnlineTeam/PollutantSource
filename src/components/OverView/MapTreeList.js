import React, { Component } from 'react';
import { Spin,Input,Tabs } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './MapTreeList.less';
import { mainpoll } from '../../config';

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


    //填充污染物类型
    getPollutantDoc = () => {
        const { pollutantTypelist } = this.props;
        let res = [];
        if (pollutantTypelist) {
            pollutantTypelist.map((item,key) => {
                res.push(<TabPane key={key} tab={item.pollutantTypeName} key={item.pollutantTypeCode}>
                    {/* <TreeCardContent /> */}
                         </TabPane>);
            });
        }
        return res;
    }

    //获取状态图片
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

    //组装搜索树的数据
    getTreeDatalist = () => {
        const { loading,datalist } = this.props;
        let res = [];
        let pollutantTypeCode=this.props.pollutantTypeCode;
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
        if (datalist) {
            datalist.map((item, key) => {
                let treecardcss = styles.cardDiv;
                if (item.pollutantTypeCode === parseInt(pollutantTypeCode)) {
                    if (this.props.ifSelect) {
                        if (item.DGIMN === localStorage.getItem('DGIMN')) {
                            treecardcss = styles.cardDivClick;
                        }
                    }
                    res.push(<div key={key}
                        onClick={() => {
                            this.treeCilck(item, key);
                        }}
                        className={treecardcss}
                    >
                        <div key={key+'1'} className={styles.cardtopspan}>
                            <span className={styles.statusimg}>
                                {this.getStatusImg(item.status)}
                            </span>
                            <span className={styles.pointName}>
                                {item.pointName}
                            </span><span className={styles.pollutantType}>
                                类型：{item.pollutantType ? item.pollutantType : '废气'}
                            </span>
                        </div>
                        <div key={key+'2'} className={styles.cardbottomspan}><span className={styles.tsdiv}>
                            传输有效率 {item.transmissionEffectiveRate}
                        </span>
                            {
                            item.scene ? <span className={styles.operation}>运维中</span> : ''
                        }
                            {
                            item.warning ? <span className={styles.warning}>预警中</span> : ''
                        }
                            {
                            item.fault ? <span className={styles.fault}>故障中</span> : ''
                        }
                            {
                            item.status == 4 ? <span className={styles.stop}>停产中</span> : ''
                        }
                        </div>
                    </div>);
                }
            });
        } else {
            res = (<div style={{ textAlign: 'center', height: 70, background: '#fff' }}>暂无数据</div>);
        }
        return res;
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
                  endTime: moment(new Date()).add('hour', -1).format('YYYY-MM-DD HH:00:00'),
                  beginTime: moment(new Date()).add('hour', -24).format('YYYY-MM-DD HH:00:00'),
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
        this.setState({
            searchName:value
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
         console.log(pollutantTypeCode);
         if(maploading) {
             // return(<Spin
             //     style={{ width: '100%',
             //         height: 'calc(100vh/2)',
             //         display: 'flex',
             //         alignItems: 'center',
             //         justifyContent: 'center' }}
             //     size="large"
             // />)
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
                     height: 75,
                     background: '#fff',
                     marginTop:10
                 }}
                 >
                     <div className={styles.statuslist}>
                         <span><img style={{width:15}} src="/gisunline.png" />离线</span>
                         <span><img style={{width:15}} src="/gisnormal.png" />在线</span>
                         <span><img style={{width:15}} src="/gisover.png" />超标</span>
                         <span><img style={{width:15}} src="/gisexception.png" />异常</span>
                     </div>
                     <div style={{borderBottom: '1px solid #EBEBEB'}} />
                     <div style={{marginLeft: 120, marginTop: 3}}>
                         {this.getTimeImgSpan()}
                     </div>
                 </div>

                 <div>
                     <div className={styles.treelist} style={{ width: '400px',marginTop: 5,background:'#fff' }}>
                         <Tabs className={styles.tab} defaultActiveKey={pollutantTypeCode} onChange={this.getNowPollutantType}>
                             {this.getPollutantDoc()}
                         </Tabs>
                         <div style={{ overflow:'auto',width:400,background:'#fff', height:'calc(100vh - 290px)' }}>
                             {this.getTreeDatalist()}
                         </div>
                     </div>
                 </div>
             </div>
         );
     }
}

export default MapTreeList;