import { ChangeDetectorRef, ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms"
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { AuthService } from '../../../../services/auth.service';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, RouterModule, FooterComponent],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent implements OnInit{ 
  registerForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      clave: ["", [Validators.required, Validators.minLength(8), this.passwordValidator()]],
    })
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
  
      const payload = {
        name: formValue.nombre,
        lastName: formValue.apellido,
        email: formValue.email,
        password: formValue.clave
      };
  
      this.authService.register(payload).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId.toString());
          Toastify({
            text: "✅ Registro exitoso",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
          }).showToast();
          this.router.navigate(['/profile']);
          this.cdr.markForCheck();
        },
        error: (error) => {
          Toastify({
            text: "❌ Ocurrió un error al registrarte",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(to right, #ff5f6d, #ffc371)"
            }
          }).showToast();
          this.cdr.markForCheck();
        }
      });
  
    } else {
      this.registerForm.markAllAsTouched();
      Toastify({
        text: "Por favor completa todos los campos correctamente",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #f7971e, #ffd200)"
        }
      }).showToast();
      this.cdr.markForCheck();
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (!value) return null;
  
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
      const valid = hasUpperCase && hasNumber && hasSpecialChar;
  
      return valid ? null : {
        passwordStrength: {
          hasUpperCase,
          hasNumber,
          hasSpecialChar,
        }
      };
    };
  }
}
