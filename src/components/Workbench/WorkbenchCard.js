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
                                    title={<a href="#" style={{'text-decoration': 'underline'}}>{item.operationaction === 1 ? '例行运维' : item.operationaction === 2 ? '应急运维' : '运维审核'}-<span style={{color: 'red'}}>{item.EntName}</span>企业<span style={{color: 'red'}}>{item.PointName}</span>排口,{item.date.replace((new Date()).getFullYear() + '-', '')}{item.operationaction === 1 ? '待巡检' : item.operationaction === 2 ? '待应急运维' : '待审核'}</a>}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Card>
        );
    }
}
