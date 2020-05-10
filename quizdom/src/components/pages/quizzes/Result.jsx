import React from "react";

const Result = ({ score, restart, playNewQuiz }) => {
  return (
    <div className="scoreContainer">
      <h2>
        {score > 7
          ? "Congratulations"
          : score > 4
          ? "Getting there"
          : "You can do better, try again!"}
      </h2>
      <h1>Your score is {score}</h1>
      <div className="btnContainer">
        <button
          className="btnRestart"
          onClick={() => {
            restart(0);
          }}
        >
          Restart
        </button>
        <button
          className="btnPlayNew"
          onClick={() => {
            playNewQuiz([0]);
          }}
        >
          Take a new quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
