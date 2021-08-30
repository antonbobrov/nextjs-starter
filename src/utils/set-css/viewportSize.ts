import app from '../../app';

export default (function viewportSize () {
    if (app) {
        app.viewport.add('', () => {
            set();
        }, {
            name: 'Viewport CSS Vars',
        });
        app.pageLoad.add('', () => {
            set();
        });
        set();
    }

    function set () {
        if (!app) {
            return;
        }
        // viewport width
        app.html.style.setProperty('--vw', `${getVW()}px`);
        // viewport height
        app.html.style.setProperty('--vh', `${getVH()}px`);
    }

    function getVW () {
        return app ? app.viewport.width / 100 : 0;
    }
    function getVH () {
        return app ? app.viewport.height / 100 : 0;
    }

    return {
        vw: () => getVW(),
        vh: () => getVH(),
    };
}());
