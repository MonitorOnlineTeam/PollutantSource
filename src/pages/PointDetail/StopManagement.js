// import liraries
import React, { Component } from 'react';
import StopManagementModel from '../StopManagement/content';

/*
页面：10、停产管理
描述：停产情况维护，需要上传附件。描述清楚是勒令停产还是企业减少产能。（自动打标）依据恢复生产动作，可按条件查询停产记录。
add by cg 18.6.8
modify by
*/
class StopManagement extends Component {
    render() {
        return (
                <StopManagementModel dgimn={'bjldgn01'} />
        );
    }
}
// make this component available to the app
export default StopManagement;
