import React from 'react';
import Card from './Card';
import './../styles/CardGrid.css';

const CardGrid = ({ cards = [] }) => {
  if (!cards.length) {
    return <p>Loading...</p>; // Render a loading state if there are no cards yet
  }

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card
          key={card._id}
          taskId={card.taskId}
          taskName={card.name}
          companyId={card.companyId}
          companyLogo={card.companyLogo}
          companyName={card.companyName}
          domain={card.domain}
          taskReq={card.taskReq}
          desc={card.desc}
          skill={card.skill}
          stipend={card.stipend}
          helpLinks={card.helpLinks}
          nice={card.nice}
          endDate={card.endDate}
        />
      ))}
    </div>
  );
};

export default CardGrid;
