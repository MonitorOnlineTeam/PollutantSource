import { Model } from '../dvapack';
import { Link } from 'dva/router';
import {  queryLxSearchInfo,queryfullfulltext } from '../services/api';


export default Model.extend({
    namespace: 'search',
    state: {
        lxsearchinfo:[],
        searchName:"",
        fullfulltextinfo:[],
        total: 0,
        size: 4,
        current: 1,
    },
    effects: {
        * queryLxSearchResult({
          payload,
        }, { call,select, update, put }) {
            let { searchName } = yield select(_ => _.search);
            if(searchName==payload.value)
              return;
              searchName=payload.value;
            const alllxsearchinfo = yield call(queryLxSearchInfo, { searchName:payload.value ,isLx:true});
            const lxsearchinfo=[];
            if(alllxsearchinfo && alllxsearchinfo.length>0)
            {
                alllxsearchinfo.map((item,key)=>{
                    if(lxsearchinfo.indexOf(item.Name)==-1)
                    {
                        lxsearchinfo.push(item.Name);
                    }
                })
            }
            yield update({ lxsearchinfo });
        },
        *querySearchInfo({
            payload
        },{call,select, update, put}){
            const {size}=yield select(_ => _.search);
            const {current}=yield select(_=>_.search);
            const {fullfulltextinfo}=yield select (_=>_.search);
               if(!payload.current)
                payload.current=1;
                const result=yield call(queryfullfulltext,{ searchName:payload.value,pagesize:size,pageindex:payload.current});
                let resultdata=[];
                result.data.map(info=>{
                    var reg = new RegExp(payload.value, "g");//g,表示全部替换。
                   
                    let model={};
                    if(info.Type==1)
                    {
                        info.OtherInfo = info.OtherInfo.replace(reg, "<span style='color:red'>" +payload.value+ "</span>");
                        model.type="企业";
                        model.description=info.OtherInfo.split('&#&')[5];
                        model.region= info.OtherInfo.split('&#&')[5];
                        model.linkman='联系人：'+info.OtherInfo.split('&#&')[9];
                        model.tel='联系电话：'+info.OtherInfo.split('&#&')[10];
                        model.address= '地址：'+info.OtherInfo.split('&#&')[7];
                        model.attentionName='控制级别：'+info.OtherInfo.split('&#&')[8];
                        model.registTypeName=info.OtherInfo.split('&#&')[17];
                        model.unitTypeName=info.OtherInfo.split('&#&')[18];
                        model.pSScaleName=info.OtherInfo.split('&#&')[19];
                        model.subjectionRelationName=info.OtherInfo.split('&#&')[20];
                        model.industryTypeName=info.OtherInfo.split('&#&')[21];
                        model.code=info.Code;
                        
                    }
                    else if(info.Type==2)
                    {
                        info.OtherInfo = info.OtherInfo.replace(reg, "<span style='color:red'>" +payload.value+ "</span>");
                        model.type="监测站";
                        model.description=info.OtherInfo.split('&#&')[5];
                        model.region= info.OtherInfo.split('&#&')[5];
                        model.linkman='联系人：'+info.OtherInfo.split('&#&')[7];
                        model.tel='联系电话：'+info.OtherInfo.split('&#&')[8];
                        model.code=info.Code;
                    }
                    else if(info.Type==3)
                    {
                        info.OtherInfo = info.OtherInfo.replace(reg, "<span style='color:red'>" +payload.value+ "</span>");
                        model.type="河段";
                        model.description=info.OtherInfo.split('&#&')[5];
                        model.region= info.OtherInfo.split('&#&')[5];
                        model.linkman='联系人：'+info.OtherInfo.split('&#&')[7];
                        model.tel='联系电话：'+info.OtherInfo.split('&#&')[8];
                        model.code=info.Code;
                    }
                    else if(info.Type==4)
                    {
                        info.OtherInfo = info.OtherInfo.replace(reg, "<span style='color:red'>" +payload.value+ "</span>");
                        model.type="工地";
                        model.description=info.OtherInfo.split('&#&')[5];
                        model.region= info.OtherInfo.split('&#&')[5];
                        model.linkman='联系人：'+info.OtherInfo.split('&#&')[7];
                        model.tel='联系电话：'+info.OtherInfo.split('&#&')[8];
                        model.code=info.Code;
                    }
                    else if(info.Type==5)
                    {
                        model.code=info.OtherInfo.split('&#&')[5];
                        info.OtherInfo = info.OtherInfo.replace(reg, "<span style='color:red'>" +payload.value+ "</span>");
                        model.type="排口";
                        model.description=info.OtherInfo.split('&#&')[22];
                        model.parentName= info.OtherInfo.split('&#&')[6];
                        model.address= '地址：' +info.OtherInfo.split('&#&')[8];
                        model.linkman='联系人：'+info.OtherInfo.split('&#&')[10];
                        model.tel='联系电话：'+info.OtherInfo.split('&#&')[11];
                        model.attentionName='控制级别：'+info.OtherInfo.split('&#&')[13];
                        model.status= (info.OtherInfo.split('&#&')[9]==0?"离线":(info.OtherInfo.split('&#&')[9]==1?"在线":(info.OtherInfo.split('&#&')[9]==2?"超标":"异常")));
                        model.pollutantType= info.OtherInfo.split('&#&')[14];
                        model.region= info.OtherInfo.split('&#&')[22];
                        model.pollutantTypeCode=info.OtherInfo.split('&#&')[27];
                      if(info.OtherInfo.split('&#&')[16]!="")
                        model.operationName=('运维人名称：'+info.OtherInfo.split('&#&')[16]);
                      if(info.OtherInfo.split('&#&')[17]!="")
                        model.operationtel=('运维人电话：'+info.OtherInfo.split('&#&')[17]);
                      if(info.OtherInfo.split('&#&')[18]!="")
                        model.operationtask=('运维逾期任务：'+info.OtherInfo.split('&#&')[18]);
                      if(info.OtherInfo.split('&#&')[19]!="")
                        model.isStop=('是否停产：'+info.OtherInfo.split('&#&')[19]);
                      if(info.OtherInfo.split('&#&')[20]!="")
                        model.isfault=('是否故障：'+info.OtherInfo.split('&#&')[20]);
                      if(info.OtherInfo.split('&#&')[21]!="")
                        model.isoperation=('是否运维中：'+info.OtherInfo.split('&#&')[21]);
                    }
                    else if(info.Type==6)
                    {
                        model.code=info.OtherInfo.split('&#&')[5];
                        info.OtherInfo = info.OtherInfo.replace(reg, "<span style='color:red'>" +payload.value+ "</span>");
                        model.type="监测点";
                        model.description=info.OtherInfo.split('&#&')[19];
                        model.parentName=info.OtherInfo.split('&#&')[6];
                        model.linkman='联系人：'+info.OtherInfo.split('&#&')[9];
                        model.tel='联系电话：'+info.OtherInfo.split('&#&')[10];
                        model.status= (info.OtherInfo.split('&#&')[8]==0?"离线":(info.OtherInfo.split('&#&')[8]==1?"在线":(info.OtherInfo.split('&#&')[8]==2?"超标":"异常")));
                        model.pollutantType=info.OtherInfo.split('&#&')[11];
                        model.region=info.OtherInfo.split('&#&')[19];
                        model.pollutantTypeCode=info.OtherInfo.split('&#&')[24];
                        if(info.OtherInfo.split('&#&')[13]!="")
                          model.operationName=('运维人名称：'+info.OtherInfo.split('&#&')[13]);
                        if(info.OtherInfo.split('&#&')[14]!="")
                          model.operationtel=('运维人电话：'+info.OtherInfo.split('&#&')[14]);
                        if(info.OtherInfo.split('&#&')[15]!="")
                          model.operationtask=('运维逾期任务：'+info.OtherInfo.split('&#&')[15]);
                        if(info.OtherInfo.split('&#&')[16]!="")
                          model.isStop=('是否停产：'+info.OtherInfo.split('&#&')[16]);
                        if(info.OtherInfo.split('&#&')[17]!="")
                          model.isfault=('是否故障：'+info.OtherInfo.split('&#&')[17]);
                        if(info.OtherInfo.split('&#&')[18]!="")
                          model.isoperation=('是否运维中：'+info.OtherInfo.split('&#&')[18]);
                     }
                     model.typecode=info.Type;
                     model.title= info.OtherInfo.split('&#&')[2];
                     resultdata.push(model);
                })
                if(payload.current>1)
                {
                    resultdata=fullfulltextinfo.concat(resultdata);
                }
                yield update({ fullfulltextinfo:resultdata,total:result.total,current:payload.current,searchName:payload.value});
        }
    }
})