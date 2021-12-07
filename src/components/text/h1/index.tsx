import { useSelector } from 'react-redux';
import { selectStorePageProps } from '@/store/reducers/page';

const TextH1 = () => {
    const props = useSelector(selectStorePageProps);
    const { description, longtitle, pagetitle } = props.document;

    if (description) {
        return <span dangerouslySetInnerHTML={{ __html: description }} />;
    }
    if (longtitle) {
        return <span dangerouslySetInnerHTML={{ __html: longtitle }} />;
    }
    if (pagetitle) {
        return <span dangerouslySetInnerHTML={{ __html: pagetitle }} />;
    }
    return <></>;
};
export default TextH1;
