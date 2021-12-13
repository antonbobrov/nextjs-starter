import normalizers from '@/utils/normalizers';
import { useSelector } from 'react-redux';
import { selectStorePageProps } from '@/store/reducers/page';
import LayoutScrollView from '@/components/layout/scroll-view';
import TextContent from '../content';
import styles from './styles.module.scss';

const TextPageDesc = () => {
    const props = useSelector(selectStorePageProps);
    const { introtext, content } = props.document;
    const headerEmpty = normalizers.emptyWYSIWYGString(introtext);
    const contentEmpty = normalizers.emptyWYSIWYGString(content);
    const isEmpty = headerEmpty && contentEmpty;

    return (
        isEmpty ? <></> : (
            <div className={styles.text_page_desc}>
                {headerEmpty ? '' : (
                    <LayoutScrollView viewClassName="v-view_b">
                        <h2
                            className={styles.header}
                            dangerouslySetInnerHTML={{ __html: introtext }}
                        />
                    </LayoutScrollView>
                )}
                {contentEmpty ? '' : (
                    <LayoutScrollView viewClassName="v-view_b">
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
