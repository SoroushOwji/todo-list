import "./App.css";
import { useState, useReducer } from "react";

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const DONE_TODO = "DONE_TODO";

function todoListReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        list: [...state.list, action.payload],
        lastId: state.lastId + 1,
      };
    case REMOVE_TODO:
      return {
        list: state.list.filter((todo) => todo.id !== action.payload),
        lastId: state.lastId,
      };
    case DONE_TODO:
      return {
        list: state.list.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              done: !todo.done,
            };
          }
          return todo;
        }),
        lastId: state.lastId,
      };
    default:
      return state;
  }
}

function App() {
  const [input, setInput] = useState("");
  const [todo, dispatchTodo] = useReducer(todoListReducer, {
    list: [],
    lastId: 0,
  });

  const addTodoAndClearInput = () => {
    dispatchTodo({
      type: ADD_TODO,
      payload: { text: input, id: todo.lastId, done: false },
    });
    setInput("");
  };
  const removeTodo = (id) => {
    dispatchTodo({ type: REMOVE_TODO, payload: id });
  };
  const doneTodo = (id) => {
    dispatchTodo({ type: DONE_TODO, payload: id });
  };

  return (
    <div>
      <header>
        <h1>Todo List</h1>
      </header>
      <div>
        <input
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addTodoAndClearInput();
            }
          }}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <button
          onClick={() => {
            addTodoAndClearInput();
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {todo.list.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              value={todo.done}
              onClick={() => doneTodo(todo.id)}
            />
            {todo.done ? <s>{todo.text}</s> : todo.text}
            <button onClick={() => removeTodo(todo.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
