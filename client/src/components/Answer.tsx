import React from "react";
import parse from "html-react-parser";
import { AnswerProps } from "../types";
import { useDispatch } from "react-redux";
import { updateAnswerVotes } from "../store/posts"; // Import the action to update votes
import { FaArrowUp, FaArrowDown, FaCheckCircle } from "react-icons/fa"; // Import check icon
import Comment from "./Comment"; // Import the Comment component

const Answer: React.FC<AnswerProps> = ({
  id,
  body,
  user,
  creation,
  score,
  comments,
  accepted,
}) => {
  const dispatch = useDispatch();

  const handleUpvote = () => {
    dispatch(updateAnswerVotes({ id, score: score + 1 }));
  };

  const handleDownvote = () => {
    dispatch(updateAnswerVotes({ id, score: score - 1 }));
  };

  return (
    <li
      className={`list-group-item ${
        accepted ? "border-success bg-light position-relative" : ""
      }`} // Highlight accepted answers
    >
      {/* Accepted Badge */}
      {accepted && (
        <div
          className="position-absolute top-0 end-0 bg-success text-white px-3 py-1 rounded-start"
          style={{ fontSize: "0.9rem" }}
        >
          <FaCheckCircle className="me-1" />
          Accepted
        </div>
      )}

      <div className="d-flex">
        {/* Votes Section */}
        <div className="text-center me-3">
          <button
            className="btn btn-link text-success p-0"
            onClick={handleUpvote}
          >
            <FaArrowUp size={24} />
          </button>
          <div className="votes-count my-1">{score}</div>
          <button
            className="btn btn-link text-danger p-0"
            onClick={handleDownvote}
          >
            <FaArrowDown size={24} />
          </button>
        </div>

        {/* Answer Content */}
        <div className="flex-grow-1 d-flex flex-column justify-content-between">
          <div className="card-body">{parse(body)}</div>
          {/* Answered By Section */}
          <div className="text-end mt-3">
            <p className="mb-0">
              <strong>Answered by:</strong> {user.name} <strong>on</strong>{" "}
              {new Date(creation * 1000).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="text-end mt-3">
        <ul className="list-group d-inline-block text-end">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              body={comment.body}
              user={comment.user}
              id={comment.id}
            />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Answer;
