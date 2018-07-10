import React, { Component} from 'react';
import { Row, Col, Card, Form, Input, Select, Icon, Button, InputNumber, AutoComplete, Modal, Table, Radio } from 'antd';
import Add from '../../components/StopManagement/Add';
import Info from '../../components/StopManagement/Info';
import Attention from '../../components/StopManagement/Attention';
import EnterprisePointCascadeMultiSelect from '../../components/EnterprisePointCascadeMultiSelect/index';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import moment from 'moment';

import styles from './index.less';

import data from '../../mockdata/StopManagement/index.json';
import {getPointEnterprise} from '../../mockdata/Base/commonbase';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

function getData() {
    return data.map(t => {
        const points = getPointEnterprise();
        const aa = points.find(a => t.DGIMN === a.DGIMN);
        if (aa) {
            return {...t, ...aa, key: t.id};
        }
        return {...t, key: t.id};
    });
}
/*
页面：停产管理
描述：停产情况维护，需要上传附件。描述清楚是勒令停产还是企业减少产能。（自动打标）依据恢复生产动作
add by cg 18.6.8
modify by
*/
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
            selectid: [],
            data: this.props.dgimn ? getData().filter(t => t.DGIMN === this.props.dgimn) : getData(),
            loading: true,
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')]
        };
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
    renderAdvancedForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="排口">
                            {getFieldDecorator('no')(<EnterprisePointCascadeMultiSelect initValue={['']} width="310px" cascadeSize={2} />)}
                        </FormItem>
                    </Col>
                    <Col md={10} sm={24}>
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
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
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
                    <Col md={10} sm={24}>
                        <FormItem label="停产方式">
                            {getFieldDecorator('status3')(
                                <RadioGroup onChange={this.onChange} value={this.state.value}>
                                    <Radio value={1}>主动</Radio>
                                    <Radio value={2}>勒令</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <div style={{ overflow: 'hidden' }}>
                            <span style={{ float: 'left', marginBottom: 24 }}>
                                <Button type="primary" htmlType="submit">
                查询
                                </Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
                                </Button>
                                <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="up" />
                                </a>
                            </span>
                        </div>
                    </Col>
                </Row>

            </Form>
        );
    }

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
            title: '企业',
            dataIndex: 'EntName',
            key: 'EntName',
            width: 250,
            fixed: 'left'
        }, {
            title: '排口',
            dataIndex: 'PointName',
            key: 'PointName',
            width: 200,
            fixed: 'left'
        }, {
            title: '预计停产开始至结束时间',
            dataIndex: 'ExpectStopStartTime',
            key: 'ExpectStopStartTime',
            width: 400,
            render: (text, record, index) => `${record.ExpectStopStartTime}-${record.ExpectStopEndTime}`
        }, {
            title: '实际停产开始至结束时间',
            dataIndex: 'RealStopStartTime',
            key: 'RealStopStartTime',
            width: 400,
            render: (text, record, index) => `${record.RealStopStartTime}-${record.RealStopEndTime}`
        }, {
            title: '持续时长',
            dataIndex: 'Duration',
            key: 'Duration',
            width: 100
        }, {
            title: '停产方式',
            dataIndex: 'StopMode',
            key: 'StopMode',
            width: 100,
            render: t => t === 1 ? '主动' : '勒令',
        }, {
            title: '报备人',
            dataIndex: 'Dealperson',
            key: 'Dealperson',
            width: 150
        }, {
            title: '描述',
            dataIndex: 'Descripe',
            key: 'Descripe',
        }, {
            title: '档案',
            dataIndex: 'attachment',
            key: 'attachment',
            width: 80,
            fixed: 'right',
            render: (text, record, index) => { return <Button type="primary" shape="circle" icon="download" size={'small'} id={record.key} onClick={this.attentionClick} />; }
        } ];

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                let keys = [];
                selectedRowKeys.map(t => {
                    if (Array.isArray(t)) {
                        t.map(a => {
                            if (a !== '') { keys.push(a); }
                        });
                    } else {
                        if (t !== '') { keys.push(t); }
                    }
                });
                this.setState({selectid: keys});
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
            selectedRowKeys: this.state.selectid
        };

        return (
            <Card bordered={false}>
                <div>
                    <div className={styles.tableListForm}>{this.renderForm()}
                    </div>
                    <Button style={{marginBottom: 10}} type="primary" onClick={() => {
                        this.setState({
                            visible: true,
                            type: 'add',
                            title: '增加',
                            width: 1130
                        });
                    }}> 增加 </Button>
                    <Button style={{marginLeft: 10, marginBottom: 10}} onClick={() => {

                    }}> 删除 </Button>
                    <Button style={{marginLeft: 10, marginBottom: 10}} onClick={() => {
                        this.setState({
                            visible: true,
                            type: 'info',
                            title: '查看',
                            width: 1130
                        });
                    }}> 查看 </Button>
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                            'total': this.state.data.length,
                            'pageSize': 10,
                            'current': 1
                        }}
                        scroll={
                            {
                                x: 1950,
                                y: 'calc(100vh -  110px)'
                            }
                        }
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: (a, b, c) => {
                                    let {selectid} = this.state;
                                    let index = selectid.findIndex(t => t === record.key);
                                    if (index !== -1) {
                                        selectid.splice(index, 1);
                                    } else {
                                        selectid.push(record.key);
                                    }
                                    this.setState({selectid: selectid});
                                }, // 点击行
                                onMouseEnter: () => {}, // 鼠标移入行
                            };
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
                </div></Card>
        );
    }
}
