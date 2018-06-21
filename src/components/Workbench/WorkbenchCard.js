import React, { Component } from 'react';
import { Card, List} from 'antd';
import styles from './WorkbenchCard.less';

export default class WorkbenchCard extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

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
                                    /* title={<span>{item.detail}</span>} */
                                    title={<a href="#">sdfdsfdsfdsfsdfdsfdsfddsfdsfdsfsdfdsfdsfdsfsdfdsfdsfdsfsdfdsfdsfdsfsdfdsfdsfdsfsdfdsfdsfdsfsdfdsfdsfdsfsdfdsfdsfdsfsdfdsfdsfdsf</a>}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Card>
        );
    }
}
