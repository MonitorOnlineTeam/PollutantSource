import React, { Component } from 'react';
import "react-image-lightbox/style.css";
import { MapInteractionCSS } from 'react-map-interaction';
import DirectMeasurementRecordContent from '../EmergencyTodoList/DirectMeasurementRecordContent';

export default class AppDirectMeasurement extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {match}=this.props;
        return (
            <MapInteractionCSS>
                <DirectMeasurementRecordContent {...match.params} />
            </MapInteractionCSS>
        );
    }
}