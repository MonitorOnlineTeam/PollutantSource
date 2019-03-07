
import React, { Component } from 'react';
import moment from 'moment';
import { Card,
    Row,
    Col,
    Table,
    Spin,
    Form,
} from 'antd';

import {connect} from 'dva';
import PollutantSelect from '../../components/PointDetail/PollutantSelect';
import RangePicker_ from '../../components/PointDetail/RangePicker_';
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
        let {firsttime,lasttime,DGIMN}=this.props;
        firsttime=firsttime || moment(new Date()).add(-1, 'month');
        lasttime=lasttime || moment(new Date());
        this.state = {
            rangeDate: [firsttime, lasttime],
            current: 1,
            pageSize: 15,
            //参数改变让页面刷新
            DGIMN:DGIMN,
            firsttime:firsttime,
            lasttime:lasttime
        };
    }

    componentDidMount = () => {
        this._querylist(this.props.DGIMN);
    }

    _querylist = (dgimn) => {
        let {dispatch,selectpoint} = this.props;
        let DGIMN = dgimn || selectpoint.DGIMN;
        dispatch({
            type: 'points/querypollutantlist',
            payload: {
                dgimn: DGIMN,
                beginTime: this.state.rangeDate[0],
                endTime: this.state.rangeDate[1],
                pageIndex: this.state.current,
                pageSize: this.state.pageSize,
                overdata: true
            }
        });
    }

    _handleDateChange=(date, dateString) => {
        this.setState({
            rangeDate: date,
            current: 1
        },()=>{
            this.reloaddatalist(this.state.pollutantCode, this.state.current, this.state.pageSize, date[0], date[1]);
        });

    };

      // 污染物
      _handlePollutantChange=(value, selectedOptions) => {
          if(value==-1) {
              value=null;
          }
          this.setState({
              pollutantCode: value,
              current: 1
          },()=>{
              this.reloaddatalist(value, this.state.current, this.state.pageSize, this.state.rangeDate[0], this.state.rangeDate[1]);
          });

      };

      pageIndexChange=(page, pageSize) => {
          this.setState({
              current: page,
          },()=>{
              this.reloaddatalist(this.state.pollutantCode, page, this.state.pageSize, this.state.rangeDate[0], this.state.rangeDate[1]);
          });

      }

      reloaddatalist=(pollutantCode, pageIndex, pageSize, beginTime, endTime) => {
          let dgimn = this.props.DGIMN || this.props.selectpoint.DGIMN;
          this.props.dispatch({
              type: 'points/queryoverdatalist',
              payload: {
                  dgimn: dgimn,
                  pollutantCode: pollutantCode,
                  beginTime: beginTime,
                  endTime: endTime,
                  pageIndex: pageIndex,
                  pageSize: pageSize
              }
          });
      }

      componentWillReceiveProps = (nextProps) => {

          const {DGIMN,lasttime,firsttime}=this.props;
          //如果传入参数有变化，则重新加载数据
          if (nextProps.DGIMN !== DGIMN || moment(nextProps.lasttime).format('yyyy-MM-dd HH:mm:ss') !== moment(lasttime).format('yyyy-MM-dd HH:mm:ss') || moment(nextProps.firsttime).format('yyyy-MM-dd HH:mm:ss') !== moment(firsttime).format('yyyy-MM-dd HH:mm:ss')) {
              this.setState({
                  rangeDate: [nextProps.firsttime, nextProps.lasttime],
                  //参数改变让页面刷新
                  DGIMN:nextProps.DGIMN,
                  firsttime:nextProps.firsttime,
                  lasttime:nextProps.lasttime,
                  current: 1,
                  pollutantCode:null
              },()=>{
                  this._querylist(nextProps.DGIMN);

              });

          }
      }

      render() {
          let tablewidth=0;
          const colcount=5;
          let width= (window.screen.availWidth - 120)/colcount;
          if(width < 200) {
              width = 200;
          }
          tablewidth= width*colcount;


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
              key: 'overValue',
              render: (text,record)=>{
                 if(record.unit)
                 {
                     return text+"("+record.unit+")";
                 }
                 return text;
              }
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

          if(this.props.isloading) {
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
                  <div className={styles.cardTitle}>
                      <Card
                          extra={
                              <div>
                                  <span>超标时间</span> <RangePicker_ style={{width: 350,textAlign:'left',marginRight:10}} format="YYYY-MM-DD HH:mm:ss" onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                                  <span>污染物因子</span>
                                  <PollutantSelect
                                      optionDatas={this.props.pollutantlist}
                                      style={{width: 200,marginRight:10,marginLeft:10}}
                                      allpollutant={true}
                                      onChange={this._handlePollutantChange}
                                      placeholder="请选择污染物"
                                  />
                              </div>
                          }
                      >
                          <Table
                              loading={this.props.dataloading}
                              columns={columns}
                              dataSource={this.props.data}
                              rowKey="key"
                              scroll={{ y: 'calc(100vh - 500px)',x:tablewidth }}
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
              </div>
          );
      }
}
export default AlarmRecord;
