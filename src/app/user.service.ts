import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Domyślny użytkownik
  private currentUser = {
    id: 1,
    name: 'John Doe'
  };

  getCurrentUser() {
    return this.currentUser;
  }
}
