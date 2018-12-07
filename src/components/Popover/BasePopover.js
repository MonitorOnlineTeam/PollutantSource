import React, { Component } from 'react';

import {
    Popover
} from 'antd';

class BasePopover extends Component {
    render() {
        debugger;
        console.log(this.props.info);
        console.log(this.props.value);
        return (
            <Popover content={this.props.info} trigger="hover" >
                {this.props.value}
            </Popover>
        );
    }
}

export default BasePopover;
