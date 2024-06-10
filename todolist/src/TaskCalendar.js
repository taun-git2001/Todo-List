// src/TaskCalendar.js

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar's CSS
import TaskForm from './TaskForm';
import './TaskCalendar.css'; // Import custom styles

const TaskCalendar = ({ tasks, setTasks }) => {
  const storedDate = localStorage.getItem('selectedDate');
  const initialDate = storedDate ? new Date(storedDate) : new Date();
  
  const [date, setDate] = useState(initialDate);

  useEffect(() => {
    const storedDate = localStorage.getItem('selectedDate');
    if (storedDate) {
      setDate(new Date(storedDate));
    }
  }, []);

  const onChange = (newDate) => {
    setDate(newDate);
    localStorage.setItem('selectedDate', newDate.toISOString());
  };

  const isTaskDate = (date) => {
    return tasks.some(task => new Date(task.date).toDateString() === date.toDateString());
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        tileContent={({ date, view }) =>
          view === 'month' && isTaskDate(date) ? (
            <div className="task-date-indicator"></div>
          ) : null
        }
      />
      <TaskForm selectedDate={date} onTaskSubmit={(newTask) => setTasks([...tasks, newTask])} />
    </div>
  );
};

export default TaskCalendar;
