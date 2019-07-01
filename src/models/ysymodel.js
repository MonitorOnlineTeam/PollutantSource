import { message } from 'antd';
import {
    Model
} from '../dvapack';
import {
    AddCameraMonitor
} from '../services/ysyservices';
import * as services from '../services/autoformapi';

/*
萤石云视频管理相关接口
add by xpy
modify by
*/
export default Model.extend({
    namespace: 'ysymodel',

    state: {

    },
    effects: {
        /**添加摄像头 */
        * AddDevice({
            payload
        }, {
            call,
            put
        }) {
            const result = yield call(services.postAutoFromDataAdd, {
                ...payload,
                FormData: JSON.stringify(payload.FormData)
            });
            if (result.IsSuccess) {
                yield put({
                    type: "AddCameraMonitor",
                    payload: {
                        PointCode: payload.PointCode,
                        VedioCameraID: result.Datas
                    }
                });

            } else {
                message.error(result.Message);
            }
            payload.callback(result);
        },
        /**添加摄像头与排口关系表 */
        * AddCameraMonitor({
            payload
        }, {
            call,
            put,
        }) {
            const result = yield call(AddCameraMonitor, {
                ...payload
            });
            if(result.requstresult==='1') {
                message.success('添加成功！');
                yield put({
                    type: 'autoForm/getAutoFormData',
                    payload: {
                        configId: "CameraMonitor"
                    }
                });
            }
        },
    },
});
