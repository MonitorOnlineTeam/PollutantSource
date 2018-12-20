import React, { Component } from 'react';
import {List, Card} from 'antd';
import { connect } from 'dva';


@connect(({loading, videolist}) => ({
    ...loading,
    realdata: []
}))
export default class RealVideoData extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentWillMount = () => {
        this.getRealTime();
    }
    getRealTime = () => {
        this.props.dispatch({
            type: 'videolist/queryprocesschart',
            payload: {
                DGIMN: this.props.match.params.pointcode,
            },
        });
    }
    render() {
        debugger;
        const MonitorData = this.props.realdata;
        return (
            <Card title="实时数据">
                <List
                    bordered={true}
                    size="small"
                    itemLayout="horizontal"
                    dataSource={MonitorData}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta title={item.MonitorItem} />
                            <List.Item.Meta title={item.MonitorValue} />
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}
