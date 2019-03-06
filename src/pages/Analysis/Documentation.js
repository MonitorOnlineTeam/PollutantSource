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
    documentationList: analysisdata.documentationList,
    loading: loading.effects['analysisdata/GetDocumentationList'],
}))

/*
页面：使用文档
*/

class Documentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportname: null,
            isfirst: true,
        };
    }

    componentDidMount() {
        let { dispatch } = this.props;
        dispatch({
            type: 'analysisdata/GetDocumentationList',
            payload: {
                beginTime: null,
                endTime: null
            }
        });
    }

    showPdf = (reportname) => {
        this.setState({
            reportname,
            isfirst: false
        });
    }

    getshowpdf = () => {
        let { isfirst, reportname } = this.state;
        const { documentationList } = this.props;
        if (isfirst) {
            if (documentationList) {
                reportname = documentationList[0];
            }
        }
        let address = documentationaddress + reportname;
        let height = 'calc(100vh - 259px)';
        if (!reportname) {
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

    getdocumentationList = () => {
        let { documentationList } = this.props;
        const list = documentationList;
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