import { isUrl } from '../utils/utils';

const menuData = [
  {
    layout: 'MonitorLayout',
    name: '首页', // for breadcrumb
    path: 'monitor',
    children: [
      {
        name: '监控总览',
        path: 'overview',
        icon: 'home',
      },
      {
        name: '工作台',
        path: 'testMap',
        icon: 'desktop',
      },
      {
        name: '综合分析',
        path: 'analysis',
        icon: 'area-chart',
        children:[
          {
            name: '报警专题分析',
            path:'alarm',
            icon: 'exception',
            children:[
              {
                name: '报警类别统计',
                path: 'overview',
                icon: 'appstore-o',
               },
               {
                name: '报警时长统计',
                path: 'alarm4',
                icon: 'appstore-o',
              },
              {
                name: '报警因子统计',
                path: 'alarm5',
                icon: 'appstore-o',
              },
              {
                name: '报警时间范围分布情况',
                path: 'alarm6',
                icon: 'appstore-o',
              },
              {
                name: '报警原因统计',
                path: 'alarm7',
                icon: 'appstore-o',
              },
            ]
          },
          {
            name: '运维专题分析',
            path:'medicine-box',
            icon: 'appstore-o',
            children:[
              {
                name: '传输有效率分析',
                path: 'mlist',
                icon: 'appstore-o',
              },
              {
                name: '设备运行时间占比',
                path: 'alarm2',
                icon: 'appstore-o',
              },
              {
                name: '备品备件消耗情况',
                path: 'alarm3',
                icon: 'appstore-o',
              },
              {
                name: '成本分析',
                path: 'alarm18',
                icon: 'appstore-o',
              },
            ]
          },
          {
            name: '排污专题分析',
            path:'sewage',
            icon: 'code',
            children:[
              {
                name: '排污量的统计、排名',
                path: 'alarm8',
                icon: 'appstore-o',
              },
              {
                name: '污染物排放时段分布情况',
                path: 'alarm9',
                icon: 'appstore-o',
              },
              {
                name: '污染物排放量占比',
                path: 'alarm10',
                icon: 'appstore-o',
              },
              {
                name: '环保税分析',
                path: 'alarm11',
                icon: 'appstore-o',
              },
              {
                name: '环保税、排污量对比分析',
                path: 'alarm12',
                icon: 'appstore-o',
              },
              {
                name: '排污达标率',
                path: 'alarm13',
                icon: 'appstore-o',
              },
            ]
          },
      ]
      },
      {
        name: '运维信息',
        path: 'alarm14',
        icon: 'medicine-box',
        children:[{
          name: '待办列表',
          path: 'testmap',
          icon: 'appstore',
        },
        {
          name: '应急维护记录',
          path: 'alarm16',
          icon: 'appstore',
        },
        {
          name: '待审核列表',
          path: 'alarm17',
          icon: 'appstore',
        },
        {
          name: '运维计划上报',
          path: 'alarm18',
          icon: 'appstore',
        },
        {
          name: '运维计划记录',
          path: 'alarm19',
          icon: 'appstore',
        },
        ]
      }

    ],
  }
];

function formatter(data, parentPath = '') {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);

export const getMenuArray = () => getMenuArrays(formatter(menuData));

function getMenuArrays(data) {
  let res=[];
  var aa= data.map((item) => {
    if (item) {
      res.push(item);
      if (item.children) {
        getMenuArrays(item.children).map(a => {
          if (a) {
            res.push(a);
          }
        });
      } else {
        return null;
      }
    }
    return res;
  });
  return res;
}
