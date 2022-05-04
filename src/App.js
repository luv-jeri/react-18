import './App.css';
import { useState, useTransition, lazy, Suspense } from 'react';

import data from './data.json';

import Comment from './components/CommentCard/index.js';
function App() {
  const [filtered, setFiltered] = useState([...data]);
  const [search, setSearch] = useState('');

  const [isPending, startTransaction] = useTransition();

  const inputChangeHandler = (e) => {
    setSearch(e.target.value);

    startTransaction(() => {
      setFiltered(
        data.filter((item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    });
  };

  return (
    <div className='App'>
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
      </div>
    </div>
  );
}

export default App;
