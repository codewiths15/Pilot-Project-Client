import React, { useState, useEffect } from 'react';
import '../styles/DiscussionForum.css';

const DiscussionForum = ({ taskId, closeForum }) => {
  const [username, setUsername] = useState('');
  const [question, setQuestion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/discussions`);
        const data = await response.json();
        setDiscussions(data);
      } catch (error) {
        console.error('Error fetching discussions:', error);
      }
    };

    fetchDiscussions();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/discussions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, username }),
      });

      if (response.ok) {
        alert('Discussion added successfully');
        setUsername('');
        setQuestion('');
        setErrorMessage('');
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred while adding the discussion');
      console.error('Error adding discussion:', error);
    }
  };

  return (
    <div className="discussion-forum">
      <div className="discussion-header">
        <h2>Discussion Forum for Task ID: {taskId}</h2>
        <button className="close-forum" onClick={closeForum}>X</button>
      </div>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Doubt:
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          ></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="discussion-list">
        <h3>Discussions for Task ID: {taskId}</h3>
        {discussions.map((discussion, index) => (
          <div key={index} className="discussion-item">
            <small>Posted by: {discussion.username}</small>
            <p><strong>Q:</strong> {discussion.question}</p>
            <p><strong>A:</strong> {discussion.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForum;
