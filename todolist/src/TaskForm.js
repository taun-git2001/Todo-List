// src/TaskForm.js

import React, { useState, useEffect } from 'react';

const TaskForm = ({ selectedDate, onTaskSubmit }) => {
  const initialCategories = ['Workout', 'Office', 'Home', 'Travels', 'Personal'];

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tasks, setTasks] = useState(['']);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories'));
    if (storedCategories) {
      setCategories(storedCategories);
    } else {
      setCategories(initialCategories);
      localStorage.setItem('categories', JSON.stringify(initialCategories));
    }
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleTaskChange = (index, e) => {
    const newTasks = [...tasks];
    newTasks[index] = e.target.value;
    setTasks(newTasks);
  };

  const addTaskField = () => {
    setTasks([...tasks, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      date: selectedDate,
      category: selectedCategory,
      tasks: tasks.filter(task => task.trim() !== '').map(task => ({ text: task, disabled: false }))
    };

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.push(taskData);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));

    onTaskSubmit(taskData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Tasks for {selectedDate.toDateString()}</h3>
      <div>
        <label>
          Category:
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>Tasks:</label>
        {tasks.map((task, index) => (
          <textarea 
            key={index}
            value={task}
            onChange={(e) => handleTaskChange(index, e)}
          />
        ))}
        <button type="button" onClick={addTaskField}>+</button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;
