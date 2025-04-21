import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnswerProps, InitialStatePostsStore } from "../types";

const initialState: InitialStatePostsStore = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<InitialStatePostsStore>) => {
      state.posts = action.payload.posts;
    },
    updatePostVotes(
      state,
      action: PayloadAction<{ id: number; score: number }>
    ) {
      const postIndex = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (postIndex !== -1) {
        const updatedPost = {
          ...state.posts[postIndex],
          score: action.payload.score,
        };
        state.posts[postIndex] = updatedPost;
      }
    },
    updateAnswerVotes(
      state,
      action: PayloadAction<{ id: number; score: number }>
    ) {
      for (const post of state.posts) {
        const answer = post.answers.find(
          (answer) => answer.id === action.payload.id
        );
        if (answer) {
          answer.score = action.payload.score;
          break;
        }
      }
    },
    addAnswer(
      state,
      action: PayloadAction<{ postId: number; answer: AnswerProps }>
    ) {
      const post = state.posts.find(
        (post) => post.id === action.payload.postId
      );
      if (post) {
        post.answers.push(action.payload.answer);
      }
    },
  },
});

export const { addPosts, updatePostVotes, updateAnswerVotes, addAnswer } =
  postsSlice.actions;

export default postsSlice.reducer;
