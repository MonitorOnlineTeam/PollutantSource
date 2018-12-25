
import React, { Component } from 'react';
import { Row, Col,Card,List, message, Avatar, Spin } from 'antd';
import styles from './index.less';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
/*
页面：工作台
add by cg 18.6.8
modify by wjw 18.12.24
*/

const gridStyle = {
    width: '50%',
    textAlign: 'center',
  };
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
class SpecialWorkbench extends Component {
    constructor(props) {
        super(props);

        this.state = {
            key: 'tab1',
            noTitleKey: 'app',
            data: [],
            loading: false,
            hasMore: true,
        };
    }
    componentDidMount() {
        this.fetchData((res) => {
            this.setState({
            data: res.results,
            });
        });
    }
    fetchData = (callback) => {
        reqwest({
          url: fakeDataUrl,
          type: 'json',
          method: 'get',
          contentType: 'application/json',
          success: (res) => {
            callback(res);
          },
        });
    }
    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    }
    render() {
        return (
          <div className={styles.workBench}>
            {/* <Card style={{ }} bordered={false}>
                <p>智能监控</p>
            </Card> */}
            <div className={styles.headerDiv}>
                <p>智能监控</p>
                <p style={{float:"right",marginRight:'5%'}}>
                    <span style={{marginRight:20}}>排放口:<span style={{marginLeft:5,color:'rgb(72,145,255)'}}>12</span></span>
                    <span style={{marginRight:20}}>运行:<span style={{marginLeft:5,color:'rgb(93,192,94)'}}>8</span></span>
                    <span style={{marginRight:20}}>超标:<span style={{marginLeft:5,color:'rgb(244,5,4)'}}>3</span></span>
                    <span style={{marginRight:20}}>关停:<span style={{marginLeft:5,color:'rgb(208,145,14)'}}>1</span></span>
                </p>
            </div>
            <Row gutter={24}>
                <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                    <Card
                        title='当前超标排口(0个)'
                        bordered={false}
                        >
                        <div className={styles.mapChart}>
                            <img
                                src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                                alt="map"
                            />
                        </div>
                    </Card>
                </Col>
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Card
                        title='10月超标汇总'
                        style={{ marginBottom: 24 }}
                        bordered={false}
                        >
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={this.handleInfiniteOnLoad}
                            hasMore={!this.state.loading && this.state.hasMore}
                            useWindow={false}
                            >
                            <List
                                dataSource={this.state.data}
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title={<a href="https://ant.design">{item.name.last}</a>}
                                        description={item.email}
                                        />
                                        <div>Content</div>
                                    </List.Item>
                                    )}
                                >
                                {this.state.loading && this.state.hasMore && (
                                <div className="demo-loading-container">
                                    <Spin />
                                </div>
                                )}
                            </List>
                        </InfiniteScroll>
                    </Card>
                    <Card
                        title='当前小时预警消息'
                        style={{ marginBottom: 24 }}
                        bodyStyle={{ textAlign: 'center' }}
                        bordered={false}
                        >
                        22222
                    </Card>
                </Col>
            </Row>

            <div className={styles.headerDiv}>
                <p>智能质控</p>
            </div>

            <Row gutter={24}>
                <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                    <Row>
                        <Col span={24}>
                            <Card style={{}}>
                                <Card.Grid style={gridStyle}>实时联网率</Card.Grid>
                                <Card.Grid style={gridStyle}>表格</Card.Grid>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Card style={{marginTop:10}}>
                                <Card.Grid style={gridStyle}>十月设备运转率</Card.Grid>
                                <Card.Grid style={gridStyle}>表格</Card.Grid>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Card style={{marginTop:10}}>
                                <Card.Grid style={gridStyle}>十月传输有效率</Card.Grid>
                                <Card.Grid style={gridStyle}>表格</Card.Grid>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Card
                        title='异常报警'
                        style={{ marginBottom: 24,textAlign:'center' }}
                        bordered={false}
                        >
                       111111
                    </Card>
                </Col>
            </Row>

            <div className={styles.headerDiv}>
                <p>智能运维</p>
            </div>

            <Row gutter={24}>
                <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10 }}>
                    <Card style={{ }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Card style={{ }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
            </Row>
          </div>
        );
    }
}
export default SpecialWorkbench;
