import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../core/profile.service';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css'
})
export class CreateProfileComponent {

  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    this.profileForm = this.fb.group({
      bio: ['', Validators.required],
      services: ['', Validators.required],
      priceRange: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.profileService.createProfessionalProfile(this.profileForm.value).subscribe({
        next: res => console.log('Perfil creado', res),
        error: err => console.error('Error al crear perfil', err)
      });
    }
  }
}
