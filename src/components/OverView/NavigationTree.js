import React, { Component } from 'react';
import markerspoint from '../../mockdata/OverView/markersInfo.json';
import styles from './OverView.less';
import {
    Radio,
    Input,
    Table,
    Icon
} from 'antd';
import { SIMD_AVAILABLE } from 'gl-matrix/src/gl-matrix/common';

const treecol = [
    {
        title: '',
        width: '10%',
        dataIndex: 'Status',
        align: 'center',
        render: text => <img src="../../../gisnormal.png" />,
    }, {
        title: '企业',
        width: '50%',
        dataIndex: 'EntName',
        align: 'center'
    },
    {
        title: '排口',
        width: '30%',
        dataIndex: 'PointName',
        align: 'center'
    }];

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
                        padding: '10px 2px 7px 17px'
                    }}
                    onChange={this.props.specialChange}
                    defaultValue="a">
                    <Radio.Button value="a" style={{marginRight: '4px', borderRadius: '2px'}}><Icon type="environment" className={styles.radiobtnimg} />监控</Radio.Button>
                    <Radio.Button value="b" style={{marginRight: '4px', borderRadius: '2px'}}><Icon type="medicine-box" className={styles.radiobtnimg} />运维</Radio.Button>
                    <Radio.Button value="c" style={{marginRight: '4px', borderRadius: '2px'}}><Icon type="up-square" className={styles.radiobtnimg} />排污</Radio.Button>
                    <Radio.Button value="d"><Icon type="dashboard" className={styles.radiobtnimg} />质控</Radio.Button>
                </Radio.Group>
                <Input.Search
                    placeholder="请输入排口名称、企业名称、设备编号进行搜索"
                    onSearch={(value) => {
                        this.props.TreeSearch(value);
                    }}
                    style={{
                        width: 327,
                        margin: '0px 2px 10px 10px'
                    }} />
                <Table size="small" columns={treecol} dataSource={this.props.markersInfo} pagination={false}
                    scroll={{ y: 'calc(100vh - 240px)' }}
                    style={{fontSize: '12px'}}
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
