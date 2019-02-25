import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Icon, Modal } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '../../public/sdlicon.png';
import QRcode from "./QRcode";


class UserLayout extends React.PureComponent {

    // @TODO title
    // getPageTitle() {
    //   const { routerData, location } = this.props;
    //   const { pathname } = location;
    //   let title = 'Ant Design Pro';
    //   if (routerData[pathname] && routerData[pathname].name) {
    //     title = `${routerData[pathname].name} - Ant Design Pro`;
    //   }
    //   return title;
    // }
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    onCancel = () => {
        this.setState({
            visible: false
        });
    }

    onRef1 = (ref) => {
        this.child = ref;
    }

    show=()=>{
        this.setState({
            visible: true,
            width: 800,
        });
    }

    render() {
        const links = [
            {
                key: 'help',
                title: formatMessage({ id: 'layout.user.link.help' }),
                href: '',
            },
            {
                key: 'privacy',
                title: formatMessage({ id: 'layout.user.link.privacy' }),
                href: '',
            },
            {
                key: 'terms',
                title: formatMessage({ id: 'layout.user.link.terms' }),
                href: '',
            },
        ];

        const copyright = (
            <Fragment>
                Copyright <Icon type="copyright" /> 污染源智能分析平台  2019 SDL | <a
                    onClick={() => {
                        this.show();
                    }}
                >手机端下载
                                                                          </a>
            </Fragment>
        );
        const { children } = this.props;
        return (
        // @TODO <DocumentTitle title={this.getPageTitle()}>
            <div className={styles.container}>
                <div className={styles.lang}>
                    <SelectLang />
                </div>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="logo" className={styles.logo} src={logo} />
                                <span className={styles.title}>污染源智能分析平台</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>SDL 一流的污染源监控专家</div>
                    </div>
                    {children}
                </div>
                <GlobalFooter links={links} copyright={copyright} />
                <Modal
                    footer={null}
                    destroyOnClose="true"
                    visible={this.state.visible}
                    title="二维码"
                    width={this.state.width}
                    onCancel={this.onCancel}
                >
                    {
                        <QRcode onCancels={this.onCancel} onRef={this.onRef1} />
                    }
                </Modal>
            </div>
        );
    }
}

export default UserLayout;
