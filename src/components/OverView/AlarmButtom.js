import React, { Component } from 'react';
import {
    Button,
} from 'antd';
class AlarmButtom extends Component {
    render() {
        return (
            <div style={{borderTop: '1px solid #ddd'}}>
                <Button style={{marginTop: '9px', marginLeft: '100px'}} onClick={this.props.NormalClick}>查看报警情况</Button>
            </div>
        );
    }
}

export default AlarmButtom;
