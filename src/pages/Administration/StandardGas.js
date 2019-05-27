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
    
    standardgasparam:administration.standardgasparam
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
        this.reloaddata();
    }
    //页码变化
    onChange = (pageIndex, pageSize) => {
         let {standardgasparam}=this.props;
         standardgasparam={
             ...standardgasparam,
             pageIndex:pageIndex,
             pageSize:pageSize
         }
         this.reloaddata(standardgasparam);
    }
    //重新加载数据
    reloaddata=(standardgasparam)=>{
        const {dispatch}=this.props;
        if(standardgasparam)
        {
            dispatch({
                type:"administration/updateState",
                payload:{
                    standardgasparam:standardgasparam
                }
            })
        }
         dispatch({
            type:'administration/GetStandardGasList',
            payload:{
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
        let {standardgasparam}=this.props;
        standardgasparam={
            ...standardgasparam,
            GasName:value
        }
        this.reloaddata(standardgasparam);
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
             <Menu.Item key="4"><Icon type="home" />进入监测点</Menu.Item>
         </Menu>
     );
     const {standardgasparam}=this.props;
     const columns = [{
                        title: '标气名称',
                        dataIndex: 'StandardGasName',
                        key: 'StandardGasName',
                        width: '25%',
                        align: 'left',
                    },
                    {
                        title: '生产厂家',
                        dataIndex: 'Manufacturer',
                        key: 'Manufacturer',
                        width: '25%',
                        align: 'left',
                    },
                    {
                        title: '单位',
                        dataIndex: 'Unit',
                        key: 'Unit',
                        width: '25%',
                        align: 'left',
                    },
                    {
                        title: '操作',
                        width: '25%',
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
                    {Name:'首页',Url:''},
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
                            standardgasparam.data
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
                                 'total': standardgasparam.total,
                                 'pageSize': standardgasparam.pageSize,
                                 'current': standardgasparam.pageIndex,
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
