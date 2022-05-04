import './App.css';
import { useState, useTransition, lazy, Suspense } from 'react';

import data from './data.json';

import Comment from './components/CommentCard/index.js';
function App() {
  const totalEl = data.length;
  const pages = Math.ceil(totalEl / 5);

  const el = data.slice(0, 5);

  const [filtered, setFiltered] = useState([...el]);
  const [search, setSearch] = useState('');

  const [isPending, startTransaction] = useTransition();

  const inputChangeHandler = (e) => {
    setSearch(e.target.value);

    startTransaction(() => {
      const data_ = data.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFiltered(data_);
    });
  };

  return (
    <div className='App'>
      <h1>
        page : {pages} {totalEl}
      </h1>
      <input
        className='search-input'
        type='text'
        onChange={inputChangeHandler}
        value={search}
      />

      <div className='comment-list'>
        {isPending ? (
          <div className='loader'></div>
        ) : filtered.length > 0 ? (
          filtered.map((comment) => {
            return <Comment key={comment.id} {...comment} />;
          })
        ) : (
          <div className='no-results'>No results found</div>
        )}
        <div
          style={{
            display: 'flex',
          }}
        >
          {Array.from(Array(pages).keys()).map((el) => {
            return <div className='page-number'>{el}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
