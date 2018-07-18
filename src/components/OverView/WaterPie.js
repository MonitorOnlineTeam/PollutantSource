import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import liquidfill from 'echarts-liquidfill';
class WaterPie extends Component {
    render() {
        const title = this.props.title;
        const Percentage = this.props.Percentage;
        const color = this.props.color;
        const option = {
            series: [{
                type: 'liquidFill',
                animation: true,
                waveAnimation: true,
                data: [Percentage * 0.01, Percentage * 0.01 - 0.06, Percentage * 0.01 - 0.08],
                color: color,
                center: ['50%', '50%'],
                waveLength: '60%',
                amplitude: 8,
                radius: '90%',
                label: {
                    normal: {
                        formatter: function() {
                            return title + '\n\n' + Percentage + '%';
                        },
                        textStyle: {
                            fontSize: 18,
                            color: color[0]
                        },
                        position: ['50%', '50%']
                    }
                },
                outline: {
                    itemStyle: {
                        borderColor: color[0],
                        borderWidth: 5
                    },
                    borderDistance: 0
                },
                itemStyle: {
                    normal: {
                        backgroundColor: '#fff'
                    }
                }
            }]
        };
        return (
            <div>
                <ReactEcharts
                    style={{width: '136px', height: '136px'}}
                    option={option}
                    notMerge={true}
                    lazyUpdate={true} />
            </div>
        );
    }
}

export default WaterPie;
