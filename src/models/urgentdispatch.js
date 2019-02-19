import { Model } from '../dvapack';
import { queryoperationInfo,queryoperationTaskInfo
} from '../services/api';

export default Model.extend({
    namespace: 'urgentdispatch',
    state: {
        operationUserInfo: null,
        existTask:null
    },
    effects: {
        * queryoperationInfo({
            payload 
        }, {
            call,
            update,
            put,
            take
        }) {
            yield put({
                type:'queryoperationTaskInfo',
                payload:payload
            })
            yield take('queryoperationTaskInfo/@@end');
            const result = yield call(queryoperationInfo, payload);
            if (result.requstresult === '1') {
                yield update({
                    operationUserInfo: result.data,
                });
            } else {
                yield update({
                    operationUserInfo: null,
                });
            }
           
        },
        * queryoperationTaskInfo({
            payload     
        }, {
            call,
            update,
        }) {
            const result = yield call(queryoperationTaskInfo, payload);
            if (result.requstresult === '1') {
                yield update({
                    existTask: result.data
                });
            } else {
                yield update({
                    existTask: null,
                });
            }
        },
    },
});
