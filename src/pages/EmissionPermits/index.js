import React, { Component,Fragment } from 'react';
import {
    Button,
    Table,
    Spin,
    Modal,
    Divider,
    Popconfirm,
    message,
    Card,
    Form,
    Row,
    Col
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.less';
import Addepinfo from './addepinfo.js';
import FilesList from "../StandardLibrary/FilesList";

@connect(({baseinfo, loading}) => ({
    isloading: loading.effects['baseinfo/queryeeplist'],
    requstresult: baseinfo.requstresult,
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
        });
    }

    buttonback = () => this.props.history.goBack(-1);

    showModal = (row) => {
        let title ="添加排污许可证信息";
        if(row) {
            title=`修改排污许可证信息${row.EPName}`;
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

     showFile = (record) => {
         if (record.IsFiles === 1) {
             this.setState({
                 StandardLibraryID: record.key,
                 Fvisible: true,
                 title: '文件列表',
                 width: 800
             });
         } else {
             message.error('没有可以下载的文件');
         }
     }

    //删除
    deletebutton = (record) => {
        this.props.dispatch({
            type: 'baseinfo/querydelep',
            payload: {
                code: record.key,
            },
        });
    };

    render() {
        const {
            pageSize,
            pageIndex,
            total,
            pdlist,
            isloading,
            requstresult
        } = this.props;
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
            width: '10%',
            align: 'left',
        },
        {
            title: '有效时间',
            dataIndex: 'BeginTime',
            key: 'BeginTime',
            width: '10%',
            align: 'center',
            render: (text, record) =>`${moment(record.BeginTime).format('YYYY-MM-DD') } - ${ moment(record.EndTime).format('YYYY-MM-DD')}`
        },
        {
            title: '附件',
            dataIndex: 'IsFiles',
            key: 'IsFiles',
            width: '10%',
            align: 'center',
            render: (text, record) => <Button
                type="primary"
                shape="circle"
                icon="download"
                size="small"
                id={
                    record.key
                }
                onClick={
                    () => {
                        this.showFile(record);
                    }
                }
            />
        },
        {
            title: '氮氧化物总量（t）',
            dataIndex: 'NOx',
            key: 'NOx',
            width: '10%',
            align: 'center',
        },
        {
            title: '烟尘总量（t）',
            dataIndex: 'YC',
            key: 'YC',
            width: '10%',
            align: 'center',
        },
        {
            title: '二氧化硫总量（t）',
            dataIndex: 'SO2',
            key: 'SO2',
            width: '10%',
            align: 'center',
        },
        {
            title: '操作',
            width: '15%',
            align: 'center',
            render: (text, record) => (<Fragment>
                <a onClick={
                    () => this.showModal(record)
                }
                > 编辑
                </a>
                <Divider type="vertical" />
                <Popconfirm placement="left" title="确定要删除吗？" onConfirm={() => this.deletebutton(record)} okText="是" cancelText="否">
                    <a href="#"> 删除 </a>
                </Popconfirm>
            </Fragment>
            ),
        },
        ];

        return (
            <div className={styles.cardTitle}>
                <Card bordered={false}>

                    <Form layout="inline" style={{marginBottom: 10}}>
                        <Row gutter={8}>
                            <Col span={24}>
                                <Button
                                    type="primary"
                                    style={{marginLeft:10}}
                                    onClick={()=>this.showModal(null)}
                                > 添加
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Table
                        loading={isloading}
                        columns={columns}
                        className={styles.dataTable}
                        rowKey="ID"
                        dataSource={requstresult==='1'?pdlist:null}
                        size="small"
                        scroll={{ y: 'calc(100vh - 220px)' }}
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
                            }}
                    />
                </Card>

                <Modal
                    footer={null}
                    destroyOnClose="true"
                    visible={this.state.visible}
                    title={this.state.title}
                    onCancel={this.hideModal}
                    width="50%"
                >
                    {
                        <Addepinfo closemodal={this.hideModal} row={this.state.row} />
                    }
                </Modal>
                <Modal
                    visible={this.state.Fvisible}
                    title={this.state.title}
                    width={this.state.width}
                    destroyOnClose={true}// 清除上次数据
                    footer={false}
                    onCancel={
                        () => {
                            this.setState({
                                Fvisible: false
                            });
                        }
                    }
                >
                    {
                        <FilesList pid={this.state.StandardLibraryID} />
                    }
                </Modal>
            </div>
        );
    }
}

export default index;
