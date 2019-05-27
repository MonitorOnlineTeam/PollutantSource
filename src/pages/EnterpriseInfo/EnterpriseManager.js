

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
    Popconfirm,
    Spin,
    message
} from 'antd';
import {
    routerRedux
} from 'dva/router';
import {
    connect
} from 'dva';
import MonitorContent from '../../components/MonitorContent/index';
import AddEnterprise from '../../components/EnterpriseInfo/AddEnterprise';
import styles from './EnterpriseManager.less';

const RadioGroup = Radio.Group;
const Search = Input.Search;
const confirm = Modal.confirm;
const pageUrl = {
    updateState: 'enterprisemanagermodel/updateState',
    getData: 'enterprisemanagermodel/getEnterprisePageList',
    deleteEnterprise:'enterprisemanagermodel/deleteEnterprise',
    getAllPointQRCoderZip:'enterprisemanagermodel/getAllPointQRCoderZip'
};
@connect(({
    loading,
    enterprisemanagermodel
}) => ({
    loading:loading.effects[pageUrl.getData],
    loadingDeleteEnterprise:loading.effects[pageUrl.deleteEnterprise],
    loadingAllPointQRCoderZip:loading.effects[pageUrl.getAllPointQRCoderZip],
    enterpriseList: enterprisemanagermodel.enterpriseList,
    pageIndex:enterprisemanagermodel.pageIndex,
    pageSize:enterprisemanagermodel.pageSize,
    total:enterprisemanagermodel.total,
    isSuccess:enterprisemanagermodel.isSuccess,
    zipUrl:enterprisemanagermodel.zipUrl
}))
class EnterpriseManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            title:null,
            row:null
        };
    }

    //初始化
    componentWillMount() {
        this.updateState({
            isSuccess: false
        });
        this.getTableData(1);
    }

    updateState = (payload) => {
        this.props.dispatch({
            type: pageUrl.updateState,
            payload: payload,
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.updateState({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize
        });
        this.getTableData(pagination.current);
    }

    //重新加载数据
    getTableData = (pageIndex) => {
        this.props.dispatch({
            type: pageUrl.getData,
            payload: {
                pageIndex: pageIndex||1,
            },
        });
    }

    //删除
    deletepoint=(row)=>{
        const {dispatch}=this.props;
        this.updateState({
            isSuccess: false
        });
        dispatch({
            type:pageUrl.deleteEnterprise,
            payload:{
                entCode:row.EntCode,
                callback:(response)=>{
                    if(response.IsSuccess) {
                        message.success("操作成功");
                        this.getTableData(1);
                    }else {
                        message.error(response.Message);
                    }
                    // if(this.props.isSuccess) {

                    // }
                }
            }
        });
    }

    getAllPointQRCoderZip =(row)=>{
        const {dispatch,zipUrl}=this.props;
        dispatch({
            type:pageUrl.getAllPointQRCoderZip,
            payload:{
                entCode:row.EntCode,
                callback:(item)=>{
                    if(item&&item.IsSuccess) {
                        message.success("下载成功");
                        // console.log(item);
                        // debugger;
                        // window.location.href=item.Data;
                        window.open(item.Data, '_blank');
                    }else {
                        message.error(item.Message||'服务器内部错误！');
                    }
                }
            }
        });
    }

    queryPoint =(row)=>{
        this.props.dispatch(routerRedux.push(`/sysmanage/pointinfo/${row.EntCode}`));
    };

    //按照名字搜索
    serachName=(value)=>{
        this.updateState({
            enterpriseName: value
        });

        this.getTableData(1);
    }

    //关闭modal
    onCancel = (type) => {
        if(type===1) {
            this.getTableData(1);
        }
        this.setState({
            visible: false
        });
    }

    //开启modal
    showModal=(row)=>{
        let title ="新增企业信息";
        if(row) {
            title=`修改企业信息`;
        }
        this.setState({
            visible: true,
            title,
            row
        });
    }

    render() {
        const {pageSize,pageIndex,total,enterpriseList} = this.props;
        const columns = [{
            title: '企业名称',
            dataIndex: 'EntName',
            key: 'EntName',
            width: 'null',
            align: 'left',
        },
        {
            title: '企业地址',
            dataIndex: 'EntAddress',
            key: 'EntAddress',
            width: 'null',
            align: 'left',
        },
        {
            title: '企业法人',
            dataIndex: 'CorporationName',
            key: 'CorporationName',
            width: '10%',
            align: 'center',
        },
        {
            title: '环保负责人',
            dataIndex: 'EnvironmentPrincipal',
            key: 'EnvironmentPrincipal',
            width: '10%',
            align: 'center',
        },
        {
            title: '办公电话',
            dataIndex: 'OfficePhone',
            key: 'OfficePhone',
            width: '20%',
            align: 'center',
        },
        {
            title: '操作',
            width: '20%',
            align: 'center',
            render: (text, record) => (<Fragment>
                <a onClick={
                    () =>this.props.dispatch(routerRedux.push(`/EnterpriseManager/${record.EntCode}`)) //this.showModal(record)
                }
                > 编辑
                </a>
                <Divider type="vertical" />
                <Popconfirm placement="left" title="确定要删除此信息吗？" onConfirm={() => this.deletepoint(record)} okText="是" cancelText="否">
                    <a href="#"> 删除 </a>
                </Popconfirm>
                <Divider type="vertical" />
                <a onClick={
                    () => {
                        this.getAllPointQRCoderZip(record);
                    }
                }
                > 生成二维码
                </a>
                <Divider type="vertical" />
                <a onClick={
                    () => {
                        this.queryPoint(record);
                    }
                }
                > 排口管理
                </a>
            </Fragment>
            ),
        },
        ];

        if(this.props.loadingAllPointQRCoderZip){
            return (<Spin
                style={{ width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center' }}
                size="large"
            />);
        }
        return (
            <MonitorContent
                {...this.props}
                breadCrumbList={
                    [
                        // {Name:'首页',Url:''},
                        // {Name:'系统管理',Url:''},
                        {Name:'企业管理',Url:''}
                    ]
                }
            >
                <div className={styles.cardTitle}>
                    <Card bordered={false}>
                        <Form layout="inline" style={{marginBottom: 10}}>
                            <Row gutter={8}>
                                <Col span={24}>
                                    <Search
                                        placeholder="企业名称"
                                        onSearch={this.serachName}
                                        style={{width: 200,marginRight:20}}
                                    />
                                    <Button
                                        type="primary"
                                        style={{marginLeft:10}}
                                        onClick={()=>this.props.dispatch(routerRedux.push(`/EnterpriseManager/add`))}//this.showModal(null)}
                                    > 添加
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        <Table
                            loading={this.props.loading}
                            columns={columns}
                            onChange={this.handleTableChange}
                            className={styles.dataTable}
                            rowKey="ID"
                            dataSource={
                                enterpriseList
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
                            pagination={{
                                showSizeChanger: true,
                                showQuickJumper: true,
                                sorter: true,
                                'total': total,
                                'pageSize': pageSize,
                                'current': pageIndex,
                                pageSizeOptions: ['10', '20', '30', '40', '50']
                            }}
                        />
                    </Card>

                    <Modal
                        footer={null}
                        destroyOnClose="true"
                        visible={this.state.visible}
                        title={this.state.title}
                        onCancel={this.onCancel}
                        width="50%"
                    >
                        {
                            <AddEnterprise closemodal={this.onCancel} row={this.state.row} />
                        }
                    </Modal>
                </div>
            </MonitorContent>
        );
    }
}

export default EnterpriseManager;
