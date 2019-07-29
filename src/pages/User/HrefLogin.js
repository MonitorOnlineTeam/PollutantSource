import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
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
    const { username, pwd } = this.props.match.params;
    this.props.dispatch({
      type: "login/hrefLogin",
      payload: {
        userName: "system",
        password: "system"
      }
    })
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
