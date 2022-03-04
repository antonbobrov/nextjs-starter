import { forwardRef } from 'react';
import store from '@/store/store';
import { useSelector } from 'react-redux';
import { selectLexicon } from '@/store/reducers/lexicon';
import layoutSlice from '@/store/reducers/layout';
import styles from './styles.module.scss';

interface Props {
    isActive: boolean;
}

const LayoutMenuButton = forwardRef<
    HTMLButtonElement,
    Props
>((
    {
        isActive,
    },
    ref,
) => {
    const lexicon = useSelector(selectLexicon);

    return (
        <button
            ref={ref}
            type="button"
            className={styles.layout_menu_button}
            onClick={() => {
                store.dispatch(
                    isActive
                        ? layoutSlice.actions.hidePopupMenu()
                        : layoutSlice.actions.showPopupMenu(),
                );
            }}
        >
            <span>{isActive ? lexicon.hideMenu : lexicon.showMenu}</span>
        </button>
    );
});
LayoutMenuButton.displayName = 'LayoutMenuButton';
export default LayoutMenuButton;
