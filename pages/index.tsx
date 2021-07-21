import { GetServerSideProps } from 'next';
import BaseTemplate from '../src/templates/Base';
import type { ITemplateBase } from '../src/templates/placeholder';
import getPageServerProps from '../src/server/getPageServerProps';

const Router = (props: ITemplateBase) => (
    <>
        <BaseTemplate {...props} />
    </>
);

export default Router;

export const getServerSideProps: GetServerSideProps<ITemplateBase> = async (context) => {
    const data = await getPageServerProps(context.resolvedUrl);
    return {
        props: {
            ...data,
        },
    };
};
