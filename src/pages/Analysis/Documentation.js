import React, { Component } from 'react';
import PDF from 'react-pdf-js';
import {
    Card,
    Spin,
    Row,
    Col,
} from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import MonitorContent from '../../components/MonitorContent/index';
import styles from './MonitoringReport.less';
import { documentationaddress } from '../../config';

@connect(({ loading, analysisdata }) => ({
    documentationParameters: analysisdata.documentationParameters,
    loading: loading.effects['analysisdata/GetDocumentationList'],
}))

/*
页面：使用文档
*/

class Documentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        let { dispatch } = this.props;
        dispatch({
            type: 'analysisdata/GetDocumentationList',
            payload: {
            }
        });
    }
    /**
       * 更新model中的state
      */
    updateState = (payload) => {
        this.props.dispatch({
            type: 'analysisdata/updateState',
            payload: payload,
        });
    }
    showPdf = (reportname) => {
        this.updateState({
            documentationParameters: {
                ...this.props.documentationParameters,
                ...{
                    reportname: reportname,
                    isfirst: false,
                }
            }
        });
    }
    //右侧文档内容
    getshowpdf = () => {
        const { documentationParameters } = this.props;
        if (documentationParameters.isfirst) {
            if (documentationParameters.documentationList) {
                documentationParameters.reportname = documentationParameters.documentationList[0];
            }
        }
        let address = documentationaddress + documentationParameters.reportname;
        let height = 'calc(100vh - 259px)';
        if (!documentationParameters.reportname) {
            address = null;
            height = 70;
        }
        return (
            <div>
                <iframe className={styles.if} style={{ border: 0, width: "100%", height: height }} src={address} />
                {address ? <div /> : <div style={{ textAlign: 'center' }}>暂无数据</div>}
            </div>
        );
    }
    //文档列表
    getdocumentationList = () => {
        const { documentationParameters } = this.props;
        const list = documentationParameters.documentationList;
        let res = [];
        if (list.length !== 0) {
            list.map((item, key) => {
                res.push(<div key={key} onClick={() => this.showPdf(item)} className={styles.reportdiv}>
                    <li style={{ textAlign: 'center' }}><img className={styles.reportimg} src="/report.png" /></li>
                    <li style={{ textAlign: 'center' }} className={styles.reportcontent}>{item}</li>
                </div>);
            });
        }
        return res;
    }

    render() {
        const { loading } = this.props;
        if (loading) {
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
            <MonitorContent
                {...this.props}
            >
                <div className={styles.cardTitle}>
                    <Card
                        title="使用文档"
                    >
                        <Row>
                            <Col style={{ float: "left", overflowY: 'scroll', height: 'calc(100vh - 245px)' }}>
                                <div style={{ width: '400px' }}>
                                    {this.getdocumentationList()}
                                </div>
                            </Col>
                            <Col style={{ width: document.body.clientWidth - 550, float: 'left', height: 'calc(100vh - 245px)' }}>
                                {this.getshowpdf()}
                            </Col>
                        </Row>
                    </Card>
                </div>
            </MonitorContent>
        );
    }
}

export default Documentation;