import { useContext } from 'react';
import PageContext from '@/store/PageContext';

const TextH1 = () => {
    const props = useContext(PageContext);
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
