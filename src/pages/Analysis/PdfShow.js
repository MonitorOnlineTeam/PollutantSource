import React, { Component } from 'react';
import PDF from 'react-pdf-js';
import {imgaddress} from '../../config';
class PdfShow extends Component {
    render() {
        if(this.props.match.params.pdfname)
        {
            return (
                <div>
                      <PDF
                      file={imgaddress+this.props.match.params.pdfname}
                     />
                </div>
            );
        }
        return  <div></div>
    }
}

export default PdfShow;