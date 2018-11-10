import React, { Component } from 'react';
import {
    Col,
    Row,
    Input,
    List, Card, Form, Button, Checkbox, Icon,
} from 'antd';
const Search = Input.Search;
export default class DataFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    };
    render() {
        const data = [{
            IsChecked: '0',
            PointName: '脱硫入口1号',
            DGMN: '001',
            Manufacturer: '雪迪龙',
            Drains: '出口',
        },
        {
            IsChecked: '1',
            PointName: '脱硫入口2号',
            DGMN: '002',
            Manufacturer: '雪迪龙',
            Drains: '出口',
        },
        {
            IsChecked: '1',
            PointName: '脱硫入口3号',
            DGMN: '003',
            Manufacturer: '雪迪龙',
            Drains: '入口',
        },
        {
            IsChecked: '0',
            PointName: '脱硫入口4号',
            DGMN: '004',
            Manufacturer: '雪迪龙',
            Drains: '出口',
        },
        {
            IsChecked: '0',
            PointName: '脱硫入口5号',
            DGMN: '005',
            Manufacturer: '雪迪龙',
            Drains: '出口',
        },
        {
            IsChecked: '0',
            PointName: '脱硫入口6号',
            DGMN: '006',
            Manufacturer: '雪迪龙',
            Drains: '出口',
        },
        {
            IsChecked: '0',
            PointName: '脱硫入口7号',
            DGMN: '007',
            Manufacturer: '雪迪龙',
            Drains: '出口',
        },
        {
            IsChecked: '0',
            PointName: '脱硫入口8号',
            DGMN: '008',
            Manufacturer: '雪迪龙',
            Drains: '出口',
        },
        ];
        return (
            <div>
                <Card >
                    <Card>
                        <Form layout="inline">
                            <Row gutter={16} >
                                <Col span={12} >
                                    <Search placeholder="请输入怕排口名称、mn号、设备厂商进行查询" onSearch={value => console.log(value)}
                                        style={{ width: 400 }} />
                                </Col>
                                <Col span={12} >
                                    <Button>全选</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                    <List
                        grid={
                            {
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 3,
                                xl: 3,
                                xxl: 3
                            }
                        }
                        dataSource={
                            data
                        }
                        pagination={
                            {
                                showSizeChanger: true,
                                showQuickJumper: true,
                                'total': 45,
                                'pageSize': 20,
                                'current': 1
                            }
                        }
                        size="small"
                        renderItem={
                            item => (<List.Item >
                                <Card>
                                    <Row gutter={1}>
                                        <Col span={2}>
                                            <Checkbox />
                                        </Col>
                                        <Col span={2}><Icon type="home" theme="filled" /></Col>
                                        <Col span={16} >{item.PointName}</Col>
                                        <Col span={3} >{item.Drains}</Col>
                                    </Row>
                                    <Row gutter={1}>
                                        <Col span={2} />
                                        <Col span={2} />
                                        <Col span={10} >设备编号:{item.DGMN}</Col>
                                        <Col span={10} >厂商:{item.Manufacturer}</Col>
                                    </Row>
                                </Card>
                            </List.Item>
                            )
                        }
                    />
                </Card>
            </div>
        );
    }
}
