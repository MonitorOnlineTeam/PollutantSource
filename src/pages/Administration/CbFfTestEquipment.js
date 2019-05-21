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
    Divider,
    Menu,
    Icon,
    Radio,
    Popconfirm
} from 'antd';
import {
    routerRedux
} from 'dva/router';
import {
    connect
} from 'dva';
import MonitorContent from '../../components/MonitorContent/index';
import AddCbFfTestEquipment from '../../components/Administration/AddCbFfTestEquipment';
import styles from './index.less';
const RadioGroup = Radio.Group;
const Search = Input.Search;
const confirm = Modal.confirm;

@connect(({
    loading,
    administration
}) => ({
    loading:loading.effects['administration/GetCbFfTestEquipmentList'],
    cbfftestequipmentparam:administration.cbfftestequipmentparam
}))
export default class CbFfTestEquipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code:null,
            testItemName:null,
            visible:false,
            title:null,
            row:null
        };
    }
    //初始化
    componentWillMount() {
        this.reloaddata();
    }
    //页码变化
    onChange = (pageIndex, pageSize) => {
         let {cbfftestequipmentparam}=this.props;
         cbfftestequipmentparam={
             ...cbfftestequipmentparam,
             pageIndex:pageIndex,
             pageSize:pageSize
         }
         this.reloaddata(cbfftestequipmentparam);
    }
    //重新加载数据
    reloaddata=(cbfftestequipmentparam)=>{
      const {dispatch}=this.props;  
      if(cbfftestequipmentparam)
      {
          dispatch({
              type:"administration/updateState",
              payload:{
                cbfftestequipmentparam:cbfftestequipmentparam
              }
          })
      }
      this.props.dispatch({
          type:'administration/GetCbFfTestEquipmentList',
          payload:{
          }
      })
    }
    //删除
    deletepoint=(row)=>{
        const {dispatch}=this.props;
        dispatch({
            type:'administration/DelCbFfTestEquipment',
            payload:{
              id:row.ID,
            }
        })
    }
    //按照名字搜索
    serachName=(value)=>{
        let{cbfftestequipmentparam}=this.props;
        cbfftestequipmentparam={
           ...cbfftestequipmentparam,
           TestItemName:value,
       }
       debugger;
        this.reloaddata(cbfftestequipmentparam);
    }

    //关闭modal
    onCancel = () => {
        this.setState({
            visible: false
        });
    }
    //开启modal
    showModal=(row)=>{
        let title ="添加备品信息";
        if(row)
        {
            title="修改备品信息-"+row.TestItemName
        }
        this.setState({
            visible: true,
            title,
            row
        });
    }

 render() {
     const {cbfftestequipmentparam}=this.props;
     const columns = [{
                        title: '测试项目',
                        dataIndex: 'TestItemName',
                        key: 'TestItemName',
                        width: '20%',
                        align: 'left',
                    },
                    {
                        title: '生产厂商',
                        dataIndex: 'Manufacturer',
                        key: 'Manufacturer',
                        width: '20%',
                        align: 'left',
                    },
                    {
                        title: '设备型号',
                        dataIndex: 'Code',
                        key: 'Code',
                        width: '20%',
                        align: 'center',
                    },
                    {
                        title: '测试方法',
                        dataIndex: 'TestMethod',
                        key: 'TestMethod',
                        width: '20%',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        width: '20%',
                        align: 'center',
                        render: (text, record) => (<Fragment >
                            <a onClick={
                                () => this.showModal(record)
                            } > 编辑 </a>
                            <Divider type="vertical" />
                            <Popconfirm placement="left" title="确定要删除此信息吗？" onConfirm={() => this.deletepoint(record)} okText="是" cancelText="否">
                                   <a href="#" > 删除 </a>
                               </Popconfirm>
                        </Fragment >
                        ),
                    },
                ];
     return (
         <MonitorContent {...this.props} breadCrumbList={
                [
                    {Name:'系统管理',Url:''},
                    {Name:'手持设备管理',Url:''}
                ]
            }>
             <div className={styles.cardTitle}>
                 <Card bordered={false}>
                     <Form layout="inline" style={{marginBottom: 10}}>
                         <Row gutter={8} >
                             <Col span={24} >
                                 <Search placeholder="测试项目"
                                     onSearch={ this.serachName }
                                     style={{width: 200,marginRight:20}} />
                                     <Button type="primary" style={{marginLeft:10}}
                                     onClick={ ()=>this.showModal(null)} > 添加 </Button>
                             </Col >
                         </Row>
                     </Form>
                     <Table loading={this.props.loading}
                         columns={ columns }
                         className={styles.dataTable}
                         rowKey="ID"
                         dataSource={
                            cbfftestequipmentparam.data
                        }
                         size="small" 
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
                                 'total': cbfftestequipmentparam.total,
                                 'pageSize': cbfftestequipmentparam.pageSize,
                                 'current': cbfftestequipmentparam.pageIndex,
                                 onChange: this.onChange,
                                 onShowSizeChange: this.onChange,
                                 pageSizeOptions: ['20', '30', '40', '50']
                             }} />
                 </Card>

                            <Modal
                                footer={null}
                                destroyOnClose="true"
                                visible={this.state.visible}
                                title={this.state.title}
                                onCancel={this.onCancel}
                                width='50%'>
                                {
                                   <AddCbFfTestEquipment closemodal={this.onCancel} row={this.state.row}/>
                                }
                            </Modal>
             </div>
         </MonitorContent>
     );
 }
}
