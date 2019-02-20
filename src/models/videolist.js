import { Icon, Popover, Badge} from 'antd';
import React from 'react';
import { Model } from '../dvapack';
import { getList, deleteVideoInfo, gethistoryVideoList, updateVideoInfos, addVideoInfo, getAlarmHistory, updateAlarmHistory } from '../services/videodata';
import { querypollutantlist,queryhistorydatalist } from '../services/api';
import config from '../config';

export default Model.extend({
    namespace: 'videolist',
    state: {
        editUser: null,
        requstresult: null,
        list: [],
        historyVideolist: [],
        AlarmInfoList: [],
        edituser: null,
        total: 0,
        loading: false,
        pageSize: 10,
        pageIndex: 1,
        reason: null,
        columns: [],
        realdata: [],
        hiscolumns: [],
        hisrealdata: [],
        realtimevideofullurl:null,
        hisvideofullurl:null
    },
    effects: {
        * fetchuserlist({ payload }, { call, update }) {
            const result = yield call(getList, { DGIMN: payload.DGIMN });
            let temprealurl="nodata";
            let temphisurl="nodata";
            if (result.requstresult === '1') {
                let obj=result.data[0];
                if(obj&&obj.IP){
                    temprealurl=`${config.realtimevideourl}?ip=${obj.IP}&port=${obj.Device_Port}&userName=${obj.User_Name}&userPwd=${obj.User_Pwd}&cameraNo=${obj.VedioCamera_No}`;
                    temphisurl=`${config.hisvideourl}?ip=${obj.IP}&port=${obj.Device_Port}&userName=${obj.User_Name}&userPwd=${obj.User_Pwd}&cameraNo=${obj.VedioCamera_No}`;
                }
                yield update({
                    requstresult: result.requstresult,
                    list: result.data,
                    realtimevideofullurl:temprealurl,
                    hisvideofullurl:temphisurl
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    list: [],
                    realtimevideofullurl:temprealurl,
                    hisvideofullurl:temphisurl
                });
            }
        },
        * updateVideoInfos({ payload }, { call, put, update }) {
            const result = yield call(updateVideoInfos, { ...payload });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            // yield put({
            //     type: 'fetchuserlist',
            //     payload: payload.DGIMN,
            // });
        },
        * addVideoInfos({ payload }, { call, put, update }) {
            const result = yield call(addVideoInfo, { ...payload });
            yield update({
                requstresult: result.requstresult,
                reason: result.reason
            });
            // yield put({
            //     type: 'fetchuserlist',
            //     payload: payload.DGIMN,
            // });
        },
        * deleteVideoInfo({ payload }, { call, put, update }) {
            const result = yield call(deleteVideoInfo, { ...payload });
            yield update({
                requstresult: result.requstresult,
                editUser: result.data[0]
            });
            payload.callback(result.requstresult);
            // yield put({
            //     type: 'fetchuserlist',
            //     payload: payload.DGIMN,
            // });
        },
        * gethistoryVideoList({ payload }, { call, update }) {
            const result = yield call(gethistoryVideoList, { ...payload });
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    historyVideolist: result.data
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    historyVideolist: []
                });
            }
        },
        * getAlarmHistory({
            payload }, { call, update }) {
            const result = yield call(getAlarmHistory, { ...payload });
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    AlarmInfoList: result.data,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    AlarmInfoList: [],
                });
            }
        },
        * updateAlarmHistory({ payload }, { call, put, update }) {
            const result = yield call(updateAlarmHistory, {
                ...payload
            });
            if (result.requstresult === '1') {
                yield update({
                    requstresult: result.requstresult,
                    AlarmInfoList: result.data,
                });
            } else {
                yield update({
                    requstresult: result.requstresult,
                    AlarmInfoList: [],
                });
            }
            yield put({
                type: 'getAlarmHistory',
                payload: { ...payload },
            });
        },
        * querypollutantlist({payload}, {call, update}) {
            const res = yield call(querypollutantlist, {...payload});
            let pollutants=[];
            pollutants.push({title:"监测时间",dataIndex:"MonitorTime",key:"MonitorTime",align:'center',width:'200px'});
            if(res.length>0){
                res.map((item, key) => {
                    pollutants = pollutants.concat({
                        title: `${item.pollutantName}(${item.unit})`,
                        dataIndex: item.pollutantCode,
                        key: item.pollutantCode,
                        align:'center',
                        render: (value, record, index) => {
                            const additional = record[`${item.pollutantCode}_params`];
                            if (additional) {
                                const additionalInfo = additional.split('§');
                                if (additionalInfo[0] === 'IsOver') {
                                    const content = (
                                        <div>
                                            <div style={{marginBottom: 10}}>
                                                <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="warning" />
                                                <span style={{fontWeight: 'Bold', fontSize: 16}}>数据超标</span>
                                            </div>
                                            <li style={{listStyle: 'none', marginBottom: 10}}>
                                                <Badge status="success" text={`标准值：${additionalInfo[2]}`} />
                                            </li>
                                            <li style={{listStyle: 'none', marginBottom: 10}}>
                                                <Badge status="error" text={`超标倍数：${additionalInfo[3]}`} />
                                            </li>
                                        </div>
                                    );
                                    return (<Popover content={content}><span style={{ color: '#ff0000', cursor: 'pointer' }}>{ value || (value === 0 ? 0 : '-') }</span></Popover>);
                                }
                                const content = (
                                    <div>
                                        <div style={{marginBottom: 10}}>
                                            <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="close-circle" />
                                            <span style={{fontWeight: 'Bold', fontSize: 16}}>数据异常</span>
                                        </div>
                                        <li style={{listStyle: 'none', marginBottom: 10}}>
                                            <Badge status="warning" text={`异常原因：${additionalInfo[2]}`} />
                                        </li>
                                    </div>
                                );
                                return (<Popover content={content}><span style={{ color: '#F3AC00', cursor: 'pointer' }}>{value || (value === 0 ? 0 : '-')}</span></Popover>);
                            }
                            return value || (value === 0 ? 0 : '-');
                        }
                    });
                });
            }
            if(pollutants.length===1)
                pollutants=[];
            yield update({ columns: pollutants });
        },
        * queryhistorydatalist({payload}, {select, call, update}) {
            const res = yield call(queryhistorydatalist, {...payload});
            let realdata=[];
            if(res.data.length>0){
                realdata.push({key:"1",...res.data[0]});
            }
            yield update({ realdata: realdata });
        },
        * querypollutantlisthis({payload}, {call, update}) {
            const res = yield call(querypollutantlist, {...payload});
            let pollutants=[];
            pollutants.push({title:"监测时间",dataIndex:"MonitorTime",key:"MonitorTime",align:'center',width:'200px'});
            if(res.length>0){
                res.map((item, key) => {
                    pollutants = pollutants.concat({
                        title: `${item.pollutantName}(${item.unit})`,
                        dataIndex: item.pollutantCode,
                        key: item.pollutantCode,
                        align:'center',
                        render: (value, record, index) => {
                            const additional = record[`${item.pollutantCode}_params`];
                            if (additional) {
                                const additionalInfo = additional.split('§');
                                if (additionalInfo[0] === 'IsOver') {
                                    const content =
                                    (
                                        <div>
                                            <div style={{marginBottom: 10}}>
                                                <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="warning" />
                                                <span style={{fontWeight: 'Bold', fontSize: 16}}>数据超标</span>
                                            </div>
                                            <li style={{listStyle: 'none', marginBottom: 10}}>
                                                <Badge status="success" text={`标准值：${additionalInfo[2]}`} />
                                            </li>
                                            <li style={{listStyle: 'none', marginBottom: 10}}>
                                                <Badge status="error" text={`超标倍数：${additionalInfo[3]}`} />
                                            </li>
                                        </div>
                                    );
                                    return (
                                        <Popover content={content}><span style={{ color: '#ff0000', cursor: 'pointer' }}>{ value || (value === 0 ? 0 : '-') }</span></Popover>
                                    );
                                }
                                const content = (
                                    <div>
                                        <div style={{marginBottom: 10}}>
                                            <Icon style={{ color: '#ff0000', fontSize: 25, marginRight: 10 }} type="close-circle" />
                                            <span style={{fontWeight: 'Bold', fontSize: 16}}>数据异常</span>
                                        </div>
                                        <li style={{listStyle: 'none', marginBottom: 10}}>
                                            <Badge status="warning" text={`异常原因：${additionalInfo[2]}`} />
                                        </li>
                                    </div>
                                );
                                return (<Popover content={content}><span style={{ color: '#F3AC00', cursor: 'pointer' }}>{value || (value === 0 ? 0 : '-')}</span></Popover>);
                            }
                            return value || (value === 0 ? 0 : '-');
                        }
                    });
                });
            }
            if(pollutants.length===1)
                pollutants=[];
            yield update({ hiscolumns: pollutants });
        },
        * queryhistorydatalisthis({payload}, {call, update}) {
            const res = yield call(queryhistorydatalist, {...payload});
            let realdata=[];
            if(res.data.length>0){
                const datas=res.data;
                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    if(realdata.length < 5)
                        realdata.push({key:i.toString(),...element});
                }
            }
            yield update({ hisrealdata: realdata });
        }
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                list: action.payload,
            };
        },
        changeLoading(state, action) {
            return {
                ...state,
                loading: action.payload,
            };
        },
        saveCurrentUser(state, action) {
            return {
                ...state,
                ...action.payload
            };
        },
        changeNotifyCount(state, action) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload,
                },
            };
        },
        saveChangePwdRes(state, action) {
            return {
                ...state,
                changepwdRes: action.payload,
            };
        },
        setCurrentMenu(state, action) {
            return {
                ...state,
                currentMenu: action.payload,
            };
        },
        changeRealTimeData(state,action){
            //"{"MessageType":"RealTimeData","Message":[{"DGIMN":"51052216080303","PollutantCode":"s01","MonitorTime":"2019-01-23 17:26:00","MonitorValue":7.200,"MinStrength":null,"MaxStrength":null,"CouStrength":null,"IsOver":-1,"IsException":0,"Flag":"","ExceptionType":"","AlarmLevel":"","AlarmType":"无报警","Upperpollutant":"0","Lowerpollutant":"0","PollutantResult":"","AlarmTypeCode":0,"StandardColor":"red","StandardValue":"-","OverStandValue":"","DecimalReserved":3},{"DGIMN":"51052216080303","PollutantCode":"s02","MonitorTime":"2019-01-23 17:26:00","MonitorValue":11.760,"MinStrength":null,"MaxStrength":null,"CouStrength":null,"IsOver":-1,"IsException":0,"Flag":"","ExceptionType":"","AlarmLevel":"","AlarmType":"无报警","Upperpollutant":"0","Lowerpollutant":"0","PollutantResult":"","AlarmTypeCode":0,"StandardColor":"red","StandardValue":"-","OverStandValue":"","DecimalReserved":3},{"DGIMN":"51052216080303","PollutantCode":"s05","MonitorTime":"2019-01-23 17:26:00","MonitorValue":6.000,"MinStrength":null,"MaxStrength":null,"CouStrength":null,"IsOver":-1,"IsException":0,"Flag":"","ExceptionType":"","AlarmLevel":"","AlarmType":"无报警","Upperpollutant":"0","Lowerpollutant":"0","PollutantResult":"","AlarmTypeCode":0,"StandardColor":"red","StandardValue":"-","OverStandValue":"","DecimalReserved":3},{"DGIMN":"51052216080303","PollutantCode":"b02","MonitorTime":"2019-01-23 17:26:00","MonitorValue":54.850,"MinStrength":null,"MaxStrength":null,"CouStrength":null,"IsOver":-1,"IsException":0,"Flag":"","ExceptionType":"","AlarmLevel":"","AlarmType":"无报警","Upperpollutant":"0","Lowerpollutant":"0","PollutantResult":"","AlarmTypeCode":0,"StandardColor":"red","StandardValue":"-","OverStandValue":"","DecimalReserved":3},{"DGIMN":"51052216080303","PollutantCode":"zs01","MonitorTime":"2019-01-23 17:26:00","MonitorValue":11.950,"MinStrength":null,"MaxStrength":null,"CouStrength":null,"IsOver":-1,"IsException":0,"Flag":"","ExceptionType":"","AlarmLevel":"","AlarmType":"无报警","Upperpollutant":"0","Lowerpollutant":"0","PollutantResult":"","AlarmTypeCode":0,"StandardColor":"red","StandardValue":"-","OverStandValue":"","DecimalReserved":3},{"DGIMN":"51052216080303","PollutantCode":"01","MonitorTime":"2019-01-23 17:26:00","MonitorValue":11.000,"MinStrength":null,"MaxStrength":null,"CouStrength":null,"IsOver":1,"IsException":-1,"Flag":"","ExceptionType":"","AlarmLevel":"企业","AlarmType":"上限报警","Upperpollutant":"9","Lowerpollutant":"-1","PollutantResult":"[<9.000]","AlarmTypeCode":1,"StandardColor":"#FF0033","StandardValue":"[<9.000]","OverStandValue":"0.222","DecimalReserved":3},{"DGIMN":"51052216080303","PollutantCode":"02","MonitorTime":"2019-01-23 17:26:00","MonitorValue":1755.860,"MinStrength":null,"MaxStrength":null,"CouStrength":null,"IsOver":-1,"IsException":-1,"Flag":"","ExceptionType":"","AlarmLevel":"","AlarmType":"无报警","Upperpollutant":"0","Lowerpollutant":"0","PollutantResult":"","AlarmTypeCode":0,"StandardColor":"red","StandardValue":"-","OverStandValue":"","DecimalReserved":3},{"DGIMN":"51052216080303","PollutantCode":"03","MonitorTime":"2019-01-23 17:26:00","MonitorValue":83.010,"MinStrength":null,"MaxStrength":null,"CouStrength":null,"IsOver":-1,"IsException":-1,"Flag":"","ExceptionType":"","AlarmLevel":"","AlarmType":"无报警","Upperpollutant":"0","Lowerpollutant":"0","PollutantResult":"","AlarmTypeCode":0,"StandardColor":"red","StandardValue":"-","OverStandValue":"","DecimalReserved":3}]}"
            const {realdata}=state;
            if (realdata.length===0) {
                return {...state};
            }
            let nwrealdata=[];
            let tempnwrealdata={};
            action.payload.array.map(item=>{
                if(item.DGIMN===realdata[0].DataGatherCode){
                    if(!tempnwrealdata.DataGatherCode)
                        tempnwrealdata.DataGatherCode=item.DGIMN;
                    if(!tempnwrealdata.MonitorTime)
                        tempnwrealdata.MonitorTime=item.MonitorTime;
                    tempnwrealdata[item.PollutantCode]=item.MonitorValue;
                }
            });
            if(tempnwrealdata.DataGatherCode)
                nwrealdata.push(tempnwrealdata);
            if (nwrealdata.length===0) {
                return {...state};
            }
            return {
                ...state,
                realdata: nwrealdata,
            };
        }
    },
});
