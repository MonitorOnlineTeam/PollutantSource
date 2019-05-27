import React, { Component } from 'react';
import OverEnterpriseListAndChart from './OverEnterpriseListAndChart';
import OverPointListAndChart from './OverPointListAndChart';
import {onlyOneEnt} from '../../config';

class OverResponseCommon extends Component {
    getrenderlist=()=>{
        if(!onlyOneEnt)
        {
            return  <OverEnterpriseListAndChart />
        }
        const params={
            entcode:null
        }
        const match={
            params:params
        }
        return <OverPointListAndChart match={match} />
    }
    render() {
        return (
            <div>
                 {this.getrenderlist()}
            </div>
        );
    }
}

export default OverResponseCommon;