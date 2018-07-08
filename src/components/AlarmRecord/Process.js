import React, { Component } from 'react';
import { Form, Row, Col, InputNumber, Button} from 'antd';
class Process extends Component {
    render() {
        return (
            <div>
                <Form>
                    <Row gutter={16}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                 预计恢复时间： <InputNumber min={1} max={1000} style={{width: 60}} defaultValue={3} />小时
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Process;
