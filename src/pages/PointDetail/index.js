// import liraries
import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal,Breadcrumb, Tabs, Icon, Select, Button,Card,Avatar,Row,Col,Badge,Tag,Input,Form } from 'antd';
import { Link, Switch, Redirect } from 'dva/router';
import { getRoutes } from '../../utils/utils';
import styles from './index.less';
import Cookie from 'js-cookie';
const { TabPane } = Tabs;
const Option = Select.Option;
const Search = Input.Search;
const { Meta } = Card;
import router from 'umi/router';

@connect(({points, loading}) => ({
    pointInfo: points.selectpoint,
    loadingModel: loading.effects['overview/querydatalist'],
    isloading: loading.effects['points/querysinglepointinfo']
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
            loadingCard:true
        };
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'points/querysinglepointinfo',
            payload: {
                dgimn: this.props.match.params.pointcode
            }
        });
    }
    openModal = (params) => {
        debugger;
        this.setState({
            modalVisible: true,
            loadingCard:false
            // pointName: params.PointName
        });
        // this.updateState({
        //     queryDGIMNs: params.DGIMNs,
        //     // queryDate: this.props.clickDate,
        //     pointDaysTableData: []

        // });
        // this.getPointDaysTableData(1);
    }
    handleModalOk = (e) => {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    }

    handleModalCancel = (e) => {
    // console.log(e);
        this.setState({
            modalVisible: false,
        });
    }
    render() {
        const { match, routerData, location,children } = this.props;
        Cookie.set('seldgimn', match.params.pointcode);
        const pointInfo = this.props.pointInfo;
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
                    {/* <div className={styles.pageHeader}>
                        <Breadcrumb className={styles.breadcrumb} >
                            <Breadcrumb.Item key="home">
                                <Link to="/overview/mapview">监控总览</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item key="home">
                                {
                                    pointInfo ? pointInfo.pointName : ''
                                }
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div> */}
                    <div className={styles.pageHeader} style={{}}>
                        <img src='../../../point.png'  style={{width:37,marginTop:-1}}/>
                        <span style={{color:'#ccc',marginLeft:10}}>当前排口：</span>
                        <span style={{cursor:'pointer'}} onClick={this.openModal}>{pointInfo.pointName} <Icon type="down" style={{marginLeft:10,width:15}} /></span>
                        {/* <Select defaultValue={pointInfo.pointName} style={{ width: 200 }}>
                            <Option value={pointInfo.pointcode}>{pointInfo.pointName}</Option>
                        </Select> */}
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
                    title={'当前排口: '+pointInfo.pointName}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                    width='1200px'
                    footer={[]}
                    >
                    <Form layout="inline" style={{marginBottom: 10}}>
                            <Row gutter={8}>
                                <Col span={3} >
                                    <Search
                                        placeholder="请输入排口关键字"
                                        onSearch={(value) => {
                                            this.setState({
                                                UserAccount: value
                                            });
                                            this.props.dispatch({
                                                type: 'userinfo/fetchuserlist',
                                                payload: {
                                                    pageIndex: 1,
                                                    pageSize: 10,
                                                    UserAccount: value,
                                                },
                                            });
                                        }}
                                        style={{ width: 200 }}
                                    /></Col>
                            </Row>
                        </Form>
                    <div style={{ background: '#ECECEC', padding: '30px',minHeight:'400px' }} className={styles.pointModal}>
                        <Row gutter={48}>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Card  bordered={false} loading={this.state.loadingCard}>
                                    <div className={styles.cardContent}>
                                        <p><Badge style={{ backgroundColor: 'rgb(255,198,0)' }} dot={true}/><span className={styles.pointName}>焦炉小号烟囱7</span></p>
                                        <p className={styles.TEF}>传输有效率<span>61%</span></p>
                                        <p className={styles.TEF}>类型：<span>废弃</span></p>
                                    </div>
                                    <div style={{position:"absolute",top:5,right:-25}}>
                                        <Tag color="#2db7f5">故障</Tag>
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Card  bordered={false}>
                                    <div className={styles.cardContent}>
                                        <p><Badge dot={true}/><span className={styles.pointName}>焦炉小号烟囱7</span></p>
                                        <p className={styles.TEF}>传输有效率<span>61%</span></p>
                                        <p className={styles.TEF}>类型：<span>废弃</span></p>
                                    </div>
                                    <div style={{position:"absolute",top:5,right:-25}}>
                                        <Tag color="#2db7f5">故障</Tag>
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Card  bordered={false}>
                                    <div className={styles.cardContent}>
                                        <p><Badge dot={true}/><span className={styles.pointName}>焦炉小号烟囱7</span></p>
                                        <p className={styles.TEF}>传输有效率<span>61%</span></p>
                                        <p className={styles.TEF}>类型：<span>废弃</span></p>
                                    </div>
                                    <div style={{position:"absolute",top:5,right:-25}}>
                                        <Tag color="#2db7f5">故障</Tag>
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Card  bordered={false}>
                                    <div className={styles.cardContent}>
                                        <p><Badge dot={true}/><span className={styles.pointName}>焦炉小号烟囱7</span></p>
                                        <p className={styles.TEF}>传输有效率<span>61%</span></p>
                                        <p className={styles.TEF}>类型：<span>废弃</span></p>
                                    </div>
                                    <div style={{position:"absolute",top:5,right:-25}}>
                                        <Tag color="#2db7f5">故障</Tag>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        );
    }
}
// make this component available to the app
export default PointDetail;
