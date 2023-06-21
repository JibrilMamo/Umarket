import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Post from './Post'
import { doc, setDoc, updateDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'
import useFetchTodos from '../hooks/fetchTodos'

export default function UserDashboard() {
  const { currentUser } = useAuth()
  const [username, setUsername] = useState('')
  const [splitEmail, setSplitEmail] = useState('')
  const [todo, setTodo] = useState('')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [edittedValue, setEdittedValue] = useState('')

  const { todos, setTodos, loading, error } = useFetchTodos()

  useEffect(() => {
    if (!loading && !error) {
      setTodos(todos)
    }
  }, [todos, loading, error])

  useEffect(() => {
    if (currentUser) {
      const email = currentUser.email || ''
      const splitEmail = email.split('@')[0]
      setSplitEmail(splitEmail)
    }
  }, [currentUser])

  async function handleAddTodo() {
    if (!todo || !description || !contact) { return }
    const newKey = Object.keys(todos).length === 0 ? '1' : (Math.max(...Object.keys(todos).map(Number)) + 1).toString()
    const newTodo = {
      todo,
      description,
      contact
    };
    setTodos({ ...todos, [newKey]: newTodo })
    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {
      todos: {
        [newKey]: newTodo
      }
    }, { merge: true })
    setTodo('')
    setDescription('')
    setContact('')
  }
  
  async function handleDelete(todoKey) {
    const tempObj = { ...todos }
    delete tempObj[todoKey]
    setTodos(tempObj)
    const userRef = doc(db, 'users', currentUser.uid)
    await updateDoc(userRef, {
      [`todos.${todoKey}`]: deleteField()
    })
  }

  if (loading) {
    return <div><i className="fa-solid fa-rabbit fa-bounce"></i></div>;
  }

  return (
    <div className="flex flex-1 justify-center items-start h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-center font-bold gap-3">
          <h style={{ fontSize: 40, color: '#7f1d1d' }}>{splitEmail}</h>
          <p
  className='py-6 text-yellow-600 hover:text-red-900 duration-300 opacity-50 hover:scale-150 hover:opacity-100 cursor-pointer'
  onClick={() => {
    if (splitEmail === currentUser.email.split('@')[0]) {
      setSplitEmail('');
    } else {
      setSplitEmail(currentUser.email.split('@')[0]);
    }
  }}
>
  {splitEmail === '' ? (
    <i class="fa-solid fa-eye-low-vision"></i>
  ) : (
    <i class="fa-solid fa-eye-low-vision"></i>
  )}
</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="rounded-lg p-4">
              <h1 className="text-2xl font-semibold mb-4">Add Post</h1>
              <div className="rounded-full mb-3">
                <input
                  type="text"
                  placeholder="Enter Title"
                  value={todo}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue.length <= 15) {
                      setTodo(inputValue);
                    }
                  }}
                  className="outline-none p-3 text-base sm:text-lg text-slate-900 rounded-full w-full"
                  maxLength={20}
                />
                <div className='px-5'>{15 - todo.length} characters remaining</div>
              </div>
              <div className="rounded-full mb-3">
                <textarea
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="outline-none p-3 text-base sm:text-lg text-slate-900 rounded-lg w-full resize-none"
                  maxLength={200}
                  rows={3}
                ></textarea>
                <div className='px-5'>{200 - description.length} characters remaining</div>
              </div>
              <div className="rounded-full mb-3 ">
                <input
                  type="text"
                  placeholder="Enter Contact Information"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="outline-none p-3 text-base sm:text-lg text-slate-900 rounded-full w-full"
                />
              </div>
              <button
                onClick={handleAddTodo}
                className="text-lg py-2 px-6 rounded-full bg-amber-400 text-white hover:bg-amber-600 duration-300"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            {Object.entries(todos).map(([key, todo]) => (
              <div className="bg-red-900 p-4 rounded-lg " key={todo}>
                <Post
                  key={key}
                  edittedValue={edittedValue}
                  setEdittedValue={setEdittedValue}
                  todoKey={key}
                  handleDelete={handleDelete}
                  todo={todo.todo}
                  description={todo.description}
                  contact={todo.contact}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
