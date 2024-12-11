import { useState, useEffect } from "react";
import { userApiInstance } from "@/utils/axios.config";
import Comment from "@/components/contents/comment";
import { CommentType } from "@/utils/types";
import {useSelector} from "react-redux";
import {RootState} from "@/utils/redux/store";

const CommentList: React.FC<{ blogId: number; comments: CommentType[]; setComments: React.Dispatch<React.SetStateAction<CommentType[]>> }> = ({ blogId, comments, setComments }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await userApiInstance.get(`/post/comments/${blogId}`);
                setComments(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Cannot fetch comments:", error);
                setIsLoading(false);
            }
        };

        fetchComments();
    }, [blogId, setComments]);

    if (isLoading) {
        return <div>Loading comments...</div>;
    }

    return (
        <div className={"bg-white h-auto flex flex-col p-4 gap-2"}>
            {Array.isArray(comments) && comments.length > 0 ? (
                comments.map((comment) => (
                    <Comment
                        comment={comment}
                        userId={user.id}
                    />
                ))
            ) : (
                <p>No comments available.</p>
            )}
        </div>
    );
};

export default CommentList;
