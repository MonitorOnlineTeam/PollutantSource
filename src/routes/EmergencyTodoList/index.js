import React, { Component } from 'react';
import PointList from '../../components/PointList/PointsList';
import {Button, Table, DatePicker, Select, Modal} from 'antd';
import EmergencyDataList from '../../mockdata/EmergencyTodoList/EmergencyDataList.json';
import styles from './index.less';
import moment from 'moment';
import { getTimeDistance } from '../../utils/utils';
import EmergencyDetailInfo from './EmergencyDetailInfo';

const { RangePicker } = DatePicker;
const Option = Select.Option;

export default class EmergencyTodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showdetailinfo: false,
            showcheck: false,
            selectedRowKeys: [],
            EmergencyData: EmergencyDataList.EDataList
        };
    }

    SearchEmergencyDataList = (value) => {
        debugger;
        this.setState({ EmergencyData: [] });
        let dataList = [];
        EmergencyDataList.EDataList.map((item, key) => {
            let isexist = false;
            if (value.indexOf(item.DGIMN)>-1) {
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

      render() {
          const { selectedRowKeys } = this.state;
          const SCREEN_HEIGHT = document.querySelector('body').offsetHeight;
          const SCREEN_WIDTH = document.querySelector('body').offsetWidth;
          const currentDate = getTimeDistance('today');
          const rowSelection = {
              selectedRowKeys,
              onChange: this.onSelectChange,
          };

          return (
              <PointList handleChange={this.SearchEmergencyDataList} IsShowChk={'none'}>
                  <div className={styles.codebox} style={{ width: '100%', height: 'calc(100vh - 80px)',backgroundColor:'#fff' } }>
                      <div className={styles.operations} >
                          <Button onClick={this.SeeDetailInfo}>查看详细</Button>
                          <Button onClick={this.SeeCheckInfo}>审核记录</Button>
                      </div>
                      <div className={styles.searchCondition} >
                          <RangePicker
                              defaultValue={[moment(currentDate), moment(currentDate)]}
                              ranges={{ 今天: [moment(), moment()], 本月: [moment(), moment().endOf('month')], 上个月: [moment(), moment().endOf('month')] }}
                              format="YYYY-MM-DD"
                              style={{ marginLeft: 8 }}
                          />
                          <Select style={{ width: 200, marginLeft: 10 }} placeholder="任务状态">
                              <Option value="0">全部</Option>
                              <Option value="1">处理中</Option>
                              <Option value="2">未审核</Option>
                              <Option value="3">正在审核</Option>
                              <Option value="4">未通过</Option>
                              <Option value="5">审核通过</Option>
                          </Select>
                          <Select style={{ width: 200, marginLeft: 10 }} placeholder="处理人">
                              <Option value="0">全部</Option>
                              <Option value="1">小李</Option>
                              <Option value="2">小王</Option>
                          </Select>
                          <Button type="primary" icon="search">Search</Button>
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
