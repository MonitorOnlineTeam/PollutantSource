import React, { Component } from 'react';
import {
    Col,
    Row,
    Input,
    Card, Form, Button, Spin, message, Pagination
} from 'antd';
import {
    connect
} from 'dva';
import styles from './index.less';
const Search = Input.Search;
@connect(({
    loading,
    userdgimndata
}) => ({
    addloading: loading.effects['userdgimndata/addAllDgimnDataFilter'],
    listloading: loading.effects['userdgimndata/userDgimnDataFilter'],
    list: userdgimndata.list,
    total: userdgimndata.total,
    pageSize: userdgimndata.pageSize,
    pageIndex: userdgimndata.pageIndex,
    requstresult: userdgimndata.requstresult,
    ischecked: userdgimndata.ischecked,
    alldgimn: userdgimndata.alldgimn,
}))
export default class DataFilterNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: null,
            selected: (new Map()),
            alldgimn: (new Map()),
            testkey: null,
        };
    }
    componentWillMount() {
        this.setState({
            userid: this.props.pid
        });
        this.onChange();
    }
    onChange = (pageIndex, pageSize) => {
        this.props.dispatch({
            type: 'userdgimndata/userDgimnDataFilter',
            payload: {
                UserId: this.props.pid,
                pageIndex: pageIndex === undefined ? 1 : pageIndex,
                pageSize: pageSize === undefined ? 12 : pageSize,
                TestKey: this.state.testkey,
                callback: () => {
                    this.setState({
                        selected: (new Map()),
                        alldgimn: (new Map()),
                    });
                    this.setState((state) => {
                        // copy the map rather than modifying state.
                        const selected = new Map(state.selected);
                        this.props.ischecked.map((item, key) => {
                            if (selected.get(item) === undefined) {
                                selected.set(item, true); // toggle
                            } else {
                                selected.set(item, !selected.get(item)); // toggle
                            }
                        });
                        return {
                            selected
                        };
                    });
                    this.setState((state) => {
                        // copy the map rather than modifying state.
                        const alldgimn = new Map(state.alldgimn);
                        this.props.alldgimn.map((item, key) => {
                            if (alldgimn.get(item) === undefined) {
                                alldgimn.set(item, true); // toggle
                            } else {
                                alldgimn.set(item, !alldgimn.get(item)); // toggle
                            }
                        });
                        return {
                            alldgimn
                        };
                    });
                }
            },
        });
    }
      onShowSizeChange = (pageIndex, pageSize) => {
          this.props.dispatch({
              type: 'userdgimndata/userDgimnDataFilter',
              payload: {
                  UserId: this.state.userid,
                  pageIndex: pageIndex === undefined ? 1 : pageIndex,
                  pageSize: pageSize === undefined ? 12 : pageSize,
                  TestKey: this.state.testkey,
                  callback: () => {}
              },
          });
      }
      PonChange = (pageIndex, pageSize) => {
          this.props.dispatch({
              type: 'userdgimndata/userDgimnDataFilter',
              payload: {
                  UserId: this.state.userid,
                  pageIndex: pageIndex === undefined ? 1 : pageIndex,
                  pageSize: pageSize === undefined ? 12 : pageSize,
                  TestKey: this.state.testkey,
                  callback: () => {
                  }
              },
          });
      }
      AddAllPointClick = () => {
          const selected = new Map(this.state.selected);
          const alldgimn = new Map(this.state.alldgimn);
          if (selected.size === alldgimn.size) {
              this.props.dispatch({
                  type: 'userdgimndata/addAllDgimnDataFilter',
                  payload: {
                      UserId: this.state.userid,
                      DGIMNS: '',
                      callback: () => {
                          if (this.props.requstresult === '1') {
                              this.setState((state) => {
                                  selected.clear();
                                  return {
                                      selected
                                  };
                              });
                          } else {
                              message.error('全选失败，请重试！');
                          }
                      }
                  },
              });
          } else {
              let arr = [];
              if (alldgimn.size > 0) {
                  alldgimn.forEach((item, key, mapObj) => {
                      arr.push(key);
                  });
                  this.props.dispatch({
                      type: 'userdgimndata/addAllDgimnDataFilter',
                      payload: {
                          UserId: this.state.userid,
                          DGIMNS: arr.join(','),
                          callback: () => {
                              if (this.props.requstresult === '1') {
                                  this.setState((state) => {
                                      const selected = new Map(state.selected);
                                      this.props.alldgimn.map((item, key) => {
                                          if (selected.get(item) === undefined) {
                                              selected.set(item, true); // toggle
                                          }
                                      });
                                      return {
                                          selected
                                      };
                                  });
                              } else {
                                  message.error('全选失败，请重试！');
                              }
                          }
                      },
                  });
              } else {
                  message.error('请选择排口');
              }
          }
      }
      AddPointClick = (DGIMN) => {
          this.props.dispatch({
              type: 'userdgimndata/addDgimnDataFilter',
              payload: {
                  UserId: this.state.userid,
                  DGIMNS: DGIMN,
                  callback: () => {
                      if (this.props.requstresult === '1') {
                          this.setState((state) => {
                              const selected = new Map(state.selected);
                              if (selected.get(DGIMN) === undefined) {
                                  selected.set(DGIMN, true);
                              } else {
                                  selected.delete(DGIMN);
                              }
                              return {
                                  selected
                              };
                          });
                      } else {
                          message.error('关联排口失败，请重试！');
                      }
                  }
              },
          });
      }
         renderStandardList=() => {
             const rtnVal = [];
             const that = this;
             this.props.list.map(function(item,key) {
                 rtnVal.push(<div key={key} onClick={() => {
                     that.AddPointClick(item.DGIMN)
                     ;
                 }} className={that.state.selected.get(item.DGIMN) ? `${styles.item} ${styles.CorrelationYes}` : `${styles.item} ${styles.CorrelationNo}`}>
                     <div className={styles.PointName}>
                         <Row type="flex" justify="space-between">
                             <Col span={15}>{item.pointName}</Col>
                         </Row>
                     </div>
                     <div className={styles.PointView} >
                         <Row type="flex" justify="space-between">
                             <Col span={15}>{item.OutputType}</Col>
                         </Row>
                     </div>
                     <div className={styles.PointView} >
                         <Row type="flex" justify="space-between">
                             <Col span={15}>{item.DGIMN}</Col>
                         </Row>
                     </div>
                 </div>);
             });
             return rtnVal;
         }
         render() {
             return (
                 <Spin spinning={this.props.listloading&&this.props.addloading}>
                         <div>
                             <Card>
                                 <Form layout="inline">
                                     <Row gutter={16} >
                                         <Col span={5} >
                                             <Search placeholder="排口名称、排口编号"
                                                 style={{ width: 200 }}
                                                 onSearch={
                                                     (value) => {
                                                         this.setState({
                                                             testkey: value
                                                         },() => {
                                                             this.onChange();
                                                         });
                                                     }
                                                 } />
                                         </Col>
                                         <Col span={5} >
                                             <Button type="primary" onClick={() => {
                                                 this.AddAllPointClick();
                                             }}>全选</Button>
                                         </Col>
                                     </Row>
                                 </Form>
                             </Card>
                             <div className={styles.card}>
                                 {this.renderStandardList()}
                             </div>
                             <div style={{textAlign: 'center',marginTop: 20}}>
                                 <Pagination
                                     size={'small'}
                                     showSizeChanger={true}
                                     showQuickJumper={true}
                                     total={this.props.total}
                                     pageSize={this.props.pageSize}
                                     current={this.props.pageIndex}
                                     onChange={this.PonChange}
                                     onShowSizeChange={this.onShowSizeChange}
                                     pageSizeOptions={['12', '16', '20', '24', '28']}
                                 />
                             </div>
                         </div>
                 </Spin>
             );
         }
}
