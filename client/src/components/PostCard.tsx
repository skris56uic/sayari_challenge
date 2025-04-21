import React from "react";
import { PostCardProps } from "../types";
import { FaComment, FaRegComment } from "react-icons/fa";
import "./PostCard.scss";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  creation,
  score,
  user,
  commentsCount,
  answersCount,
}) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className="score-container me-3">
            <div className="score-value text-center">{score}</div>
            <div className="score-label text-center">votes</div>
          </div>
          <h5 className="card-title mb-0">
            <Link to={`/post/${id}`} className="text-decoration-none">
              {parse(title)}
            </Link>
          </h5>
        </div>
        <p className="card-text">
          <strong>Asked by:</strong> {parse(user)} on{" "}
          {new Date(creation * 1000).toLocaleString()}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <p className="card-text mb-0">
            <FaComment className="me-1" /> {commentsCount} Comments
          </p>
          <p className="card-text mb-0">
            <FaRegComment className="me-1" /> {answersCount} Answers
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
