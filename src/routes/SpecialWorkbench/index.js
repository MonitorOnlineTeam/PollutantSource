
import React, { Component } from 'react';
import {Col, Row} from 'antd';
import arrow_left from '../../../public/image/arrow_left.png';

/*
页面：工作台
add by cg 18.6.8
modify by
*/
class SpecialWorkbench extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            hasMore: true,
        };
        // this.test = this.test.bind(this);
    }
    test(i) {
        alert(i);
    }
    render() {
        let arr = [1,2,3];
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                {
                    arr.map((i) => {
                        return <img src={require('../../../public/image/arrow_left.png')} onClick={this.test.bind(this,i)} key={i} />;
                    })
                }
            </div>
        );
    }
}
export default SpecialWorkbench;
