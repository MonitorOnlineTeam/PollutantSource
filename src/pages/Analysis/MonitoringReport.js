import React, { Component } from 'react';
import PDF from 'react-pdf-js';
import {
    Card,
    Radio,
    DatePicker,
    Spin,
    Row,
    Col,
    message,
    Select,
} from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { readFileSync } from 'fs';
import MonitorContent from '../../components/MonitorContent/index';
import styles from './MonitoringReport.less';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import { annualmonitoringreportaddress } from '../../config';
import { onlyOneEnt } from '../../config';

const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const Option = Select.Option;

@connect(({ loading, analysisdata }) => ({
    loading: loading.effects['analysisdata/queryreportlist'],
    queryreportParameters: analysisdata.queryreportParameters,
    enterpriselist: analysisdata.enterpriselist,
}))
class MonitoringReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'analysisdata/queryreportlist',
            payload: {
            }
        });
        if (!onlyOneEnt) {
            this.props.dispatch({
                type: 'analysisdata/GetEntpriseList',
                payload: {
                }
            });
        }
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
    handlePanelChange = (value, mode) => {
        if (value) {
            this.updateState({
                queryreportParameters: {
                    ...this.props.queryreportParameters,
                    ...{
                        rangeDate: value
                    }
                }
            });
        }
    }
    //多企业时加载下拉菜单
    WhetherLoadSelect = () => {
        const { enterpriselist } = this.props;
        let optionList = [];
        if (!onlyOneEnt) {
            if (enterpriselist.length !== 0) {
                enterpriselist.map((item) => {
                    optionList.push(<Option value={item.EntCode}>{item.EntName}</Option>)
                })
            }
        }
        return optionList;
    }
    //选择企业事件
    EnterpriseonChange = (value) => {
        const { dispatch } = this.props;
        this.updateState({
            queryreportParameters: {
                ...this.props.queryreportParameters,
                ...{
                    isfirst: true,
                    entCode: value,
                    reportname: null, //如果不置空则会导致
                }
            }
        });
        dispatch({
            type: 'analysisdata/queryreportlist',
            payload: {
            }
        });
    }
    onOpenChange = (status) => {
        let { queryreportParameters, dispatch } = this.props;
        //日期窗口关闭时触发事件
        if (!status) {

            //将是否选择标签改为默认，因为时间查询的是所有的报表
            this.updateState({
                queryreportParameters: {
                    ...this.props.queryreportParameters,
                    ...{
                        isfirst: true
                    }
                }
            });

            if (queryreportParameters.rangeDate[0] > queryreportParameters.rangeDate[1]) {
                this.updateState({
                    queryreportParameters: {
                        ...this.props.queryreportParameters,
                        ...{
                            rangeDate: [moment(moment(new Date()).format('YYYY-01-01')).add(-1, 'year').add(8, 'hours'), moment(new Date()).add(8, 'hours')]
                        }
                    }
                });
                message.error('开始时间不能大于结束时间！');
            } else if (queryreportParameters.length === 0) {
                if (queryreportParameters.rangeDate[0].format('YYYY-01-01') !== moment(moment(new Date()).format('YYYY-01-01')).add(-1, 'year') && queryreportParameters.rangeDate[1].format('YYYY-01-01') !== moment(new Date()).format('YYYY-01-01')) {
                    this.updateState({
                        queryreportParameters: {
                            ...this.props.queryreportParameters,
                            ...{
                                catchDate: [queryreportParameters.rangeDate[0], queryreportParameters.rangeDate[1]]
                            }
                        }
                    });
                    dispatch({
                        type: 'analysisdata/queryreportlist',
                        payload: {
                        }
                    });
                }

            } else if (queryreportParameters.rangeDate[0] !== queryreportParameters.catchDate[0] && queryreportParameters.rangeDate[1] !== queryreportParameters.catchDate[1]) {
                this.updateState({
                    queryreportParameters: {
                        ...this.props.queryreportParameters,
                        ...{
                            catchDate: [queryreportParameters.rangeDate[0], queryreportParameters.rangeDate[1]]
                        }
                    }
                });
                dispatch({
                    type: 'analysisdata/queryreportlist',
                    payload: {
                    }
                });

            }
        }
    }
    //展示右侧PDF文件内容
    showPdf = (reportname) => {
        this.updateState({
            queryreportParameters: {
                ...this.props.queryreportParameters,
                ...{
                    reportname: reportname,
                    isfirst: false
                }
            }
        });
    }

    getshowpdf = () => {
        const { queryreportParameters } = this.props;
        if (queryreportParameters.reportlist) {
            if (queryreportParameters.isfirst) {
                switch (queryreportParameters.radiovalue) {
                    case 'year':
                        if (queryreportParameters.reportlist.yearlist)
                            queryreportParameters.reportname = queryreportParameters.reportlist.yearlist[0];
                        break;
                    case 'season':
                        if (queryreportParameters.reportlist.seasonlist)
                            queryreportParameters.reportname = queryreportParameters.reportlist.seasonlist[0];
                        break;
                    case 'month':
                        if (queryreportParameters.reportlist.monthlist)
                            queryreportParameters.reportname = queryreportParameters.reportlist.monthlist[0];
                        break;
                    default:
                        queryreportParameters.reportname = null;
                        break;
                }
            }
        }
        else {
            queryreportParameters.reportname = null;
        }
        let address = annualmonitoringreportaddress + queryreportParameters.reportname;
        let height = 'calc(100vh - 259px)';
        if (!queryreportParameters.reportname) {
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

    getreportlist = () => {
        const { queryreportParameters } = this.props
        const list = queryreportParameters.reportlist;
        const type = queryreportParameters.radiovalue;
        let res = [];
        if (list) {
            if (type == "year" && list.yearlist) {

                list.yearlist.map((item, key) => {
                    res.push(<div key={key} onClick={() => this.showPdf(item)} className={styles.reportdiv}>
                        <li style={{ textAlign: 'center' }}><img className={styles.reportimg} src="/report.png" /></li>
                        <li style={{ textAlign: 'center' }} className={styles.reportcontent}>{item}</li>
                    </div>);
                });
            } else if (type == "season" && list.seasonlist) {
                list.seasonlist.map(item => {
                    res.push(<div key={key} onClick={() => this.showPdf(item)} className={styles.reportdiv}>
                        <li><img className={styles.reportimg} src="/report.png" /></li>
                        <li className={styles.reportcontent}>{item}</li>
                    </div>);
                });
            } else if (type == "month" && list.monthlist) {
                list.monthlist.map(item => {
                    res.push(<div key={key} onClick={() => this.showPdf(item)} className={styles.reportdiv}>
                        <li><img className={styles.reportimg} src="/report.png" /></li>
                        <li className={styles.reportcontent}>{item}</li>
                    </div>);
                });
            }
        }
        return res;
    }

    render() {
        const { loading, queryreportParameters } = this.props;
        // if (this.props.loading) {
        //     return (<Spin
        //         style={{
        //             width: '100%',
        //             height: 'calc(100vh/2)',
        //             display: 'flex',
        //             alignItems: 'center',
        //             justifyContent: 'center'
        //         }}
        //         size="large"
        //     />);
        // }
        return (
            <MonitorContent
                {...this.props}
                breadCrumbList={
                    [
                        { Name: '智能分析', Url: '' },
                        { Name: '自行监测年度报告', Url: '' }
                    ]
                }
            >
                <div className={styles.cardTitle}>
                    <Card
                        title="自行监测年度报告"
                        extra={
                            <div>
                                {
                                    onlyOneEnt ? null :
                                        <Select
                                            allowClear
                                            showSearch
                                            style={{ width: 250 }}
                                            placeholder="请选择企业"
                                            optionFilterProp="children"
                                            onChange={this.EnterpriseonChange}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {this.WhetherLoadSelect()}
                                        </Select>
                                }

                                <RangePicker
                                    style={{ width: 250, marginLeft: 40, textAlign: 'center' }}
                                    format={queryreportParameters.format}
                                    value={queryreportParameters.rangeDate}
                                    mode={queryreportParameters.mode}
                                    onPanelChange={this.handlePanelChange}
                                    onOpenChange={this.onOpenChange}
                                    showTime={true}
                                />
                            </div>
                        }
                    >
                        <Row>
                            <Col style={{ float: "left", overflowY: 'scroll', height: 'calc(100vh - 245px)' }}>
                                <div style={{ width: '400px' }}>
                                    <Spin style={{ height: 'calc(100vh - 245px)', width: '400px' }} spinning={this.props.loading}>
                                        {this.getreportlist()}
                                    </Spin>
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

export default MonitoringReport;