import React, { Component } from 'react';
import {
    Row,
    Col
} from 'antd';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import moment from 'moment';
class Video extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
        };
    }
    render() {
        return (
            <div>

                <Row gutter={24}>
                    <Col>
                        <span >时间: <RangePicker_ style={{width: 350}} format="YYYY-MM-DD HH:mm:ss" dateValue={this.state.rangeDate} /></span>
                    </Col>

                </Row>
                <Row gutter={24}>
                    <Col>
                        <div style={{width: '100%', height: 500, backgroundColor: 'black', marginTop: 15}} />
                    </Col>

                </Row>

            </div>
        );
    }
}

export default Video;
