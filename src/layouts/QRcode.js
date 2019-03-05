import React, { Component } from 'react';
import { Input, Select, InputNumber, Button, Upload, DatePicker, Row, Col, Radio, message, Icon, Spin } from 'antd';
import { connect } from 'dva';
import styles from './QRcode.less'
@connect(({ login, loading }) => ({
    isloading: loading.effects['login/getip'],
    getIPList: login.getIPList
}))
/*
页面：二维码弹出窗口
*/

export default class QRcode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ""
        };
    }
    componentDidMount() {
        this.props.onRef(this);
        this.props.dispatch({
            type: 'login/getip',
            payload: {
            }
        });
    }

    render() {
        var React = require('react');
        var QRCode = require('qrcode.react');
        debugger
        var location = window.location.host;
        var iosPath = "";
        if (this.props.getIPList.length !== 0) {
            //如果是本地则连接内网地址
            if (location.split(':')[0] === "localhost") {
                location = this.props.getIPList.androidInnerAddress
            }
            else {
                location = window.location.protocol + "//" + window.location.host + relativePath
            }
            //读取ios地址
            iosPath = this.props.getIPList.getIsoNetIP
        }
        if (this.props.isloading) {
            return (<Spin
                style={{
                    width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                size="large"
            />);
        }
        return (
            <div className={styles.divs}>
                <Row>
                    <Col span={12} >
                        <div style={{ paddingLeft: '75px' }}>
                            <QRCode size={200} value={location} />
                        </div>
                        <div className={styles.divTwo} style={{ backgroundColor: '#8FC542' }}>
                            <div style={{ float: 'left', paddingTop: '5px' }}>
                                <Icon style={{ color: '#FFFFFF' }} className={styles.icons} type="android" />
                            </div>
                            <div style={{ float: 'left' }}>
                                <span className={styles.text}>安卓版</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{ paddingLeft: '75px' }}>
                            <QRCode size={200} value={iosPath} />
                        </div>
                        <div className={styles.divTwo} style={{ backgroundColor: '#65B3DB' }}>
                            <div style={{ float: 'left', paddingTop: '5px' }}>
                                <Icon style={{ color: '#FFFFFF' }} className={styles.icons} type="apple" />
                            </div>
                            <div style={{ float: 'left' }}>
                                <span className={styles.text}>苹果版</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div >
        );
    }
}
