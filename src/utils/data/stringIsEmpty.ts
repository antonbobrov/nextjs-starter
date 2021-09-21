function stringIsEmpty (
    val: undefined | string,
) {
    if (val) {
        return val.length === 0 || val.replace(/\s+/g, '').length === 0;
    }
    return true;
}

export default stringIsEmpty;
