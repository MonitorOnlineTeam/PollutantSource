// 监控总览-数据查询
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import ButtonGroup_ from '../../components/PointDetail/ButtonGroup_';
import PollutantSelect_ from '../../components/PointDetail/PollutantSelect_';
import styles from './index.less';
import { connect } from 'dva';
import {
    Spin,
    Card,
    Table,
    Switch,
} from 'antd';
import moment from 'moment';

/*
页面：2、数据查询
描述：管控状态、参数信息，分钟、小时，日数据
add by cg 18.6.8
modify by
*/
@connect(({points, loading}) => ({
    pollutantlist: points.pollutantlist,
    option: points.chartdata,
    selectpoint: points.selectpoint,
    isloading: loading.effects['points/querypollutantlist'],
    columns: points.columns,
    datatable: points.datatable,
    total: points.total,
    dataloading: loading.effects['points/queryhistorydatalist'],
    tablewidth:points.tablewidth
}))
class DataQuery extends Component {
    constructor(props) {
        super(props);
        // 默认值
        const defaultValue = {
            formats: 'YYYY-MM-DD HH:mm:ss',
            dataType: 'realtime',
            current: 1,
            pageSize: 15,
            rangeDate: [moment(new Date()).add(-60, 'minutes'), moment(new Date())],
        };
        this.state = {
            ...defaultValue,
            displayType: 'chart',
            displayName: '查看数据'
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

    _handleDateChange=(date, dateString) => {
        this.setState({rangeDate: date, current: 1});
        const pollutantCode = this.state.pollutantCode ? this.state.pollutantCode : this.getpropspollutantcode();
        const pollutantName = this.state.pollutantName ? this.state.pollutantName : this.getpropspollutantname();
        this.reloaddatalist(pollutantCode, this.state.dataType, this.state.current, this.state.pageSize, date[0], date[1], pollutantName);
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
    _handleDateTypeChange=(e) => {
        let formats;
        let beginTime = moment(new Date()).add(-60, 'minutes');
        let endTime = moment(new Date());
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
            formats: formats,
            dataType: e.target.value,
            rangeDate: [beginTime, endTime],
            current: 1
        });
        const pollutantCode = this.state.pollutantCode ? this.state.pollutantCode : this.getpropspollutantcode();
        const pollutantName = this.state.pollutantName ? this.state.pollutantName : this.getpropspollutantname();
        this.reloaddatalist(pollutantCode, e.target.value, this.state.current, this.state.pageSize, beginTime, endTime, pollutantName);
    }

    // 污染物
    _handlePollutantChange=(value, selectedOptions) => {
        this.setState({
            pollutantCode: value,
            pollutantName: selectedOptions.props.children,
            current: 1
        });
        this.reloaddatalist(value, this.state.dataType, this.state.current, this.state.pageSize, this.state.rangeDate[0], this.state.rangeDate[1], selectedOptions.props.children);
    };
    pageIndexChange=(page, pageSize) => {
        this.setState({
            current: page,
        });
        const pollutantCode = this.state.pollutantCode ? this.state.pollutantCode : this.getpropspollutantcode();
        const pollutantName = this.state.pollutantName ? this.state.pollutantName : this.getpropspollutantname();
        this.reloaddatalist(pollutantCode, this.state.dataType, page, pageSize, this.state.rangeDate[0], this.state.rangeDate[1], pollutantName);
    }
    
    ///获取
    getpropspollutantcode=()=>{
        if(this.props.pollutantlist[0])
        {
            return this.props.pollutantlist[0].pollutantCode;
        }
        return null;
    }
    getpropspollutantname=()=>{
        if(this.props.pollutantlist[0])
        {
            return this.props.pollutantlist[0].pollutantName;
        }
        return null;
    }
    //后台请求数据
    reloaddatalist=(pollutantCode, datatype, pageIndex, pageSize, beginTime, endTime, pollutantName) => {
        if (this.state.displayType === 'chart' || this.state.displayType === 'table') {
            pageSize = 0;
            pageIndex = 0;
        }
        this.props.dispatch({
            type: 'points/queryhistorydatalist',
            payload: {
                pollutantCode: pollutantCode,
                datatype: datatype,
                dgimn: this.props.selectpoint.DGIMN,
                pageIndex: pageIndex,
                pageSize: pageSize,
                beginTime: beginTime,
                endTime: endTime,
                pollutantName: pollutantName,
            }
        });
    }
    //渲染数据
    loaddata=()=>{
        if(this.props.dataloading)
        {
            return (<Spin
                style={{ width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center' }}
                size="large"
            />);
        }
        else
        {
            if(this.state.displayType === 'chart')
            {

                if(this.props.option)
                {
                    return (<ReactEcharts option={this.props.option} lazyUpdate={true}
                        notMerge={true} id="rightLine" style={{ width: '100%', height: 'calc(100vh - 380px)' }} />)
                }
                else
                {
                    return (<div style={{textAlign: 'center'}}>暂无数据</div>);
                }
            }
            else
            {
                return ( <Table rowKey="MonitorTime" dataSource={this.props.datatable} columns={this.props.columns}
                scroll={{ y: 'calc(100vh - 420px)',x:this.props.tablewidth }}
                rowClassName={
                    (record, index, indent) => {
                        if (index === 0) {
                            return;
                        }
                        if (index % 2 !== 0) {
                            return 'light';
                        }
                    }
                }
                pagination={{
                        'total': this.props.total,
                        'pageSize': this.state.pageSize,
                        'current': this.state.current,
                        onChange: this.pageIndexChange
                    }} />);
            }

        }
    }
    //如果是数据列表则没有选择污染物，而是展示全部污染物
    getpollutantSelect=()=>{
        if(this.state.displayType === 'chart')
        {
            return( <PollutantSelect_
                optionDatas={this.props.pollutantlist}
                defaultValue={this.getpropspollutantcode()}
                style={{width: 150,marginRight:10}}
                onChange={this._handlePollutantChange}
                /> );
        }
        return '';
    }

    render() {
        //初始化等待
        if(this.props.isloading )
        {
            return (<Spin
                style={{ width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center' }}
                size="large"
            />);
        }
        return (
            <div className={styles.cardTitle}>
               
                    <Card   extra={
                    <div>
                             {this.getpollutantSelect()}
                            <RangePicker_ style={{width: 350,textAlign:'left',marginRight:10}} dateValue={this.state.rangeDate} format={this.state.formats} onChange={this._handleDateChange} />
                            <ButtonGroup_ style={{marginRight: 20}} checked="realtime" onChange={this._handleDateTypeChange} />
                            <Switch checkedChildren="图表" unCheckedChildren="数据" onChange={this.displayChange} defaultChecked={true} />
                        </div>
                    } style={{ width: '100%', height: 'calc(100vh - 213px)' }}>
                    { this.loaddata() }
                </Card>
                </div>
        );
    }
}
// make this component available to the app
export default DataQuery;
