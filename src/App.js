import "./App.css";
import { useReducer } from "react";

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

function todoListReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        list: [...state.list, { ...action.payload, done: false }],
        lastId: state.lastId + 1,
      };
    case REMOVE_TODO:
      return {
        list: state.list.filter((todo) => todo.id !== action.payload),
        lastId: state.lastId,
      };
    case TOGGLE_TODO:
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
  const [todo, dispatchTodo] = useReducer(todoListReducer, {
    list: [],
    lastId: 0,
  });

  function addTodo(text) {
    dispatchTodo({
      type: ADD_TODO,
      payload: { text, id: todo.lastId },
    });
  }

  function removeTodo(id) {
    dispatchTodo({ type: REMOVE_TODO, payload: id });
  }

  function toggleTodo(id) {
    dispatchTodo({ type: TOGGLE_TODO, payload: id });
  }

  function handleSubmit(event) {
    event.preventDefault();
    addTodo(event.target.description.value);
    event.target.description.value = "";
  }

  return (
    <div>
      <header>
        <h1>Todo List</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input type="text" name="description" />
        <button type="submit">add</button>
      </form>
      <ul>
        {todo.list.map(({ id, done, text }) => (
          <li key={id}>
            <input
              type="checkbox"
              value={done}
              onClick={() => toggleTodo(id)}
            />
            {done ? <s>{text}</s> : text}
            <button onClick={() => removeTodo(id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
