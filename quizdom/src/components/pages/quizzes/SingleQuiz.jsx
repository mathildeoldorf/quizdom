import React, { useState, useEffect } from "react";
import axios from "axios";
import Key from "./../../../data/api.json";
import Question from "./Question";
import Result from "./Result";
//HANDLE MESSAGE
import useMessageHandler from "../../hooks/MessageHandler.jsx";
import Message from "./../../Message.jsx";
import Loader from "../../Loader";

const quizUrl = Key.APIquiz;

const SingleQuiz = ({ quizCategory, onPlayNewQuiz }) => {
  const [questionBank, setQuestionBank] = useState([]);
  const [start, setStart] = useState(false);
  const [score, setScore] = useState(0);
  const [responses, setResponses] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const { message, showMessage } = useMessageHandler(null);

  useEffect(() => {
    fetchSingleQuiz();
  }, []);

  const fetchSingleQuiz = async () => {
    setLoading(true);
    try {
      let response = await axios.get(quizUrl + quizCategory.ID, {
        withCredentials: false,
      });

      let data = response.data.results.map((question, i) => {
        let answers = [];
        question.incorrect_answers.push(question.correct_answer);
        answers.push(question.incorrect_answers);
        return {
          id: i,
          question: `${question.question}`,
          answers: answers,
          correct: `${question.correct_answer}`,
        };
      });

      setQuestionBank(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showMessage(error.response.data.response);
      console.log(error);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    responses === 10 ? setComplete(true) : setComplete(false);
  };
  const prevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    setResponses(responses - 1);
  };

  const calculateAnswers = (answer, correctAnswer) => {
    answer === correctAnswer ? setScore(score + 1) : setScore(score);
    incrementResponses();
  };

  const incrementResponses = () => {
    setResponses(responses + 1);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setResponses(0);
    setComplete(false);
  };

  const playNewSingleQuiz = (data) => {
    console.log("playing a new quiz");
    onPlayNewQuiz(data);
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="singleQuiz">
      <Message resMessage={message} />
      <div className="circle circleQuiz"></div>
      {questionBank.length > 0 && start === false ? (
        <h2 className="headerForm"> Let the quiz begin </h2>
      ) : null}
      <div className="quizContainer">
        {questionBank.length > 0 && start === true ? (
          questionBank.map(({ question, answers, correct, id }) =>
            currentQuestion === id ? (
              <Question
                key={id}
                question={question}
                answers={answers}
                id={id}
                nextQuestion={nextQuestion}
                prevQuestion={prevQuestion}
                total={questionBank.length}
                selected={(answer) => calculateAnswers(answer, correct)}
              />
            ) : null
          )
        ) : (
          <button className="btnStart" onClick={() => setStart(true)}>
            Start quiz
          </button>
        )}

        {questionBank.length > 0 && complete === true ? (
          <Result
            score={score}
            restart={(restart) => restartQuiz(restart)}
            playNewQuiz={playNewSingleQuiz}
          />
        ) : null}
      </div>
    </section>
  );
};

export default SingleQuiz;
