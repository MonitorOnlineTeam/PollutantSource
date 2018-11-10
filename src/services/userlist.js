
import request from '../utils/request';
import {
    post
} from '../dvapack/request';
export async function getList(params) {
    const body = {
    // UserPwdOld: params.oldpassword,
    // UserPwdNew: params.password,
    // UserPwdTwo: params.confirm,
    };
    const result = post('/api/rest/PollutantSourceApi/PUserInfo/GetAllUserInfo', body, null);
    return result === null ? {
        data: null
    } : result;
}
