import dynamic from 'next/dynamic';
import PageContext from '../store/pageContext';

const Empty = dynamic(import('./Empty'), {
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
            switch (template) {
                case 'home':
                    return <Home {...props as any} key={props.time} />;
                case 'text':
                    return <Text {...props as any} key={props.time} />;
                case 'examples':
                    return <Examples {...props as any} key={props.time} />;
                default:
                    return <Empty key={props.time} />;
            }
        }}
    </PageContext.Consumer>
);

export default RenderTemplate;
