// src/App.js

import React, { useState, useEffect } from 'react';
import CalendarComponent from './CalendarComponent';
import DateCalendar from './DateCalendar';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleTaskSubmit = (newTask) => {
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO App</h1>
      </header>
      <div className="calendars-container">
        <div className="calendar-left">
          <CalendarComponent tasks={tasks} setTasks={setTasks} onTaskSubmit={handleTaskSubmit} />
        </div>
        <div className="calendar-right">
          <DateCalendar tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default App;
