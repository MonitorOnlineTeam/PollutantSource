import React, { Component } from 'react';
import EntPollutantEmissions from './EntPollutantEmissions';
import PollutantEmissions from './PollutantEmissions';
import {onlyOneEnt} from '../../config';

class PollutantEmissionsCommon extends Component {
    getrenderlist=()=>{
        if(!onlyOneEnt)
        {
            return  <EntPollutantEmissions />
        }
        const params={
            entcode:null
        }
        const match={
            params:params
        }
        return <PollutantEmissions match={match} />
    }
    render() {
        return (
            <div>
                 {this.getrenderlist()}
            </div>
        );
    }
}

export default PollutantEmissionsCommon;