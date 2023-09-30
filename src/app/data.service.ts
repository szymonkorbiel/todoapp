import { Injectable } from '@angular/core';
import { Feature } from './feature.model';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  features: Feature[] = [
    new Feature(1, 'Funkcja 1', [new Task(1, 'Zad1'), new Task(2, 'Zad2')]),
    new Feature(2, 'Funkcja 2', [new Task(3, 'Zad3')])
  ];
  
  constructor() { }
  
  getFeatures(): Feature[] {
    return this.features;
  }
  
  addFeature(feature: Feature): void {
    if (!feature.id) {
        feature.id = Date.now();
    }
    this.features.push(feature);
  }
  
  deleteFeature(featureName: string): void {
    const index = this.features.findIndex(f => f.name === featureName);
    if (index !== -1) {
      this.features.splice(index, 1);
    }
  }

  editFeature(featureId: number, updatedFeature: Feature): void {
    const index = this.features.findIndex(f => f.id === featureId);
    if (index !== -1) {
      this.features[index] = updatedFeature;
    }
  }

  addTaskToFeature(featureName: string, task: Task): void {
    const feature = this.features.find(f => f.name === featureName);
    if (feature) {
      feature.tasks = feature.tasks || [];
      feature.tasks.push(task);
    } else {
      console.error('Feature not found for name:', featureName);
    }
}

deleteTaskFromFeature(featureName: string, taskId: number): void {
    const feature = this.features.find(f => f.name === featureName);
    if (feature) {
      feature.tasks = feature.tasks || [];
      const taskIndex = feature.tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        feature.tasks.splice(taskIndex, 1);
      }
    } else {
      console.error('Feature not found for name:', featureName);
    }
}

editTaskFromFeature(featureName: string, task: Task): void {
    const feature = this.features.find(f => f.name === featureName);
    if (feature) {
      feature.tasks = feature.tasks || [];
      const taskIndex = feature.tasks.findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        feature.tasks[taskIndex] = task;
      }
    } else {
      console.error('Feature not found for name:', featureName);
    }
}
updateTaskStatus(taskToUpdate: Task, newStatus: 'todo' | 'doing' | 'done'): void {
  this.getFeatures().forEach(feature => {
    if (feature.tasks) {
      feature.tasks.forEach(task => {
        if (task.id === taskToUpdate.id) {
          task.status = newStatus;
          console.log('Zaktualizowano status zadania:', task);
        }
      });
    }
  });
}


}
