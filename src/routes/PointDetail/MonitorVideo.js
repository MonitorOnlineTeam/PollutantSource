// import liraries
import React, { Component } from 'react';
import {Row, Col, Tabs} from 'antd';
import RealTimeVideo from '../../components/PointDetail/RealTimeVideo';
import HistoryVideo from '../../components/PointDetail/HistoryVideo';
import styles from './index.less';
/*
页面：4、监控视频
描述：实时、历史视频，可以和数据、参数、报警等联动查看
add by cg 18.6.8
modify by myt
*/

const { TabPane } = Tabs;
class MonitorVideo extends Component {
    render() {
        return (
            <div style={{width: '100%', padding: 10, height: 'calc(100vh - 225px)'}} >
                <Tabs size="large" tabBarStyle={{ marginBottom: 24 }} style={{height: 'calc(100vh - 235px)'}}>
                    <TabPane tab="实时视频" key="real">
                        <Row>
                            <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                                <div className={styles.videoHeight} style={{height: 'calc(100vh - 250px)'}}>
                                    <RealTimeVideo />
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="历史视频" key="history">
                        <Row>
                            <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                                <div className={styles.videoHeight} style={{height: 'calc(100vh - 250px)'}}>
                                    <HistoryVideo />
                                </div>
                            </Col>

                        </Row>
                    </TabPane>
                </Tabs>
            </div>

        );
    }
}
// make this component available to the app
export default MonitorVideo;
