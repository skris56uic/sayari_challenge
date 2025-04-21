import { Post, PostsResponse } from "../types";

export const getPosts = async (): Promise<PostsResponse> => {
  const response = await fetch("http://localhost:3000/posts");
  if (!response.ok) {
    return new Promise((_, rej) =>
      rej({
        posts: [],
        error: "Failed to fetch posts",
      })
    );
  }
  const data: Post[] = await response.json();

  return new Promise((res, _) =>
    res({
      posts: data,
      error: "",
    })
  );
};
