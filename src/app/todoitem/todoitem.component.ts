import { Component, ElementRef, Input } from '@angular/core';
import { Todo } from '../models/Todo.interface';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TodolistService } from '../services/todolist.service';
import { debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrl: './todoitem.component.css'
})
export class TodoitemComponent {
  @Input() todoItem!: Todo;
  chooseEditTask: boolean = false;

  constructor(private todolistService: TodolistService) { }


  /**
   * 
   */
  handleStatusTask(event: MatCheckboxChange) {
    if (this.todoItem.id)
      this.todolistService.update(this.todoItem?.id, { completed: !this.todoItem?.completed }).finally(
        () => {
          alert(`Task ${this.todoItem.title} is updated successfull!`);
        });

  }

  toggleUiEdit() {
    this.chooseEditTask = !this.chooseEditTask;
  }
  /**
   * 
   * @param event 
   */
  handleChooseEdit(event: Event) {
      this.debounceTimeInput((event.target as HTMLInputElement))
  }

  /**
   * 
   */
  handleRemoveTask() {
    if (this.todoItem.id)
      this.todolistService.delete(this.todoItem?.id).finally(() => {
        alert(`Task ${this.todoItem.title} is removed successfull!`);
      });

  }

  /**
   * 
   * @param event 
   */
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.toggleUiEdit();
    }
  }

  /**
   * 
   * @param target 
   * @param delayTime 
   */

  private debounceTimeInput(target: HTMLInputElement, delayTime = 1000){
    let observable = fromEvent(target, 'input');

    observable.pipe(
      debounceTime(delayTime),
    ).subscribe({
      next: () => {
        if(this.todoItem.id)
           this.todolistService.update(this.todoItem?.id, {title: target.value}).finally(() => {
            console.log('Task is updated !');
          })

      }
    })
  }
}
