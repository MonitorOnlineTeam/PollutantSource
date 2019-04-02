export function getPointStatusImg(status, stop, type = 1) {
    if (stop) {
        return '';
    }
    // if (status === 0) {
    //     return <img style={{width:15}} src="/gisunline.png" />;
    // } if (status === 1) {
    //     return <img style={{width:15}} src="/gisnormal.png" />;
    // } if (status === 2) {
    //     return <img style={{width:15}} src="/gisover.png" />;
    // }
    // return <img style={{width:15}} src="/gisexception.png" />;


    let imgSrc, imgWidth;
    if (type === 1) {
        imgWidth = 15;
        imgSrc = "/gisexception.png";
        if (status === 0) {
            imgSrc = "/gisunline.png"
        }
        if (status === 1) {
            imgSrc = "/gisnormal.png"
        }
        if (status === 2) {
            imgSrc = "/gisover.png"
        }
    } else {
        imgWidth = 20;
        imgSrc = "/gas@exception.png";

        if (status === 0) {
            imgSrc = "/gas@unline.png"
        }
        if (status === 1) {
            imgSrc = "/gas@normal.png"
        }
        if (status === 2) {
            imgSrc = "/gas@over.png"
        }
    }
    return <img style={{ width: imgWidth }} src={imgSrc} />;
}