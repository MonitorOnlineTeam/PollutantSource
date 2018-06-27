import React, { Component } from 'react';
import PointList from '../../components/PointList/PointsList';
import {Button, Table, DatePicker, Select, Modal} from 'antd';
import EmergencyDataList from '../../mockdata/EmergencyTodoList/EmergencyDataList.json';
import styles from './index.less';
import moment from 'moment';
import { getTimeDistance } from '../../utils/utils';
import EmergencyDetailInfo from './EmergencyDetailInfo';
import RangePicker_ from '../../components/PointDetail/RangePicker_';

const { RangePicker } = DatePicker;
const Option = Select.Option;
const currentDate=moment(getTimeDistance('today')).format('yyyy-MM-dd');

export default class EmergencyTodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showdetailinfo: false,
            showcheck: false,
            selectedRowKeys: [],
            EmergencyData: EmergencyDataList.EDataList,
            RangeDate: [],
            TargetStatus: '',
            OpeartionPerson: ''
        };
    }

    SearchEmergencyDataList = (value) => {
        this.setState({ EmergencyData: [] });
        let dataList = [];
        EmergencyDataList.EDataList.map((item, key) => {
            let isexist = false;
            if (value.indexOf(item.DGIMN) > -1) {
                isexist = true;
            }

            if (isexist) { dataList.push(item); }
        });
        this.setState({ EmergencyData: dataList });
    };

    SeeDetailInfo = () => {
        this.setState({
            showdetailinfo: true
        });
    }

      SeeCheckInfo = () => {
          this.setState({
              showcheck: true
          });
      }

      // 时间范围
    _handleDateChange=(date, dateString) => {
        this.state.RangeDate = dateString;
    };

       // 任务状态
       _handleTargetChange=(value) => {
           this.setState({
               TargetStatus: value
           });
       };

    // 运维人
    _handleOperationChange=(value) => {
        this.setState({
            OpeartionPerson: value
        });
    };

    SearchInfo=() => {
let rangeDate=this.state.RangeDate;
let targetStatus=this.state.TargetStatus;
let opeartionPerson=this.state.OpeartionPerson;
    }

    render() {
        const { selectedRowKeys } = this.state;
        const SCREEN_HEIGHT = document.querySelector('body').offsetHeight;
        const SCREEN_WIDTH = document.querySelector('body').offsetWidth;
        return (
            <PointList handleChange={this.SearchEmergencyDataList} IsShowChk={'none'}>
                <div className={styles.codebox} style={{ width: '100%', height: 'calc(100vh - 80px)', backgroundColor: '#fff' }}>
                    <div className={styles.operations} >
                        <Button onClick={this.SeeDetailInfo}>查看详细</Button>
                        <Button onClick={this.SeeCheckInfo}>审核记录</Button>
                    </div>
                    <div className={styles.searchCondition} >
                       
                        <RangePicker_ dateValue={this.state.RangeDate} format="YYYY-MM-DD" onChange={this._handleDateChange} />
                        <Select style={{ width: 200, marginLeft: 10 }} placeholder="任务状态"
                            onChange={this._handleTargetChange}>
                            <Option value="0">全部</Option>
                            <Option value="1">处理中</Option>
                            <Option value="2">未审核</Option>
                            <Option value="3">正在审核</Option>
                            <Option value="4">未通过</Option>
                            <Option value="5">审核通过</Option>
                        </Select>
                        <Select style={{ width: 200, marginLeft: 10 }} placeholder="处理人"
                            onChange={this._handleOperationChange}>
                            <Option value="0">全部</Option>
                            <Option value="1">小李</Option>
                            <Option value="2">小王</Option>
                        </Select>
                        <Button type="primary" icon="search" onClick={this.SearchInfo}>查询</Button>
                    </div>
                    <Table bodyStyle={{ height: 'calc(100vh - 260px)' }}
                        columns={EmergencyDataList.EColumn}
                        dataSource={this.state.EmergencyData}
                        rowKey="ExceptionHandleId"
                        bordered={true}
                        onRow={(record) => {
                            return {
                                onClick: () => {} // 点击行
                            };
                        }}
                    />
                    <Modal
                        visible={this.state.showdetailinfo}
                        width={SCREEN_WIDTH - 40}
                        style={{ top: 20 }}
                        bodyStyle={{ padding: 5 }}
                        onCancel={() => {
                            this.setState({
                                showdetailinfo: false
                            });
                        }}
                        footer={null}
                    >
                        <EmergencyDetailInfo {...this.props} />}
                    </Modal>
                    <Modal
                        visible={this.state.showcheck}
                        width={SCREEN_WIDTH - 200}
                        style={{ top: 20 }}
                        bodyStyle={{ padding: 5 }}
                        onCancel={() => {
                            this.setState({
                                showcheck: false
                            });
                        }}
                        footer={null}
                    >
                        <EmergencyDetailInfo {...this.props} />}
                    </Modal>
                </div>
            </PointList>
        );
    }
}
