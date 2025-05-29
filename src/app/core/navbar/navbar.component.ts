import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = 'http://localhost:8080';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  userName: string | null = null;

  constructor(public auth: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadUserName();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.toggleMenu();
      this.userName = null;
      this.router.navigate(['/main']);
    });
  }

  loadUserName() {
    const token = this.auth.getToken();
    if (!token) return;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    this.http.get<{ nombre: string }>(`${BASE_URL}/me`, { headers }).subscribe({
      next: (data) => {
        this.userName = data.nombre;
      },
      error: () => {
        this.userName = null;
      }
    });
  }
}
