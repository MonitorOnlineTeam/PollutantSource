// import liraries
import React, { Component, PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Platform} from 'react-native';
import { Button} from 'antd-mobile';
import {MapView} from 'react-native-amap3d';
import { connect } from 'react-redux';
import coordinate from '../../utils/coordinate';
const SCREEN_WIDTH = Dimensions.get('window').width;
// create a component
@connect(({editPoint}) => ({editDetails: editPoint.editDetails, latitude: editPoint.latitude, longitude: editPoint.longitude}))
class EditsMap extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: '定位地图',
        tabBarLable: '定位地图',
        animationEnabled: false,
        headerBackTitle: null,
        headerTintColor: '#ffffff',
        headerTitleStyle: {alignSelf: 'center', marginRight: Platform.OS === 'android' ? 76 : 0}, // 标题居中
        headerStyle: { backgroundColor: '#5688f6', height: 45 },
        labelStyle: {fontSize: 14},
        tabBarIcon: ({ focused, tintColor }) =>
            <Image source={focused ? require('../../images/ic_me_hover.png') : require('../../images/ic_me.png')} style={{height: 20, width: 20}} />,
    })
    constructor(props) {
        super(props);
        this.state = {
            longitudeC: coordinate.wgs84togcj02(this.props.longitude, this.props.latitude)[0],
            latitudeC: coordinate.wgs84togcj02(this.props.longitude, this.props.latitude)[1],
            longitudeO: coordinate.wgs84togcj02(this.props.longitude, this.props.latitude)[0],
            latitudeO: coordinate.wgs84togcj02(this.props.longitude, this.props.latitude)[1],
            wgs84Lng: coordinate.gcj02towgs84(this.props.longitude, this.props.latitude)[0],
            wgs84Lat: coordinate.gcj02towgs84(this.props.longitude, this.props.latitude)[1],

        };
    }
      componentWillMount = () => {
          if (this.state.latitudeO == 40.18967 || this.state.latitudeO == null) {
              this.setState({
                  longitudeC: this.state.longitudeO,
                  latitudeC: this.state.latitudeO,
                  localEnable: true
              // longitude: this.props.editDetails.pointmodel.longitude+0.0000001,
              // latitude: this.props.editDetails.pointmodel.latitude+0.0000001,
              });
          }
      }
      logLocationEvent = ({ nativeEvent }) => {
          this.setState({
              longitudeO: nativeEvent.longitude,
              latitudeO: nativeEvent.latitude,
              wgs84Lat: coordinate.gcj02towgs84(nativeEvent.longitude, nativeEvent.latitude)[1],
              wgs84Lng: coordinate.gcj02towgs84(nativeEvent.longitude, nativeEvent.latitude)[0],
              localEnable: false
          });
      }
      locaCenterEvent = ({ nativeEvent }) => {
          this.setState({
              longitudeC: nativeEvent.longitude,
              latitudeC: nativeEvent.latitude,
              wgs84Lat: coordinate.gcj02towgs84(nativeEvent.longitude, nativeEvent.latitude)[1],
              wgs84Lng: coordinate.gcj02towgs84(nativeEvent.longitude, nativeEvent.latitude)[0],
          });
      }
      // 提交全部
      _commitAll = async() => {
          this.setState({
              longitudeO: this.state.longitudeC.toFixed(6),
              latitudeO: this.state.latitudeC.toFixed(6),

              // longitude: this.props.editDetails.pointmodel.longitude+0.0000001,
              // latitude: this.props.editDetails.pointmodel.latitude+0.0000001,
          });

          //   this.props.dispatch(createAction('editPoint/updateState')({ latitude: this.state.latitudeC.toFixed(6), longitude: this.state.longitudeC.toFixed(6)}));
          //   this.props.navigation.dispatch(NavigationActions.back());
          //   this.props.dispatch(createAction('editPoint/commitAll')({
          //       postjson: {

          //           DGIMN: this.props.editDetails.pointmodel.DGIMN,

          //           Longitude: this.state.wgs84Lng, // 经纬度
          //           Latitude: this.state.wgs84Lat,

          //       }

          //   }));
      };
      render() {
          // let b4ToGaoC =coordinate.wgs84togcj02(this.state.longitudeC,this.state.latitudeC)?coordinate.wgs84togcj02(this.state.longitudeC,this.state.latitudeC):[this.state.longitudeC,this.state.latitudeC]

          return (
              <View style={styles.container}>
                  <View style={styles.mapStyle}>
                      <Text style={{marginLeft: 11, marginTop: 18}}>{'经度：' + this.state.wgs84Lng}</Text>
                      <Text style={{marginLeft: 11, marginTop: 18}}>{'纬度：' + this.state.wgs84Lat}</Text>
                      <Text style={{width: SCREEN_WIDTH, height: 1, marginTop: 3, backgroundColor: '#999999'}}>-</Text>
                      <MapView
                          locationEnabled={this.state.localEnable}
                          ref={ref => { this.mapView = ref; }}
                          onLocation={
                              this.logLocationEvent
                          }
                          tiltEnabled={false}
                          rotateEnabled={false}
                          rotation={0}
                          mapType={this.state.mapType}
                          coordinate={{

                              latitude: this.state.latitudeO,
                              longitude: this.state.longitudeO,
                          }}

                          onStatusChange={
                              this.locaCenterEvent
                          }
                          showsCompass={false}
                          zoomLevel={18}

                          style={{width: SCREEN_WIDTH - 20, height: 300, marginLeft: 10, marginRight: 10, marginTop: 10}}>
                          <MapView.Marker
                              active={true}
                              infoWindowDisabled={true}

                              onDragEnd={this._onDragEvent}
                              onInfoWindowPress={this._onInfoWindowPress}

                              coordinate={{
                                  latitude: this.state.latitudeC,
                                  longitude: this.state.longitudeC,

                              }}
                          />
                          <MapView.Marker

                              title="旧位置"
                              image="old"
                              onDragEnd={this._onDragEvent}
                              onInfoWindowPress={this._onInfoWindowPress}
                              coordinate={{
                                  latitude: this.state.latitudeO,
                                  longitude: this.state.longitudeO,
                              }}
                          />
                          <TouchableOpacity onPress={() => {
                              this.state.mapType === 'satellite'
                                  ? this.setState({
                                      mapType: 'standard'
                                      // longitude: this.props.editDetails.pointmodel.longitude+0.0000001,
                                      // latitude: this.props.editDetails.pointmodel.latitude+0.0000001,
                                  }) : this.setState({
                                      mapType: 'satellite'
                                      // longitude: this.props.editDetails.pointmodel.longitude+0.0000001,
                                      // latitude: this.props.editDetails.pointmodel.latitude+0.0000001,
                                  });
                          }} style={{width: 32, height: 32, marginTop: 200, marginLeft: SCREEN_WIDTH - 60}}>
                              <Image source={require('../../images/change.png')} style={{width: 32, height: 32}} />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => {
                              this.setState({
                                  longitudeC: this.state.longitudeO,
                                  latitudeC: this.state.latitudeO,
                                  localEnable: true
                                  // longitude: this.props.editDetails.pointmodel.longitude+0.0000001,
                                  // latitude: this.props.editDetails.pointmodel.latitude+0.0000001,
                              });
                          }} style={{width: 32, height: 32, marginTop: 15, marginLeft: SCREEN_WIDTH - 60}}>
                              <Image source={require('../../images/map_location1.png')} style={{width: 32, height: 32}} />
                          </TouchableOpacity>

                      </MapView>
                      <Button style={{ width: SCREEN_WIDTH - 10, height: 46, marginTop: 20, alignSelf: 'center', marginBottom: 20}} className="btn" type="primary" inline={true} onClick={() => this._commitAll()}>确认更新</Button>

                  </View>

              </View>
          );
      }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeeee',

    },

    mapStyle: {
        marginTop: 1,
        flexDirection: 'column',
    },
    textStyle: {
        flex: 1,
        fontSize: 16,
        color: '#4d4d4e',
        marginRight: 10,
        marginLeft: 5,
        marginTop: 3
    },
});

// make this component available to the app
export default EditsMap;
