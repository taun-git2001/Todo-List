// src/DateCalendar.js

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar's CSS
import './TaskCalendar.css'; // Import the custom CSS for tasks

const DateCalendar = ({ tasks }) => {
  const storedDate = localStorage.getItem('otherSelectedDate');
  const initialDate = storedDate ? new Date(storedDate) : new Date();

  const [date, setDate] = useState(initialDate);
  const [existingTasks, setExistingTasks] = useState([]);

  useEffect(() => {
    const storedDate = localStorage.getItem('otherSelectedDate');
    if (storedDate) {
      setDate(new Date(storedDate));
    }
  }, []);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksForSelectedDate = storedTasks.filter(task => new Date(task.date).toDateString() === date.toDateString());
    setExistingTasks(tasksForSelectedDate);
  }, [date]);

  const onChange = (newDate) => {
    setDate(newDate);
    localStorage.setItem('otherSelectedDate', newDate.toISOString());
  };

  const handleSave = () => {
    const updatedTasks = existingTasks.map(task => ({
      ...task,
      tasks: task.tasks.map((taskDetail, index) => {
        const checkbox = document.getElementById(`task-${date.toDateString()}-${index}`);
        return {
          text: typeof taskDetail === 'string' ? taskDetail : taskDetail.text,
          disabled: checkbox.checked
        };
      })
    }));

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedStoredTasks = storedTasks.map(task => 
      new Date(task.date).toDateString() === date.toDateString() ? updatedTasks[0] : task
    );

    if (!storedTasks.some(task => new Date(task.date).toDateString() === date.toDateString())) {
      updatedStoredTasks.push(updatedTasks[0]);
    }

    localStorage.setItem('tasks', JSON.stringify(updatedStoredTasks));
    setExistingTasks(updatedTasks);
    alert('Saved successfully');
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
      {existingTasks.length > 0 && (
        <div>
          <h4>Tasks for {date.toDateString()}</h4>
          {existingTasks.map((task, taskIndex) => (
            <div key={taskIndex}>
              <strong>{task.category}</strong>
              <ul>
                {task.tasks.map((taskDetail, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        id={`task-${date.toDateString()}-${index}`}
                        defaultChecked={taskDetail.disabled || false}
                        disabled={taskDetail.disabled || false}
                      />
                      {typeof taskDetail === 'string' ? taskDetail : taskDetail.text}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button type="button" onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default DateCalendar;
