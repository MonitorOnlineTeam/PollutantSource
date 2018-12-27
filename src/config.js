module.exports = {
    name: '污染源智能分析平台',
    logindesc: 'SDL 您身边的环境污染分析专家',
    prefix: 'monitorEnterprise',
    footerText: '污染源智能分析平台   2018 sdl',
    amapKey: 'c5cb4ec7ca3ba4618348693dd449002d',
    centerlongitude: '118.510962',
    centerlatitude: '38.976271',
    zoom: 12,
    logo: '/logo.png',
    iconFontCSS: '/iconfont.css',
    iconFontJS: '/iconfont.js',
    CORS: [],
    openPages: ['/login'],
    enterpriceid:'51216eae-8f11-4578-ad63-5127f78f6cca',
    apiPrefix: '/mock',
    webSocketPushURL: '172.16.4.200:40001',
    imgaddress: 'http://172.16.12.152:8011/api/upload/',
    mainpollutantInfo: [{
        pollutantCode: '01',
        pollutantName: '烟尘',
        unit: 'mg/m³'
    }, {
        pollutantCode: '02',
        pollutantName: 'SO2',
        unit: 'mg/m³'
    }, {
        pollutantCode: '03',
        pollutantName: 'NOx',
        unit: 'mg/m³'
    }
    ],
    zspollutantInfo: [{
        pollutantCode: '01',
        pollutantName: '烟尘',
        unit: 'mg/m³'
    }, {
        pollutantCode: '02',
        pollutantName: 'SO2',
        unit: 'mg/m³'
    }, {
        pollutantCode: '03',
        pollutantName: 'NOx',
        unit: 'mg/m³'
    }
    ]
};
