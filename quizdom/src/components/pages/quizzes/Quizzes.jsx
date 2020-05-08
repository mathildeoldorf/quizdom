import React, { useState, useEffect } from "react";
import axios from "axios";
import Key from "../../../data/api.json";
import SingleQuiz from "./SingleQuiz.jsx";
import "./quizzes.css";

//HANDLE MESSAGE
import useMessageHandler from "../../hooks/MessageHandler.jsx";
import Message from "./../../Message.jsx";
import Loader from "../../Loader";

const Quizzes = (props) => {
  const categoryUrl = Key.APIcategories;
  const [quizCategories, setQuizCategories] = useState([0]);
  const [quizCategory, setQuizCategory] = useState([0]);
  const { message, showMessage } = useMessageHandler(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuizCategories();
  }, []);

  const fetchQuizCategories = async () => {
    setLoading(true);
    try {
      let response = await axios.get(categoryUrl, { withCredentials: false });

      let data = response.data.trivia_categories.map((category) => ({
        id: `${category.id}`,
        name: `${category.name}`,
      }));

      setQuizCategories(data);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      showMessage(error.response.data.response);
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
  console.log(quizCategories.length, quizCategory.name);
  return loading ? (
    <Loader />
  ) : (
    <section className="quizzes">
      {quizCategory.name ? <h3 className="headerForm">You chose</h3> : null}
      <h1 className="headerForm">
        {quizCategory ? quizCategory.name : "Test your quizdom"}
      </h1>
      {message ? <Message resMessage={message} /> : null}
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
              <h2 name={category.name} id={category.id}>
                {category.name}
              </h2>
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
