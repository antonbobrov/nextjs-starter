import app from '../app';

const pageIsLoading = (function func () {
    let count = 0;

    function start () {
        count += 1;
        handler();
    }
    function end () {
        count -= 1;
        if (count < 0) {
            count = 0;
        }
        handler();
    }

    function handler () {
        app.html.classList.toggle('is-loading', count > 0);
    }

    return {
        start,
        end,
    };
}());
export default pageIsLoading;
