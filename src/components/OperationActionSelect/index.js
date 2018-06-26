
import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class OperationActionSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    handleChange=(value, e) => {
        this.setState({value: e.key});
    }
    getOperationAction=() => this.state.value;

    render() {
        let datasource = this.props.datasource;
        let options = [];
        datasource.forEach(t => { options.push(<Option key={t.id} value={t.text}>{t.text}</Option>); });
        // options = datasource.map(t => { return `<Option value={${t.id}}>{${t.text}}</Option>)`; });

        return (
            <Select
                mode={this.props.mode ? this.props.mode : ''}
                style={{ width: this.props.width ? this.props.width : '100px' }}
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
