import React, { useState, useEffect } from "react";
import axios from "axios";
import Key from "../../../data/api.json";
import SingleQuiz from "./SingleQuiz.jsx";
import "./quizzes.css";

const categoryUrl = Key.APIcategories;

const Quizzes = (props) => {
  const [quizCategories, setQuizCategories] = useState([0]);
  const [quizCategory, setQuizCategory] = useState([0]);

  useEffect(() => {
    fetchQuizCategories();
  }, []);

  const fetchQuizCategories = async () => {
    try {
      let response = await axios.get(categoryUrl);

      let data = response.data.trivia_categories.map((category) => ({
        id: `${category.id}`,
        name: `${category.name}`,
      }));

      setQuizCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleQuiz = async (event) => {
    event.preventDefault();
    const singleQuiz = {
      ID: event.target.id,
      name: event.target.name,
    };
    setQuizCategory(singleQuiz);
  };

  return (
    <section className="quizzes">
      <div className="categories">
        {quizCategory.length > 0 ? (
          quizCategories.map((category, i) => (
            <button
              id={category.id}
              name={category.name}
              key={i}
              className={"category"}
              onClick={fetchSingleQuiz}
            >
              <h2> {category.name} </h2>
            </button>
          ))
        ) : (
          <SingleQuiz
            quizCategory={quizCategory}
            onPlayNewQuiz={(data) => setQuizCategory(data)}
          />
        )}
      </div>
    </section>
  );
};

export default Quizzes;
