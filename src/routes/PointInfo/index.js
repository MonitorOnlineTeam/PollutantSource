import React, {
    Component,
    Fragment
} from 'react';
import {
    Button,
    Input,
    Card,
    Row,
    Col,
    Table,
    Form,
    Modal,
    message,
    Tag,
    Divider,
} from 'antd';
import {
    routerRedux
} from 'dva/router';
import {
    connect
} from 'dva';
const Search = Input.Search;
const confirm = Modal.confirm;

@connect(({
    loading,
    pointinfo
}) => ({
    ...loading,
    list: pointinfo.list,
    total: pointinfo.total,
    pageSize: pointinfo.pageSize,
    pageIndex: pointinfo.pageIndex,
    requstresult: pointinfo.requstresult,
}))
export default class pointlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            type: '',
            title: '',
            width: 400,
            selectedRowKeys: [],
            DGIMNs: '',
        };
    }
    componentWillMount() {
        this.onChange();
    }
  onSelectedRowKeysChange = (selectedRowKeys) => {
      this.setState({
          selectedRowKeys
      });
  }
  onShowSizeChange = (pageIndex, pageSize) => {
      this.props.dispatch({
          type: 'pointinfo/getpointlist',
          payload: {
              pageIndex: pageIndex,
              pageSize: pageSize,
              DGIMNs: this.state.DGIMNs
          },
      });
  }
  onChange = (pageIndex, pageSize) => {
      this.props.dispatch({
          type: 'pointinfo/getpointlist',
          payload: {
              pageIndex: pageIndex,
              pageSize: pageSize,
              DGIMNs: this.state.DGIMNs
          },
      });
  }
  onSelectChange = (selectedRowKeys) => {
      this.setState({
          selectedRowKeys
      });
  }
  handleOK = (e) => {
      this.addForm.handleSubmit();
  }
  deleteuserbyid = (e) => {
      this.props.dispatch({
          type: 'userinfo/deleteuser',
          payload: {
              pageIndex: this.props.pageIndex,
              pageSize: this.props.pageSize,
              DeleteMark: this.props.DeleteMark,
              UserAccount: this.props.UserAccount,
              UserId: this.state.selectedRowKeys,
          },
      });
  }
  delete = (e) => {
      if (this.state.selectedRowKeys.length > 0) {
          confirm({
              title: '确定要删除吗?',
              // content: 'Some descriptions',
              okText: 'Yes',
              okType: 'danger',
              cancelText: 'No',
              onOk: () => this.deleteuserbyid(),
              onCancel() {
                  console.log('Cancel');
              },
          });
      } else {
          message.error('请选择要删除的数据！');
      }
  };
  IsEnabled = (type, record) => {
      this.props.dispatch({
          type: 'userinfo/enableduser',
          payload: {
              pageIndex: this.props.pageIndex,
              pageSize: this.props.pageSize,
              DeleteMark: this.props.DeleteMark,
              UserAccount: this.props.UserAccount,
              UserId: record.User_ID,
              Enalbe: type
          },
      });
  };
  onRef1 = (ref) => {
      this.child = ref;
  }
  AddCompletion = () => {
      this.setState({
          DataFiltervisible: false,
          type: 'datafilter',
          title: '数据过滤',
          width: 1130
      });
  }
  AddData = () => {
      this.child.AddDataFilter();
  }
  render() {
      const columns = [{
          title: '排口名称',
          dataIndex: 'pointName',
          key: 'pointName',
          width: '150px',
          sorter: (a, b) => a.pointName.length - b.pointName.length,
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '排口编号',
          dataIndex: 'DGIMN',
          key: 'DGIMN',
          width: '180px',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '设备厂商',
          dataIndex: 'Device',
          key: 'Device',
          width: '180px',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '排口类型',
          dataIndex: 'OutputType',
          key: 'OutputType',
          width: '180px',
          sorter: (a, b) => a.OutputType.length - b.OutputType.length,
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '排口直径(M)',
          dataIndex: 'OutputDiameter',
          key: 'OutputDiameter',
          width: '180px',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '排口高度(M)',
          dataIndex: 'OutputHigh',
          key: 'OutputHigh',
          width: '180px',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '是否烧结',
          dataIndex: 'IsSj',
          key: 'IsSj',
          width: '180px',
          sorter: (a, b) => a.IsSj.length - b.IsSj.length,
          render: (text, record) => {
              if (text === '1') {
                  return <span > <Tag color="red" >烧结</Tag > </span>;
              } else {
                  return <span > <Tag color="blue" >非烧结</Tag > </span>;
              }
          }
      },
      {
          title: '操作',
          
          render: (text, record) => (<Fragment >
              <a onClick={
                  () => this.props.dispatch(routerRedux.push(`/monitor/sysmanage/UserDetail/${record.key}`))
              } > 停产管理 </a>
              <Divider type="vertical" />
              <a onClick={
                  () => this.props.dispatch(routerRedux.push(`/monitor/sysmanage/UserDetail/${record.key}`))
              } > 监测标准 </a>
              <Divider type="vertical" />
              <a onClick={
                  () => this.props.dispatch(routerRedux.push(`/monitor/sysmanage/UserDetail/${record.key}`))
              } > 详情 </a>
              <Divider type="vertical" />
              <a onClick={
                  () => this.props.dispatch(routerRedux.push(`/monitor/sysmanage/UserDetail/${record.key}`))
              } > 视频管理 </a>
          </Fragment >
          ),
      },
      ];
      const {
          selectedRowKeys
      } = this.state;
      const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectedRowKeysChange,
      };

      return (
          <Card bordered={false}>
              <Card >
                  <Form layout="inline" >
                      <Row gutter={8} >
                          <Col span={3} >
                              <Search placeholder="排口名称/编号"
                                  onSearch={(value) => {
                                      this.setState({
                                          DGIMNs: value
                                      });
                                      this.props.dispatch({
                                          type: 'pointinfo/getpointlist',
                                          payload: {
                                              pageIndex: 1,
                                              pageSize: 10,
                                              DGIMNs: value
                                          },
                                      });
                                  }
                                  }
                                  style={{width: 200}} />
                          </Col >
                          <Col span={1} >
                              <Button type="primary"
                                  onClick={
                                      () => {
                                          this.props.dispatch(routerRedux.push(`/monitor/sysmanage/PointDetail/null`));
                                      }
                                  } > 添加 </Button></Col >
                          <Col span={
                              1
                          } >
                              <Button type="primary"
                                  onClick={
                                      () => {
                                          this.props.dispatch(routerRedux.push(`/monitor/sysmanage/UserDetail/null`));
                                      }
                                  } > 编辑 </Button></Col >
                          <Col span={1} >
                              <Button type="danger" onClick={this.delete} > 删除 </Button></Col >
                          <Col span={1} >
                              <Button type="primary"
                                  onClick={
                                      () => {
                                          if (this.state.selectedRowKeys.length === 1) {
                                              this.setState({
                                                  DataFiltervisible: true,
                                                  type: 'datafilter',
                                                  title: '数据过滤',
                                                  width: 1130
                                              });
                                          }
                                          if (this.state.selectedRowKeys.length > 1) {
                                              message.warning('请选择一位用户');
                                          }
                                          if (this.state.selectedRowKeys.length === 0) {
                                              message.warning('请选择用户');
                                          }
                                      }
                                  } >进入排口 </Button>
                          </Col >
                      </Row>
                  </Form>
              </Card>
              <Table loading={this.props.effects['pointinfo/getpointlist']}
                  rowSelection={
                      rowSelection
                  }
                  columns={
                      columns
                  }
                  dataSource={
                      this.props.requstresult === '1' ? this.props.list : null
                  }
                  scroll={
                      {
                          y: 'calc(100vh - 455px)'
                      }
                  }
                  pagination={
                      {
                          showSizeChanger: true,
                          showQuickJumper: true,
                          'total': this.props.total,
                          'pageSize': this.props.pageSize,
                          'current': this.props.pageIndex,
                          onChange: this.onChange,
                          onShowSizeChange: this.onShowSizeChange,
                          pageSizeOptions: ['5', '10', '20', '30', '40']
                      }} />
          </Card>
      );
  }
}
