import React, { Component } from 'react';
import {Table, Row, Col, Form, DatePicker, Input, Button} from 'antd';
import inDatas from '../../mockdata/OperationStock/InStockListData.json';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

@Form.create()
export default class InStockList extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;

        const columns = [{
            title: '入库时间',
            dataIndex: 'AddDate',
            width: 120,
        }, {
            title: '生产日期',
            dataIndex: 'ManufactoryDate',
            width: 100

        }, {
            title: '入库人',
            dataIndex: 'AddUser',
            width: 80,
        }, {
            title: '入库仓库',
            dataIndex: 'Stock',
            width: 150,
        }, {
            title: '名称',
            dataIndex: 'MaterialName',
            width: 150,
        }, {
            title: '规格型号',
            dataIndex: 'Specifications',
            width: 150,
        }, {
            title: '品牌',
            dataIndex: 'Brand',
        }, {
            title: '数量',
            dataIndex: 'Num',
        }, {
            title: '单位',
            dataIndex: 'Unit',
        }];

        return (
            <div>
                <div>
                    <Row gutter={24}>
                        <Col span={8} >
                            <FormItem style={{display: 'flex'}} label={`入库人`}>
                                {getFieldDecorator(`AddUser`)(
                                    <Input placeholder="请输入入库人" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={10} >
                            <FormItem style={{display: 'flex'}} label={`入库时间`}>
                                {getFieldDecorator(`AddDate`)(
                                    <RangePicker style={{width: 220}} />
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6} style={{ textAlign: 'left' }}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ marginLeft: 8 }} >清空</Button>
                        </Col>
                    </Row>
                </div>
                <Table
                    columns={columns}
                    dataSource={inDatas}
                    pagination={{
                        pageSize: 50
                    }}
                    scroll={
                        {
                            y: 500
                        }
                    }
                />
            </div>

        );
    }
}
