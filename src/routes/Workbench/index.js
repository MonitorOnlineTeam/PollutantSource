// import React, { Component } from 'react';
// import { Card, Col, Row, List, message, Avatar, Spin} from 'antd';
// import InfiniteScroll from 'react-infinite-scroller';
// import reqwest from 'reqwest';
// import "./index.less";
 

// const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

// export default class WorkbenchComponet extends Component {
//   constructor(props) {
//     super(props)
  
//     this.state = {
//       data: [],
//       loading: false,
//       hasMore: true,
//     }
//   }
//   getData = (callback) => {
//     reqwest({
//       url: fakeDataUrl,
//       type: 'json',
//       method: 'get',
//       contentType: 'application/json',
//       success: (res) => {
//         callback(res);
//       },
//     });
//   }
//   componentDidMount() {
//     this.getData((res) => {
//       this.setState({
//         data: res.results,
//       });
//     });
//   }
//   handleInfiniteOnLoad = () => {
//     let data = this.state.data;
//     this.setState({
//       loading: true,
//     });
//     if (data.length > 14) {
//       message.warning('Infinite List loaded all');
//       this.setState({
//         hasMore: false,
//         loading: false,
//       });
//       return;
//     }
//     this.getData((res) => {
//       data = data.concat(res.results);
//       this.setState({
//         data,
//         loading: false,
//       });
//     });
//   }
//   render() {
//     return (
//       <div style={{ background: "#ECECEC", padding: "30px" }}>
//       <Row gutter={16}>
//         <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
//           <Card title="待办事项 | 2" bordered={false}>
//           <div className="demo-infinite-container">
//           <InfiniteScroll
//             initialLoad={false}
//             pageStart={0}
//             loadMore={this.handleInfiniteOnLoad}
//             hasMore={!this.state.loading && this.state.hasMore}
//             useWindow={false}
//           >
//             <List
//               dataSource={this.state.data}
//               renderItem={item => (
//                 <List.Item key={item.id}>
//                   <List.Item.Meta
//                     avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
//                     title={<a href="https://ant.design">{item.name.last}</a>}
//                     description={item.email}
//                   />
//                   <div>Content</div>
//                 </List.Item>
//               )}
//             >
//               {this.state.loading && this.state.hasMore && (
//                 <div className="demo-loading-container">
//                   <Spin />
//                 </div>
//               )}
//             </List>
//           </InfiniteScroll>
//         </div>
//           </Card>
//         </Col>
//         <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
//           <Card title="消息提醒 | 21" bordered={false}>
//             Card content
//           </Card>
//         </Col>
//       </Row>
//       <Row gutter={16} style={{marginTop:10 }}>
//         <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
//           <Card title="报警信息 | 12" bordered={false}>
//             Card content Card contentCard content
//           </Card>
//         </Col>
//         <Col xs={2} sm={6} md={12} lg={12} xl={12} xxl={12}>
//           <Card title="预警信息 | 2" bordered={false}>
//             Card content
//           </Card>
//         </Col>
//       </Row>
//     </div>
//     )
//   }
// }
