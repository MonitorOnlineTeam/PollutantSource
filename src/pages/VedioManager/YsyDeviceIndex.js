import React, { Component, Fragment } from 'react';
import {
    Button,
    Card,
    Spin,
    Divider,
    Modal,
    Form
} from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './index.less';
import MonitorContent from '../../components/MonitorContent/index';
import SdlTable from '../AutoFormManager/Table';
import SearchWrapper from '../AutoFormManager/SearchWrapper';
import { sdlMessage } from '../../utils/utils';
import SdlForm from "../AutoFormManager/SdlForm";

@connect(({ loading, autoForm }) => ({
    loading: loading.effects['autoForm/getPageConfig'],
    autoForm: autoForm,
    searchConfigItems: autoForm.searchConfigItems,
    // columns: autoForm.columns,
    tableInfo: autoForm.tableInfo,
    searchForm: autoForm.searchForm,
    routerConfig: autoForm.routerConfig
}))
@Form.create()
class YsyDeviceIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            FormDatas: {},
        };

    }

    /**初始化加载table配置 */
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'autoForm/getPageConfig',
            payload: {
                configId: 'CameraMonitor',
            }
        });
        dispatch({
            type: 'autoForm/getPageConfig',
            payload: {
                configId: 'VideoCamera',
            }
        });
    }

       showModal = () => {
           this.setState({
               visible: true,
           });
       };

       handleOk = e => {
           const { dispatch, form } = this.props;
           form.validateFields((err, values) => {
               if (!err) {
                   let FormData = {};
                   for (let key in values) {
                       if (values[key] && values[key].fileList) {
                           FormData[key] = uid;
                       } else {
                           FormData[key] = values[key] && values[key].toString();
                       }
                   }
                   dispatch({
                       type: 'ysymodel/AddDevice',
                       payload: {
                           configId: "VideoCamera",
                           FormData: {
                               ...FormData,
                               VedioDevice_ID:1,
                           },
                           PointCode:this.props.match.params.Pointcode,
                           callback: (result) => {
                               this.setState({
                                   visible: false,
                               });
                           }
                       }
                   });
               }
           });
       };

       render() {
           const{dispatch,loading,match}=this.props;
           const pointDataWhere= [{
               Key: "[dbo]__[T_Bas_CameraMonitor]__BusinessCode",
               Value: match.params.Pointcode,
               Where: "$="
           }];
           if (loading) {
               return (<Spin
                   style={{
                       width: '100%',
                       height: 'calc(100vh/2)',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}
                   size="large"
               />);
           }
           return (
               <MonitorContent breadCrumbList={
                   [
                       { Name: '首页', Url: '/' },
                       { Name: '系统管理', Url: '' },
                       { Name: '企业管理', Url: '/sysmanage/monitortarget/AEnterpriseTest' },
                       { Name: '排口管理', Url: `/sysmanage/monitortarget/monitorpoint/AEnterpriseTest/${match.params.EntCode}/${match.params.EntName}` },
                       { Name: '视频管理', Url: '' },
                   ]
               }
               >
                   <div className={styles.cardTitle}>
                       <Card title={`${match.params.Pointname}-视频管理`}>
                           <SearchWrapper
                               configId="VideoCamera"
                           />
                           <SdlTable
                               style={{ marginTop: 10 }}
                               configId="CameraMonitor"
                               searchParams={pointDataWhere}
                               rowChange={(key, row) => {
                                   this.setState({
                                       key, row
                                   });
                               }}
                               onAdd={() => {
                                   this.showModal();
                               }}
                           />
                       </Card>
                       <Modal
                           title="摄像头管理"
                           visible={this.state.visible}
                           destroyOnClose={true}// 清除上次数据
                           onOk={this.handleOk}
                           okText="保存"
                           cancelText="关闭"
                           onCancel={() => {
                               this.setState({
                                   visible: false
                               });
                           }}
                           width="50%"
                       >
                           <SdlForm
                               configId="VideoCamera"
                               form={this.props.form}
                               noLoad={true}
                               hideBtns={true}
                           />
                       </Modal>
                   </div>
               </MonitorContent>
           );
       }
}
export default YsyDeviceIndex;