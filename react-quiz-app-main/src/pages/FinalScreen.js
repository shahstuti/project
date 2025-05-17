import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAmountChange, handleScoreChange } from "../redux/actions";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const FinalScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { score, amount_of_question } = useSelector((state) => state);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const percentage = Math.round((score / amount_of_question) * 100) || 0;
  const isPassing = percentage >= 60;

  useEffect(() => {
    if (percentage >= 70) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(timer);
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [percentage]);

  const handleBackToSettings = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(10));
    navigate("/");
  };

  const handleRetakeQuiz = () => {
    dispatch(handleScoreChange(0));
    navigate("/questions");
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
        />
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-8">
          {isPassing ? (
            <div className="inline-block rounded-full bg-success-100 p-3 mb-4">
              <svg className="h-12 w-12 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          ) : (
            <div className="inline-block rounded-full bg-error-100 p-3 mb-4">
              <svg className="h-12 w-12 text-error-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          
          <h2 className="text-3xl font-bold mb-2">
            {isPassing ? "Congratulations!" : "Good try!"}
          </h2>
          <p className="text-secondary-600 mb-6">
            {isPassing 
              ? "You've successfully completed the quiz" 
              : "Keep practicing to improve your score"}
          </p>
        </div>
        
        {/* Score display */}
        <div className="mb-8">
          <div className="relative mx-auto h-40 w-40">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle 
                className="text-gray-200" 
                strokeWidth="10" 
                stroke="currentColor" 
                fill="transparent" 
                r="45" 
                cx="50" 
                cy="50"
              />
              <circle 
                className={`${isPassing ? 'text-success-500' : 'text-error-500'}`}
                strokeWidth="10" 
                strokeDasharray={`${percentage * 2.83} 283`} 
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="45" 
                cx="50" 
                cy="50" 
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-4xl font-bold">{score}</span>
              <span className="text-secondary-500 text-sm">of {amount_of_question}</span>
            </div>
          </div>
          <p className="text-xl font-semibold mt-4">
            <span className={isPassing ? 'text-success-600' : 'text-error-600'}>
              {percentage}%
            </span> Score
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={handleRetakeQuiz}
            className="w-full py-3 px-4 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors duration-200 shadow-md"
          >
            Try Again
          </button>
          <button
            onClick={handleBackToSettings}
            className="w-full py-3 px-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-secondary-800 font-medium transition-colors duration-200"
          >
            Back to Settings
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default FinalScreen;
