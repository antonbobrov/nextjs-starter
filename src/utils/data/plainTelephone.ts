export default function plainTelephone (
    val: string,
) {
    return val.replace(/[^0-9+]/g, '');
}
