import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import router from 'umi/router';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import styles from './Login.less';


@connect(state => ({
  login: state.login,
}))
export default class HrefLogin extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // const { username, pwd } = this.props.match.params;
    const hostname = window.location.hostname;
    const begin = hostname.split(".")[0];
    begin !== "61" ? this.props.dispatch({
      type: "login/hrefLogin",
      payload: {
        userName: "liudazhuang",
        password: "123456"
      }
    }) : router.push("/user/login")
  }
  render() {
    return (
      <Spin
        style={{
          width: '100%',
          height: 'calc(100vh/2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        size="large"
      />
    )
  }
}
