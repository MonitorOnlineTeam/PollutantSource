import React, { Component } from 'react';
import {
    Button,
    Icon,
    Row,
    Col,
} from 'antd';
import {
    connect
} from 'dva';
@connect(({
    loading,
    stopmanagement
}) => ({
    ...loading,
    fileslist: stopmanagement.fileslist,
    requstresult: stopmanagement.requstresult,
}))
export default class files extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
   renderStandardList=() => {
       const rtnVal = [];
       const that = this;
       this.props.fileslist.map(function(item) {
           rtnVal.push(<Col span={4} align="center">
               <Button type="primary" size="large" style={{width: 100, height: 100}}>
                   <Icon type={item.FileType} style={{fontSize: 60}} />
               </Button>
               <br />
               <a href={item.url} title={'点击下载文件-' + item.FileName}>{item.SubFileName}</a>
           </Col>);
       });
       return rtnVal;
   }
   render() {
       return (
           <div>
               {this.renderStandardList()}
           </div>
       );
   }
}
