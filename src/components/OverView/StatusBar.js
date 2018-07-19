import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
class StatusBar extends Component {
    render() {
        const legenddata = this.props.legenddata;
        const series = this.props.series;
        const option = {
            color: ['#003366', '#006699', '#4cabce', '#e5323e'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['本月', '上月']
            },

            calculable: true,
            xAxis: [
                {
                    name: '日',
                    type: 'category',
                    axisTick: {show: false},
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
                }
            ],
            yAxis: [
                {
                    name: '吨',
                    type: 'value'
                }
            ],
            grid: {
                bottom: 20,
                left: 35,
            },
            series: [
                {
                    name: '本月',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#3B91FF'
                        }
                    },
                    data: [320, 332, 301, 334, 390, 220, 182, 191, 234, 290, 150, 232, 420, 362, 371, 313, 398, 256, 212, 161, 214, 264, 210, 212, 313, 287, 369, 472, 298, 321]
                },
                {
                    name: '上月',
                    type: 'line',
                    data: [420, 362, 371, 313, 398, 256, 212, 161, 214, 264, 210, 212, 320, 332, 301, 334, 390, 220, 182, 191, 234, 290, 150, 232, 212, 261, 321, 410, 326, 371],
                    itemStyle: {
                        normal: {
                            color: '#4CC255'
                        }
                    }
                }
            ]
        };
        return (
            <div>
                <ReactEcharts
                    style={{height: '400px'}}
                    option={option}
                    notMerge={true}
                    lazyUpdate={true} />
            </div>
        );
    }
}

export default StatusBar;
