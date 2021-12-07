function urlSlashes (
    val: string,
) {
    return val.replace(/([^:]\/)\/+/g, '$1');
}

function pageUrlToAPI (val: URL) {
    return urlSlashes(`${val.origin}/api/page/${val.pathname}${val.search}`);
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


const normalizers = {
    urlSlashes,
    pageUrlToAPI,
    telephone,
    emptyWYSIWYGString,
    strToNum,
    numDecl,
};

export default normalizers;
