import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {withAuth} from "@/utils/authGuard";

const ProfilePage : React.FC = () => {
    return (
        <div>
            <ProfilePage />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = withAuth(async ({ locale }) => {
    const currentLocale = locale || "en";
    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
        },
    };
});

export default ProfilePage;