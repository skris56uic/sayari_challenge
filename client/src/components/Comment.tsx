import React from "react";
import { CommentProps } from "../types";
import { parseMentions } from "../utils";

const Comment: React.FC<CommentProps> = ({ body, user }) => {
  return (
    <li className="list-group-item">
      <div className="d-flex flex-column justify-content-between">
        {/* Comment Body */}
        <p className="card-text mb-3">{parseMentions(body, user.id.toString())}</p>

        {/* User Name */}
        <div className="text-end">
          <strong>By</strong> {user.name}
        </div>
      </div>
    </li>
  );
};

export default Comment;
