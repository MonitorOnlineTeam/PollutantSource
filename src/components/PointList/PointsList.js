import React, { Component } from 'react';
import styles from './PointsList.less';
import { List, Input, Layout, Icon } from 'antd';
import { getPointEnterprise } from '../../mockdata/Base/commonbase';

const Search = Input.Search;
const { Content, Sider } = Layout;

export default class PointsList extends Component {
    constructor(props) {
        super(props);
        const dataList = getPointEnterprise();
        this.state = {
            collapsed: false,
            pointslist: dataList,
            AllPointslist: dataList,
            selDGIMNS: []
        };
    }

      toggle = () => {
          this.setState({
              collapsed: !this.state.collapsed,
          });
      }
      // 根据关键字（企业、监测点名称）搜索监测点列表
      SearchList = (value) => {
          this.setState({
              selDGIMNS: []
          });
          let markerInfo = [];
          this.state.AllPointslist.map((item, key) => {
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
          const isMore = this.props.IsMoreSelect; // 监控点列表是否允许多选
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
                                      <div id={item.DGIMN} className={styles.cardList} style={this.state.selDGIMNS.indexOf(item.DGIMN) > -1 ? {
                                          borderWidth: '1px',
                                          borderColor: 'rgb(97,166,238)',
                                          borderStyle: 'solid',
                                          WebkitBoxShadow: 'rgb(118,178,240) 0px 0px 5px',
                                          MozBoxShadow: 'rgb(118,178,240) 0px 0px 5px',
                                          boxShadow: 'rgb(118,178,240) 0px 0px 5px',
                                          backgroundImage: 'url(/dui.png)',
                                          backgroundRepeat: 'no-repeat'
                                      } : {}}
                                          onClick={
                                          () => {
                                            let dgimns = this.state.selDGIMNS;
                                              if (isMore === 'true') {
                                                  if (dgimns.indexOf(item.DGIMN) === -1) {
                                                      dgimns.push(item.DGIMN);
                                                  } else {
                                                      dgimns.splice(dgimns.indexOf(item.DGIMN), 1);
                                                  }
                                                  this.setState({
                                                      selDGIMNS: dgimns
                                                  });
                                                  this.props.handleChange(dgimns);
                                              } else {
                                                  dgimns = [];
                                                  dgimns.push(item.DGIMN);
                                                  this.setState({
                                                      selDGIMNS: dgimns
                                                  });
                                                  this.props.handleChange([item.DGIMN]);
                                              }
                                          }
                                      } >
                                          <div />
                                          <div className={styles.title}>
                                              <Icon type="environment-o" style={{ fontSize: 21, color: this.state.selDGIMNS.indexOf(item.DGIMN) > -1 ? 'rgb(118,178,240)' : '' }} />
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
