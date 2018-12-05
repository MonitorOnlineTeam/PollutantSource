import React, { Component } from 'react';
// import Answersheet from '../../components/Video/webVideoCtrl';
import {Row, Col, Button, List, Table, Card, Select, Divider, Message} from 'antd';
import MonitorData from '../../mockdata/PointDetail/VideoMonitorData.json';
import StateData from '../../mockdata/PointDetail/StateData.json';
import styles from './video.less';
import { connect } from 'dva';
import moment from 'moment';
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
add by myt 18.7.9
*/

export default class RealVideo extends Component {
    componentWillMount() {
        this.onChange();
        // this.OnloadVideo();
        // this.clickLogin();
    };
    onChange = () => {
        this.props.dispatch({
            type: 'videolist/fetchuserlist',
            payload: {
                DGIMN: 'sgjt001003',
            },
        });
    }

    //      OnloadVideo=() => {
    //          debugger
    //          // 全局保存当前选中窗口
    //          var g_iWndIndex = 0; // 可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
    //          var message = 'failed';
    //          var messagess = 'failed';
    //          var vwidth; // 视频画面宽度
    //          var vheight; // 视频画面高度
    //          // 检查插件是否已经安装过
    //          if (Answersheet.I_CheckPluginInstall() === -1) {
    //              Message.error('您还未安装过插件，请在IE浏览器下，点击确定下载安装！');
    //              window.location.href = 'D:/lepingshipin/WebComponents.exe';
    //              return;
    //          }
    //          // 初始化插件参数及插入插件
    //          Answersheet.I_InitPlugin(vwidth, vheight, {
    //              iWndowType: 1,
    //              cbSelWnd: function(xmlDoc) {
    //                  g_iWndIndex = 0;
    //              }
    //          });
    //          Answersheet.I_InsertOBJECTPlugin('divPlugin');

    //          // 检查插件是否最新
    //          if (Answersheet.I_CheckPluginVersion() === -1) {
    //              Message.error('检测到新的插件版本，点击确定下载升级！');
    //              window.location.href = 'D:/lepingshipin/WebComponents.exe';
    //              return;
    //          }

    //          // 窗口事件绑定
    //          window.bind({
    //              resize: function() {
    //                  var $Restart = document.getElementById('restartDiv');
    //                  if ($Restart.length > 0) {
    //                      var clientWidth = document.body.clientWidth;
    //                      var clientHeight = document.body.clientHeight;
    //                      $Restart.css({
    //                          width: clientWidth.width + 'px',
    //                          height: clientHeight.height + 'px'
    //                      });
    //                  }
    //              }
    //          });
    //      }
    //      // 登录
    //  clickLogin=() => {
    //      ;
    //      var message = 'failed';
    //      var szIP = '223.84.240.165';
    //      var szPort = '1001';
    //      var szUsername = 'admin';
    //      var szPassword = 'admin123';

    //      if (szIP === '' || szPort === '') {
    //          message = "{ 'flag': 'false', 'message': 'IP或端口不能为空！' }";
    //          return Message.error(message);
    //      }

    //      var iRet = Answersheet.I_Login(szIP, 1, szPort, szUsername, szPassword, {
    //          success: function(xmlDoc) {
    //              message = "{ 'flag': true, 'message':' 登录成功！监控视频连接中...' }";
    //          },
    //          error: function() {
    //              message = "{ 'flag': false, 'message':' 登录失败！' }";
    //          }
    //      });

    //      if (iRet === -1) {
    //          message = "{ 'flag': true, 'message':' 已登录过！视频连接中...' }";
    //      }

    //      if (iRet === undefined) {
    //          message = "{ 'flag': true, 'message':' 登录中...' }";
    //      }

    //      return message;
    //  }

    render() {
        console.log(this.props.list);
        const columns = [{
            title: '参数',
            dataIndex: 'Para',
            width: 50,
        }, {
            title: '值',
            dataIndex: 'Val',
            width: 50,
        }];
        const data = this.props.list;
        return (
            <div>
                <Row gutter={24}>
                    <Col span={17} style={{ marginBottom: 10, height: 480 }}>
                        <div className={styles.videoComponent} id="restartDiv" />
                    </Col>
                    <Col span={7} >
                        <Card>
                            <Row>
                                <Col span={16}>
                                    <Select defaultValue="摄像头1号" style={{ width: 150 }}>
                                        {data.map(item => <Option key={item.VedioDevice_ID}>{item.VedioCamera_Name}</Option>)}
                                    </Select>
                                </Col>
                                <Col span={8} ><Button icon="picture">抓图</Button></Col>
                            </Row>
                            <Card style={{marginTop: 15}}>
                                <Row>
                                    <Col span={24} >
                                        <Row>
                                            <Col className={styles.gutterleft} span={8} ><Button> 左上</Button></Col>
                                            <Col className={styles.gutterleft} span={8} ><Button icon="arrow-up">上</Button></Col>
                                            <Col className={styles.gutterleft} span={8} ><Button>右下</Button></Col>
                                        </Row>
                                        <Row>
                                            <Col className={styles.gutterleft} span={8} ><Button icon="arrow-left">左</Button></Col>
                                            <Col className={styles.gutterleft} span={8} ><Button>自动</Button></Col>
                                            <Col className={styles.gutterleft} span={8} ><Button icon="arrow-right">右</Button></Col>
                                        </Row>
                                        <Row>
                                            <Col className={styles.gutterleft} span={8} ><Button>左下</Button></Col>
                                            <Col className={styles.gutterleft} span={8} ><Button icon="arrow-down">下</Button></Col>
                                            <Col className={styles.gutterleft} span={8} ><Button>右下</Button></Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </Card>
                            <Card style={{marginTop: 15}}>
                                <Row>

                                    <Col span={24}>
                                        <Row>
                                            <Col span={3} />
                                            <Col span={6} className={styles.gutterleft} ><Button>+</Button></Col>
                                            <Col span={6} className={styles.gutterleft} >变倍</Col>
                                            <Col span={6} className={styles.gutterleft}><Button>-</Button></Col>
                                            <Col span={3} />
                                        </Row>
                                        <Row>
                                            <Col span={3} />
                                            <Col className={styles.gutterleft} span={6} ><Button>+</Button></Col>
                                            <Col className={styles.gutterleft} span={6} >变焦</Col>
                                            <Col className={styles.gutterleft} span={6} ><Button>-</Button></Col>
                                            <Col span={3} />
                                        </Row>
                                        <Row>
                                            <Col span={3} />
                                            <Col className={styles.gutterleft} span={6} ><Button>+</Button></Col>
                                            <Col className={styles.gutterleft} span={6} >光圈</Col>
                                            <Col className={styles.gutterleft} span={6} ><Button>-</Button></Col>
                                            <Col span={3} />
                                        </Row>
                                    </Col>

                                </Row>
                            </Card>

                        </Card>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xl={12} lg={24} sm={24} xs={24}>
                        <Card title="实时数据">
                            <List
                                bordered={true}
                                size="small"
                                itemLayout="horizontal"
                                dataSource={MonitorData}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta title={item.MonitorItem} />
                                        <List.Item.Meta title={item.MonitorValue} />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                    <Col xl={12} lg={24} sm={24} xs={24}>
                        <Card title="设备参数实时信息" >
                            <Table size="small" borderd={true} columns={columns} dataSource={StateData} pagination={false} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
