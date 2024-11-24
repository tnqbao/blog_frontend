import Upload from "@/components/blog-upload";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const NewPost: React.FC = () => {
    return (
        <div className={"bg-white w-full h-[550px]"}>
            <Upload></Upload>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const currentLocale = locale || "en";
    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
        },
    };
};


export default NewPost;