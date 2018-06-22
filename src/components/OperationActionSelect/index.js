
import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class OperationActionSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    handleChange=(value) => {
        console.log(`selected ${value}`);
    }

    render() {
        let datasource = this.props.datasource;
        let options = [];
        datasource.forEach(t => { options.push(<Option value={t.id}>{t.text}</Option>); });
        return (
            <Select
                showSearch={true}
                style={{ width: this.props.width }}
                placeholder="运维活动"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                { options }
            </Select>
        );
    }
}
