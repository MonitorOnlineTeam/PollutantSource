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
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
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
      { path: '/pointdetail/:pointcode', component: './PointDetail',routes:[
        /* 默认 */
        { path: '/pointdetail/:pointcode', redirect: '/pointdetail/:pointcode/processflowdiagram' },
           /* 工艺流程图 */
          { path: '/pointdetail/:pointcode/processflowdiagram', component: './PointDetail/ProcessFlowDiagram' },
          /* 数据查询 */
          { path: '/pointdetail/:pointcode/dataquery', component: './PointDetail/DataQuery' },
          /* 报警数据查询 */
          { path: '/pointdetail/:pointcode/alarmrecord', component: './PointDetail/AlarmRecord' },
          /* 实时视频 */
          { path: '/pointdetail/:pointcode/realvideo', component: './PointDetail/RealVideo' },
          /* 历史视频 */
          { path: '/pointdetail/:pointcode/hisvideo', component: './PointDetail/HisVideo' },
          /* 运维大事记 */
          { path: '/pointdetail/:pointcode/ywdsjlist', component: './PointDetail/Ywdsjlist' },
          /* 运维大事记-详情 */
          { path: '/pointdetail/:pointcode/emergencydetailinfo/:TaskID', component: './EmergencyTodoList/EmergencyDetailInfo' },

           /* 运维大事记-停机记录 */
           { path: '/pointdetail/:pointcode/StopCemsInfo/:TaskID/:TypeID', component: './EmergencyTodoList/StopCemsInfo' },
             /* 运维大事记-停机历史记录 */
             { path: '/pointdetail/:pointcode/qcontrollist/StopCemsListHistoryRecords/:TypeID', component: './EmergencyTodoList/StopCemsListHistoryRecords' },
          /* 运维大事记-维修记录 */
           { path: '/pointdetail/:pointcode/RepairRecordDetail/:TaskID/:TypeID', component: './EmergencyTodoList/RepairRecordDetail' },
           /* 运维大事记-维修历史记录记录 */
           { path: '/pointdetail/:pointcode/qcontrollist/RepairHistoryRecords/:TypeID', component: './EmergencyTodoList/RepairHistoryRecords' },
             /* 运维大事记-易耗品记录 */
           { path: '/pointdetail/:pointcode/ConsumablesReplaceRecord/:TaskIds/:TypeIDs', component: './EmergencyTodoList/ConsumablesReplaceRecord' },
              /* 运维大事记-易耗品历史记录 */
           { path: '/pointdetail/:pointcode/qcontrollist/CounterControlCommandHistoryRecords/:TypeID', component: './EmergencyTodoList/CounterControlCommandHistoryRecords' },
             /* 运维大事记-标气更换记录 */
          { path: '/pointdetail/:pointcode/StandardGasRepalceRecord/:StandardGasTaskIds/:StandardGasTypeIDs', component: './EmergencyTodoList/StandardGasRepalceRecord' },
               /* 运维大事记-标气更换历史记录 */
           { path: '/pointdetail/:pointcode/qcontrollist/StandardGasHistoryRecords/:TypeID', component: './EmergencyTodoList/StandardGasHistoryRecords' },
            /* 运维大事记-完全抽取法CEMS记录 */
            { path: '/pointdetail/:pointcode/CompleteExtraction/:TaskID/:TypeID', component: './EmergencyTodoList/CompleteExtraction' },
           /* 运维大事记-完全抽取法CEMS历史记录 */
           { path: '/pointdetail/:pointcode/qcontrollist/WQCQFInspectionHistoryRecords/:TypeID', component: './EmergencyTodoList/WQCQFInspectionHistoryRecords' },
           /* 运维大事记-稀释采样法CEMS记录 */  
           { path: '/pointdetail/:pointcode/DilutionSampling/:CyfPatrolTaskIds/:CyfPatrolTypeIDs', component: './EmergencyTodoList/DilutionSampling' },
           /* 运维大事记-稀释采样法CEMS历史记录 */
           { path: '/pointdetail/:pointcode/qcontrollist/XSCYFInspectionHistoryRecords/:TypeID', component: './EmergencyTodoList/XSCYFInspectionHistoryRecords' },
           /* 运维大事记-直接测量法CEMS记录 */
           { path: '/pointdetail/:pointcode/DirectMeasurement/:ClfPatrolTaskIds/:ClfPatrolTypeIDs', component: './EmergencyTodoList/DirectMeasurement' },
           /* 运维大事记-直接测量法CEMS历史记录 */
           { path: '/pointdetail/:pointcode/qcontrollist/ZZCLFInspectionHistoryRecords/:TypeID', component: './EmergencyTodoList/ZZCLFInspectionHistoryRecords' },
           /* 运维大事记-校准记录 */
           { path: '/pointdetail/:pointcode/JzRecordInfo/:TaskID/:TypeID', component: './EmergencyTodoList/JzRecordInfo' },
           /* 运维大事记-校准历史记录 */
           { path: '/pointdetail/:pointcode/qcontrollist/JzHistoryRecords/:TypeID', component: './EmergencyTodoList/JzHistoryRecords' },

            /* 运维大事记-比对监测历史记录 */
            { path: '/pointdetail/:pointcode/qcontrollist/BdHistoryInfoHistoryRecords/:TypeID', component: './EmergencyTodoList/BdHistoryInfoHistoryRecords' },
            /* 运维大事记-异常记录 */
            { path: '/pointdetail/:pointcode/DeviceExceptionDetail/:TaskID/:TypeID', component: './EmergencyTodoList/DeviceExceptionDetail' },
            /* 运维大事记-异常历史记录 */
            { path: '/pointdetail/:pointcode/qcontrollist/DeviceExceptionListHistoryRecords/:TypeID', component: './EmergencyTodoList/DeviceExceptionListHistoryRecords' },

          




          /* 质控记录 */
          { path: '/pointdetail/:pointcode/qcontrollist', component: './PointDetail/QControllist',routes:[
             /* 默认 */
          { path: '/pointdetail/:pointcode/qcontrollist', redirect: '/pointdetail/:pointcode/qcontrollist/RepairHistoryRecords' },
             /* 维修记录 */
          { path: '/pointdetail/:pointcode/qcontrollist/RepairHistoryRecords', component: './EmergencyTodoList/RepairHistoryRecords' },
          /* 停机记录 */
          { path: '/pointdetail/:pointcode/qcontrollist/StopCemsListHistoryRecords', component: './EmergencyTodoList/StopCemsListHistoryRecords' },
          /* 易耗品记录 */
          { path: '/pointdetail/:pointcode/qcontrollist/CounterControlCommandHistoryRecords', component: './EmergencyTodoList/CounterControlCommandHistoryRecords' },
          /* 标气记录 */
          { path: '/pointdetail/:pointcode/qcontrollist/StandardGasHistoryRecords', component: './EmergencyTodoList/StandardGasHistoryRecords' },
          /* 校准记录 */
          { path: '/pointdetail/:pointcode/qcontrollist/JzHistoryRecords', component: './EmergencyTodoList/JzHistoryRecords' },
          /* 比对监测记录 */
          { path: '/pointdetail/:pointcode/qcontrollist/BdHistoryInfoHistoryRecords', component: './EmergencyTodoList/BdHistoryInfoHistoryRecords' },
          /* 数据异常记录 */
          { path: '/pointdetail/:pointcode/qcontrollist/DeviceExceptionListHistoryRecords', component: './EmergencyTodoList/DeviceExceptionListHistoryRecords' },
          /* 完全抽取法巡检记录 */
          { path: '/pointdetail/:pointcode/qcontrollist/WQCQFInspectionHistoryRecords', component: './EmergencyTodoList/WQCQFInspectionHistoryRecords' },
          /* 稀释采样巡检记录 */
          { path: '/pointdetail/:pointcode/qcontrollist/XSCYFInspectionHistoryRecords', component: './EmergencyTodoList/XSCYFInspectionHistoryRecords' },
          /* 直接采样法巡检记录 */
          { path: '/pointdetail/:pointcode/qcontrollist/ZZCLFInspectionHistoryRecords', component: './EmergencyTodoList/ZZCLFInspectionHistoryRecords' },
          
          ] },
      ] },
        
