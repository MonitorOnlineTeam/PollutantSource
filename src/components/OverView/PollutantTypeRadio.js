import React, { Component } from 'react';
import { Radio, Spin } from 'antd';
import { connect } from 'dva';

@connect(({
    overview
}) => ({
    pollutantTypelist: overview.pollutantTypelist,
    searchName: overview.searchName,
    selectpollutantTypeCode: overview.selectpollutantTypeCode
}))
class PollutantTypeRadio extends Component {
    onChange = (e) => {
        const { dispatch, searchName } = this.props;
        const value = e.target.value;
        dispatch({
            type: 'overview/updateState',
            payload: {
                selectpollutantTypeCode: value
            },
        });
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                map: true,
                pollutantTypes: value,
                pointName: searchName
            },
        });

    }

    render() {
        const { pollutantTypelist, selectpollutantTypeCode } = this.props;
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