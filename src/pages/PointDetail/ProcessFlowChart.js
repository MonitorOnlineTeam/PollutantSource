import React, { Component } from 'react';
import { Layout,Card,Col,Badge, Button  } from 'antd';
import GyPic from '../../components/PointDetail/ProcessFlowChart';
// import styles from './index.less';
import styles from './ProcessFlowChart.less';
import { connect } from 'dva';
const { Header, Footer, Sider, Content } = Layout;

@connect(({ points, loading }) => ({
    isloading: loading.effects['points/queryrealparam'],
    pointInfo: points.selectpoint,
    operationInfo: points.operationInfo,
    stateInfo: points.stateInfo,
    paramsInfo: points.paramsInfo,
    dataInfo: points.dataInfo,
    paramstatusInfo: points.paramstatusInfo,
    stateNameInfo: points.stateNameInfo,
    paramNameInfo: points.paramNameInfo,
    paramdivInfo:points.paramdivInfo
}))
export default class ProcessFlowChart extends Component {
    componentWillMount() {
        this.state={
            paramInfo:[],
            collapsed:true,
            contentstyle:styles.content
        }
        this.props.dispatch({
            type: 'points/updateState',
            payload: { DGIMN: this.props.DGIMN }
        });
        this.props.dispatch({
            type: 'points/queryrealparam',
            payload: {
                dgimn:   this.props.DGIMN
            }
        });
    }
    
    //参数表盘
    getparamInfo=()=>{
        const {paramsInfo}=this.props;
        let res=[];
        
        if(paramsInfo)
        {
            paramsInfo.map((item,key)=>{
            
                if(item.value)
                {
                    if(item.dataparam)
                    {
                         //有异常或者超标数据
                        const bsparam=item.dataparam.split('-');
                        if(bsparam==0)
                        {
                            res.push( 
                                <Col span={3} xl={3}>
                                 <div onClick={()=>this.paramClick(item,2)} style={{background:'url(/instrumentover.png) no-repeat'}} className={styles.divcard}>
                                     <div>
                                       <span>{item.pollutantName}</span> 
                                        <p>{item.value}</p>   
                                     </div>
                                    </div>
                                    </Col>)
                        }
                        else
                        {
                            res.push( 
                                <Col span={3} xl={3}>
                                 <div onClick={()=>this.paramClick(item,3)}  style={{background:'url(/instrumentexception.png) no-repeat'}} className={styles.divcard}>
                                     <div>
                                       <span>{item.pollutantName}</span> 
                                        <p>{item.value}</p>   
                                     </div>
                                    </div>
                                    </Col>)
                        }
                    }
                    else
                    {
                        //正常渲染
                        res.push( 
                            <Col span={3} xl={3}>
                             <div onClick={()=>this.paramClick(item,1)}  style={{background:'url(/instrumentnormal.png) no-repeat'}} className={styles.divcard}>
                                 <div>
                                   <span>{item.pollutantName}</span> 
                                    <p>{item.value}</p>   
                                 </div>
                                </div>
                                </Col>)
                    }
                }
                else
                {
                    //离线
                    res.push( 
                        <Col span={3} xl={3}>
                         <div onClick={()=>this.paramClick(item,0)}  style={{background:'url(/instrumentunline.png) no-repeat'}} className={styles.divcard}>
                             <div>
                               <span>{item.pollutantName}</span> 
                                <p>-</p>   
                             </div>
                            </div>
                        </Col>
                    )
                }
               
            })
           return res;
        }
       return null;
    }

    //点击事件
    paramClick=(item,status)=>{
        let res=[];
        let statusstyle=styles.unlinestatus;
        if(status===1)
        {
            statusstyle=styles.normalstatus;
        }
        else if(status===2)
        {
            statusstyle=styles.overstatus;
        }
        else if(status===3)
        {
            statusstyle=styles.exceptionstatus;
        }
        if(item && item.pollutantParamInfo )
        {
           res.push(<div className={styles.detailtitle}>{item.pollutantName}分析仪</div>)
           item.pollutantParamInfo.map(info=>{
              res.push(<div className={statusstyle}>
                      <Badge status="processing"  text={`${info.statename}:${info.value}`} />
              </div>)
           })
        }
        this.setState({
            paramInfo:res,
            collapsed:false,
            contentstyle:styles.content
        })
    }
    onCollapse=(collapsed, type)=>{
        let contentstyle=styles.content;
        if(collapsed)
        {
            contentstyle=styles.contentcollapse;
        }
         this.setState({
            collapsed:collapsed,
            contentstyle:contentstyle
         })
    }

 
    render() {
        const { match } = this.props;
        const pointcode = match.params.pointcode; // 任务ID
        return (
            <div style={{overflowX:'hidden'}}>
                <Layout>
                <Content className={this.state.contentstyle}>
                   <Layout  hasSider={true}>
                   <Content><GyPic DGIMN={pointcode} /></Content>
                        <Sider  collapsedWidth={10}    theme="light"  
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                        collapsible={true} 
                        reverseArrow={true}>
                        <div className={styles.rightParams}>
                           {this.state.paramInfo}
                        </div>
                    </Sider>
                 </Layout>
                 </Content>
                 <Footer className={styles.footer}>
                 {/* <div className={styles.infotitle}>分析仪器</div> */}
                 {this.getparamInfo()}
                </Footer>
                </Layout>
            </div>
         
        );
    }
}
