// import liraries
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Radio, Select, Cascader, Input, Card, Modal, Spin } from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import styles from './index.less';
import city from '../../utils/city';
import AListRadio from '../../components/OverView/AListRadio';
@connect()
class DataList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div
                style={{ width: '100%',
                    height: 'calc(100vh - 120px)' }}
                className={styles.standardList}
            >
                <Card
                    bordered={false}
                    bodyStyle={
                        {
                            height: 'calc(100vh - 200px)',
                            padding: '0px 20px',
                        }
                    }
                    extra={
                        <div style={{}}>
                            <Radio.Group
                                defaultValue="realtime"
                                size="default"
                                style={{ marginLeft: 10 }}>
                                <Radio.Button value="realtime"> 实时 </Radio.Button>
                                <Radio.Button value="minute"> 分钟 </Radio.Button>
                                <Radio.Button value="hour"> 小时 </Radio.Button>
                                <Radio.Button value="day"> 日均 </Radio.Button>
                            </Radio.Group>
                            <Cascader options={city} placeholder="请选择行政区"
                                style={{ width: 250, marginLeft: 10 }} />
                            <AListRadio dvalue="b" />
                        </div>}>

                    <Table
                        bodyStyle={{ height: 'calc(100vh - 300px)' }}
                        onRow={record => ({
                        })}
                    />
                </Card >
            </div>
        );
    }
}
export default DataList;
