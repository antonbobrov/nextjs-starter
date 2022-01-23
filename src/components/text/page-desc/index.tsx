import normalizers from '@/utils/normalizers';
import { useSelector } from 'react-redux';
import LayoutScrollView from '@/components/layout/scroll-view';
import { VFC } from 'react';
import { selectPagePropsGlobal } from '@/store/reducers/pageProps';
import TextContent from '../content';
import styles from './styles.module.scss';

const TextPageDesc: VFC = () => {
    const globalProps = useSelector(selectPagePropsGlobal);
    const { introtext, content } = globalProps.document;
    const headerEmpty = normalizers.emptyWYSIWYGString(introtext);
    const contentEmpty = normalizers.emptyWYSIWYGString(content);
    const isEmpty = headerEmpty && contentEmpty;

    return (
        isEmpty ? <></> : (
            <div className={styles.text_page_desc}>
                {headerEmpty ? '' : (
                    <LayoutScrollView animation="bottom">
                        <h2
                            className={styles.header}
                            dangerouslySetInnerHTML={{ __html: introtext }}
                        />
                    </LayoutScrollView>
                )}
                {contentEmpty ? '' : (
                    <LayoutScrollView animation="bottom">
                        <div className={styles.desc}>
                            <TextContent html={content} />
                        </div>
                    </LayoutScrollView>
                )}
            </div>
        )
    );
};

export default TextPageDesc;
