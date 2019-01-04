import React, { Component,Fragment } from 'react';
import {
    Card,
    List,
    Progress,

} from 'antd';
import Cookie from 'js-cookie';
import moment from 'moment';
import { connect } from 'dva';
import {
    routerRedux
} from 'dva/router';
import RangePicker_ from '@/components/PointDetail/RangePicker_';
import styles from './MyPieList.less';

@connect(({
    loading,
    userinfo
}) => ({
    Isloading: loading.effects['userinfo/getmypielist'],
    mypielist: userinfo.mypielist,
    total: userinfo.total,
    pageSize: userinfo.pageSize,
    pageIndex: userinfo.pageIndex,
}))
class MyPieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:null,
            rangeDate: [],
            Datestring: [],
        };
    }

    componentWillMount() {
        const userCookie = Cookie.get('token');
        if (userCookie) {
            const user = JSON.parse(userCookie);
            this.setState({
                userId: user.User_ID,
            }, () => {
                this.onChange();
            });
        }
    }

    onShowSizeChange = (pageIndex, pageSize) => {
        const arr = this.state.rangeDate.join(',').split(',');
        let beginTime = '';
        let endTime = '';
        if (arr.length > 1) {
            beginTime = arr[0].toString();
            endTime = arr[1].toString();
        }
        this.props.dispatch({
            type: 'userinfo/getmypielist',
            payload: {
                pageIndex: pageIndex === undefined ? 1 : pageIndex,
                pageSize: pageSize === undefined ? 10 : pageSize,
                beginTime: beginTime,
                endTime: endTime,
            },
        });
    }

    onChange = (pageIndex, pageSize) => {
        const arr = this.state.rangeDate.join(',').split(',');
        let beginTime = '';
        let endTime = '';
        if (arr.length > 1) {
            beginTime = arr[0].toString();
            endTime = arr[1].toString();
        }
        this.props.dispatch({
            type: 'userinfo/getmypielist',
            payload: {
                pageIndex: pageIndex === undefined ? 1 : pageIndex,
                pageSize: pageSize === undefined ? 10 : pageSize,
                beginTime: beginTime,
                endTime: endTime,
            },
        });
    }

   _handleDateChange = (date, dateString) => {
       this.setState({
           rangeDate: dateString,
           Datestring: date,
       },()=>{
           this.onChange();
       });
   };

   taskstatus=(TaskStatus, TaskStatusText)=> {
       const arr = [];
       if (TaskStatus===1) {
           arr.push(
               <Fragment>
                   <span>{TaskStatusText}</span>
                   <span><Progress percent={0} showInf={false} strokeWidth={6} style={{ width: 180 }} /></span>
               </Fragment>
           );
       }
       if (TaskStatus===2) {
           arr.push(
               <Fragment>
                   <span>{TaskStatusText}</span>
                   <span><Progress percent={50} status="active" showInf={false} strokeWidth={6} style={{ width: 180 }} /></span>
               </Fragment>
           );
       }
       if (TaskStatus===3) {
           arr.push(
               <Fragment>
                   <span>{TaskStatusText}</span>
                   <span><Progress percent={100} status="success" showInf={false} strokeWidth={6} style={{ width: 180 }} /></span>
               </Fragment>
           );
       }
       return arr ;
   }

   render() {
       const ListContent = ({ data: { OperationUserName, CreateTime, TaskStatus, TaskStatusText,TaskID } }) => (
           <div className={styles.listContent} key={TaskID}>
               <div className={styles.listContentItem}>
                   <span>执行人</span>
                   <p>{OperationUserName}</p>
               </div>
               <div className={styles.listContentItem}>
                   <span>创建时间</span>
                   <p>{moment(CreateTime).format('YYYY-MM-DD HH:mm')}</p>
               </div>
               <div className={styles.listContentItem}>
                   {this.taskstatus(TaskStatus,TaskStatusText)}
               </div>
           </div>
       );
       const extraContent=(
           <div> <RangePicker_
               style={{width: 350}}
               format="YYYY-MM-DD HH:mm:ss"
               onChange={this._handleDateChange}
               onOk={() => this.onChange()}
               dateValue={this.state.Datestring}
           />
           </div>
       );
       const pagination = {
           size: "small",
           showSizeChanger: true,
           showQuickJumper: true,
           'total': this.props.total,
           'pageSize': this.props.pageSize,
           'current': this.props.pageIndex,
           onChange: this.onChange,
           onShowSizeChange: this.onShowSizeChange,
           pageSizeOptions: ['10', '20', '30', '40']
       };
       return (
           <Card
               bordered={false}
               title="我的派单"
               style={{height:'calc(100vh - 160px)' }}
               className={styles.listCard}
               bodyStyle={{ padding: '0 32px 40px 32px' }}
               extra={extraContent}
           >
               <List
                   size="large"
                   rowKey="TaskID"
                   loading={this.props.Isloading}
                   pagination={this.props.mypielist.length>0?pagination:false}
                   dataSource={this.props.mypielist}
                   renderItem={item => (
                       <List.Item
                           actions={[
                               <a onClick={()=>{
                                   this.props.dispatch(routerRedux.push(`/TaskDetail/EmergencyDetailInfo/pielist/${item.TaskID}`));
                               }}
                               >
                      查看
                               </a>,
                           ]}
                       >
                           <List.Item.Meta
                               title={<a>{item.PointName}</a>}
                               description={item.Remark}
                           />
                           <ListContent data={item} />
                       </List.Item>
                   )}
               />
           </Card>
       );
   }
}

export default MyPieList;
