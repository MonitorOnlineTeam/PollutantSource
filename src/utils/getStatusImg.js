export function getPointStatusImg(status,stop)
{
    if(stop)
    {
        return '';
    }
    if (status === 0) {
        return <img style={{width:15}} src="/gisunline.png" />;
    } if (status === 1) {
        return <img style={{width:15}} src="/gisnormal.png" />;
    } if (status === 2) {
        return <img style={{width:15}} src="/gisover.png" />;
    }
    return <img style={{width:15}} src="/gisexception.png" />;
}