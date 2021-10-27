import { FC } from 'react';
import HorizontalScrollList from '../../../../components/sliders/horizontal-scroll-list';
import styles from './styles.module.scss';

const ExampleScrollList: FC = () => {
    const items = [{
        id: 0,
        header: 'Item 1',
    }, {
        id: 1,
        header: 'Item 2',
    }, {
        id: 2,
        header: 'Item 3',
    }, {
        id: 3,
        header: 'Item 4',
    }, {
        id: 4,
        header: 'Item 5',
    }, {
        id: 5,
        header: 'Item 6',
    }, {
        id: 6,
        header: 'Item 7',
    }, {
        id: 7,
        header: 'Item 8',
    }, {
        id: 8,
        header: 'Item 9',
    }, {
        id: 9,
        header: 'Item 10',
    }];

    return (
        <HorizontalScrollList>
            <div className={styles.example_scroll_list}>
                {items.map((item) => (
                    <div key={item.id}>
                        <span>{item.header}</span>
                    </div>
                ))}
            </div>
        </HorizontalScrollList>
    );
};

export default ExampleScrollList;
