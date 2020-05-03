import React, { useState } from "react";

const Question = ({
  question,
  answers,
  id,
  nextQuestion,
  prevQuestion,
  total,
  selected,
}) => {
  const [answer, setAnswer] = useState(0);
  const [answered, setAnswered] = useState(false);

  // REMOVE ANSWERED
  return (
    <div className="questionContainer">
      <div className="question">
        <h3>
          {id + 1} of {total}
        </h3>
        {id < total ? (
          <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
        ) : null}
        {id < total
          ? answers[0].map((text, i) => (
              <button
                key={i}
                className="answerBtn"
                onClick={(e) => {
                  e.target.className = "answerBtn selected";
                  e.target.disabled = "true";
                  setAnswer(text);
                  selected(text);
                  console.log(e.target);
                  setAnswered(true);
                }}
              >
                {text}
              </button>
            ))
          : null}
      </div>
      {answered === true ? (
        <button className="actionBtn" onClick={nextQuestion}>
          Next
        </button>
      ) : null}
      {id !== 0 && answered === false ? (
        <button className="actionBtn" onClick={prevQuestion}>
          Previous
        </button>
      ) : null}
    </div>
  );
};

export default Question;
