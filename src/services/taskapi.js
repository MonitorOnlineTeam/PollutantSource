import { post} from '../dvapack/request';
// 污染源运维的相关接口
export async function GetTaskDetails(params) {
    const body = {
        TaskID: params.TaskID,
        UserID: params.UserID
    };
    const result = await post('/api/rest/PollutantSourceApi/PTaskProcessing/GetTaskDetails', body, null);
    return result === null ? { data: null } : result;
}
