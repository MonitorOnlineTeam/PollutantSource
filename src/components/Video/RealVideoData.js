import React, { Component } from 'react';
import {Table, Card} from 'antd';
import { connect } from 'dva';
import moment from 'moment';


@connect(({videolist}) => ({
    realdata: videolist.realdata,
    columns:videolist.columns
}))
class RealVideoData extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentWillMount = () => {
        this.getPollutantTitle();
        this.getRealTime();
    }

    getPollutantTitle=()=>{
        const {match,dispatch}=this.props;
        dispatch({
            type:'videolist/querypollutantlist',
            payload:{ dgimn: match.params.pointcode }
        });
    }

    getRealTime = () => {
        let rangeDate=[moment(new Date()).add(-10, 'm').format('YYYY-MM-DD HH:mm:ss'), moment(new Date()).format('YYYY-MM-DD HH:mm:ss')];
        const {match,dispatch}=this.props;
        dispatch({
            type:'videolist/queryhistorydatalist',
            payload:{ dgimn: match.params.pointcode,
                datatype: 'realtime',
                pageIndex: 1,
                pageSize: 20,
                beginTime: rangeDate[0],
                endTime: rangeDate[1] }
        });
    }

    render() {
        const {realdata,columns} = this.props;
        console.log(1);
        return (
            <Card title="实时数据">
                <Table dataSource={realdata} columns={columns} pagination={false} />
            </Card>
        );
    }
}
export default RealVideoData;