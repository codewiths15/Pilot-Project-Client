import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardGrid from './components/CardGrid';
import TaskDetail from './components/TaskDetail';
import Navbar from './components/Navbar';
import Checklist from './components/Checklist';
import NoticePopup from './components/NoticePopup';
import './App.css';
import './styles/Navbar.css';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [categories, setCategories] = useState({
    Development: false,
    'Data and AI': false,
  });
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [showNotices, setShowNotices] = useState(true);

  const notices = [
    {
      text: 'Before applying for the task, your phone number must be registered in the particular domain you are applying to. If you wish to apply in a different domain, you need to register again in that particular domain.',
      link: 'Register here',
    },
    {
      text: 'While submitting the task, you have to upload the task on drive, make the link public, and paste the link in the application form.',
      link: 'https://linksus.in',
    },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://api.linksus.in/api/tasks');
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const noticeContainer = document.querySelector('.main-tasks');
      if (noticeContainer) {
        const offsetTop = noticeContainer.offsetTop;
        const scrollTop = window.scrollY;
        setIsNavbarScrolled(scrollTop >= offsetTop);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getFilteredCards = () => {
    const selectedCategories = Object.keys(categories).filter(
      (key) => categories[key]
    );
    if (selectedCategories.length === 0) return cardData;
    return cardData.filter((card) =>
      selectedCategories.includes(card.category)
    );
  };

  return (
    <div className="app">
      {showNotices ? (
        <NoticePopup notices={notices} onClose={() => setShowNotices(false)} />
      ) : (
        <Router>
          <div className={`navbar1 ${isNavbarScrolled ? 'navbar-scroll' : ''}`}>
            <Navbar />
          </div>
          <div className="main-tasks">
            <div className="check-list-main">
           
              <Checklist categories={categories} setCategories={setCategories} />
            </div>
            <Routes>
              <Route path="/" element={<CardGrid cards={getFilteredCards()} />} />
              <Route path="/task/:taskId" element={<TaskDetail cards={cardData} />} />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
};

export default App;
