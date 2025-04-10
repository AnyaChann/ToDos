import React from 'react';

const TodoFooter = ({ count, filter, setFilter, onClearCompleted }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <span>{count} item{count !== 1 ? 's' : ''} left</span>
      <div>
        <button
          className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`btn btn-sm mx-2 ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      <button className="btn btn-sm btn-danger" onClick={onClearCompleted}>
        Clear Completed
      </button>
    </div>
  );
};

export default TodoFooter;