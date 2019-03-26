import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col, Modal} from 'antd';
import AlarmRecord from '../../pages/PointDetail/AlarmRecord';


class AlarmRecordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alarmTitle:"报警记录",
            visibleAlarmModal:false,
            DGIMN:"",
            firsttime:null,
            lasttime:null
        };
    }

  showModal = (firsttime,lasttime,DGIMN,alarmTitle) => {
      alert(1)
      this.setState({
          alarmTitle:alarmTitle,
          visibleAlarmModal: true,
          DGIMN:DGIMN,
          firsttime:firsttime,
          lasttime:lasttime,
      });
  }

  componentDidMount = () => {
    alert(2)
      const {onRef}=this.props;
      onRef(this);
  }


  render() {
      const {alarmTitle,visibleAlarmModal,firsttime,lasttime,DGIMN} = this.state;
      return (
          <Modal
              title={
                  <Row>
                      <Col span={10}>{alarmTitle}</Col>
                  </Row>
              }
              visible={visibleAlarmModal}
              onOk={this.handleOk}
              onCancel={() => {
                  this.setState({ visibleAlarmModal: false });
              }}
              width="70%"
              footer={[]}
          >
              <AlarmRecord firsttime={moment(firsttime)} lasttime={moment(lasttime).add(1, 'second')} DGIMN={DGIMN} />
          </Modal>
      );
  }
}
export default AlarmRecordModal;
