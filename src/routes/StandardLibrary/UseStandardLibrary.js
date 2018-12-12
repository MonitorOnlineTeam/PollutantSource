import React, { Component } from 'react';
import {
    List, Card, Icon,
} from 'antd';
import {
    connect
} from 'dva';
import PageHeader from '../../components/PageHeader';
import styles from './index.less';
@connect(({loading, standardlibrary}) => ({
    ...loading,
    list: standardlibrary.list,
    total: standardlibrary.total,
    pageSize: standardlibrary.pageSize,
    pageIndex: standardlibrary.pageIndex,
    requstresult: standardlibrary.requstresult,
}))
export default class UseStandardLibrary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PointName: this.props.match.params.StandardLibraryID,
        };
    }
    componentWillMount() {
        this.onChange();
    }
     onChange = (pageIndex, pageSize) => {
         this.props.dispatch({
             type: 'standardlibrary/getlist',
             payload: {
                 pageIndex: pageIndex,
                 pageSize: pageSize,
             },
         });
     }
     renderStandardList=() => {
         const rtnVal = [];
         const that = this;
         this.props.list.map(function(item) {
             if (item.child.length > 1) {
                 rtnVal.push(<div className={styles.item}><div className={styles.standardlibrary}>{item.Name}</div><div style={{height: 100}}>{that.renderPollutantItem(item.child)}</div></div>);
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
         return (
             <div >
                 <PageHeader title="设置标准"
                     breadcrumbList={
                         [{
                             title: '排口列表',
                             href: '/sysmanage/PointInfo',
                         }, {
                             title: 'ddd',
                         }]
                     }
                 />
                 <div className={styles.card}>
                     {
                         this.renderStandardList()
                     }
                 </div>
             </div>
         );
     }
}
