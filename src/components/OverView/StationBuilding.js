import React, { Component } from 'react';
import { Layout } from 'antd';
import styles from './OverView.less';
import * as THREE from 'three';
// import CSS3DInit from '../../../ThreeJS/CSS3DInit';
import { CSS3DObject, CSS3DSprite, CSS3DRenderer } from '../../../ThreeJS/css3drenderer';
const { Footer, Content } = Layout;

class StationBuilding extends Component {
    constructor(props) {
        super(props);

        this.state = {
            target: new THREE.Vector3(),
            lon: 90,
            lat: 0,
            phi: 0,
            theta: 0,
            scene: new THREE.Scene(),
            renderer: new CSS3DRenderer(),
            camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
        };
    }

      init=() => {
          let { camera, scene, renderer } = this.state;

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
              element.width = 1026; // 2 pixels extra to close the gap.多余的2像素用于闭合正方体

              const object = new CSS3DObject(element);
              object.position.fromArray(side.position);
              object.rotation.fromArray(side.rotation);
              scene.add(object);
          }

          renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

          document.body.appendChild(renderer.domElement);

          document.addEventListener('mousedown', this.onDocumentMouseDown, false);
          //   document.addEventListener('wheel', this.onDocumentMouseWheel, false);

          document.addEventListener('touchstart', this.onDocumentTouchStart, false);
          document.addEventListener('touchmove', this.onDocumentTouchMove, false);

          window.addEventListener('resize', this.onWindowResize, false);
          this.setState({
              camera: camera,
              scene: scene,
              renderer: renderer
          });
      }

     animate=() => {
         let { camera, scene, renderer, target, lon, lat, phi, theta } = this.state;
         requestAnimationFrame(this.animate);
         // lat +=  0.1;
         lat = Math.max(-85, Math.min(85, lat));
         phi = THREE.Math.degToRad(90 - lat);
         theta = THREE.Math.degToRad(lon);
         target.x = Math.sin(phi) * Math.cos(theta);
         target.y = Math.cos(phi);
         target.z = Math.sin(phi) * Math.sin(theta);
         camera.lookAt(target);
         renderer.render(scene, camera);
         this.setState({
             camera: camera,
             scene: scene,
             renderer: renderer,
             target: target,
             lon: lon,
             lat: lat,
             phi: phi,
             theta: theta
         });
     }

      onWindowResize=() => {
          let { camera, renderer } = this.state;
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();

          renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
          this.setState({
              camera: camera,
              renderer: renderer
          });
      }

      onDocumentMouseDown=(event) => {
          event.preventDefault();

          document.addEventListener('mousemove', this.onDocumentMouseMove, false);
          document.addEventListener('mouseup', this.onDocumentMouseUp, false);
      }

      onDocumentMouseMove=(event) => {
          let { lon, lat } = this.state;
          const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
          const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
          lon -= movementX * 0.1;
          lat += movementY * 0.1;
          this.setState({
              lon: lon,
              lat: lat
          });
      }

      onDocumentMouseUp=(event) => {
          document.removeEventListener('mousemove', this.onDocumentMouseMove);
          document.removeEventListener('mouseup', this.onDocumentMouseUp);
      }

      onDocumentMouseWheel=(event) => {
          let { camera } = this.state;
          camera.fov += event.deltaY * 0.05;
          camera.updateProjectionMatrix();
          this.setState({
              camera: camera
          });
      }

      onDocumentTouchStart=(event) => {
          let { touchX, touchY } = this.state;
          event.preventDefault();
          const touch = event.touches[ 0 ];
          touchX = touch.screenX;
          touchY = touch.screenY;
          this.setState({
              touchX: touchX,
              touchY: touchY
          });
      }

      onDocumentTouchMove=(event) => {
          let { lon, lat, touchX, touchY } = this.state;
          event.preventDefault();
          const touch = event.touches[ 0 ];
          lon -= (touch.screenX - this.touchX) * 0.1;
          lat += (touch.screenY - this.touchY) * 0.1;
          touchX = touch.screenX;
          touchY = touch.screenY;
          this.setState({
              lon: lon,
              lat: lat,
              touchX: touchX,
              touchY: touchY
          });
      }
      componentDidMount() {
          this.init();
          this.animate();
      }
      render() {
          return (

              <div style={{ height: '700px', width: '1900px' }}>
                  <div ref="surface_0" >
                      <img src="../../../CSS3DRenderer/posx.jpg" alt="" />
                  </div>
                  <div ref="surface_1" >
                      <img src="../../../CSS3DRenderer/negx.jpg" alt="" />
                  </div>
                  <div ref="surface_2" >
                      <img src="../../../CSS3DRenderer/posy.jpg" alt="" />
                  </div>
                  <div ref="surface_3" >
                      <img src="../../../CSS3DRenderer/negy.jpg" alt="" />
                  </div>
                  <div ref="surface_4" >
                      <img src="../../../CSS3DRenderer/posz.jpg" alt="" />
                  </div>
                  <div ref="surface_5" >
                      <img src="../../../CSS3DRenderer/negz.jpg" alt="" />
                  </div>
              </div>

          );
      }
}
export default StationBuilding;
