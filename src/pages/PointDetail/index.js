// import liraries
import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal,Breadcrumb, Tabs, Icon, Select, Button,Card,Avatar,Row,Col,Badge,Tag,Input,Form,Radio } from 'antd';
import { Link, Switch, Redirect,routerRedux } from 'dva/router';
import { getRoutes } from '../../utils/utils';
import moment from 'moment';
import styles from './index.less';
import Cookie from 'js-cookie';
const { TabPane } = Tabs;
const Option = Select.Option;
const Search = Input.Search;
const { Meta } = Card;
import router from 'umi/router';

@connect(({points, loading,overview}) => ({
    pointInfo: points.selectpoint,
    loadingModel: loading.effects['overview/querydatalist'],
    isloading: loading.effects['points/querysinglepointinfo'],
    pointList:overview.data
}))
class PointDetail extends Component {
    constructor(props) {
        super(props);
        this.menus = props.menuData;

        this.state = {
            tablist: [
                { key: 'processflowdiagram', tab: '工艺流程图' },
                { key: 'dataquery', tab: '数据查询' },
                { key: 'alarmrecord', tab: '报警记录' },
                { key: 'realvideo', tab: '实时视频' },
                { key: 'hisvideo', tab: '历史视频' },
                { key: 'ywdsjlist', tab: '运维大事记' },
                { key: 'qcontrollist', tab: '质控记录' }
            ],
            recordType: [
                'RepairHistoryRecods',
                'JzHistoryRecords'
            ],
            modalVisible:false,
            loadingCard:true,
            pointList:this.props.pointList,
            pointName:this.props.pointInfo.pointName,
            DGIMN:this.props.match.params.pointcode,
            status:'',
            searchName:''
        };
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'points/querysinglepointinfo',
            payload: {
                dgimn: this.props.match.params.pointcode
            }
        });
        this.props.dispatch({
            type: 'overview/querydatalist',
            selectpoint: {},
            payload: {
                time: moment(new Date()).add(-1, 'hour').format('YYYY-MM-DD HH:00:00')
            }
        });
    }
    openModal = (params) => {
        //console.log(this.props.pointList);
        console.log(this.props.pointInfo);
        this.setState({
            modalVisible: true,
            loadingCard:false,
            pointList:this.props.pointList,
            searchName:'',
            status:''
        });
    }
    handleModalOk = (e) => {
        this.setState({
            modalVisible: false,
        });
    }

    handleModalCancel = (e) => {
        this.setState({
            modalVisible: false,
        });
    }
    clickCard = (DGIMN,pointName) => {
        this.props.dispatch({
            type: 'points/querysinglepointinfo',
            payload: {
                dgimn:DGIMN
            }
        });
        this.setState({
            modalVisible: false,
            pointName:pointName
        });
        //重定向
        let locationArray=this.props.location.pathname.split('/');
        if(locationArray.length>1)
        {
            let newUrl=this.props.location.pathname.replace(locationArray[2],DGIMN);
            this.props.dispatch(routerRedux.push(newUrl));
        }
        //TODO:如果地址不正确，需要跳转到错误页面吗？ 吴建伟
    }
    /**
     * 渲染选择排口弹出层内容
     */
    renderPointList = () => {
        const rtnVal = [];
        
        this.state.pointList.map((item, key) =>{
            let status = <img src="../../../gisexception.png" />;
            if (item.status === 0) {
                status= <img src="../../../gisunline.png" />;
            } if (item.status === 1) {
                status=  <img src="../../../gisnormal.png" />;
            } if (item.status === 2) {
                status=  <img src="../../../gisover.png" />;
            }
            let optStatus='';//TODO:排口运维状态不确定 故障：#119f9d
            if(item.existTask===1)
            {
                optStatus=<Tag color="#ff995b">运维中</Tag>;
            }else
            {
                optStatus='';
            }
            rtnVal.push(<div key={item.DGIMN}>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Card style={{cursor:'pointer'}} onClick={(e)=>{
                        this.clickCard(item.DGIMN,item.pointName);
                    }}  bordered={false} loading={this.state.loadingCard}>
                        <div className={styles.cardContent}>
                            {/* <p><Badge style={{ backgroundColor: 'rgb(255,198,0)' }} dot={true}/><span className={styles.pointName}>{item.pointName}</span></p> */}
                            <p>{status}<span className={styles.pointName}>{item.pointName}</span></p>
                            <p className={styles.TEF}>传输有效率<span>{item.transmissionEffectiveRate||'-'}</span></p>
                            <p className={styles.TEF}>类型：<span>{item.pollutantType}</span></p>
                        </div>
                        <div style={{position:"absolute",top:5,right:-25}}>
                            {optStatus}
                        </div>
                    </Card>
                </Col>
            </div>)
        });
            
        return rtnVal;
    }
    /**
     * 排口状态过滤事件
     */
    handleStatusChange = (e) =>{
        //debugger
        this.setState({
            pointList: this.props.pointList.filter(todo=>todo.status===(+e.target.value)),
            status:e.target.value
        });
    }
     /**
     * 清空条件，显示所有数据
     */
    showAllData = () =>{
        this.setState({
            pointList: this.props.pointList,
            status:'',
            searchName:''
        });
    }
    render() {
        const { match, routerData, location,children,pointInfo } = this.props;
        Cookie.set('seldgimn', match.params.pointcode);
        let activeKey = 'qcontrollist';
        if (location.pathname.indexOf('qcontrollist') === -1) {
            activeKey = location.pathname.replace(`${match.url}/`, '');
        }
        return (
            <div
                style={{ width: '100%',
                    height: 'calc(100vh - 67px)' }}
            >
                {!this.props.isloading ? <div>
                    <div className={styles.pageHeader} style={{}}>
                        <img src='../../../point.png'  style={{width:37,marginTop:-1}}/>
                        <span style={{color:'#ccc',marginLeft:10}}>当前排口：</span>
                        <span style={{cursor:'pointer',color:'#1890FF'}} onClick={this.openModal}>{pointInfo.pointName}</span>
                        <Button style={{float:"right",marginRight:30}}><Link to="/overview/mapview"><Icon type="left" />返回</Link></Button>
                        <Button type="primary" ghost style={{float:"right",marginRight:30}}><Icon type="bell" />派单</Button>
                    </div>
                    <div style={{ backgroundColor: '#fff', margin: 10, padding: 10 }}>
                        <Tabs
                            className={styles.tabs}
                            activeKey={activeKey}
                            onChange={(key) => {
                                const { match } = this.props;
                                router.push(`${match.url}/${key}`);
                            }}
                        >
                            {this.state.tablist.map(item => <TabPane dgimn={match.params.pointcode} pointInfo={pointInfo} tab={item.tab} key={item.key} />)}
                        </Tabs>
                        {children}
                    </div>
                </div> : ''}
                    <Modal
                        visible={this.state.modalVisible}
                        title={'当前排口: '+this.state.pointName}
                        onOk={this.handleModalOk}
                        onCancel={this.handleModalCancel}
                        width='1200px'
                        footer={[]}
                        >
                        <Form layout="inline" style={{marginBottom: 10}}>
                                <Row gutter={8}>
                                    <Col span={7} >
                                        <Search
                                            placeholder="请输入排口关键字"
                                            defaultValue={this.state.searchName}
                                            onSearch={(value) => {
                                                if(value)
                                                {
                                                    this.setState({
                                                        pointList: this.props.pointList.filter(todo=>todo.pointName.indexOf(value)>-1),
                                                        status:'',
                                                        searchName:value
                                                    });
                                                }else
                                                {
                                                    this.setState({
                                                        pointList: this.props.pointList,
                                                        status:'',
                                                        searchName:value
                                                    });
                                                }
                                                
                                            }}
                                            style={{ width: 200 }}
                                        />
                                       <Button type="primary" style={{marginLeft:10}} onClick={this.showAllData}>全部</Button>
                                        </Col>
                                        <Col span={7} offset={10}>
                                            <Radio.Group value={this.state.status}  onChange={this.handleStatusChange}>
                                                <Radio.Button value="1"><img src="../../../gisnormal.png" /> 正常</Radio.Button>
                                                <Radio.Button value="2"><img src="../../../gisover.png" /> 超标</Radio.Button>
                                                <Radio.Button value="0"><img src="../../../gisunline.png" /> 离线</Radio.Button>
                                                <Radio.Button value="3"><img src="../../../gisexception.png" /> 异常</Radio.Button>
                                            </Radio.Group>
                                        </Col>
                                </Row>
                            </Form>
                        <div style={{height:'calc(100vh - 340px)'}} className={styles.pointModal}>
                            <Row gutter={48}>
                            {
                                this.renderPointList()
                            } 
                            </Row>
                        </div>
                    </Modal>
            </div>
        );
    }
}
// make this component available to the app
export default PointDetail;
