import { userApiInstance } from '@/utils/axiosConfig';
import { GetServerSideProps } from 'next';
import nextI18NextConfig from "@/../next-i18next.config.js";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { user } from '@/utils/types';
import { Card, Typography, Divider } from 'antd';
import { FC } from 'react';

const { Title, Text } = Typography;

interface Props {
  id: number;
  title: string;
  body: string;
  upvote: string;
  downvote: string;
  user: user | null;
}

const PostPage: FC<Props> = ({ id, title, body, upvote, downvote, user }) => {
  return (
      <Card title={`Post ID: ${id}`} style={{ maxWidth: 600, margin: 'auto', marginTop: 20 }}>
        <Title level={3}>{title}</Title>
        <Text>{body}</Text>
        <Divider />
        <Text strong>Upvotes:</Text> {upvote} | <Text strong>Downvotes:</Text> {downvote}
        <Divider />
        <Text type="secondary">Author: {user ? user.username : "Anonymous"}</Text>
      </Card>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const id = query.id ? Number(query.id) : 1;
  const currentLocale = locale || "en";
  try {
    console.log("ID:", id);
    const response = await userApiInstance.get(`/post/${id}`, {withCredentials: true});
    const data = response.data;
    return {
      props: {
        ...(await serverSideTranslations(currentLocale, ["common"], nextI18NextConfig)),
        id: data.id,
        title: data.title,
        body: data.body,
        upvote: data.upvote,
        downvote: data.downvote,
        user: data.user || null,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        ...(await serverSideTranslations(currentLocale, ["common"], nextI18NextConfig)),
        error: "Error fetching data",
      },
    };
  }
};
