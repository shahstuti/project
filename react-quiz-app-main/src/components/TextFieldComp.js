import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleAmountChange } from "../redux/actions";
import { motion } from "framer-motion";

const TextFieldComp = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("10");
  
  const handleChange = (e) => {
    const newValue = Math.min(50, Math.max(1, e.target.value)); // Keeping between 1-50
    setValue(newValue);
    dispatch(handleAmountChange(newValue));
  };

  return (
    <div className="mt-6">
      <label htmlFor="amount" className="block text-secondary-700 text-sm font-medium mb-2">
        Number of Questions
      </label>
      <div className="relative">
        <input
          id="amount"
          type="number"
          min="1"
          max="50"
          value={value}
          onChange={handleChange}
          className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                    transition-all duration-200"
          placeholder="Enter number of questions"
        />
        <motion.div 
          className="absolute right-0 top-0 bottom-0 bg-gradient-to-r from-transparent to-primary-50 rounded-r-lg w-16 flex items-center justify-center text-primary-700"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-xs font-medium">1-50</span>
        </motion.div>
      </div>
    </div>
  );
};

export default TextFieldComp;
