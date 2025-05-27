import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;

  constructor(public auth: AuthService, private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.toggleMenu();
      this.router.navigate(['/main']);
    });
  }
}
