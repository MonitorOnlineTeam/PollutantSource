import React, { Component } from 'react';
import {
    Spin, Tabs
} from 'antd';
import styles from './Tree.less';
import TreeCardContent from './TreeCardContent';
import {connect} from 'dva';
  
const TabPane = Tabs.TabPane;

@connect(({ loading, overview, global }) => ({
    pollutantTypeloading:loading.effects['overview/getPollutantTypeList'],
    pollutantTypelist:overview.pollutantTypelist
}))

class TreeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabkey:2
        };
    }
    componentDidMount(){
    }

    //当前选中的污染物类型
    getNowPollutantType=(key)=>{
        this.setState({
            pollutantTypeCode:key
        })
       // const {searchName}=this.state;
       // this.reloadData(key,searchName);
    }


    //填充污染物类型
    getPollutantDoc = () => {
        const { pollutantTypelist } = this.props;
        let res = [];
        if (pollutantTypelist) {
            pollutantTypelist.map(item => {
                res.push(<TabPane tab={item.pollutantTypeName} key={item.pollutantTypeCode} >
                     <TreeCardContent />
                 </TabPane>);
            });
        }
        return res;
    }
    render() {
        const { pollutantTypeloading } = this.props;
        const {tabkey} = this.state;
        
            
        if (pollutantTypeloading) {
            return (
                <Spin
                    style={{
                        width: '100%',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
            );
        }
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
