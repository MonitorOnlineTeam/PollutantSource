import React, { Component } from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class StationBuilding extends Component {
    render() {
        return (
            <Layout>
                <Content style={{background: '#fff', height: '700px'}}>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        );
    }
}
export default StationBuilding;
