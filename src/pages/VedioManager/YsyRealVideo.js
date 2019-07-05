import React, { Component } from 'react';
import {
    Row,
    Col,
    Button,
    Card,
    Divider,
    Spin,
    DatePicker,
    message
} from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import styles from './video.less';
import MonitorContent from '../../components/MonitorContent/index';
import RealVideoData from '../../components/Video/RealVideoData';
import config from '../../config';


/*
页面：萤石云实时视频
描述：可以和数据、参数、报警等联动查看
add by xpy
*/

@connect(({videolist}) => ({
    ysyrealtimevideofullurl: videolist.ysyvideoListParameters.realtimevideofullurl,
}))
class YsyRealVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endOpen:false,
            startdateString: '',
            enddateString: '',
            startValue: null,
            endValue: null,
        };
    }

   componentWillMount = () => {
       this.getVideoIp();
   }

   getVideoIp=()=>{
       const {match,dispatch}=this.props;
       dispatch({
           type:'videolist/ysyvideourl',
           payload:{
               VedioCameraID:match.params.pointcode,
               type:'1',
           }
       });
   }

   /**回放 */
   backplay=()=>{
       if (this.state.startdateString !== "" && !this.state.enddateString !== "") {

           const {
               match,
               dispatch
           } = this.props;
           let begintime=this.state.startdateString;
           dispatch({
               type: 'videolist/ysyvideourl',
               payload: {
                   VedioCameraID: match.params.pointcode,
                   begintime: this.state.startdateString,
                   endtime: this.state.enddateString,
                   type:'2'
               }
           });
       } else {
           message.error("请选择时间间隔");
       }
   }


   btnClick=(opt)=>{
       let obj={"opt":opt};
       obj={"opt":opt};
       let frame = document.getElementById('ifm').contentWindow;
       frame.postMessage(obj,config.ysyrealtimevideourl);
   }

   /**时间控件 */
   disabledStartDate = (startValue) => {
       const {
           endValue
       } = this.state;
       if (!startValue || !endValue) {
           return false;
       }
       return startValue.valueOf() > endValue.valueOf();
   }

   onChange = (field, value) => {
       this.setState({
           [field]: value,
       });
   }

   disabledEndDate = (endValue) => {
       const {
           startValue
       } = this.state;
       if (!endValue || !startValue) {
           return false;
       }
       return endValue.valueOf() <= startValue.valueOf();
   }

   onStartChange = (value, dateString) => {
       this.onChange('startValue', value);
       this.setState({
           startdateString: dateString,
       });
   }

   onEndChange = (value, dateString) => {
       this.onChange('endValue', value);
       this.setState({
           enddateString: dateString,
       });
   }

   handleStartOpenChange = (open) => {
       if (!open) {
           this.setState({
               endOpen: true
           });
       }
   }

   handleEndOpenChange = (open) => {
       this.setState({
           endOpen: open
       });
   }

   render() {
       const {ysyrealtimevideofullurl}=this.props;
       const {endOpen}=this.state;
       if (!ysyrealtimevideofullurl) {
           return (<Spin
               style={{ width: '100%',
                   height: 'calc(100vh - 225px)',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center' }}
               size="large"
           />);
       }
       if(ysyrealtimevideofullurl==="nodata"){
           return (
               <table align="center" style={{ height: 'calc(100vh - 225px)',width: '100%' }}>
                   <tbody>
                       <tr>
                           <td align="center">
                            暂无视频配置
                           </td>
                       </tr>
                   </tbody>
               </table>
           );
       }
       return (
           <MonitorContent
               {...this.props}
               breadCrumbList={
                   [
                       { Name: '首页', Url: '/' },
                       { Name: '系统管理', Url: '' },
                       { Name: '视频', Url: '' }
                   ]
               }
           >
               <div style={{ height: 'calc(100vh - 180px)',width: '100%',margin:'20px 0px 20px 0px' }}>
                   <Row gutter={24} style={{ height: '100%' }}>
                       <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10, height: '100%' }}>
                           <iframe title="实时视频" id="ifm" src={ysyrealtimevideofullurl} frameBorder="0" width="100%" height="100%" />
                       </Col>
                       <Col xl={6} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10, height: '100%' }}>
                           <Card>
                               <Row>
                                   <Col className={styles.gutterleft} span={8}>
                                       <Button onClick={this.btnClick.bind(this,1)}>开始播放</Button>
                                   </Col>
                                   <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,2)}>结束播放</Button></Col>
                                   <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,3)}>抓图</Button></Col>
                               </Row>
                               <Divider type="horizontal" />
                               <Row>
                                   <Col className={styles.gutterleft} span={8}>
                                       <DatePicker
                                           style={
                                               {
                                                   width: 120
                                               }
                                           }
                                           disabledDate={
                                               this.disabledStartDate
                                           }
                                           format="YYYY-MM-DD"
                                           placeholder="开始日期"
                                           onChange={
                                               this.onStartChange
                                           }
                                           onOpenChange={
                                               this.handleStartOpenChange
                                           }
                                       />
                                   </Col>
                                   <Col className={styles.gutterleft} span={8}>
                                       <DatePicker
                                           style={
                                               {
                                                   width: 120
                                               }
                                           }
                                           disabledDate={
                                               this.disabledEndDate
                                           }
                                           format="YYYY-MM-DD"
                                           placeholder="结束日期"
                                           onChange={
                                               this.onEndChange
                                           }
                                           open={
                                               endOpen
                                           }
                                           onOpenChange={
                                               this.handleEndOpenChange
                                           }
                                       />
                                   </Col>

                                   <Col className={styles.gutterleft} span={8}><Button onClick={this.backplay.bind(this)}>回放</Button></Col>
                               </Row>
                           </Card>
                       </Col>
                   </Row>
               </div>
           </MonitorContent>
       );
   }
}
export default YsyRealVideo;