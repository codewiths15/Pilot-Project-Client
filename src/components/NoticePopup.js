import React, { useState } from "react";
import "./../styles/NoticePopup.css";

// Ensure you have a warning.png in the specified path

const NoticePopup = ({ notices, onClose }) => {
  const [currentNotice, setCurrentNotice] = useState(0);
  const [animateSlide, setAnimateSlide] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleNext = () => {
    if (currentNotice < notices.length - 1) {
      setAnimateSlide(true);
      setTimeout(() => {
        setCurrentNotice(currentNotice + 1);
        setAnimateSlide(false);
      }, 500); // match animation duration
    }
  };

  const handleGotIt = () => {
    setClosing(true);
    setTimeout(onClose, 500); // match animation duration
  };

  return (
    <div className={`notice-popup ${closing ? "closing" : ""}`}>
      <div className={`notice-content ${animateSlide ? "slide" : ""}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="#ff4242"
            stroke-linecap="round"
            stroke-width="2"
          >
            <g>
              <path stroke-dasharray="4" stroke-dashoffset="4" d="M12 3V5">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.2s"
                  values="4;0"
                />
              </path>
              <path
                stroke-dasharray="28"
                stroke-dashoffset="28"
                d="M12 5C8.68629 5 6 7.68629 6 11L6 17C5 17 4 18 4 19H12M12 5C15.3137 5 18 7.68629 18 11L18 17C19 17 20 18 20 19H12"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.2s"
                  dur="0.4s"
                  values="28;0"
                />
              </path>
              <animateTransform
                attributeName="transform"
                begin="0.8s"
                dur="6s"
                keyTimes="0;0.05;0.15;0.2;1"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 3;3 12 3;-3 12 3;0 12 3;0 12 3"
              />
            </g>
            <path
              stroke-dasharray="8"
              stroke-dashoffset="8"
              d="M10 20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.6s"
                dur="0.2s"
                values="8;0"
              />
              <animateTransform
                attributeName="transform"
                begin="1s"
                dur="6s"
                keyTimes="0;0.05;0.15;0.2;1"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 8;6 12 8;-6 12 8;0 12 8;0 12 8"
              />
            </path>
            <path
              stroke-dasharray="8"
              stroke-dashoffset="8"
              d="M22 6v4"
              opacity="0"
            >
              <set attributeName="opacity" begin="1s" to="1" />
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="1s"
                dur="0.2s"
                values="8;0"
              />
              <animate
                attributeName="stroke-width"
                begin="1.7s"
                dur="3s"
                keyTimes="0;0.1;0.2;0.3;1"
                repeatCount="indefinite"
                values="2;3;3;2;2"
              />
            </path>
          </g>
          <circle cx="22" cy="14" r="1" fill="#ff4242" fill-opacity="0">
            <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="1s"
              dur="0.4s"
              values="0;1"
            />
            <animate
              attributeName="r"
              begin="2s"
              dur="3s"
              keyTimes="0;0.1;0.2;0.3;1"
              repeatCount="indefinite"
              values="1;2;2;1;1"
            />
          </circle>
        </svg>
        <p className="notice-text">{notices[currentNotice].text}</p>
        <a
          href={notices[currentNotice].link}
          target="_blank"
          rel="noopener noreferrer"
          className="notice-link"
        >
          {notices[currentNotice].link}
        </a>
        <div className="notice-buttons">
          {currentNotice < notices.length - 1 ? (
            <button className="notice-button" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className="notice-button" onClick={handleGotIt}>
              Got it
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticePopup;
