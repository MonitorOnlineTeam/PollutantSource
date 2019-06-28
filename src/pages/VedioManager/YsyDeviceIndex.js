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
            visible: false
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
                configId: 'VideoDevice1',
            }
        });
    }

       showModal = () => {
           this.setState({
               visible: true,
           });
       };

       handleOk = e => {
           this.setState({
               visible: false,
           });
       };

       onSubmitForm() {
           const {
               dispatch,
               form
           } = this.props;
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
                   this.setState({
                       FormDatas: FormData
                   });
               }
           });
       }

       render() {
           const{dispatch,loading,match}=this.props;
           const pointDataWhere= [{
               Key: "[dbo]__[T_Bas_CameraMonitor]__BusinessCode",
               Value: "0EB9F198-A195-48F3-B476-AE0B9EA8FFDD",
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
                       { Name: '萤石云视频管理', Url: '' }
                   ]
               }
               >
                   <div className={styles.cardTitle}>
                       <Card title="测试排口-硬盘机管理">
                           <SearchWrapper
                               onSubmitForm={(form) => this.loadReportList(form)}
                               configId="CameraMonitor"
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
                               appendHandleRows={row =>
                                   <Fragment>
                                       <Divider type="vertical" />
                                       <a onClick={() => {
                                           dispatch(routerRedux.push(`/sysmanage/ysycameramanager/${ row["dbo.T_Bas_VideoDevice.VedioDevice_ID"]}`));
                                       }}
                                       >添加摄像头
                                       </a>
                                   </Fragment>
                               }
                           />
                       </Card>
                       <Modal
                           title="硬盘机管理"
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
                               configId="VideoDevice1"
                               form={this.props.form}
                               noLoad={true}
                           >
                        1
                           </SdlForm>
                       </Modal>
                   </div>
               </MonitorContent>
           );
       }
}
export default YsyDeviceIndex;