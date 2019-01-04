import React, { Component } from 'react';
import {Row, Col, Button, List, Table, Card, Select, Divider, Message} from 'antd';
import styles from './video.less';
import { connect } from 'dva';
import moment from 'moment';
import RealVideoData from '../../components/Video/RealVideoData';


const Option = Select.Option;

@connect(({loading, videolist}) => ({
    ...loading,
    list: videolist.list,
    total: videolist.total,
    pageSize: videolist.pageSize,
    pageIndex: videolist.pageIndex,
    requstresult: videolist.requstresult,
}))
/*
页面：4、实时视频
描述：可以和数据、参数、报警等联动查看
add by cg 18.12.17
*/

export default class RealVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

   componentWillMount = () => { }

   btnClick=(opt)=>{
        let obj={"opt":opt};
        obj={"opt":opt};
        let frame = document.getElementById('ifm').contentWindow;
        frame.postMessage(obj,'http://localhost:36999');
    }

   render() {
       return (
           <div style={{ height: 'calc(100vh - 225px)',width: '100%' }}>
               <Row gutter={24} style={{ height: '65%' }}>
                   <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10, height: '100%' }}>
                        <iframe id="ifm" frameBorder="0" src="http://localhost:36999//Video/MonitorLinkCamera/RealtimeCameraReact?ip=172.16.23.147&port=80&userName=admin&userPwd=abc123456&cameraNo=1" width="100%" height="100%" />
                    </Col>
                    <Col xl={6} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10, height: '100%' }}>
                        <Card className={styles.hisYunStyle}>
                            <Row>
                                <Col span={24}>
                                    <Button icon="caret-right" onClick={this.btnClick.bind(this,10)}>抓图</Button>
                                </Col>
                            </Row>
                            <Divider type="horizontal" />
                            <Row>
                                <Col span={24}>
                                    <Row>
                                        <Col className={styles.gutterleft} span={8}><Button icon="caret-right" onClick={this.btnClick.bind(this,5)}>左上</Button></Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="up-square-o" onClick={this.btnClick.bind(this,1)}>上</Button></Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="caret-right" onClick={this.btnClick.bind(this,7)}>右上</Button></Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col className={styles.gutterleft} span={8}><Button icon="caret-right" onClick={this.btnClick.bind(this,3)}>左</Button></Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="up-square-o" onClick={this.btnClick.bind(this,9)}>自动</Button></Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="caret-right" onClick={this.btnClick.bind(this,4)}>右</Button></Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col className={styles.gutterleft} span={8}><Button icon="caret-right" onClick={this.btnClick.bind(this,6)}>左下</Button></Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="up-square-o" onClick={this.btnClick.bind(this,2)}>下</Button></Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="caret-right" onClick={this.btnClick.bind(this,8)}>右下</Button></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Divider type="horizontal" />
                            <Row>
                                <Col span={24}>
                                    <Row>
                                        <Col className={styles.gutterleft} span={8}><Button icon="fast-backward" onMouseDown={this.btnClick.bind(this,11)} onMouseUp={this.btnClick.bind(this,12)}> + </Button></Col>
                                        <Col className={styles.gutterleft} span={8}>变倍</Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="caret-right"  onMouseDown={this.btnClick.bind(this,13)} onMouseUp={this.btnClick.bind(this,12)}> + </Button></Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col className={styles.gutterleft} span={8}><Button icon="fast-backward" onMouseDown={this.btnClick.bind(this,15)} onMouseUp={this.btnClick.bind(this,16)}> + </Button></Col>
                                        <Col className={styles.gutterleft} span={8}>变焦</Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="caret-right"  onMouseDown={this.btnClick.bind(this,17)} onMouseUp={this.btnClick.bind(this,16)}> + </Button></Col>
                                    </Row>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col className={styles.gutterleft} span={8}><Button icon="fast-backward" onMouseDown={this.btnClick.bind(this,18)} onMouseUp={this.btnClick.bind(this,19)}> + </Button></Col>
                                        <Col className={styles.gutterleft} span={8}>光圈</Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="caret-right"  onMouseDown={this.btnClick.bind(this,20)} onMouseUp={this.btnClick.bind(this,19)}> + </Button></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
               </Row>
               <Row gutter={24} style={{ height: '20%' }}>
                   <Col span={24}>
                       <RealVideoData {...this.props} />
                   </Col>
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
