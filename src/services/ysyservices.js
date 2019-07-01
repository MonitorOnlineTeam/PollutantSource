
import {
    post
}
    from '../dvapack/request';

/**添加摄像头与排口关系表 */
export async function AddCameraMonitor(params) {
    const body = {
        PointCode: params.PointCode,
        VedioCameraID: params.VedioCameraID,
    };
    const result = post('/api/rest/PollutantSourceApi/Video/AddCameraMonitor', body, null);
    return result === null ? {
        data: null
    } : result;
}