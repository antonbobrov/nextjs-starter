import { FC } from 'react';
import { BaseTemplateData } from '../../../types/page';
import stringIsEmpty from '../../../utils/data/stringIsEmpty';
import TextContent from '../text-content';
import styles from './styles.module.scss';

const PageDesc: FC<BaseTemplateData> = ({
    document,
}) => {
    const { introtext, content } = document;
    const headerEmpty = stringIsEmpty(introtext);
    const contentEmpty = stringIsEmpty(content);
    const isEmpty = headerEmpty && contentEmpty;
    return (
        isEmpty ? <></> : (
            <div className={styles.container}>
                {headerEmpty ? '' : <h2 className={`${styles.container__header} v-view_b`}>{introtext}</h2>}
                {contentEmpty ? '' : (
                    <div className={`${styles.container__desc} v-view_b`}>
                        <TextContent html={content} />
                    </div>
                )}
            </div>
        )
    );
};

export default PageDesc;
