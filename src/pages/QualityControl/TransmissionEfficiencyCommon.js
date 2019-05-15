import React, { Component } from 'react';
import EntTransmissionEfficiency from './EntTransmissionEfficiency';
import TransmissionEfficiency from './TransmissionEfficiency';
import {onlyOneEnt} from '../../config';

class TransmissionEfficiencyCommon extends Component {
    getrenderlist=()=>{
        if(!onlyOneEnt)
        {
            return  <EntTransmissionEfficiency />
        }
        const  params={
            entcode:null
        }
        const match={
            params:params
        }
        return <TransmissionEfficiency match={match} />
    }
    render() {
        return (
            <div>
                 {this.getrenderlist()}
            </div>
        );
    }
}

export default TransmissionEfficiencyCommon;