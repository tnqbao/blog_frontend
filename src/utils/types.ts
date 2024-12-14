
export interface post {
  id: number;
  title: string;
  body: string;
  upvote: number;
  downvote: number;
  user: UserType | null;
}

export interface BlogType {
    id: number;
    title: string;
    body: string;
    upvote: number;
    downvote: number;
    createdAt: string;
    user: {
        id: number;
        fullname: string;
    };
}

export interface UserType {
    id: number;
    username: string;
    mail: string;
    dateOfBirth: string;
    fullname: string;
}

export interface UserTypeProps {
    user: UserType;
}

export interface ListBlogType {
    Blogs: BlogType[] | null;
    error?: string;
}

export interface CommentType {
    id: number;
    body: string;
    createdAt : string;
    user: UserType;
}

export interface MindmapDataTypes {
    id : number;
    title: string;
    similarity: number;
    content: string;
}