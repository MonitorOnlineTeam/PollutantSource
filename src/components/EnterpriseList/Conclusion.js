import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import styles from '../../components/EnterpriseList/Conclusion.less';

const { Content, Footer } = Layout;

export default class Conclusion extends Component {
    render() {
        const conclusion = this.props.content;
        const height = conclusion.length * 23;

        return (
            <div>
                <Layout className="layout" style={{backgroundColor: '#fff'}}>
                    <Content>
                        <div>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center',
                        paddingLeft: '10px',
                        paddingRight: '3px',
                        paddingTop: '5px',
                        paddingBottom: '3px',
                        backgroundColor: '#fff',
                    }}>
                        <div className={styles.zjTop}>
                            <Icon type="pushpin-o" /><span>结论：</span>
                        </div>
                        <div className={styles.zjBottom} style={{height: `${height}px`}}>
                            {
                                conclusion.map((item, key) => {
                                    return (<p style={{marginBottom: '0px'}}>{key + 1} 、{item}</p>);
                                })
                            }
                        </div>
                    </Footer>
                </Layout>
            </div>
        );
    }
}
