import { Map, MouseTool,Polygon } from 'react-amap';
import React from 'react';
import {
    Input,
    Card,
    Row,
    Col,
    Form,
    Button 
} from 'antd';
const FormItem = Form.Item;
const layerStyle = {
  padding: '10px',
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: '4px',
  position: 'absolute',
  top: '10px',
  left: '30px'
};
let thismap=null;
@Form.create()
 class MadMouseTool extends React.Component{
  constructor(){
    super();
    const self =this;
    this.state = {
      what: '点击下方按钮开始绘制',
      polygon:self.props?self.props.polygon:null,
      center:self.props?self.props.center:null
    };
    this.toolEvents = {
      created: (tool) => {
        console.log(tool)
        self.tool = tool;
      },
      draw({obj}) {
        self.drawWhat(obj);
      }
    }
    this.mapPlugins = ['ToolBar'];
    this.mapCenter = {longitude: 120, latitude: 35};
  }
  componentWillMount(){
   this.drawRectangle();
   this.setState(
       {
        polygon:this.props.polygon,
        center:this.props.center
       }
   )
   this.props.onRef(this);
  }
  
mapEvents = {
    created(m) {
        thismap = m;
    },
    zoomchange: (value) => {

    },
    complete: () => {
      console.log(thismap);
        if (this.tool) {
            this.tool.polygon();
          }
    }
  };
  
  drawWhat(obj) {
    let text = '';
    switch(obj.CLASS_NAME) {
      case 'AMap.Marker':
       text = `你绘制了一个标记，坐标位置是 {${obj.getPosition()}}`;
       break;
      case 'AMap.Polygon':
        text = `你绘制了一个多边形，有${obj.getPath()}个端点`;
        if (obj.getPath() && obj.getPath().length > 0)
        {
            var newpoint = new Array();
            var gaodei = new Array();
            for (var i = 0; i < obj.getPath().length; i++) {
                var arr = new Array();
                arr.push(obj.getPath()[i].lng);
                arr.push(obj.getPath()[i].lat);
                gaodei.push(arr);
            }
            newpoint.push(gaodei);
            let coordinatesetArray = new Array();
            if (newpoint && newpoint.length > 0)
            {
                for (let tep = 0; tep < newpoint.length; tep++)
                {
                    var tempring = new Array();
                    tempring.push(newpoint[tep]);
                    coordinatesetArray.push(tempring);
                }
            }
            var arr = [];
            for (let key in coordinatesetArray) {
                arr.push(coordinatesetArray[key]);
            }
            var coordinateset = this.json2string(arr);
            this.setState({
                polygon:coordinateset
            })
            
        }
       
        break;
      case 'AMap.Circle':
        text = `你绘制了一个圆形，圆心位置为{${obj.getCenter()}}`;
        break;
      default:
        text = '';
    }
    this.setState({
      what: text
    });
  }
   

  drawPolygon() {
    if (this.tool) {
      this.tool.polygon();
    }
  }
  


  close(){
    this.setMap(null);
    if (this.tool){
      this.tool.close();
    }
    this.setState({
      what: '关闭了鼠标工具'
    });
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    const {polygon}=this.state;
    const allcoo = eval(polygon);
    return <div>
      <div style={{width: '100%', height: 370}}>

       <Card >
                    <Row gutter={48} >
                        <Col span={12} >
                            <FormItem labelCol={{span: 8}}
                                wrapperCol={{span: 12}}
                                label="厂界" > {
                                    getFieldDecorator('position',
                                        {
                                            initialValue: this.state.polygon,
                                        }
                                    )(<Input style={{width:500}}  />)
                                } </FormItem>
                        </Col>
                    </Row>
                </Card>
        <div style={{height:250}}>
        <Map 
          plugins={this.mapPlugins}
          events={this.mapEvents}
          center={this.state.center}
          zoom={11}  
          mapStyle={'fresh'}
        >
                      {
                                            allcoo ? allcoo.map((item, key) => {
                                                return (
                                                    <Polygon
                                                        key={key}
                                                        style={{
                                                            strokeColor: '#FF33FF',
                                                            strokeOpacity: 0.2,
                                                            strokeWeight: 3,
                                                            fillColor: '#1791fc',
                                                            fillOpacity: 0.35,
                                                        }}
                                                        path={item[key]}
                                                    />);
                                            }) :''
                                        }
          <MouseTool events={this.toolEvents}/>
          {/* <div style={layerStyle}>{this.state.what}</div> */}
        </Map></div>
       </div>
       {/* <Button style={{marginRight:10,marginLeft:10}} onClick={()=>{this.drawMarker()}}>编辑地点</Button> */}
       {/* <Button onClick={()=>{this.drawRectangle()}}>Draw Rectangle</Button>
       <Button onClick={()=>{this.drawCircle()}}>Draw Circle</Button> */}
       {/* <Button onClick={()=>{this.drawPolygon()}}>编辑厂界</Button> */}
       {/* <Button onClick={()=>{this.close()}}>Close</Button> */}
     </div>
  }
}
export default MadMouseTool;
