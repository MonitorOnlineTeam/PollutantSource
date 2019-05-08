import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon,Input,Spin } from 'antd';
import styles from './MapTreeList.less';
import entstyles from './EntTreeList.less';
import {getPointStatusImg} from '../../utils/getStatusImg';
import { EALREADY } from 'constants';
const Search = Input.Search;
@connect(({ loading,overview }) => ({
    entlist: overview.entlist,
    loading:loading.effects['overview/querygetentdatalist'],
}))
class EntTreeList extends Component {
    componentWillMount(){
       this.props.dispatch({
           type:'overview/querygetentdatalist',
           payload:{}
       })
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
    getEntTree=()=>{
       const {entlist,loading}=this.props;
       if(loading)
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
       let res=[];
       if(entlist && entlist.length !== 0)
       {
         entlist.map((item,key)=>{
            res.push(<div onClick={()=>this.entClick(item)} className={entstyles.miancard}>
                <div style={{float:'left',marginRight:10}}> <img style={{width:105,height:72}} src='../../../entwry.jpg'/> </div>
                <div className={entstyles.card}>
                <div><Icon className={entstyles.icon} type="bank" theme="twoTone" /><span>{item.entName}({item.count})</span></div>
                <div><span style={{color:'red'}}><Icon className={entstyles.icon} type="interation" theme="twoTone" />传输有效率: 80%</span>
                <span> <Icon  style={{marginLeft:5}} type="tool" theme="twoTone" /> 设备运转率: 90%</span></div>
                <div className={entstyles.statusImg}>
                     <span>{getPointStatusImg(1,null,1,12)}</span>正常: {item.onLine}
                     <span>{getPointStatusImg(0,null,1,12)}</span>离线: {item.offLine}
                     <span>{getPointStatusImg(2,null,1,12)}</span>超标: {item.over}
                     <span>{getPointStatusImg(3,null,1,12)}</span>异常: {item.exception}
                </div>
                </div>
            </div>)
        })
       }
       else
       {
          res = (<div style={{ textAlign: 'center', height: 70, background: '#fff' }}>暂无数据</div>);
       }
      return res;
    }

    onSerach=(value)=>{
        this.props.dispatch({
            type:'overview/querygetentdatalist',
            payload:{
                entName:value
            }
        })
    }
    render() {
        return (
            <div style={{ marginLeft: 10, marginTop: 10 }}>
                 <div>
                     <Search
                         className={styles.search}
                         placeholder="请输入企业名称进行查询"
                         enterButton="查询"
                         size="large"
                         style={{width:400}}
                         onSearch={this.onSerach}
                     />
                 </div>
                 <div>
                     <div className={styles.treelist} style={{ width: '400px',marginTop: 5,background:'#fff',height:'calc(100vh - 200px)' }}>
                            {this.getEntTree()}
                     </div>
                 </div>
            </div>
        );
    }
}

export default EntTreeList;