import React, { useState, useEffect } from "react";
import axios from "axios";
import Key from "../../data/api.json";

const quizUrl = Key.APIquiz;

const SingleQuiz = () => {
  const [quiz, setQuiz] = useState(
    JSON.parse(localStorage.getItem("quiz") || [])
  );
  const [quizQs, setQuizQs] = useState([]);
  const [total, setTotal] = useState(0);
  const [quizQ, setQuizQ] = useState([]);

  useEffect(() => {
    fetchSingleQuiz();
  }, []);

  const fetchSingleQuiz = async () => {
    try {
      let response = await axios.get(quizUrl + quiz.ID);
      let data = response.data.results.map((question, i) => {
        return {
          id: i,
          question: `${question.question}`,
          incorrect_answers: `${question.correct_answer}`,
          correct_answer: `${question.correct_answer}`,
        };
      });

      // CREATE COMPONENT
      // IN SINGLE QUIZ - FUNCTION WITH setInterval - 10s, display next question
      // Create a new state currentQuestion (has index and question), setCurrentQuestion - where the state updates every 10s

      // OR: Next button, everytime it is clicked - show the next question
      // data[0] - increment the number in currentQuestion (or a different state)

      // Pass the state to the comp Question (the question passes the props back to single quiz when you press)

      // PASS all questions to question comp

      console.log(data);
      console.log(data.length);
      setTotal(data.length);

      setQuizQs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderQs = () => {
    console.log("showing quiz");
    return quizQs.map((question) => (
      <button id={question.question} key={question.id}>
        <h2> {question.question} </h2>
      </button>
    ));
  };

  return (
    <section className="singleQuiz">
      <h3>Welcome to</h3>
      <h2> {quiz.name} </h2>
      <h1> Let the quiz begin </h1>
      {total}
      <button onClick={renderQs}>Start quiz</button>
      <div>
        {/* {quizQ.map((question) => (
        <button id={question.question} key={question.id}>
          <h2> {question.question} </h2>
        </button>
      ))} */}
      </div>
    </section>
  );
};

export default SingleQuiz;
