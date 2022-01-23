import { useSelector } from 'react-redux';
import { VFC } from 'react';
import { selectPagePropsGlobal } from '@/store/reducers/pageProps';

const TextH1: VFC = () => {
    const globalProps = useSelector(selectPagePropsGlobal);
    const { description, longtitle, pagetitle } = globalProps.document;

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
