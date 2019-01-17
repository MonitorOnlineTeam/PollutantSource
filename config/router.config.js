export default [
    // user
    {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', component: './User/Login' },
            { path: '/user/register', component: './User/Register' },
            { path: '/user/register-result', component: './User/RegisterResult' },
        ],
    },
    // appoperation
    {
        path: '/appoperation',
        component: '../layouts/BlankLayout',
        routes: [
            /* 维修记录 */
            { path: '/appoperation/apprepairrecorddetail/:TaskID/:TypeID', component: './AppOperation/AppRepairRecordDetail' },
            /* 停机记录 */
            { path: '/appoperation/appstopcemsinfo/:TaskID/:TypeID', component: './AppOperation/AppStopCemsInfo' },
            /* 易耗品更换记录 */
            { path: '/appoperation/appconsumablesreplacerecord/:TaskID/:TypeID', component: './AppOperation/AppConsumablesReplaceRecord' },
            /* 标气更换记录 */
            { path: '/appoperation/appstandardgasrepalcerecord/:TaskID/:TypeID', component: './AppOperation/AppStandardGasRepalceRecord' },
            /* 完全抽取法CEMS巡检记录表 */
            { path: '/appoperation/appcompleteextraction/:TaskID/:TypeID', component: './AppOperation/AppCompleteExtraction' },
            /* 稀释采样法CEMS巡检记录表 */
            { path: '/appoperation/appdilutionsampling/:TaskID/:TypeID', component: './AppOperation/AppDilutionSampling' },
            /* 直接测量法CEMS巡检记录表 */
            { path: '/appoperation/appdirectmeasurement/:TaskID/:TypeID', component: './AppOperation/AppDirectMeasurement' },
            /* CEMS零点量程漂移与校准记录表记录表 */
            { path: '/appoperation/appjzrecordinfo/:TaskID/:TypeID', component: './AppOperation/AppJzRecordInfo' },
            /* CEMS校验测试记录 */
            { path: '/appoperation/appbdtestrecord/:TaskID/:TypeID', component: './AppOperation/AppBdTestRecord' },
            /* CEMS设备异常记录表 */
            { path: '/appoperation/appdeviceexceptiondetail/:TaskID/:TypeID', component: './AppOperation/AppDeviceExceptionDetail' },
        ],
    },
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/homepage' },
            /* 主页 */
            {
                path: '/homepage', component: './HomePage',
            },
            /* 工作台 */
            {
                path: '/workbench', component: './SpecialWorkbench',
            },
            /* 数据一览 */
            { path: '/overview/datalistview', component: './OverView/DataList' },
            /* 地图一览 */
            { path: '/overview/mapview', component: './OverView/index' },
            /* 点位详情 */
            {
                path: '/pointdetail/:pointcode/:viewtype', component: './PointDetail', routes: [
                    /* 默认 */
                    { path: '/pointdetail/:pointcode/:viewtype', redirect: '/pointdetail/:pointcode/:viewtype/processflowdiagram' },
                    /* 工艺流程图 */
                    { path: '/pointdetail/:pointcode/:viewtype/processflowdiagram', component: './PointDetail/ProcessFlowDiagram' },
                    /* 数据查询 */
                    { path: '/pointdetail/:pointcode/:viewtype/dataquery', component: './PointDetail/DataQuery' },
                    /* 报警数据查询 */
                    { path: '/pointdetail/:pointcode/:viewtype/alarmrecord', component: './PointDetail/AlarmRecord' },
                    /* 实时视频 */
                    { path: '/pointdetail/:pointcode/:viewtype/realvideo', component: './PointDetail/RealVideo' },
                    /* 历史视频 */
                    { path: '/pointdetail/:pointcode/:viewtype/hisvideo', component: './PointDetail/HisVideo' },
                    /* 运维大事记 */
                    { path: '/pointdetail/:pointcode/:viewtype/ywdsjlist', component: './PointDetail/ywdsjlist' },
                    /* 质控记录 */
                    {
                        path: '/pointdetail/:pointcode/:viewtype/qcontrollist', component: './PointDetail/QControllist', routes: [
                            /* 默认 */
                            { path: '/pointdetail/:pointcode/:viewtype/qcontrollist', redirect: '/pointdetail/:pointcode/:viewtype/qcontrollist/JzHistoryRecords' },
                            /* 校准记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/jzhistoryrecords', component: './EmergencyTodoList/JzHistoryRecords' },
                            /* 比对监测记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/bdhistoryinfohistoryrecords', component: './EmergencyTodoList/BdHistoryInfoHistoryRecords' },
                            /* 数据异常记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/deviceexceptionlisthistoryrecords', component: './EmergencyTodoList/DeviceExceptionListHistoryRecords' },
                        ]
                    },
                    /* 运维记录 */
                    {
                        path: '/pointdetail/:pointcode/:viewtype/operationlist', component: './PointDetail/Operationlist', routes: [
                            /* 默认 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist', redirect: '/pointdetail/:pointcode/:viewtype/operationlist/RepairHistoryRecords' },
                            /* 维修记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist/repairhistoryrecords', component: './EmergencyTodoList/RepairHistoryRecords' },
                            /* 停机记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist/stopcemslisthistoryrecords', component: './EmergencyTodoList/StopCemsListHistoryRecords' },
                            /* 易耗品记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist/countercontrolcommandhistoryrecords', component: './EmergencyTodoList/CounterControlCommandHistoryRecords' },
                            /* 标气记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist/standardgashistoryrecords', component: './EmergencyTodoList/StandardGasHistoryRecords' },
                            /* 完全抽取法巡检记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist/wqcqfinspectionhistoryrecords', component: './EmergencyTodoList/WQCQFInspectionHistoryRecords' },
                            /* 稀释采样巡检记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist/xscyfinspectionhistoryrecords', component: './EmergencyTodoList/XSCYFInspectionHistoryRecords' },
                            /* 直接采样法巡检记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist/zzclfinspectionhistoryrecords', component: './EmergencyTodoList/ZZCLFInspectionHistoryRecords' },

                        ]
                    },
                ]
            },

            /* 任务详情 */
            { path: '/taskdetail/emergencydetailinfo/:viewtype/:taskfrom/:TaskID', component: './EmergencyTodoList/EmergencyDetailInfo' },
            /* 停机记录 */
            { path: '/patrolform/stopcemsinfo/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/StopCemsInfo' },
            /* 维修记录 */
            { path: '/patrolForm/repairrecorddetail/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/RepairRecordDetail' },
            /* 易耗品记录 */
            { path: '/patrolform/consumablesreplacerecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskIds', component: './EmergencyTodoList/ConsumablesReplaceRecord' },
            /* 标气更换记录 */
            { path: '/patrolform/standardgasrepalcerecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:StandardGasTaskIds', component: './EmergencyTodoList/StandardGasRepalceRecord' },
            /* 完全抽取法CEMS记录 */
            { path: '/patrolform/completeextraction/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/CompleteExtraction' },
            /* 稀释采样法CEMS记录 */
            { path: '/patrolform/dilutionsampling/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:CyfPatrolTaskIds', component: './EmergencyTodoList/DilutionSampling' },
            /* 直接测量法CEMS记录 */
            { path: '/patrolform/directmeasurement/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:ClfPatrolTaskIds', component: './EmergencyTodoList/DirectMeasurement' },
            /* 校准记录 */
            { path: '/patrolform/jzrecordinfo/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID/', component: './EmergencyTodoList/JzRecordInfo' },
            /* 比对监测记录 */
            { path: '/patrolform/bdTestrecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/BdTestRecord' },
            /* 异常记录 */
            { path: '/patrolform/deviceexceptiondetail/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/DeviceExceptionDetail' },

            
            //一级菜单
            /* 运维日历 */
            { path: '/operation/operationcalendar', component: './Operation/OperationCalendar' },
            /* 工艺流程图 */
            { path: '/operation/processflowdiagram', component: './Operation/ProcessFlowDiagram' },
            /* 运维大事记 */
            { path: '/operation/ywdsjlist', component: './Operation/ywdsjlist' },
            /* 智能运维-维修记录 */
            { path: '/operation/RepairHistoryRecords', component: './Operation/RepairHistoryRecords' },
            /* 智能运维-停机记录 */
            { path: '/operation/StopCemsListHistoryRecords', component: './Operation/StopCemsListHistoryRecords' },
            /* 智能运维-易耗品记录 */
            { path: '/operation/CounterControlCommandHistoryRecords', component: './Operation/CounterControlCommandHistoryRecords' },
            /* 智能运维-标气记录 */
            { path: '/operation/StandardGasHistoryRecords', component: './Operation/StandardGasHistoryRecords' },
            /* 智能运维-巡检记录 */
            { path: '/operation/InspectionHistoryRecords', component: './Operation/InspectionHistoryRecords' },
            /* 校准记录 */
            { path: '/qualitycontrol/jzhistoryrecords', component: './Operation/JzHistoryRecords' },
            /* 比对监测记录 */
            { path: '/qualitycontrol/BdHistoryInfoHistoryRecords', component: './Operation/BdHistoryInfoHistoryRecords' },
            /* 数据异常记录 */
            { path: '/qualitycontrol/deviceexceptionlisthistoryrecords', component: './Operation/DeviceExceptionListHistoryRecords' },


            /* 传输有效率 */
            { path: '/qualitycontrol/transmissionefficiency', component: './QualityControl/TransmissionEfficiency' },
            /* 设备运转率 */
            { path: '/qualitycontrol/equipmentoperatingrate', component: './QualityControl/EquipmentOperatingRate' },
            /* 月度排放量分析 */
            { path: '/analysis/pollutantemissions', component: './Analysis/PollutantEmissions' },
            /* 报警及时响应统计分析 */
            { path: '/analysis/alarmresponse', component: './Analysis/AlarmResponse' },

            /* 报警排口分析 */
            { path: '/analysis/overpointlist', component: './Analysis/OverPointList' },
            /* 自行监测报告 */
            {
                path: '/selfmonitor/selfmonitorreport', component: './Analysis/MonitoringReport'
                //,routes:[
                /* 监测报告 */
                // {path:'/analysis/selfmonitorreport/:pdfname',component:'./Analysis/PdfShow'}]
            },
            /* 手工数据上传 */
            { path: '/selfmonitor/manualupload', component: './Analysis/ManualUpload' },


            /* 基本信息管理 */
            { path: '/sysmanage/entoperation', component: './EnterpriseInfo' },
            /* 排污许可证 */
            { path: '/sysmanage/emissionpermits', component: './EmissionPermits' },
            /* 排口信息管理 */
            { path: '/sysmanage/pointinfo', component: './PointInfo' },

            /* 排口信息管理=排口管理 */
            { path: '/sysmanage/pointdetail/:DGIMN/:PollutantType/:Add', component: './PointInfo/AddPoint' },
            /* 排口信息管理=排口管理 */
            { path: '/sysmanage/pointdetail/:DGIMN/:Name/:PollutantType/:Add', component: './PointInfo/PointView' },
            /* 用户基本信息管理 */
            { path: '/sysmanage/userinfo', component: './Userinfo' },

            /* 用户基本信息管理-用户基本管理 */
            { path: '/sysmanage/userdetail/:UserId', component: './Userinfo/AddUser' },

            /* 用户基本信息管理-备品备件管理 */
            { path: '/sysmanage/spareparts', component: './Administration/SparePart' },

            /* 用户基本信息管理-标气管理 */
            { path: '/sysmanage/standardgas', component: './Administration/StandardGas' },

            /* 用户基本信息管理-手持设备管理 */
            { path: '/sysmanage/cbfftestequipment', component: './Administration/CbFfTestEquipment' },
            /* 系统管理-知识库管理 */
            { path: '/sysmanage/KBM', component: './Administration/KBM' },

            /* 用户基本信息管理-标准库管理 */
            { path: '/sysmanage/usestandardlibrary/:DGIMN/:PointName', component: './StandardLibrary/UseStandardLibrary' },
            /* 用户基本信息管理-停产管理 */
            { path: '/sysmanage/stopmanagement/:DGIMN/:PointName', component: './StopManagement/Content' },
            /* 用户基本信息管理-视频管理 */
            { path: '/sysmanage/videolists/:pointcode/:pointname', component: './PointInfo/VideoList' },

            /* 标准库管理 */
            { path: '/sysmanage/standardlibrary', component: './StandardLibrary' },

            /* 标准库管理-维护 */
            { path: '/sysmanage/standardlibrarydetail/:StandardLibraryID', component: './StandardLibrary/AddStandardLibrary' },
            /* 个人设置-维护 */
            {
                path: '/account/settings',
                name: 'settings',
                component: './Account/Settings/Info',
                routes: [
                    {
                        path: '/account/settings',
                        redirect: '/account/settings/base',
                    },
                    {
                        path: '/account/settings/base',
                        component: './Account/Settings/BaseView',
                    },
                    {
                        path: '/account/settings/security',
                        component: './Account/Settings/SecurityView',
                    },
                    {
                        path: '/account/settings/mymessagelist',
                        component: './Account/Settings/MyMessageList',
                    },
                    {
                        path: '/account/settings/mypielist',
                        component: './Account/Settings/MyPieList',
                    },
                ],
            },

            {
                component: '404',
            },
        ],
    },
];
