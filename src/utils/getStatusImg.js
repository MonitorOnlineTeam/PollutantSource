import styles from './utils.less'
export function getPointStatusImg(status, stop, type = 1, width, path) {
    if (stop) {
        return '';
    }

    let imgSrc, imgWidth;
    if (type === 1) {
        imgWidth = 15;
        imgSrc = "/gisunline.png";
        if (status === 1) {
            imgSrc = "/gisnormal.png"
        }
        if (status === 2) {
            imgSrc = "/gisover.png"
        }
        if (status === 3) {
            imgSrc = "/gisexception.png"
        }
    } else if (type === 2) {
        imgWidth = 20;
        imgSrc = "/gas@unline.png";
        if (status === 1) {
            imgSrc = "/gas@normal.png"
        }
        if (status === 2) {
            imgSrc = "/gas@over.png"
        }
        if (status === 3) {
            imgSrc = "/gas@exception.png"
        }
    }
    else if (type === 10) {
        imgWidth = 20;
        imgSrc = "/vocunline.png";
        if (status === 1) {
            imgSrc = "/vocnormal.png"
        }
        if (status === 2) {
            imgSrc = "/vocover.png"
        }
        if (status === 3) {
            imgSrc = "/vocexception.png"
        }
    }
    else if (type === 12) {
        imgWidth = 20;
        imgSrc = "/dustunline.png";
        if (status === 1) {
            imgSrc = "/dustnormal.png"
        }
        if (status === 2) {
            imgSrc = "/dustover.png"
        }
        if (status === 3) {
            imgSrc = "/dustexception.png"
        }
    }
    if (width) {
        imgWidth = width;
    }
    if (path === "home") {
        return <div className={styles.container}>
            <img className={styles.dot} style={{ width: 20 }} src={imgSrc} />
            {status === 2 && <div className={styles.pulse}></div>}
            {status === 2 && <div className={styles.pulse1}></div>}
        </div>
    } else {
        return <img style={{ width: imgWidth }} src={imgSrc} />;
    }

}