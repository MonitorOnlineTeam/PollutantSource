import React, { Component } from 'react';
import styles from './Tree.less';
import TreeCardContent from './TreeCardContent';
import {
    Spin, Tabs
} from 'antd';
const TabPane = Tabs.TabPane;
class TreeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    getNowPollutantType = (key) => {
        this.props.getNowPollutantType(key);
    }
    //填充污染物类型
    getPollutantDoc = () => {
        const { pollutantTypelist } = this.props;
        var res = [];
        if (pollutantTypelist) {
            pollutantTypelist.map(item => {
                res.push(<TabPane tab={item.pollutantTypeName} key={item.pollutantTypeCode}>
                </TabPane>);
            })
        }
        return res;
    }

    render() {
        const { tabkey, pollutantTypeloading } = this.props;
        // if (pollutantTypeloading) {
        //     return (
        //         <Spin
        //             style={{
        //                 // width: '100%',
        //                 height: 'calc(100vh/2)',
        //                 display: 'flex',
        //                 alignItems: 'center',
        //                 justifyContent: 'center'
        //             }}
        //             size="large"
        //         />
        //     );
        // }
        return (
            <div className={styles.treelist} style={{ ...this.props.style }}>
                <Tabs className={styles.tab} defaultActiveKey={tabkey} onChange={this.getNowPollutantType}>
                    {this.getPollutantDoc()}
                </Tabs>
            </div>
        );
    }
}

export default TreeCard;
