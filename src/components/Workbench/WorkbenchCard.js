import React, { Component } from 'react';
import { Card, List} from 'antd';
import styles from './WorkbenchCard.less';

export default class WorkbenchCard extends Component {
    render() {
        const title = this.props.title;
        const dataSource = this.props.dataSource;
        const extra = this.props.extra;
        return (
            <Card title={title} bordered={false} extra={extra}>
                <div className={styles['demo-infinite-container']} style={{ height: 'calc(100vh/2 - 185px)' }}>
                    <List
                        dataSource={dataSource}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    title={<span>jsdfkjdsklf</span>}
                                />
                                <div>Content</div>
                            </List.Item>
                        )}
                    />
                </div>
            </Card>
        );
    }
}
