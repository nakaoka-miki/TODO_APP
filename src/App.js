import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // タスク追加
  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // Enterキーでの追加対応
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  // 完了・未完了の切り替え
  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // タスク削除
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="todo-bg">
      <div className="todo-container">
        <div className="todo-header">
          <svg className="header-icon" width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <h1>My Tasks</h1>
          <p>Stay organized, get things done</p>
        </div>

        <div className="todo-card">
          <div className="input-row">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className="add-btn" onClick={handleAddTodo}>＋</button>
          </div>

          {/* タスク一覧 */}
          <div className="todo-list">
            {todos.length === 0 ? (
              <div className="empty-state">
                <p className="empty-title">No tasks yet</p>
                <small className="empty-subtitle">Add a task above to get started</small>
              </div>
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className="todo-item">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                    {todo.text}
                  </span>
                  <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          {/* フッター（タスクがある場合） */}
          {todos.length > 0 && (
            <div className="todo-footer">
              <span>{todos.length} {todos.length === 1 ? 'task' : 'tasks'} total</span>
              <span className="completed-count">{completedCount} completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}