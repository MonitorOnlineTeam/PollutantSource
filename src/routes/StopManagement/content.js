import React, { Component} from 'react';
import { Row, Col, Card, Form, Input, Select, Icon, Button, InputNumber, AutoComplete, Modal, Table, Radio,Progress } from 'antd';
import Add from '../../components/StopManagement/Add';
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
const RadioGroup = Radio.Group;
const { Option } = Select;
/*
页面：停产管理
描述：停产情况维护，需要上传附件。描述清楚是勒令停产还是企业减少产能。（自动打标）依据恢复生产动作
add by cg 18.6.8
modify by
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
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
            DGIMN: null,
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
                pageSize: pageSize === undefined ? 1 : pageSize,
                DGIMN: this.state.DGIMN
            },
        });
    }
    onChange = (pageIndex, pageSize) => {
        this.props.dispatch({
            type: 'stopmanagement/getlist',
            payload: {
                pageIndex: pageIndex === undefined ? 1 : pageIndex,
                pageSize: pageSize === undefined ? 1 : pageSize,
                DGIMN: this.state.DGIMN,
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
        console.log(date);// [moment,moment]
        console.log(dateString);// ['2018-06-23','2018-06-25']
        this.state.rangeDate = date;
    };
    renderSimpleForm() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        return (
            <Form layout="inline">
                <Row gutter={{ md: 8, lg: 8, xl: 8 }}>
                    <Col span={8} md={8} sm={8}>
                        <FormItem label="排口">
                            <EnterprisePointCascadeMultiSelect initValue={['bjldgn']} width="300px" cascadeSize={2} />
                        </FormItem>
                    </Col>
                    <Col span={10} md={12} sm={12}>
                        <FormItem label="停产开始时间">
                            {getFieldDecorator('Brand')(
                                <RangePicker_ style={{width: 350}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6} md={4} sm={4}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">
                查询
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
                            </Button>
                            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            展开 <Icon type="down" />
                            </a>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

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

    componentDidMount() {
        const that = this;
        setTimeout(function() {
            that.setState({
                loading: false
            });
        }, 1000);
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const columns = [{
            title: '停产开始至结束时间',
            dataIndex: 'RealStopStartTime',
            key: 'RealStopStartTime',
            width: '20%',
            render: (text, record, index) => `${record.RealStopStartTime}-${record.RealStopEndTime}`
        }, {
            title: '持续时长',
            dataIndex: 'Duration',
            key: 'Duration',
            width: '10%'
        }, {
            title: '报备人',
            dataIndex: 'Dealperson',
            key: 'Dealperson',
            width: '10%'
        }, {
            title: '描述',
            dataIndex: 'Descripe',
            key: 'Descripe',
            width: '20%'
        }, {
            title: '档案',
            dataIndex: 'attachment',
            key: 'attachment',
            width: '10%',
            fixed: 'right',
            render: (text, record, index) => {
                return <Button type="primary" shape="circle" icon="download" size={'small'} id={record.key} onClick={this.attentionClick} />;
            }
        }, {
            title: '进度',
            dataIndex: 'progress',
            key: 'progress',
            width: '10%',
            fixed: 'right',
            render: (text, record, index) => {
                return <Progress percent={text} size="small" status="active" />;
            }
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
                                            <RangePicker_ style={{width: 350}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col md={6} sm={24}>
                                    <FormItem label="停产持续时长">
                                        {getFieldDecorator(`Specifications`)(
                                            <span>
                                                <InputNumber min={1} onChange={this.onChange} style={{ width: '65%', float: 'left', marginRight: '3%' }} /><Select
                                                    style={{ width: '32%', float: 'left' }}
                                                    onChange={this.handleCurrencyChange}
                                                >
                                                    <Option value="day">天</Option>
                                                    <Option value="hour">时</Option>
                                                </Select>
                                            </span>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col md={8} sm={24}>
                                    <FormItem label="报备人">
                                        {getFieldDecorator('date')(
                                            <AutoComplete
                                                style={{ width: 300 }}
                                                onSearch={this.handleSearch}
                                                placeholder="报备人"
                                            />
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
