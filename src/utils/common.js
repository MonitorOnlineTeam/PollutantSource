// const IsServer = false;
// const _Host = `${IsServer ? 'http://172.16.12.152:8011' : 'http://localhost:51047'}/rest/PollutantSourceApi`;
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
        /**运维历史记录 */
        operationHistoryRecord:'/api/rest/PollutantSourceApi/PTaskProcessing/GetOperationHistoryRecordPageList',
        /**异常报警记录 */
        dataExceptionAlarm:'/api/rest/PollutantSourceApi/PWorkbench/GetDataExceptionAlarmPageList',
        /**率统计 */
        rateStatistics:'/api/rest/PollutantSourceApi/PWorkbench/GetRateStatistics',
        /**排口传输有效率 */
        transmissionEfficiencyForPoints:'/api/rest/PollutantSourceApi/DataStatistics/GetTransmissionEfficiencyForPoints',
        /**排口设备运转率 */
        equipmentOperatingRateForPoints:'/api/rest/PollutantSourceApi/DataStatistics/GetEquipmentOperatingRateForPoints',
        /**排口实时联网率 */
        realTimeNetWorkingRateForPointsPageList:'/api/rest/PollutantSourceApi/DataStatistics/GetRealTimeNetWorkingRateForPointsPageList',
        /**小时监测预警 */
        hourDataOverWarningPageList:'/api/rest/PollutantSourceApi/PWorkbench/GetDataOverWarningPageList',
        /**所有排口超标汇总 */
        allPointOverDataList:'/api/rest/PollutantSourceApi/PWorkbench/GetDataOverAlarmPageList',
        /**获取当前超标排口 */
        overPoints:'/api/rest/PollutantSourceApi/PWorkbench/GetOverPoints',
        /**统计排口状态 */
        statisticsPointStatus:'/api/rest/PollutantSourceApi/PWorkbench/GetStatisticsPointStatus',
    }
};

