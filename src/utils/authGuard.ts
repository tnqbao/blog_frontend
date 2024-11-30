import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const withAuth = (gssp: GetServerSideProps) => {
    return async (context: GetServerSidePropsContext) => {
        const cookie = require('cookie');
        const { req } = context;
        const cookies = req.headers && req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
        const token = cookies.auth_token;

        if (!token) {
            return {
                redirect: {
                    destination: '../auth/login',
                    permanent: false,
                },
            };
        }
        return gssp(context);
    };
};
