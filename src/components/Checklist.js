import React, { useState } from "react";
import "./../styles/Checklist.css";

const Checklist = ({ categories, setCategories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false); // New state variable

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCategories((prevCategories) => ({
      ...prevCategories,
      [name]: checked,
    }));
  };

  const toggleFilter = () => {
    setIsOpen(!isOpen);
    setIsButtonActive(!isButtonActive); // Toggle button active state
  };

  return (
    <>
      <div className={`checklist ${isOpen ? "open" : ""}`}>
        <label>
          <input
            type="checkbox"
            name="Development"
            checked={categories.Development}
            onChange={handleCheckboxChange}
          />
          <p>Development</p>
        </label>
        <label>
          <input
            type="checkbox"
            name="Data and AI"
            checked={categories["Data and AI"]}
            onChange={handleCheckboxChange}
          />
          <p>Data and AI</p>
        </label>
      </div>
      <div className="filter-toggle">
        <button className={isButtonActive ? "active" : ""} onClick={toggleFilter}>Select Category</button>
      </div>
    </>
  );
};

export default Checklist;
