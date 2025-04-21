import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addAnswer, updatePostVotes } from "../store/posts";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import parse from "html-react-parser";
import Comment from "./Comment";
import Answer from "./Answer";

const PostDetail: React.FC = () => {
  const [newAnswer, setNewAnswer] = useState("");
  const [userName, setUserName] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) =>
    state.posts.find((post) => post.id === Number(id))
  );

  if (!post) {
    return <div className="container mt-4">Post not found.</div>;
  }

  const handleUpvote = () => {
    dispatch(updatePostVotes({ id: post.id, score: post.score + 1 }));
  };

  const handleDownvote = () => {
    dispatch(updatePostVotes({ id: post.id, score: post.score - 1 }));
  };

  const handleAddAnswer = () => {
    if (newAnswer.trim() && userName.trim()) {
      dispatch(
        addAnswer({
          postId: post.id,
          answer: {
            id: Date.now(),
            body: newAnswer,
            user: { name: userName, id: Date.now() },
            creation: Math.floor(Date.now() / 1000),
            score: 0,
            comments: [],
            accepted: false,
          },
        })
      );
      setNewAnswer("");
      setUserName("");
    }
  };

  const sortedAnswers = [...post.answers].sort((a, b) => {
    if (a.accepted && !b.accepted) return -1;
    if (!a.accepted && b.accepted) return 1;
    return b.score - a.score;
  });

  return (
    <div className="container mt-4">
      {/* Back Button */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="row">
        {/* Votes Section */}
        <div className="col-1 text-center">
          <button
            className="btn btn-link text-success p-0"
            onClick={handleUpvote}
          >
            <FaArrowUp size={24} />
          </button>
          <div className="votes-count my-2">{post.score}</div>
          <button
            className="btn btn-link text-danger p-0"
            onClick={handleDownvote}
          >
            <FaArrowDown size={24} />
          </button>
        </div>

        {/* Post Title and Body */}
        <div className="col-11">
          <h2>{parse(post.title)}</h2>
          <p>
            <strong>Asked by:</strong> {parse(post.user.name)} on{" "}
            {new Date(post.creation * 1000).toLocaleString()}
          </p>
          <div className="card mt-4">
            <div
              className="card-body overflow-auto"
              style={{ maxHeight: "300px" }}
            >
              {parse(post.body)}
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="card mt-4 border-info">
        <div className="card-header bg-info text-white">
          <h4>Comments</h4>
        </div>
        <div className="card-body bg-light">
          <ul className="list-group">
            {post.comments.map((comment) => (
              <Comment
                key={comment.id}
                body={comment.body}
                user={comment.user}
                id={comment.id}
              />
            ))}
          </ul>
        </div>
      </div>

      {/* Answers Section */}
      <div className="card mt-4 border-success">
        <div className="card-header bg-success text-white">
          <h4>Answers</h4>
        </div>
        <div className="card-body">
          {sortedAnswers.length > 0 ? (
            <ul className="list-group">
              {sortedAnswers.map((answer) => (
                <Answer
                  key={answer.id}
                  id={answer.id}
                  body={answer.body}
                  user={answer.user}
                  creation={answer.creation}
                  score={answer.score}
                  comments={answer.comments}
                  accepted={answer.accepted}
                />
              ))}
            </ul>
          ) : (
            <p className="text-muted">
              There are no answers yet. Be the first to answer!
            </p>
          )}
        </div>
      </div>

      {/* Add Answer Section */}
      <div className="card mt-4 border-primary">
        <div className="card-header bg-primary text-white">
          <h5>Add Your Answer</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <textarea
              className="form-control"
              rows={3}
              placeholder="Write your answer here..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleAddAnswer}>
              Submit Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
