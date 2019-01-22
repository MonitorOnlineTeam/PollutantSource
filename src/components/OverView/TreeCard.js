import React, { Component } from 'react';
import {
    Spin, Tabs
} from 'antd';
import styles from './Tree.less';
import TreeCardContent from './TreeCardContent';

const TabPane = Tabs.TabPane;
class TreeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    getNowPollutantType = (key) => {
        this.props.getNowPollutantType(key);
    }

    //填充污染物类型
    getPollutantDoc = () => {
        const { pollutantTypelist } = this.props;
        let res = [];
        if (pollutantTypelist) {
            pollutantTypelist.map(item => {
                res.push(<TabPane tab={item.pollutantTypeName} key={item.pollutantTypeCode} />);
            });
        }
        return res;
    }
    render() {
        const { tabkey, pollutantTypeloading } = this.props;
        // if (pollutantTypeloading) {
        //     return (
        //         <Spin
        //             style={{
        //                 width: '100%',
        //                 height: '100',
        //                 display: 'flex',
        //                 alignItems: 'center',
        //                 justifyContent: 'center'
        //             }}
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
