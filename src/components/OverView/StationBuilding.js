import React, { Component } from 'react';
import { Layout } from 'antd';
import styles from './OverView.less';
import * as THREE from 'three';
// import CSS3DInit from '../../../ThreeJS/CSS3DInit';

const { Footer, Content } = Layout;

class StationBuilding extends Component {
    constructor(props) {
        super(props);

        const _this = this;
        let camera;
        let scene;
        let renderer;
        let geometry;
        let material;
        let mesh;
        const target = new THREE.Vector3();

        let lon = 90;
        let lat = 0;
        let phi = 0;
        let theta = 0;
        let touchX;
        let touchY;
    }

      init=() => {
          this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

          this.scene = new THREE.Scene();
          console.log(THREE);
          const sides = [
              {
                  position: [ -512, 0, 0 ], // 位置
                  rotation: [ 0, Math.PI / 2, 0 ]// 角度
              },
              {
                  position: [ 512, 0, 0 ],
                  rotation: [ 0, -Math.PI / 2, 0 ]
              },
              {
                  position: [ 0, 512, 0 ],
                  rotation: [ Math.PI / 2, 0, Math.PI ]
              },
              {
                  position: [ 0, -512, 0 ],
                  rotation: [ -Math.PI / 2, 0, Math.PI ]
              },
              {
                  position: [ 0, 0, 512 ],
                  rotation: [ 0, Math.PI, 0 ]
              },
              {
                  position: [ 0, 0, -512 ],
                  rotation: [ 0, 0, 0 ]
              }
          ];

          /**
 * 根据六个面的信息，new出六个对象放入场景中
 */
          for (let i = 0; i < sides.length; i++) {
              const side = sides[ i ];

              const element = this.refs[`surface_${i}`];
              debugger;
              element.width = 1026; // 2 pixels extra to close the gap.多余的2像素用于闭合正方体

              const object = new THREE.CSS3DObject(element);
              object.position.fromArray(side.position);
              object.rotation.fromArray(side.rotation);
              this.scene.add(object);
          }

          this.renderer = new THREE.CSS3DRenderer();
          this.renderer.setSize(window.innerWidth, window.innerHeight);
          document.body.appendChild(this.renderer.domElement);

          document.addEventListener('mousedown', this.onDocumentMouseDown, false);
          document.addEventListener('wheel', this.onDocumentMouseWheel, false);

          document.addEventListener('touchstart', this.onDocumentTouchStart, false);
          document.addEventListener('touchmove', this.onDocumentTouchMove, false);

          window.addEventListener('resize', this.onWindowResize, false);
      }

     animate=() => {
         requestAnimationFrame(animate);

         // lat +=  0.1;
         lat = Math.max(-85, Math.min(85, lat));
         phi = THREE.Math.degToRad(90 - lat);
         theta = THREE.Math.degToRad(lon);

         target.x = Math.sin(phi) * Math.cos(theta);
         target.y = Math.cos(phi);
         target.z = Math.sin(phi) * Math.sin(theta);

         camera.lookAt(target);
         /**
 * 通过传入的scene和camera
 * 获取其中object在创建时候传入的element信息
 * 以及后面定义的包括位置，角度等信息
 * 根据场景中的obj创建dom元素
 * 插入render本身自己创建的场景div中
 * 达到渲染场景的效果
 */
         renderer.render(scene, camera);
     }

      onWindowResize=() => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();

          renderer.setSize(window.innerWidth, window.innerHeight);
      }

      onDocumentMouseDown=(event) => {
          event.preventDefault();

          document.addEventListener('mousemove', onDocumentMouseMove, false);
          document.addEventListener('mouseup', onDocumentMouseUp, false);
      }

      onDocumentMouseMove=(event) => {
          const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
          const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

          lon -= movementX * 0.1;
          lat += movementY * 0.1;
      }

      onDocumentMouseUp=(event) => {
          document.removeEventListener('mousemove', onDocumentMouseMove);
          document.removeEventListener('mouseup', onDocumentMouseUp);
      }

      onDocumentMouseWheel=(event) => {
          camera.fov += event.deltaY * 0.05;
          camera.updateProjectionMatrix();
      }

      onDocumentTouchStart=(event) => {
          event.preventDefault();

          const touch = event.touches[ 0 ];

          touchX = touch.screenX;
          touchY = touch.screenY;
      }

      onDocumentTouchMove=(event) => {
          event.preventDefault();

          const touch = event.touches[ 0 ];

          lon -= (touch.screenX - touchX) * 0.1;
          lat += (touch.screenY - touchY) * 0.1;

          touchX = touch.screenX;
          touchY = touch.screenY;
      }
      componentDidMount() {
          init();
      }
      render() {
          return (
              <Layout>
                  <Content style={{background: '#fff', height: '700px'}}>
                      <div>
                          <div ref="surface_0" className={styles.surface}>
                              <img className={styles.surfacebg} src="../../../CSS3DRenderer/posx.jpg" alt="" />
                          </div>
                          <div ref="surface_1" className={styles.surface}>
                              <img className={styles.surfacebg} src="../../../CSS3DRenderer/negx.jpg" alt="" />
                          </div>
                          <div ref="surface_2" className={styles.surface}>
                              <img className={styles.surfacebg} src="../../../CSS3DRenderer/posy.jpg" alt="" />
                          </div>
                          <div ref="surface_3" className={styles.surface}>
                              <img className={styles.surfacebg} src="../../../CSS3DRenderer/negy.jpg" alt="" />
                          </div>
                          <div ref="surface_4" className={styles.surface}>
                              <img className={styles.surfacebg} src="../../../CSS3DRenderer/posz.jpg" alt="" />
                          </div>
                          <div ref="surface_5" className={styles.surface}>
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
