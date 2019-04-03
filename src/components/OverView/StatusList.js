import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './MapTreeList.less'
import { debug } from 'util';

@connect(({ overview }) => ({
  selectpollutantTypeCode: overview.selectpollutantTypeCode,
  pollutantTypelist: overview.pollutantTypelist,
}))
class StatusList extends Component {

  getStatusList=()=>{
      const {pollutantTypelist}=this.props;
      console.log(pollutantTypelist);
      if(pollutantTypelist)
      {
        let list=[];
        pollutantTypelist.map(item=>{
            if(item.pollutantTypeCode===1)
            {
                list.push(<div><img style={{width:15,marginLeft:4,marginRight:9}} src="/lablegis.png" />废水</div>)          
            }
            if(item.pollutantTypeCode===2)
            {
              list.push(<div><img style={{width:20}} src="/lablegas.png" />废气</div>)    
            }
            if(item.pollutantTypeCode===10)
            {
              list.push(<div><img style={{width:20}} src="/lablevoc.png" />Voc</div>)    
            }
            if(item.pollutantTypeCode===8)
            {
              list.push(<div><img style={{width:15,marginLeft:4,marginRight:9}} src="/labledust.png" />小型站</div>)    
            }
        })
        return <div className={styles.statuslist}>{list}</div>;
      }
      return null;
       
  }

  render() {
    return (
      this.getStatusList()
    )
  }

}
export default StatusList;