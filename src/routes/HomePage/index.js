import React, { Component } from 'react';
import { Col, Row} from 'antd';
/*
页面：工作台
add by cg 18.6.8
modify by
*/
class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            hasMore: true,
        };
    }
    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                todolist
            </div>
        );
    }
}
export default HomePage;
