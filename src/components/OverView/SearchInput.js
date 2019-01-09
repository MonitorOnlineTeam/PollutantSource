import React, { Component } from 'react';
import { Input } from 'antd';
import styles from './SearchInput.less';

const Search = Input.Search;
class SearchInput extends Component {
    render() {
        return (
            <div>
                 <Search
                    className={styles.search}
                    placeholder={this.props.searchName}
                    enterButton="查询"
                    size="large"
                    style={this.props.style}
                    onSearch={value => this.props.onSerach(value)}
                    />  
            </div>
        );
    }
}

export default SearchInput;