import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, type FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../../../shared/components/footer/footer.component";


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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Formulario enviado", this.loginForm.value)
      // Aquí iría la lógica de autenticación
    }
  }
}
