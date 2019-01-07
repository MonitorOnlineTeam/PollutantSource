import React, { Component,Fragment } from 'react';
import {
    Card,
    List,
    Progress,
    Tag

} from 'antd';
import Cookie from 'js-cookie';
import moment from 'moment';
import { connect } from 'dva';
import RangePicker_ from '@/components/PointDetail/RangePicker_';
import styles from './MyPieList.less';

@connect(({
    loading,
    userinfo
}) => ({
    Isloading: loading.effects['userinfo/mymessagelist'],
    mymessagelist: userinfo.mymessagelist,
    total: userinfo.total,
    pageSize: userinfo.pageSize,
    pageIndex: userinfo.pageIndex,
}))
class MyMessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [],
            Datestring: [],
            userId:null,
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

    _handleDateChange = (date, dateString) => {
        this.setState({
            rangeDate: dateString,
            Datestring: date,
        }, () => {
            this.onChange();
        });
    };


    onShowSizeChange = (pageIndex, pageSize) => {
        const arr = this.state.rangeDate.join(',').split(',');
        let beginTime = '';
        let endTime = '';
        if (arr.length > 1) {
            beginTime = arr[0].toString();
            endTime = arr[1].toString();
        }
        this.props.dispatch({
            type: 'userinfo/mymessagelist',
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
            type: 'userinfo/mymessagelist',
            payload: {
                pageIndex: pageIndex === undefined ? 1 : pageIndex,
                pageSize: pageSize === undefined ? 10 : pageSize,
                beginTime: beginTime,
                endTime: endTime,
            },
        });
    }


    //    messagetatus = (IsView, ID) => {
    //        const arr = [];
    //        if (IsView) {
    //            arr.push(
    //                <Fragment>
    //                    <p><Tag color="blue"> <a>已读</a></Tag></p>
    //                </Fragment>
    //            );
    //        } else {
    //            arr.push(
    //                <Fragment>
    //                    <p><Tag color="red"> <a title="标记为已读" onClick={()=>{}}>未读</a></Tag></p>
    //                </Fragment>
    //            );
    //        }
    //        return arr ;
    //    }

    render() {
        console.log(this.props.mymessagelist.length);
        const ListContent = ({ data: { PushUserName, PushTime} }) => (
            <div className={styles.listContent}>
                <div className={styles.listContentItem}>
                    <span>发送人</span>
                    <span>{PushUserName}</span>
                </div>
                <div className={styles.listContentItem}>
                    <span>发送时间</span>
                    <span>{moment(PushTime).format('YYYY-MM-DD HH:mm')}</span>
                </div>
            </div>
        );
        const pagination=
            {
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
        const extraContent=(
            <div>
                <RangePicker_
                    style={{width: 350}}
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={this._handleDateChange}
                    onOk={() => this.onChange()}
                    dateValue={this.state.Datestring}
                />
            </div>
        );
        return (
            <Card
                bordered={false}
                title="我的通知"
                style={{height:'calc(100vh - 160px)' }}
                className={styles.listCard}
                bodyStyle={{ padding: '0 32px 40px 32px' }}
                extra={extraContent}
            >
                <List
                    size="large"
                    rowKey="ID"
                    loading={this.props.Isloading}
                    pagination={this.props.mymessagelist.length>0?pagination:false}
                    dataSource={this.props.mymessagelist}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a>{item.MsgTitle}</a>}
                                description={item.Msg}
                            />
                            <ListContent data={item} />
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}

export default MyMessageList;
