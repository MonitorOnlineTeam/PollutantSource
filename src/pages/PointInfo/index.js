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
    Badge,
    Tag,
    Divider,
    Menu,
    Dropdown,
    Icon,
    Popconfirm
} from 'antd';
import {
    routerRedux
} from 'dva/router';
import {
    connect
} from 'dva';
import MonitorContent from '../../components/MonitorContent/index';
import styles from './index.less';

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
              pageIndex: pageIndex === undefined ? 1 : pageIndex,
              pageSize: pageSize === undefined ? 20 : pageSize,
              DGIMNs: this.state.DGIMNs
          },
      });
  }
  onChange = (pageIndex, pageSize) => {
      this.props.dispatch({
          type: 'pointinfo/getpointlist',
          payload: {
              pageIndex: pageIndex === undefined ? 1 : pageIndex,
              pageSize: pageSize === undefined ? 20 : pageSize,
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
             this.props.dispatch(routerRedux.push(`/sysmanage/usestandardlibrary/${id}/${name}`));
             break;
         case '2':
             this.props.dispatch(routerRedux.push(`/sysmanage/stopmanagement/${id}/${name}`));
             break;
         case '3':
             this.props.dispatch(routerRedux.push(`/sysmanage/videolists/${id}/${name}`));
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
         align: 'left',
         render: (text, record) => {
             return text;
         }
     },
     {
         title: '排口编号',
         dataIndex: 'DGIMN',
         key: 'DGIMN',
         width: '10%',
         align: 'left',
         render: (text, record) => {
             return text;
         }
     },
     {
         title: '排放类型',
         dataIndex: 'OutputType',
         key: 'OutputType',
         width: '10%',
         align: 'center',
         render: (text, record) => {
             if (text === '出口') {
                 return <span > <Badge status="error"
                     text="出口" /> </span>;
             }
             return <span > <Badge status="warning"
                 text="入口" /> </span>;
         }
     },
     {
         title: '污染物类型',
         dataIndex: 'pollutantTypeName',
         key: 'pollutantTypeName',
         width: '10%',
         align: 'center',
         render: (text, record) => {
             return text;
         }
     },
     {
         title: '责任人',
         dataIndex: 'linkman',
         key: 'linkman',
         width: '10%',
         align: 'center',
         render: (text, record) => {
             return text;
         }
     },
     {
         title: '电话号',
         dataIndex: 'mobilePhone',
         key: 'mobilePhone',
         width: '10%',
         align: 'left',
         render: (text, record) => {
             return text;
         }
     },
     {
         title: '是否烧结',
         dataIndex: 'IsSj',
         key: 'IsSj',
         width: '10%',
         align: 'center',
         render: (text, record) => {
             if (text === '1') {
                 return <span > <Badge status="success" text="是" /></span>;
             }
             return <span > <Badge status="default" text="否" /></span>;
         }
     },
     {
         title: '操作',
         width: '15%',
         align: 'left',
         render: (text, record) => (<Fragment >
             <a onClick={
                 () => this.props.dispatch(routerRedux.push(`/sysmanage/pointdetail/${record.key}`))
             } > 编辑 </a>
             <Divider type="vertical" />
             <a onClick={
                 () => this.props.dispatch(routerRedux.push(`/sysmanage/pointdetail/${record.key}/${record.pointName}`))
             } > 详情 </a>
             <Divider type="vertical" />
               <Popconfirm placement="left" title="确定要删除此标准下所有数据吗？" onConfirm={() => this.deletepoint(record.key)} okText="是" cancelText="否">
                    <a href="#" > 删除 </a>
                </Popconfirm>
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
         <MonitorContent>
             <div className={styles.cardTitle}>
                 <Card bordered={false}>
                     <Form layout="inline" style={{marginBottom: 10}}>
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
                     <Table loading={this.props.effects['pointinfo/getpointlist']}
                         columns={
                             columns
                         }
                         dataSource={
                             this.props.requstresult === '1' ? this.props.list : null
                         }
                         className={styles.dataTable}
                         size="small"// small middle
                         scroll={{ y: 'calc(100vh - 330px)' }}
                         rowClassName={
                             (record, index, indent) => {
                                 if (index === 0) {
                                     return;
                                 }
                                 if (index % 2 !== 0) {
                                     return 'light';
                                 }
                             }
                         }
                         pagination={
                             {
                                 showSizeChanger: true,
                                 showQuickJumper: true,
                                 size: 'small',
                                 'total': this.props.total,
                                 'pageSize': this.props.pageSize,
                                 'current': this.props.pageIndex,
                                 onChange: this.onChange,
                                 onShowSizeChange: this.onShowSizeChange,
                                 pageSizeOptions: ['20', '30', '40', '50']
                             }} />
                 </Card>
             </div>
         </MonitorContent>
     );
 }
}
