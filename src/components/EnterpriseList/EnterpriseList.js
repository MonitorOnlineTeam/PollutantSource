import React, { Component } from 'react';
import styles from './EnterpriseList.less';
import { List, Input, Layout, Icon } from 'antd';
import { getEnterprise } from '../../mockdata/Base/commonbase';
const Search = Input.Search;
const { Content, Sider } = Layout;

export default class PointsList extends Component {
    constructor(props) {
        super(props);

        const dataList = getEnterprise();
        this.state = {
            collapsed: false,
            enterpriseslist: dataList,
            AllEnterpriseslist: dataList,
            selEntCodes: []
        };
    }

      toggle = () => {
          this.setState({
              collapsed: !this.state.collapsed,
          });
      }
      // 根据关键字（企业）搜索监测点列表
      SearchList = (value) => {
          this.setState({
              selEntCodes: []
          });
          let markerInfo = [];
          this.state.AllEnterpriseslist.map((item, key) => {
              let isexist = false;
              if (item.EntName.indexOf(value) > -1 || value.indexOf(item.EntName) > -1) {
                  isexist = true;
              }

              if (isexist) { markerInfo.push(item); }
          });
          
          if (markerInfo.length > 0) {
              this.setState({
                  selEntCodes: [markerInfo[0].EntCode]
              });

              this.props.handleChange([markerInfo[0].EntCode]);
          } else {
              this.props.handleChange([]);
          }

          this.setState({ enterpriseslist: markerInfo });
      };

      render() {
          const isMore = this.props.IsMoreSelect; // 监控点列表是否允许多选
          const defaultNode = this.state.enterpriseslist.length > 0 ? this.state.AllEnterpriseslist[0].EntCode : '';
          const selEntCodes = this.state.selEntCodes;
          if (this.state.selEntCodes.length === 0) {
              selEntCodes.push(defaultNode);
              this.setState({ selEntCodes: selEntCodes });
              this.props.handleChange([defaultNode]);
          }

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
                                  dataSource={this.state.enterpriseslist}
                                  renderItem={item => (
                                      <div id={item.EntCode} className={styles.cardList} style={this.state.selEntCodes.indexOf(item.EntCode) > -1 ? {
                                          borderWidth: '1px',
                                          borderColor: 'rgb(97,166,238)',
                                          borderStyle: 'solid',
                                          WebkitBoxShadow: 'rgb(118,178,240) 0px 0px 5px',
                                          MozBoxShadow: 'rgb(118,178,240) 0px 0px 5px',
                                          boxShadow: 'rgb(118,178,240) 0px 0px 5px',
                                          backgroundImage: 'url(/dui1.png)',
                                          backgroundRepeat: 'no-repeat'
                                      } : {}}
                                          onClick={
                                          () => {
                                              let entcodes = this.state.selEntCodes;
                                              if (isMore === 'true') {
                                                  if (entcodes.indexOf(item.EntCode) === -1) {
                                                      entcodes.push(item.EntCode);
                                                  } else {
                                                      entcodes.splice(entcodes.indexOf(item.EntCode), 1);
                                                  }
                                                  this.setState({
                                                      selEntCodes: entcodes
                                                  });
                                                  this.props.handleChange(entcodes);
                                              } else {
                                                  entcodes = [];
                                                  entcodes.push(item.EntCode);
                                                  this.setState({
                                                      selEntCodes: entcodes
                                                  });
                                                  this.props.handleChange([item.EntCode]);
                                              }
                                          }
                                      } >
                                          <div className={styles.title}>
                                              <Icon type="environment-o" style={{ fontSize: 21, color: this.state.selEntCodes.indexOf(item.EntCode) > -1 ? 'rgb(118,178,240)' : '' }} />
                                              <span className={styles.titleSpan}>{item.EntName}</span>
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
