import { Component, OnInit } from '@angular/core';
import { Task } from '../../Models/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  title:string;
  content:string;

  constructor(private taskService:TaskService) { }

  ngOnInit() {
  }

  onSubmit() {
    const task = {
      title: this.title,
      task: this.content
    }

    this.taskService.addTask(task).subscribe(() => {
      this.title = "";
      this.content = "";
      this.taskService.updateTasksinUI();
    });
  }

}
