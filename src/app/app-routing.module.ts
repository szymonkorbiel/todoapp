// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { AddTaskComponent } from './add-task/add-task.component';

const routes: Routes = [
    { path: '', redirectTo: '/features', pathMatch: 'full' },
    { path: 'features', component: FeaturesComponent },
    { path: 'add-task', component: AddTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
