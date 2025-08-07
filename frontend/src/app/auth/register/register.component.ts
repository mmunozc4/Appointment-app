import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule for matInput
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule for mat-raised-button

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelectModule, // Add MatSelectModule here
    MatInputModule, // Add MatInputModule for input fields
    MatButtonModule // Add MatButtonModule for buttons
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required], 
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: res => console.log('Registro exitoso', res),
        error: err => console.error('Error en el registro', err)
      });
    }
  }
}
