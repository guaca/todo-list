import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import NameForm from './components/NameForm';

function App() {
  // State stuff
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [name, setName] = useState('');

  // RUN ONCE when the app start
  useEffect(() => {
    const getLocalTodos = () => {
      if (localStorage.getItem('todos') === null) {
        localStorage.setItem('todos', JSON.stringify([]));
      } else {
        let localTodo = JSON.parse(localStorage.getItem('todos'));
        setTodos(localTodo);
      }
    }
    const getLocalName = () => {
      if (localStorage.getItem('name') === null) {
        localStorage.setItem('name', JSON.stringify(''));
      } else {
        let localName = JSON.parse(localStorage.getItem('name'));
        setName(localName);
      }
    }
    getLocalTodos();
    getLocalName();
  }, [])
  // UseEffect
  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
        case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    }
    const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  useEffect(() => {
    const saveLocalName = () => {
      localStorage.setItem('name', JSON.stringify(name));
    };
    saveLocalName();
  }, [name]);


  return (
    <div className="App">
      { name === '' 
      ? 
        <>
          <header>
            <h1>What's your name?</h1>
          </header>
            <NameForm name={name} setName={setName} />
        </>
      : 
      <>
        <header>
          <h1>{name}'s Todo List</h1>
        </header>
        <Form
          inputText={inputText}
          setInputText={setInputText}
          todos={todos}
          setTodos={setTodos}
          setStatus={setStatus}
        />
        <TodoList
          filteredTodos={filteredTodos}
          setTodos={setTodos}
          todos={todos} /> 
      </>
      }
    </div>
  );
}

export default App;
