// import liraries
import React, { Component } from 'react';
import { connect } from 'dva';
import { Breadcrumb, Tabs, Icon, Select, Button } from 'antd';
import { Link, Switch, Redirect } from 'dva/router';
import { getRoutes } from '../../utils/utils';
import styles from './index.less';
import Cookie from 'js-cookie';
const { TabPane } = Tabs;
const Option = Select.Option;
import router from 'umi/router';

@connect(({points, loading}) => ({
    pointInfo: points.selectpoint,
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
            ]
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
                        <span style={{cursor:'pointer'}}>{pointInfo.pointName} <Icon type="down" style={{marginLeft:10,width:15}} /></span>
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
            </div>
        );
    }
}
// make this component available to the app
export default PointDetail;
