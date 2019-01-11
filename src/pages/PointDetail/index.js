// import liraries
import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Breadcrumb, Tabs, Icon, Select, Button, Card, Spin, Row, Col, Divider, Tag, Input, Form, Radio, Alert } from 'antd';
import { Link, Switch, Redirect, routerRedux } from 'dva/router';
import moment from 'moment';
import Cookie from 'js-cookie';
import router from 'umi/router';
import styles from './index.less';
import { getRoutes } from '../../utils/utils';
import UrgentDispatch from '../../components/OverView/UrgentDispatch';

const { TabPane } = Tabs;
const Option = Select.Option;
const Search = Input.Search;
const { Meta } = Card;

@connect(({ points, loading, overview }) => ({
    pointInfo: points.selectpoint,
    loadingModel: loading.effects['overview/querydatalist'],
    isloading: loading.effects['points/querysinglepointinfo'],
    pointList: overview.data,
    dataTemp: overview.dataTemp
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
                { key: 'qcontrollist', tab: '质控记录' },
                { key: 'operationlist', tab: '运维记录' },
            ],
            recordType: [
                'RepairHistoryRecods',
                'JzHistoryRecords'
            ],
            pdvisible: false,
            modalVisible: false,
            loadingCard: true,
            pointList: null,
            pointName: null,
            DGIMN: null,
            status: '',
            searchName: ''
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
            payload: {
                time: moment(new Date()).add(-1, 'hour').format('YYYY-MM-DD HH:00:00')
            }
        });
    }

    pdShow = () => {
        this.setState({
            pdvisible: true,
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
            this.props.dispatch(routerRedux.push(newUrl));
        }
        //TODO:如果地址不正确，需要跳转到错误页面吗？ 吴建伟

    }

    /**
     * 渲染选择排口弹出层内容
     */
    renderPointList = () => {
        const rtnVal = [];

        //rtnVal.push(this.props.dataTemp.filter(todo=>todo.DGIMN===this.props.pointInfo.DGIMN)[0]);
        //let selectedPoint=this.props.dataTemp.filter(todo=>todo.DGIMN===this.props.pointInfo.DGIMN)[0];

        // debugger;
        this.props.dataTemp.map((item, key) => {
            //debugger
            let status = <img src="/gisexception.png" width="15" />;
            if (item.status === 0) {
                status = <img src="/gisunline.png" width="15" />;
            } if (item.status === 1) {
                status = <img src="/gisnormal.png" width="15" />;
            } if (item.status === 2) {
                status = <img src="/gisover.png" width="15" />;
            }
            let optStatus=[];//TODO:排口运维状态不确定 故障：#119f9d
            if(item.scene) {
                optStatus.push(<li><Tag className={styles.operation} >运维中</Tag></li>);
            } 
             if(item.warning)
             {
                optStatus.push(<li><Tag className={styles.warning} >预警中</Tag></li>);
             }
             if(item.fault)
             {
                optStatus.push(<li><Tag className={styles.fault} >故障中</Tag></li>);
             }
             if(status===4)
             {
                optStatus.push(<li><Tag className={styles.stop} >停产中</Tag></li>);
             }

            if (key === 0) {
                item = this.props.dataTemp.filter(todo => todo.DGIMN === this.props.pointInfo.DGIMN)[0];
                if (!item) {
                    return false;
                }
            } else if (item.DGIMN === this.props.pointInfo.DGIMN)
                return false;

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
        //debugger

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
            // pointList: this.props.pointList,
            status: '',
            searchName: ''
        });
    }
    //催办
    urge = () => {
        this.props.dispatch({
            type: 'overview/queryurge',
            payload: {
                personId: this.props.pointInfo.operationUserID,
                DGIMN: this.props.pointInfo.DGIMN
            }
        });
    }
    //派单窗口关闭
    onCancel = () => {
        this.setState({
            pdvisible: false,
        });
    }


    //获取派单还是督办按钮
    getPDDBButton = () => {
        const { pointInfo } = this.props;
        if (pointInfo) {
            if (pointInfo.existTask) {
                return (<Button onClick={() => this.urge()} type="primary" ghost={true} style={{ float: "right", marginRight: 30, top: -5 }}><Icon type="bell" />督办</Button>)
            }
            else {
                return (<Button
                    onClick={() => {
                        this.setState({
                            pdvisible: true,
                        });
                    }} type="primary" ghost={true} style={{ float: "right", marginRight: 30, top: -5 }}><Icon type="bell" />派单</Button>)
            }
        }
    }

    /**
     * 渲染排口状态
     */
    renderPointStatus = () => {
        //console.log("pointInfo",this.props.pointInfo);


        let pointInfo = this.props.pointList.filter(todo => todo.DGIMN === this.props.pointInfo.DGIMN);
        if (pointInfo.length === 0)
            return null;
        let {status,pollutantType,DGIMN,existTask,scene,warning,fault} = pointInfo[0];
        //debugger;
        console.log('pointInfo', pointInfo);
        let statusText = <span><img src="/gisexception.png" width="11" style={{ marginBottom: 3, marginRight: 5 }} /><span>异常</span></span>;
        if (status === 0) {
            statusText = <span><img src="/gisunline.png" width="11" style={{ marginBottom: 3, marginRight: 5 }} /><span>离线</span></span>;
        } if (status === 1) {
            statusText = <span><img src="/gisnormal.png" width="11" style={{ marginBottom: 3, marginRight: 5 }} /><span>正常</span></span>;
        } if (status === 2) {
            statusText = <span><img src="/gisover.png" width="11" style={{ marginBottom: 3, marginRight: 5 }} /><span>超标</span></span>;
        }
        let pollutantTypeText = <span><Icon type="fire" style={{ color: 'rgb(238,162,15)', marginBottom: 3, marginRight: 5 }} /><span>废气</span></span>;
        if (pollutantType === "1") {
            pollutantTypeText = <span><Icon type="fire" style={{ color: 'rgb(238,162,15)', marginBottom: 3, marginRight: 5 }} /><span>废水</span></span>;
        }
        let existTaskText=[];
        if(scene) {
            existTaskText.push(<span><Divider type="vertical" /><span><Icon type="user" className={styles.operationcolor} style={{marginBottom:3,marginRight:5 }} /><span>运维中</span></span></span>);
        }
         if(warning)
         {
            existTaskText.push(<span><Divider type="vertical" /><Icon type="bell" className={styles.warningcolor} style={{ color: 'red',marginBottom:3,marginRight:5 }} /><span>预警</span></span>)
         }
         if(fault)
         {
            existTaskText.push(<span><Divider type="vertical" /><Icon type="tool" className={styles.faultcolor} style={{ color: 'rgb(212,197,123)',marginBottom:3,marginRight:5 }} /><span>故障</span></span>);
         }
         if(status===4)
         {
            existTaskText.push (<span><Divider type="vertical" /><Icon type="tool" className={styles.stopcolor} style={{ color: 'rgb(212,197,123)',marginBottom:3,marginRight:5 }} /><span>停产</span></span>);
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

    render() {
        const { match, routerData, location, children, pointInfo, selectpoint } = this.props;
        Cookie.set('seldgimn', match.params.pointcode);
        let activeKey = 'qcontrollist';
        if (location.pathname.indexOf('qcontrollist') === -1) {
            activeKey = location.pathname.replace(`${match.url}/`, '');
        }
        if (this.props.isloading) {
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


                <UrgentDispatch
                    onCancel={this.onCancel}
                    visible={this.state.pdvisible}
                    operationUserID={selectpoint ? selectpoint.operationUserID : null}
                    DGIMN={pointInfo ? pointInfo.DGIMN : null}
                    pointName={pointInfo ? pointInfo.pointName : null}
                    operationUserName={pointInfo ? pointInfo.operationUserName : null}
                    operationtel={pointInfo ? pointInfo.operationtel : null}
                    reloadData={() => this.Refresh()}
                />
                <div className={styles.pageHeader} style={{}}>
                    <span style={{ cursor: 'pointer' }} onClick={this.openModal}>{pointInfo.pointName}  <Icon type="down" /></span>
                    {
                        this.renderPointStatus()
                    }


                    <Button style={{ float: "right", marginRight: 30, top: -5 }}><Link to="/overview/mapview"><Icon type="left" />返回</Link></Button>
                    {
                        this.getPDDBButton()
                    }
                    {/* <Button type="primary" ghost={true} style={{float:"right",marginRight:30,top:-5}}><Icon type="bell" />派单</Button> */}
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
                <Modal
                    visible={this.state.modalVisible}
                    title={`当前排口: ${pointInfo.pointName}`}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                    width="1200px"
                    footer={[]}
                >
                    <Form layout="inline" style={{ marginBottom: 10 }}>
                        <Row gutter={8}>
                            <Col span={7}>
                                <Search
                                    placeholder="请输入排口关键字"
                                    defaultValue={this.state.searchName}
                                    onSearch={(value) => {
                                        if (value) {
                                            this.props.dispatch({
                                                type: 'overview/updateState',
                                                payload: {
                                                    dataTemp: this.props.pointList.filter(todo => todo.pointName.indexOf(value) > -1)
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
                                                pointList: this.props.pointList,
                                                status: '',
                                                searchName: value
                                            });
                                        }

                                    }}
                                    style={{ width: 200 }}
                                />
                                <Button type="primary" style={{ marginLeft: 10 }} onClick={this.showAllData}>显示全部</Button>
                            </Col>
                            <Col span={7} offset={10}>
                                <Radio.Group value={this.state.status} onChange={this.handleStatusChange}>
                                    <Radio.Button value="1"><img src="../../../gisnormal.png" width="15" /> 正常</Radio.Button>
                                    <Radio.Button value="2"><img src="../../../gisover.png" width="15" /> 超标</Radio.Button>
                                    <Radio.Button value="0"><img src="../../../gisunline.png" width="15" /> 离线</Radio.Button>
                                    <Radio.Button value="3"><img src="../../../gisexception.png" width="15" /> 异常</Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Row>
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
