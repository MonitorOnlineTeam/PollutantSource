import React, { Component } from 'react';
import markerspoint from '../../mockdata/OverView/markersInfo.json';
import styles from './OverView.less';
import InfiniteScroll from 'react-infinite-scroller';
import {
    Radio,
    Input,
    Table,
    List
} from 'antd';

class NavigationTree extends Component {
    render() {
        return (
            <div
                className={styles.treeborder}
                style={{
                    width: 350,
                    height: 'calc(100vh - 90px)',
                    position: 'absolute',
                    top: 10,
                    left: 5,
                    background: '#fff'
                }}>
                <Radio.Group
                    style={{
                        padding: '10px 2px 7px 50px'
                    }}
                    onChange={(value) => { this.props.specialChange(value); }}
                    defaultValue="a">
                    <Radio.Button value="a">监控</Radio.Button>
                    <Radio.Button value="b">运维</Radio.Button>
                    <Radio.Button value="c">排污</Radio.Button>
                    <Radio.Button value="d">质控</Radio.Button>
                </Radio.Group>
                <Input.Search
                    placeholder="请输入排口名称、企业名称、设备编号进行搜索"
                    onSearch={(value) => {
                        console.log(value);
                        this.props.TreeSearch(value);
                    }}
                    style={{
                        width: 327,
                        margin: '0px 2px 10px 10px'
                    }} />
                <Table columns={markerspoint.treeListcol} dataSource={this.props.markersInfo} pagination={false}
                    scroll={{ y: 'calc(100vh - 260px)' }}
                    onRow={record => ({
                        onClick: () => {
                            this.props.treeCilck(record);
                        }
                    })} />
            </div>
        );
    }
}

export default NavigationTree;
