import React, { Component } from 'react';
import styles from './OverView.less';
import {
    Radio,
    Input,
    Table,
    Icon
} from 'antd';

class NavigationTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const treecol = [
            {
                title: '',
                width: '10%',
                dataIndex: 'Status',
                align: 'center',
                render: (value, record) => {
                    if (this.props.special === 'monitor') {
                        if (record.DGIMN === 'bjldgn01' || record.DGIMN === 'dtgjhh11102' || record.DGIMN === 'dtgrjx110') {
                            return (
                                <img className={styles.imgradius_shinered} src="/gisover.png" />
                            );
                        } else if (record.DGIMN === 'dtgrjx103' || record.DGIMN === 'lywjfd03') {
                            return (
                                <img className={styles.imgradius_shinered} src="/gisexception.png" />
                            );
                        } else {
                            return (
                                <img src="/gisnormal.png" />
                            );
                        }
                    } else if (this.props.special === 'operation') {
                        if (record.DGIMN === 'bjldgn01' || record.DGIMN === 'dtgjhh11102' || record.DGIMN === 'dtgrjx110') {
                            return (
                                <img className={styles.imgradius_shinered} src="/gisfault.png" />
                            );
                        } else if (record.DGIMN === 'dtgrjx103' || record.DGIMN === 'lywjfd03') {
                            return (
                                <img className={styles.imgradius_shinered} src="/gisstop.png" />
                            );
                        } else {
                            return (
                                <img src="/gisnormal.png" />
                            );
                        }
                    } else if (this.props.special === 'sewage') {
                        if (record.DGIMN === 'bjldgn01' || record.DGIMN === 'dtgjhh11102' || record.DGIMN === 'dtgrjx110') {
                            return (
                                <img className={styles.imgradius_shinered} src="/gisover.png" />
                            );
                        } else if (record.DGIMN === 'dtgrjx103' || record.DGIMN === 'lywjfd03') {
                            return (
                                <img className={styles.imgradius_shinered} src="/gisexception.png" />
                            );
                        } else {
                            return (
                                <img src="/gisnormal.png" />
                            );
                        }
                    } else {
                        if (record.DGIMN === 'bjldgn01' || record.DGIMN === 'dtgjhh11102' || record.DGIMN === 'dtgrjx110'
                        || record.DGIMN === 'dtgrjx103' || record.DGIMN === 'lywjfd03') {
                            return (
                                <img className={styles.imgradius_shinered} src="/gisquality.png" />
                            );
                        } else {
                            return (
                                <img src="/gisnormal.png" />
                            );
                        }
                    }
                }
            },
            {
                title: '企业',
                width: '50%',
                dataIndex: 'EntName',
                align: 'center'
            },
            {
                title: '监测点',
                width: '30%',
                dataIndex: 'PointName',
                align: 'center'
            }];
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
                    placeholder="请输入监测点名称、企业名称、设备编号进行搜索"
                    onSearch={(value) => {
                        this.props.TreeSearch(value);
                    }}
                    style={{
                        width: 327,
                        margin: '0px 2px 10px 10px'
                    }} />
                <Table className={styles.reTable} size="small" columns={treecol} dataSource={this.props.markersInfo} pagination={false}
                    scroll={{ y: 'calc(100vh - 240px)' }}
                    style={{fontSize: '12px'}}
                    onRow={record => ({
                        onClick: () => {
                            this.props.treeCilck(record);
                        }
                    })}
                />
            </div>
        );
    }
}
// rowClassName={record => {
//     return (record.DGIMN === 'bjldgn01' || record.DGIMN === 'dtgjhh11102' || record.DGIMN === 'dtgrjx110'
//     || record.DGIMN === 'dtgrjx103' || record.DGIMN === 'lywjfd03') ? styles.shine_red : '';
// }}
export default NavigationTree;
