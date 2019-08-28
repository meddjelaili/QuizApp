import React from "react";
import "./Cover.scss";
import { ReactComponent as Question } from "../../svgs/questions.svg";

const Cover = ({ children, Illustration }) => {
  return (
    <div className="Cover">
      <div className="Cover--illustration">
        <Illustration />
      </div>
      <div className="Cover--content">{children}</div>
    </div>
  );
};

export default Cover;
