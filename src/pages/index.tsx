import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { withAuth } from "@/utils/authGuard";


const HomePage: React.FC = () => {
    return (
        <div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = withAuth(async ({ locale }) => {
    const currentLocale = locale || "en";

    try {
        return {
            props: {
                ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
            }
        };
    } catch (error) {
        return {
            props: {
                error: 'Could not fetch the post. Please try again later.',
            }
        };
    }
});

export default HomePage;
