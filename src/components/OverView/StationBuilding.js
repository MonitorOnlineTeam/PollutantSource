import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
    Row,
    Col,
    Icon,
    Card,
    Tabs,
    Table,
    Radio,
    DatePicker,
    Tooltip,
    Menu,
    Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
    ChartCard,
    // yuan,
    // MiniArea,
    // MiniBar,
    // MiniProgress,
    // Field,
    // Bar,
    // Pie,
    // TimelineChart,
} from '../Charts';
// import Trend from 'components/Trend';
// import NumberInfo from 'components/NumberInfo';
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
      const topColResponsiveProps = {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 6,
          style: { marginBottom: 24 },
      };

      return (
          <div style={{background: '#e8e8e8'}}>
              <Row style={{padding: '20px 20px 20px 20px'}} gutter={24}>
                  <Col {...topColResponsiveProps}>
                      <Card style={{background: '#fff'}}>
                          <div >
                              <div style={{borderBottom: '1px solid #E8E8E8', fontSize: '16px'}}>
                          质控记录
                              </div>
                              <div style={{borderBottom: '1px solid #E8E8E8', marginTop: '10px'
                              }}>
                                  <p style={{ fontSize: '30px', color: '#6FC425', marginBottom: '15px' }}><Icon style={{ marginRight: '2px' }} type="smile-o" />上期质控已完成</p>
                                  <p style={{paddingBottom: '5px'}}><span style={{marginRight: '10px'}}><Icon style={{ marginRight: '2px' }} type="user" />质控人：小王</span><span><Icon style={{ marginRight: '2px' }} type="calendar" />质控时间：2018-06-26</span></p>
                                  <p><Icon style={{ marginRight: '2px' }} type="dashboard" />质控内容：零点检查、量程检查</p>
                              </div>
                              <div style={{color: '#4B8AA1', fontSize: '14px', paddingTop: '10px'}}>距离下次质控还有6天!</div>
                          </div>
                      </Card>
                  </Col>
                  <Col {...topColResponsiveProps}>
                      <Card style={{background: '#fff'}}>
                          <div >
                              <div style={{borderBottom: '1px solid #E8E8E8', fontSize: '16px'}}>
                            例行任务
                              </div>
                              <div style={{borderBottom: '1px solid #E8E8E8', marginTop: '10px'
                              }}>
                                  <p style={{ fontSize: '30px', color: '#6FC425', marginBottom: '15px' }}><Icon style={{ marginRight: '2px' }} type="smile-o" />上期任务已完成</p>
                                  <p style={{paddingBottom: '5px'}}><span style={{marginRight: '10px'}}><Icon style={{ marginRight: '2px' }} type="user" />执行人：小王</span><span><Icon style={{ marginRight: '2px' }} type="calendar" />完成时间：2018-06-26</span></p>
                                  <p><Icon style={{ marginRight: '2px' }} type="dashboard" />发现问题：无</p>
                              </div>
                              <div style={{color: '#4B8AA1', fontSize: '14px', paddingTop: '10px'}}>距离下次例行任务还有6天!</div>
                          </div>
                      </Card>
                  </Col>
                  <Col {...topColResponsiveProps}>
                      <Card style={{background: '#fff'}}>
                          <div >
                              <div style={{borderBottom: '1px solid #E8E8E8', fontSize: '16px'}}>
                            报警记录
                              </div>
                              <div style={{borderBottom: '1px solid #E8E8E8', marginTop: '10px'
                              }}>
                                  <p style={{ fontSize: '30px', color: '#6FC425', marginBottom: '15px' }}><Icon style={{ marginRight: '2px' }} type="smile-o" />上期任务已完成</p>
                                  <p style={{paddingBottom: '5px'}}><span style={{marginRight: '10px'}}><Icon style={{ marginRight: '2px' }} type="user" />执行人：小王</span><span><Icon style={{ marginRight: '2px' }} type="calendar" />完成时间：2018-06-26</span></p>
                                  <p><Icon style={{ marginRight: '2px' }} type="dashboard" />发现问题：无</p>
                              </div>
                              <div style={{color: '#4B8AA1', fontSize: '14px', paddingTop: '10px'}}>距离下次例行任务还有6天!</div>
                          </div>
                      </Card>
                  </Col>
                  <Col {...topColResponsiveProps}>
                      <Card style={{background: '#fff'}}>
                          <div >
                              <div style={{borderBottom: '1px solid #E8E8E8', fontSize: '16px'}}>
                              预警记录
                              </div>
                              <div style={{borderBottom: '1px solid #E8E8E8', marginTop: '10px'
                              }}>
                                  <p style={{ fontSize: '30px', color: '#6FC425', marginBottom: '15px' }}><Icon style={{ marginRight: '2px' }} type="smile-o" />上期任务已完成</p>
                                  <p style={{paddingBottom: '5px'}}><span style={{marginRight: '10px'}}><Icon style={{ marginRight: '2px' }} type="user" />执行人：小王</span><span><Icon style={{ marginRight: '2px' }} type="calendar" />完成时间：2018-06-26</span></p>
                                  <p><Icon style={{ marginRight: '2px' }} type="dashboard" />发现问题：无</p>
                              </div>
                              <div style={{color: '#4B8AA1', fontSize: '14px', paddingTop: '10px'}}>距离下次例行任务还有6天!</div>
                          </div>
                      </Card>
                  </Col>
              </Row>

              <Card loading={false} bordered={false} bodyStyle={{ padding: 0 }}>
                  <div className={styles.salesCard}>
                      <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
                          <TabPane tab="销售额" key="sales">
                              <Row>
                                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                      <div className={styles.salesBar}>
                                      销售额趋势
                                      </div>
                                  </Col>
                                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                      <div className={styles.salesRank}>
                                          <h4 className={styles.rankingTitle}>门店销售额排名</h4>
                                          <ul className={styles.rankingList}>
                                              {rankingListData.map((item, i) => (
                                                  <li key={item.title}>
                                                      <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                                                      <span>{item.title}</span>
                                                      <span>{numeral(item.total).format('0,0')}</span>
                                                  </li>
                                              ))}
                                          </ul>
                                      </div>
                                  </Col>
                              </Row>
                          </TabPane>
                          <TabPane tab="访问量" key="views">
                              <Row>
                                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                      <div className={styles.salesBar}>
                                      访问量趋势
                                      </div>
                                  </Col>
                                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                      <div className={styles.salesRank}>
                                          <h4 className={styles.rankingTitle}>门店访问量排名</h4>
                                          <ul className={styles.rankingList}>
                                              {rankingListData.map((item, i) => (
                                                  <li key={item.title}>
                                                      <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                                                      <span>{item.title}</span>
                                                      <span>{numeral(item.total).format('0,0')}</span>
                                                  </li>
                                              ))}
                                          </ul>
                                      </div>
                                  </Col>
                              </Row>
                          </TabPane>
                      </Tabs>
                  </div>
              </Card>

              <Row gutter={24}>
                  <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                  线上热门搜索
                  </Col>
                  <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                  销售额类别占比
                  </Col>
              </Row>

          </div>
      );
  }
}
