import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
class StatusPie extends Component {
    render() {
        const value = this.props.value;
        const unit = '%';
        const initcolor = '#000';
        const min = 0;
        const max = 100;
        const color = initcolor;
        // var size = $("#" + id).css('fontSize');
        const size = '20%';
        const background = '#fff'; // 背景
        // var Myecharts = "mycharts_"+id;
        // Myecharts = echarts.init(document.getElementById(id));
        const dataStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                shadowBlur: 40,
                shadowColor: 'rgba(40, 40, 40, 0.5)'
            }
        };
        const placeHolderStyle = {
            normal: {
                color: 'rgba(44,59,70,0)', // 未完成的圆环的颜色
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        };
        // if ((value - min) / (max - min) * 100 >= 70) {
        //     color = 'red';
        // } else {
        //     color = initcolor;
        // }
        const option = {
            title: {
                text: this.props.title + value + unit,
                x: 'center',
                y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    color: color,
                    fontSize: parseInt(size) * 0.6
                }
            },
            backgroundColor: background,
            color: [color, '#313443', '#fff'],
            tooltip: {
                show: false,
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                show: false,
                itemGap: 12,
                data: ['01', '02']
            },

            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },

            series: [{
                name: 'Line 1',
                type: 'pie',
                clockWise: false,
                radius: ['90%', '98%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                data: [{
                    value: value - min,
                    name: '01',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                                offset: 0,
                                color: '#7777eb'
                            }, {
                                offset: 1,
                                color: '#70ffac'
                            }]),
                        },
                    },
                }, {
                    value: max - value,
                    name: 'invisible',
                    itemStyle: placeHolderStyle
                }]
            }, {
                name: 'Line 2',
                type: 'pie',
                animation: false,
                clockWise: false,
                radius: ['98%', '100%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                tooltip: {
                    show: false
                },
                data: [{
                    value: 100,
                    name: '02',
                    itemStyle: {
                        normal: {
                            color: '#3c6482',
                        },
                    }
                }]
            }, {
                name: 'Line 3',
                type: 'pie',
                animation: false,
                clockWise: false,
                radius: ['88%', '90%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                tooltip: {
                    show: false
                },
                data: [{
                    value: 100,
                    name: '02',
                    itemStyle: {
                        normal: {
                            color: '#3c6482',
                        },
                    }
                }]
            }]
        };
        return (
            <div>
                <ReactEcharts
                    style={{width: '90px', height: '90px'}}
                    option={option}
                    notMerge={true}
                    lazyUpdate={true} />
            </div>
        );
    }
}

export default StatusPie;
