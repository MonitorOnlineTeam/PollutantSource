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
        path: 'workbench',
        icon: 'desktop',
      },
      {
        name: '综合分析',
        path: 'analysis',
        icon: 'area-chart',
        children:[
          {
            name: '传输有效率分析',
            path: 'mlist',
            icon: 'appstore-o',
          },
          {
          name: '报警类别统计',
          path: 'alarm',
          icon: 'appstore-o',
        }]
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
