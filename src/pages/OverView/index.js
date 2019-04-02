// import liraries
import React, { PureComponent } from 'react';
import {connect} from 'dva';
import MapContent from '../../components/OverView/MapContent';
import MapTreeDetail from '../../components/OverView/MapTreeDetail';
import MapTreeList from '../../components/OverView/MapTreeList';
import AListRadio from '../../components/OverView/AListRadio';
import PollutantTypeRadio from '../../components/OverView/PollutantTypeRadio';
import StatusList from '../../components/OverView/StatusList';

import styles from './index.less';

@connect(({ overview }) => ({
    selectpoint: overview.selectpoint,
}))

class OverViewMap extends PureComponent {

    getTreeList=()=>{
        const {selectpoint}=this.props;
        if(selectpoint) {
            return (<MapTreeDetail />);
        }

        return (<MapTreeList />);

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

                <MapContent />
                <div
                style={{
                    position: 'absolute',
                    top: 90,
                    left: 500,
                    zIndex:100
                }}
                >
               <PollutantTypeRadio />
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
                    /* top: 90, */
                    /* left: 700, */
                    /* right: 16, */
                    /* bottom: 140, */
                    top: 124,
                    left: 500,
                    zIndex:100,
                    background: "#fff",
                    zIndex:1,
                    paddingBottom: 10,
                    borderRadius: 4,
                    border: "1px solid #d9d9d9"
                }}>
                <StatusList />
                </div>

            </div>
        );
    }
}
export default OverViewMap;
