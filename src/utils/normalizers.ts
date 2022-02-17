function urlSlashes (
    val: string,
) {
    function getUrl (
        protocol: string,
    ) {
        if (val.startsWith(protocol)) {
            return {
                protocol,
                url: val.substring(protocol.length),
            };
        }
        return undefined;
    }

    const res = getUrl('https://') || getUrl('http://') || getUrl('://') || {
        protocol: '',
        url: val,
    };

    const urlParts = res.url.split('?');
    const urlNoQuery = urlParts[0].replace(/([^:]\/)\/+/g, '$1');

    return res.protocol + urlNoQuery + (urlParts[1] ? `?${urlParts[1]}` : '');
}

function telephone (
    val: string,
) {
    return val.replace(/[^0-9+]/g, '');
}

function emptyWYSIWYGString (
    val: undefined | string,
) {
    if (val) {
        return val.length === 0 || val.replace(/\s+/g, '').length === 0;
    }
    return true;
}

function strToNum (
    arg: string | number,
) {
    let val = `${arg}`;
    val = val.replace(',', '.');
    val = val.replace(/[^\d,.]/g, '');
    const float = parseFloat(val);
    return Number.isNaN(float) ? 0 : float;
}

const normalizers = {
    urlSlashes,
    telephone,
    emptyWYSIWYGString,
    strToNum,
};

export default normalizers;
