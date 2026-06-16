import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly authService = inject(AuthService);

  protected firstName = signal<string>('John');
  protected lastName = signal<string>('Doe');

  protected fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  protected readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();

    if (email === 'admin@gmail.com' && password === 'password') {
      this.authService.login();
      void this.router.navigate(['/dashboard']);
      return;
    }

    this.snackBar.open('Email or password does not match.', 'Dismiss', {
      duration: 4000,
      politeness: 'assertive',
    });
  }
}
