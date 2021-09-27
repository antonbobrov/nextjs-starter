import app from '../../../app';

const settings = {
    tagName: 'lit-simple-popup',
    duration: 450,
    overlay: {
        scope: [0, 0.75],
        easing: app.prop.easing,
    },
    container: {
        scope: [0.25, 1],
        easing: app.prop.easing,
    },
};
export default settings;
