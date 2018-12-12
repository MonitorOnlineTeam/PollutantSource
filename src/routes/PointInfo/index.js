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
    Menu,
    Dropdown,
    Icon
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
            DGIMNs: '',
            pointviewvisible: false,
            ID: '',
        };
    }
    componentWillMount() {
        this.onChange();
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
  handleOK = (e) => {
      this.addForm.handleSubmit();
  }
  deletepoint = (dgimn) => {
      this.props.dispatch({
          type: 'pointinfo/deletepoint',
          payload: {
              pageIndex: this.props.pageIndex,
              pageSize: this.props.pageSize,
              DGIMNs: this.state.DGIMNs,
              DGIMN: dgimn,
              callback: () => {
              }
          },
      });
  }
  delete = (dgimn) => {
      confirm({
          title: '确定要删除吗?',
          okText: '是',
          okType: 'danger',
          cancelText: '否',
          onOk: () => this.deletepoint(dgimn),
          onCancel() {
              console.log('Cancel');
          },
      });
  };
  onRef1 = (ref) => {
      this.child = ref;
  }
  AddData = () => {
      this.child.AddDataFilter();
  }
 onMenu = (key,id,name) => {
     switch (key) {
         case '1':
             this.props.dispatch(routerRedux.push(`/sysmanage/UseStandardLibrary/${id}/${name}`));
             break;
         case '2':
             break;
         case '3':
             this.props.dispatch(routerRedux.push(`/sysmanage/VideoLists/${id}`));
             break;
         case '4':
             break;
         default:
             break;
     }
 }
 render() {
     const menu = (id,name) => (
         <Menu onClick={(e) => {
             this.onMenu.bind()(e.key,id,name);
         }}>
             <Menu.Item key="1"><Icon type="bars" />监测标准</Menu.Item>
             <Menu.Item key="2"><Icon type="tool" />停产管理</Menu.Item>
             <Menu.Item key="3"><Icon type="youtube" />视频管理</Menu.Item>
             <Menu.Item key="4"><Icon type="home" />进入排口</Menu.Item>
         </Menu>
     );
     const columns = [{
         title: '排口名称',
         dataIndex: 'pointName',
         key: 'pointName',
         width: '20%',
         render: (text, record) => {
             return text;
         }
     },
     {
         title: '排口编号',
         dataIndex: 'DGIMN',
         key: 'DGIMN',
         width: '10%',
         render: (text, record) => {
             return text;
         }
     },
     {
         title: '排放类型',
         dataIndex: 'OutputType',
         key: 'OutputType',
         width: '10%',
         render: (text, record) => {
             return text;
         }
     },
     {
         title: '污染物类型',
         dataIndex: 'pollutantTypeName',
         key: 'pollutantTypeName',
         width: '10%',
         render: (text, record) => {
             return text;
         }
     },
     {
         title: '责任人',
         dataIndex: 'linkman',
         key: 'linkman',
         width: '10%',
         render: (text, record) => {
             return text;
         }
     },
     {
         title: '电话号',
         dataIndex: 'mobilePhone',
         key: 'mobilePhone',
         width: '10%',
         render: (text, record) => {
             return text;
         }
     },
     {
         title: '是否烧结',
         dataIndex: 'IsSj',
         key: 'IsSj',
         width: '10%',
         render: (text, record) => {
             if (text === '1') {
                 return <span > <Tag color="#f50" >烧结</Tag > </span>;
             }
             return <span > <Tag color="#2db7f5" >非烧结</Tag > </span>;
         }
     },
     {
         title: '操作',
         width: '20%',
         render: (text, record) => (<Fragment >
             <a onClick={
                 () => this.props.dispatch(routerRedux.push(`/sysmanage/PointDetail/${record.key}`))
             } > 编辑 </a>
             <Divider type="vertical" />
             <a onClick={
                 () => this.props.dispatch(routerRedux.push(`/sysmanage/PointDetail/${record.key}/${record.pointName}`))
             } > 详情 </a>
             <Divider type="vertical" />
             <a onClick={
                 () => this.delete(record.key)
             } > 删除 </a>
             <Divider type="vertical" />
             <Dropdown overlay={menu(record.key,record.pointName)} >
                 <a>
                   更多 <Icon type="down" />
                 </a>
             </Dropdown>
         </Fragment >
         ),
     },
     ];
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
                     </Row>
                 </Form>
             </Card>
             <Table loading={this.props.effects['pointinfo/getpointlist']}
                 columns={
                     columns
                 }
                 dataSource={
                     this.props.requstresult === '1' ? this.props.list : null
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
                         pageSizeOptions: ['10', '20', '30', '40']
                     }} />
         </Card>
     );
 }
}
