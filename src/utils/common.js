const IsServer = false;
const _Host = `${IsServer ? 'http://172.16.12.152:8011' : 'http://localhost:51047'}/rest/PollutantSourceApi`;
export const pageUrl = {
    Login: '/api/rest/PollutantSourceApi/PAuthor/IsLogins',
    PhoneLogin: '/api/rest/PollutantSourceApi/PUserLogin/PostUserPhoneLogin',
    SendCaptcha: '/api/rest/PollutantSourceApi/PUserLogin/SendCode',
    Menu: '/api/rest/PollutantSourceApi/SysMenu/GetSysMenuByUserId'
};

/**
 * 全局获取API接口地址统一入口.
 */
export default function getPageUrlInfo() {
    // let obj = {
    //     Host: _Host,
    //     PageUrl: _PageUrl
    // };
    // return obj;
}
