import React, { Component } from 'react';
import {Row, Col, Button, Card, Divider,Spin} from 'antd';
import { connect } from 'dva';
import styles from './video.less';
import RealVideoData from '../../components/Video/RealVideoData';
import config from '../../config';

/*
页面：4、实时视频
描述：可以和数据、参数、报警等联动查看
add by cg 18.12.17
*/

@connect(({videolist}) => ({
    realtimevideofullurl:videolist.videoListParameters.realtimevideofullurl,
}))
class RealVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

   componentWillMount = () => {
       this.getVideoIp();
   }

   getVideoIp=()=>{
       const {match,dispatch}=this.props;
       dispatch({
           type:'videolist/fetchuserlist',
           payload:{ DGIMN: match.params.pointcode }
       });
   }

   btnClick=(opt)=>{
       let obj={"opt":opt};
       obj={"opt":opt};
       let frame = document.getElementById('ifm').contentWindow;
       frame.postMessage(obj,config.realtimevideourl);
   }

   render() {
       const {realtimevideofullurl}=this.props;
       console.log(realtimevideofullurl)
       debugger
       if(!realtimevideofullurl){
           return (<Spin
               style={{ width: '100%',
                   height: 'calc(100vh - 225px)',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center' }}
               size="large"
           />);
       }
       if(realtimevideofullurl==="nodata"){
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
           <div style={{ height: 'calc(100vh - 225px)',width: '100%' }}>
               <Row gutter={24} style={{ height: '65%' }}>
                   <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10, height: '100%' }}>
                       <iframe title="实时视频" id="ifm" src={realtimevideofullurl} frameBorder="0" width="100%" height="100%" />
                   </Col>
                   <Col xl={6} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10, height: '100%' }}>
                       <Card className={styles.hisYunStyle}>
                           <Row>
                               <Col span={24}>
                                   <Button onClick={this.btnClick.bind(this,10)}>抓图</Button>
                               </Col>
                           </Row>
                           <Divider type="horizontal" />
                           <Row>
                               <Col span={24}>
                                   <Row>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,5)}>左上</Button></Col>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,1)}>&nbsp;&nbsp;上&nbsp;&nbsp;</Button></Col>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,7)}>右上</Button></Col>
                                   </Row>
                                   <Row style={{marginTop:'10px'}}>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,3)}>&nbsp;&nbsp;左&nbsp;&nbsp;</Button></Col>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,9)}>自动</Button></Col>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,4)}>&nbsp;&nbsp;右&nbsp;&nbsp;</Button></Col>
                                   </Row>
                                   <Row style={{marginTop:'10px'}}>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,6)}>左下</Button></Col>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,2)}>&nbsp;&nbsp;下&nbsp;&nbsp;</Button></Col>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,8)}>右下</Button></Col>
                                   </Row>
                               </Col>
                           </Row>
                           <Divider type="horizontal" />
                           <Row>
                               <Col span={24}>
                                   <Row>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,11)}>&nbsp;&nbsp;+&nbsp;&nbsp;</Button></Col>
                                       <Col className={styles.gutterleft} span={8}>变倍</Col>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,12)}>&nbsp;&nbsp;-&nbsp;&nbsp;</Button></Col>
                                   </Row>
                                   <Row style={{marginTop:'10px'}}>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,15)}>&nbsp;&nbsp;+&nbsp;&nbsp;</Button></Col>
                                       <Col className={styles.gutterleft} span={8}>变焦</Col>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,16)}>&nbsp;&nbsp;-&nbsp;&nbsp;</Button></Col>
                                   </Row>
                                   <Row style={{marginTop:'10px'}}>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,19)}>&nbsp;&nbsp;+&nbsp;&nbsp;</Button></Col>
                                       <Col className={styles.gutterleft} span={8}>光圈</Col>
                                       <Col className={styles.gutterleft} span={8}><Button onClick={this.btnClick.bind(this,20)}>&nbsp;&nbsp;-&nbsp;&nbsp;</Button></Col>
                                   </Row>
                               </Col>
                           </Row>
                       </Card>
                   </Col>
               </Row>
               <Row gutter={24} style={{ height: '20%' }}>
                   <RealVideoData {...this.props} />
                   {
                       /* <Col xl={12} lg={24} sm={24} xs={24}>
                       <Card title="设备参数实时信息" >
                           {  <Table size="small" borderd={true} columns={columns} dataSource={StateData} pagination={false} />  }
                       </Card>
                   </Col>*/
                   }
               </Row>
           </div>
       );
   }
}
export default RealVideo;