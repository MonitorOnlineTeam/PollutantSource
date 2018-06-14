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
                children: [
                    {
                        name: '报警专题分析',
                        path: 'alarmsubject',
                        icon: 'exception',
                        children: [
                            {
                                name: '报警类别统计',
                                path: 'alarmtypeanaly',
                                icon: 'appstore-o',
                            },
                            {
                                name: '报警时长统计',
                                path: 'alarmhouranaly',
                                icon: 'appstore-o',
                            },
                            {
                                name: '报警因子统计',
                                path: 'alarmpollanaly',
                                icon: 'appstore-o',
                            },
                            {
                                name: '报警时间范围分布情况',
                                path: 'alarmhourareaanaly',
                                icon: 'appstore-o',
                            },
                            {
                                name: '报警原因统计',
                                path: 'alarmreasonanaly',
                                icon: 'appstore-o',
                            },
                        ]
                    },
                    {
                        name: '运维专题分析',
                        path: 'operationsubject',
                        icon: 'appstore-o',
                        children: [
                            {
                                name: '传输有效率分析',
                                path: 'transeffectanaly',
                                icon: 'appstore-o',
                            },
                            {
                                name: '设备运行时间占比',
                                path: 'devicehouranaly',
                                icon: 'appstore-o',
                            },
                            {
                                name: '备品备件消耗情况',
                                path: 'replacepartanaly',
                                icon: 'appstore-o',
                            },
                            {
                                name: '成本分析',
                                path: 'costinganaly',
                                icon: 'appstore-o',
                            },
                        ]
                    },
                    {
                        name: '排污专题分析',
                        path: 'pollsubject',
                        icon: 'code',
                        children: [
                            {
                                name: '排污量的统计、排名',
                                path: 'dischargeanaly',
                                icon: 'appstore-o',
                            },
                            {
                                name: '污染物排放时段分布情况',
                                path: 'timehouranaly',
                                icon: 'appstore-o',
                            },
                            {
                                name: '污染物排放量占比',
                                path: 'polldischargeanaly',
                                icon: 'appstore-o',
                            },
                            {
                                name: '环保税分析',
                                path: 'environmenttaxanaly',
                                icon: 'appstore-o',
                            },
                            {
                                name: '环保税、排污量对比分析',
                                path: 'environmenttaxdischargeanaly',
                                icon: 'appstore-o',
                            },
                            {
                                name: '排污达标率',
                                path: 'reachstandardanaly',
                                icon: 'appstore-o',
                            },
                        ]
                    },
                ]
            },
            {
                name: '运维信息',
                path: 'operation',
                icon: 'medicine-box',
                children: [{
                    name: '应急维护',
                    path: 'emergency',
                    icon: 'appstore',
                    children: [{
                        name: '待办列表',
                        path: 'emergencytodolist',
                        icon: 'appstore',
                    },
                    {
                        name: '应急维护记录',
                        path: 'emergencymaintenancelist',
                        icon: 'appstore',
                    },
                    {
                        name: '待审核列表',
                        path: 'emergencyauditlist',
                        icon: 'appstore',
                    }]
                },
                {
                    name: '运维计划',
                    path: 'plan',
                    icon: 'appstore',
                    children: [{
                        name: '运维计划上报',
                        path: 'operationplanup',
                        icon: 'appstore',
                    },
                    {
                        name: '运维计划记录',
                        path: 'operationplanlist',
                        icon: 'appstore',
                    },
                    {
                        name: '待审核列表',
                        path: 'operationplanauditlist',
                        icon: 'appstore',
                    }]
                }, {
                    name: '例行任务',
                    path: 'inspection',
                    icon: 'appstore',
                    children: [{
                        name: '待办列表',
                        path: 'inspectiontasktodolist',
                        icon: 'appstore',
                    },
                    {
                        name: '例行任务记录',
                        path: 'inspectiontasklist',
                        icon: 'appstore',
                    },
                    {
                        name: '备品备件使用记录',
                        path: 'inspectiontaskreplacementpartlist',
                        icon: 'appstore',
                    }]
                },
                {
                    name: '备品备件维护',
                    path: 'replacementpartadd',
                    icon: 'appstore',
                },
                {
                    name: '停产管理',
                    path: 'stopmanagement',
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
    let res = [];
    var aa = data.map((item) => {
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
