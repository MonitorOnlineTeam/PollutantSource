// import liraries
import React, { Component } from 'react';
import { connect } from 'dva';
import { Breadcrumb, Tabs } from 'antd';
import { Link, routerRedux, Switch, Redirect } from 'dva/router';
import { getRoutes } from '../../utils/utils';
import styles from './index.less';
import AuthorizedRoute from '../../components/AuthorizedRoute';
import { getPointEnterprise } from '../../mockdata/Base/commonbase';
const { TabPane } = Tabs;
@connect()
class PointDetail extends Component {
    constructor(props) {
        super(props);
        this.menus = props.menuData;

        this.state = {
            tablist: [
                { key: 'processflowdiagram', tab: '工艺流程图' },
                { key: 'dataquery', tab: '数据查询' },
                { key: 'alarmrecord', tab: '报警记录' },
                { key: 'monitorvideo', tab: '监控视频' },
                { key: 'warningrecord', tab: '预警记录' },
                { key: 'emergencymaintenancerecord', tab: '应急维护记录' },
                { key: 'operationplanrecord', tab: '运维计划记录' },
                { key: 'inspectiontaskrecord', tab: '例行任务记录' },
                { key: 'replacementpartrecord', tab: '备品备件使用记录' },
                { key: 'stopmanagement', tab: '停产管理' },
                { key: 'stationthree', tab: '站房全景' },
            ],
        };
    }
    render() {
        const { match, routerData, location } = this.props;
        const routes = getRoutes(match.path, routerData);
        const defaultroute = routes[0].path;

        const pointInfo = getPointEnterprise().find((item) => {
            return item.DGIMN === match.params.pointcode;
        });
        return (
            <div
                style={{ width: '100%',
                    height: 'calc(100vh - 67px)' }}
            >
                <div className={styles.pageHeader}>
                    <Breadcrumb className={styles.breadcrumb} >
                        <Breadcrumb.Item key="home">
                            <Link to="/monitor/overview">监控总览</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item key="home">
                            {
                                pointInfo.Abbreviation + '-' + pointInfo.PointName
                            }
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ backgroundColor: '#fff', margin: 10, padding: 10 }}>
                    <Tabs
                        className={styles.tabs}
                        activeKey={location.pathname.replace(`${match.url}/`, '')}
                        onChange={(key) => {
                            const { dispatch, match } = this.props;
                            dispatch(routerRedux.push(`${match.url}/${key}`));
                        }}
                    >
                        {this.state.tablist.map(item => <TabPane pointInfo={pointInfo} tab={item.tab} key={item.key} />)}
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
            </div>
        );
    }
}
// make this component available to the app
export default PointDetail;
