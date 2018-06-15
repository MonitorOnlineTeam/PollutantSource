import React, {
    Component
} from 'react';
import stockdata from '../../mockdata/OperationStock/StockData.json';
import InStockList from '../../components/ReplacementPartAdd/InStockList';
import InStockForm from '../../components/ReplacementPartAdd/InStockForm';
import {
    Button,
    Input,
    Modal,
    Table,
    Form,
    Row,
    Col
} from 'antd';

/*
页面：备品备件维护
描述：备品备件入库记录
add by cg 18.6.8
modify by
*/

const FormItem = Form.Item;

@Form.create()
export default class ReplacementPartAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 'form',
            title: '填写入库单',
            width: 400
        };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [{
            title: '名称',
            dataIndex: 'MaterialName',
            width: 250,
        }, {
            title: '规格型号',
            dataIndex: 'Specifications',
            width: 150,
        }, {
            title: '品牌',
            dataIndex: 'Brand',
            width: 150
        }, {
            title: '数量',
            dataIndex: 'Num',
            width: 80
        }, {
            title: '单位',
            dataIndex: 'Unit',
            width: 80
        }, {
            title: '总价（元）',
            dataIndex: 'TotalMoney',
            width: 80
        }];

        return (
            <div style={{margin: '10px'}}>
                <div>
                    <Row gutter={24}>
                        <Col span={6} >
                            <FormItem style={{display: 'flex'}} label={`名称`}>
                                {getFieldDecorator(`MaterialName`)(
                                    <Input placeholder="请输入名称" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} >
                            <FormItem style={{display: 'flex'}} label={`品牌`}>
                                {getFieldDecorator(`Brand`)(
                                    <Input placeholder="请输入品牌名称" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} >
                            <FormItem style={{display: 'flex'}} label={`规格型号`}>
                                {getFieldDecorator(`Specifications`)(
                                    <Input placeholder="请输入规格型号" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} style={{ textAlign: 'left' }}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Button style={{marginBottom: 10}} onClick={() => {
                        this.setState({
                            visible: true,
                            type: 'form',
                            title: '填写入库单',
                            width: 400
                        });
                    }}> 入库 </Button>
                    <Button style={{marginLeft: 10, marginBottom: 10}} onClick={() => {
                        this.setState({
                            visible: true,
                            type: 'list',
                            title: '入库详细信息查看',
                            width: 1020
                        });
                    }}> 查看入库详细 </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={stockdata}
                    pagination={{
                        pageSize: 50
                    }}
                    scroll={
                        {
                            y: 'calc(100vh - 310px)'
                        }
                    }
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
                        this.state.type === 'form' ? <InStockForm /> : <InStockList />

                    }

                </Modal>
            </div>);
    }
}
