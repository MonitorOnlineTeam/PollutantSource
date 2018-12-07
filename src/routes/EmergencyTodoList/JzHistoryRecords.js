import React, { Component } from 'react';
import styles from '../EmergencyTodoList/JzRecordInfo.less';
import {Spin, Button, Icon} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
const pageIndex = 1;
const pageSize = 10;
@connect(({ task, loading }) => ({
    isloading: loading.effects['task/GetJzHistoryRecord'],
    JzHistoryRecord: task.JzHistoryRecord
}))
export default class JzHistoryRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment(moment(new Date()).subtract(7, 'day').format('YYYY-MM-DD 00:00:00')), moment(moment(new Date()).format('YYYY-MM-DD 23:59:59'))],
            pageIndex: pageIndex,
            pageSize: pageSize,
            beginTime: moment().subtract(7, 'day').format('YYYY-MM-DD 00:00:00'),
            endTime: moment().format('YYYY-MM-DD 23:59:59'),
            dgimn: this.props.match.params.pointcode,
            typeID: this.props.match.params.TypeID,
        };
    }

    componentDidMount() {
        this.GetHistoryRecord(pageIndex, pageSize, this.state.dgimn, this.state.typeID, this.state.beginTime, this.state.endTime);
    }

    GetHistoryRecord=(pageIndex, pageSize, dgimn, typeID, beginTime, endTime) => {
        this.props.dispatch({
            type: 'task/GetJzHistoryRecord',
            payload: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                TypeID: typeID,
                DGIMN: dgimn,
                BeginTime: beginTime,
                EndTime: endTime,
            }
        });
    };

    _handleDateChange=(date, dateString) => {
        this.setState(
            {
                beginTime: dateString[0],
                endTime: dateString[1]
            }
        );
        this.GetHistoryRecord(pageIndex, pageSize, this.state.dgimn, this.state.typeID, dateString[0], dateString[1]);
    };

    render() {
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight - 150;
        const dataSource = this.props.JzHistoryRecord;
        const columns = [{
            title: '校准人',
            width: '20%',
            dataIndex: 'JzPerson',
            key: 'JzPerson',
        }, {
            title: '分析仪校准是否正常',
            width: '45%',
            dataIndex: 'CreateTime',
            key: 'CreateTime',
        }, {
            title: '记录创建时间',
            dataIndex: 'Content',
            width: '20%',
            key: 'Content',
        }, {
            title: '详细',
            dataIndex: 'TaskID',
            width: '15%',
            key: 'TaskID',
        }];
        return (
            <div className={styles.FormDiv} style={{height: SCREEN_HEIGHT}}>
                <Table style={{ backgroundColor: 'white'}} bordered={false} dataSource={dataSource} pagination={false} columns={columns} />
            </div>
        );
    }
}
