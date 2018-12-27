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
          { path: '/pointdetail/:pointcode/ywdsjlist', component: './PointDetail/ywdsjlist' },
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

/* 报警排口分析 */
{ path: '/analysis/overpointlist', component: './Analysis/OverPointList' },      
/* 自行监测报告 */
{ path: '/analysis/selfmonitorreport', component: './Analysis/MonitoringReport',routes:[
  {path:'/analysis/selfmonitorreport/:pdfname/pdfshow',component:'./Analysis/PdfShow'}
] },  


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
  { path: '/sysmanage/standardlibrarydetail/:StandardLibraryID', component: './StandardLibrary/AddStandardLibrary'},

   
      {
        component: '404',
      },
    ],
  },
];
