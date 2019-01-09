import React, { Component } from 'react';
import PDF from 'react-pdf-js';
import styles from './MonitoringReport.less';
import {
    Card,
    Radio,
    DatePicker,
    Spin
} from 'antd';
import moment from 'moment';
import {routerRedux} from 'dva/router';
import MonitorContent from '../../components/MonitorContent/index';
import { connect } from 'dva';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import {imgaddress} from '../../config';

const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

@connect(({ loading,  analysisdata }) => ({
    reportlist: analysisdata.reportlist,
    loading:loading.effects['analysisdata/queryreportlist'],
}))
class MonitoringReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: ['year', 'year'],
            rangeDate: [moment(new Date()).add(-1, 'year'), moment(new Date())],
            radiovalue:'year',
            format:'YYYY',
            reportname:null,
            numPages: null,
            pageNumber: 1,
            isfirst:true
        };
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'analysisdata/queryreportlist',
            payload: {
                beginTime:this.state.rangeDate[0],
                endTime:this.state.rangeDate[1]
            }
        });
    }
    handlePanelChange = (value, mode) => {
        if(value)
        {
            this.setState({
                rangeDate: value,
            });
        }
    }
    radioChange=(value)=>{
        const radiovalue=value.target.value;
        let format;
        let mode;
        switch(radiovalue)
        {
             case 1:
             format='YYYY';
             mode= ['year', 'year']
               break;
             case 2:
             format='YYYY-MM';
             mode= ['month', 'month']
               break;
             case 3:
             format='YYYY-MM';
             mode= ['month', 'month']
              break;
        }
        this.setState(
            {
                radiovalue,
                format,
                mode,
                isfirst:true
            }
        )
    }
 
    showPdf=(reportname)=>{
        this.setState({
            reportname,
            isfirst:false
        });
    }
    getshowpdf=()=>{
        let {isfirst,reportname,radiovalue}=this.state;
        const {reportlist}=this.props;
        if(isfirst)
        {
            if(reportlist)
            {
                switch(radiovalue){
                    case 'year':
                    if(reportlist.yearlist)
                    reportname=reportlist.yearlist[0];
                    break;
                    case 'season':
                    if(reportlist.seasonlist)
                    reportname=reportlist.seasonlist[0];
                    break;
                    case 'month':
                    if(reportlist.monthlist)
                    reportname=reportlist.monthlist[0];
                    break;
                    default:
                    reportname=null;
                    break;
                }
            }
        } 

       
        let address=imgaddress+reportname;
        let height='calc(100vh - 300px)'
        if(!reportname)
        {
              address=null;
              height=70;
        }
      
            return (
                <div>
                <iframe className={styles.if} style={{border:0,width:"100%",height:height}} src={address}/>
               { address?<div></div>:<div style={{textAlign:'center'}}>暂无数据</div>}
                </div>
            )
      
    }

    getreportlist=()=>{
        const list=this.props.reportlist;
        const type=this.state.radiovalue;
        let res=[];
        if(list)
        {  
            if(type=="year" && list.yearlist)
            {
               
                list.yearlist.map((item,key)=>{
                    res.push( <div key={key} onClick={()=>this.showPdf(item)} className={styles.reportdiv}>
                        <li><img className={styles.reportimg} src='/report.png' /></li>
                        <li className={styles.reportcontent}>{item}</li>
                    </div>)
                })
            }
            else if(type=="season" && list.seasonlist)
            {
                list.seasonlist.map(item=>{
                    res.push( <div key={key} onClick={()=>this.showPdf(item)} className={styles.reportdiv}>
                        <li><img className={styles.reportimg} src='/report.png' /></li>
                        <li className={styles.reportcontent}>{item}</li>
                    </div>)
                })
            }
            else if(type=="month" && list.monthlist)
            {
                list.monthlist.map(item=>{
                    res.push( <div key={key} onClick={()=>this.showPdf(item)} className={styles.reportdiv}>
                        <li><img className={styles.reportimg} src='/report.png' /></li>
                        <li className={styles.reportcontent}>{item}</li>
                    </div>)
                })
            }
        }
        return res;
    }

    render() {
     
        const { rangeDate, mode,radiovalue,format } = this.state;
        const {loading,children}=this.props;
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
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    {Name:'首页', Url:'/'},
                    {Name:'智能分析',Url:''},
                    {Name:'自行监测年度报告',Url:''}
                ]
            }>
            <div className={styles.cardTitle} >
            <Card
                title="自行监测年度报告"
                extra={
                    <div>
                   <span>报表类型：</span><RadioGroup value={radiovalue} onChange={this.radioChange}>
                    <Radio  value="year">年报</Radio>
                    <Radio value="season">季报</Radio>
                    <Radio value="month">月报</Radio>
                  </RadioGroup>
                  <RangePicker
                     style={{width: 250,marginLeft:40,textAlign:'center'}}
                     format={format}
                     value={rangeDate}
                     mode={mode}
                     onPanelChange={this.handlePanelChange}
                 />

                  </div>
                }
            > 
             <div style={{marginLeft:10}}>{this.getreportlist()}</div> 

             <div>
                 {
                     this.getshowpdf()
                    // children
                 }
            </div>
            </Card>
        </div>
        </MonitorContent>
        );
    }
}

export default MonitoringReport;