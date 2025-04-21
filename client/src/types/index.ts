import Answer from "../components/Answer";

export type PostsResponse = {
  posts: Post[];
  error: string;
};

export interface Post {
  id: number;
  title: string;
  body: string;
  creation: number;
  score: number;
  user: User;
  comments: Comment[];
  answers: Answer[];
}

export interface User {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  body: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
}

export interface Answer {
  id: number;
  body: string;
  creation: number;
  score: number;
  user: User;
  accepted: boolean;
  comments: Comment[];
}

export type InitialStatePostsStore = Pick<PostsResponse, "posts">;

export interface PostCardProps {
  id: number;
  title: string;
  creation: number;
  score: number;
  user: string;
  commentsCount: number;
  answersCount: number;
}

export type AnswerProps = Answer;

export type CommentProps = Comment;
