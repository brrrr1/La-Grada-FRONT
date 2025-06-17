import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['sessionExpired']) {
        this.errorMsg = 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.';
      }
    });
  }

  onSubmit() {
    this.errorMsg = '';
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.auth.notifyUserChanged();
        this.router.navigate(['/main']);
      },
      error: (err) => {
        this.loading = false;
        console.log('Error response:', err);
        if (err.error?.message) {
          this.errorMsg = err.error.message;
        } else if (err.error?.detail === 'Bad credentials') {
          this.errorMsg = 'Usuario o contraseña incorrectos';
        } else {
          this.errorMsg = 'Error al iniciar sesión';
        }
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
