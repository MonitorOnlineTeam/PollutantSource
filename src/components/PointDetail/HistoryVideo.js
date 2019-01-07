import React, { Component } from 'react';
import {Table} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './Video.less';

@connect(({videolist}) => ({
    hisrealdata: videolist.hisrealdata,
    hiscolumns:videolist.hiscolumns
}))
class HistoryVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginDate:this.props.beginDate,
            endDate:this.props.endDate,
            beginTime:moment(this.props.beginDate).add(-30,'m'),
            endTime:moment(this.props.beginDate),
        };
    }

    componentWillMount = () => {
        this.props.onRef(this);
    }

    startPlay=()=>{
        this.getPollutantTitle();
        const {beginTime,endTime}=this.state;
        this.getRealTime(beginTime,endTime);

        this.timerID = setInterval(
            () => this.tick(),
            30000
        );
    }

    endPlay=()=>{
        clearInterval(this.timerID);
    }

    tick = () => {
        let {beginTime,endTime,endDate}=this.state;
        endTime=moment(endTime).add(30,'s');
        if(endTime>=endDate)
            this.endPlay();
        beginTime=moment(endTime).add(-30,'m');
        this.setState({beginTime,endTime});
        this.getRealTime(beginTime.format("YYYY-MM-DD HH:mm:ss"),endTime.format("YYYY-MM-DD HH:mm:ss"));
        console.log(`b:${beginTime.format("YYYY-MM-DD HH:mm:ss")}e${endTime.format("YYYY-MM-DD HH:mm:ss")}`);
    }

    getPollutantTitle=()=>{
        const {match,dispatch}=this.props;
        dispatch({
            type:'videolist/querypollutantlisthis',
            payload:{ dgimn: match.params.pointcode }
        });
    }

    getRealTime = (beginTime,endTime) => {
        const {match,dispatch}=this.props;
        dispatch({
            type:'videolist/queryhistorydatalisthis',
            payload:{
                dgimn: match.params.pointcode,
                datatype: 'realtime',
                pageIndex: 1,
                pageSize: 20,
                beginTime: beginTime,
                endTime: endTime
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const {hisrealdata,hiscolumns} = this.props;
        return (
            <Table dataSource={hisrealdata} columns={hiscolumns} pagination={false} bordered={true} />
        );
    }
}
export default HistoryVideo;