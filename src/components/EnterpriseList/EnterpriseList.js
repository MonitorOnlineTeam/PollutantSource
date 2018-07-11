import React, { Component } from 'react';
import styles from './EnterpriseList.less';
import { List, Input, Layout,Checkbox } from 'antd';
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
            selEntCode: '',
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
          let markerInfo = [];
          this.state.AllEnterpriseslist.map((item, key) => {
              let isexist = false;
              if (item.EntName.indexOf(value) > -1 || value.indexOf(item.EntName) > -1) {
                  isexist = true;
              }

              if (isexist) { markerInfo.push(item); }
          });
          this.setState({ enterpriseslist: markerInfo });
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
                                  dataSource={this.state.enterpriseslist}
                                  renderItem={item => (
                                      <div id={item.EntCode} className={styles.cardList} style={this.state.selEntCode === item.EntCode ? {
                                          borderWidth: '1px',
                                          borderColor: 'rgb(97,166,238)',
                                          borderStyle: 'solid',
                                          WebkitBoxShadow: 'rgb(118,178,240) 0px 0px 5px',
                                          MozBoxShadow: 'rgb(118,178,240) 0px 0px 5px',
                                          boxShadow: 'rgb(118,178,240) 0px 0px 5px'
                                      } : {}}
                                      onClick={
                                          () => {
                                              if (this.props.IsShowChk === 'none') {
                                                  this.props.handleChange([item.EntCode]);
                                                  this.setState({
                                                      selEntCode: item.EntCode
                                                  });
                                              }
                                          }
                                      } >
                                          <div className={styles.title}>
                                              <span className={styles.chkbox} style={{display: IsShowChk}}>
                                              <Checkbox
                                                      onChange={
                                                          (e) => {
                                                              let entcodes = this.state.selEntCodes;
                                                              if (e.target.checked == true) {
                                                                  if (entcodes.indexOf(item.EntCode) == -1) {
                                                                      entcodes.push(item.EntCode);
                                                                  }
                                                              } else {
                                                                  if (entcodes.indexOf(item.EntCode) > -1) {
                                                                      entcodes.splice(entcodes.indexOf(item.EntCode), 1);
                                                                  }
                                                              }

                                                              this.setState({
                                                                  selEntCodes: entcodes
                                                              });

                                                              this.props.handleChange(entcodes);
                                                          }
                                                      }
                                                  />
                                          </span>
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
