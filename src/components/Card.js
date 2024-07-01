import React, { useState, useEffect } from "react";
import ApplicationForm from "./ApplicationForm";
import DiscussionForum from "./DiscussionForum";
import "./../styles/Card.css";
import tick from "./../../src/assests/images/tick.png";

const Card = ({
  taskId,
  taskName,
  companyId,
  companyLogo,
  companyName,
  domain,
  taskReq,
  desc,
  skill,
  stipend,
  helpLinks,
  nice,
  endDate,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const currentDate = new Date();
      const end = new Date(endDate);
      const timeDifference = end - currentDate;
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      setDaysRemaining(daysDifference);
    };

    calculateDaysRemaining();
  }, [endDate]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleApply = () => {
    if (isTaskOver) return; // Prevent clicking if the task is over
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleDiscuss = () => {
    setShowDiscussion(true);
  };

  const closeDiscussion = () => {
    setShowDiscussion(false);
  };

  const handleShare = () => {
    const taskUrl = `${window.location.origin}/task/${taskId}`;
    navigator.clipboard.writeText(taskUrl).then(() => {
      alert("Task link copied to clipboard!");
    });
  };

  const isTaskOver = new Date(endDate) < new Date();

  return (
    <div className="extra-card">
      <div className={`card1 ${expanded ? "expanded" : ""}`}>
        <div className="card-header1">
          <div className="card-head1">
            <div className="card-info">
              <img src={companyLogo} alt="" className="company-logo" />
              <div className="card-info1">
                <h3 className="task-id">{taskId}</h3>
                <h3 className="task-name">{taskName}</h3>
                <p>{companyName}</p>
              </div>
            </div>
            <div className="domain-applicant">
              <p className="domain">{domain}</p>
              <div className="main-applicant">
                <div className="applicant">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#3d3d3d"
                      d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5M4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5S5.5 6.57 5.5 8.5S7.07 12 9 12m0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7m7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44M15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35c.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35"
                    />
                  </svg>
                  <p className="number-of-applicant">0 Applications</p>
                </div>
              </div>
            </div>
          </div>
          <div className="expand-button1">
            <div className={`time-remaining ${isTaskOver ? "over" : ""}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#3d3d3d"
                  d="M12 20a7 7 0 0 1-7-7a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7m7.03-12.61l1.42-1.42c-.45-.51-.9-.97-1.41-1.41L17.62 6c-1.55-1.26-3.5-2-5.62-2a9 9 0 0 0-9 9a9 9 0 0 0 9 9c5 0 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61M11 14h2V8h-2m4-7H9v2h6z"
                />
              </svg>
              <p>
                {" "}
                {daysRemaining > 0
                  ? `${daysRemaining}d remaining`
                  : "Task is over"}
              </p>
            </div>
            <button onClick={toggleExpand} className="expand">
              {expanded ? "Close" : "Explore"}
            </button>
          </div>
        </div>
        <div className={`card-content ${expanded ? "scrollable" : ""}`}>
          <p>
            <strong>Description:</strong> {desc}
          </p>
          <p>
            <strong>Requirements:</strong> {taskReq}
          </p>
          <p>
            <strong>Skills:</strong>
          </p>
          <ul className="skills">
            {skill.map((item, index) => (
              <li key={index} className="gap-list">
                <img src={tick} alt="" width={16} height={19} />
                <p>{item}</p>
              </li>
            ))}
          </ul>
          <p>
            <strong>Incentive:</strong> ${stipend}
          </p>
          <p>
            <strong>Helpful Links:</strong>{" "}
          </p>
          <ul className="helpful-links">
            {helpLinks.map((link, index) => (
              <li key={index} className="gap-list">
                <img src={tick} alt="" width={16} height={19} />
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <p>
            <strong>Nice to Haves:</strong>
          </p>
          <ul className="nice-to-haves">
            {nice.map((item, index) => (
              <li key={index} className="gap-list">
                <img src={tick} alt="" width={16} height={19} />
                <p> {item}</p>
              </li>
            ))}
          </ul>
          <p>
            <strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}
          </p>
          {isTaskOver && (
            <p className="task-over">
              Task is over on: {new Date(endDate).toLocaleDateString()}
            </p>
          )}

          <div className="last-button">
            <button
              className={`apply-button ${
                isTaskOver ? "disabled" : ""
              } button-icons`}
              onClick={handleApply}
              disabled={isTaskOver}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 36 36"
              >
                <path
                  fill="white"
                  d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1M8 10h12V7.94H8Z"
                  class="clr-i-outline clr-i-outline-path-1"
                />
                <path
                  fill="white"
                  d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1M20 18H8v-2h12Z"
                  class="clr-i-outline clr-i-outline-path-2"
                />
                <path
                  fill="white"
                  d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.4 3.4 0 0 1 .06-.49"
                  class="clr-i-outline clr-i-outline-path-3"
                />
                <path
                  fill="white"
                  d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79"
                  class="clr-i-outline clr-i-outline-path-4"
                />
                <path
                  fill="white"
                  d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z"
                  class="clr-i-outline clr-i-outline-path-5"
                />
                <path
                  fill="white"
                  d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.6 1.6 0 0 0 .31 0a1.2 1.2 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z"
                  class="clr-i-outline clr-i-outline-path-6"
                />
                <path fill="none" d="M0 0h36v36H0z" />
              </svg>
              <p> Apply </p>
            </button>
            <button className="share-button button-icons" onClick={handleShare}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 32 32"
              >
                <path
                  fill="white"
                  d="M23 20a5 5 0 0 0-3.89 1.89l-7.31-4.57a4.46 4.46 0 0 0 0-2.64l7.31-4.57A5 5 0 1 0 18 7a4.8 4.8 0 0 0 .2 1.32l-7.31 4.57a5 5 0 1 0 0 6.22l7.31 4.57A4.8 4.8 0 0 0 18 25a5 5 0 1 0 5-5m0-16a3 3 0 1 1-3 3a3 3 0 0 1 3-3M7 19a3 3 0 1 1 3-3a3 3 0 0 1-3 3m16 9a3 3 0 1 1 3-3a3 3 0 0 1-3 3"
                />
              </svg>
              <p>Share</p>
            </button>
            <button
              className="discuss-button button-icons"
              onClick={handleDiscuss}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M3 12c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2H9v3l-3-3zm18 6c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2h-6v1c0 2.2-1.8 4-4 4v2c0 1.1.9 2 2 2h2v3l3-3z"
                />
              </svg>
              <p> Discuss</p>
            </button>
          </div>
        </div>
        {showForm && (
          <div className="application-form-overlay">
            <ApplicationForm
              taskId={taskId}
              taskName={taskName}
              companyId={companyId}
              companyName={companyName}
              domain={domain}
              closeForm={closeForm}
              handleDiscuss={handleDiscuss}
            />
          </div>
        )}
        {showDiscussion && (
          <div className="discussion-forum-overlay">
            <DiscussionForum taskId={taskId} closeForum={closeDiscussion} />
          </div>
        )}
      </div>
      <div className="icons-cards">
        <div className="icons-right apply-icon" onClick={handleApply}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 36 36"
          >
            <path
              fill="white"
              d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1M8 10h12V7.94H8Z"
              class="clr-i-outline clr-i-outline-path-1"
            />
            <path
              fill="white"
              d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1M20 18H8v-2h12Z"
              class="clr-i-outline clr-i-outline-path-2"
            />
            <path
              fill="white"
              d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.4 3.4 0 0 1 .06-.49"
              class="clr-i-outline clr-i-outline-path-3"
            />
            <path
              fill="white"
              d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79"
              class="clr-i-outline clr-i-outline-path-4"
            />
            <path
              fill="white"
              d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z"
              class="clr-i-outline clr-i-outline-path-5"
            />
            <path
              fill="white"
              d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.6 1.6 0 0 0 .31 0a1.2 1.2 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z"
              class="clr-i-outline clr-i-outline-path-6"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
          <div className="icon-label"></div>
        </div>
        <div className="icons-right share-icon" onClick={handleShare}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 32 32"
          >
            <path
              fill="white"
              d="M23 20a5 5 0 0 0-3.89 1.89l-7.31-4.57a4.46 4.46 0 0 0 0-2.64l7.31-4.57A5 5 0 1 0 18 7a4.8 4.8 0 0 0 .2 1.32l-7.31 4.57a5 5 0 1 0 0 6.22l7.31 4.57A4.8 4.8 0 0 0 18 25a5 5 0 1 0 5-5m0-16a3 3 0 1 1-3 3a3 3 0 0 1 3-3M7 19a3 3 0 1 1 3-3a3 3 0 0 1-3 3m16 9a3 3 0 1 1 3-3a3 3 0 0 1-3 3"
            />
          </svg>
          <div className="icon-label"></div>
        </div>
        <div className="icons-right discuss-icon" onClick={handleDiscuss}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M3 12c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2H9v3l-3-3zm18 6c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2h-6v1c0 2.2-1.8 4-4 4v2c0 1.1.9 2 2 2h2v3l3-3z"
            />
          </svg>
          <div className="icon-label"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
