
import React, { Component } from 'react';
import { AutoComplete } from 'antd';

export default class EnterpriseAutoComplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
        };
    }

      handleSearch = (value) => {
          this.setState({
              dataSource: !value ? [] : [
                  value,
                  value + value,
                  value + value + value,
              ],
          });
      }

      render() {
          const { dataSource } = this.state;
          return (
              <AutoComplete
                  dataSource={dataSource}
                  style={{ width: this.props.width }}
                  onSearch={this.handleSearch}
                  placeholder="输入企业"
              />
          );
      }
}
