// 污染源类型
export const EnumPollutantTypeCode = {
    WATER: 1, // 废水
    GAS: 2, // 废气
    NOISE: 3, // 噪声
    AIR: 5, // 环境质量
    WATERQUALITY: 6, // 水质
    MINISTATION: 8, // 小型站
    STENCH: 9, // 恶臭
    VOC: 10, // voc
    WORKINGCONDITION: 11, // 工况
    Dust: 12, // 扬尘
    ParticulateMatter: 18, // 颗粒物
    CountryControl: 23, // 国控
    ProvinceControl: 24, // 省控
    CityControl: 25, // 市控

};

// 码表大类
export const EnumCatogratory = {
    MonitorObject: 1, // 监控对象
    AlarmType: 2, // 报警类别
    PropellingAlarmSourceType: 3, // 报警来源类别
    DynamicControlState: 4, // 动态管控状态
    PointState: 5, // 点位状态
    LiuliangUnit: 8, // 流量单位
    PailiangUnit: 9, // 排量单位
    ExceptionType: 10, // 异常类别
    PatrolCheckState: 14, // 运维任务单审核状态
    PatrolTaskType: 15, // 运维任务类型
    MonitoringType: 16, // 监测值类型
    RequstResult: 17, // 接口调用返回状态

};
// 监控对象
export const EnumMonitorObject = {
    T_Bas_Enterprise: 1, // 企业

};
// 报警类别
export const EnumAlarmType = {
    NoAlarm: 0, // 无报警
    UpperAlarm: 1, // 上限报警
    LowerAlarm: 2, // 下限报警
    AreaAlarm: 3, // 区间报警

};
// 报警来源类别
export const EnumPropellingAlarmSourceType = {
    DataException: 0, // 数据异常报警
    DYPARAMETER: 1, // 动态管控参数异常推送
    DataOver: 2, // 数据超标报警
    DYSTATEALARM: 3, // 动态管控状态异常推送
    DataLoss: 4, // 数据缺失
    Audit: 5, // 流程审核
    AuditBackToPatrol: 6, // 巡检任务
    AuditBackToException: 7, // 故障任务
    AuditBackToPollutantDataVerify: 8, // 监测数据核实
    ManualAddException: 9, // 故障派单核实
    Operation: 10, // 巡检通知
    Malfunction: 11, // 故障通知
    ThreeLevelInfo: 12, // 监测数据
    WaitCreatePatrolTask: 13, // 待创建巡检任务

};
// 动态管控状态
export const EnumDynamicControlState = {

};
// 点位状态
export const EnumPointState = {
    OffLine: 0, // 离线
    OnLine: 1, // 在线
    OverLine: 2, // 超标
    ExceptLine: 3, // 异常

};
// 流量单位
export const EnumLiuliangUnit = {
    LiFangMi: 1, // 立方米
    WangLiFangMi: 2, // 万立方米

};
// 排量单位
export const EnumPailiangUnit = {
    ug: 1, // 微克
    mg: 2, // 毫克
    g: 3, // 克
    kg: 5, // 千克
    t: 6, // 吨

};
// 异常类别
export const EnumExceptionType = {
    ZERO: 1, // 0值异常
    SERIES: 2, // 连续值异常
    OUTLIMIT: 3, // 超限异常
    DYPARAMETER: 4, // 动态管控参数异常
    DYSTATE: 6, // 动态管控状态异常

};
// 运维任务单审核状态
export const EnumPatrolCheckState = {
    Checking: 0, // 正在审核
    FailCheck: 1, // 未通过
    SuccessCheck: 2, // 审核通过
    UnCheck: 3, // 未审核

};
// 运维任务类型
export const EnumPatrolTaskType = {
    PatrolTask: 1, // 巡检任务
    ExceptionTask: 2, // 故障任务

};
// 监测值类型
export const EnumMonitoringType = {
    OriginalValue: 0, // 原始值
    CorrectedValue: 1, // 修正值

};
// 接口调用返回状态
export const EnumRequstResult = {
    AuthenticationFailure: -1, // 身份验证失败
    Fail: 0, // 失败
    Success: 1, // 成功
    Exception: 2, // 发生异常
};
