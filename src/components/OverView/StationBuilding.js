import React, { Component, Fragment } from 'react';
import {
    Row,
    Col,
    Card,
    Tabs,
    Icon
} from 'antd';
import numeral from 'numeral';
import { getTimeDistance } from '../../utils/utils';
import styles from './OverView.less';
const { TabPane } = Tabs;
const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
    rankingListData.push({
        title: `工专路 ${i} 号店`,
        total: 323234,
    });
}
export default class StationBuilding extends Component {
  state = {
      salesType: 'all',
      currentTabKey: '',
      rangePickerValue: getTimeDistance('year'),
  };

  render() {
      return (
          <div style={{background: '#e8e8e8'}}>
              <Row style={{padding: '20px 20px 20px 20px'}} gutter={24}>
                  <Col span={6}>
                      <Card style={{background: '#fff'}}>
                          <div >
                              <div style={{borderBottom: '1px solid #E8E8E8', fontSize: '16px', fontWeight: 'bold'}}>
                          气态分析仪
                              </div>
                              <div style={{paddingTop: '15px', float: 'left'}}>
                                  <p><Icon style={{marginRight: '2px'}} type="book" />品牌：THERMO</p>
                                  <p><Icon style={{marginRight: '2px'}} type="desktop" />运行状态：正常</p>
                                  <p><Icon style={{marginRight: '2px'}} type="compass" />质控状态：正常</p>
                              </div>
                              <img className={styles.stationimg} src="/timg.jpg" />
                          </div>
                      </Card>
                  </Col>
                  <Col span={6}>
                      <Card style={{background: '#fff'}}>
                          <div >
                              <div style={{borderBottom: '1px solid #E8E8E8', fontSize: '16px', fontWeight: 'bold'}}>
                          烟气分析仪
                              </div>
                              <div style={{paddingTop: '15px', float: 'left'}}>
                                  <p><Icon style={{marginRight: '2px'}} type="book" />品牌：MODEL3080</p>
                                  <p><Icon style={{marginRight: '2px'}} type="desktop" />运行状态：正常</p>
                                  <p><Icon style={{marginRight: '2px'}} type="compass" />质控状态：正常</p>
                              </div>
                              <img className={styles.stationimg} src="/timg.jpg" />
                          </div>
                      </Card>
                  </Col>
                  <Col span={6}>
                      <Card style={{background: '#fff'}}>
                          <div >
                              <div style={{ borderBottom: '1px solid #E8E8E8', fontSize: '16px', fontWeight: 'bold' }}>
                          采样管
                              </div>
                              <div style={{paddingTop: '15px', float: 'left'}}>
                                  <p><Icon style={{marginRight: '2px'}} type="book" />品牌：SDL-B040201005</p>
                                  <p><Icon style={{marginRight: '2px'}} type="wallet" />数量：2</p>
                                  <p><Icon style={{marginRight: '2px'}} type="calendar" />保质日期：2019-2-19</p>
                              </div>
                              <img className={styles.stationimg} src="/timg.jpg" />
                          </div>
                      </Card>
                  </Col>
                  <Col span={6}>
                      <Card style={{background: '#fff'}}>
                          <div>
                              <div style={{borderBottom: '1px solid #E8E8E8', fontSize: '16px', fontWeight: 'bold'}}>
                          探头
                              </div>
                              <div style={{paddingTop: '15px', float: 'left'}}>
                                  <p><Icon style={{marginRight: '2px'}} type="book" />品牌：SDL-B090109037</p>
                                  <p><Icon style={{marginRight: '2px'}} type="wallet" />数量：1</p>
                                  <p><Icon style={{marginRight: '2px'}} type="calendar" />保质日期：2020-11-2</p>
                              </div>
                              <img className={styles.stationimg} src="/timg.jpg" />
                          </div>
                      </Card>
                  </Col>
              </Row>
              <div style={{padding: '0 20px 20px 20px'}}>
                  <Row gutter={24}>
                      <Col span={8}>
                          <Card style={{background: '#fff'}}>
                              <div>
                                  <div style={{borderBottom: '1px solid #E8E8E8', fontSize: '16px', color: 'red'}}>
                          报警记录
                                  </div>
                                  <div style={{paddingTop: '15px', float: 'left'}}>
                              排口于2017-7-11号10点SO2超标，目前已处理，处理人：小王。
                                  </div>
                              </div>
                          </Card>
                      </Col>
                      <Col span={8}>
                          <Card style={{background: '#fff'}}>
                              <div>
                                  <div style={{borderBottom: '1px solid #E8E8E8', fontSize: '16px'}}>
                          预警记录
                                  </div>
                                  <div style={{paddingTop: '15px', float: 'left'}}>
                              排口于2017-7-11号10点SO2超标，目前已处理，处理人：小王。
                                  </div>
                              </div>
                          </Card>
                      </Col>
                      <Col span={8}>
                          <Card style={{background: '#fff'}}>
                              <div>
                                  <div style={{borderBottom: '1px solid #E8E8E8', fontSize: '16px'}}>
                          质控记录
                                  </div>
                                  <div style={{paddingTop: '15px', float: 'left'}}>
                              排口于2017-7-11号10点SO2超标，目前已处理，处理人：小王。
                                  </div>
                              </div>
                          </Card>
                      </Col>
                  </Row>

              </div>

              <div style={{padding: '0 20px 20px 20px'}}>
                  <Row gutter={24}>
                      <Col span={12}>
                          <Card style={{background: '#fff'}}>
                              <div>
                                  <div style={{borderBottom: '1px solid #E8E8E8', fontSize: '16px', color: 'red'}}>
                          报警记录
                                  </div>
                                  <div style={{paddingTop: '15px', float: 'left'}}>
                              排口于2017-7-11号10点SO2超标，目前已处理，处理人：小王。
                                  </div>
                              </div>
                          </Card>
                      </Col>
                      <Col span={12}>
                          <Card style={{background: '#fff'}}>
                              <div>
                                  <div style={{borderBottom: '1px solid #E8E8E8', fontSize: '16px'}}>
                          预警记录
                                  </div>
                                  <div style={{paddingTop: '15px', float: 'left'}}>
                              排口于2017-7-11号10点SO2超标，目前已处理，处理人：小王。
                                  </div>
                              </div>
                          </Card>
                      </Col>
                  </Row>
              </div>
          </div>
      );
  }
}
