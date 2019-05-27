import React, { Component, Fragment } from 'react';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Button,
    Modal,
    Table,
    Progress,
    Popconfirm,
    Divider,
    message,
    Badge
} from 'antd';
import Add from '../StopManagement/add';
import View from '../StopManagement/view';
import Attention from '../StopManagement/files';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import MonitorContent from '../../components/MonitorContent/index';
import styles from './index.less';
import { connect } from 'dva';
const Search = Input.Search;
/*
页面：停产管理
描述：停产情况维护，需要上传附件。描述清楚是勒令停产还是企业减少产能。（自动打标）依据恢复生产动作
*/
@connect(({ loading, stopmanagement }) => ({
    ...loading,
    list: stopmanagement.list,
    total: stopmanagement.total,
    pageSize: stopmanagement.pageSize,
    pageIndex: stopmanagement.pageIndex,
    requstresult: stopmanagement.requstresult,
    fileslist: stopmanagement.fileslist,
}))
@Form.create()
export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            Vvisible: false,
            attentionvisible: false,
            type: 'add',
            title: '填写入库单',
            width: 400,
            expandForm: false,
            rangeDate: [],
            Datestring: [],
            RecordUserName: '',
            DGIMN: null,
            duration: 0,
            datatype: '0',
            OutputStopID: null,
        };
    }
    componentWillMount() {
        const DGIMN = this.props.match.params.DGIMN;
        if (DGIMN !== 'null') {
            this.setState({
                DGIMN: DGIMN
            }, () => {
                this.onChange(this.props.pageIndex, this.props.pageSize);
            });
        }
    }
    onRef = (ref) => {
        this.child = ref;
    };
    cancel = () => {
        this.setState({
            visible: false,
        });
    }
    onShowSizeChange = (pageIndex, pageSize) => {
        this.props.dispatch({
            type: 'stopmanagement/getlist',
            payload: {
                pageIndex: pageIndex === undefined ? 1 : pageIndex,
                pageSize: pageSize === undefined ? 10 : pageSize,
                DGIMN: this.state.DGIMN,
                Data: this.state.rangeDate.join(','),
                RecordUserName: this.state.RecordUserName,
                StopHours: this.state.duration, //时长
                datatype: this.state.datatype,//类型 天或小时
            },
        });
    }
    onChange = (pageIndex, pageSize) => {
        this.props.dispatch({
            type: 'stopmanagement/getlist',
            payload: {
                pageIndex: pageIndex === undefined ? 1 : pageIndex,
                pageSize: pageSize === undefined ? 10 : pageSize,
                DGIMN: this.state.DGIMN,
                Data: this.state.rangeDate.join(','),
                RecordUserName: this.state.RecordUserName,
                StopHours: this.state.duration, //时长
                datatype: this.state.datatype,//类型 天或小时
            },
        });
    }
    confirm = (id) => {
        this.props.dispatch({
            type: 'stopmanagement/deletebyid',
            payload: {
                pageIndex: this.props.pageIndex === undefined ? 1 : this.props.pageIndex,
                pageSize: this.props.pageSize === undefined ? 10 : this.props.pageSize,
                DGIMN: this.state.DGIMN,
                Data: this.state.rangeDate.join(','),
                RecordUserName: this.state.RecordUserName,
                StopHours: this.state.duration, //时长
                datatype: this.state.datatype, //类型 天或小时
                OutputStopID: id,
                callback: () => {
                    if (this.props.requstresult === '1') {
                        message.success('删除成功！');
                    } else {
                        message.success('删除失败！');
                    }
                }
            },
        });
    }
    handleFormReset = () => {
        const { form } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
    };
    _handleDateChange = (date, dateString) => {
        this.setState({
            rangeDate: dateString,
            Datestring: date,
        });
    };
    showFile = (record) => {
        if (record.Isfiles === 1) {
            this.props.dispatch({
                type: 'stopmanagement/getoutputstopfiles',
                payload: {
                    OutputStopID: record.key,
                    callback: () => {
                        this.setState({
                            OutputStopID: record.key,
                            attentionvisible: true,
                        });
                    }
                },
            });
        } else {
            message.error('没有可以下载的文件');
        }
    }
    onCancel = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        const columns = [{
            title: '停产开始至结束时间',
            dataIndex: 'RealStopStartTime',
            key: 'RealStopStartTime',
            width: '25%',
            align: 'left',
            render: (text, record) => `${record.BeginTimeF}~${record.EndTimeF}`
        }, {
            title: '持续时长',
            dataIndex: 'HoursFormat',
            key: 'HoursFormat',
            width: '10%',
            align: 'center',
            render: (text, record) => {
                return text;
            }
        }, {
            title: '报备人',
            dataIndex: 'RecordUserName',
            key: 'RecordUserName',
            width: '10%',
            align: 'center',
            render: (text, record) => {
                return text;
            }
        }, {
            title: '档案',
            dataIndex: 'attachment',
            key: 'attachment',
            width: '10%',
            align: 'center',
            render: (text, record) => {
                return <Button type="primary" shape="circle" icon="download" size={'small'} id={record.key} onClick={() => {
                    this.showFile(record);
                }} />;
            }
        }, {
            title: '进度',
            dataIndex: 'progress',
            key: 'progress',
            width: '20%',
            align: 'center',
            render: (text, record) => {
                if (text < 0) {
                    return <span>
                        <Progress percent={0} size="small" status="active" />
                        <span style={{ fontSize: 11 }}><Badge status="default" />未开始</span>
                    </span>;
                }
                if (text === 100) {
                    return <span>
                        <Progress percent={text} strokeColor="#52c41a" size="small" status="active" />
                        <span style={{ fontSize: 11 }}><Badge status="success" />已结束</span>
                    </span>;
                }
                if (text < 100) {
                    return <span>
                        <Progress percent={text} size="small" status="active" />
                        <span style={{ fontSize: 11 }}> <Badge status="processing" />进行中</span>
                    </span>;
                }
            }
        },
        {
            title: '操作',
            width: '10%',
            align: 'center',
            render: (text, record) => (<Fragment >
                <a onClick={
                    () => this.setState({
                        Vvisible: true,
                        OutputStopID: record.key
                    })
                } > 查看 </a> <Divider type="vertical" />
                <Popconfirm placement="left"
                    title="确定要删除吗？"
                    onConfirm={
                        () => this.confirm(record.key)
                    }
                    okText="是"
                    cancelText="否" >
                    <a href="#" > 删除 </a> </Popconfirm> </Fragment >
            ),
        }
        ];
        return (
            <MonitorContent {...this.props} breadCrumbList={
                [
                    // { Name: '首页', Url: '' },
                    // { Name: '系统管理', Url: '' },
                    {Name:'企业管理',Url:'/EnterpriseManager'},
                    {Name:'排口管理',Url:`/sysmanage/pointinfo/${this.props.match.params.EntCode}`},
                    { Name: '停产管理', Url: '' }
                ]
            }>
                <div className={styles.cardTitle}>
                    <Card bordered={false} title={this.props.match.params.PointName} style={{ width: '100%' }}>
                        <Form layout="inline" style={{ marginBottom: 10 }}>
                            <Row gutter={{ md: 8, lg: 8, xl: 8 }}>
                                <Col md={8} sm={24}>
                                    <RangePicker_ style={{ width: 350 }} showTime={{ format: 'HH' }} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange}
                                        onOk={() => this.onChange()} dateValue={this.state.Datestring} />
                                </Col>
                                <Col md={8} sm={24}>
                                    <Search
                                        style={{ width: 150 }}
                                        placeholder="报备人"
                                        onSearch={value =>
                                            this.setState({
                                                RecordUserName: value,
                                            }, () => {
                                                this.onChange();
                                            })
                                        }
                                    />
                                    <Button type="primary" style={{ marginLeft: 5 }} onClick={() => {
                                        this.setState({
                                            visible: true,
                                            type: 'add',
                                            title: '增加',
                                            width: 1130
                                        });
                                    }}> 增加 </Button>
                                </Col>
                                <Col md={2} sm={2}>

                                </Col>
                            </Row>
                        </Form>
                        <Table
                            loading={this.props.effects['stopmanagement/getlist']}
                            columns={columns}
                            className={styles.dataTable}
                            dataSource={this.props.requstresult === '1' ? this.props.list : null}
                            scroll={{ y: 'calc(100vh - 385px)' }}
                            size="small" // small middle
                            pagination={{
                                showSizeChanger: true,
                                showQuickJumper: true,
                                size: 'small',
                                'total': this.props.total,
                                'pageSize': this.props.pageSize,
                                'current': this.props.pageIndex,
                                onChange: this.onChange,
                                onShowSizeChange: this.onShowSizeChange,
                                pageSizeOptions: ['10','20', '30', '40', '50']
                            }}
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
                        />
                        <Modal
                            visible={this.state.visible}
                            title={this.state.title}
                            width={this.state.width}
                            destroyOnClose={true}// 清除上次数据
                            footer={false}
                            onCancel={() => {
                                this.setState({
                                    visible: false
                                });
                            }}>
                            {
                                <Add onRef={this.onRef} cancel={this.cancel} DGIMN={this.state.DGIMN} onCancels={this.onCancel} />
                            }
                        </Modal>
                        <Modal
                            visible={this.state.Vvisible}
                            title="详情"
                            width="40%"
                            destroyOnClose={true}// 清除上次数据
                            footer={false}
                            onCancel={() => {
                                this.setState({
                                    Vvisible: false
                                });
                            }}>
                            {
                                <View OutputStopID={this.state.OutputStopID} />
                            }
                        </Modal>
                        <Modal
                            visible={this.state.attentionvisible}
                            title="档案下载"
                            width="50%"
                            footer={null}
                            onOk={() => {
                                this.setState({
                                    attentionvisible: false
                                });
                            }}
                            onCancel={() => {
                                this.setState({
                                    attentionvisible: false
                                });
                            }}>
                            {
                                <Attention OutputStopID={this.state.OutputStopID} fileslist={this.props.fileslist} />
                            }
                        </Modal>
                    </Card>
                </div>
            </MonitorContent>
        );
    }
}
