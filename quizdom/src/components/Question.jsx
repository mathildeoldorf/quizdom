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
      <div className="headerQuestion">
        <h3>
          {id + 1} of {total}
        </h3>
        {id < total ? (
          <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
        ) : null}
      </div>
      <div className="options">
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
        <div
          className="btnContainer"
          style={{
            gridTemplateColumns:
              answered === true && id !== 0 ? "1fr 1fr" : "1fr",
          }}
        >
          {id !== 0 ? (
            <button className="actionBtn" onClick={prevQuestion}>
              Previous
            </button>
          ) : null}
          <button className="actionBtn" onClick={nextQuestion}>
            Next
          </button>
        </div>
      ) : null}
      {id !== 0 && answered === false ? (
        <div
          className="option btnContainer"
          style={{
            gridTemplateColumns: id !== 0 && answered === false ? "1fr" : null,
          }}
        >
          <button className="actionBtn" onClick={prevQuestion}>
            Previous
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Question;
