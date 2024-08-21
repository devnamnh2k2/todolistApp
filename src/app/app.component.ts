import { Component, inject, OnInit } from '@angular/core';
import { Todo } from './models/Todo.interface';
import { TodolistService } from './services/todolist.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { statusTask } from './models/Status.interface';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // todoDummy: Todo = {
  //   title: 'Task 1 do something',
  //   completed: false
  // }
  todolistCurrent?: Todo[];
  currentStatusChoose: statusTask = {
    status: 'all'
  };
  todolistService = inject(TodolistService);

  todoForm = this.formGroup.group({
    title: ['', [ Validators.minLength(3)]],
    completed: [false]
  })

  constructor(private formGroup: FormBuilder) { }


  ngOnInit(): void {
    this.refreshTodo();
  }

  get title() {
    return this.todoForm.get('title')!;
  }


/**
 * 
 */
refreshTodo(){
  this.todolistService.todos$.subscribe({
    next: (data) => {
      this.todolistCurrent = data
    }
  });
}

/**
 * 
 */
  saveTodo() {
    // console.log(this.todoForm.value);
    if (this.todoForm.valid) {
      this.todolistService.create(this.todoForm.value as Todo);
    }
  }


  chooseStatusTask(event: MatButtonToggleChange){
    this.currentStatusChoose.status = event.value;
    // console.log(this.currentStatusChoose.status );

  }

}
