import React from "react";

const Message = ({ resMessage }) => {
  return (
    <div className="message">
      <p> {resMessage} </p>
    </div>
  );
};

export default Message;
