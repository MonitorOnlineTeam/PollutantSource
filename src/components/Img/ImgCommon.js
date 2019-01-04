import React, { PureComponent } from 'react';
 
/**
 * 图片加载失败就显示默认图片
 */
class ImgCommon extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: this.props.imageUrl
        };
    }

    handleImageLoaded() {
    }

    handleImageErrored() {
        this.setState({
            imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1545898494&di=a3db233138df9b81db138ccecf963537&src=http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1606/18/c10/23006869_1466217538615_mthumb.jpg'
        });
    }

    render() {
        return (
            <img style={this.props.style}
                key={this.props.key}
                src={this.state.imageUrl}
                onLoad={this.handleImageLoaded}
                onError={this.handleImageErrored.bind(this)}
            />
        );
    }
}
export default ImgCommon;