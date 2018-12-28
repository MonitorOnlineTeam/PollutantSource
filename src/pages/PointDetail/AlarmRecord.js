
import React, { Component } from 'react';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
import moment from 'moment';
import PollutantSelect_ from '../../components/PointDetail/PollutantSelect_';
import { Card,
    Row,
    Col,
    Table,
    Spin,
    Form,
} from 'antd';

import {connect} from 'dva';
import styles from './index.less';
const FormItem = Form.Item;
@connect(({points, loading}) => ({
    pollutantlist: points.pollutantlist,
    isloading: loading.effects['points/querypollutantlist'],
    dataloading: loading.effects['points/queryoverdatalist'],
    data: points.overdata,
    total: points.overtotal,
    selectpoint: points.selectpoint,
}))

class AlarmRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [moment(new Date()).add(-1, 'month'), moment(new Date())],
            current: 1,
            pageSize: 15
        };
    }
    componentWillMount() {
        this.props.dispatch({
            type: 'points/querypollutantlist',
            payload: {
                dgimn: this.props.selectpoint.DGIMN
            }
        });
        this.reloaddatalist(this.state.pollutantCode, this.state.current, this.state.pageSize, this.state.rangeDate[0], this.state.rangeDate[1]);
    }
    _handleDateChange=(date, dateString) => {
        this.setState({
            rangeDate: date,
            current: 1
        });
        this.reloaddatalist(this.state.pollutantCode, this.state.current, this.state.pageSize, date[0], date[1]);
    };

      // 污染物
      _handlePollutantChange=(value, selectedOptions) => {
          this.setState({
              pollutantCode: value,
              current: 1
          });
          this.reloaddatalist(value, this.state.current, this.state.pageSize, this.state.rangeDate[0], this.state.rangeDate[1]);
      };

      pageIndexChange=(page, pageSize) => {
          this.setState({
              current: page,
          });
          this.reloaddatalist(this.state.pollutantCode, page, this.state.pageSize, this.state.rangeDate[0], this.state.rangeDate[1]);
      }
      reloaddatalist=(pollutantCode, pageIndex, pageSize, beginTime, endTime) => {
          this.props.dispatch({
              type: 'points/queryoverdatalist',
              payload: {
                  dgimn: this.props.selectpoint.DGIMN,
                  pollutantCode: pollutantCode,
                  beginTime: beginTime,
                  endTime: endTime,
                  pageIndex: pageIndex,
                  pageSize: pageSize
              }
          });
      }
      render() {
          
        let tablewidth=0;
        const colcount=5;
        let width= (window.screen.availWidth - 120)/colcount;
        if(width<200)
        {
            width=200;
        }
        tablewidth=  width*colcount;


          const columns = [{
              title: '超标时间',
              dataIndex: 'time',
              fixed:'left',
              width:width,
              key: 'time'
          },
          {  
              title: '超标污染物',
              dataIndex: 'pollutantName',
              width:width,
              key: 'pollutantName'
          }, {
              title: '超标值',
              dataIndex: 'overValue',
              width:width,
              key: 'overValue'
          }, {
              title: '标准值',
              dataIndex: 'standardValue',
              width:width,
              key: 'standardValue'
          },
          {
              title: '超标倍数',
              dataIndex: 'overMul',
              width:width,
              key: 'overMul'
          }];
          return (
              <div>
                  {(this.props.isloading || this.props.dataloading) ? <Spin style={{width: '100%',
                      height: 'calc(100vh - 260px)',
                      marginTop: 260 }} size="large" /> :
                      <div className={styles.cardTitle}>
                      <Card  extra={
                        <div>
                            <span>超标时间</span> <RangePicker_ style={{width: 350,textAlign:'left',marginRight:10}} format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                            <span>污染物因子</span>
                                          <PollutantSelect_
                                              optionDatas={this.props.pollutantlist}
                                              style={{width: 200,marginRight:10}}
                                              onChange={this._handlePollutantChange}
                                              placeholder="请选择污染物"
                                          />
                        </div>
                        } style={{ width: '100%', height: 'calc(100vh - 213px)' }}>
                        <Table
                                      columns={columns}
                                      dataSource={this.props.data}
                                      rowKey="key"
                                      scroll={{ y: 'calc(100vh - 420px)',x:tablewidth }}
                                      rowClassName={
                                        (record, index, indent) => {
                                            if (index === 0) {
                                                return;
                                            }
                                            if (index % 2 !== 0) {
                                                return 'light';
                                            }
                                        }
                                    }
                                      pagination={{
                                          'total': this.props.total,
                                          'pageSize': this.state.pageSize,
                                          'current': this.state.current,
                                          onChange: this.pageIndexChange
                                      }}
                                  />
                    </Card>
                    </div>
                  }</div>
          );
      }
}
export default AlarmRecord;
