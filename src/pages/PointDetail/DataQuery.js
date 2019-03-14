// 监控总览-数据查询
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'dva';
import {
    Spin,
    Card,
    Table,
    Switch,
    message
} from 'antd';
import moment from 'moment';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import ButtonGroup_ from '../../components/PointDetail/ButtonGroup_';
import PollutantSelect from '../../components/PointDetail/PollutantSelect';
import styles from './index.less';

/*
页面：2、数据查询
描述：管控状态、参数信息，分钟、小时，日数据
add by cg 18.6.8
modify by
*/
@connect(({ points, loading }) => ({
    pollutantlist: points.pollutantlist,
    option: points.chartdata,
    selectpoint: points.selectpoint,
    isloading: loading.effects['points/querypollutantlist'],
    columns: points.columns,
    datatable: points.datatable,
    total: points.total,
    dataloading: loading.effects['points/queryhistorydatalist'],
    tablewidth: points.tablewidth,
    historyparams:points.historyparams
}))
class DataQuery extends Component {
    constructor(props) {
        super(props);
        // 默认值
        this.state = {
            displayType: 'chart',
            displayName: '查看数据',
            rangeDate:[moment(new Date()).add(-60, 'minutes'), moment(new Date())],
            format:'YYYY-MM-DD HH:mm:ss'
        };
    }

    componentWillMount() {
        this.props.dispatch({
            type: 'points/querypollutantlist',
            payload: {
                dgimn: this.props.selectpoint.DGIMN
            }
        });
    }

    _handleDateChange = (date, dateString) => {
        if(date)
        {
            let {historyparams}=this.props;
            //判断
            switch(historyparams.dataType)
            {
                case "realtime":
                    if(date[1].add(-7,'day')>date[0]) 
                    {
                    message.info('实时数据时间间隔不能超过7天');
                    return ;
                    }
                    break;
                case "minute":
                    if(date[1].add(-1,'month')>date[0]) 
                    {
                    message.info('分钟数据时间间隔不能超过1个月');
                    return ;
                    }
                    break;
                case "hour":
                    if(date[1].add(-6,'month')>date[0]) 
                    {
                    message.info('小时数据时间间隔不能超过6个月');
                    return ;
                    }
                    break;
               case "day":
                    if(date[1].add(-12,'month')>date[0]) 
                    {
                       message.info('日数据时间间隔不能超过1年个月');
                       return ;
                    }
               break;
            }
            this.setState({ rangeDate: date});
            historyparams={
                ...historyparams,
                beginTime:date[0].format('YYYY-MM-DD HH:mm:ss'),
                endTime:date[1].format('YYYY-MM-DD HH:mm:ss'),
            }
            this.reloaddatalist(historyparams);
        }
    };

    // 图表转换
    displayChange = (checked) => {
        if (!checked) {
            this.setState({
                displayType: 'table',
                displayName: '查看图表'
            });
        } else {
            this.setState({
                displayType: 'chart',
                displayName: '查看数据'
            });
        }
    };

    _handleDateTypeChange = (e) => {
        let formats;
        let beginTime = moment(new Date()).add(-60, 'minutes');
        let endTime = moment(new Date());
        let {historyparams}=this.props;
        switch (e.target.value) {
            case 'realtime':
                beginTime = moment(new Date()).add(-60, 'minutes');
                formats = 'YYYY-MM-DD HH:mm:ss';
                break;
            case 'minute':
                beginTime = moment(new Date()).add(-1, 'day');
                formats = 'YYYY-MM-DD HH:mm';
                break;
            case 'hour':
                beginTime = moment(new Date()).add(-1, 'day');
                formats = 'YYYY-MM-DD HH';
                break;
            case 'day':
                beginTime = moment(new Date()).add(-1, 'month');
                formats = 'YYYY-MM-DD';
                break;
        }
        this.setState({
            rangeDate: [beginTime, endTime],
            format:formats
        });
        historyparams={
            ...historyparams,
            beginTime:beginTime.format('YYYY-MM-DD HH:mm:ss'),
            endTime:endTime.format('YYYY-MM-DD HH:mm:ss'),
            datatype:e.target.value
        }
        this.reloaddatalist(historyparams);
    }

    // 污染物
    handlePollutantChange = (value, selectedOptions) => {
        let {historyparams}=this.props;
        historyparams={
            ...historyparams,
            payloadpollutantCode:value,
            payloadpollutantName:selectedOptions.props.children
        }
        this.reloaddatalist(historyparams);
    };

    ///获取第一个污染物
    getpropspollutantcode = () => {
        if (this.props.pollutantlist[0]) {
            return this.props.pollutantlist[0].pollutantCode;
        }
        return null;
    }

    //后台请求数据  
    reloaddatalist = (historyparams) => {
        let {dispatch}=this.props;
        dispatch({
            type:'points/updateState',
            payload:{
                historyparams:historyparams
            }
        })
        dispatch({
            type: 'points/queryhistorydatalist',
            payload: {
            }
        });
    }

    //渲染数据
    loaddata = () => {
        const { dataloading, option, datatable, columns, tablewidth, total } = this.props;
        const { displayType } = this.state;
        if (dataloading) {
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

        if (displayType === 'chart') {

            if (option) {
                return (<ReactEcharts
                    option={option}
                    lazyUpdate={true}
                    notMerge={true}
                    id="rightLine"
                    style={{ width: '100%', height: 'calc(100vh - 380px)' }}
                />);
            }

            return (<div style={{ textAlign: 'center' }}>暂无数据</div>);
        }
        return (<Table
            rowKey={(record, index) => `complete${index}`}
            dataSource={datatable}
            columns={columns}
            scroll={{ y: 'calc(100vh - 420px)', x: tablewidth }}
            rowClassName={
                (record, index) => {
                    let rtnVal = "";
                    if (index === 0) {
                        rtnVal = "";
                    }
                    if (index % 2 !== 0) {
                        rtnVal = "light";
                    }
                    return rtnVal;
                }
            }
            pagination={{
                'pageSize': 15,
            }}
        />);


    }

    //如果是数据列表则没有选择污染物，而是展示全部污染物
    getpollutantSelect = () => {
        const { displayType } = this.state;
        const { pollutantlist } = this.props;
        if (displayType === 'chart') {
            return (<PollutantSelect
                optionDatas={pollutantlist}
                defaultValue={this.getpropspollutantcode()}
                style={{ width: 150, marginRight: 10 }}
                onChange={this.handlePollutantChange}
            />);
        }
        return '';
    }
    render() {
        //初始化等待
        if (this.props.isloading) {
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
            <div className={styles.cardTitle}>

                <Card
                    extra={
                        <div>
                            {this.getpollutantSelect()}
                            <RangePicker_ style={{ width: 350, textAlign: 'left', marginRight: 10 }} dateValue={this.state.rangeDate} format={this.state.formats} onChange={this._handleDateChange} />
                            <ButtonGroup_ style={{ marginRight: 20 }} checked="realtime" onChange={this._handleDateTypeChange} />
                            <Switch checkedChildren="图表" unCheckedChildren="数据" onChange={this.displayChange} defaultChecked={true} />
                        </div>
                    }
                    style={{ width: '100%', height: 'calc(100vh - 213px)' }}
                >
                    {this.loaddata()}
                </Card>
            </div>
        );
    }
}
// make this component available to the app
export default DataQuery;
