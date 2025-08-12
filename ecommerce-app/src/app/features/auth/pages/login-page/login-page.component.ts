import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, type FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { AuthService } from '../../../../services/auth.service';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule,
    ReactiveFormsModule, HeaderComponent, RouterModule, FooterComponent],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent { 
  loginForm: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const payload = this.loginForm.value;
      this.authService.login(payload).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId.toString());
          localStorage.setItem('email', response.email.toString());

          Toastify({
            text: "✅ Inicio de sesión exitoso",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
          }).showToast();

          this.router.navigate(['/profile']);
        },
        error: () => {
          Toastify({
            text: "❌ Credenciales incorrectas",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(to right, #e53935, #e35d5b)"
            }
          }).showToast();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      Toastify({
        text: "Por favor completa los campos correctamente",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #f7b733, #fc4a1a)"
        }
      }).showToast();
    }
  }
}
