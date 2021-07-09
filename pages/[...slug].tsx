import { GetServerSideProps } from 'next';
import BaseTemplate from '../src/templates/Base';
import ITemplateData from '../src/templates/types';
import getPageServerProps from '../src/helpers/server/_getPageServerProps';

const Router = (props: ITemplateData) => (
    <>
        <BaseTemplate {...props} />
    </>
);

export default Router;

export const getServerSideProps: GetServerSideProps<ITemplateData> = async (context) => {
    const data = await getPageServerProps(context.resolvedUrl);
    return {
        props: {
            ...data,
        },
    };
};
