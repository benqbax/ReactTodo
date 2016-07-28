import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";
import Popup from 'react-popup';


export default class Featured extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
    };
  }

  componentWillMount() {
    TodoStore.on("change", this.getTodos);
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    });
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  editTodos(){
    console.log("hej")
  }

  addTodo(){
    var text = document.getElementById('add').value;
    console.log(text);
    TodoActions.createTodo(text);
  }
  


  render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo} />;
    });

    return (
      <div class="wrapper">
        <h1>Todos</h1>
          <div class="comps">
          <div class="addComps">
            <input id="add" focus="focused"/>
            <button id="create" onClick={this.addTodo}>Create</button>
          </div>
        <ul>{TodoComponents}</ul>
        </div>
      </div>
    );
  }
}
