import { Component, OnInit } from '@angular/core';
import { Task } from '../../Models/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks:Task[];

  constructor(private taskService:TaskService) { }

  ngOnInit() {
    this.taskService.currentTasks.subscribe(tasks => { this.tasks = tasks; });
    this.taskService.getTasks().subscribe(tasks => { this.tasks = tasks });
  }

  //Delete a task
  onDelete(task:Task) {
    //Delete from UI
    this.tasks = this.tasks.filter(t => t._id !== task._id );
    //Delete from server
    this.taskService.deleteTask(task).subscribe();
  }
}
