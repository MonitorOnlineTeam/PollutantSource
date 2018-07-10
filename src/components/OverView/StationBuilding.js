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
// import {
//     ChartCard,
//     yuan,
//     MiniArea,
//     MiniBar,
//     MiniProgress,
//     Field,
//     Bar,
//     Pie,
//     TimelineChart,
// } from 'components/Charts';
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
          <Fragment>
              <Row gutter={24}>
                  <Col {...topColResponsiveProps}>
                     总销售额
                  </Col>
                  <Col {...topColResponsiveProps}>
                  访问量
                  </Col>
                  <Col {...topColResponsiveProps}>
                     支付笔数
                  </Col>
                  <Col {...topColResponsiveProps}>
                  运营活动效果
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

          </Fragment>
      );
  }
}
