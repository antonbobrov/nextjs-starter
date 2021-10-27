import dynamic from 'next/dynamic';
import { manuallyUpdateTemplateKey } from '../app';
import PageContext from '../store/PageContext';

const Empty = dynamic(import('./Empty'), {
    ssr: true,
});
const NotFound = dynamic(import('./not-found'), {
    ssr: true,
});
const Home = dynamic(import('./home'), {
    ssr: true,
});
const Text = dynamic(import('./text'), {
    ssr: true,
});
const Examples = dynamic(import('./examples'), {
    ssr: true,
});

const RenderTemplate = () => (
    <PageContext.Consumer>
        {(props) => {
            const { template } = props;
            const time = manuallyUpdateTemplateKey ? +new Date() : props.time;
            switch (template) {
                case 'not-found':
                    return <NotFound key={time} />;
                case 'home':
                    return <Home {...props as any} key={props.time} />;
                case 'text':
                    return <Text {...props as any} key={props.time} />;
                case 'examples':
                    return <Examples {...props as any} key={props.time} />;
                default:
                    return <Empty key={time} />;
            }
        }}
    </PageContext.Consumer>
);

export default RenderTemplate;
