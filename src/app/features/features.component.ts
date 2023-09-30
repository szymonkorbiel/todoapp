import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Feature } from '../feature.model';
import { Task } from '../task.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {
  features: Feature[] = [];
  newTaskDescription: string = '';
  newFeatureName: string = ''; // Nowa zmienna dla nazwy funkcjonalności
  currentUser: any;

  constructor(private dataService: DataService, private userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    this.features = this.dataService.getFeatures();
  }

  addFeature(): void {
    const featureName = prompt('Wprowadź nazwę nowej funkcjonalności:');
    if (featureName && featureName.trim() !== '') {
        const newId = Date.now();
        this.dataService.addFeature(new Feature(newId, featureName, []));
    }
}

  deleteFeature(featureName: string): void {
    const confirmation = confirm('Czy na pewno chcesz usunąć tę funkcjonalność?');
    if (confirmation) {
      this.dataService.deleteFeature(featureName);
      this.features = this.dataService.getFeatures(); // Aktualizuj listę funkcjonalności
    }
  }

  deleteTask(featureName: string, taskId: number): void {
    this.dataService.deleteTaskFromFeature(featureName, taskId);
  }

  editTask(featureName: string, taskId: number): void {
    const taskDescription = prompt('Edytuj opis zadania:');
    if (taskDescription !== null) {
      const task = new Task(taskId, taskDescription);
      this.dataService.editTaskFromFeature(featureName, task);
    }
  }

  addTaskWithPrompt(feature: Feature): void {
    const taskDescription = prompt('Wprowadź opis zadania:');
    if (taskDescription && taskDescription.trim() !== '') {
        const task = new Task(Date.now(), taskDescription);
        this.dataService.addTaskToFeature(feature.name, task);
    }
  }
}
