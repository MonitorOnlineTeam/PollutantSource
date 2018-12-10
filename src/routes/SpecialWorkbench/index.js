
import React, { Component } from 'react';
import {Col, Row} from 'antd';
/*
页面：工作台
add by cg 18.6.8
modify by
*/
class SpecialWorkbench extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            hasMore: true,
        };
    }
    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                        sdf
                    </Col>
                    <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                        bbb
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: 10}}>
                    <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                        ddd
                    </Col>
                    <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
                        cccc
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop: 10}}>
                    <Col xs={2} sm={6} md={8} lg={8} xl={8} xxl={8}>
                        aaaa
                    </Col>
                    <Col xs={2} sm={6} md={16} lg={16} xl={16} xxl={16}>
                            aaaa
                    </Col>
                </Row>
            </div>
        );
    }
}
export default SpecialWorkbench;
