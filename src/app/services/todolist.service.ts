import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { Todo } from '../models/Todo.interface';
import { AngularFireDatabase, AngularFireList, PathReference, QueryFn, SnapshotAction } from '@angular/fire/compat/database';
import { statusTask } from '../models/Status.interface';
@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private dbpath = 'todoslist';
  todosRef: AngularFireList<Todo>;

  //subject todo
  private todosSource = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSource.asObservable();

  constructor(private db: AngularFireDatabase) {
    this.todosRef = db.list(this.dbpath);
  }


  //call service database realtime to query data
  //get,set



  getAll(): Observable<Todo[]> {
    return this.db.list(this.dbpath
    ).snapshotChanges().pipe(
      map(actions => actions.map(action => ({
        id: action.key,
        ...action.payload.val() as Todo
      })))
    );
  }


  filterTodo(chooseStatus: string = 'all'): Observable<Todo[]> {
    return this.getAll().pipe(
      map(todos => todos.filter(todo => {
        if (chooseStatus === 'all') {
          return true;
        }
        if (chooseStatus === 'active') {
          return !todo.completed;
        }
        if (chooseStatus === 'completed') {
          return todo.completed;
        }
        return false;
      })),
      tap({
        next: (data) => this.todosSource.next(data)
      }),
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error('Something went wrong fetching the available todos. Please try again later. '))
      })
    )
  }

  create(todo: Todo): any {
    return this.todosRef.push(todo)
      .then((ref) => {
      })
      .catch(err => {
        console.error('Error creating todo:', err);
        return Promise.reject(err);
      });;

  }

  update(id: string, value: any): Promise<void> {
    return this.todosRef.update(id, value).then(
      () => {
        const updatetodos = this.todosSource.getValue().map(todo => todo.id === id ? { ...todo, ...value } : todo);
        this.todosSource.next(updatetodos);
      }
    )
      .catch(err => {
        console.error(`Error update todo id = ${id}`, err);
        return Promise.reject(err);
      });
  }

  delete(id: string): Promise<void> {
    return this.todosRef.remove(id).then(
      () => {
        const updatetodos = this.todosSource.getValue().filter(todo => todo.id !== id);
        this.todosSource.next(updatetodos);
      }
    )
      .catch(err => {
        console.error(`Error update todo id = ${id}`, err);
        return Promise.reject(err);
      });;
  }

}
