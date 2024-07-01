import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ApplicationForm from "./ApplicationForm";
import "./../styles/TaskDetail.css"; // Ensure this CSS file exists and is styled

const TaskDetail = ({ cards }) => {
  const { taskId } = useParams();
  const task = cards.find((task) => task.taskId === taskId);
  const [showForm, setShowForm] = useState(false);

  const handleApply = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="task-detail-container">
      <div className="task-detail-box">
        <h2>{task.name}</h2>
        <p>
          <strong>Company:</strong> {task.companyName}
        </p>
        <p>
          <strong>Domain:</strong> {task.domain}
        </p>
        <p>
          <strong>Description:</strong> {task.desc}
        </p>
        <p>
          <strong>Requirements:</strong> {task.taskReq}
        </p>
        <p>
          <strong>Tech Stacks:</strong>{" "}
          {task.skill.map((item, index) => (
            <li key={index}>
              <span className="tick-icon">✔️</span>
              {item}
            </li>
          ))}
        </p>
        <p>
          <strong>Incentive:</strong> {task.stipend}
        </p>
        <p>
          <strong>Helpful Links:</strong>{" "}
          <a href={task.helpLinks} target="_blank" rel="noopener noreferrer">
            {task.helpLinks}
          </a>
        </p>
        <p>
          <strong>Nice to Haves:</strong>{" "}
          {task.nice.map((item, index) => (
            <li key={index}>
              <span className="tick-icon">✔️</span>
              {item}
            </li>
          ))}
        </p>
        <p>
          <strong>Last Date:</strong>{" "}
          {new Date(task.endDate).toLocaleDateString()}
        </p>
        <button className="apply-button" onClick={handleApply}>
          Apply
        </button>
        <Link to="/" className="home-button">
          Home
        </Link>
      </div>
      {showForm && (
        <div className="application-form-overlay">
          <ApplicationForm
            taskId={task.taskId}
            taskName={task.name}
            companyId={task.companyId}
            companyName={task.companyName}
            domain={task.domain}
            closeForm={closeForm}
          />
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
