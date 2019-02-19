import React, { Component } from 'react';
import { Row, Col, Modal} from 'antd';
import EmergencyDetailInfo from '../../pages/EmergencyTodoList/EmergencyDetailInfo';


class EmergencyDetailInfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"运维详情",
            visibleEmeDetailModal:false,
            DGIMN:"",
            TaskId:""
        };
    }

  showModal = (DGIMN,TaskId,title) => {
      this.setState({
          title:title,
          visibleEmeDetailModal: true,
          DGIMN:DGIMN,
          TaskId:TaskId
      });
  }

  componentDidMount = () => {
      const {onRef}=this.props;
      onRef(this);
  }


  render() {
      const {title,visibleEmeDetailModal,DGIMN,TaskId} = this.state;
      return (
          <Modal
              title={
                  <Row>
                      <Col span={10}>{title}</Col>
                  </Row>
              }
              visible={visibleEmeDetailModal}
              onCancel={() => {
                  this.setState({ visibleEmeDetailModal: false });
              }}
              width="90%"
              footer={[]}
          >
              <EmergencyDetailInfo DGIMN={DGIMN} TaskID={TaskId} goback="none" />
          </Modal>
      );
  }
}
export default EmergencyDetailInfoModal;
