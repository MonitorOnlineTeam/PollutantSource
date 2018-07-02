import React, { Component } from 'react';
import { Input, Select, InputNumber, Form, Button, Upload, Icon, Row, Col, Radio} from 'antd';

export default class Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stopmode: 0,
            exceptrangeDate: [],
            realrangeDate: [],
            description: '',
        };
    }

    render() {
        return (
            <div>
                <Row gutter={16} justify="center" align="middle">
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file-word" style={{fontSize: 60}} />
                        </Button>
                        <br />
                        1月11日停产报告
                    </Col>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file-excel" style={{fontSize: 60}} />
                        </Button>
                        <br />
                        1月11日停产明细
                    </Col>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file-ppt" style={{fontSize: 60}} />
                        </Button>
                        <br />
                        1月11日停产介绍稿
                    </Col>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file-pdf" style={{fontSize: 60}} />
                        </Button>  <br />
                        1月11日停产报告
                    </Col>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file" style={{fontSize: 60}} />
                        </Button>  <br />
                        1月11日停产文件
                    </Col>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file" style={{fontSize: 60}} />
                        </Button>  <br />
                        1月11日停产文件
                    </Col>
                </Row>
                <Row gutter={16} justify="center" align="middle" style={{marginTop:30}}>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file-word" style={{fontSize: 60}} />
                        </Button>
                        <br />
                    2月11日停产报告
                    </Col>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file-excel" style={{fontSize: 60}} />
                        </Button>
                        <br />
                    2月11日停产明细
                    </Col>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file-ppt" style={{fontSize: 60}} />
                        </Button>
                        <br />
                    2月11日停产介绍稿
                    </Col>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file-pdf" style={{fontSize: 60}} />
                        </Button>  <br />
                    2月11日停产报告
                    </Col>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file" style={{fontSize: 60}} />
                        </Button>  <br />
                    2月11日停产文件
                    </Col>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file" style={{fontSize: 60}} />
                        </Button>  <br />
                    2月11日停产文件
                    </Col>
                </Row>
                <Row gutter={16} justify="center" align="middle" style={{marginTop:30}}>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file-word" style={{fontSize: 60}} />
                        </Button>
                        <br />
                5月11日停产报告
                    </Col>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file-excel" style={{fontSize: 60}} />
                        </Button>
                        <br />
                5月11日停产明细
                    </Col>
                    <Col span={4} align="center">
                        <Button type="primary" size="large" style={{width: 100, height: 100}}>
                            <Icon type="file-ppt" style={{fontSize: 60}} />
                        </Button>
                        <br />
                6月11日停产介绍稿
                    </Col>
                </Row>
            </div>
        );
    }
}
