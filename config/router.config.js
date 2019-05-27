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
            { path: '/appoperation/apprepairrecord/:TaskID/:TypeID', component: './AppOperation/AppRepairRecord' },
            /* 停机记录 */
            { path: '/appoperation/appstopcemsrecord/:TaskID/:TypeID', component: './AppOperation/AppStopCemsRecord' },
            /* 易耗品更换记录 */
            { path: '/appoperation/appconsumablesreplacerecord/:TaskID/:TypeID', component: './AppOperation/AppConsumablesReplaceRecord' },
            /* 标气更换记录 */
            { path: '/appoperation/appstandardgasrepalcerecord/:TaskID/:TypeID', component: './AppOperation/AppStandardGasRepalceRecord' },
            /* 完全抽取法CEMS巡检记录表 */
            { path: '/appoperation/appcompleteextractionrecord/:TaskID/:TypeID', component: './AppOperation/AppCompleteExtractionRecord' },
            /* 稀释采样法CEMS巡检记录表 */
            { path: '/appoperation/appdilutionsamplingrecord/:TaskID/:TypeID', component: './AppOperation/AppDilutionSamplingRecord' },
            /* 直接测量法CEMS巡检记录表 */
            { path: '/appoperation/appdirectmeasurementrecord/:TaskID/:TypeID', component: './AppOperation/AppDirectMeasurementRecord' },
            /* CEMS零点量程漂移与校准记录表记录表 */
            { path: '/appoperation/appjzrecord/:TaskID/:TypeID', component: './AppOperation/AppJzRecord' },
            /* CEMS校验测试记录 */
            { path: '/appoperation/appbdtestrecord/:TaskID/:TypeID', component: './AppOperation/AppBdTestRecord' },
            /* CEMS设备异常记录表 */
            { path: '/appoperation/appdeviceexceptionrecord/:TaskID/:TypeID', component: './AppOperation/AppDeviceExceptionRecord' },
        ],
    },
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/EnterpriseManager' },
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
            /* 监控地图 */
            { path: '/overview/mapentview', component: './OverView/EntMapIndex' },
            /* 点位详情 */
            {
                path: '/pointdetail/:pointcode/:viewtype', component: './PointDetail', routes: [
                    /* 默认 */
                    { path: '/pointdetail/:pointcode/:viewtype/:EntCode', redirect: '/pointdetail/:pointcode/:viewtype/:EntCode/processflowdiagram' },
                    /* 工艺流程图 */
                    { path: '/pointdetail/:pointcode/:viewtype/:EntCode/processflowdiagram', component: './PointDetail/ProcessFlowDiagram' },
                    /* 数据查询 */
                    { path: '/pointdetail/:pointcode/:viewtype/dataquery/:EntCode', component: './PointDetail/DataQuery' },
                    /* 报警数据查询 */
                    { path: '/pointdetail/:pointcode/:viewtype/alarmrecord/:EntCode', component: './PointDetail/AlarmRecord' },
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
                            { path: '/pointdetail/:pointcode/:viewtype/qcontrollist', redirect: '/pointdetail/:pointcode/:viewtype/qcontrollist/JzHistoryList' },
                            /* 校准记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/jzhistorylist', component: './EmergencyTodoList/JzHistoryList' },
                            /* 比对监测记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/bdtesthistorylist', component: './EmergencyTodoList/BdTestHistoryList' },
                            /* 数据异常记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/deviceexceptionhistorylist', component: './EmergencyTodoList/DeviceExceptionHistoryList' },
                        ]
                    },
                    /* 运维记录 */
                    {
                        path: '/pointdetail/:pointcode/:viewtype/operationlist', component: './PointDetail/Operationlist', routes: [
                            /* 默认 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist', redirect: '/pointdetail/:pointcode/:viewtype/operationlist/RepairHistoryList' },
                            /* 维修记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist/repairhistorylist', component: './EmergencyTodoList/RepairHistoryList' },
                            /* 停机记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist/stopcemshistorylist', component: './EmergencyTodoList/StopCemsHistoryList' },
                            /* 易耗品记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist/consumablesreplacehistorylist', component: './EmergencyTodoList/ConsumablesReplaceHistoryList' },
                            /* 标气记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist/standardgasrepalcehistorylist', component: './EmergencyTodoList/StandardGasRepalceHistoryList' },
                            /* 完全抽取法巡检记录 */
                            { path: '/pointdetail/:pointcode/:viewtype/operationlist/wqcqfinspectionhistorylist', component: './EmergencyTodoList/WQCQFInspectionHistoryList' },
                            // /* 稀释采样巡检记录 */
                            // { path: '/pointdetail/:pointcode/:viewtype/operationlist/xscyfinspectionhistorylist', component: './EmergencyTodoList/XSCYFInspectionHistoryList' },
                            // /* 直接采样法巡检记录 */
                            // { path: '/pointdetail/:pointcode/:viewtype/operationlist/zzclfinspectionhistorylist', component: './EmergencyTodoList/ZZCLFInspectionHistoryList' },

                        ]
                    },
                ]
            },

            /* 任务详情 */
            { path: '/taskdetail/emergencydetailinfolayout/:viewtype/:taskfrom/:TaskID/:DGIMN', component: './EmergencyTodoList/EmergencyDetailInfoLayout' },
            /* 停机记录 */
            { path: '/patrolform/stopcemsrecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/StopCemsRecord' },
            /* 维修记录 */
            { path: '/patrolForm/repairrecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/RepairRecord' },
            /* 易耗品记录 */
            { path: '/patrolform/consumablesreplacerecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/ConsumablesReplaceRecord' },
            /* 标气更换记录 */
            { path: '/patrolform/standardgasrepalcerecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/StandardGasRepalceRecord' },
            /* 完全抽取法CEMS记录 */
            { path: '/patrolform/completeextractionrecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/CompleteExtractionRecord' },
            /* 稀释采样法CEMS记录 */
            { path: '/patrolform/dilutionsamplingrecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/DilutionSamplingRecord' },
            /* 直接测量法CEMS记录 */
            { path: '/patrolform/directmeasurementrecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/DirectMeasurementRecord' },
            /* 校准记录 */
            { path: '/patrolform/jzrecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID/', component: './EmergencyTodoList/JzRecord' },
            /* 比对监测记录 */
            { path: '/patrolform/bdtestrecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/BdTestRecord' },
            /* 异常记录 */
            { path: '/patrolform/deviceexceptionrecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/DeviceExceptionRecord' },


            //一级菜单
            /* 运维日历 */
            { path: '/operation/operationcalendar', component: './Operation/OperationCalendar' },
            /* 工艺流程图 */
            { path: '/operation/processflowdiagram', component: './Operation/ProcessFlowDiagram' },
            /* 运维大事记 */
            { path: '/operation/ywdsjlist', component: './Operation/ywdsjlist' },
            /* 智能运维-维修记录 */
            { path: '/operation/repairhistorylist', component: './Operation/RepairHistoryList' },
            /* 智能运维-停机记录 */
            { path: '/operation/stopcemshistorylist', component: './Operation/StopCemsHistoryList' },
            /* 智能运维-易耗品记录 */
            { path: '/operation/consumablesreplacehistorylist', component: './Operation/ConsumablesReplaceHistoryList' },
            /* 智能运维-标气记录 */
            { path: '/operation/standardgasrepalcehistorylist', component: './Operation/StandardGasRepalceHistoryList' },
            /* 智能运维-巡检记录 */
            { path: '/operation/inspectionhistorylist', component: './Operation/InspectionHistoryList' },
            /* 校准记录 */
            { path: '/qualitycontrol/jzhistorylist', component: './Operation/JzHistoryList' },
            /* 比对监测记录 */
            { path: '/qualitycontrol/bdtesthistorylist', component: './Operation/BdTestHistoryList' },
            /* 数据异常记录 */
            { path: '/qualitycontrol/deviceexceptionhistorylist', component: './Operation/DeviceExceptionHistoryList' },


            /* 传输有效率 */
            { path: '/qualitycontrol/transmissionefficiency', component: './QualityControl/TransmissionEfficiencyCommon' },

            /* 传输有效率 */
            { path: '/qualitycontrol/pointtransmissionefficiency/:entcode/:entname', component: './QualityControl/TransmissionEfficiency' },

            /* 设备运转率 */
            { path: '/qualitycontrol/equipmentoperatingrate', component: './QualityControl/EquipmentOperatingRateCommon' },
            /* 排口设备运转率 */
            { path: '/qualitycontrol/pointequipmentoperatingrate/:entcode/:entname', component: './QualityControl/EquipmentOperatingRate' },
            /* 月度企业排放量分析 */
            { path: '/analysis/pollutantemissions', component: './Analysis/PollutantEmissionsCommon' },

            /* 月度企业排放量分析 */
            { path: '/analysis/pollutantemissionspoint/:entcode/:entname', component: './Analysis/PollutantEmissions' },

            /* 企业报警及时响应统计分析 */
            { path: '/analysis/alarmresponse', component: './Analysis/AlarmResponseCommon' },

            /* 排口报警及时响应统计分析 */
            { path: '/analysis/pointalarmresponse/:entcode/:entname', component: './Analysis/AlarmResponse' },
            
            /* 超标排口分析（第一版选项卡格式的，目前注释，页面存在） */
            // { path: '/analysis/overpointlist', component: './Analysis/OverPointList' },

            /* 超标企业分析（第二版图表格式） */
            { path: '/analysis/overresponse', component: './Analysis/OverResponseCommon' },

             /* 超标排口分析（第二版图表格式） */
             { path: '/analysis/overpointlist/:entcode/:entname', component: './Analysis/OverPointListAndChart' },

            /* 自行监测报告 */
            {
                path: '/selfmonitor/selfmonitorreport', component: './Analysis/MonitoringReport'
                //,routes:[
                /* 监测报告 */
                // {path:'/analysis/selfmonitorreport/:pdfname',component:'./Analysis/PdfShow'}]
            },
            /* 手工数据上传 */
            { path: '/selfmonitor/manualupload', component: './Analysis/ManualUpload' },

            /* 使用文档 */
            {
                path: '/selfmonitor/documentation', component: './Analysis/Documentation'
            },
            /* 基本信息管理 */
            { path: '/sysmanage/entoperation', component: './EnterpriseInfo/EntCommon' },
            /* 基本信息管理(所有企业修改、添加) */
            { path: '/BasicInfo/enterprisemanageedit/:ID/:Detail', component: '../components/GetAllEnterprise/Edit' },
            /* 基本信息管理[微信小程序专用] */
            { path: '/EnterpriseManager', component: './EnterpriseInfo/EnterpriseManager' },
            /* 企业管理-添加 */
            { path: '/EnterpriseManager/:EntCode', component: '../components/EnterpriseInfo/AddEnterprise' },
            /* 排污许可证 */
            { path: '/sysmanage/emissionpermits', component: './EmissionPermits' },
            /* 监测点信息管理 */
            { path: '/sysmanage/pointinfo', component: './PointInfo' },
            /* 企业管理-【排口管理】- */
            { path: '/sysmanage/pointinfo/:EntCode', component: './PointInfo' },

            /* 排口信息管理=排口管理 */
            { path: '/sysmanage/pointdetail/:DGIMN/:PollutantType/:Add/:EntCode', component: './PointInfo/AddPoint' },
            /* 排口信息管理=排口管理 */
            { path: '/sysmanage/pointdetail/:DGIMN/:Name/:PollutantType/:Add/:EntCode', component: './PointInfo/PointView' },
            /* 用户基本信息管理 */
            { path: '/userinfo', component: './Userinfo' },

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
            /* 系统管理-意见反馈 */
            { path: '/feedback', component: './Administration/FeedBack' },
            /* 用户基本信息管理-标准库管理 */
            { path: '/sysmanage/usestandardlibrary/:DGIMN/:PointName/:EntCode', component: './StandardLibrary/UseStandardLibrary' },
            /* 用户基本信息管理-停产管理 */
            { path: '/sysmanage/stopmanagement/:DGIMN/:PointName/:EntCode', component: './StopManagement/Content' },
            /* 用户基本信息管理-视频管理 */
            { path: '/sysmanage/videolists/:pointcode/:pointname/:EntCode', component: './PointInfo/VideoList' },

            /* 标准库管理 */
            { path: '/sysmanage/standardlibrary', component: './StandardLibrary' },

            /* 标准库管理-添加 */
            { path: '/sysmanage/standardlibrary/add', component: './StandardLibrary/AddStandardLibrary' },
            /* 标准库管理-维护 */
            { path: '/sysmanage/standardlibraryedit/:StandardLibraryID', component: './StandardLibrary/EditStandardLibrary' },
            /* 标准库管理-维护 */
            { path: '/sysmanage/StandardLibraryDetail/:StandardLibraryID', component: './StandardLibrary/StandardLibraryDetail' },
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
