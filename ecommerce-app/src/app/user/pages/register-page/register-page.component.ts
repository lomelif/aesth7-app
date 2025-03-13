import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, RouterModule, FooterComponent],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent implements OnInit{ 
  registerForm!: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      clave: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log("Formulario enviado:", this.registerForm.value)
      // Aquí iría la lógica para enviar los datos al servidor
    } else {
      this.registerForm.markAllAsTouched()
    }
  }
}
