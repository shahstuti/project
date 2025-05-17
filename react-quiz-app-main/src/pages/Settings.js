import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectField from "../components/SelectField";
import TextFieldComp from "../components/TextFieldComp";
import useAxios from "../hooks/useAxios";
import { motion } from "framer-motion";

const Settings = () => {
  const { response, error, loading } = useAxios({ url: "/api_category.php" });
  const navigate = useNavigate();
  const [formSubmitting, setFormSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 border-l-4 border-error-500 p-4 rounded-md my-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-error-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9v4h2v-4H9zm0-4h2v2H9V5z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm leading-5 font-medium text-error-700">
              Something went wrong!
            </h3>
            <p className="text-sm text-error-600 mt-1">
              We're unable to load quiz categories. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choice" },
    { id: "boolean", name: "True/False" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setTimeout(() => {
      navigate("/questions");
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-lg text-secondary-600">Choose your quiz settings</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <SelectField options={response.trivia_categories} label="Category" />
          <SelectField options={difficultyOptions} label="Difficulty" />
          <SelectField options={typeOptions} label="Type" />
          <TextFieldComp />
          
          <div className="mt-8">
            <button
              type="submit"
              disabled={formSubmitting}
              className={`
                w-full py-3 px-4 rounded-lg text-white font-medium
                bg-gradient-to-r from-primary-600 to-accent-500
                hover:from-primary-700 hover:to-accent-600
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                shadow-md transition-all duration-300
                ${formSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {formSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                'Start Quiz'
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Settings;
