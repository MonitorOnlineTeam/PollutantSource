import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
    // eslint-disable-next-line
  !app._models.some(({
        namespace,
    }) => {
        return namespace === model.substring(model.lastIndexOf('/') + 1);
    })
);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
    // () => require('module')
    // transformed by babel-plugin-dynamic-import-node-sync
    if (component.toString().indexOf('.then(') < 0) {
        models.forEach((model) => {
            if (modelNotExisted(app, model)) {
                // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
            }
        });
        return (props) => {
            if (!routerDataCache) {
                routerDataCache = getRouterData(app);
            }
            return createElement(component().default, {
                ...props,
                routerData: routerDataCache,
            });
        };
    }
    // () => import('module')
    return dynamic({
        app,
        models: () => models.filter(
            model => modelNotExisted(app, model)).map(m =>
      import(`../models/${m}.js`)
        ),
        // add routerData prop
        component: () => {
            if (!routerDataCache) {
                routerDataCache = getRouterData(app);
            }
            return component().then((raw) => {
                const Component = raw.default || raw;
                return props => createElement(Component, {
                    ...props,
                    routerData: routerDataCache,
                });
            });
        },
    });
};

function getFlatMenuData(menus) {
    let keys = {};
    menus.forEach((item) => {
        if (item.children) {
            keys[item.path] = { ...item,
            };
            keys = { ...keys,
                ...getFlatMenuData(item.children),
            };
        } else {
            keys[item.path] = { ...item,
            };
        }
    });
    return keys;
}

