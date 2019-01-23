// import liraries
import React, { PureComponent } from 'react';
import MapContent from '../../components/OverView/MapContent';
import TreeStatus from '../../components/OverView/TreeStatus';
import TreeCard from '../../components/OverView/TreeCard';
import TreeCardContent from '../../components/OverView/TreeCardContent';
import MapTreeDetail from '../../components/OverView/MapTreeDetail';
import MapTreeList from '../../components/OverView/MapTreeList';
import AListRadio from '../../components/OverView/AListRadio';
import {connect} from 'dva';
import styles from './index.less';
 
@connect(({ overview }) => ({
    selectpoint: overview.selectpoint,
}))

class OverViewMap extends PureComponent {
    constructor(props) {
        super(props);
    }
     
    getTreeList=()=>{
        const {selectpoint}=this.props;
        if(selectpoint)
        {
            return  (<MapTreeDetail />)
        }
        else{
            return  (<MapTreeList />)
        }
    }


    render() {
      return( 
        <div 
        style={{
            width: '100%',
            height: 'calc(100vh - 67px)'
        }}
        className={styles.detailInfo}
        >
        <div style={{  width: 450,
                      height: 'calc(100vh - 90px)',
                       position: 'absolute',
                       top: 70,
                       left: 5,
                       borderRadius: 10,
                       zIndex:100
                   }}
             >
          {
              this.getTreeList()
          }

        
         </div>
        
       <MapContent />
       <div
               style={{
                           position: 'absolute',
                           top: 90,
                           right: 100,
                           zIndex:100
                       }}
             >
               <AListRadio dvalue="a" />
             </div>
        </div>
      )
    }
}
export default OverViewMap;
