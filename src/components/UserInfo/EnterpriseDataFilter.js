import React, {Component} from 'react';
import {
    Col,
    Row,
    Form,
    Input,
    Switch,
    InputNumber,
    message,
    Select,
    Button,
    Card,
    Modal,
    Divider,
    Radio,
    TreeSelect,
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
@Form.create()
class EnterpriseDataFilter extends Component {
//初始化
    componentWillMount() {
        this.getEnterprisePageList();
        this.getEnterpriseDataRoles();
        this.getMock();
    }

updateState = (payload) => {
    this.props.dispatch({
        type: pageUrl.updateState,
        payload: payload,
    });
}

setEnterpriseDataRole=(payload)=>{
    this.props.dispatch({
        type: pageUrl.setEnterpriseDataRole,
        payload: {
            ...payload,
            callback:(item)=>{
                if(this.props.isSuccessEntRole) {
                    message.success("操作成功");
                    this.getEnterpriseDataRoles();
                }
            }
        },
    });
}

getEnterprisePageList =()=>{
    this.props.dispatch({
        type: pageUrl.getEnterprisePageList,
        payload: {
            pageIndex:1,
            pageSize:10000
        },
    });
}

getEnterpriseDataRoles =()=>{
    this.props.dispatch({
        type: pageUrl.getEnterpriseDataRoles,
        payload: {
            UserId:this.props.userId
        },
    });
}


     onRef1 = (ref) => {
         this.child = ref;
     }

     getMock = () => {


         const targetKeys = [];
         const mockData = [];
         for (let i = 0; i < 2; i++) {
             const data = {
                 key: i.toString(),
                 title: `content${i + 1}`,
                 description: `description of content${i + 1}`,
                 chosen: Math.random() * 2 > 1,
             };
             if (data.chosen) {
                 targetKeys.push(data.key);
             }
             mockData.push(data);
         }
         this.setState({ mockData, targetKeys });
     }

     handleChange = (targetKeys, direction, moveKeys) => {
         console.log(targetKeys, direction, moveKeys);
         this.setState({ targetKeys });

         let dataRoles=[];
         dataRoles.push({
             UserId:this.props.userId,
             EnterpriseIds:targetKeys
         });
         console.log(dataRoles);
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

         let {enterpriseList,enterpriseDataRoles}=this.props;
         console.log(enterpriseDataRoles);
         let dataSource=[];
         let targetKeys=[];
         enterpriseList.map((item,index)=>{
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
         if(this.props.loadingEnterpriseDataRoles){
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