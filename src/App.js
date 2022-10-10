import React,{useState} from 'react';
import './App.css';

function App() {
  const [newToDo, setNewToDo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();

    if (newToDo.length === 0){
      return;
    }

    const todoItem = {
      text: newToDo,
      complete: false
    }

    setTodos([...todos,todoItem])
    setNewToDo("");
  };

  const handleToDoDelete = (delIndex) =>{
    const filterTodos = todos.filter((todo,i) => {
      return i !== delIndex;
    })
    setTodos(filterTodos);
  }

  const handleToggleComplete = (idx) => {
    const updatedTodos = todos.map((todo,i) =>{
      if (idx === i){
        todo.complete = !todo.complete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div className="App">
    <h1>Task Manager</h1>
    <form onSubmit={(event) => {handleNewTodoSubmit (event);
    }}><input onChange={(event) => {
      setNewToDo(event.target.value);
    }} type="text" value={newToDo}></input>

    <div>
    <button id="add">Add Task</button>
    </div>
    </form>

    {
      todos.map((todo, i) => {
        const todoClasses = ["task"];

        if (todo.complete){
          todoClasses.push("line");
        }


        return(<div id="card" key={i}>
        <p>Task #{i}</p>
        <span className= {todoClasses.join(" ")}>{todo.text}</span>
        <div id="Actions">
        <p id="complete">Complete Task</p>
        <input onChange={(event) =>{
          handleToggleComplete(i);
        }} checked ={todo.complete} id="check" type="checkbox"></input>
        <button id="delete" onClick={(event) =>{
          handleToDoDelete(i);
          alert('Removed Task !')
        }}
        style={{
          margin: 10,
          backgroundColor: 'whitesmoke',
          border: '1px solid green',
          color: 'green',
          padding: 7,
          borderRadius: 5
          }}
        >Delete</button>
        </div>
        </div>)
      })
    }

    </div>
  );
}
export default App;
