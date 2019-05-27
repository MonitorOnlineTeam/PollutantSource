import React, { Component } from 'react';
import EntEquipmentOperatingRate from './EntEquipmentOperatingRate';
import EquipmentOperatingRate from './EquipmentOperatingRate';
import {onlyOneEnt} from '../../config';

class EquipmentOperatingRateCommon extends Component {
    getrenderlist=()=>{
        if(!onlyOneEnt)
        {
            return  <EntEquipmentOperatingRate />
        }
        const  params={
            entcode:null
        }
        const match={
            params:params
        }
        return <EquipmentOperatingRate match={match} />
    }
    render() {
        return (
            <div>
                 {this.getrenderlist()}
            </div>
        );
    }
}

export default EquipmentOperatingRateCommon;