import PageContext from '../../../store/PageContext';

const H1Text = () => (
    <PageContext.Consumer>
        {(props) => {
            const { description, longtitle, pagetitle } = props.document;
            if (description) {
                return <span dangerouslySetInnerHTML={{ __html: description }} />;
            }
            if (longtitle) {
                return <span dangerouslySetInnerHTML={{ __html: longtitle }} />;
            }
            if (pagetitle) {
                return <span dangerouslySetInnerHTML={{ __html: pagetitle }} />;
            }
            return '';
        }}
    </PageContext.Consumer>
);
export default H1Text;
