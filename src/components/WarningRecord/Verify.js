import React, { Component } from 'react';
import { Form, Row, Col, InputNumber, Button} from 'antd';
class Verify extends Component {
    render() {
        return (
            <div>
                <Form>
                    <Row gutter={16}>
                        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                 是否确认核实为报警？
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Verify;
