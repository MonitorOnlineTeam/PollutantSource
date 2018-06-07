// import liraries
import React, { Component } from 'react';
import { connect } from 'dva';
import { Breadcrumb, Tabs } from 'antd';
import { Link, routerRedux, Switch, Redirect } from 'dva/router';
import { getRoutes } from '../../utils/utils';
import styles from './index.less';
import AuthorizedRoute from '../../components/AuthorizedRoute';

const { TabPane } = Tabs;
@connect()
class PointDetail extends Component {
  constructor(props) {
    super(props);
    this.menus = props.menuData;
    this.state = {
      pointname: ['测试点位1', '测试点位2'],
      tablist: [
        { key: 'module1', tab: '模块1' },
        { key: 'module2', tab: '模块2' },
        { key: 'module3', tab: '模块3' },
        { key: 'module4', tab: '模块4' },
        { key: 'module5', tab: '模块5' },
      ],
    };
  }
  render() {
    const { match, routerData, location } = this.props;
    const routes = getRoutes(match.path, routerData);
    const defaultroute = routes[0].path;

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
                this.state.pointname[match.params.pointcode]
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
            {this.state.tablist.map(item => <TabPane tab={item.tab} key={item.key} />)}
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
