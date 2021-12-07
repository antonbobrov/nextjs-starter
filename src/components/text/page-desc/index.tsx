import normalizers from '@/utils/normalizers';
import { useSelector } from 'react-redux';
import { selectStorePageProps } from '@/store/reducers/page';
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
                    <h2
                        className={`${styles.header} v-view_b`}
                        dangerouslySetInnerHTML={{ __html: introtext }}
                    />
                )}
                {contentEmpty ? '' : (
                    <div className={`${styles.desc} v-view_b`}>
                        <TextContent html={content} />
                    </div>
                )}
            </div>
        )
    );
};

export default TextPageDesc;
