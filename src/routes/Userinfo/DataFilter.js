import React, { Component } from 'react';
import {
    Col,
    Row,
    Input,
    List, Card, Form, Button, Checkbox, Icon, message,
} from 'antd';
import {
    connect
} from 'dva';
const Search = Input.Search;
@connect(({
    loading,
    userdgimndata
}) => ({
    ...loading,
    list: userdgimndata.list,
    total: userdgimndata.total,
    pageSize: userdgimndata.pageSize,
    pageIndex: userdgimndata.pageIndex,
    requstresult: userdgimndata.requstresult,
    ischecked: userdgimndata.ischecked,
    alldgimn: userdgimndata.alldgimn,
}))
export default class DataFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: null,
            selected: (new Map(): Map < string, boolean >),
            alldgimn: (new Map(): Map < string, boolean >),
            testkey: null,
        };
    };
    componentWillMount() {
        this.setState({
            userid: this.props.pid.join(',')
        });
        this.props.onRef(this);
        this.onChange();
    };
    // {this.props.ischecked.IsCheck}
    onChange = (pageIndex, pageSize) => {
        this.props.dispatch({
            type: 'userdgimndata/userDgimnDataFilter',
            payload: {
                UserId: this.props.pid.join(','),
                pageIndex: pageIndex,
                pageSize: pageSize,
                callback: () => {
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
                  pageIndex: pageIndex,
                  pageSize: pageSize,
                  callback: () => {}
              },
          });
      }
      PonChange = (pageIndex, pageSize) => {
          this.props.dispatch({
              type: 'userdgimndata/userDgimnDataFilter',
              payload: {
                  UserId: this.state.userid,
                  pageIndex: pageIndex,
                  pageSize: pageSize,
                  callback: () => {
                  }
              },
          });
      }
      AddDataFilter=() => {
          const selected = new Map(this.state.selected);
          let arr = [];

          if (selected.size > 0) {
              selected.forEach((item, key, mapObj) => {
                  arr.push(key);
              });
              this.props.dispatch({
                  type: 'userdgimndata/adduserDgimnDataFilter',
                  payload: {
                      UserId: this.state.userid,
                      DGIMNS: arr.join(','),
                      callback: () => {
                          if (this.props.requstresult === '1') {
                              message.success('关联排口成功', 3).then(() => this.props.complant());
                          } else {
                              message.error('添加失败');
                          }
                      }
                  },
              });
          } else {
              message.error('请选择排口');
          }
      }
      render() {
          return (
              <div>
                  <Card >
                      <Card>
                          <Form layout="inline">
                              <Row gutter={16} >
                                  <Col span={12} >
                                      <Search placeholder="请输入怕排口名称、DGIMN号进行查询"
                                          onSearch={
                                              (value) => {
                                                  this.setState({
                                                      testkey: value
                                                  });
                                                  this.props.dispatch({
                                                      type: 'userdgimndata/userDgimnDataFilter',
                                                      payload: {
                                                          pageIndex: 1,
                                                          pageSize: 10,
                                                          TestKey: value,
                                                          callback: () => {

                                                          }
                                                      },
                                                  });
                                              }
                                          }style={{ width: 400 }} />
                                  </Col>
                                  <Col span={12} >
                                      <Button onClick={() => {
                                          this.setState((state) => {
                                              // copy the map rather than modifying state.
                                              const selected = new Map(state.selected);

                                              const alldgimn = new Map(state.alldgimn);

                                              if (selected.size === alldgimn.size) {
                                                  selected.clear();
                                              } else {
                                                  this.props.alldgimn.map((item, key) => {
                                                      if (selected.get(item) === undefined) {
                                                          selected.set(item, true); // toggle
                                                      } else {
                                                      }
                                                  });
                                              }
                                              return {
                                                  selected
                                              };
                                          });
                                      }}>全选</Button>
                                  </Col>
                              </Row>
                          </Form>
                      </Card>
                      <List
                          grid={
                              {
                                  gutter: 16,
                                  xs: 1,
                                  sm: 2,
                                  md: 3,
                                  lg: 3,
                                  xl: 3,
                                  xxl: 3
                              }
                          }
                          loading={
                              this.props.effects['userinfo/userDgimnDataFilter']
                          }
                          dataSource={
                              this.props.list
                          }
                          pagination={
                              {
                                  showSizeChanger: true,
                                  showQuickJumper: true,
                                  'total': this.props.total,
                                  'pageSize': this.props.pageSize,
                                  'current': this.props.pageIndex,
                                  onChange: this.PonChange,
                                  onShowSizeChange: this.onShowSizeChange,
                                  pageSizeOptions: ['10', '20', '30', '40']
                              }
                          }
                          size="small"
                          renderItem={(item) => {
                              return (<List.Item >
                                  <Card style={{width: 330, height: 150}}>
                                      <Row gutter={1}>
                                          <Col span={2}>
                                              <Checkbox checked={this.state.selected.get(item.DGIMN)} onChange={(e) => {
                                                  this.setState((state) => {
                                                  // copy the map rather than modifying state.
                                                      const selected = new Map(state.selected);
                                                      if (selected.get(item.DGIMN) === undefined) {
                                                          selected.set(item.DGIMN, true); // toggle
                                                      } else {
                                                          selected.delete(item.DGIMN);
                                                          // selected.set(item.ID, !selected.get(item.ID)); // toggle
                                                      }
                                                      return {
                                                          selected
                                                      };
                                                  });
                                              }} />
                                          </Col>
                                          <Col span={2}><Icon type="home" theme="filled" /></Col>
                                          <Col span={16} >{item.pointName}</Col>
                                          <Col span={3} >{item.OutputType}</Col>
                                      </Row>
                                      <Row gutter={1}>
                                          <Col span={2} />
                                          <Col span={2} />
                                          <Col span={10} >设备编号:{item.DGIMN}</Col>
                                          <Col span={10} >厂商:{item.Manufacturer}</Col>
                                      </Row>
                                  </Card>
                              </List.Item>
                              );
                          }}
                      />
                  </Card>
              </div>
          );
      }
}
