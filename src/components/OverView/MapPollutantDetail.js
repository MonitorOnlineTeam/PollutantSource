import React, { Component } from 'react';
import {Table} from 'antd';
import styles from './OverView.less';
class MapPollutantDetail extends Component {
    render() {
        return (
            <div>
                <Table size="small" columns={this.props.detailpcol} dataSource={this.props.detaildata} pagination={false}
                    className={styles.treeTable}
                    style={{ fontSize: '12px', height: 207, background: '#fff', width: 420, borderRadius: 10 }}
                    onRow={record => ({
                        onClick: () => {
                            this.props.detialTreeClick(record);
                        }
                    })}
                />
            </div>
        );
    }
}

export default MapPollutantDetail;
