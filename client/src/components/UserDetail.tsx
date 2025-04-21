import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { parseMentions } from "../utils";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const posts = useSelector((state: RootState) => state.posts);

  // Filter answers and comments made by the user
  const userAnswers = posts
    .flatMap((post) =>
      post.answers.map((answer) => ({ ...answer, postId: post.id }))
    )
    .filter((answer) => answer.user.id === Number(id));

  const userComments = posts
    .flatMap((post) =>
      post.comments.map((comment) => ({ ...comment, postId: post.id }))
    )
    .filter((comment) => comment.user.id === Number(id));

  // Get the user's name from answers or comments
  const userName =
    userAnswers[0]?.user.name || userComments[0]?.user.name || "Unknown User";

  return (
    <div className="container mt-4">
      {/* Home Button */}
      <div className="mb-4">
        <Link to="/" className="btn btn-secondary">
          &larr; Home
        </Link>
      </div>

      {/* User Name */}
      <div className="text-center mb-4">
        <h2>Profile {userName}</h2>
      </div>

      {/* Answers Section */}
      <div className="card mb-4 border-success">
        <div className="card-header bg-success text-white">
          <h3>Answers</h3>
        </div>
        <div className="card-body">
          {userAnswers.length > 0 ? (
            <ul className="list-group">
              {userAnswers.map((answer) => (
                <li key={answer.id} className="list-group-item">
                  <p>{parseMentions(answer.body, id ?? "")}</p>
                  <small>
                    <strong>Post ID:</strong>{" "}
                    <Link
                      to={`/post/${answer.postId}`}
                      className="text-primary"
                    >
                      {answer.postId}
                    </Link>{" "}
                    | <strong>Score:</strong> {answer.score}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No answers found.</p>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="card border-info">
        <div className="card-header bg-info text-white">
          <h3>Comments</h3>
        </div>
        <div className="card-body">
          {userComments.length > 0 ? (
            <ul className="list-group">
              {userComments.map((comment) => (
                <li key={comment.id} className="list-group-item">
                  <p>{parseMentions(comment.body, id ?? "")}</p>
                  <small>
                    <strong>Post ID:</strong>{" "}
                    <Link
                      to={`/post/${comment.postId}`}
                      className="text-primary"
                    >
                      {comment.postId}
                    </Link>
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No comments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
