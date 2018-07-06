import React, { Component } from 'react';
import { Layout } from 'antd';
import styles from './OverView.less';
import * as THREE from 'three';
import {PhotoSphereViewer} from '../../../ThreeJS/photo-sphere-viewer.js';

const { Footer, Content } = Layout;

class StationBuilding extends Component {
    render() {
        return (
            <Layout>
                <Content style={{background: '#fff', height: '700px'}}>
                    <div>
                        <div id="surface_0" className={styles.surface}>
                            <img className={styles.surfacebg} src="../../../CSS3DRenderer/posx.jpg" alt="" />
                        </div>
                        <div id="surface_1" className={styles.surface}>
                            <img className={styles.surfacebg} src="../../../CSS3DRenderer/negx.jpg" alt="" />
                        </div>
                        <div id="surface_2" className={styles.surface}>
                            <img className={styles.surfacebg} src="../../../CSS3DRenderer/posy.jpg" alt="" />
                        </div>
                        <div id="surface_3" className={styles.surface}>
                            <img className={styles.surfacebg} src="../../../CSS3DRenderer/negy.jpg" alt="" />
                        </div>
                        <div id="surface_4" className={styles.surface}>
                            <img className={styles.surfacebg} src="../../../CSS3DRenderer/posz.jpg" alt="" />
                        </div>
                        <div id="surface_5" className={styles.surface}>
                            <img className={styles.surfacebg} src="../../../CSS3DRenderer/negz.jpg" alt="" />
                        </div>
                    </div>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        );
    }
}
export default StationBuilding;