export const getRouterData = (app) => {
    const routerConfig = {
        '/': {
            component: dynamicWrapper(app, ['user', 'login', 'search'], () =>
          import('../layouts/MonitorLayout')),
        },
        '/overview': {
            component: dynamicWrapper(app, ['points', 'overview', 'user', 'baseinfo'], () =>
          import('../routes/OverView')),
        },
        '/datalist': {
            component: dynamicWrapper(app, ['overview'], () =>
          import('../routes/OverView/dataList')),
        },
        '/statuslist': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/OverView/statusList')),
        },
        '/stationbuilding/:pointcode': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../components/OverView/StationBuilding')),
        },
        '/pointdetail/:pointcode': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/PointDetail')),
        },
        '/emergency/emergencyauditdetailinfo/:exceptionhandleid': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/EmergencyAuditList/EmergencyDetailInfo')),
        },
        // '/emergency/emergencydetailinfo/:exceptionhandleid': {
        //     component: dynamicWrapper(app, ['points'], () =>
        //   import('../routes/EmergencyTodoList/EmergencyDetailInfo')),
        // },
        '/emergency/emergencydetailinfo/:TaskID': {
            component: dynamicWrapper(app, ['task'], () =>
          import('../routes/EmergencyTodoList/EmergencyDetailInfo')),
        },
        '/pointdetail/:pointcode/processflowdiagram': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/PointDetail/ProcessFlowDiagram')),
        },
        '/pointdetail/:pointcode/dataquery': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/PointDetail/DataQuery')),
        },
        '/pointdetail/:pointcode/alarmrecord': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/PointDetail/AlarmRecord')),
        },
        '/pointdetail/:pointcode/realvideo': {
            component: dynamicWrapper(app, ['videolist'], () =>
          import('../routes/PointDetail/RealVideo')),
        },
        '/pointdetail/:pointcode/hisvideo': {
            component: dynamicWrapper(app, ['videolist'], () =>
        import('../routes/PointDetail/HisVideo')),
        },

        '/pointdetail/:pointcode/warningrecord': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/PointDetail/WarningRecord')),
        },
        '/pointdetail/:pointcode/videolist': {
            component: dynamicWrapper(app, ['videolist'], () =>
          import('../routes/PointDetail/VideoList')),
        },

        '/pointdetail/:pointcode/emergencymaintenancerecord': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/PointDetail/EmergencyMaintenanceRecord')),
        },
        '/pointdetail/:pointcode/operationplanrecord': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/PointDetail/OperationPlanRecord')),
        },
        '/pointdetail/:pointcode/inspectiontaskrecord': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/PointDetail/InspectionTaskRecord')),
        },
        '/pointdetail/:pointcode/replacementpartrecord': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/PointDetail/ReplacementPartRecord')),
        },
        '/pointdetail/:pointcode/stopmanagement': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/PointDetail/StopManagement')),
        },
        '/pointdetail/:pointcode/stationthree': {
            component: dynamicWrapper(app, ['points'], () =>
        import('../routes/PointDetail/StationThree')),
        },
        '/pointdetail/:pointcode/ywdsjlist': {
            component: dynamicWrapper(app, ['task'], () =>
        import('../routes/PointDetail/Ywdsjlist')),
        },
        '/monitor/pointdetail/:pointcode/qcontrollist': {
            component: dynamicWrapper(app, ['task'], () =>
        import('../routes/PointDetail/qcontrollist')),
        },
        '/EmergencyTodoList/JzRecordInfo/:TaskID/:TypeID': {
            component: dynamicWrapper(app, ['task'], () =>
        import('../routes/EmergencyTodoList/JzRecordInfo')),
        },
        '/pointdetail/:pointcode/qcontrollist/JzHistoryRecords/:TypeID': {
            component: dynamicWrapper(app, ['task'], () =>
        import('../routes/EmergencyTodoList/JzHistoryRecords')),
        },
        '/pointdetail/:pointcode/qcontrollist/RepairHistoryRecods/:TypeID': {
            component: dynamicWrapper(app, ['task'], () =>
        import('../routes/EmergencyTodoList/RepairHistoryRecods')),
        },
        /* 工作台 */
        '/workbench': {
            component: dynamicWrapper(app, ['user', 'points'], () =>
          import('../routes/Workbench')),
        },
        /* 综合分析 */
        '/analysis/alarmsubject/alarmtypeanaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyAlarmType')),
        },
        '/analysis/alarmsubject/alarmhouranaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyAlarmhour')),
        },
        '/analysis/alarmsubject/alarmpollanaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyAlarmPoll')),
        },
        '/analysis/alarmsubject/alarmhourareaanaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyAlarmhourarea')),
        },
        '/analysis/alarmsubject/alarmreasonanaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyAlarmReason')),
        },
        '/analysis/operationsubject/transeffectanaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyTranseffect')),
        },
        '/analysis/operationsubject/devicehouranaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyDevicehour')),
        },
        '/analysis/operationsubject/replacepartanaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyReplacePart')),
        },
        '/analysis/operationsubject/costinganaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyCosting')),
        },
        '/analysis/pollsubject/dischargeanaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyDischarge')),
        },
        '/analysis/pollsubject/timehouranaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyTimehour')),
        },
        '/analysis/pollsubject/polldischargeanaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyPollDischarge')),
        },
        '/analysis/pollsubject/environmenttaxanaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyEnvironmentTax')),
        },
        '/analysis/pollsubject/environmenttaxdischargeanaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyEnvironmentTaxDischarge/GroupTax')),
        },
        '/analysis/pollsubject/reachstandardanaly': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/AnalyReachStandard')),
        },
        /* 运维相关 */
        '/operation/emergency/emergencyauditlist': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/EmergencyAuditList')),
        },
        '/operation/emergency/emergencymaintenancelist': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/EmergencyMaintenanceList')),
        },
        '/operation/emergency/emergencytodolist': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/EmergencyTodoList')),
        },
        '/operation/inspection/inspectiontasklist': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/InspectionTaskList')),
        },
        '/operation/inspection/inspectiontaskreplacementpartlist': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/InspectionTaskReplacementPartList')),
        },
        '/operation/inspection/inspectiontasktodolist': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/InspectionTaskTodoList')),
        },
        '/operation/plan/operationplanauditlist': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/OperationPlanAuditList')),
        },
        '/operation/plan/operationplanlist': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/OperationPlanList')),
        },
        '/operation/plan/operationplanup': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/OperationPlanUp')),
        },
        '/operation/replacementpartadd': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/ReplacementPartAdd')),
        },
        '/operation/stopmanagement': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/StopManagement')),
        },
        '/operation/history': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/History')),
        },
        '/operation/TurnOver': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/TurnOver')),
        },
        '/operation/StaffweeklyCalendar': {
            component: dynamicWrapper(app, ['points'], () =>
          import('../routes/StaffweeklyCalendar')),
        },
        '/operation/OperationAndMaintenanceMemorabilia/:DGIMNs': {
            component: dynamicWrapper(app, ['task'], () =>
          import('../routes/OperationAndMaintenanceMemorabilia')),
        },
        /* 系统管理 */
        '/sysmanage/Userinfo': {
            component: dynamicWrapper(app, ['userinfo', 'userdgimndata', 'TransmissionEfficiency'], () =>
            import('../routes/Userinfo')),
        },
        '/sysmanage/UserDetail/:UserId': {
            component: dynamicWrapper(app, ['userinfo'], () =>
            import('../routes/Userinfo/AddUser')),
        },
        '/sysmanage/PointInfo': {
            component: dynamicWrapper(app, ['pointinfo'], () =>
            import('../routes/PointInfo/')),
        },
        '/sysmanage/PointDetail/:DGIMN': {
            component: dynamicWrapper(app, ['pointinfo'], () =>
              import('../routes/PointInfo/AddPoint')),
        },
        '/sysmanage/PointDetail/:ID/:Name': {
            component: dynamicWrapper(app, ['pointinfo'], () =>
              import('../routes/PointInfo/PointView')),
        },
        '/sysmanage/StandardLibrary': {
            component: dynamicWrapper(app, ['standardlibrary'], () =>
            import('../routes/StandardLibrary/')),
        },
        '/sysmanage/StandardLibraryDetail/:StandardLibraryID': {
            component: dynamicWrapper(app, ['standardlibrary'], () =>
            import('../routes/StandardLibrary/AddStandardLibrary')),
        },
        '/entInfo/entoperation': {
            component: dynamicWrapper(app, ['baseinfo'], () =>
                    import('../routes/EnterpriseInfo')),
        },
        '/emissionpermits': {
            component: dynamicWrapper(app, ['baseinfo'], () =>
                    import('../routes/EmissionPermits')),
        },
        '/sysmanage/ConsumablesReplaceRecord/:TaskIds/:TypeIDs': {
            component: dynamicWrapper(app, ['baseinfo'], () =>
                    import('../routes/EmergencyTodoList/ConsumablesReplaceRecord')),
        },
        '/sysmanage/StandardGasRepalceRecord/:StandardGasTaskIds/:StandardGasTypeIDs': {
            component: dynamicWrapper(app, ['baseinfo'], () =>
                    import('../routes/EmergencyTodoList/StandardGasRepalceRecord')),
        },
        '/monitor/sysmanage/CompleteExtraction/:CqfPatrolTaskIds/:CqfPatrolTypeIDs': {
            component: dynamicWrapper(app, ['baseinfo'], () =>
                    import('../routes/EmergencyTodoList/CompleteExtraction')),
        },
        /* 登陆 */
        '/user': {
            component: dynamicWrapper(app, [], () =>
          import('../layouts/UserLayout')),
        },
        '/user/login': {
            component: dynamicWrapper(app, ['login', 'user'], () =>
          import('../routes/User/UserLogin')),
        },
        '/user/register-result': {
            component: dynamicWrapper(app, [], () =>
          import('../routes/User/RegisterResult')),
        },

    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
    };

    // Get name from ./menu.js or just set it in the router data.
    const menuData = getFlatMenuData(getMenuData());
    // Route configuration data
    // eg. {name,authority ...routerConfig }
    const routerData = {};
    // The route matches the menu
    Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
        const pathRegexp = pathToRegexp(path);
        const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`/${key}`));
        let menuItem = {};
        // If menuKey is not empty
        if (menuKey) {
            menuItem = menuData[menuKey];
        }
        let router = routerConfig[path];
        // If you need to configure complex parameter routing,
        // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
        // eg . /list/:type/user/info/:id
        router = {
            ...router,
            name: router.name || menuItem.name,
        };
        routerData[path] = router;
    });
    return routerData;
};
