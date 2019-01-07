import React, { Component,Fragment } from 'react';
import { Button, Table, Spin, Modal, Divider, Popconfirm,Icon,Card,Form,Row,Col } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import moment from 'moment';
import Addepinfo from './addepinfo.js';
@connect(({baseinfo, loading}) => ({
    isloading: loading.effects['baseinfo/queryeeplist'],
    pdlist: baseinfo.pdlist,
    total: baseinfo.total,
    pageIndex:baseinfo.pageIndex,
    pageSize:baseinfo.pageSize,
}))
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            row: null,
            title: null

        };
    }
    //初始化
    componentWillMount() {
        const {pageIndex, pageSize }=this.props;
        this.reloaddata(pageIndex,pageSize);
    }
    //页码变化
    onChange = (pageIndex, pageSize) => {
        this.reloaddata(pageIndex,pageSize);
    }
    //重新加载数据
    reloaddata=(pageIndex,pageSize)=>{
    this.props.dispatch({
        type:'baseinfo/queryeeplist',
        payload:{
            pageIndex: pageIndex,
            pageSize: pageSize 
        }
    })}

    buttonback = () => this.props.history.goBack(-1);
    showModal = (row) => {
        let title ="添加排污许可证信息";
        if(row)
        {
            title='修改排污许可证信息'+row.EPName
        }
        this.setState({
            visible: true,
            row,
            title
        });
    };
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };
    //删除
    deletebutton = (record) => {
        this.props.dispatch({
            type: 'baseinfo/querydelep',
            payload: {
                code: record.EPID,
            },
        });
    };

    render() {
        const {pageSize,pageIndex,total,pdlist,isloading}=this.props;
        const columns = [{
            title: '名称',
            dataIndex: 'EPName',
            key: 'EPName',
            width: '20%',
            align: 'left',
        },
        {
            title: '编号',
            dataIndex: 'EPNum',
            key: 'EPNum',
            width: '15%',
            align: 'left',
        },
        {
            title: '状态',
            dataIndex: 'Status',
            key: 'Status',
            width: '15%',
            align: 'center',
            render: (text, record) =>{
               if(text)
               {
                  return "正在使用"
               }
               return "已过期"
            }
        },
        {
            title: '有效时间',
            dataIndex: 'BeginTime',
            key: 'BeginTime',
            width: '20%',
            align: 'center',
            render: (text, record) =>{
                return (moment(record.BeginTime).format('YYYY-MM-DD') + ' - ' + moment(record.EndTime).format('YYYY-MM-DD'))
            }
        },
        {
            title: '描述',
            dataIndex: 'Describe',
            key: 'Describe',
            width: '15%',
            align: 'center',
        },
        // {
        //     title: '附件',
        //     dataIndex: 'File',
        //     key: 'File',
        //     width: '20%',
        //     align: 'center',
        //     render: (text, record) =>{
        //          if(text)
        //          {
        //             return (<Icon style={{cursor: 'pointer'}} type="file-text" />);
        //          }
        //          return '暂未上传附件'
        //     }
        // },
        {
            title: '操作',
            width: '15%',
            align: 'center',
            render: (text, record) => (<Fragment >
                <a onClick={
                    () => this.showModal(record)
                } > 编辑 </a>
                <Divider type="vertical" />
                <Popconfirm placement="left" title="确定要删除此信息吗？" onConfirm={() => this.deletebutton(record)} okText="是" cancelText="否">
                       <a href="#" > 删除 </a>
                   </Popconfirm>
            </Fragment >
            ),
        },
      ];

        return (
                <div className={styles.cardTitle}>
                <Card bordered={false}>

                     <Form layout="inline" style={{marginBottom: 10}}>
                         <Row gutter={8} >
                             <Col span={24} >
                                     <Button type="primary" style={{marginLeft:10}}
                                     onClick={ ()=>this.showModal(null)} > 添加 </Button>
                             </Col >
                         </Row>
                     </Form>
                    <Table loading={isloading}
                        columns={ columns }
                        className={styles.dataTable}
                        rowKey="ID"
                        dataSource={pdlist}
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
                            onCancel={this.hideModal}
                            width='50%'>
                            {
                                 <Addepinfo closemodal={this.hideModal} row={this.state.row}/>
                            }
                        </Modal>
            </div>
        );
    }
}

export default index;
