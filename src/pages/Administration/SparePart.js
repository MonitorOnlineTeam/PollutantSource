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
import AddSparePart from '../../components/Administration/AddSparePart';
import styles from './index.less';
const RadioGroup = Radio.Group;
const Search = Input.Search;
const confirm = Modal.confirm;

@connect(({
    loading,
    administration
}) => ({
    loading:loading.effects['administration/GetSparePartList'],
    // list: administration.spareparts,
    // total: administration.total,
    // pageIndex:administration.pageIndex,
    // pageSize:administration.pageSize,
    sparepartsparam:administration.sparepartsparam
}))
export default class SparePart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parttype:"0",
            code:null,
            partName:null,
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
         let {sparepartsparam}=this.props;
         sparepartsparam={
             ...sparepartsparam,
             pageIndex:pageIndex,
             pageSize:pageSize
         }
         this.reloaddata(sparepartsparam);
    }
    //重新加载数据
    reloaddata=(sparepartsparam)=>{
      const {dispatch}=this.props;
      if(sparepartsparam)
      {
          dispatch({
             type:"administration/updateState",
             payload:{
                sparepartsparam:sparepartsparam
             }
          })
      }
     dispatch({
          type:'administration/GetSparePartList',
          payload:{
          }
      })
    }
    //删除
    deletepoint=(row)=>{
        const {dispatch}=this.props;
        dispatch({
            type:'administration/DeleteSparePartsRecord',
            payload:{
              id:row.ID,
            }
        })
    }
    //按照名字搜索
    serachName=(value)=>{
        let {sparepartsparam}=this.props;
        sparepartsparam={
            ...sparepartsparam,
            partName:value
        }
        this.reloaddata(sparepartsparam);
    }
    //类型搜索
    onRadioChange=(value)=>{
        let {sparepartsparam}=this.props;
        sparepartsparam={
            ...sparepartsparam,
            parttype:value
        }
        this.reloaddata(sparepartsparam);
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
            title="修改备品信息-"+row.PartName
        }
        this.setState({
            visible: true,
            title,
            row
        });
    }

 render() {
     const menu = (id,name) => (
         <Menu onClick={(e) => {
             this.onMenu.bind()(e.key,id,name);
         }}>
             <Menu.Item key="1"><Icon type="bars" />监测标准</Menu.Item>
             <Menu.Item key="2"><Icon type="tool" />停产管理</Menu.Item>
             <Menu.Item key="3"><Icon type="youtube" />视频管理</Menu.Item>
             <Menu.Item key="4"><Icon type="home" />进入监测点</Menu.Item>
         </Menu>
     );
     const {sparepartsparam}=this.props;
     const { parttype }=this.state;
     const columns = [{
                        title: '备件名称',
                        dataIndex: 'PartName',
                        key: 'PartName',
                        width: '20%',
                        align: 'left',
                    },
                    {
                        title: '备件类型',
                        dataIndex: 'PartType',
                        key: 'PartType',
                        width: '20%',
                        align: 'left',
                        render: (text, record) => {
                            if(text==1)
                            {
                                return '易耗品'
                            }
                            else
                            {
                                return '备件'
                            }
                        }
                    },
                    {
                        title: '设备型号',
                        dataIndex: 'Code',
                        key: 'Code',
                        width: '20%',
                        align: 'center',
                    },
                    {
                        title: '单位',
                        dataIndex: 'Unit',
                        key: 'Unit',
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
                    {Name:'备品备件管理',Url:''}
                ]
            }>
             <div className={styles.cardTitle}>
                 <Card bordered={false}>
                     <Form layout="inline" style={{marginBottom: 10}}>
                         <Row gutter={8} >
                             <Col span={24} >
                                 <Search placeholder="备品名称"
                                     onSearch={ this.serachName }
                                     style={{width: 200,marginRight:20}} />
                                    <RadioGroup value={parttype} onChange={this.onRadioChange} >
                                        <Radio value="0">全部</Radio>
                                        <Radio value="1">易耗品</Radio>
                                        <Radio value="2">备件</Radio>
                                    </RadioGroup>
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
                            sparepartsparam.data
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
                                 'total': sparepartsparam.total,
                                 'pageSize': sparepartsparam.pageSize,
                                 'current': sparepartsparam.pageIndex,
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
                                   <AddSparePart closemodal={this.onCancel} row={this.state.row}/>
                                }
                            </Modal>
             </div>
         </MonitorContent>
     );
 }
}
