import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {
  constructor() {
    super()
    this.todos = [
      {
        id: 113464613,
        text: "Go Shopping",
        complete: false,
        edit:false,
      },
      {
        id: 235684679,
        text: "Pay Water Bill",
        complete: false,
        edit:false,
      },
    ];
  }

  createTodo(text) {
    const id = Date.now();
    if(text.length>2){
        this.todos.push({
        id,
        text,
        complete: false,
        edit:false,
      });
    }
    else{
      alert("Task is too short, please try again!")
    }
    

    this.emit("change");
  }

  addEdit(id){
    for(var i=0; i<this.todos.length;i++){
      if(this.todos[i].id ===id){
        this.todos[i].edit = !this.todos[i].edit;

      }

    }
    this.emit("change");
  }

  editTodo(text, id){
    for(var i=0; i<this.todos.length;i++){
      if(this.todos[i].id ===id){
          this.todos[i].text = text;
      }
      this.emit("change");

    }
  }

  deleteTodo(id){
    for(var i=0; i<this.todos.length;i++){
      if(this.todos[i].id ===id){
        this.todos.splice(i,1);
      }
    }
    this.emit("change");
  }

  getAll() {
    return this.todos;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_TODO": {
        this.createTodo(action.text);
        break;
      }
      case "RECEIVE_TODOS": {
        this.todos = action.todos;
        this.emit("change");
        break;
      }

      case "DELETE_TODO": {
        this.deleteTodo(action.id);
        break;
      }

      case "ADD_EDIT":{
        this.addEdit(action.id);
        break;
      }
      case "EDIT_TODO":{
        this.editTodo(action.text, action.id);
        break;
      }
    }
  }

}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));
window.dispatcher = dispatcher;
export default todoStore;
