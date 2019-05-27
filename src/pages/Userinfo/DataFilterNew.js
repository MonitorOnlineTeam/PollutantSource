import React, { Component } from 'react';
import {
    Col,
    Row,
    Input,
    Card, Form, Button, Spin, message, Pagination,Tag,Checkbox,Switch
} from 'antd';
import {
    connect
} from 'dva';
import styles from './index.less';
import {onlyOneEnt} from '../../config';

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
    yichangDgimn: userdgimndata.yichangDgimn,
    chaobiaoDgimn: userdgimndata.chaobiaoDgimn,
    yujingDgimn: userdgimndata.yujingDgimn,
}))
class DataFilterNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: null,
            selected: new Map(),
            alldgimn: new Map(),
            yichangDgimn: new Map(),
            chaobiaoDgimn: new Map(),
            yujingDgimn: new Map(),
            testkey: null,
            yctype: false,
            cbtype: false,
            yjtype: false,
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
                        selected: new Map(),
                        alldgimn: new Map(),
                        yichangDgimn: new Map(),
                        chaobiaoDgimn: new Map(),
                        yujingDgimn: new Map(),
                    });
                    this.setState((state) => {
                        // copy the map rather than modifying state.
                        const selected = new Map(state.selected);
                        this.props.ischecked.map((item, key) => {
                            if (selected.get(item) === undefined) {
                                selected.set(item, true); // toggle
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
                            }
                        });
                        return {
                            alldgimn
                        };
                    });
                    this.setState((state) => {
                        // copy the map rather than modifying state.
                        const yichangDgimn = new Map(state.yichangDgimn);
                        this.props.yichangDgimn.map((item, key) => {
                            if (yichangDgimn.get(item) === undefined) {
                                yichangDgimn.set(item, true); // toggle
                            }
                        });
                        return {
                            yichangDgimn
                        };
                    });
                    this.setState((state) => {
                        // copy the map rather than modifying state.
                        const chaobiaoDgimn = new Map(state.chaobiaoDgimn);
                        this.props.chaobiaoDgimn.map((item, key) => {
                            if (chaobiaoDgimn.get(item) === undefined) {
                                chaobiaoDgimn.set(item, true); // toggle
                            }
                        });
                        return {
                            chaobiaoDgimn
                        };
                    });
                    this.setState((state) => {
                        // copy the map rather than modifying state.
                        const yujingDgimn = new Map(state.yujingDgimn);
                        this.props.yujingDgimn.map((item, key) => {
                            if (yujingDgimn.get(item) === undefined) {
                                yujingDgimn.set(item, true); // toggle
                            }
                        });
                        return {
                            yujingDgimn
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
          const yujingDgimn = new Map(this.state.yujingDgimn);
          const yichangDgimn = new Map(this.state.yichangDgimn);
          const chaobiaoDgimn = new Map(this.state.chaobiaoDgimn);
          const alldgimn = new Map(this.state.alldgimn);
          if (selected.size >= alldgimn.size) {
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
                              this.setState((state) => {
                                  yujingDgimn.clear();
                                  return {
                                      yujingDgimn
                                  };
                              });
                              this.setState((state) => {
                                  yichangDgimn.clear();
                                  return {
                                      yichangDgimn
                                  };
                              });
                              this.setState((state) => {
                                  chaobiaoDgimn.clear();
                                  return {
                                      chaobiaoDgimn
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
                          cbyj: this.state.yjtype === true ? 1 : 0,
                          sjcb: this.state.cbtype === true ? 1 : 0,
                          sjyc: this.state.yctype === true ? 1 : 0,
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
                                  if(this.state.yctype===true){
                                      this.setState((state) => {
                                          const yichangDgimn = new Map(state.yichangDgimn);
                                          this.props.alldgimn.map((item, key) => {
                                              if (yichangDgimn.get(item) === undefined) {
                                                  yichangDgimn.set(item, true); // toggle
                                              }
                                          });
                                          return {
                                              yichangDgimn
                                          };
                                      });
                                  }
                                  if (this.state.cbtype === true) {
                                      this.setState((state) => {
                                          const chaobiaoDgimn = new Map(state.chaobiaoDgimn);
                                          this.props.alldgimn.map((item, key) => {
                                              if (chaobiaoDgimn.get(item) === undefined) {
                                                  chaobiaoDgimn.set(item, true); // toggle
                                              }
                                          });
                                          return {
                                              chaobiaoDgimn
                                          };
                                      });
                                  }
                                  if (this.state.yjtype === true) {
                                      this.setState((state) => {
                                          const yujingDgimn = new Map(state.yujingDgimn);
                                          this.props.alldgimn.map((item, key) => {
                                              if (yujingDgimn.get(item) === undefined) {
                                                  yujingDgimn.set(item, true); // toggle
                                              }
                                          });
                                          return {
                                              yujingDgimn
                                          };
                                      });
                                  }
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

      AddAlarmLinkmanDGICodeClick = (DGIMN,type) => {
          let cbyj=0;
          let sjcb = 0;
          let sjyc = 0;
          if(type===1) {
              sjyc=1;
          }
          if(type===2) {
              sjcb=1;
          }
          if(type===3) {
              cbyj=1;
          }
          this.props.dispatch({
              type: 'userdgimndata/addalarmlinkmandgimncode',
              payload: {
                  UserId: this.state.userid,
                  DGIMNS: DGIMN,
                  cbyj: cbyj,
                  sjcb: sjcb,
                  sjyc: sjyc,
                  callback: () => {
                      if (this.props.requstresult === '1') {
                          this.setState((state) => {
                              const selected = new Map(state.selected);
                              if (selected.get(DGIMN) === undefined) {
                                  selected.set(DGIMN, true);
                              }
                              return {
                                  selected
                              };
                          });
                          if(type===1) {
                              this.setState((state) => {
                                  const yichangDgimn = new Map(state.yichangDgimn);
                                  if (yichangDgimn.get(DGIMN) === undefined) {
                                      yichangDgimn.set(DGIMN, true);
                                  } else {
                                      yichangDgimn.delete(DGIMN);
                                  }
                                  return {
                                      yichangDgimn
                                  };
                              });
                          }
                          if (type === 2) {
                              this.setState((state) => {
                                  const chaobiaoDgimn = new Map(state.chaobiaoDgimn);
                                  if (chaobiaoDgimn.get(DGIMN) === undefined) {
                                      chaobiaoDgimn.set(DGIMN, true);
                                  } else {
                                      chaobiaoDgimn.delete(DGIMN);
                                  }
                                  return {
                                      chaobiaoDgimn
                                  };
                              });
                          }
                          if (type === 3) {
                              this.setState((state) => {
                                  const yujingDgimn = new Map(state.yujingDgimn);
                                  if (yujingDgimn.get(DGIMN) === undefined) {
                                      yujingDgimn.set(DGIMN, true);
                                  } else {
                                      yujingDgimn.delete(DGIMN);
                                  }
                                  return {
                                      yujingDgimn
                                  };
                              });
                          }
                      } else {
                          message.error('关联排口失败，请重试！');
                      }
                  }
              },
          });
      }

         renderentNamelist=(entName,pointName)=>{
           if(!onlyOneEnt)
           {
               return entName+"-"+pointName;
           }
           return pointName;
         }

         renderStandardList=() => {
            if (this.props.listloading) {
                return ( <Spin
                    style={
                        {
                            width: '100%',
                            height: 'calc(100vh/2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    }
                    size="large"
                /> );
            }
            if (this.props.addloading) {
                return ( <Spin
                    style={
                        {
                            width: '100%',
                            height: 'calc(100vh/2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    }
                    size="large"
                /> );
            }

             const rtnVal = [];
             const that = this;

             this.props.list.map((item,key) => {
                 rtnVal.push(
                     <div
                         key={key}
                         className={styles.item}
                     >
                         <Row gutter={0}>
                             <Col span={18}>
                                 
                                 <div className={styles.PointName}>
                                     <Row type="flex" justify="space-between">
                                         <Col span={15}>{this.renderentNamelist(item.abbreviation,item.pointName)}</Col>
                                     </Row>
                                 </div>
                                 <div className={styles.PointView}>
                                     <Row type="flex" justify="space-between">
                                         <Col span={15}>{item.OutputType}</Col>
                                     </Row>
                                 </div>
                                 <div className={styles.PointView}>
                                     <Row type="flex" justify="space-between">
                                         <Col span={15}>{item.DGIMN}</Col>
                                     </Row>
                                 </div>
                             </Col>
                             <Col span={6}>
                                 <div style={{textAlign:'right',margin:'10px 5px 5px 5px'}}>
                                     <Switch
                                         checkedChildren="关联"
                                         unCheckedChildren="关联"
                                         size="small"
                                         checked={!!that.state.selected.get(item.DGIMN)
                                         }
                                         onChange={
                                             () => {
                                                 this.AddPointClick(item.DGIMN);
                                             }
                                         }
                                     />
                                     <Switch
                                         checkedChildren="异常"
                                         unCheckedChildren="异常"
                                         size="small"
                                         checked={!!that.state.yichangDgimn.get(item.DGIMN)}
                                         onChange={()=>{
                                             this.AddAlarmLinkmanDGICodeClick(item.DGIMN, 1);
                                         }}
                                     />
                                     <Switch
                                         checkedChildren="超标"
                                         unCheckedChildren="超标"
                                         size="small"
                                         checked={!!that.state.chaobiaoDgimn.get(item.DGIMN)}
                                         onChange={
                                             () => {
                                                 this.AddAlarmLinkmanDGICodeClick(item.DGIMN, 2);
                                             }
                                         }
                                     />
                                     <Switch
                                         checkedChildren="预警"
                                         unCheckedChildren="预警"
                                         size="small"
                                         checked={!!that.state.yujingDgimn.get(item.DGIMN)}
                                         onChange={
                                             () => {
                                                 this.AddAlarmLinkmanDGICodeClick(item.DGIMN, 3);
                                             }
                                         }
                                     />
                                 </div>
                             </Col>
                         </Row>
                     </div>);
             });
             return rtnVal;
         }

         render() {
             let placeholder="排口名称、排口编号";
             if(!onlyOneEnt)
             {
                placeholder="企业名称、排口名称";
             }

           
       
             return (
                 <div>
                     <Card>
                         <Form layout="inline">
                             <Row gutter={16}>
                                 <Col span={5}>
                                     <Search
                                         placeholder={placeholder}
                                         style={{ width: 200 }}
                                         onSearch={
                                             (value) => {
                                                 this.setState({
                                                     testkey: value
                                                 },() => {
                                                     this.onChange();
                                                 });
                                             }
                                         }
                                     />
                                 </Col>
                                 <Col span={3}>
                                     <Button
                                         type="primary"
                                         onClick={() => {
                                             this.AddAllPointClick();
                                         }}
                                     >全选
                                     </Button>
                                 </Col>
                                 <Col span={10}>
                                     <Checkbox
                                         defaultChecked={this.state.yctype}
                                         onChange={()=>{
                                             this.setState({
                                                 yctype: this.state.yctype !== true,
                                             });
                                         }}
                                     >异常报警通知
                                     </Checkbox>
                                     <Checkbox
                                         defaultChecked={this.state.cbtype}
                                         onChange={()=>{
                                             this.setState({
                                                 cbtype: this.state.cbtype !== true,
                                             });
                                         }}
                                     >超标报警通知
                                     </Checkbox>
                                     <Checkbox
                                         defaultChecked={
                                             this.state.yjtype
                                         }
                                         onChange={
                                             () => {
                                                 this.setState({
                                                     yjtype: this.state.yjtype!==true,
                                                 });
                                             }}
                                     >超标预警通知
                                     </Checkbox>
                                 </Col>
                             </Row>
                         </Form>
                     </Card>
                     <div className={styles.card}>
                         {this.renderStandardList()}
                     </div>
                     <div style={{textAlign: 'center',marginTop: 20}}>
                         <Pagination
                             size="small"
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
             );
         }
}
export default DataFilterNew;