import { Component } from '@angular/core';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-todo-app';
  features: any;
  currentUser: { id: number; name: string };

  constructor(private userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();
  }
}
