import React, { useState, useEffect } from "react";
import "./../styles/ApplicationForm.css";
import tickImage from "../assests/images/tick-green.gif";

const ApplicationForm = ({
  taskId,
  taskName,
  companyId,
  companyName,
  domain,
  closeForm,
}) => {
  const [studentName, setStudentName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(null);
  const [showTextarea, setShowTextarea] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.linksus.in/api/forms/${studentEmail}`
        );
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          setFormData(null);
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    if (studentEmail !== "") {
      fetchData();
    }
  }, [studentEmail]);

  const handleAutofill = () => {
    if (formData) {
      setStudentName(formData.name);
      setStudentNumber(formData.phone);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationResponse = await fetch(
      "https://api.linksus.in/api/applications/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId,
          taskName,
          companyId,
          companyName,
          domain,
          studentName,
          studentNumber,
          studentEmail,
          driveLink,
        }),
      }
    );

    if (applicationResponse.ok) {
      const certificateResponse = await fetch(
        "https://api.linksus.in/api/certificates",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskId,
            taskName,
            companyId,
            companyName,
            domain,
            studentName,
            studentNumber,
            studentEmail,
          }),
        }
      );

      if (certificateResponse.ok) {
        setIsSubmitted(true);
      } else {
        const data = await certificateResponse.json();
        setErrorMessage(data.message);
        alert(data.message);
      }
    } else {
      const data = await applicationResponse.json();
      setErrorMessage(data.message);
      alert(data.message);
    }
  };

  const postContent = `I am thrilled to complete the task '${taskName}' in the domain '${domain}' at '${companyName}'. It was a great experience working on this task.\n #linksUs`;
  const cloudName = "dscpr3w9x";
  const baseImageId = "cloudimage_izeouj";
  const logoId = "LinksUs_Logo_wvuqmi";
  const transformation = "w_500,h_500,c_fill,q_auto:good";
  const logoOverlay = `l_${logoId},w_50,h_50,c_fit,g_north_west`;
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${transformation}/${logoOverlay}/${baseImageId}.jpg`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    imageUrl
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(postContent).then(
      () => {
        alert("Text copied to clipboard");
      },
      () => {
        alert("Failed to copy text");
      }
    );
  };

  if (isSubmitted) {
    return (
      <div className="confirmation-message">
        <div className="confirm-image">
          <img src={tickImage} alt="Success Tick" width={40} height={40} />
          <div className="extra-box">CONGRATULATIONS !!</div>
        </div>

        {!showTextarea ? (
          <div className="confirm-text">
            <h2>Your task is submitted successfully!</h2>
            <p>
              Congrats on completing an industry task and stepping closer to
              real-world experience! Share on LinkedIn for a chance to win cool
              goodies. Also you will receive your experience letter for the task
              via email!
            </p>
            <button
              className="next-button-message"
              onClick={() => setShowTextarea(true)}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="confirm-text">
            <h3>Caption for LinkedIn</h3>
            <textarea
              readOnly
              value={postContent}
              className="post-content-textarea"
            />
            <div className="message-buttons">
              <button className="copy-button" onClick={handleCopy}>
                Copy the Caption
              </button>
              <button onClick={() => window.open(linkedInUrl, "_blank")}>
                Share on LinkedIn
              </button>
              <button className="close1" onClick={closeForm}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="application-form">
      <h2>Application Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input type="text" value={taskName} readOnly />
        </label>
        <label>
          Company Name:
          <input type="text" value={companyName} readOnly />
        </label>
        <label>
          Domain:
          <input type="text" value={domain} readOnly />
        </label>
        <label>
          Student Email:
          <input
            type="email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            required
          />
          {formData && (
            <button type="button" onClick={handleAutofill}>
              Autofill
            </button>
          )}
        </label>

        <label>
          Student Phone Number:
          <input
            type="text"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            required
          />
        </label>

        <label>
          Student Name:
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </label>
        <label>
          Drive Link:
          <input
            type="url"
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            required
          />
        </label>
        <div className="final-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={closeForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
