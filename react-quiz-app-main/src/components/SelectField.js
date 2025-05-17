import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange,
} from "../redux/actions";

const SelectField = (props) => {
  const { label, options } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (selectedId) => {
    setValue(selectedId);
    setIsOpen(false);

    switch (label) {
      case "Category":
        dispatch(handleCategoryChange(selectedId));
        break;
      case "Difficulty":
        dispatch(handleDifficultyChange(selectedId));
        break;
      case "Type":
        dispatch(handleTypeChange(selectedId));
        break;
      default:
        return;
    }
  };

  const selectedOption = options.find(option => option.id === value);

  return (
    <div className="mt-6 w-full">
      <label className="block text-secondary-700 text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <button
          type="button"
          className="relative w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm 
                    text-left cursor-pointer hover:border-primary-400 transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                    flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={value ? "text-secondary-900 font-medium" : "text-secondary-400"}>
            {selectedOption ? selectedOption.name : `Select ${label}`}
          </span>
          <ChevronDownIcon 
            className={`w-5 h-5 text-secondary-500 transition-transform duration-300 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-xl max-h-60 overflow-auto border border-gray-100 animate-fade-in">
            <div className="py-1">
              {options.map(({ id, name }) => (
                <div
                  key={id}
                  className={`
                    px-4 py-3 hover:bg-primary-50 cursor-pointer transition-colors duration-150
                    ${value === id ? "bg-primary-50 text-primary-700" : "text-secondary-800"}
                  `}
                  onClick={() => handleChange(id)}
                >
                  <div className="flex items-center justify-between">
                    <span className={value === id ? "font-medium" : ""}>{name}</span>
                    {value === id && (
                      <svg className="h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectField;
