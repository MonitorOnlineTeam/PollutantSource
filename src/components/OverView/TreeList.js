import React, { Component } from 'react';
import {Table} from 'antd';
import styles from './OverView.less';
class TreeList extends Component {
    render() {
        const {treecol, pointInfo} = this.props;
        return (
            <div style={{borderRadius: 7}}>
                <Table size={'small'} columns={treecol} dataSource={pointInfo} pagination={false}
                    rowKey="DGIMN"
                    loading={this.props.treedataloading}
                    className={styles.treeTable}
                    scroll={{ y: 'calc(100vh - 340px)' }}
                    style={{ fontSize: '12px', height: 'calc(100vh - 340px)', background: '#fff', width: 420, borderRadius: 5 }}
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

export default TreeList;
