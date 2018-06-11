import React, { Component } from 'react';
import { List} from 'antd';

/*
页面：报警类别统计
描述：分别统计各个设备的报警
add by cg 18.6.8
modify by
*/

export default class NavList extends Component {
    render() {
        return (
            <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered={true}
                dataSource={this.props.listdata}
                renderItem={item => (<List.Item>{item.listname}</List.Item>)}
            />
        );
    }
}
