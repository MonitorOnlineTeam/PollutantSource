import React, { Component } from 'react';
import {
    Card, Icon, Divider, Table, message, Tag, Modal, Pagination, Badge
} from 'antd';
import {
    connect
} from 'dva';
import PageHeader from '../../components/PageHeader';
import EditPollutant from '../StandardLibrary/EditPollutant';
import PollutantView from '../StandardLibrary/PollutantView';
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
            Pvisible: false,
            title: '',
            width: '500',
            PollutantCode: null,
        };
    }
     onRef1 = (ref) => {
         this.child = ref;
     };
     oncancel = () => {
         this.setState({
             Fvisible: false,
         });
     }
     componentWillMount() {
         this.onChange();
         this.getpollutantbydgimn();
     }
     onChange = (pageIndex, pageSize) => {
         this.props.dispatch({
             type: 'standardlibrary/getuselist',
             payload: {
                 pageIndex: pageIndex === undefined ? 1 : pageIndex ,
                 pageSize: pageSize === undefined ? 4 : pageSize,
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
     IsEnabled = (type, record) => {
         this.props.dispatch({
             type: 'standardlibrary/isusepollutant',
             payload: {
                 PollutantCode: record.PollutantCode,
                 DGIMN: this.state.DGIMN,
                 Enalbe: type,
                 StandardLibraryID: null,
             },
         });
     };
     renderStandardList=() => {
         const rtnVal = [];
         const that = this;
         this.props.list.map(function(item) {
             rtnVal.push(
                 <div className={styles.item}>
                     <div className={styles.standardlibrary}>{item.Name}</div>
                     <div className={styles.child}>{that.renderPollutantItem(item.child)}</div>
                     <div className={styles.foot}>
                         <div className={styles.use}>
                             <a className={styles.a} onClick={() => {
                                 that.setState({
                                     StandardLibraryID: item.key,
                                     Pvisible: true,
                                     title: item.Name + '中的污染物',
                                     width: '90%',
                                 });
                             }}> <Icon type="search"style={{marginRight: 5}} />查看更多</a>
                             <Divider type="vertical" />
                             <a className={styles.a} onClick={() => {
                                 that.UseALL(item.key);
                             }}> <Icon type="appstore" style={{marginRight: 5}} />应用全部</a>
                         </div>
                     </div>
                 </div>);
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
                 align: 'left',
                 render: (text, record) => {
                     return text;
                 }
             },
             {
                 title: '污染物名称',
                 dataIndex: 'PollutantName',
                 key: 'PollutantName',
                 width: '40%',
                 align: 'left',
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
                         return <Badge status="warning" text="区间报警" />;
                     }
                     if (text === 1) {
                         return <span style={{color: 'red'}} >上限报警  </span >;
                     }
                     return <span style={{color: 'green'}} >  下线报警 </span >;
                 }
             },
             {
                 title: '报警上限',
                 dataIndex: 'UpperLimit',
                 key: 'UpperLimit',
                 width: '10%',
                 align: 'center',
                 render: (text, record) => {
                     return text;
                 }
             },
             {
                 title: '报警下限',
                 dataIndex: 'LowerLimit',
                 key: 'LowerLimit',
                 width: '10%',
                 align: 'center',
                 render: (text, record) => {
                     return text;
                 }
             },
             {
                 title: '监测状态',
                 dataIndex: 'IsUse',
                 key: 'IsUse',
                 width: '10%',
                 align: 'center',
                 render: (text, record) => {
                     if (text === '0') {
                         return <span > <Tag color="red" > <a title="单击设置为监测中" onClick={
                             () => this.IsEnabled(1, record)
                         } ><Icon type="play-circle" />  未监测 </a></Tag > </span>;
                     }
                     return <span > <Tag color="blue" > <a title="单击从监测中移除"
                         onClick={
                             () => this.IsEnabled(0, record)
                         } ><Icon type="play-circle" spin={true} /> 监测中 </a></Tag > </span>;
                 }
             },
             {
                 title: '操作',
                 width: '10%',
                 align: 'center',
                 render: (text, record) => {
                     if (record.IsUse === '1') {
                         return <a onClick={
                             () => this.setState({
                                 Fvisible: true,
                                 title: '编辑污染物',
                                 width: '50%',
                                 PollutantCode: record.PollutantCode
                             })
                         } > 编辑 </a>;
                     }
                     return <a style={{color: 'gray'}} > 编辑 </a>;
                 }
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
                 <div className={styles.Pagination}>
                     <Pagination
                         defaultCurrent={1}
                         pageSize={4}
                         total={this.props.total}
                         current={this.props.pageIndex}
                         onChange={this.onChange}
                     />
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
                             pagination={true}
                         />
                     </div>
                 </Card>
                 <Modal
                     visible={this.state.Fvisible}
                     title={this.state.title}
                     width={this.state.width}
                     footer={false}
                     destroyOnClose={true}// 清除上次数据
                     onCancel={
                         () => {
                             this.setState({
                                 Fvisible: false
                             });
                         }
                     } >
                     {
                         <EditPollutant pid={this.state.PollutantCode} DGIMN={this.state.DGIMN} onRef={this.onRef1} oncancel={this.oncancel} />
                     }
                 </Modal>
                 <Modal
                     visible={this.state.Pvisible}
                     title={this.state.title}
                     width={this.state.width}
                     footer={false}
                     destroyOnClose={true}// 清除上次数据
                     onCancel={
                         () => {
                             this.setState({
                                 Pvisible: false
                             });
                         }
                     } >
                     {
                         <PollutantView StandardLibraryID={this.state.StandardLibraryID} />
                     }
                 </Modal>
             </div>
         );
     }
}
