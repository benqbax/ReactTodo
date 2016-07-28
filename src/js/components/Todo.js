import React from "react";
import * as TodoActions from "../actions/TodoActions";

export default class Todo extends React.Component {
  constructor(props) {
    super();
  }

  deleteTodo(){
    TodoActions.deleteTodo(this.props.id);
  }

  setEdit(){
    console.log(this.props);
    if(this.props.text.length>2){
      TodoActions.toEdit(this.props.id);
    }
    else{
      alert("too short!");
    }
  }

  handleChange(e){
    const title = e.target.value;
    TodoActions.editTodo(title, this.props.id);
  }
  save(){
    this.setEdit();
  }

  render() {
    const { id, complete, edit, text } = this.props;
    const icon = complete ? "\u2714" : "\u2716"

    if (edit) {
      return (
        <li class="todo_item">
          <input onChange={this.handleChange.bind(this)} value={text} focus="focused"/>
          <button  onClick={this.save.bind(this)}class="btn btn-success"> Save </button>

        </li>
      );
    }

    return (
      <li class="todo_item">
        <span id="text">{text}</span>
        <span id="complete">{icon}</span>
        <button  onClick={this.setEdit.bind(this)}class="btn btn-default"> Edit </button>
        <button onClick={this.deleteTodo.bind(this)} class="btn btn-danger"> Delete </button>

      </li>
    );
  }
}
