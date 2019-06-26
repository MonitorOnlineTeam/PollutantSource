import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import {
    Button,
    Icon,
    Card,
} from 'antd';
import AutoFormViewItems from '../AutoFormManager/AutoFormViewItems';
import MonitorContent from '../../components/MonitorContent/index';
import SdlTable from '../AutoFormManager/Table';

@connect(({ userinfo, loading }) => ({
    UserRolesName: userinfo.UserRolesName,
    UserDepName: userinfo.UserDepName
}))
class YsyCameraIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**初始化加载table配置 */
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'autoForm/getPageConfig',
            payload: {
                configId: 'VideoCamera',
            }
        });
    }

    render() {
        const {match}=this.props;
        const pointDataWhere= [{
            Key: "dbo__T_Bas_VideoCamera__VedioDevice_ID",
            Value: match.params.DeviceId,
            Where: "$="
        }];
        return (
            <Fragment>
                {
                    <MonitorContent breadCrumbList={
                        [
                            { Name: '首页', Url: '/' },
                            { Name: '系统管理', Url: '' },
                            { Name: '硬盘机管理', Url: '' },
                            { Name: '摄像头管理', Url: '' }
                        ]
                    }
                    >
                        <Card
                            bordered={false}
                            title="硬盘机详细"
                            extra={
                                <Button
                                    style={{ float: "right", marginRight: 10 }}
                                    onClick={() => {
                                        history.goBack(-1);
                                    }}
                                ><Icon type="left" />返回
                                </Button>
                            }
                        >
                            <AutoFormViewItems
                                configId="VideoDevice1"
                                keysParams={{ "dbo.T_Bas_VideoDevice.VedioDevice_ID": this.props.match.params.DeviceId }}
                            />
                        </Card>
                        <Card
                            bordered={false}
                            title="摄像头维护"
                        >
                            <SdlTable
                                style={{ marginTop: 10 }}
                                configId="VideoCamera"
                                searchParams={pointDataWhere}
                                rowChange={(key, row) => {
                                    this.setState({
                                        key, row
                                    });
                                }}
                            />
                        </Card>
                    </MonitorContent>
                }
            </Fragment>
        );
    }
}

export default YsyCameraIndex;