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
            pointviewvisible: false,
            ID: '',
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
  deletepoint = (e) => {
      this.props.dispatch({
          type: 'pointinfo/deletepoint',
          payload: {
              pageIndex: this.props.pageIndex,
              pageSize: this.props.pageSize,
              DGIMNs: this.state.DGIMNs,
              DGIMN: this.state.selectedRowKeys,
              callback: () => {
                  this.setState({
                      selectedRowKeys: [],
                  });
              }
          },
      });
  }
  delete = (e) => {
      if (this.state.selectedRowKeys.length > 0) {
          confirm({
              title: '确定要删除吗?',
              okText: 'Yes',
              okType: 'danger',
              cancelText: 'No',
              onOk: () => this.deletepoint(),
              onCancel() {
                  console.log('Cancel');
              },
          });
      } else {
          message.error('请选择要删除的排口！');
      }
  };
  onRef1 = (ref) => {
      this.child = ref;
  }
  editpoint = () => {
      console.log(this.state.selectedRowKeys);
      if (this.state.selectedRowKeys.length === 1) {
          this.props.dispatch(routerRedux.push(`/sysmanage/PointDetail/${this.state.selectedRowKeys}`));
      }
      if (this.state.selectedRowKeys.length > 1) {
          message.warning('请选择一个排口进行编辑');
      }
      if (this.state.selectedRowKeys.length === 0) {
          message.warning('请选择排口');
      }
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
          fixed: 'left',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '排口编号',
          dataIndex: 'DGIMN',
          key: 'DGIMN',
          width: '180px',
          fixed: 'left',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '排放类型',
          dataIndex: 'OutputType',
          key: 'OutputType',
          width: '180px',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '污染物类型',
          dataIndex: 'pollutantTypeName',
          key: 'pollutantTypeName',
          width: '180px',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '责任人',
          dataIndex: 'linkman',
          key: 'linkman',
          width: '180px',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '电话号',
          dataIndex: 'mobilePhone',
          key: 'mobilePhone',
          width: '180px',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '排口经度',
          dataIndex: 'latitude',
          key: 'latitude',
          width: '180px',
          render: (text, record) => {
              return text;
          }
      },
      {
          title: '排口维度',
          dataIndex: 'longitude',
          key: 'longitude',
          width: '180px',
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
          render: (text, record) => {
              if (text === '1') {
                  return <span > <Tag color="#f50" >烧结</Tag > </span>;
              } else {
                  return <span > <Tag color="#2db7f5" >非烧结</Tag > </span>;
              }
          }
      },
      {
          title: '操作',
          fixed: 'right',
          width: '380px',
          render: (text, record) => (<Fragment >
              <a onClick={
                  () => this.props.dispatch(routerRedux.push(`/sysmanage/UserDetail/${record.key}`))
              } > 停产管理 </a>
              <Divider type="vertical" />
              <a onClick={
                  () => this.props.dispatch(routerRedux.push(`/sysmanage/UseStandardLibrary/${record.key}/${record.pointName}`))
              } > 监测标准 </a>
              <Divider type="vertical" />
              <a onClick={
                  () => this.props.dispatch(routerRedux.push(`/sysmanage/PointDetail/${record.key}/${record.pointName}`))
              } > 详情 </a>
              <Divider type="vertical" />
              <a onClick={
                  () => this.props.dispatch(routerRedux.push(`/sysmanage/VideoLists/${record.key}`))
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
                                          this.props.dispatch(routerRedux.push(`/sysmanage/PointDetail/null`));
                                      }
                                  } > 添加 </Button></Col >
                          <Col span={
                              1
                          } >
                              <Button type="primary"
                                  onClick={
                                      () => {
                                          this.editpoint();
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
                          x: 2400,
                          y: 800
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
