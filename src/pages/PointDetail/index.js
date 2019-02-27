// import liraries
import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Tabs, Icon, Button, Card, Spin, Row, Col, Divider, Tag, Input, Form, Radio, Alert } from 'antd';
import moment from 'moment';
import Cookie from 'js-cookie';
import router from 'umi/router';
import Redirect from 'umi/redirect';
import Link from 'umi/link';
import { routerRedux } from 'dva/router';
import styles from './index.less';
import PdButton from '../../components/OverView/PdButton';
import {getPointStatusImg} from '../../utils/getStatusImg';
const RadioGroup = Radio.Group;
const { TabPane } = Tabs;
const { Search } = Input.Search;


@connect(({ points, loading, overview }) => ({
    pointInfo: points.selectpoint,
    tablist:points.tablist||[],
    loadingModel: loading.effects['overview/querydatalist'],
    isloading: loading.effects['points/querysinglepointinfo'],
    pointList: overview.data,
    dataTemp: overview.dataTemp,
    pollutantTypelist:overview.pollutantTypelist
}))
class PointDetail extends Component {
    constructor(props) {
        super(props);
        this.menus = props.menuData;

        this.state = {
            modalVisible: false,
            loadingCard: true,
            pointList: null,
            pointName: null,
            DGIMN: null,
            status: '',
            searchName: '',
            pollutantTypeKey:0
        };
    }

    componentWillMount = () => {
        const {dispatch,match}=this.props;
        dispatch({
            type: 'points/updateVideoMenu',
            payload: {
                DGIMN: match.params.pointcode,
            }
        });
    }


    componentDidMount() {
        this.props.dispatch({
            type: 'points/querysinglepointinfo',
            payload: {
                dgimn: this.props.match.params.pointcode,
                time: moment(new Date()).add(-1, 'hour').format('YYYY-MM-DD HH:00:00'),
                isfirst:true
            }
        });
    }


