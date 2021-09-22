import PageContext from '../../../store/pageContext';

const H1Text = () => (
    <PageContext.Consumer>
        {(props) => {
            const { description, longtitle, pagetitle } = props.document;
            if (description) {
                return description;
            }
            if (longtitle) {
                return longtitle;
            }
            if (pagetitle) {
                return pagetitle;
            }
            return '';
        }}
    </PageContext.Consumer>
);
export default H1Text;
