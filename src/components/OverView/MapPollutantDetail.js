import React, { Component } from 'react';
import {Table} from 'antd';
import styles from './OverView.less';
class MapPollutantDetail extends Component {
    render() {
        const {isloading}=this.props;

        if (this.props.isloading) {
            return (<Spin
                style={{ width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center' }}
                size="large"
            />);
        }
        return (
            <div>
                <Table size="small" columns={this.props.detailpcol} dataSource={this.props.detaildata} pagination={false}
                    className={styles.treeTable}
                    rowKey="pcode"
                    style={{ fontSize: '12px',  background: '#fff', width: 420, borderRadius: 10 }}
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
