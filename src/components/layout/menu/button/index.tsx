import { forwardRef, useContext } from 'react';
import PageContext from '@/store/PageContext';
import store from '@/store/store';
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
    const pageProps = useContext(PageContext);
    const { lexicon } = pageProps;

    return (
        <button
            ref={ref}
            type="button"
            className={styles.layout_menu_button}
            onClick={() => {
                store.dispatch({
                    type: isActive ? 'HIDE_POPUP_MENU' : 'SHOW_POPUP_MENU',
                });
            }}
        >
            <span>{isActive ? lexicon.hideMenu : lexicon.showMenu}</span>
        </button>
    );
});
LayoutMenuButton.displayName = 'LayoutMenuButton';
export default LayoutMenuButton;
