import {  ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { statusTask } from '../models/Status.interface';
import { TodolistService } from '../services/todolist.service';
import { Todo } from '../models/Todo.interface';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistComponent implements OnInit, OnDestroy, OnChanges {
  @Input() chooseStatus!: string;
  todoslist: Todo[] = [];
  showSpinner: boolean = true;
  destroyRef = inject(DestroyRef);
  constructor(
    private cd : ChangeDetectorRef,
    private todolistService: TodolistService) {
  }

  ngOnInit(): void {
    this.loadTodoList();
  }

  loadTodoList() {
    let subscription = this.todolistService.filterTodo(this.chooseStatus).subscribe({
      next: (data) => {
        this.showSpinner = false;
        this.todoslist = data;
        this.cd.markForCheck();
      },
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  ngOnDestroy(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
     if(!changes['chooseStatus'].firstChange)
          this.loadTodoList();
  }
}
