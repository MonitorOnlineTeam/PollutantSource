import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Radio, Card, TimePicker, Icon, Button, Spin } from 'antd';
import styles from './index.less';
import moment from 'moment';
import AListRadio from '../../components/OverView/AListRadio';

@connect(({loading, overview}) => ({
    columns: overview.columns,
    data: overview.data,
    gwidth: overview.gwidth,
    isloading: loading.effects['overview/querydatalist'],
}))
class dataList extends PureComponent {
    constructor(props) {
        super(props);
        const _this = this;
        this.state = {
            nowdate: moment(new Date()).add(-1, 'hour')
        };
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'overview/querypollutanttypecode',
            payload: {
                code: 2,
                time: this.state.nowdate.format('YYYY-MM-DD HH:00:00')
            }
        });
    }
    pickerChange=(time, timeString) => {
        this.setState({
            nowdate: time
        });
        this.props.dispatch({
            type: 'overview/querydatalist',
            payload: {
                time: time.format('YYYY-MM-DD HH:00:00')
            }
        });
    }
    render() {
        console.log(this.props.columns);
        console.log(this.props.data);
        return (
            <div
                style={{ width: '100%', height: 'calc(100vh - 65px)' }}
                className={styles.standardList}>
                <Card
                    bordered={false}
                    bodyStyle={
                        {
                            padding: '0px 20px',
                        }
                    }
                    extra={
                        <div>
                            <div style={{ width: 'calc(100vw - 220px)' }}>
                                <TimePicker onChange={this.pickerChange} style={{width: 150, marginRight: 20}} defaultValue={this.state.nowdate} format="HH:00:00" />
                                <Button style={{marginRight: 10}}><Icon type="user" style={{color: '#3B91FF'}} /> 运维中</Button>
                                <Button style={{marginRight: 20}}><span style={{fontSize: 16, color: '#ff0000'}}>■</span> 传输有效率不达标</Button>
                                <Radio.Group>
                                    <Radio.Button value="normal"><img src="../../../gisnormal.png" /> 正常</Radio.Button>
                                    <Radio.Button value="over"><img src="../../../gisover.png" /> 超标</Radio.Button>
                                    <Radio.Button value="underline"><img src="../../../gisunline.png" /> 离线</Radio.Button>
                                    <Radio.Button value="exception"><img src="../../../gisexception.png" /> 异常</Radio.Button>
                                </Radio.Group>
                                <AListRadio style={{float: 'right'}} dvalue="b" />
                            </div>
                        </div>
                    }>
                    {this.props.isloading ? <Spin style={{width: '100%',
                        height: 'calc(100vh - 260px)',
                        marginTop: 260 }} size="large" />
                        : <Table
                            columns={this.props.columns}
                            dataSource={this.props.data}
                            pagination={false}
                            loading={this.props.isloading}
                            scroll={{ x: this.props.gwidth, y: true }}
                            onRow={record => ({
                            })}
                        />}
                </Card >
            </div>
        );
    }
}
export default dataList;
