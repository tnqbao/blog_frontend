import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { BlogType } from "@/utils/types";
import { userApiInstance } from "@/utils/axios.config";

type VoteButtonProps = {
    blog: BlogType;
};

const VoteButton: React.FC<VoteButtonProps> = ({ blog }) => {
    const [upvoteCount, setUpvoteCount] = useState(blog.upvote);
    const [downvoteCount, setDownvoteCount] = useState(blog.downvote);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);

    useEffect(() => {
        const fetchVoteStatus = async () => {
            try {
                const response = await userApiInstance.get(`/post/status/vote/${blog.id}`);
                setIsUpvoted(response.data?.isUpvoted ?? false);
                setIsDownvoted(response.data?.isDownvoted ?? false);
            } catch (error) {
                console.error('Error fetching vote status:', error);
            }
        };

        fetchVoteStatus();
    }, [blog.id]);

    const handleUpvote = async () => {
        try {
            if (isUpvoted) {
                await userApiInstance.delete(`/post/upvote/${blog.id}`);
                setUpvoteCount((prev) => prev - 1);
                setIsUpvoted(false);
                localStorage.removeItem(`isUpvote@${blog.id}`);
            } else if (!isDownvoted) {
                await userApiInstance.put(`/post/upvote/${blog.id}`);
                setUpvoteCount((prev) => prev + 1);
                setIsUpvoted(true);
                localStorage.setItem(`isUpvote@${blog.id}`, 'true');
            } else {
                await userApiInstance.delete(`/post/downvote/${blog.id}`);
                setDownvoteCount((prev) => prev - 1);
                setIsDownvoted(false);
                await userApiInstance.put(`/post/upvote/${blog.id}`);
                localStorage.removeItem(`isDownVote@${blog.id}`);
                setUpvoteCount((prev) => prev + 1);
                setIsUpvoted(true);
                localStorage.setItem(`isUpvote@${blog.id}`, 'true');
            }
        } catch (error) {
            console.error('Error sending upvote:', error);
            alert('Failed to send upvote. Please try again.');
        }
    };

    const handleDownvote = async () => {
        try {
            if (isDownvoted) {
                await userApiInstance.delete(`/post/downvote/${blog.id}`);
                setDownvoteCount((prev) => prev - 1);
                setIsDownvoted(false);
                localStorage.removeItem(`isDownVote@${blog.id}`);
            } else if (!isUpvoted) {
                await userApiInstance.put(`/post/downvote/${blog.id}`);
                setDownvoteCount((prev) => prev + 1);
                setIsDownvoted(true);
                localStorage.setItem(`isDownVote@${blog.id}`, 'true');
            } else {
                await userApiInstance.delete(`/post/upvote/${blog.id}`);
                setUpvoteCount((prev) => prev - 1);
                setIsUpvoted(false);
                localStorage.removeItem(`isUpvote@${blog.id}`);
                await userApiInstance.put(`/post/downvote/${blog.id}`);
                setDownvoteCount((prev) => prev + 1);
                setIsDownvoted(true);
                localStorage.setItem(`isDownVote@${blog.id}`, 'true');
            }
        } catch (error) {
            console.error('Error sending downvote:', error);
            alert('Failed to send downvote. Please try again.');
        }
    };

    return (
        <div className={"flex gap-2"}>
            <Button
                onClick={handleUpvote}
                type={isUpvoted ? "primary" : "default"}
            >
                <svg fill="#000000" className={"w-6 h-6"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z" />
                </svg>
                {upvoteCount}
            </Button>
            <Button
                onClick={handleDownvote}
                type={isDownvoted ? "primary" : "default"}
            >
                <svg fill="#000000" className={"w-6 h-6"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059z" />
                </svg>
                {downvoteCount}
            </Button>
        </div>
    );
};

export default VoteButton;
