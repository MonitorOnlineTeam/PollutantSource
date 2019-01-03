import React, { Component } from 'react';
import styles from './OverPointList.less';
import moment from 'moment';
import { DatePicker,Input,Button,Radio,Row, Col,Spin,Card } from 'antd';
import MonitorContent from '../../components/MonitorContent/index';
import {routerRedux} from 'dva/router';
import { connect } from 'dva';
import {summaryPolluntantCode} from '../../config';
const { RangePicker } = DatePicker;


@connect(({ loading,  analysisdata }) => ({
    overdatalist: analysisdata.overdatalist,
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
        this.props.dispatch({
            type: 'analysisdata/queryalloverdatalist',
            payload: {
                summaryPolluntantCode:summaryPolluntantCode
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
            this.props.dispatch({
                type: 'analysisdata/queryalloverdatalist',
                payload: {
                    beginTime:value[0],
                    endTime:value[1],
                    summaryPolluntantCode:summaryPolluntantCode
                }
            });    
        }
       
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

    // reloaddata=()=>{
    //     const {overDataMinValue,overDataMaxValue,overCountMinValue,overCountMaxValue}=this.state;
    //     this.props.dispatch({
    //         type: 'analysisdata/queryalloverdatalist',
    //         payload: {
    //             minoverdata:overDataMinValue,
    //             maxoverdata:overDataMaxValue,
    //             minovercount:overCountMinValue,
    //             maxovercount:overCountMaxValue
    //         }
    //     });    
    // }
   onDetail=(dgimn)=>{
    this.props.dispatch(routerRedux.push(`/pointdetail/${dgimn}/alarmrecord`));
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
       this.props.overdatalist?this.props.overdatalist.map((item) => {
           res.push(<Col key={item.pointName} span={8} >
            <div className={styles.cardcss}>
                <div className={styles.cardtitle}> 
                    <img style={{width: 20, marginRight: 10, marginBottom: 4}} src='../../../star.png' />  <span>{item.pointName}</span>
                    <span  className={styles.timetitle} > <img style={{width: 15, marginRight: 10, marginBottom: 4}} src="../../../treetime.png" />
                    <span> 最新超标时间：{item.lastTime} </span>
                    </span>
                </div>
                    <div className={styles.factormain}>
                    <div className={styles.factor}> 
                        <span style={{width:105}} className={styles.spancontent}>烟尘 : {item.zs01?item.zs01.Count:'-'}次</span>
                        <span style={{width:140}} className={styles.spancontent}>超标倍数 : {item.zs01?(item.zs01.MinMultiple+'-'+ item.zs01.MaxMultiple):'-'}</span>
                        <span className={styles.spancontent}>最新浓度 : {item.zs01?(item.zs01.lastValue):'-'}</span>
                        <div style={{clear:'both'}}></div>
                    </div>
                    <div className={styles.factor}> 
                    <span style={{width:105}} className={styles.spancontent}>二氧化硫 : {item.zs02?item.zs02.Count:'-'}次</span>
                        <span style={{width:140}} className={styles.spancontent}>超标倍数 : {item.zs02?(item.zs02.MinMultiple+'-'+ item.zs02.MaxMultiple):'-'}</span>
                        <span className={styles.spancontent}>最新浓度:{item.zs02?(item.zs02.lastValue):'-'}</span>
                        <div style={{clear:'both'}}></div>
                    </div>
                    <div className={styles.factorlast}> 
                    <span style={{width:105}} className={styles.spancontent}>氮氧化物 : {item.zs03?item.zs03.Count:'-'}次</span>
                        <span style={{width:140}} className={styles.spancontent}>超标倍数 : {item.zs03?(item.zs03.MinMultiple+'-'+ item.zs03.MaxMultiple):'-'}</span>
                        <span className={styles.spancontent}>最新浓度 : {item.zs03?(item.zs03.lastValue):'-'}</span>
                        <div style={{clear:'both'}}></div>
                    </div></div>
                    <div onClick={()=>this.onDetail(item.DGIMN)} className={styles.detail}>
                        <span>查看详情</span>
                    </div>
            </div>
            </Col>)
          }):'';
        return res;
    }
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
                
                  <RangePicker
                     style={{width: 250,marginLeft:40,textAlgin:'left'}}
                     format="YYYY-MM"
                     value={rangeDate}
                     mode={mode}
                     onPanelChange={this.handlePanelChange}
                 />
                         {/* <span className={styles.overM}> <span className={styles.searchname}>超标次数</span>
                            <Input onChange={this.overCountMinChange} style={{width: 50}} />- <Input onChange={this.overCountMaxChange} style={{width: 50}} />
                        </span>
                        <span className={styles.overM}><span className={styles.searchname}>超标倍数</span>
                            <Input onChange={this.overDataMinChange } style={{width: 50}} />- <Input onChange={this.overDataMaxChange} style={{width: 50}} />
                        </span>
                        <Button onClick={this.reloaddata}  className={styles.searchbutton}>查询</Button>
                        <Radio.Group className={styles.radiocss}  defaultValue="a" buttonStyle="solid">
                            <Radio.Button value="a">严重程度</Radio.Button>
                            <Radio.Button value="b">超标时间</Radio.Button>
                        </Radio.Group> */}
                        </div>
                }
            > 
             <div>{this.loaddata()}</div>
            </Card>
            </MonitorContent>
        );
    }
}

export default OverPointList;
