import React, { Component } from 'react';
import { Select } from 'antd';
import AttentionDegrees from '../../mockdata/Base/Code/T_Cod_AttentionDegree.json';
const Option = Select.Option;
class AttentionDegree extends Component {
    handleChange(value) {
        console.log(`selected ${value}`);
    }

    handleBlur() {
        console.log('blur');
    }

    handleFocus() {
        console.log('focus');
    }
    constructor(props) {
        super(props);
        const AttentionDegreess = AttentionDegrees;
        this.state = {
            defaultOption: AttentionDegreess,
        };

        console.log(this.state);
    }

    render() {
        return (
            <Select
                showSearch={true}
                placeholder="请选择"
                optionFilterProp="children"
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                style={{ width: this.props.width ? this.props.width : '100px' }}
                onBlur={this.handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {
                    this.state.defaultOption.map((item, key) => {
                        return <Option key={key}>{item.AttentionName}</Option>;
                    })
                }
            </Select>
        );
    }
}

export default AttentionDegree;
