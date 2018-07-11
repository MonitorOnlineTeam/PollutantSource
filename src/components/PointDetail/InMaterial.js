import React, { Component } from 'react';
import {Form, Input, Select, Row, Col, Button, Table} from 'antd';
import InData from '../../mockdata/PointDetail/InMaterialData.json';
import styles from './InMaterial.less';
/*
页面：
描述：使用记录弹框
add by myt 18.7.9
*/
const FormItem = Form.Item;

@Form.create()
export default class InMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectid: []
        };
    }

    handleFormReset = () => {
        const { form } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
    };

    renderSimpleForm() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        return (
            <Form layout="inline">
                <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
                    <Col span={6} md={6} sm={24}>
                        <FormItem label="名称">
                            {getFieldDecorator(`MaterialName`)(
                                <Input placeholder="请输入名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6} md={6} sm={24}>
                        <FormItem label="品牌">
                            {getFieldDecorator('Brand')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">泽天品牌</Option>
                                    <Option value="1">法兰DN100</Option>
                                    <Option value="1">SDL</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6} md={6} sm={24}>
                        <FormItem label="规格型号">
                            {getFieldDecorator(`Specifications`)(
                                <Input placeholder="请输入规格型号" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6} md={6} sm={24}>
                        <span>
                            <Button type="primary" htmlType="submit">
                               查询
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                                重置
                            </Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }
    renderForm() {
        return this.renderSimpleForm();
    }

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                let keys = [];
                selectedRowKeys.map(t => {
                    if (Array.isArray(t)) {
                        t.map(a => {
                            if (a !== '') { keys.push(a); }
                        });
                    } else {
                        debugger;
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

        const columns = [{
            title: '入库时间',
            dataIndex: 'InStockDate',
            width: 120,
        }, {
            title: '编码',
            dataIndex: 'MaterialNum',
            width: 120,
        }, {
            title: '名称',
            dataIndex: 'MaterialName',
            width: 120,
        }, {
            title: '规格型号',
            dataIndex: 'Specifications',
            width: 150,
        }, {
            title: '品牌',
            dataIndex: 'Brand',
            width: 80
        }, {
            title: '数量',
            dataIndex: 'Num',
            width: 60
        }, {
            title: '单价',
            dataIndex: 'Price',
            width: 60
        }, {
            title: '生产日期',
            dataIndex: 'ManufactureDate',
            width: 80
        }, {
            title: '有效期（天）',
            dataIndex: 'ValidateNum',
            width: 80
        }, {
            title: '状态',
            dataIndex: 'State',
            width: 80
        }];
        return (
            <div >
                <div className={styles.tableListForm}>{this.renderForm()}</div>
                <Table
                    columns={columns}
                    dataSource={InData}
                    bordered={true}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        'total': 45,
                        'pageSize': 20,
                        'current': 1
                    }}
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
                    rowSelection={rowSelection}
                    scroll={
                        {
                            y: 540,
                            x: 1200
                        }
                    }
                />
            </div>
        );
    }
}
