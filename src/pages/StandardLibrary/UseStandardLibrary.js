import React, { Component } from 'react';
import {
    Card, Icon, Divider, Table, message, Tag, Modal, Pagination, Badge,Button,Row, Col 
} from 'antd';
import {
    connect
} from 'dva';
import PageHeader from '../../components/PageHeader';
import EditPollutant from '../StandardLibrary/EditPollutant';
import PollutantView from '../StandardLibrary/PollutantView';
import styles from './index.less';
import MonitorContent from '../../components/MonitorContent/index';
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
                     <Divider dashed />
                     <div className={styles.child}>{that.renderPollutantItem(item.child)}</div>
                     <div className={styles.foot}>
                         <div className={styles.use}>
                             <div style={{position: 'relative'}}>
                             <Row  justify="center" type="flex">
                             <Col span={9} >

                                 <a className={styles.a} onClick={() => {
                                     that.setState({
                                         StandardLibraryID: item.key,
                                         Pvisible: true,
                                         title: item.Name + '中的污染物',
                                       
                                     });
                                 }}>
                              
                                     <Icon type="search"/> 查看更多</a>
                                     </Col>
                                     <Col span={3} >  <Divider type="vertical" />
                                     </Col>
                                     <Col span={9} > 
                           
                            
                                 <a className={styles.a} onClick={() => {
                                     that.UseALL(item.key);
                                 }}> <Icon type="appstore"  /> 应用全部</a>
                                 </Col>
                                 </Row>
                             </div>
                         </div>
                     </div>
                 </div>);
         });
         return rtnVal;
     }
     renderPollutantItem=(pollutantList) => {
         const rtnVal = [];
         pollutantList.map((item) => {
             rtnVal.push(<div className={styles.pollutant}> 
                {
                   <Col span={12} ><span  className={styles.pollutantName} >{item.PollutantName}:</span></Col>
             }   <Col span={12} ><span  className={styles.UpperLimit}>{item.UpperLimit}-{item.LowerLimit}</span></Col> </div>);
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
                         return <Badge status="error" text="上线报警" />;
                     }
                     return <Badge status="default" text="下限报警" />;
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
                         return <span > <Button type="dashed" > <a title="单击设置为监测中" style={{color: '#D1D1D1'}} onClick={
                             () => this.IsEnabled(1, record)
                         } ><Icon type="exclamation-circle" />  未监测 </a></Button > </span>;
                     }
                     return <span > <Button color="blue" > <a title="单击从监测中移除"
                         onClick={
                             () => this.IsEnabled(0, record)
                         } ><Icon type="setting"  spin={true} /> 监测中 </a></Button > </span>;
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
                     return <a style={{color: '#D1D1D1'}} > 编辑 </a>;
                 }
             },
         ];
         return (
  <MonitorContent {...this.props} breadCrumbList={
                [
                    {Name:'首页',Url:'/'},
                    {Name:'系统管理',Url:''},
                    {Name:'排口列表',Url:'/sysmanage/pointinfo'},
                    {Name:'设置标准',Url:''}
                ]
            }  className={styles.antCss}>
             <Card bordered={false} title={this.props.match.params.PointName} style={{width:'100%'}}>
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
                 <Card className={styles.antCss}>
                     <div className={styles.table}>
                         <Table
                             bordered={false}
                             loading={this.props.effects['standardlibrary/getpollutantbydgimn']}
                             columns={columns}
                             size="small"
                             dataSource={this.props.requstresult === '1' ? this.props.PollutantListByDGIMN : null}
                             pagination={true}
                             rowClassName={
                               (record,index,indent)=>{

                                if(index===0){
                                    return;
                                }
                                if(index%2!==0)
                                {
                                    return'light';
                                }
                               }
                             }
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
             </Card>
                
                 </MonitorContent>
         );
     }
}
