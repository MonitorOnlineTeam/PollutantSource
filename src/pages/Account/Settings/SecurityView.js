import React, { Component, Fragment } from 'react';
import {
    List,
    Rate,
    Card,
    Modal,
} from 'antd';
import ChangePwdDetail from "./ChangePwdDetail";

class SecurityView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showchangepwd: false
        };
    }

  getData = () => [
      {
          title:'帐号密码',
          description: (
              <Fragment>
                  <span>当前密码强度：<Rate allowHalf={true} disabled={true} defaultValue={2.5} />一般</span>
              </Fragment>
          ),
          actions: [
              <a onClick={()=>{
                  this.child.modifyshowchangepwd();
              }}
              >
                  修改
              </a>,
          ],
      },
  ];

onRef = (ref) => {
    this.child = ref;
}

render() {
    return (
        <Card bordered={false} title="安全设置" style={{height:'calc(100vh - 160px)' }}>
            <List
                itemLayout="horizontal"
                dataSource={this.getData()}
                renderItem={item => (
                    <List.Item actions={item.actions}>
                        <List.Item.Meta title={item.title} description={item.description} />
                    </List.Item>
                )}
            />
            <ChangePwdDetail {...this.props} onRef={this.onRef} />
        </Card>
    );
}
}

export default SecurityView;
