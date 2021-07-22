import { ITemplateBase } from '../../../templates/placeholder';
import stringIsEmpty from '../../../utils/types/stringIsEmpty';
import styles from './PageDesc.module.scss';

const PageDesc = ({
    document,
}: ITemplateBase) => {
    const { introtext, content } = document;
    const headerEmpty = stringIsEmpty(introtext);
    const contentEmpty = stringIsEmpty(content);
    const isEmpty = headerEmpty && contentEmpty;
    return (
        isEmpty ? <></> : (
            <div className={styles.page_desc}>
                {headerEmpty ? '' : <h2 className={styles.page_desc__header}>{introtext}</h2>}
                {contentEmpty ? '' : <div className={styles.page_desc__desc}>{content}</div>}
            </div>
        )
    );
};

export default PageDesc;
