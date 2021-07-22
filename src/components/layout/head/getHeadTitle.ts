interface Data {
    pagetitle: string | undefined;
    longtitle: string | undefined;
}

function getHeadTitle ({
    pagetitle,
    longtitle,
}: Data) {
    if (longtitle) {
        return longtitle;
    }
    if (pagetitle) {
        return pagetitle;
    }
    return '';
}

export default getHeadTitle;
