
import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import MonitorHeader from '../components/MonitorHeader';
import GlobalFooter from '../components/GlobalFooter';
import NotFound from '../routes/Exception/404';
import config from '../config';
import { getRoutes, isUrl } from '../utils/utils';
// import { getMenuData } from '../common/menu';
import AuthorizedRoute from '../components/AuthorizedRoute';
/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
    if (item && item.children) {
        const child = item.children.filter(route => route.isshow);
        // if (child[0] && child[0].path) {
        redirectData.push({ from: `/${item.path}`, to: `/${item.children[0].path}` });
        item
            .children
            .forEach((children) => {
                getRedirect(children);
            });
        // }
    }
};

// getMenuData().forEach(getRedirect);

const { Content } = Layout;

const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
    },
};

@connect(({loading, user}) => ({
    ...loading,
    currentMenu: user.currentMenu
}))
class MonitorLayout extends React.PureComponent {
    static childContextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object,
        routeData: PropTypes.array,
    }
    getChildContext() {
        const { location, routerData } = this.props;
        return {
            location,
            breadcrumbNameMap: routerData,
        };
    }
    componentDidMount() {
        // this.props.dispatch({
        //     type: 'user/fetchCurrent',
        // });
    }
    componentWillMount() {
        // this.props.dispatch({
        //     type: 'user/getCurrentMenu',
        //     payload: {menuId: '06cd7c3a-2d2e-4625-94db-35d95647153d', userId: 'eb85dbe8-49fd-4918-9ba1-34f7c337bd44'},
        // });
    }
    // formatter(data, parentPath = '') {
    //     if (data && data.length > 0) {
    //         return data.map((item) => {
    //             let { path } = item;
    //             if (!isUrl(path)) {
    //                 path = parentPath + item.path;
    //             }
    //             const result = {
    //                 ...item,
    //                 path,
    //             };
    //             if (item.children) {
    //                 result.children = this.formatter(item.children, `${parentPath}${item.path}/`);
    //             }
    //             return result;
    //         });
    //     }
    //     return [];
    // }
    getPageTitle() {
        const { routerData, location } = this.props;
        const { pathname } = location;
        let title = config.name;
        if (routerData[pathname] && routerData[pathname].name) {
            title = `${routerData[pathname].name} - ${config.name}`;
        }
        return title;
    }

    getBashRedirect = (menuData) => {
        // According to the url parameter to redirect
        // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
        const urlParams = new URL(window.location.href);

        const redirect = urlParams.searchParams.get('redirect');
        // Remove the parameters in the url
        if (redirect) {
            urlParams.searchParams.delete('redirect');
            window.history.replaceState(null, 'redirect', urlParams.href);
        } else {
            let rtnpath = this.findFirstRedirectMenu(menuData);
            debugger;
            if (rtnpath && rtnpath.indexOf('http') === 0) {
                return rtnpath;
            } else {
                // if (rtnpath === 'null') {
                //     rtnpath = 'monitor/overview';
                // }
                // if (redirect && redirect.pathname.indexOf('null') > 0) {
                //     window.history.replaceState(null, 'redirect', urlParams.origin + `/${rtnpath || ''}`.replace(/\/+/g, '/'));
                //     // return `/${rtnpath || ''}`.replace(/\/+/g, '/');
                // }
                console.log(`/${rtnpath || ''}`.replace(/\/+/g, '/'));
                return `/${rtnpath || ''}`.replace(/\/+/g, '/');
            }
        }
        return redirect;
    }
    findFirstRedirectMenu=(data) => {
        // debugger;
        const menus = data.filter(item => item.name);
        if (menus.length !== 0) {
            if (menus[0].children && menus[0].children.length !== 0) {
                const childmenus = menus[0].children.filter(item => item.name);
                if (childmenus.length !== 0) {
                    return this.findFirstRedirectMenu(menus[0].children);
                } else {
                    return menus[0].path;
                }
            } else {
                return menus[0].path;
            }
        } else {
            return 'null';
        }
        // const menus = data.filter(item => item.name && !item.hideInMenu);
        // if (menus.length !== 0) {
        //     if (menus[0].children && menus[0].children.length !== 0) {
        //         const childmenus = menus[0].children.filter(item => item.name && !item.hideInMenu);
        //         if (childmenus.length !== 0) {
        //             return this.findFirstRedirectMenu(menus[0].children);
        //         } else {
        //             return menus[0].path;
        //         }
        //     } else {
        //         return menus[0].path;
        //     }
        // } else {
        //     return 'null';
        // }
    }
    render() {
        const {
            currentUser, collapsed, fetchingNotices, notices, match, navData, location, dispatch, routerData, currentMenu
        } = this.props;
        // debugger;
        // currentMenu.forEach(getRedirect);
        let bashRedirect = currentMenu.length !== 0 ? this.getBashRedirect(currentMenu) : '';
        if (!bashRedirect) {
            bashRedirect = '/user/login';
        }
        // console.log(redirectData);
        // debugger;
        // console.log(this.props.currentMenu);
        const layout = (
            <Layout className="layout">
                <MonitorHeader
                    location={location}
                    navData={navData}
                    currentUser={currentUser}
                    menuData={currentMenu}
                    fetchingNotices={fetchingNotices}
                    notices={notices}
                    collapsed={collapsed}
                    dispatch={dispatch}
                />

                <Content style={{ margin: ' 5 5 0 0', height: '100%' }}>
                    <Switch>
                        {/* {
                            redirectData.map(item =>
                                <Redirect key={item.from} exact={true} from={item.from} to={item.to} />
                            )
                        } */}
                        {
                            getRoutes(match.path, routerData).map((item) => {
                                return (
                                    <AuthorizedRoute
                                        key={item.key}
                                        path={item.path}
                                        component={item.component}
                                        exact={item.exact}
                                    />
                                );
                            })
                        }
                        <Redirect exact={true} from="/" to={bashRedirect} />
                        <Route rendermonitor={NotFound} />
                    </Switch>

                </Content>
                {/* <GlobalFooter

            links={[]}
            copyright={
              <div>
              Copyright <Icon type="copyright" />{config.footerText}
              </div>
          }
          /> */}
            </Layout>
        );

        return (
            <DocumentTitle title={this.getPageTitle()}>
                <ContainerQuery query={query}>
                    {params => <div className={classNames(params)}>{layout}</div>}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}

export default connect(state => ({
    currentUser: state.user.currentUser,
    collapsed: state.global.collapsed,
    fetchingNotices: state.global.fetchingNotices,
    notices: state.global.notices,
}))(MonitorLayout);
