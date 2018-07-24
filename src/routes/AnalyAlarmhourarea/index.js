import React, { Component } from 'react';
import PointList from '../../components/PointList/PointsList';
import { Breadcrumb, Card, Tabs, Icon } from 'antd';
import styles from '../../routes/PointDetail/index.less';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import ReactEcharts from 'echarts-for-react';
import { Link } from 'dva/router';
import moment from 'moment';
import AlarmTimeRange from '../../mockdata/AnalyAlarmhourarea/AlarmTimeRange';
import ConclusionInfo from '../../components/EnterpriseList/Conclusion';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Cookie from 'js-cookie';
/*
页面：报警时间范围分布情况
描述：统计一段时间24个小时分布情况
add by cg 18.6.8
modify by
*/
let Alarm = AlarmTimeRange[1];
export default class AnalyAlarmhourarea extends Component {
    constructor(props) {
        super(props);
        var date = new Date();
        // 判断登陆用户是集团用户还是赴南昌用户1
        const user = JSON.parse(Cookie.get('token'));
        if (user.User_Account === 'lisonggui') {
            Alarm = AlarmTimeRange[0];
        }

        // 循环求取数据
        var dataList = [];
        var PointNames = [];
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var dates = date.getDate();
        Alarm.data.map((item) => {
            debugger;
            var time = new Date((item.datetimes).replace(/-/g, '/'));
            var nowtime = new Date((year + '-' + month + '-' + dates).replace(/-/g, '/'));
            if (time >= nowtime && time <= nowtime) {
                var times = item.time.split(',');
                var timedata = [];
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
            }
        });

        var commentinfo = Alarm.comment;
        var time = [];
        console.log(AlarmTimeRange[2].time[0].split(','));
        AlarmTimeRange[2].time[0].split(',').map((item) => {
            time.push(item);
        });

        this.state = {
            rangeDate: [moment(date), moment(date)],
            AlarmTimeRangeList: AlarmTimeRange,
            DataLists: dataList,
            PointName: PointNames,
            comments: commentinfo,
            times: time,
        };
    }
    _handleDateChange=(date, dateString) => {
        this.setState({
            DataLists: [],
            PointName: [],
        });
        debugger;
        console.log(`${date[0].format('YYYY-MM-DD 00:00:00')}`);
        // console.log(typeof (`${Alarm.data[0].datetimes}`));
        console.log(typeof (begin));
        var dataList = [];
        var PointNames = [];
        var beginyear = date[0]._d.getFullYear();
        var beginmonth = date[0]._d.getMonth() + 1;
        var begindate = date[0]._d.getDate();
        var endyear = date[1]._d.getFullYear();
        var endmonth = date[1]._d.getMonth() + 1;
        var enddate = date[1]._d.getDate();
        // if (beginyear === endyear && beginmonth === endmonth && begindate === enddate) {

        // }
        var begintime = new Date((beginyear + '-' + beginmonth + '-' + begindate).replace(/-/g, '/'));
        var endtime = new Date((endyear + '-' + endmonth + '-' + enddate).replace(/-/g, '/'));
        Alarm.data.map((item) => {
            var time = new Date((item.datetimes).replace(/-/g, '/'));
            if (time >= begintime && time <= endtime) {
                var times = item.time.split(',');
                var timedata = [];
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
            }
        });
        this.setState({
            rangeDate: date,
            DataLists: dataList,
            PointName: PointNames,
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
                bottom: '1%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: this.state.times,

            },
            yAxis: {
                type: 'value'
            },
            series: this.state.DataLists
        };
        return (
            <div style={{ width: '100%',
            }}>
                <PageHeaderLayout>
                    <div>
                        <ConclusionInfo content={this.state.comments}>
                            <Card
                                extra={
                                    <div>
                                        <RangePicker_ style={{width: 250}} placeholder="请选择时间" format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                                    </div>
                                }
                            >
                                <ReactEcharts option={option} lazyUpdate={true} notMerge={true} style={{ width: '100%', height: 'calc(100vh - 350px)' }} />
                            </Card>
                        </ConclusionInfo>
                    </div>
                </PageHeaderLayout>
            </div>
        );
    }
}
