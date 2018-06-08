import {
  createElement
} from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import {
  getMenuData
} from './menu';


let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({
    namespace
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
      import (`../models/${m}.js`)
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
      keys[item.path] = { ...item
      };
      keys = { ...keys,
        ...getFlatMenuData(item.children)
      };
    } else {
      keys[item.path] = { ...item
      };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
    const routerConfig = {
      '/': {
        component: dynamicWrapper(app, ['user', 'login', 'search'], () =>
          import ('../layouts/MonitorLayout')),
      },
      '/monitor/overview': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/OverView')),
      },
      '/monitor/pointdetail/:pointcode': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/PointDetail')),
      },
      '/monitor/pointdetail/:pointcode/module1': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/PointDetail/Module1')),
      },
      '/monitor/pointdetail/:pointcode/module2': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/PointDetail/Module2')),
      },
      '/monitor/pointdetail/:pointcode/module3': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/PointDetail/Module3')),
      },
      '/monitor/pointdetail/:pointcode/module4': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/PointDetail/Module4')),
      },
      '/monitor/pointdetail/:pointcode/module5': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/PointDetail/Module5')),
      },
      '/monitor/pointdetail/:pointcode/module5': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/PointDetail/Module5')),
      },
      '/monitor/pointdetail/:pointcode/module5': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/PointDetail/Module5')),
      },
      /* 工作台 */
      '/monitor/workbench': {
        component: dynamicWrapper(app, ['user', 'points'], () =>
          import ('../routes/Workbench')),
      },
      /* 综合分析 */
      '/monitor/analysis/alarmsubject/alarmtypeanaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyAlarmType')),
      },
      '/monitor/analysis/alarmsubject/alarmhouranaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyAlarmhour')),
      },
      '/monitor/analysis/alarmsubject/alarmpollanaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyAlarmPoll')),
      },
      '/monitor/analysis/alarmsubject/alarmhourareaanaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyAlarmhourarea')),
      },
      '/monitor/analysis/alarmsubject/alarmreasonanaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyAlarmReason')),
      },
      '/monitor/analysis/operationsubject/transeffectanaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyTranseffect')),
      },
      '/monitor/analysis/operationsubject/devicehouranaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyDevicehour')),
      },
      '/monitor/analysis/operationsubject/replacepartanaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyReplacePart')),
      },
      '/monitor/analysis/operationsubject/costinganaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyCosting')),
      },
      '/monitor/analysis/pollsubject/dischargeanaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyDischarge')),
      },
      '/monitor/analysis/pollsubject/timehouranaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyTimehour')),
      },
      '/monitor/analysis/pollsubject/polldischargeanaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyPollDischarge')),
      },
      '/monitor/analysis/pollsubject/environmenttaxanaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyEnvironmentTax')),
      },
      '/monitor/analysis/pollsubject/environmenttaxdischargeanaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyEnvironmentTaxDischarge')),
      },
      '/monitor/analysis/pollsubject/reachstandardanaly': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/AnalyReachStandard')),
      },
      /* 运维相关 */
      '/monitor/operation/emergency/emergencyauditlist': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/EmergencyAuditList')),
      },
      '/monitor/operation/emergency/emergencymaintenancelist': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/EmergencyMaintenanceList')),
      },
      '/monitor/operation/emergency/emergencytodolist': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/EmergencyTodoList')),
      },
      '/monitor/operation/inspection/inspectiontasklist': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/InspectionTaskList')),
      },
      '/monitor/operation/inspection/inspectiontaskreplacementpartlist': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/InspectionTaskReplacementPartList')),
      },
      '/monitor/operation/inspection/inspectiontasktodolist': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/InspectionTaskTodoList')),
      },
      '/monitor/operation/plan/operationplanauditlist': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/OperationPlanAuditList')),
      },
      '/monitor/operation/plan/operationplanlist': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/OperationPlanList')),
      },
      '/monitor/operation/plan/operationplanup': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/OperationPlanUp')),
      },
      '/monitor/operation/replacementpartadd': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/ReplacementPartAdd')),
      },
      '/monitor/operation/stopmanagement': {
        component: dynamicWrapper(app, ['points'], () =>
          import ('../routes/StopManagement')),
      },
      /* 登陆 */
      '/user': {
        component: dynamicWrapper(app, [], () =>
          import ('../layouts/UserLayout')),
      },
      '/user/login': {
        component: dynamicWrapper(app, ['login'], () =>
          import ('../routes/User/UserLogin')),
      },
      '/user/register-result': {
        component: dynamicWrapper(app, [], () =>
          import ('../routes/User/RegisterResult')),
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
