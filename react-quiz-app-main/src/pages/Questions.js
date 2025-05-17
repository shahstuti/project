import { decode } from "html-entities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { handleScoreChange } from "../redux/actions";
import { motion, AnimatePresence } from "framer-motion";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-accent-500 absolute top-0 left-0" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        </div>
      </div>
    );
  }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/score");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-secondary-700">Question {questionIndex + 1} of {response.results.length}</span>
          <span className="text-sm font-medium text-primary-600">{Math.round((questionIndex / response.results.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-primary-600 to-accent-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${(questionIndex / response.results.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary-900 mb-6">
          {decode(response.results[questionIndex].question)}
        </h2>
      </div>

      {/* Answer options */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={questionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {options.map((data, id) => (
            <motion.button
              key={id}
              onClick={handleClickAnswer}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left p-4 rounded-lg border border-gray-200 
                        hover:border-primary-300 hover:bg-primary-50 
                        focus:outline-none focus:ring-2 focus:ring-primary-500 
                        transition-all duration-200 shadow-sm hover:shadow
                        flex items-center"
            >
              <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 font-medium">
                {String.fromCharCode(65 + id)}
              </div>
              <span className="text-secondary-800">{decode(data)}</span>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Score indicator */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 font-bold">
            {score}
          </div>
          <div>
            <p className="text-sm text-secondary-600">Current Score</p>
            <p className="text-lg font-medium text-secondary-900">{score} correct out of {questionIndex + 1} questions</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Questions;
