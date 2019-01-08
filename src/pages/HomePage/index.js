import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    List,
    Spin,
    Table,
    Calendar,
    Badge,
    Tag,
    Icon,
    Button,
    Tabs,
    Divider,
    Modal
} from 'antd';
import ReactEcharts from 'echarts-for-react';
import {
    connect
} from 'dva';
import config from '../../config';
import styles from './index.less';
/*
页面：首页
add by xpy
modify by
*/
const pageUrl = {
    getRateStatisticsData: 'workbenchmodel/getRateStatisticsData',
};
@connect(({
    loading,
    workbenchmodel,
}) => ({
    loadingRateStatistics: loading.effects[pageUrl.getRateStatisticsData],
    rateStatistics: workbenchmodel.rateStatistics,
}))
class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentWillMount() {
        this.getRateStatisticsData();
    }

    /**
     * 智能质控_率的统计_更新数据
     */
    getRateStatisticsData = () => {
        this.props.dispatch({
            type: pageUrl.getRateStatisticsData,
            payload: {},
        });
    }

    /**
     * 智能质控_渲染图表
     */
    getOption = (type) => {
        const {model}=this.props.rateStatistics;
        let networkeRate=(parseFloat(model.NetworkeRate) * 100).toFixed(2);
        let runningRate=(parseFloat(model.RunningRate) * 100).toFixed(2);
        let transmissionEffectiveRate=(parseFloat(model.TransmissionEffectiveRate) * 100).toFixed(2);

        let legendData=[];
        let color=[];
        let seriesName='';
        let seriesData=[];
        if(type===1) {
            legendData=['正常','离线'];
            color=['rgb(86,244,133)','rgb(32,99,81)'];
            seriesName='实时联网率';
            seriesData=[//(parseFloat(model.NetworkeRate) * 100).toFixed(2)
                {value:networkeRate, name:'正常'},
                {value:100-networkeRate, name:'离线'}
            ];
        }else if(type===2) {
            legendData=['达标','未达标'];
            color=['rgb(86,244,133)','rgb(52,150,103)'];
            seriesName='设备运转率';
            seriesData=[
                {value:runningRate, name:'达标'},
                {value:(100-runningRate).toFixed(2), name:'未达标'}
            ];
        }else {
            legendData=['达标','未达标'];
            color=['rgb(255,78,78)','rgb(89,55,72)'];
            seriesName='传输有效率';
            seriesData=[
                {value:transmissionEffectiveRate, name:'达标'},
                {value:(100-transmissionEffectiveRate).toFixed(2), name:'未达标'}
            ];
        }
        let option = {
            color: color,
            title:{
                text: seriesName,
                textAlign:'center',
                x:'80',
                y: '115',
                padding:0,
                textStyle:{
                    fontSize: 14,
                    fontWeight: 'bolder',
                    color: '#72A0BA'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b}:{d}%",
                position:[10,20]
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:[]
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '10',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    data: seriesData
                }
            ]
        };
        return option;
    }

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: 'calc(100vh - 65px)',
                    overflow: 'hidden'
                }}
                className={styles.divcontent}
            >


                <Row gutter={24}>
                    <Col span={24}>
                        <div className={styles.divhead}>
                            <div className={styles.divleft} />
                            <div className={styles.divlogotext}>{config.logindesc}</div>
                            <div className={styles.divright} />
                        </div>
                    </Col>
                </Row>


                <Row gutter={24}>
                    <Col xl={7} lg={24} md={24} sm={24} xs={24}>
                        <Row gutter={24}>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <div className={styles.divfirt}>
                                    <p>智能质控</p>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <div style={{margin:'0px 0px 10px 30px'}}>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                    <div>
                                        <ReactEcharts
                                            loadingOption={this.props.loadingRateStatistics}
                                            option={this.getOption(1)}
                                            style={{height: '130px', width: '110%'}}
                                            className="echarts-for-echarts"
                                            theme="my_theme"
                                        />
                                    </div>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                    <div>
                                        <ReactEcharts
                                            loadingOption={this.props.loadingRateStatistics}
                                            option={this.getOption(2)}
                                            style={{height: '130px', width: '110%'}}
                                            className="echarts-for-echarts"
                                            theme="my_theme"
                                        />
                                    </div>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8}>
                                    <div>
                                        <ReactEcharts
                                            loadingOption={this.props.loadingRateStatistics}
                                            option={this.getOption(3)}
                                            style={{height: '130px', width: '110%'}}
                                            className="echarts-for-echarts"
                                            theme="my_theme"
                                        />
                                    </div>
                                </Col>
                            </div>
                        </Row>
                        <Row gutter={24}>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <div className={styles.divsecond}>
                                    <div className={styles.divson1}>十月质控只能预警<h2>18</h2>次</div>
                                    <div className={styles.divson2}>
                                        <div>同比<p className={styles.padd} />3次</div>
                                        <div>环比<p className={styles.pdeduct} />3次</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col />
                        </Row>
                    </Col>
                    <Col xl={10} lg={24} md={24} sm={24} xs={24}>
                        <Row gutter={24}>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <div className={styles.divfirt}>
                                    <p>智能监控</p>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col />
                        </Row>
                        <Row gutter={24}>
                            <Col />
                        </Row>
                        <Row gutter={24}>
                            <Col />
                        </Row>
                    </Col>
                    <Col xl={7} lg={24} md={24} sm={24} xs={24}>col-7</Col>
                </Row>
            </div>
        );
    }
}
export default HomePage;
