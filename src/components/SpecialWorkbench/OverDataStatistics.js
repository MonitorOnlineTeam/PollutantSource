import React, { Component } from 'react';
import { Row, Col, Card, List, Tabs, Divider, Modal, Table ,Spin} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import ReactEcharts from 'echarts-for-react';
import styles from './OverDataStatistics.less';

const pageUrl = {
    updateState: 'workbenchmodel/updateState',
    getAllPointOverDataList: 'workbenchmodel/getAllPointOverDataList',

};
const TabPane = Tabs.TabPane;
@connect(({
    loading,
    workbenchmodel,
}) => ({
    loadingDataOver: loading.effects[pageUrl.getAllPointOverDataList],
    allPointOverDataList: workbenchmodel.allPointOverDataList,
}))
class OverDataStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.getAllPointOverDataList();
    }

    /**
     * 智能监控_排口超标汇总_更新数据
     */
    getAllPointOverDataList = () => {
        this.props.dispatch({
            type: pageUrl.getAllPointOverDataList,
            payload: {},
        });
    }

    /**
      * 更新model中的state
      */
    updateState = (payload) => {
        this.props.dispatch({
            type: pageUrl.updateState,
            payload: payload,
        });
    }

    getOption =() =>{

        let option = {
            //color:['','',''],
            tooltip : {
                trigger: 'axis',
                axisPointer : { // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: []
            },
            grid: {
                left: '3%',
                right: '8%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:  {
                type: 'value',
                name:'mg/m³'
            },
            yAxis: {
                type: 'category',
                data: []
            },
            series: []
        };

        const { allPointOverDataList } = this.props;
        //console.log('allPointOverDataList',allPointOverDataList);

        // legend
        if(allPointOverDataList.tableDatas.length>0) {
            if(allPointOverDataList.tableDatas[0].ALLOverPollutantNames.length>0) {
                option.legend.data=allPointOverDataList.tableDatas[0].ALLOverPollutantNames;
            }
        }
        // series
        option.legend.data.map((item)=>{
            option.series.push({
                name: item,
                type: 'bar',
                stack: '总量',
                barWidth:30,
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: []
            });
        });

        allPointOverDataList.tableDatas.map((item,key)=>{

            option.yAxis.data.push(item.PointName);

            option.series.map((s,skey) =>{
                let $thisValue=item.DataOvers.filter(m=>m.PollutantName===s.name);
                //debugger;
                if($thisValue) {
                    s.data.push($thisValue[0].AlarmCount);
                }else {
                    s.data.push('-');
                }

            });
        });

        return option;
    }

    /**
     * 智能监控_渲染数据超标数据列表
     */
    renderAllPointOverDataList = () => {
        const listData = [];
        const { allPointOverDataList } = this.props;

        allPointOverDataList.tableDatas.map((item,key) => {
            //判断报警是否超过4小时
            listData.push({
                title: `${item.PointName}`,
                description: (
                    <div>
                        {
                            <div>
                                <div style={{ backgroundColor: 'rgb(249,249,249)', padding: 10, marginBottom: 5 }}>
                                    {item.PollutantNames}
                                    <Divider type="vertical" style={{ backgroundColor: '#b3b3b3' }} />
                                    超标:{item.AlarmCount}次
                                    <span style={{ float: 'right' }}>{moment(item.LastTime).format('YYYY-MM-DD HH:00')}~{moment(item.FirstTime).format('YYYY-MM-DD HH:00')}</span>
                                </div>
                            </div>

                        }
                    </div>
                )
            });
        });
        return (<List
            itemLayout="vertical"
            dataSource={listData}
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[]}
                >
                    <List.Item.Meta
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
        );
    }

    render() {
        return (
            <div>
                <div>
                    <Card
                        title="报警汇总"
                        style={{ marginBottom: 10 }}
                        bordered={false}
                        loading={this.props.loadingDataOver}
                    >
                        <Card.Grid style={{ width: '100%', height: 425, paddingTop: 15, overflow: 'auto' }}>
                            <ReactEcharts
                                // loadingOption={this.props.loadingRateStatistics}
                                option={this.getOption()}
                                style={{ minHeight: '350px' }}
                                className="echarts-for-echarts"
                                theme="my_theme"
                            />
                            {/* <div style={{ height: 400, overflow: 'auto' }}>
                                {
                                    this.renderAllPointOverDataList()
                                }
                            </div> */}
                        </Card.Grid>
                    </Card>
                </div>
            </div>
        );
    }
}

export default OverDataStatistics;