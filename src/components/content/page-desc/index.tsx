import { useContext } from 'react';
import PageContext from '../../../store/PageContext';
import stringIsEmpty from '../../../utils/data/stringIsEmpty';
import TextContent from '../text-content';
import styles from './styles.module.scss';

const PageDesc = () => {
    const props = useContext(PageContext);
    const { introtext, content } = props.document;
    const headerEmpty = stringIsEmpty(introtext);
    const contentEmpty = stringIsEmpty(content);
    const isEmpty = headerEmpty && contentEmpty;

    return (
        isEmpty ? <></> : (
            <div className={styles.page_desc}>
                {headerEmpty ? '' : (
                    <h2
                        className={`${styles.page_desc__header} v-view_b`}
                        dangerouslySetInnerHTML={{ __html: introtext }}
                    />
                )}
                {contentEmpty ? '' : (
                    <div className={`${styles.page_desc__desc} v-view_b`}>
                        <TextContent html={content} />
                    </div>
                )}
            </div>
        )
    );
};

export default PageDesc;
