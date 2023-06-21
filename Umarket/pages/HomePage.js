import React, { useEffect, useState } from 'react';
import useFetchTodos from '../hooks/fetchTodos';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { loading, error, todos, posts, setTodos } = useFetchTodos();
  const [temp, setTemp] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (posts) {
      setTemp(posts);
      setFilteredPosts(posts);
    }
  }, [posts]);

  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredPosts(temp);
    } else {
      const filtered = temp.filter((post) =>
        Object.values(post.todos).some((todo) =>
        
          todo.todo.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
      setFilteredPosts(filtered);
    }
  }, [searchValue, temp]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <div className='mb-4 outline-none'>
  <input
    type="text"
    value={searchValue}
    onChange={handleSearchChange}
    className="rounded-full px-4 py-1 border border-yellow-400 outline-none text-red-900"
    placeholder="Search"
    />
  </div>

      {loading ? (
        <div className="flex justify-center items-center text-red-900 " style={{ fontSize: '100px' }}>
          <i className="fa-solid fa-cat fa-bounce"></i>
        </div>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gridAutoRows: 'minmax(200px, auto)',
            gap: '1.5rem',
          }}
        >
          {filteredPosts.map((post, index) =>
            Object.values(post.todos).map((todo, todoIndex) => (
              <div
                key={index + '_' + todoIndex}
                className=" rounded-lg p-6 "
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                  maxWidth: '100%',
                  background: '#7f1d1d',
                }}
              >
                <h3
                  className="text-2xl font-bold mb-4 text-gray-800"
                  style={{ marginBottom: '0.75rem', maxWidth: '100%' }}
                >
                  {todo.todo}
                </h3>
                <p className="text-lg text-gray-600 mb-2">Description: {todo.description}</p>
                <p className="text-lg text-gray-600">Contact: {todo.contact}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
