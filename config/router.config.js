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
    // app
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/homepage' },
            /* 主页 */
            {
                path:'/homepage',component: './HomePage',
            },
            /* 工作台 */
            {
                path:'/workbench',component: './SpecialWorkbench',
            },
            /* 数据一览 */
            { path: '/overview/datalistview', component: './OverView/DataList' },
            /* 地图一览 */
            { path: '/overview/mapview', component: './OverView/index' },
            /* 点位详情 */
            { path: '/pointdetail/:pointcode/:viewtype', component: './PointDetail',routes:[
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
                { path: '/pointdetail/:pointcode/:viewtype/qcontrollist', component: './PointDetail/QControllist',routes:[
                    /* 默认 */
                    { path: '/pointdetail/:pointcode/:viewtype/qcontrollist', redirect: '/pointdetail/:pointcode/:viewtype/qcontrollist/RepairHistoryRecords' },
                    /* 维修记录 */
                    { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/RepairHistoryRecords', component: './EmergencyTodoList/RepairHistoryRecords' },
                    /* 停机记录 */
                    { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/StopCemsListHistoryRecords', component: './EmergencyTodoList/StopCemsListHistoryRecords' },
                    /* 易耗品记录 */
                    { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/CounterControlCommandHistoryRecords', component: './EmergencyTodoList/CounterControlCommandHistoryRecords' },
                    /* 标气记录 */
                    { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/StandardGasHistoryRecords', component: './EmergencyTodoList/StandardGasHistoryRecords' },
                    /* 校准记录 */
                    { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/JzHistoryRecords', component: './EmergencyTodoList/JzHistoryRecords' },
                    /* 比对监测记录 */
                    { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/BdHistoryInfoHistoryRecords', component: './EmergencyTodoList/BdHistoryInfoHistoryRecords' },
                    /* 数据异常记录 */
                    { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/DeviceExceptionListHistoryRecords', component: './EmergencyTodoList/DeviceExceptionListHistoryRecords' },
                    /* 完全抽取法巡检记录 */
                    { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/WQCQFInspectionHistoryRecords', component: './EmergencyTodoList/WQCQFInspectionHistoryRecords' },
                    /* 稀释采样巡检记录 */
                    { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/XSCYFInspectionHistoryRecords', component: './EmergencyTodoList/XSCYFInspectionHistoryRecords' },
                    /* 直接采样法巡检记录 */
                    { path: '/pointdetail/:pointcode/:viewtype/qcontrollist/ZZCLFInspectionHistoryRecords', component: './EmergencyTodoList/ZZCLFInspectionHistoryRecords' },

                ] },
            ] },

            /* 任务详情 */
            { path: '/TaskDetail/EmergencyDetailInfo/:viewtype/:taskfrom/:TaskID', component: './EmergencyTodoList/EmergencyDetailInfo' },
            /* 停机记录 */
            { path: '/PatrolForm/StopCemsInfo/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/StopCemsInfo' },
            /* 维修记录 */
            { path: '/PatrolForm/RepairRecordDetail/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/RepairRecordDetail' },
            /* 易耗品记录 */
            { path: '/PatrolForm/ConsumablesReplaceRecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskIds', component: './EmergencyTodoList/ConsumablesReplaceRecord' },
            /* 标气更换记录 */
            { path: '/PatrolForm/StandardGasRepalceRecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:StandardGasTaskIds', component: './EmergencyTodoList/StandardGasRepalceRecord' },
            /* 完全抽取法CEMS记录 */
            { path: '/PatrolForm/CompleteExtraction/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/CompleteExtraction' },
            /* 稀释采样法CEMS记录 */
            { path: '/PatrolForm/DilutionSampling/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:CyfPatrolTaskIds', component: './EmergencyTodoList/DilutionSampling' },
            /* 直接测量法CEMS记录 */
            { path: '/PatrolForm/DirectMeasurement/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:ClfPatrolTaskIds', component: './EmergencyTodoList/DirectMeasurement' },
            /* 校准记录 */
            { path: '/PatrolForm/JzRecordInfo/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID/', component: './EmergencyTodoList/JzRecordInfo' },
            /* 比对监测记录 */
            { path: '/PatrolForm/BdTestRecord/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/BdTestRecord' },
            /* 异常记录 */
            { path: '/PatrolForm/DeviceExceptionDetail/:pointcode/:viewtype/:taskfrom/:histroyrecordtype/:TaskID', component: './EmergencyTodoList/DeviceExceptionDetail' },

            /* 传输有效率 */
            { path: '/qualitycontrol/transmissionefficiency', component: './QualityControl/TransmissionEfficiency' },
            /* 设备运转率 */
            { path: '/qualityControl/equipmentoperatingrate', component: './QualityControl/EquipmentOperatingRate' },
            /* 手工数据上传 */
            { path: '/qualityControl/ManualUpload', component: './QualityControl/ManualUpload' },
            /* 月度排放量分析 */
            { path: '/analysis/pollutantemissions', component: './Analysis/PollutantEmissions' },
            /* 报警及时响应统计分析 */
            { path: '/analysis/alarmresponse', component: './Analysis/AlarmResponse' },

            /* 报警排口分析 */
            { path: '/analysis/overpointlist', component: './Analysis/OverPointList' },
            /* 自行监测报告 */
            { path: '/analysis/selfmonitorreport', component: './Analysis/MonitoringReport'
                //,routes:[
                /* 监测报告 */
                // {path:'/analysis/selfmonitorreport/:pdfname',component:'./Analysis/PdfShow'}]
            },


            /* 基本信息管理 */
            { path: '/sysmanage/entoperation', component: './EnterpriseInfo' },
            /* 排污许可证 */
            { path: '/sysmanage/emissionpermits', component: './EmissionPermits' },
            /* 排口信息管理 */
            { path: '/sysmanage/pointinfo', component: './PointInfo' },

            /* 排口信息管理=排口管理 */
            { path: '/sysmanage/pointdetail/:DGIMN', component: './PointInfo/AddPoint' },
            /* 排口信息管理=排口管理 */
            { path: '/sysmanage/pointdetail/:DGIMN/:Name', component: './PointInfo/PointView' },
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


            /* 用户基本信息管理-标准库管理 */
            { path: '/sysmanage/usestandardlibrary/:DGIMN/:PointName', component: './StandardLibrary/UseStandardLibrary' },
            /* 用户基本信息管理-停产管理 */
            { path: '/sysmanage/stopmanagement/:DGIMN/:PointName', component: './StopManagement/Content' },
            /* 用户基本信息管理-视频管理 */
            { path: '/sysmanage/VideoLists/:pointcode/:pointname', component: './PointInfo/VideoList' },

            /* 标准库管理 */
            { path: '/sysmanage/standardlibrary', component: './StandardLibrary' },

            /* 标准库管理-维护 */
            { path: '/sysmanage/standardlibrarydetail/:StandardLibraryID', component: './StandardLibrary/AddStandardLibrary'},
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
