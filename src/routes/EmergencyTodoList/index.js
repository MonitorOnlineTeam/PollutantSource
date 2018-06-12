import React, { Component } from 'react';
import { Table, Radio, Select, Cascader, Input, Card, Modal,Spin } from 'antd';

/* 
页面：应急维护待办列表
描述：通过待办进入应急维护任务，也可通过代办列表找到需要应急的任务
add by cg 18.6.8
modify by 
*/
export default class EmergencyAuditList extends Component {
  render() {
    return (
      <div
      style={{ width: '100%',
      height: 'calc(100vh - 120px)' }}
      >
       <Card
          bordered={false}
          bodyStyle={
            {
              height: 'calc(100vh - 200px)',
              padding: '0px 20px',
            }
          }>
          </Card >
      </div>
    )
  }
}
