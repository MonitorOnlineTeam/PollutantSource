import React, { Component } from 'react';
import { Radio, Spin } from 'antd';
import { connect } from 'dva';

@connect(({
    overview
}) => ({
    pollutantTypelist: overview.pollutantTypelist,
    selectpollutantTypeCode: overview.selectpollutantTypeCode,
    dataOverview:overview.dataOverview
}))
class PollutantTypeRadio extends Component {
    onChange = (e) => {
        let { dispatch, dataOverview } = this.props;
        const value = e.target.value;
        dispatch({
            type: 'overview/updateState',
            payload: {
                selectpollutantTypeCode: value,
                selectpoint:null,
                // dataOverview:{
                //     ...dataOverview,
                //     pointName:null
                // }
            },
        });
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                map: true,
            },
        });
    }

    render() {
        let { pollutantTypelist, selectpollutantTypeCode } = this.props;
        selectpollutantTypeCode=parseInt(selectpollutantTypeCode);
        if (!pollutantTypelist) {
            return '';
        }
        return (
            <div>
                <Radio.Group onChange={this.onChange} defaultValue={selectpollutantTypeCode}>
                    {
                        pollutantTypelist.map((item, key) => (<Radio.Button key={key} value={item.pollutantTypeCode}>{item.pollutantTypeName}</Radio.Button>))
                    }
                </Radio.Group>
            </div>
        );
    }
}

export default PollutantTypeRadio;