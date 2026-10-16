
import {
  Component,
  EventEmitter,
  Output,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AuthService, AuthUser } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);

  @Output() signedIn = new EventEmitter<AuthUser>();

  isRegistering = false;
  name = '';
  email = '';
  password = '';
  error = '';
  success = '';
  loading = false;

  switchMode(): void {
    this.isRegistering = !this.isRegistering;
    this.error = '';
    this.success = '';
    this.password = '';
  }

  submit(): void {
    if (this.loading) return;

    this.error = '';
    this.success = '';

    if (!this.email.trim() || !this.password) {
      this.error = 'Enter your email and password.';
      return;
    }

    if (this.isRegistering) {
      if (this.name.trim().length < 2) {
        this.error = 'Enter your full name.';
        return;
      }

      if (this.password.length < 12) {
        this.error = 'Password must be at least 12 characters.';
        return;
      }

      this.loading = true;

      this.auth.register(
        this.name.trim(),
        this.email.trim(),
        this.password
      ).subscribe({
        next: () => {
          this.loading = false;
          this.isRegistering = false;
          this.password = '';
          this.success = 'Account created! Please sign in.';
          this.cdr.detectChanges();
        },
        error: err => {
          this.loading = false;
          this.error = err.error?.message ||
            'Unable to create account.';
          this.cdr.detectChanges();
        }
      });

      return;
    }

    this.loading = true;

    this.auth.login(
      this.email.trim(),
      this.password
    ).subscribe({
      next: response => {
        this.loading = false;
        this.password = '';
        this.signedIn.emit(response.user);
      },
      error: err => {
        this.loading = false;
        this.error = err.status === 401
          ? 'Incorrect email or password.'
          : 'Unable to sign in.';
        this.cdr.detectChanges();
      }
    });
  }
}
