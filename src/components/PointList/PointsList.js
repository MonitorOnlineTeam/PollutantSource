import React, { Component } from 'react';
import styles from './PointsList.less';
import { Table, Input } from 'antd';
const Search = Input.Search;
const column = [
    {
        title: '',
        width: '10%',
        dataIndex: 'Status',
        align: 'center',
        render: text => <img src='../../../image/bootonline.png' />,
    }, {
        title: '排口',
        width: '30%',
        dataIndex: 'PointName',
        align: 'left'
    }, {
        title: '企业',
        width: '50%',
        dataIndex: 'EnterName',
        align: 'left'
    }, {
        title: '',
        width: '10%',
        dataIndex: 'Operation',
        align: 'center',
        render: () => <img src="../../../image/otherinfo.png" />
    }];

const dataList = [
       {
        Status: '1',
        DGIMN: 'ldscwjty000001',
        PointName: '窑头',
        EnterName: '北京雪迪龙科技股份有限公司'
      }, {
        Status: '2',
        DGIMN: '62072531stjt01',
        PointName: '窑尾',
        EnterName: '北京雪迪龙科技股份有限公司'
      }];

export default class componentName extends Component {
    render() {
        return (
            <div className={`${styles.bigDiv} ${styles.shadow}`} style={{ width: '100%', height: 'calc(100vh - 80px)' }} >
                <div className={styles.navigation}>
 导航列表
                </div>
                <div className={styles.legend_div}>
                    <ul>
                        <li><div className={`${styles.zhuangtai_style01} ${styles.z_green}`} />正常</li>
                        <li><div className={`${styles.zhuangtai_style01} ${styles.z_red}`} />超标</li>
                        <li><div className={`${styles.zhuangtai_style01} ${styles.z_grey}`} />离线</li>
                        <li><div className={`${styles.zhuangtai_style01} ${styles.z_yellow}`} />异常</li>
                    </ul>
                </div>
                <div className={styles.searchInput}>
                    <Search placeholder="请输入企业名称"
                        onSearch={value => console.log(value)}
                        style={{ width: 320 }}
                    />
                </div>
                <Table bodyStyle={{ height: 'calc(100vh - 260px)' }}
                    columns={column}
                    dataSource={dataList}
                    rowKey="DGIMN"
                    pagination={false}
                />
            </div>
        );
    }
}
