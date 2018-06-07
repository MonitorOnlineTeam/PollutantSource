import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import "./index.less";

export default class WorkbenchComponet extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    return (
      <div style={{ background: "#ECECEC", padding: "30px" }}>
      <Row gutter={16}>
        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{marginTop:10 }}>
        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
          <Card title="Card title" bordered={false}>
            Card content Card contentCard content
          </Card>
        </Col>
        <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
    )
  }
}
