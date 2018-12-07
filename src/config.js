module.exports = {
    name: '污染源智能分析平台',
    logindesc: 'SDL 您身边的环境污染分析专家',
    prefix: 'monitorOnline',
    footerText: '环境监控平台   2018 sdl',
    amapKey: 'c5cb4ec7ca3ba4618348693dd449002d',
    centerlongitude: '116.418067',
    centerlatitude: '39.930871',
    zoom: 12,
    logo: '/logo.png',
    iconFontCSS: '/iconfont.css',
    iconFontJS: '/iconfont.js',
    CORS: [],
    openPages: ['/login'],
    apiPrefix: '/mock',
    webSocketPushURL: '172.16.12.133:40001',
    imgaddress: 'http://localhost:51047/upload/',
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
