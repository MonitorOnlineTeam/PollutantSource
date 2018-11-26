import { GetTaskDetails } from '../services/taskapi';
import { Model } from '../dvapack';

export default Model.extend({
    namespace: 'task',
    state: {
        TaskInfo: null
    },

    effects: {
        // 获取任务的详细信息
        * GetTaskDetailInfo({
            payload,
        }, { call, update }) {
            const taskInfo = yield call(GetTaskDetails, payload);
            if (taskInfo != null) {
                yield update({
                    TaskInfo: taskInfo
                });
            }
        }
    }
});
