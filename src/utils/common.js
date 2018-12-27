const IsServer = false;
const _Host = `${IsServer ? 'http://172.16.12.152:8011' : 'http://localhost:51047'}/rest/PollutantSourceApi`;
/**
 * 全局获取API接口地址统一入口.
 * 创建人：吴建伟
 * 创建日期：2018.12.26
 */
export const pageUrl = {
    Login: '/api/rest/PollutantSourceApi/PAuthor/IsLogins',
    PhoneLogin: '/api/rest/PollutantSourceApi/PUserLogin/PostUserPhoneLogin',
    SendCaptcha: '/api/rest/PollutantSourceApi/PUserLogin/SendCode',
    Menu: '/api/rest/PollutantSourceApi/SysMenu/GetSysMenuByUserId',
    workbench:{
        operationHistoryRecord:'/api/rest/PollutantSourceApi/PTaskProcessing/GetOperationHistoryRecordPageList'
    }
};

