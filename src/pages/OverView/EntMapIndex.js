// import liraries
import React, { PureComponent } from 'react';
import {connect} from 'dva';
import MapContent from '../../components/OverView/MapContent';
import MapTreeDetail from '../../components/OverView/MapTreeDetail';
import MapTreeList from '../../components/OverView/MapTreeList';
import EntTreeList from '../../components/OverView/EntTreeList';
import AListRadio from '../../components/OverView/AListRadio';
import PollutantTypeRadio from '../../components/OverView/PollutantTypeRadio';
import StatusList from '../../components/OverView/StatusList';
import EntMapContent from '../../components/OverView/EntMapContent';
import styles from './index.less';

@connect(({ overview }) => ({
    selectpoint: overview.selectpoint,
    entbaseinfo:overview.entbaseinfo,
    selectent:overview.selectent
}))

class EntMapIndex extends PureComponent {

    componentWillMount(){
         this.props.dispatch({
             type:'overview/updateState',
             payload:{
                selectent:null,
                selectpoint:null
             }
         })
    }

    getTreeList=()=>{
        const {selectpoint,selectent}=this.props;
        if(selectpoint) {
            return (<MapTreeDetail />);
        }
        if(selectent)
        {
            return <MapTreeList isback={true} />
        }
        return (<EntTreeList />);
    }
    getmap=()=>{
        const {selectent}=this.props;
        if(selectent)
        {
            return  <MapContent />  
        }
         return <EntMapContent />
    }


    render() {
        const {selectent}=this.props;
        return(
            <div
                style={{
                    width: '100%',
                    height: 'calc(100vh - 67px)'
                }}
                className={styles.detailInfo}
            >
                <div style={{ width: 450,
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
               {this.getmap()}
                <div
                style={{
                    position: 'absolute',
                    top: 90,
                    left: 500,
                    zIndex:100
                }}
                >
               {selectent?<PollutantTypeRadio />:""}
             
                </div>
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
                <div style={{
                    position: 'absolute',
                    bottom: 50,
                    right: 100,
                    zIndex:100,
                    background: "#fff",
                    zIndex:1,
                    paddingBottom: 10,
                    borderRadius: 4,
                    border: "1px solid #d9d9d9"
                }}>
                {selectent? <StatusList />:""}
                </div>

            </div>
        );
    }
}
export default EntMapIndex;
