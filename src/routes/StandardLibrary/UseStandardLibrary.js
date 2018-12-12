import React, { Component,Fragment } from 'react';
import {
    Card, Icon, Divider, Table, message, Tag, Popconfirm
} from 'antd';
import {
    connect
} from 'dva';
import PageHeader from '../../components/PageHeader';
import styles from './index.less';
@connect(({loading, standardlibrary}) => ({
    ...loading,
    list: standardlibrary.uselist,
    total: standardlibrary.total,
    pageSize: standardlibrary.pageSize,
    pageIndex: standardlibrary.pageIndex,
    requstresult: standardlibrary.requstresult,
    PollutantListByDGIMN: standardlibrary.PollutantListByDGIMN
}))
export default class UseStandardLibrary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DGIMN: this.props.match.params.DGIMN,
            Fvisible: false,
            title: '',
            width: '500',
        };
    }
    componentWillMount() {
        this.onChange();
        this.getpollutantbydgimn();
    }
     onChange = (pageIndex, pageSize) => {
         this.props.dispatch({
             type: 'standardlibrary/getuselist',
             payload: {
                 pageIndex: pageIndex,
                 pageSize: pageSize,
             },
         });
     }
     getpollutantbydgimn() {
         this.props.dispatch({
             type: 'standardlibrary/getpollutantbydgimn',
             payload: {
                 DGIMN: this.state.DGIMN,
             },
         });
     }
     UseALL(StandardLibraryID) {
         this.props.dispatch({
             type: 'standardlibrary/usepoint',
             payload: {
                 DGIMN: this.state.DGIMN,
                 StandardLibraryID: StandardLibraryID,
                 callback: () => {
                     if (this.props.requstresult === '1') {
                         message.success('应用成功');
                     } else {
                         message.error('应用失败');
                     }
                 }
             },
         });
     }
     confirm = (id,dgimn) => {
         this.props.dispatch({
             type: 'standardlibrary/deletestandardlibrarybyid',
             payload: {
                 DGIMN: dgimn,
                 PollutantCode: id,
                 callback: () => {
                     if (this.props.requstresult === '1') {
                         message.success('删除成功！');
                     } else {
                         message.success('删除失败！');
                     }
                 }
             },
         });
     }
     renderStandardList=() => {
         const rtnVal = [];
         const that = this;
         this.props.list.map(function(item) {
             if (item.child.length > 1) {
                 rtnVal.push(
                     <div className={styles.item}>
                         <div className={styles.standardlibrary}>{item.Name}</div>
                         <div className={styles.child}>{that.renderPollutantItem(item.child)}</div>
                         <div className={styles.foot}>
                             <div className={styles.use}>
                                 <a className={styles.a} onClick={() => {
                                 }}> <Icon type="search"style={{marginRight: 5}} />查看更多</a>
                                 <Divider type="vertical" />
                                 <a className={styles.a} onClick={() => {
                                     that.UseALL(item.key);
                                 }}> <Icon type="appstore" style={{marginRight: 5}} />应用全部</a>
                             </div>
                         </div>
                     </div>);
             }
         });
         return rtnVal;
     }
     renderPollutantItem=(pollutantList) => {
         const rtnVal = [];
         pollutantList.map((item) => {
             rtnVal.push(<div className={styles.pollutant}> {
                 item.PollutantName
             }：{item.UpperLimit}-{item.LowerLimit} </div>);
         });
         return rtnVal;
     }
     render() {
         const columns = [
             {
                 title: '污染物编号',
                 dataIndex: 'PollutantCode',
                 key: 'PollutantCode',
                 width: '10%',
                 render: (text, record) => {
                     return text;
                 }
             },
             {
                 title: '污染物名称',
                 dataIndex: 'PollutantName',
                 key: 'PollutantName',
                 width: '50%',
                 render: (text, record) => {
                     return text;
                 }
             },
             {
                 title: '报警类型',
                 dataIndex: 'AlarmType',
                 key: 'AlarmType',
                 width: '10%',
                 render: (text, record) => {
                     if (text === 0) {
                         return <span > <Tag color="lime" > 区间报警 </Tag > </span >;
                     }
                     if (text === 1) {
                         return <span > <Tag color="green" > 上限报警 </Tag > </span >;
                     }
                     return <span > <Tag color="cyan" > 下线报警 </Tag > </span >;
                 }
             },
             {
                 title: '报警上限',
                 dataIndex: 'UpperLimit',
                 key: 'UpperLimit',
                 width: '10%',
                 render: (text, record) => {
                     return text;
                 }
             },
             {
                 title: '报警下限',
                 dataIndex: 'LowerLimit',
                 key: 'LowerLimit',
                 width: '10%',
                 render: (text, record) => {
                     return text;
                 }
             },
             {
                 title: '操作',
                 width: '10%',
                 render: (text, record) => (<Fragment >
                     <a onClick={
                         () => this.setState({
                             Fvisible: true,
                             title: '编辑污染物',
                             width: '50%',
                         })
                     } > 编辑 </a> <Divider type="vertical" />
                     <Popconfirm placement="left" title="确定要删除此条数据吗？" onConfirm={() => this.confirm(record.PollutantCode,record.DGIMN)} okText="是" cancelText="否">
                         <a href="#" > 删除 </a>
                     </Popconfirm>
                 </Fragment >
                 ),
             },
         ];
         return (
             <div >
                 <PageHeader title={this.props.match.params.PointName}
                     breadcrumbList={
                         [{
                             title: '排口列表',
                             href: '/sysmanage/PointInfo',
                         }, {
                             title: '设置标准',
                         }]
                     }
                 />
                 <div className={styles.card}>
                     {
                         this.renderStandardList()
                     }
                 </div>

                 <div className={styles.pageHeader}>
                     <h3>污染物标准选择</h3>
                 </div>
                 <Card>
                     <div className={styles.table}>
                         <Table
                             bordered={false}
                             loading={this.props.effects['standardlibrary/getpollutantbydgimn']}
                             columns={columns}
                             size="small"
                             dataSource={this.props.requstresult === '1' ? this.props.PollutantListByDGIMN : null}
                             pagination={false}
                         />
                     </div>
                 </Card>
             </div>
         );
     }
}
