import React, {useCallback, useEffect, useState} from 'react';
import {BlogType} from "@/utils/types";
import {withAuth} from "@/utils/authGuard";
import {parse} from "cookie";
import {userApiInstance} from "@/utils/axios.config";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import MenuBar from "@/components/menu-bar";
import ListBlog from "@/components/contents/list-blog";
import {useRouter} from 'next/router';
import ScrollToTopButton from "@/components/scroll-to-top-button";
import {Skeleton} from "antd";

type TrendingPageProps = {
    initialBlogs: BlogType[] | null;
    currentPage: number;
};

const HomePage: React.FC<TrendingPageProps> = ({initialBlogs, currentPage}) => {
    const [blogs, setBlogs] = useState<BlogType[]>(initialBlogs || []);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    // const [isOpen, changeIsOpen] = useState<boolean>(false);
    const [showScrollTopButton, setShowScrollTopButton] = useState<boolean>(false);
    const router = useRouter();

    const fetchMoreBlogs = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const nextPage = currentPage + 1;
            const response = await userApiInstance.get(`/feed/allPosts/${nextPage}`, {
                withCredentials: true,
            });

            const newBlogs: BlogType[] = response.data?.postInPage.map((blog: any) => ({
                id: blog.id,
                title: blog.title,
                body: blog.body,
                upvote: blog.upvote,
                downvote: blog.downvote,
                createdAt: blog.createdAt,
                user: {
                    fullname: blog.user.fullname,
                },
            }));

            if (newBlogs.length === 0) {
                setHasMore(false);
            } else {
                setBlogs((prev) => [...prev, ...newBlogs]);
                router.push(
                    {
                        pathname: router.pathname,
                        query: {...router.query, page: nextPage},
                    },
                    undefined,
                    {scroll: false}
                );
            }
        } catch (error) {
            console.error("Error fetching more blogs:", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, loading, hasMore, router]);


    useEffect(() => {
        const handleScroll = () => {
            const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
                fetchMoreBlogs();
            }

            if (scrollTop > 300) {
                setShowScrollTopButton(true);
            } else {
                setShowScrollTopButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchMoreBlogs, loading, hasMore]);

    return (
        <div className={"bg-white flex flex-wrap md:flex-nowrap"}>
            <title>Home</title>
            <div className={"flex md:w-1/5"}>
                <MenuBar isResponsive={false} defaultSelected={'1'}/>
            </div>
            <div className={"flex flex-col md:w-3/5 gap-4 justify-center items-center"}>
                {/*<div >{*/}
                {/*    isOpen ? <BlogUpload /> : <Button*/}
                {/*        className="w-1/4 text-sm mt-5"*/}
                {/*        onClick={() => {*/}
                {/*            changeIsOpen(true);*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        Hôm nay bạn nghĩ gì?*/}
                {/*    </Button>*/}
                {/*}</div>*/}
                <ListBlog Blogs={blogs}/>
                {loading && <Skeleton active/>}
                {loading && <Skeleton active/>}
                {!hasMore && <p className={"items-center align-middle text-center "}> No more blogs to load.</p>}
            </div>
            <div className={"flex md:w-1/5"}></div>

            {showScrollTopButton && (
                <ScrollToTopButton/>
            )}
        </div>
    );
};

export const getServerSideProps = withAuth(async ({locale, req, query}) => {
    const currentLocale = locale || "en";
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.jwt;

    const page = query.page ? parseInt(query.page as string, 10) : 1;

    try {
        const response = await userApiInstance.get(`/feed/allPosts/${page}`, {
            headers: {
                Authorization: `${token}`,
            },
            withCredentials: true,
        });

        const data = response.data;
        const blogs: BlogType[] = Array.isArray(data?.postInPage)
            ? data.postInPage.map((blog: any) => ({
                id: blog.id,
                title: blog.title,
                body: blog.body,
                upvote: blog.upvote,
                downvote: blog.downvote,
                createdAt: blog.createdAt,
                user: {
                    fullname: blog.user.fullname,
                },
            }))
            : [];

        return {
            props: {
                ...(await serverSideTranslations(currentLocale, ["blog", "common"])),
                blogs,
                currentPage: page,
            },
        };
    } catch (error) {
        console.error("Error fetching posts:", error);

        return {
            props: {
                blogs: [],
                error: 'Could not fetch the posts. Please try again later.',
            },
        };
    }
});


export default HomePage;
