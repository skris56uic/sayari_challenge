import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getPosts } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addPosts } from "../store/posts";
import { Post } from "../types";
import PostCard from "./PostCard";
import { FaSync } from "react-icons/fa";

export const Dashboard: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState("scores"); // State

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getPosts,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: posts.length === 0, // Only fetch if posts are empty
  });

  useEffect(() => {
    if (data?.posts && data.posts.length > 0 && posts.length === 0) {
      dispatch(
        addPosts({
          posts: data?.posts || [],
        })
      );
    }
  }, [data, dispatch, posts.length]);

  // Sorting logic
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOption === "scores") {
      return b.score - a.score; // Sort by votes (descending)
    } else if (sortOption === "time") {
      return b.creation - a.creation; // Sort by time (newest first)
    }
    return 0;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Posts</h2>
        <div className="d-flex align-items-center">
          <FaSync
            className={`text-primary ${
              isFetching ? "fa-spin" : "cursor-pointer"
            }`}
            size={24}
            onClick={() => !isFetching && refetch()} // Refetch only if not already fetching
            title="Refresh Posts"
            style={{ cursor: isFetching ? "not-allowed" : "pointer" }}
          />
          <select
            className="form-select ms-3"
            style={{ width: "200px" }}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)} // Update sorting option
          >
            <option value="votes">Sort by Votes</option>
            <option value="time">Sort by Time</option>
          </select>
        </div>
      </div>
      {isFetching && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <div className="alert alert-danger">{error.message}</div>}
      {!isFetching && !error && (
        <div className="row">
          {sortedPosts.map((post: Post, i) => (
            <div key={i} className="col-6 mb-4">
              <PostCard
                id={post.id}
                title={post.title}
                creation={post.creation}
                score={post.score}
                user={post.user.name}
                commentsCount={post.comments.length}
                answersCount={post.answers.length}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