    openModal = (params) => {
        // console.log(this.props.pointList);
        // console.log(this.props.pointList);
        this.setState({
            modalVisible: true,
            loadingCard: false,
            pointList: this.props.pointList,
            searchName: '',
            status: ''
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

    clickCard = (obj) => {
        this.props.dispatch({
            type: 'points/querysinglepointinfo',
            payload: {
                dgimn: obj.DGIMN
            }
        });
        this.setState({
            modalVisible: false,
            pointName: obj.pointName
        });

        let locationArray = this.props.location.pathname.split('/');
        if (locationArray.length > 1) {
            let newUrl = this.props.location.pathname.replace(locationArray[2], obj.DGIMN);
            router.push(newUrl);
        }
        //TODO:如果地址不正确，需要跳转到错误页面吗？ 吴建伟

    }

        //填充污染物类型
        getPollutantDoc=()=>{
            const {pollutantTypelist}=this.props;
            let res=[];
            if(pollutantTypelist) {

                res.push(<Radio key={0} value={0}>全部</Radio>);
                pollutantTypelist.map(item=>{
                    res.push(<Radio key={item.pollutantTypeCode} value={item.pollutantTypeCode}>{item.pollutantTypeName}</Radio>);
                });
            }
            return res;
        }


    /**
     * 渲染选择排口弹出层内容
     */
    renderPointList = () => {
        const rtnVal = [];
        //rtnVal.push(this.props.dataTemp.filter(todo=>todo.DGIMN===this.props.pointInfo.DGIMN)[0]);
        //let selectedPoint=this.props.dataTemp.filter(todo=>todo.DGIMN===this.props.pointInfo.DGIMN)[0];
        this.props.dataTemp.map((item, key) => {
            // let status = <img src="/gisexception.png" width="15" />;
            // if (item.status === 0) {
            //     status = <img src="/gisunline.png" width="15" />;
            // } if (item.status === 1) {
            //     status = <img src="/gisnormal.png" width="15" />;
            // } if (item.status === 2) {
            //     status = <img src="/gisover.png" width="15" />;
            // }
            let status=getPointStatusImg(item.status,item.stop);

            let optStatus=[];//TODO:排口运维状态不确定 故障：#119f9d

            if(item.stop) {
                optStatus.push(<li key={3}><Tag className={styles.stop}>停产中</Tag></li>);
            }
            else
            {
                if(item.scene) {
                    optStatus.push(<li key={0}><Tag className={styles.operation}>运维中</Tag></li>);
                }
                if(item.warning) {
                    optStatus.push(<li key={1}><Tag className={styles.warning}>预警中</Tag></li>);
                }
                if(item.fault) {
                    optStatus.push(<li key={2}><Tag className={styles.fault}>故障中</Tag></li>);
                }
            }
            // if (key === 0) {
            //     item = this.props.dataTemp.filter(todo => todo.DGIMN === this.props.pointInfo.DGIMN)[0];
            //     if (!item) {
            //         return false;
            //     }
            // } else if (item.DGIMN === this.props.pointInfo.DGIMN)
            //     return false;

            rtnVal.push(
                <div key={item.DGIMN}>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card
                            style={{ cursor: 'pointer', border: `${item.DGIMN === this.props.pointInfo.DGIMN ? '1px solid #81c2ff' : '1px solid #fff'}` }}
                            onClick={() => {

                                this.clickCard(item);
                            }}
                            bordered={false}
                            loading={this.state.loadingCard}
                        >
                            <div className={styles.cardContent}>
                                {/* <p><Badge style={{ backgroundColor: 'rgb(255,198,0)' }} dot={true}/><span className={styles.pointName}>{item.pointName}</span></p> */}
                                <p>{status}<span className={styles.pointName}>{item.pointName}</span></p>
                                <p className={styles.TEF}>传输有效率<span>{item.transmissionEffectiveRate || '-'}</span></p>
                                <p className={styles.TEF}>类型：<span>{item.pollutantType}</span></p>
                            </div>
                            <div className={styles.statusli} style={{position:"absolute",top:5,right:-25}}>
                                {optStatus}
                            </div>
                        </Card>
                    </Col>
                </div>);
        });

        return rtnVal.length > 0 ? rtnVal : (<Alert message="暂无数据" type="warning" />);
    }

    /**
     * 排口状态过滤事件
     */
    handleStatusChange = (e) => {
        this.props.dispatch({
            type: 'overview/updateState',
            payload: {
                dataTemp: this.props.pointList.filter(todo => todo.status === +e.target.value)
            },
        });

        this.setState({
            // pointList: this.props.pointList.filter(todo=>todo.status===+e.target.value),
            status: e.target.value
        });
    }

    /**
     * 清空条件，显示所有数据
     */
    showAllData = () => {
        this.props.dispatch({
            type: 'overview/updateState',
            payload: {
                dataTemp: this.props.pointList
            },
        });
        this.setState({
            status: '',
            searchName: '',
            pollutantTypeKey:0
        });
    }

    /**
     * 渲染排口状态
     */
    renderPointStatus = () => {


        let pointInfo = this.props.pointList.filter(todo => todo.DGIMN === this.props.pointInfo.DGIMN);
        if (pointInfo.length === 0)
            return null;
        let {status,pollutantTypeCode,DGIMN,existTask,scene,warning,fault,stop} = pointInfo[0];

        let statusText=getPointStatusImg(status,stop);
        // let statusText = <span><img src="/gisexception.png" width="11" style={{ marginBottom: 3, marginRight: 5 }} /><span>异常</span></span>;
        // if (status === 0) {
        //     statusText = <span><img src="/gisunline.png" width="11" style={{ marginBottom: 3, marginRight: 5 }} /><span>离线</span></span>;
        // } if (status === 1) {
        //     statusText = <span><img src="/gisnormal.png" width="11" style={{ marginBottom: 3, marginRight: 5 }} /><span>正常</span></span>;
        // } if (status === 2) {
        //     statusText = <span><img src="/gisover.png" width="11" style={{ marginBottom: 3, marginRight: 5 }} /><span>超标</span></span>;
        // }
        let pollutantTypeText = <span><Icon type="fire" style={{ color: 'rgb(238,162,15)', marginBottom: 3, marginRight: 5 }} /><span>废气</span></span>;
        if (pollutantTypeCode == 1) {
            pollutantTypeText = <span><Icon type="fire" style={{ color: 'rgb(238,162,15)', marginBottom: 3, marginRight: 5 }} /><span>废水</span></span>;
        }
        let existTaskText=[];

        if(stop) {
            existTaskText.push (<span key={3}><Divider type="vertical" /><Icon type="tool" className={styles.stopcolor} style={{ color: 'rgb(212,197,123)',marginBottom:3,marginRight:5 }} /><span>停产</span></span>);
        }
        else
        {
            if(scene) {
                existTaskText.push(<span key={0}><Divider type="vertical" /><span><Icon type="user" className={styles.operationcolor} style={{marginBottom:3,marginRight:5 }} /><span>运维中</span></span></span>);
            }
            if(warning) {
                existTaskText.push(<span key={1}><Divider type="vertical" /><Icon type="bell" className={styles.warningcolor} style={{ color: 'red',marginBottom:3,marginRight:5 }} /><span>预警</span></span>);
            }
            if(fault) {
                existTaskText.push(<span key={2}><Divider type="vertical" /><Icon type="tool" className={styles.faultcolor} style={{ color: 'rgb(212,197,123)',marginBottom:3,marginRight:5 }} /><span>故障</span></span>);
            }
        }
        return (
            <span style={{ marginLeft: 20, fontSize: 12 }}>
                {statusText}

                <Divider type="vertical" />
                {pollutantTypeText}

                {existTaskText}

            </span>);
    }

    //直接刷新（带数据）
    Refresh = () => {
        this.props.dispatch({
            type: 'points/querysinglepointinfo',
            payload: {
                dgimn: this.props.match.params.pointcode
            }
        });
    }

    onPollutantChange=(e)=>{
        const pollutantTypeKey= e.target.value;
        const {searchName}=this.state;
        this.setState({
            pollutantTypeKey
        });
        let polist=this.props.pointList;
        if(pollutantTypeKey!==0) {
            polist=polist.filter(i=>i.pollutantTypeCode==pollutantTypeKey);
        }
        if(searchName) {
            polist=polist.filter(i=>i.pointName.indexOf(searchName)>-1);
        }
        this.props.dispatch({
            type: 'overview/updateState',
            payload: {
                dataTemp: polist
            },
        });

    }

    getBackButton=()=>{debugger;
        const viewtype= this.props.match.params.viewtype;
        let backpath=`/overview/${viewtype}`;
        if(viewtype==="pointinfo"){
            backpath=`/sysmanage/${viewtype}`;
        }else if(viewtype==="equipmentoperatingrate"){
            backpath=`/qualitycontrol/${viewtype}`;
        }
        return(<Link to={backpath}><Icon type="left" />返回</Link>);
    }

    render() {
        let { match, location, children, pointInfo, tablist } = this.props;
        let {pollutantTypeKey}=this.state;
        const viewType=`pointInfo@${match.params.viewtype}`;
        //判断当前排口污染物类型那个
        let routerPath='';
        if(pointInfo && pointInfo.pollutantType) {
            if(pointInfo.pollutantType === 1) {
                routerPath=`/pointdetail/${match.params.pointcode}/${match.params.viewtype}/dataquery`;
                tablist= [
                    { key: 'dataquery', tab: '数据查询' },
                    { key: 'alarmrecord', tab: '报警记录' },
                ];
            }
        }
        Cookie.set('seldgimn', match.params.pointcode);

        let activeKey = '';
        if (location.pathname.indexOf('qcontrollist') === -1 && location.pathname.indexOf('operationlist') === -1) {
            activeKey = location.pathname.replace(`${match.url}/`, '');
        } else {
            let matchurl=null;
            if(location.pathname.indexOf('mapview')!==-1){
                matchurl=location.pathname.match(/mapview\/(\S*)\//);
            }else if(location.pathname.indexOf('datalistview')!==-1){
                matchurl=location.pathname.match(/datalistview\/(\S*)\//);
            }

            if(matchurl!==null){
                activeKey = matchurl[1];
            }


        }
        if (this.props.isloading || !pointInfo) {
            return (<Spin
                style={{
                    width: '100%',
                    height: 'calc(100vh/2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                size="large"
            />);
        }

        return (
            <div
                style={{
                    width: '100%',
                    height: 'calc(100vh - 67px)'
                }}
            >

                {
                    routerPath!==''?<Redirect to={routerPath} />:null
                }
                <div className={styles.pageHeader} style={{}}>
                    <span style={{ cursor: 'pointer' }} onClick={this.openModal}>{pointInfo.pointName}  <Icon type="down" /></span>
                    {
                        this.renderPointStatus()
                    }


                    <Button style={{ float: "right", marginRight: 30, top: -5 }}>{this.getBackButton()}</Button>

                    <PdButton
                        DGIMN={pointInfo.DGIMN}
                        id={pointInfo.operationUserID}
                        pname={pointInfo.pointName}
                        reloadData={() => this.Refresh()}
                        exist={pointInfo.existTask}
                        name={pointInfo.operationUserName}
                        tel={pointInfo.operationtel}
                        viewType={viewType}
                    />
                </div>
                <div style={{ backgroundColor: '#fff', margin: 10, padding: 10 }}>
                    <Tabs
                        className={styles.tabs}
                        activeKey={activeKey}
                        onChange={(key) => {
                            router.push(`${match.url}/${key}`);
                        }}
                    >
                        {tablist.map(item => <TabPane dgimn={match.params.pointcode} pointInfo={pointInfo} tab={item.tab} key={item.key} />)}
                    </Tabs>
                    {children}
                </div>
                <Modal
                    visible={this.state.modalVisible}
                    title={`当前排口: ${pointInfo.pointName}`}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                    width="1200px"
                    footer={[]}
                >
                    <Form layout="inline" style={{ marginBottom: 10 }}>
                        <Input.Search
                            placeholder="请输入排口关键字"
                            defaultValue={this.state.searchName}
                            onSearch={(value) => {
                                if (value) {

                                    let polist=this.props.pointList.filter(todo=>todo.pointName.indexOf(value)>-1);
                                    if(pollutantTypeKey!==0) {
                                        polist=polist.filter(todo=>todo.pollutantTypeCode==pollutantTypeKey);
                                    }
                                    this.props.dispatch({
                                        type: 'overview/updateState',
                                        payload: {
                                            dataTemp: polist
                                        },
                                    });
                                    this.setState({
                                        // pointList: this.props.pointList.filter(todo=>todo.pointName.indexOf(value)>-1),
                                        status: '',
                                        searchName: value
                                    });
                                } else {
                                    this.props.dispatch({
                                        type: 'overview/updateState',
                                        payload: {
                                            dataTemp: this.props.pointList
                                        },
                                    });
                                    this.setState({
                                        pollutantTypeKey:0,
                                        pointList: this.props.pointList,
                                        status: '',
                                        searchName: value
                                    });
                                }

                            }}
                            style={{ width: 200 }}
                        />
                        <Button type="primary" style={{ marginLeft: 10 }} onClick={this.showAllData}>显示全部</Button>
                        <Radio.Group style={{ marginRight: 20,float: 'right' }} value={this.state.status} onChange={this.handleStatusChange}>
                            <Radio.Button key={0} value="1"><img src="../../../gisnormal.png" width="15" /> 正常</Radio.Button>
                            <Radio.Button key={1} value="2"><img src="../../../gisover.png" width="15" /> 超标</Radio.Button>
                            <Radio.Button key={2} value="0"><img src="../../../gisunline.png" width="15" /> 离线</Radio.Button>
                            <Radio.Button key={3} value="3"><img src="../../../gisexception.png" width="15" /> 异常</Radio.Button>
                        </Radio.Group>
                        <Radio.Group style={{ marginRight: 20,float: 'right',marginTop:3}} onChange={this.onPollutantChange} defaultValue={pollutantTypeKey}>
                            {this.getPollutantDoc()}
                        </Radio.Group>
                    </Form>
                    <div style={{ height: 'calc(100vh - 340px)' }} className={styles.pointModal}>
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
