import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  correo = '';
  username = '';
  password = '';
  verifyPassword = '';
  nombre = '';
  apellidos = '';
  errorMsg = '';
  successMsg = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';
    if (this.password !== this.verifyPassword) {
      this.errorMsg = 'Las contraseñas no coinciden';
      return;
    }
    this.loading = true;
    const data = {
      correo: this.correo,
      username: this.username,
      password: this.password,
      verifyPassword: this.verifyPassword,
      nombre: this.nombre,
      apellidos: this.apellidos
    };
    this.auth.register(data).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = 'Registro exitoso. Ahora puedes iniciar sesión.';
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error?.message || 'Error en el registro';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
