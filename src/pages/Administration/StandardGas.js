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
    Popconfirm
} from 'antd';
import {
    routerRedux
} from 'dva/router';
import {
    connect
} from 'dva';
import MonitorContent from '../../components/MonitorContent/index';
import AddStandardGas from '../../components/Administration/AddStandardGas';
import styles from './index.less';

const Search = Input.Search;
const confirm = Modal.confirm;

@connect(({
    loading,
    administration
}) => ({
    loading:loading.effects['administration/GetStandardGasList'],
    list: administration.standardgas,
    total: administration.total,
    pageIndex:administration.pageIndex,
    pageSize:administration.pageSize,
}))
export default class StandardGas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code:null,
            gasName:null,
            visible:false,
            title:null,
            row:null
        };
    }
    //初始化
    componentWillMount() {
        const {gasName,code}=this.state;
        const {pageIndex, pageSize }=this.props;
        this.reloaddata(gasName,code,pageIndex,pageSize);
    }
    //页码变化
    onChange = (pageIndex, pageSize) => {
        const {gasName,code}=this.state;
         this.reloaddata(gasName,code,pageIndex,pageSize);
    }
    //重新加载数据
    reloaddata=(gasName,code,pageIndex,pageSize)=>{
      this.props.dispatch({
          type:'administration/GetStandardGasList',
          payload:{
          
            code:code,
            gasName:gasName,
            pageIndex: pageIndex,
            pageSize: pageSize 
          }
      })
    }
    //删除数据
    deletepoint=(row)=>{
        const {dispatch}=this.props;
        dispatch({
            type:'administration/DelStandardGas',
            payload:{
              id:row.ID,
            }
        })
    }
    //搜索列表
    serachName=(value)=>{
        const {code}=this.state;
        const {pageIndex, pageSize,dispatch }=this.props;
        this.setState({
            gasName:value
        });
        this.reloaddata(value,code,pageIndex,pageSize);
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
            title="修改备品信息-"+row.StandardGasName
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
             <Menu.Item key="4"><Icon type="home" />进入排口</Menu.Item>
         </Menu>
     );
     const {pageSize,pageIndex,total,list}=this.props;
     console.log(list);
     const columns = [{
                        title: '标气名称',
                        dataIndex: 'StandardGasName',
                        key: 'StandardGasName',
                        width: '33%',
                        align: 'left',
                    },
                    {
                        title: '生产厂家',
                        dataIndex: 'Manufacturer',
                        key: 'Manufacturer',
                        width: '33%',
                        align: 'left',
                    },
                    {
                        title: '操作',
                        width: '33%',
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
                    {Name:'首页',Url:'/'},
                    {Name:'系统管理',Url:''},
                    {Name:'标气管理',Url:''}
                ]
            }>
             <div className={styles.cardTitle}>
                 <Card bordered={false}>
                     <Form layout="inline" style={{marginBottom: 10}}>
                         <Row gutter={8} >
                             <Col span={24} >
                                 <Search placeholder="标气名称"
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
                            this.props.list
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
                                 'total': total,
                                 'pageSize': pageSize,
                                 'current': pageIndex,
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
                                   <AddStandardGas closemodal={this.onCancel} row={this.state.row}/>
                                }
                            </Modal>
             </div>
         </MonitorContent>
     );
 }
}
