import React, { useState } from 'react';
import './App.css'; 

const TodoApp = () => {
  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setTodos] = useState(storedTodos);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const saveToLocalStorage = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const updatedTodos = [...todos, { text: inputValue, done: false }];
      setTodos(updatedTodos);
      saveToLocalStorage(updatedTodos);
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  const editTodo = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  const toggleDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <h1>Todo App</h1>
        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter todo..."
            className="input-field"
          />
          <button onClick={addTodo} className="add-button">
            Add Todo
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {editIndex === index ? (
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => editTodo(index, e.target.value)}
                  className="input-field"
                />
              ) : (
                <span
                  onClick={() => setEditIndex(index)}
                  className={todo.done ? 'done' : ''}
                >
                  {todo.text}
                </span>
              )}
              <button onClick={() => toggleDone(index)} className={todo.done ? 'done-button' : 'undone-button'}>
                {todo.done ? 'Undo' : 'Done'}
              </button>
              {editIndex !== index && (
                <button onClick={() => setEditIndex(index)} className="edit-button">
                  Edit
                </button>
              )}
              {editIndex === index && (
                <button onClick={() => setEditIndex(null)} className="save-button">
                  Save
                </button>
              )}
              <button onClick={() => removeTodo(index)} className="remove-button">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
