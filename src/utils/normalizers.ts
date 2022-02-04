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


function numDecl (
    number: number,
    names: string[],
) {
    const cases = [2, 0, 1, 1, 1, 2];
    return names[
        (number % 100 > 4 && number % 100 < 20)
            ? 2
            : cases[(number % 10 < 5)
                ? number % 10
                : 5]
    ];
}



function dateToText (date: string) {
    if (date) {
        const datetime = new Date(date);
        return `${datetime.getDate()}.${datetime.getMonth() + 1}.${datetime.getFullYear()}`;
    }
    return '';
}

function dateToValue (date: string) {
    if (date) {
        const datetime = new Date(date);
        const monthNum = datetime.getMonth() + 1;
        const monthString = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
        const dateNum = datetime.getDate();
        const dateString = dateNum < 10 ? `0${dateNum}` : `${dateNum}`;
        return `${datetime.getFullYear()}-${monthString}-${dateString}`;
    }
    return '';
}


const normalizers = {
    urlSlashes,
    telephone,
    emptyWYSIWYGString,
    strToNum,
    numDecl,
    dateToText,
    dateToValue,
};

export default normalizers;
