import React, { Component } from 'react';
import PointList from '../../components/PointList/PointsList';
import { Breadcrumb, Card, Tabs, Icon } from 'antd';
import styles from '../../routes/PointDetail/index.less';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import ReactEcharts from 'echarts-for-react';
import { Link } from 'dva/router';
import moment from 'moment';
import AlarmTimeRange from '../../mockdata/Base/Code/T_Cod_AlarmTimeRange.json';
/*
页面：报警时间范围分布情况
描述：统计一段时间24个小时分布情况
add by cg 18.6.8
modify by
*/
export default class AnalyAlarmhourarea extends Component {
    _handleDateChange=(date, dateString) => {
        this.setState({rangeDate: date});
    };
    constructor(props) {
        super(props);
        var dataList = [];
        var PointNames = [];
        AlarmTimeRange.map((item) => {
            var timedata = [];
            var times = item.time.split(',');
            times.map((item) => {
                timedata.push(item);
            });
            PointNames.push(item.PointName);
            dataList.push({
                name: item.PointName,
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: timedata
            });
        });

        this.state = {
            rangeDate: [moment('2018-06-23 00:00:00'), moment('2018-06-25 00:00:00')],
            AlarmTimeRangeList: AlarmTimeRange,
            DGIMNS: [],
            DataLists: dataList,
            PointName: PointNames,
        };
    }
    SearchEmergencyDataList = (value) => {
        debugger;
        this.setState({
            AlarmTimeRangeList: [],
            DataLists: [],
            DGIMNS: value,
            PointName: [],
        });
        let AlarmTimeRangeLists = [];
        let Data = [];
        let Name = [];
        AlarmTimeRange.map((item, _key) => {
            if (value.indexOf(item.DGIMN) > -1) {
                AlarmTimeRangeLists.push(item);
            }
        });
        AlarmTimeRangeLists.map((item) => {
            var timedata = [];
            var times = item.time.split(',');
            times.map((item) => {
                timedata.push(item);
            });
            Name.push(item.PointName);
            Data.push({
                name: item.PointName,
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: timedata
            });
        });
        this.setState({
            AlarmTimeRangeList: AlarmTimeRangeLists,
            DataLists: Data,
            PointName: Name,
        });
    };
    render() {
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: this.state.PointName
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']

            },
            yAxis: {
                type: 'value'
            },
            series: this.state.DataLists
            //  [
            //     {
            //         name: '大唐供热集团-脱硫入口1',
            //         type: 'bar',
            //         stack: '总量',
            //         label: {
            //             normal: {
            //                 show: true,
            //                 position: 'insideRight'
            //             }
            //         },
            //         data: [320, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330],
            //     },
            //     {
            //         name: '大唐供热集团-脱硫入口2',
            //         type: 'bar',
            //         stack: '总量',
            //         label: {
            //             normal: {
            //                 show: true,
            //                 position: 'insideRight'
            //             }
            //         },
            //         data: [120, 132, 101, 134, 90, 230, 210, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330]
            //     },
            //     {
            //         name: '北京绿都供暖-脱硫入口',
            //         type: 'bar',
            //         stack: '总量',
            //         label: {
            //             normal: {
            //                 show: true,
            //                 position: 'insideRight'
            //             }
            //         },
            //         data: [220, 182, 191, 234, 290, 330, 310, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330]
            //     },
            //     {
            //         name: '巴中垃圾焚烧电厂-脱硫入口1',
            //         type: 'bar',
            //         stack: '总量',
            //         label: {
            //             normal: {
            //                 show: true,
            //                 position: 'insideRight'
            //             }
            //         },
            //         data: [150, 212, 201, 154, 190, 330, 410, 302, 301, 334, 390, 330, 320, 302, 101, 334, 390, 330, 320, 302, 301, 334, 590, 330]
            //     },
            // ]
        };
        return (
            <div style={{ width: '100%',
                height: 'calc(100vh - 67px)' }}>
                <PointList handleChange={this.SearchEmergencyDataList} IsMoreSlect="true">
                    <div className={styles.pageHeader}>
                        <Breadcrumb className={styles.breadcrumb} >
                            <Breadcrumb.Item key="1">
                                <Link to="/monitor/overview"> 首页 </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item key="1">
                            综合分析
                            </Breadcrumb.Item>
                            <Breadcrumb.Item key="1-3-1">
                            报警专题分析
                            </Breadcrumb.Item>
                            <Breadcrumb.Item key="1-3-1">
                            报警时间范围分布情况
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div>
                        <Card style={{ height: 'calc(100vh - 145px)' }}>
                            <RangePicker_ style={{width: 250}} dateValue={this.state.rangeDate} format="YYYY-MM-DD" onChange={this._handleDateChange} />

                            <ReactEcharts option={option} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 'calc(100vh - 380px)' }} />

                        </Card>
                    </div>
                    <div style={{marginTop: -160, marginLeft: 70}}>
                        <Card title="总结：">
                            <p>报警在22时次数最多，报警在2时次数最少</p>
                        </Card>
                    </div>
                </PointList>
            </div>
        );
    }
}
