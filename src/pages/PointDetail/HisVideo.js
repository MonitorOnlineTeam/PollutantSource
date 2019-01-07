import React, { Component } from 'react';
import {Row, Col, Card, Divider,DatePicker, Button} from 'antd';
import moment from 'moment';
import HistoryVideo from '../../components/PointDetail/HistoryVideo';
import styles from './index.less';


/*
页面：5、历史视频
描述：可以和数据、参数、报警等联动查看
add by myt 18.7.9
*/

const {RangePicker} = DatePicker;
class HisVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            beginDate:moment().add(-1, 'd'),
            endDate:moment()
        };
    }


    rangepickerOnChange=(date, dateString) => {
        this.setState({beginDate: date[0], endDate: date[1]});
    }

    btnClick=(opt)=>{
        if(opt===7){
            this.child.startPlay();
        }
        if(opt===8){            
            this.child.endPlay();
        }
        let obj={"opt":opt};
        let {beginDate,endDate}=this.state;
        obj={"opt":opt,"beginDate":beginDate.format('YYYY-MM-DD HH:mm:ss'),"endDate":endDate.format('YYYY-MM-DD HH:mm:ss')};
        let frame = document.getElementById('ifm').contentWindow;
        frame.postMessage(obj,'http://localhost:36999');
    }

    HistoryVideoCompant = (ref) => {
        this.child = ref;
    }

    render() {
        const {beginDate,endDate}=this.state;
        return (
            <div style={{height: 'calc(100vh - 225px)'}}>
                <Row gutter={24} style={{ height: '55%' }}>
                    <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10, height: '100%' }}>
                        <iframe title="历史视频" id="ifm" frameBorder="0" src="http://localhost:36999/Video/MonitorLinkCamera/HistoryCameraReact?ip=115.149.151.108&port=9000&userName=admin&userPwd=abc12345&cameraNo=2" width="100%" height="100%" />
                    </Col>
                    <Col xl={6} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 10, height: '100%' }}>
                        <Card className={styles.hisYunStyle}>
                            <Row>
                                <Col span={24}>
                                    <RangePicker
                                        defaultValue={[moment(beginDate),moment(endDate)]}
                                        showTime={{format: 'HH'}}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        onChange={this.rangepickerOnChange}
                                    />
                                </Col>
                            </Row>
                            <Divider type="horizontal" />
                            <Row>
                                <Col span={24}>
                                    <Row style={{marginTop:'10px'}}>
                                        <Col className={styles.gutterleft} span={8}><Button icon="caret-right" onClick={this.btnClick.bind(this,7)}>开始回放</Button></Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="up-square-o" onClick={this.btnClick.bind(this,8)}>停止回放</Button></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Divider type="horizontal" />
                            <Row>
                                <Col span={24}>
                                    <Row>
                                        <Col className={styles.gutterleft} span={8}><Button icon="fast-backward" onClick={this.btnClick.bind(this,1)}> 倒放</Button></Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="up-square-o" onClick={this.btnClick.bind(this,2)}>暂停</Button></Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="caret-right" onClick={this.btnClick.bind(this,3)}>恢复</Button></Col>
                                    </Row>
                                    <Row style={{marginTop:'30px'}}>
                                        <Col className={styles.gutterleft} span={8}><Button icon="step-forward" onClick={this.btnClick.bind(this,4)}>慢放</Button></Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="fast-forward" onClick={this.btnClick.bind(this,5)}>快放</Button></Col>
                                        <Col className={styles.gutterleft} span={8}><Button icon="picture" onClick={this.btnClick.bind(this,6)}>抓图</Button></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ height: '20%' }}>
                    <HistoryVideo onRef={this.HistoryVideoCompant}  {...this.props} beginDate={beginDate.format('YYYY-MM-DD HH:mm:ss')} endDate={endDate.format('YYYY-MM-DD HH:mm:ss')} />
                </Row>
            </div>
        );
    }
}
export default HisVideo;