import {useRouter} from "next/router";

const Page404 = () => {
    const router = useRouter();
    router.push('../');
    return (
        <div>
        <h1>404 - Page Not Found</h1>
        </div>
    );
}

export default Page404;