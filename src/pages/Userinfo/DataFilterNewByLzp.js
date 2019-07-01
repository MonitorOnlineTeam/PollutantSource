import React, { Component } from 'react';
import {
    Col,
    Row,
    Input,
    Card, Form, Button, Spin, message, Pagination, Tag, Checkbox, Switch
} from 'antd';
import styles from './index.less';
const Search = Input.Search;



export default class DataFilterNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Guanlian: false,
            Yichang: false,
            Chaobiao: false,
            Yujing: false,
            dataSource: [{
                mn: '1',
                type: '出口',
                name: '名称',
                gl: false,
                yc: false
            },
            {
                mn: '2',
                type: '出口1',
                name: '名称1',
                gl: false,
                yc: false
            }]
        }
    }

    toggle = (type) => {
        this.setState({
            Guanlian: !this.state.Guanlian,
        });
    };
    Yichangtoggle = (type) => {
        this.setState({
            Yichang: !this.state.Yichang,
        });
    };
    Chaobiaotoggle = (type) => {
        this.setState({
            Chaobiao: !this.state.Chaobiao,
        });
    };
    Yujingtoggle = (type) => {
        this.setState({
            Yujing: !this.state.Yujing,
        });
    };



    onChangeGuanlian = (mn) => {
        if (this.state.dataSource) {
            let data = this.state.dataSource.map((item, index) => {
                if(item)
                {
                    if (item.mn === mn) {
                        item.gl = true
                    }
                }
                
            });
            // this.setState({
            //     dataSource: data
            // });
        }

    }

    renderList = () => {
        let dataServerSource = [{
            mn: '1',
            type: '出口',
            name: '名称',
            gl: false,
            yc: false
        },
        {
            mn: '2',
            type: '出口1',
            name: '名称1',
            gl: false,
            yc: false
        }];
        let data = [];
        let { dataSource } = this.state;
        dataServerSource.map((item, index) => {
            debugger
            data.push(<Col>
                <div style={{ background: "#f3f3f3" }}
                    key={index}
                    className={styles.item}
                >
                    <Row gutter={0}>
                        <Col span={18}>
                            <div className={styles.PointName}>
                                <Row type="flex" justify="space-between">
                                    <Col span={15}>{item.name}</Col>
                                </Row>
                            </div>
                            <div className={styles.PointView}>
                                <Row type="flex" justify="space-between">
                                    <Col span={15}>{item.type}</Col>
                                </Row>
                            </div>
                            <div className={styles.PointView}>
                                <Row type="flex" justify="space-between">
                                    <Col span={15}>{item.mn}</Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div style={{ textAlign: 'right', margin: '10px 5px 5px 5px' }}>
                                <Switch
                                    checkedChildren="关联"
                                    unCheckedChildren="关联"
                                    size="small"
                                    checked={dataSource[index] ? dataSource[index].gl : false}
                                    onChange={this.onChangeGuanlian(item.mn)}
                                />
                                <Switch
                                    checkedChildren="异常"
                                    unCheckedChildren="异常"
                                    size="small"
                                    checked={this.state.Yichang}
                                // onChange={this.onChangeYichang(item.mn)}
                                />
                                <Switch
                                    checkedChildren="超标"
                                    unCheckedChildren="超标"
                                    size="small"
                                    checked={this.state.Chaobiao}
                                // onChange={this.onChangeChaobiao(item.mn)}
                                />
                                <Switch
                                    checkedChildren="预警"
                                    unCheckedChildren="预警"
                                    size="small"
                                    checked={this.state.Yujing}
                                // onChange={this.onChangeYujing(item.mn)}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>

            </Col>);


        });

        return data;

    }


    render() {

        return (
            <div>
                <Form>
                    <Row>
                        <Col>
                            <Search
                                placeholder="排口名称 排口编号" allowClear
                                style={{ width: 200 }}
                            />
                            <Switch size="small" checkedChildren="异常" unCheckedChildren="异常" onClick={this.Yichangtoggle} style={{ marginLeft: 10 }} />
                            <Switch size="small" checkedChildren="超标" unCheckedChildren="超标" onClick={this.Chaobiaotoggle} style={{ marginLeft: 10 }} />
                            <Switch size="small" checkedChildren="预警" unCheckedChildren="预警" onClick={this.Yujingtoggle} style={{ marginLeft: 10 }} />
                            <Button type="primary" style={{ marginLeft: 10 }} onClick={this.toggle} >关联</Button>
                        </Col>
                    </Row>
                    <Row>
                        {

                            this.renderList()

                        }
                    </Row>
                </Form>
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Pagination
                        size="small"
                        showSizeChanger={true}
                        showQuickJumper={true}
                        total={50}
                        current={1}
                    />
                </div>
            </div>
        );
    }

}