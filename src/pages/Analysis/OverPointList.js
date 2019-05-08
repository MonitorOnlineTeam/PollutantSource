import React, { Component } from 'react';
import styles from './OverPointList.less';
import moment from 'moment';
import { DatePicker,Input,Button,Radio,Row, Col,Spin,Card } from 'antd';
import MonitorContent from '../../components/MonitorContent/index';
import {routerRedux} from 'dva/router';
import { connect } from 'dva';
import AlarmRecordModal from '../../components/GlobalHeader/AlarmRecordModal';
import {onlyOneEnt} from '../../config';
const { RangePicker } = DatePicker;
const Serach = Input.Search;

@connect(({ loading,  analysisdata }) => ({
    overdatalist: analysisdata.overdatalist,
    overdataParameters:analysisdata.overdataParameters,
    loading:loading.effects['analysisdata/queryalloverdatalist'],
}))

class OverPointList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: ['month', 'month'],
            rangeDate: [moment(new Date()).add(-1, 'month'), moment(new Date())],
        };
    }
    componentDidMount() {
        const {dispatch}=this.props;
        dispatch({
            type: 'analysisdata/queryalloverdatalist',
            payload: {
            }
        });
    }
    handlePanelChange = (value, mode) => {
        if(value)
        {
            this.setState({
                rangeDate: value,
                mode: [
                    mode[0] === 'date' ? 'month' : mode[0],
                    mode[1] === 'date' ? 'month' : mode[1],
                ],
            });
            let {overdataParameters}=this.props;
            overdataParameters={
                ...overdataParameters,
                begintime:value[0],
                endtime:value[1]
            }
            this.reloaddata(overdataParameters);
        }
    }

    //刷新数据
    reloaddata=(overdataParameters)=>{
        const {dispatch}=this.props;
        dispatch({
            type:'analysisdata/updateState',
            payload:{
                overdataParameters:overdataParameters
            }
        })
        dispatch({
            type: 'analysisdata/queryalloverdatalist',
            payload: {
            }
        });    
    }

    //最小超标倍数
    overDataMinChange=(e)=>{
        this.setState({
            overDataMinValue:e.target.value
        })
    }
    //最大超标倍数
    overDataMaxChange=(e)=>{
        this.setState({
            overDataMaxValue:e.target.value
        })
    }
    //最小超标次数
    overCountMinChange=(e)=>{
        this.setState({
            overCountMinValue:e.target.value
        })
    }
    //最大超标次数
    overCountMaxChange=(e)=>{
        this.setState({
            overCountMaxValue:e.target.value
        })
    }

   onDetail=(dgimn,pointName)=>{
       const {rangeDate}=this.state;
    this.childAlarm.showModal(rangeDate[0], rangeDate[1], dgimn, pointName)
   }

    onRefAlarm = (ref) => {
        this.childAlarm = ref;
    }

   loaddata=()=>{
       if(this.props.loading)
       {
        return (<Spin
            style={{ width: '100%',
                height: 'calc(100vh/2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center' }}
            size="large"
        />);
       }
       else{
       let res=[];
       const {overdatalist}=this.props;
       if(overdatalist)
       {
            overdatalist.map(item=>{
                const zs01p=item.pollutantList.find(value=>{
                    return value.pollutantCode=="zs01"; 
                })
                const zs02p=item.pollutantList.find(value=>{
                    return  value.pollutantCode=="zs02";
                })
                const zs03p=item.pollutantList.find(value=>{
                    return  value.pollutantCode=="zs03";
                })
                if( zs01p || zs02p || zs03p )
                {
                    res.push(
                    <Col key={item.pointName} span={8} >
                    <div className={styles.cardcss}>
                        <div className={styles.cardtitle}> 
                            <img style={{width: 20, marginRight: 10, marginBottom: 4}} src='/star.png' />  <span>{onlyOneEnt?"":item.abbreviation+"-"}{item.pointName}</span>
                            <span  className={styles.timetitle} > <img style={{width: 15, marginRight: 10, marginBottom: 4}} src="/treetime.png" />
                            <span> 最新超标时间：{item.lastTime} </span>
                            </span>
                        </div>
                            <div className={styles.factormain}>
                            <div className={styles.factor}> 
                                <span style={{width:105}} className={styles.spancontent}>烟尘 : {zs01p?zs01p.Count:'-'}次</span>
                                <span style={{width:180}} className={styles.spancontent}>超标倍数 : {zs01p?(zs01p.MinMultiple+'-'+ zs01p.MaxMultiple):'-'}</span>
                                <span className={styles.spancontent}>最新浓度 : {zs01p?(zs01p.lastValue):'-'}</span>
                                <div style={{clear:'both'}}></div>
                            </div>
                            <div className={styles.factor}> 
                            <span style={{width:105}} className={styles.spancontent}>二氧化硫 : {zs02p?zs02p.Count:'-'}次</span>
                                <span style={{width:180}} className={styles.spancontent}>超标倍数 : {zs02p?(zs02p.MinMultiple+'-'+ zs02p.MaxMultiple):'-'}</span>
                                <span className={styles.spancontent}>最新浓度:{zs02p?(zs02p.lastValue):'-'}</span>
                                <div style={{clear:'both'}}></div>
                            </div>
                            <div className={styles.factorlast}> 
                            <span style={{width:105}} className={styles.spancontent}>氮氧化物 : {zs03p?zs03p.Count:'-'}次</span>
                                <span style={{width:180}} className={styles.spancontent}>超标倍数 : {zs03p?(zs03p.MinMultiple+'-'+ zs03p.MaxMultiple):'-'}</span>
                                <span className={styles.spancontent}>最新浓度 : {zs03p?(zs03p.lastValue):'-'}</span>
                                <div style={{clear:'both'}}></div>
                            </div></div>
                            <div onClick={()=>this.onDetail(item.DGIMN,item.pointName)} className={styles.detail}>
                                <span>查看详情</span>
                            </div>
                    </div>
                    </Col>  )
                }
            })
       }
       if(!res || res.length==0)
       {
           res=<div style={{textAlign:"center"}}>暂无数据</div>
       }
        return res;
    }
   }

   OnSerach=(value)=>{
       let {overdataParameters}=this.props;
       overdataParameters={
           ...overdataParameters,
           entName:value
       }
       this.reloaddata(overdataParameters);
   }

    render() {
        const { rangeDate, mode } = this.state;
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    {Name:'首页',Url:'/'},  
                    {Name:'智能分析',Url:''},
                    {Name:'超标排口分析',Url:''}  
                ]
            }>

             <Card
                title="超标排口分析"
                extra={
                    <div>
                
                  <Serach
                  placeholder="请输入企业名称进行搜索"
                  onSearch={this.OnSerach}
                  style={{width:300}}/>
                  <RangePicker
                     style={{width: 250,marginLeft:40,textAlgin:'left'}}
                     format="YYYY-MM"
                     value={rangeDate}
                     mode={mode}
                     onPanelChange={this.handlePanelChange}
                 />
                        </div>
                }
            > 
             <div>{this.loaddata()}</div>
            </Card>
            <AlarmRecordModal  {...this.props} onRef={this.onRefAlarm} />
            </MonitorContent>
        );
    }
}

export default OverPointList;
