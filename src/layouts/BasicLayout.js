import React, { Suspense } from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import Media from 'react-media';
import { formatMessage } from 'umi/locale';
import { Redirect } from 'dva/router';
import logo from '../../public/sdlicon.png';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import PageLoading from '@/components/PageLoading';
import SiderMenu from '@/components/SiderMenu';
import { getUser, ggid } from '../utils/authority';
import Cookie from 'js-cookie';


import styles from './BasicLayout.less';

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

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
        maxWidth: 1599,
    },
    'screen-xxl': {
        minWidth: 1600,
    },
};


class BasicLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getPageTitle = memoizeOne(this.getPageTitle);
        this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
    }

    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/fetchNotices',
        });
    }

    componentDidMount() {
        const {
            dispatch,
        } = this.props;

        dispatch({
            type: 'setting/getSetting',
        });
        dispatch({
            type: 'user/fetchCurrent',
        });
    }

    componentDidUpdate(preProps) {
        // After changing to phone mode,
        // if collapsed is true, you need to click twice to display
        const { collapsed, isMobile } = this.props;
        if (isMobile && !preProps.isMobile && !collapsed) {
            this.handleMenuCollapse(false);
        }
    }

    getContext() {
        const { location, breadcrumbNameMap } = this.props;
        return {
            location,
            breadcrumbNameMap,
        };
    }

    matchParamsPath = (pathname, breadcrumbNameMap) => {
        const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
        return breadcrumbNameMap[pathKey];
    };


    getPageTitle = (pathname, breadcrumbNameMap) => {
        const currRouterData = this.matchParamsPath(pathname, breadcrumbNameMap);

        if (!currRouterData) {
            return '污染源监控平台';
        }
        const pageName = formatMessage({
            id: currRouterData.locale || currRouterData.name,
            defaultMessage: currRouterData.name,
        });

        return `${pageName} - 污染源监控平台`;
    };

    getLayoutStyle = () => {
        const { fixSiderbar, isMobile, collapsed, layout } = this.props;
        if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
            return {
                paddingLeft: collapsed ? '80px' : '256px',
            };
        }
        return null;
    };

    handleMenuCollapse = collapsed => {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    };

    renderSettingDrawer = () => {
        // Do not render SettingDrawer in production
        // unless it is deployed in preview.pro.ant.design as demo
        if (process.env.NODE_ENV === 'production' && APP_TYPE !== 'site') {
            return null;
        }
        //   return <SettingDrawer />;
        return null;
    };
    renderContent = () => {

        if (getUser()) {
            const usertoken = Cookie.get('token');
            const user = JSON.parse(usertoken);
            if (user.User_Remark === ggid) {
                return (
                    <div>
                        {/* <Redirect to='/homepage' /> */}
                        {
                            this.props.children
                        }
                    </div>
                );
            }
            else {
                return (
                    <div>
                        {/* <Redirect to='/workbench' /> */}
                        {
                            this.props.children
                        }
                    </div>
                );
            }

        } else {
            return (<Redirect to="/user/login" />);
        }
    }
    render() {
        const {
            navTheme,
            layout: PropsLayout,
            children,
            location: { pathname },
            isMobile,
            breadcrumbNameMap,
            route: { routes },
            fixedHeader,
        } = this.props;

        const isTop = PropsLayout === 'topmenu';
        const contentStyle = (!fixedHeader || this.props.location.pathname === "/homepage") ? { paddingTop: 0 } : {};
        const layout = (
            <Layout>
                {isTop && !isMobile ? null : (
                    <SiderMenu
                        logo={logo}
                        theme={navTheme}
                        onCollapse={this.handleMenuCollapse}
                        isMobile={isMobile}
                        {...this.props}
                    />
                )}
                <Layout
                    style={{
                        ...this.getLayoutStyle(),
                        minHeight: '100vh',
                    }}
                >
                    {
                        this.props.location.pathname !== "/homepage" && <Header
                            handleMenuCollapse={this.handleMenuCollapse}
                            logo={logo}
                            isMobile={isMobile}
                            {...this.props}
                        />
                    }
                    <Content className={styles.content} style={contentStyle}>
                        {
                            this.renderContent()
                        }
                    </Content>

                </Layout>
            </Layout>
        );
        return (
            <React.Fragment>
                <DocumentTitle title={this.getPageTitle(pathname, breadcrumbNameMap)}>
                    <ContainerQuery query={query}>
                        {params => (
                            <Context.Provider value={this.getContext()}>
                                <div className={classNames(params)}>{layout}</div>
                            </Context.Provider>
                        )}
                    </ContainerQuery>
                </DocumentTitle>
                <Suspense fallback={<PageLoading />}>{this.renderSettingDrawer()}</Suspense>
            </React.Fragment>
        );
    }
}

export default connect(({ global, setting, menu }) => ({
    collapsed: global.collapsed,
    layout: setting.layout,
    breadcrumbNameMap: menu.breadcrumbNameMap,
    url: global.url,
    ...setting,
}))(props => (
    <Media query="(max-width: 599px)">
        {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
    </Media>
));
