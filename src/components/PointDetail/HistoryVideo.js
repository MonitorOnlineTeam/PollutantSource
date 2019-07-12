import React, { Component } from 'react';
import {Table, Card} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './Video.less';

@connect(({
    videolist,
    loading
}) => ({
    isloading: loading.effects['videolist/queryhistorydatalisthis'],
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
        const{onRef}=this.props;
        onRef(this);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    startPlay=(beginDate,endDate)=>{
        this.setState({
            beginDate:beginDate,
            endDate:endDate,
            beginTime:moment(beginDate).add(-30,'m'),
            endTime: moment(endDate),
        },()=>{
            this.getPollutantTitle();
            this.getRealTime(beginDate, endDate);
            this.timerID = setInterval(
                () => this.tick(),
                30000
            );
        });
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
                DGIMNs: match.params.pointcode,
                datatype: 'realtime',
                pageIndex: 1,
                pageSize: 20,
                beginTime: beginTime,
                endTime: endTime
            }
        });
    }

    render() {
        const {hisrealdata,hiscolumns} = this.props;
        let x=hiscolumns.length*160;
        console.log("----------------------------",x);
        return (
            <Table
                className={styles.dataTable}
                loading={this.props.isloading}
                dataSource={hisrealdata}
                columns={hiscolumns}
                size="small"
                scroll={{ x: x,y: 'calc(100vh - 530px)'}}
            />
        );
    }
}
export default HistoryVideo;