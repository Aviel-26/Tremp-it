import React, { useState, useEffect } from 'react';

const App = () => {
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    const days = [];
    const currentDate = new Date();

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + i);

      if (nextDay.getDay() !== 6) {
        days.push(nextDay.toLocaleDateString());
      }
    }

    setWeekDays(days);
  }, []);

  return (
    <div>
      <h3>Weekdays (excluding Saturday):</h3>
      {weekDays.map((day, index) => (
        <h3 key={index}>{day}</h3>
      ))}
    </div>
  );
};

export default App;
