// import liraries
import React, { Component } from 'react';
import { connect } from 'dva';
import { Breadcrumb, Tabs } from 'antd';
import { Link, routerRedux, Switch, Redirect } from 'dva/router';
import { getRoutes } from '../../utils/utils';
import styles from './index.less';
import AuthorizedRoute from '../../components/AuthorizedRoute';
import Cookie from 'js-cookie';
const { TabPane } = Tabs;

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
                { key: 'warningrecord', tab: '预警记录' },
                // { key: 'emergencymaintenancerecord', tab: '应急维护记录' },
                // { key: 'operationplanrecord', tab: '运维计划记录' },
                // { key: 'inspectiontaskrecord', tab: '例行任务记录' },
                // { key: 'replacementpartrecord', tab: '备品备件使用记录' },
                { key: 'stopmanagement', tab: '停产管理' },
                // { key: 'stationthree', tab: '站房全景' },
                { key: 'videolist', tab: '视频管理' },
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
        const { match, routerData, location } = this.props;
        const routes = getRoutes(match.path, routerData);

        const defaultroute = routes[0].path;
        Cookie.set('seldgimn', match.params.pointcode);
        const pointInfo = this.props.pointInfo;
        let activeKey = 'qcontrollist';
        // if (location.pathname.indexOf('JzHistoryRecords') === -1) {
        //     activeKey = location.pathname.replace(`${match.url}/`, '');
        // }

        if (location.pathname.indexOf('qcontrollist') === -1) {
            activeKey = location.pathname.replace(`${match.url}/`, '');
        } 
        // else {
        //     this.state.recordType.map((item) => {
        //         if (location.pathname.indexOf(item) === -1) {
        //             activeKey = location.pathname.replace(`${match.url}/`, '');
        //             return null;
        //         }
        //     });
        // }
        // console.log(activeKey);
        return (
            <div
                style={{ width: '100%',
                    height: 'calc(100vh - 67px)' }}
            >
                {!this.props.isloading ? <div>
                    <div className={styles.pageHeader}>
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
                    </div>
                    <div style={{ backgroundColor: '#fff', margin: 10, padding: 10 }}>
                        <Tabs
                            className={styles.tabs}
                            activeKey={activeKey}
                            onChange={(key) => {
                                const { dispatch, match } = this.props;
                                dispatch(routerRedux.push(`${match.url}/${key}`));
                            }}
                        >
                            {this.state.tablist.map(item => <TabPane dgimn={match.params.pointcode} pointInfo={pointInfo} tab={item.tab} key={item.key} />)}
                        </Tabs>
                        <Switch>
                            {
                                routes.map(item => (
                                    <AuthorizedRoute
                                        key={item.key}
                                        path={item.path}
                                        component={item.component}
                                        exact={item.exact}
                                    />
                                ))
                            }
                            {
                                <Redirect from={match.url} to={`${match.url}/${defaultroute.replace(`${match.path}/`, '')}`} />
                            }
                        </Switch>
                    </div>
                </div> : ''}
            </div>
        );
    }
}
// make this component available to the app
export default PointDetail;
