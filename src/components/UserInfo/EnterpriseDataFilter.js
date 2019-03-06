/**
 * 功能：根据用户设置企业授权
 * 创建人：吴建伟
 * 创建时间：2019-02-21
 */
import React, {Component} from 'react';
import {
    message,
    Spin,
    Transfer
} from 'antd';
import {
    connect
} from 'dva';

const pageUrl = {
    updateState: 'userinfo/updateState',
    getEnterprisePageList: 'enterprisemanagermodel/getEnterprisePageList',
    getEnterpriseDataRoles:'userinfo/getEnterpriseDataRoles',
    setEnterpriseDataRole:'userinfo/setEnterpriseDataRole'
};

@connect(({
    loading,
    userinfo,
    enterprisemanagermodel
}) => ({
    loadingEnterprisePageList:loading.effects[pageUrl.getEnterprisePageList],
    loadingEnterpriseDataRoles:loading.effects[pageUrl.getEnterpriseDataRoles],
    isSuccessEnt:enterprisemanagermodel.isSuccess,
    isSuccessEntRole:userinfo.isSuccess,
    enterpriseList:enterprisemanagermodel.enterpriseList,
    enterpriseDataRoles:userinfo.EnterpriseDataRoles
}))
class EnterpriseDataFilter extends Component {
//初始化
    componentWillMount() {
        this.getEnterprisePageList();
        this.getEnterpriseDataRoles();
        // this.getMock();
    }

updateState = (payload) => {
    let {dispatch} =this.props;
    dispatch({
        type: pageUrl.updateState,
        payload: payload,
    });
}

setEnterpriseDataRole=(payload)=>{
    let {dispatch,isSuccessEntRole} =this.props;
    dispatch({
        type: pageUrl.setEnterpriseDataRole,
        payload: {
            ...payload,
            callback:(item)=>{
                if(item.IsSuccess) {
                    message.success("操作成功");
                    this.getEnterpriseDataRoles();
                }
            }
        },
    });
}

getEnterprisePageList =()=>{
    let {dispatch}=this.props;
    dispatch({
        type: pageUrl.getEnterprisePageList,
        payload: {
            pageIndex:1,
            pageSize:10000
        },
    });
}

getEnterpriseDataRoles =()=>{
    let {dispatch,userId}=this.props;
    dispatch({
        type: pageUrl.getEnterpriseDataRoles,
        payload: {
            UserId:userId
        },
    });
}

     onRef1 = (ref) => {
         this.child = ref;
     }

     handleChange = (targetKeys, direction, moveKeys) => {
         let {userId}=this.props;
         let dataRoles=[];
         dataRoles.push({
             UserId:userId,
             EnterpriseIds:targetKeys
         });
         this.setEnterpriseDataRole({RoleDatas:dataRoles});
     }

     renderItem = (item) => {
         const customLabel = (
             <span className="custom-item">
                 {item.title} - {item.description}
             </span>
         );

         return {
             label: customLabel, // for displayed item
             value: item.title, // for title and filter matching
         };
     }

     render() {

         let {enterpriseList,enterpriseDataRoles,loadingEnterpriseDataRoles}=this.props;
         let dataSource=[];
         let targetKeys=[];
         enterpriseList.map((item)=>{
             dataSource.push({
                 key: item.EntCode,
                 title: item.EntName,
                 description: item.Abbreviation,
                 chosen: Math.random() * 2 > 1,
             });
             enterpriseDataRoles&&enterpriseDataRoles.filter(m=>m.EnterpriseId===item.EntCode).map((roles)=>{
                 targetKeys.push(roles.EnterpriseId);
             });

         });
         if(loadingEnterpriseDataRoles){
             return (<Spin
                 style={{ width: '100%',
                     height: 'calc(100vh/2)',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center' }}
                 size="large"
             />);
         }
         return (
             <div>
                 <Transfer
                     dataSource={dataSource}
                     listStyle={{
                         width: '45%',
                     }}
                     targetKeys={targetKeys}
                     onChange={this.handleChange}
                     render={this.renderItem}
                     titles={['待授权', '已授权']}
                 />
             </div>
         );
     }
}
export default EnterpriseDataFilter;