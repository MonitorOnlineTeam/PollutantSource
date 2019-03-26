import React, { PureComponent } from 'react';
import { Card, Table} from 'antd';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'dva';

const gridStyle = {
    width: '50%',
    textAlign: 'center',
    height: '200px'
};

@connect(({
    loading,
    workbenchmodel,
    transmissionefficiency,
}) => ({
    loadingRateStatistics: loading.effects['workbenchmodel/getRateStatisticsData'],
    loadingTransmissionefficiencyRate: loading.effects['transmissionefficiency/getData'],
    rateStatistics: workbenchmodel.rateStatistics,
    transmissionefficiencyRateTableDatas: transmissionefficiency.tableDatas,
}))

/**
 * 智能质控_加载图表数据(3)
 */

class TransmissionEfficiency extends PureComponent {

    getOption = (type) => {
        const { model } = this.props.rateStatistics;
        let networkeRate = (parseFloat(model.NetworkeRate) * 100).toFixed(2);
        let runningRate = (parseFloat(model.RunningRate) * 100).toFixed(2);
        let transmissionEffectiveRate = (parseFloat(model.TransmissionEffectiveRate) * 100).toFixed(2);
        let legendData = [];
        let color = [];
        let seriesName = '';
        let seriesData = [];
        if (type === 1) {
            legendData = ['正常', '离线'];
            color = ['rgb(48,155,86)', 'rgb(245,68,66)'];
            seriesName = '实时联网率';
            seriesData = [
                { value: networkeRate, name: '正常' },
                { value: (100 - networkeRate).toFixed(2), name: '离线' }
            ];
        } else if (type === 2) {
            legendData = ['达标', '未达标'];
            color = ['rgb(48,155,86)', 'rgb(245,68,66)'];
            seriesName = '设备运转率';
            seriesData = [
                { value: runningRate, name: '达标' },
                { value: (100 - runningRate).toFixed(2), name: '未达标' }
            ];
        } else {
            legendData = ['达标', '未达标'];
            color = ['rgb(48,155,86)', 'rgb(245,68,66)'];
            seriesName = '传输有效率';
            seriesData = [
                { value: transmissionEffectiveRate, name: '达标' },
                { value: (100 - transmissionEffectiveRate).toFixed(2), name: '未达标' }
            ];
        }
        let option = {
            color: color,
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: legendData
            },
            series: [
                {
                    name: seriesName,
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    center: ['60%', '60%'],
                    itemStyle: {
                        normal: {
                            label: {
                                // formatter : function (params){
                                //     return params.value + '% <br/>详情情况';
                                // },
                                formatter: "{b}: {c}%",
                                textStyle: {
                                    baseline: 'top'
                                }
                            }
                        },
                    },
                    data: seriesData
                }
            ]
        };
        return option;
    }


    /**
     * 智能质控_渲染排口传输有效率表格
     */
    renderTransmissionefficiencyRateTable = () => {
        const columns = [
            {
                key:'PointName',
                title: '排口名称',
                dataIndex: 'PointName',
                width:'60%',
            },
            {
                key:'TransmissionEffectiveRate',
                title: '传输有效率',
                dataIndex: 'TransmissionEffectiveRate',
                width:'40%',
                render: (text, record) => {
                    let rr = `${(parseFloat(text) * 100).toFixed(2)}%`;
                    if (text >= 90)
                        return rr;
                    return <span style={{ color: 'red' }}>{rr}</span>;
                }
            }];

        return <Table rowKey={(record, index) => `complete${index}`} loading={this.props.loadingTransmissionefficiencyRate} columns={columns} dataSource={this.props.transmissionefficiencyRateTableDatas.slice(0, 3)} size="small" pagination={false} />;
    }

    render() {
        return (
            <Card
                title="当月传输有效率"
                style={{ marginTop: 10 }}
                extra={<a
                    href="/qualitycontrol/transmissionefficiency"
                >更多>>
                       </a>}
            >
                <Card.Grid style={gridStyle}>
                    <ReactEcharts
                        option={this.getOption(3)}
                        style={{ height: '150px', width: '100%' }}
                        className="echarts-for-echarts"
                        onEvents={{ 'click': this.onChartClick }}
                        theme="my_theme"
                    />

                </Card.Grid>
                <Card.Grid style={gridStyle}>
                    {
                        this.renderTransmissionefficiencyRateTable()
                    }
                </Card.Grid>
            </Card>
        );
    }
}

export default TransmissionEfficiency;