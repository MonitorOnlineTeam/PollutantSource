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


   render() {
       return (
           <div style={{ height: 'calc(100vh - 225px)',width: '100%' }}>
               <Row gutter={24} style={{ height: '50%' }}>
                   <Col span={24} style={{ marginBottom: 10, height: '100%' }}>
                       <iframe frameBorder="0" src="http://localhost:36999//Video/MonitorLinkCamera/RealtimeCameraReact?ip=172.16.23.147&port=80&userName=admin&userPwd=abc123456&cameraNo=1" width="100%" height="100%" />
                   </Col>
               </Row>
               <Row gutter={24} style={{ height: '50%' }}>
                   <Col xl={12} lg={24} sm={24} xs={24}>
                       <RealVideoData {...this.props} />
                   </Col>
                   <Col xl={12} lg={24} sm={24} xs={24}>
                       <Card title="设备参数实时信息" >
                           {/*  <Table size="small" borderd={true} columns={columns} dataSource={StateData} pagination={false} />  */}
                       </Card>
                   </Col>
               </Row>
           </div>
       );
   }
}
