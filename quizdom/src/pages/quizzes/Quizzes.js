import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./quizzes.css";
import axios from "axios";
import Key from "../../data/api.json";

const categoryUrl = Key.APIcategories;
const quizUrl = Key.APIquiz;

const Categories = (props) => {
  const [quizCategories, setQuizCategories] = useState([]);
  const [quiz, setQuiz] = useState({});

  const history = useHistory();

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

    window.localStorage.setItem("quiz", JSON.stringify(singleQuiz));

    history.push("/singleQuiz");
  };

  return (
    <section className="quizzes">
      <div className="categories">
        {quizCategories.map((category) => (
          <button
            id={category.id}
            name={category.name}
            key={category.id}
            className={"category"}
            onClick={fetchSingleQuiz}
          >
            <h2> {category.name} </h2>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
