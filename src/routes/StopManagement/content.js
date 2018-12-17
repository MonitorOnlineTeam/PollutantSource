import React, { Component,Fragment} from 'react';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Button,
    InputNumber,
    Modal,
    Table,
    Progress,
    Popconfirm,
    Divider,
    message
} from 'antd';
import Add from '../StopManagement/add';
import Info from '../../components/StopManagement/Info';
import Attention from '../../components/StopManagement/Attention';
import EnterprisePointCascadeMultiSelect from '../../components/EnterprisePointCascadeMultiSelect/index';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import PageHeader from '../../components/PageHeader';
import moment from 'moment';
import styles from './index.less';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
const FormItem = Form.Item;
const { Option } = Select;
const Search = Input.Search;
/*
页面：停产管理
描述：停产情况维护，需要上传附件。描述清楚是勒令停产还是企业减少产能。（自动打标）依据恢复生产动作
*/
@connect(({loading, stopmanagement}) => ({
    ...loading,
    list: stopmanagement.list,
    total: stopmanagement.total,
    pageSize: stopmanagement.pageSize,
    pageIndex: stopmanagement.pageIndex,
    requstresult: stopmanagement.requstresult,
}))
@Form.create()
export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
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
        };
    }
    componentWillMount() {
        const DGIMN = this.props.match.params.DGIMN;
        if (DGIMN !== 'null') {
            this.setState({
                DGIMN: DGIMN
            },() => {
                this.onChange();
            });
        }
    }
    onShowSizeChange = (pageIndex, pageSize) => {
        this.props.dispatch({
            type: 'stopmanagement/getlist',
            payload: {
                pageIndex: pageIndex === undefined ? 1 : pageIndex,
                pageSize: pageSize === undefined ? 10 : pageSize,
                DGIMN: this.state.DGIMN,
                Data: this.state.rangeDate,
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
    _handleDateChange=(date, dateString) => {
        this.setState({
            rangeDate: dateString,
            Datestring: date,
        });
    };
    toggleForm = () => {
        this.setState({
            expandForm: !this.state.expandForm,
        });
    };
    renderForm() {
        return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }
    attentionClick=(e) => {
        this.setState({attentionvisible: true});
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const columns = [{
            title: '停产开始至结束时间',
            dataIndex: 'RealStopStartTime',
            key: 'RealStopStartTime',
            width: '20%',
            render: (text, record) => `${record.BeginTime}-${record.EndTime}`
        }, {
            title: '持续时长',
            dataIndex: 'HoursFormat',
            key: 'HoursFormat',
            width: '10%',
            render: (text, record) => {
                return text;
            }
        }, {
            title: '报备人',
            dataIndex: 'RecordUserName',
            key: 'RecordUserName',
            width: '10%',
            render: (text, record) => {
                return text;
            }
        }, {
            title: '描述',
            dataIndex: 'StopDescription',
            key: 'StopDescription',
            width: '30%',
            render: (text, record) => {
                return text;
            }
        }, {
            title: '档案',
            dataIndex: 'attachment',
            key: 'attachment',
            width: '10%',
            render: (text, record) => {
                return <Button type="primary" shape="circle" icon="download" size={'small'} id={record.key} onClick={this.attentionClick} />;
            }
        }, {
            title: '进度',
            dataIndex: 'progress',
            key: 'progress',
            width: '10%',
            render: (text, record) => {
                return <Progress percent={text} size="small" status="active" />;
            }
        },
        {
            title: '操作',
            width: '10%',
            render: (text, record) => (<Fragment >
                <a onClick={
                    () => this.setState({
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
            <div>
                <PageHeader title={this.props.match.params.PointName}
                    breadcrumbList={
                        [{
                            title: '排口列表',
                            href: '/sysmanage/PointInfo',
                        }, {
                            title: '停产管理',
                        }]
                    }
                />
                <Card bordered={false}>
                    <Card>
                        <Form layout="inline">
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={8} sm={24}>
                                    <FormItem label="停产开始时间">
                                        {getFieldDecorator('Brand')(
                                            <RangePicker_ style={{width: 350}} showTime={{format: 'HH:mm'}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange}
                                                onOk={() => this.onChange()} dateValue={this.state.Datestring} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="报备人">
                                        {getFieldDecorator('RecordUserName')(
                                            <Search
                                                placeholder="报备人"
                                                onSearch={value =>
                                                    this.setState({
                                                        RecordUserName: value,
                                                    },() => {
                                                        this.onChange();
                                                    })
                                                }
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col md={6} sm={24}>
                                    <FormItem label="停产持续时长">
                                        {getFieldDecorator(`Specifications`)(
                                            <span>
                                                <InputNumber min={1} onChange={value => {
                                                    this.setState({
                                                        duration: value,
                                                    },() => {
                                                        this.onChange();
                                                    });
                                                }} style={{ width: '65%', float: 'left', marginRight: '3%' }} /><Select
                                                    defaultValue="0"
                                                    style={{ width: '32%', float: 'left' }}
                                                    onChange={value => {
                                                        this.setState({
                                                            datatype: value,
                                                        },() => {
                                                            this.onChange();
                                                        });
                                                    }}
                                                >
                                                    <Option value="1">天</Option>
                                                    <Option value="0">时</Option>
                                                </Select>
                                            </span>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={8} sm={24}>
                                    <Button type="primary" style={{marginTop: 10}} onClick={() => {
                                        this.setState({
                                            visible: true,
                                            type: 'add',
                                            title: '增加',
                                            width: 1130
                                        });
                                    }}> 增加 </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                    <Table
                        loading={this.props.effects['stopmanagement/getlist']}
                        columns={columns}
                        dataSource={this.props.requstresult === '1' ? this.props.list : null}
                        scroll={{ y: 'calc(100vh - 455px)' }}
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                            'total': this.props.total,
                            'pageSize': this.props.pageSize,
                            'current': this.props.pageIndex,
                            onChange: this.onChange,
                            onShowSizeChange: this.onShowSizeChange,
                            pageSizeOptions: ['5', '10', '20', '30', '40']
                        }}
                    />
                    <Modal
                        visible={this.state.visible}
                        title={this.state.title}
                        width={this.state.width}
                        onOk={() => {
                            this.setState({
                                visible: false
                            });
                        }}
                        onCancel={() => {
                            this.setState({
                                visible: false
                            });
                        }}>
                        {
                            this.state.type === 'add' ? <Add /> : <Info />
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
                            <Attention />
                        }
                    </Modal>
                </Card>
            </div>
        );
    }
}
