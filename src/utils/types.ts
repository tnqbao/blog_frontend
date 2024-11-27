export interface user {
  id: number;
  username: string;
  mail: string;
  dateOfBirth: string;
  fullname: string;
}

export interface post {
  id: number;
  title: string;
  body: string;
  upvote: number;
  downvote: number;
  user: user | null;
}

export interface BlogType {
    id: number;
    title: string;
    body: string;
    upvote: number;
    downvote: number;
    createdAt: string;
    user: {
        fullname: string;
    };
}

export interface User {
    id: number;
    username: string;
    mail: string;
    dateOfBirth: string;
    fullname: string;
}