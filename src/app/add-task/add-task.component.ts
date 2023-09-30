import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Task } from '../task.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  taskStatuses: ('todo' | 'doing' | 'done')[] = ['todo', 'doing', 'done'];
  tasksByStatus: Record<'todo' | 'doing' | 'done', Task[]> = {
    todo: [],
    doing: [],
    done: []
  };
  currentUser: any;
  
  constructor(private dataService: DataService, private userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();
    this.refreshTasks();
  }

  refreshTasks(): void {
    this.taskStatuses.forEach(status => {
      this.tasksByStatus[status] = this.getTasksByStatus(status);
    });
  }

  addTaskWithPrompt(): void {
    const taskDescription = prompt('Wprowadź opis zadania:');
    const featureName = prompt('Podaj nazwę funkcjonalności:');

    if (featureName && featureName.trim() !== '' && taskDescription && taskDescription.trim() !== '') {
      const task = new Task(Date.now(), taskDescription);
      task.status = 'todo'; // Ustaw domyślny status na "todo"
      this.dataService.addTaskToFeature(featureName, task);
      this.refreshTasks(); // Odśwież listę zadań po dodaniu nowego zadania
    }
  }

  getTasksByStatus(status: 'todo' | 'doing' | 'done'): Task[] {
    const allTasks: Task[] = [];
    this.dataService.getFeatures().forEach(feature => {
      if (feature.tasks) {
        allTasks.push(...(feature.tasks ?? []));
      }
    });
    return allTasks.filter(task => task.status === status);
  }

  changeTaskStatus(task: Task, newStatus: 'todo' | 'doing' | 'done'): void {
    this.dataService.updateTaskStatus(task, newStatus);
    this.refreshTasks(); // Odśwież listę zadań po zmianie statusu
  }

  trackTaskById(index: number, task: Task): number {
    return task.id;
  }
}
