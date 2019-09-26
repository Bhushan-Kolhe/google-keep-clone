import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Task } from '../Models/Task';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  //Setting up Headers for Http Requests
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  private tasks = new BehaviorSubject<Task[]>([]);
  currentTasks = this.tasks.asObservable();

  constructor(private http:HttpClient) { }

  //Get all Tasks from server
  getTasks():Observable<Task[]> {
    return this.http.get<Task[]>("http://localhost:5000/tasks");
  }

  //Delete a task on server
  deleteTask(task:Task):Observable<Task> {
    const url = `http://localhost:5000/tasks/${task._id}`; 
    let result = this.http.delete<Task>(url, this.httpOptions);
    return result;
  }

  addTask(task):Observable<Task> {
    const url = `http://localhost:5000/tasks`;
    return this.http.post<Task>(url, task, this.httpOptions);
  }

  updateTasksinUI() {
    this.http.get<Task[]>("http://localhost:5000/tasks").subscribe(tasks => {
      this.tasks.next(tasks);
    });
  }
}
