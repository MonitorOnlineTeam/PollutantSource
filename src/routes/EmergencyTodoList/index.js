import React, { Component } from 'react';
import { Row, Col, Spin } from 'antd';
import EmergencyDataList from './EmergencyDataList';
import PointList from '../../components/PointList/PointsList';

export default class componentName extends Component {
    render() {
        return (
            <div style={{ width: '100%',
                height: 'calc(100vh - 120px)' }}>
                    <Row gutter={8}>
                        <Col span={4}><PointList /></Col>
                        <Col span={20}> <EmergencyDataList /></Col>
                    </Row>
            </div>
        );
    }
}