/* 传输有效率 */
{ path: '/qualitycontrol/transmissionefficiency', component: './QualityControl/TransmissionEfficiency' },
/* 设备运转率 */
{ path: '/qualityControl/equipmentoperatingrate', component: './QualityControl/EquipmentOperatingRate' },
/* 月度排放量分析 */
{ path: '/analysis/pollutantemissions', component: './Analysis/PollutantEmissions' },
/* 报警及时响应统计分析 */
{ path: '/analysis/alarmresponse', component: './Analysis/AlarmResponse' },      





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
   

 /* 用户基本信息管理-标准库管理 */
 { path: '/sysmanage/usestandardlibrary/:DGIMN/:PointName', component: './StandardLibrary/UseStandardLibrary' },
   /* 用户基本信息管理-停产管理 */
 { path: '/sysmanage/stopmanagement/:DGIMN/:PointName', component: './StopManagement/Content' },
      /* 用户基本信息管理-视频管理 */
 { path: '/sysmanage/VideoLists/:pointcode/:pointname', component: './PointInfo/VideoList' },

     /* 标准库管理 */
     { path: '/sysmanage/standardlibrary', component: './StandardLibrary' },

  /* 标准库管理-维护 */
  { path: '/sysmanage/standardlibrarydetail/:StandardLibraryID', component: './StandardLibrary/AddStandardLibrary' },

 
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
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
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
