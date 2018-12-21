
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
import styles from './index.less';
import {connect} from 'dva';
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
            pageSize: 10
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
      
      loaddata=()=>{
            //除去固定列，列的数量
        const colcount=4;
        let colwidth=(document.body.clientWidth-100-100-200)/colcount
            if(colwidth<210)
              colwidth=210
        const hiswidth=200+colcount*colwidth; 
          const columns = [{
              title: '超标时间',
              dataIndex: 'time',
              key: 'time',
              align: 'center',
              width:200
          },
          { title: '超标污染物',
              dataIndex: 'pollutantName',
              key: 'pollutantName',
              align: 'center',
              width:colwidth
          }, {
              title: '超标值',
              dataIndex: 'overValue',
              key: 'overValue',
              align: 'center',
              width:colwidth
          }, {
              title: '标准值',
              dataIndex: 'standardValue',
              key: 'standardValue',
              align: 'center',
              width:colwidth
          },
          {
              title: '超标倍数',
              dataIndex: 'overMul',
              key: 'overMul',
              align: 'center',
              width:colwidth
          }];
        if(this.props.dataloading)
        {
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
          <Table
          columns={columns}
          dataSource={this.props.data}
          rowKey="key"
          scroll={{ x: hiswidth, y: 'calc(100vh - 430px)' }}
          pagination={{
              'total': this.props.total,
              'pageSize': this.state.pageSize,
              'current': this.state.current,
              onChange: this.pageIndexChange
          }}
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
      />
        )
    }
      render() {
      
      //数据初始化
      if (this.props.isloading) {
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
            <div className={styles.cardTitle}>
                  
                      <Card extra={
                        <div>
                           <RangePicker_ style={{width: 250,marginRight:20}} format="YYYY-MM-DD" onChange={this._handleDateChange} dateValue={this.state.rangeDate} />
                               污染物因子：
                                          <PollutantSelect_
                                              optionDatas={this.props.pollutantlist}
                                              style={{width: 200}}
                                              onChange={this._handlePollutantChange}
                                              placeholder="请选择污染物"
                                          />

                            </div>
                        } style={{ width: '100%', height: 'calc(100vh - 225px)' }}>
                        {
                            this.loaddata()
                        }
                    </Card>
                   </div>
          );
      }
}
export default AlarmRecord;
