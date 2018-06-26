import React, { Component } from 'react';
import styles from './PointsList.less';
import { List, Input, Checkbox, Layout } from 'antd';
import { getPointEnterprise } from '../../mockdata/Base/commonbase';

const Search = Input.Search;
const { Content, Sider } = Layout;
const dataList = getPointEnterprise();

export default class componentName extends Component {
    state = {
        collapsed: false,
        pointslist: dataList
    };

      toggle = () => {
          this.setState({
              collapsed: !this.state.collapsed,
          });
      }

      // 根据关键字（企业、监测点名称）搜索监测点列表
      SearchList = (value) => {
          let markerInfo = [];
          dataList.map((item, key) => {
              let isexist = false;
              if (item.PointName.indexOf(value) > -1 || value.indexOf(item.PointName) > -1) {
                  isexist = true;
              }
              if (item.EntName.indexOf(value) > -1 || value.indexOf(item.EntName) > -1) {
                  isexist = true;
              }
              if (isexist) { markerInfo.push(item); }
          });
          this.setState({ pointslist: markerInfo });
      };

      render() {
          const IsShowChk = this.props.IsShowChk == null ? '' : this.props.IsShowChk; // 监控点列表是否显示复选框
          return (
              <Layout>
                  <Sider width={350}
                      collapsed={this.state.collapsed}
                      collapsedWidth={0}>
                      <div id="PointList" className={`${styles.bigDiv} ${styles.shadow}`} style={{ height: 'calc(100vh - 80px)' }} >
                          <div className={styles.searchInput}>
                              <Search placeholder="请输入关键字"
                                  onSearch={this.SearchList}
                              />
                          </div>

                          <div className={styles.listbox} style={{ height: 'calc(100vh - 130px)' }}>
                              <List
                                  dataSource={this.state.pointslist}
                                  renderItem={item => (
                                      <div id={item.DGIMN} className={styles.cardList}
                                          onClick={
                                              () => {
                                                this.props.handleChange(item.DGIMN);
                                              }
                                          } >
                                          <div className={styles.title}>
                                              <span className={styles.chkbox} style={{display: IsShowChk}}><Checkbox /></span>
                                              <span className={styles.titleSpan}>{item.PointName}</span>
                                          </div>
                                          <div className={styles.content}>
                                              {item.EntName}
                                          </div>
                                      </div>

                                  )}

                              />
                          </div>

                          <div className={styles.toggler} onClick={this.toggle}>
                              <span className={this.state.collapsed ? styles.glyphiconChevronRight : styles.glyphiconChevronLeft}>&nbsp;</span>
                          </div>
                      </div>

                  </Sider>
                  <Content style={{ padding: '0 2px'}}>
                      {this.props.children}
                  </Content>
              </Layout>
          );
      }
}
